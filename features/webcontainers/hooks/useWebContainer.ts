import { useState, useCallback } from 'react';
import type { WebContainer } from '@webcontainer/api';
import { TemplateFolder } from '@/features/playground/libs/path-to-json';

interface UseWebContainerProps {
  templateData: TemplateFolder;
}

interface UseWebContainerReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destroy: () => void;
  start: () => Promise<void>;
}

export const useWebContainer = ({ templateData }: UseWebContainerProps): UseWebContainerReturn => {
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [instance, setInstance] = useState<WebContainer | null>(null);

  const start = useCallback(async (): Promise<void> => {
    if (instance) return; // already started
    setIsLoading(true);
    setError(null);
    try {
      const mod = await import('@webcontainer/api');
      const webcontainerInstance = await mod.WebContainer.boot();
      setInstance(webcontainerInstance);
    } catch (err) {
      console.error('Failed to initialize WebContainer:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize WebContainer');
    } finally {
      setIsLoading(false);
    }
  }, [instance]);

  const writeFileSync = useCallback(async (path: string, content: string): Promise<void> => {
    if (!instance) {
      throw new Error('WebContainer instance is not available');
    }

    try {
      const pathParts = path.split('/');
      const folderPath = pathParts.slice(0, -1).join('/');

      if (folderPath) {
        await instance.fs.mkdir(folderPath, { recursive: true });
      }

      await instance.fs.writeFile(path, content);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to write file';
      console.error(`Failed to write file at ${path}:`, err);
      throw new Error(`Failed to write file at ${path}: ${errorMessage}`);
    }
  }, [instance]);

  const destroy = useCallback(() => {
    if (instance) {
      instance.teardown();
      setInstance(null);
      setServerUrl(null);
    }
  }, [instance]);

  return { serverUrl, isLoading, error, instance, writeFileSync, destroy, start };
};