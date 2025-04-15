
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DownloadItem } from "@/types/video";
import { Clock, Check, AlertCircle, Play } from "lucide-react";

interface DownloadProgressProps {
  download: DownloadItem;
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({ download }) => {
  // Status indicator based on download status
  const renderStatusIndicator = () => {
    switch (download.status) {
      case 'queued':
        return (
          <div className="flex items-center text-yellow-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Queued</span>
          </div>
        );
      case 'downloading':
        return (
          <div className="flex items-center text-blue-500">
            <Play className="h-4 w-4 mr-2" />
            <span>Downloading</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center text-green-500">
            <Check className="h-4 w-4 mr-2" />
            <span>Completed</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{download.error || 'Download failed'}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-1">
          {download.metadata.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{download.format.quality} • {download.format.extension}</span>
          <span>{Math.round(download.progress)}%</span>
        </div>
        <Progress 
          value={download.progress} 
          className={download.status === 'completed' ? 'bg-green-100' : undefined}
        />
        <div className="flex justify-between items-center mt-2">
          {renderStatusIndicator()}
          <span className="text-xs text-muted-foreground">
            {download.format.size}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadProgress;
