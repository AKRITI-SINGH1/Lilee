"use client";
import React, { useMemo, useState } from "react";
import { PlaygroundEditor } from "@/features/playground/components/playground-editor";
import type { TemplateFolder, TemplateFile } from "@/features/playground/types";

interface PlaygroundEditorClientProps {
  templateData: TemplateFolder;
}

const findFirstFile = (folder: TemplateFolder): TemplateFile | undefined => {
  for (const item of folder.items) {
    if ("filename" in item) return item as TemplateFile;
    if ("folderName" in item) {
      const found = findFirstFile(item as TemplateFolder);
      if (found) return found;
    }
  }
  return undefined;
};

const PlaygroundEditorClient: React.FC<PlaygroundEditorClientProps> = ({ templateData }) => {
  const initialFile = useMemo(() => findFirstFile(templateData), [templateData]);
  const [activeFile] = useState<TemplateFile | undefined>(initialFile);
  const [content, setContent] = useState<string>(initialFile?.content ?? "");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // Minimal no-op handlers for suggestions; wire these up to real AI hooks later
  const handleAcceptSuggestion = (_editor: any, _monaco: any) => {};
  const handleRejectSuggestion = (_editor: any) => {};
  const handleTriggerSuggestion = (_type: string, _editor: any) => {};

  return (
    <div className="h-screen">
      <PlaygroundEditor
        activeFile={activeFile}
        content={content}
        onContentChange={handleContentChange}
        suggestion={null}
        suggestionLoading={false}
        suggestionPosition={null}
        onAcceptSuggestion={handleAcceptSuggestion}
        onRejectSuggestion={handleRejectSuggestion}
        onTriggerSuggestion={handleTriggerSuggestion}
      />
    </div>
  );
};

export default PlaygroundEditorClient;