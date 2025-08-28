
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { getPlaygroundById, SaveUpdatedCode } from '@/features/playground/actions';
import type { TemplateFolder } from '@/features/playground/libs/path-to-json';

interface PlaygroundData {
  id: string;
  title: string;
  description?: string | null;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  templateFiles: Array<{
    id: string;
    content: any; // JsonValue from Prisma
    createdAt: Date;
    updatedAt: Date;
  }>;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder | null;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(null);
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayground = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      console.log("Loading playground with ID:", id);
      const data = await getPlaygroundById(id);
      console.log("Playground data received:", data);

      if (!data) {
        throw new Error("Playground not found");
      }

      setPlaygroundData(data);

      // First, try to load from saved template files
      const rawContent = data?.templateFiles?.[0]?.content;
      if (rawContent && typeof rawContent === "string") {
        try {
          const parsedContent = JSON.parse(rawContent);
          setTemplateData(parsedContent);
          console.log("Template loaded from saved content");
          toast.success("Playground loaded successfully");
          return;
        } catch (parseError) {
          console.warn("Failed to parse saved template content:", parseError);
        }
      } else if (rawContent && typeof rawContent === "object") {
        // Handle case where content is already parsed as JSON object
        try {
          setTemplateData(rawContent as unknown as TemplateFolder);
          console.log("Template loaded from saved content (already parsed)");
          toast.success("Playground loaded successfully");
          return;
        } catch (error) {
          console.warn("Failed to use pre-parsed content:", error);
        }
      }

      // If no saved content, load template from API
      console.log("Loading template from API for playground:", id);
      const res = await fetch(`/api/template/${id}`);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(`Failed to load template: ${res.status} - ${errorData.error || errorData.details || 'Unknown error'}`);
      }

      const templateRes = await res.json();
      console.log("Template API Response:", templateRes);
      
      if (templateRes.templateJson) {
        if (Array.isArray(templateRes.templateJson)) {
          setTemplateData({
            folderName: "Root",
            items: templateRes.templateJson,
          });
        } else {
          setTemplateData(templateRes.templateJson);
        }
        console.log("Template loaded successfully from API");
        toast.success("Template loaded successfully");
      } else {
        console.warn("No template data received from API");
        setTemplateData({
          folderName: "Root",
          items: [],
        });
        toast.warning("Template loaded but appears to be empty");
      }

    } catch (error) {
      console.error("Error loading playground:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load playground data";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const saveTemplateData = useCallback(async (data: TemplateFolder) => {
    try {
      await SaveUpdatedCode(id, data);
      setTemplateData(data);
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error("Error saving template data:", error);
      toast.error("Failed to save changes");
      throw error;
    }
  }, [id]);

  useEffect(() => {
    loadPlayground();
  }, [loadPlayground]);

  return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  };
};