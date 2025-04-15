
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadItem } from "@/types/video";
import DownloadProgress from "./DownloadProgress";
import { CloudOff } from "lucide-react";

interface DownloadsListProps {
  downloads: DownloadItem[];
}

const DownloadsList: React.FC<DownloadsListProps> = ({ downloads }) => {
  if (downloads.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Downloads</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <CloudOff className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No Downloads Yet</h3>
          <p className="text-sm text-muted-foreground">
            Your downloaded videos will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Downloads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {downloads.map((download) => (
          <DownloadProgress key={download.id} download={download} />
        ))}
      </CardContent>
    </Card>
  );
};

export default DownloadsList;
