
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface DownloadButtonProps {
  onDownload: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onDownload, 
  isDisabled, 
  isLoading 
}) => {
  return (
    <Button
      onClick={onDownload}
      disabled={isDisabled || isLoading}
      className="w-full bg-gradient-brand hover:opacity-90 text-white"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Download className="mr-2 h-5 w-5" />
          Download Now
        </>
      )}
    </Button>
  );
};

export default DownloadButton;
