"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarkedToggleButtonProps {
  markedForRevision?: boolean;
  id: string;
  onToggle?: (id: string, marked: boolean) => Promise<void>;
}

export function MarkedToggleButton({
  markedForRevision = false,
  id,
  onToggle,
}: MarkedToggleButtonProps) {
  const [isMarked, setIsMarked] = React.useState(markedForRevision);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newMarkedState = !isMarked;
      if (onToggle) {
        await onToggle(id, newMarkedState);
      }
      setIsMarked(newMarkedState);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className="h-8 w-8 p-0"
    >
      <Star
        className={`h-4 w-4 ${
          isMarked ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
    </Button>
  );
}
