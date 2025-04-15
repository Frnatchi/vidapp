
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    // Simple validation for YouTube URL
    if (!url.includes('youtube.com/') && !url.includes('youtu.be/')) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    onSubmit(url);
  };

  const handlePaste = async () => {
    try {
      // In a real mobile app, we would use Capacitor's Clipboard API
      // For this simulation, we'll just use the browser clipboard
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast.success("URL pasted from clipboard");
    } catch (err) {
      toast.error("Unable to access clipboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Paste YouTube URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={handlePaste}
          variant="outline"
          size="icon"
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-brand hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" /> Analyze Video
          </>
        )}
      </Button>
    </form>
  );
};

export default UrlInput;
