
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { VideoMetadata } from "@/types/video";
import { Clock, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPreviewProps {
  metadata: VideoMetadata | null;
  isLoading: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ metadata, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metadata) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden border border-border/50">
      <div className="relative aspect-video">
        <img 
          src={metadata.thumbnail} 
          alt={metadata.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if the thumbnail fails to load
            e.currentTarget.src = "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg";
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium line-clamp-2">{metadata.title}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{metadata.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{metadata.duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
