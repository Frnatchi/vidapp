
import React from 'react';
import { VideoFormat } from "@/types/video";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileType, HardDriveIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface FormatSelectorProps {
  formats: VideoFormat[];
  selectedFormat: VideoFormat | null;
  onSelectFormat: (format: VideoFormat) => void;
  isLoading: boolean;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ 
  formats, 
  selectedFormat, 
  onSelectFormat, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Quality</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (formats.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Quality</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <RadioGroup 
          value={selectedFormat?.id} 
          onValueChange={(id) => {
            const format = formats.find(f => f.id === id);
            if (format) onSelectFormat(format);
          }}
        >
          {formats.map((format) => (
            <div 
              key={format.id}
              className={`flex items-center justify-between p-3 rounded-md border ${
                selectedFormat?.id === format.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border'
              } mb-2 cursor-pointer`}
              onClick={() => onSelectFormat(format)}
            >
              <div className="flex items-center">
                <RadioGroupItem value={format.id} id={`format-${format.id}`} className="mr-3" />
                <Label htmlFor={`format-${format.id}`} className="cursor-pointer">
                  <div className="flex items-center">
                    <span className="font-medium">{format.quality}</span>
                    <span className="ml-2 text-muted-foreground text-xs flex items-center">
                      <FileType className="h-3.5 w-3.5 mr-1" />
                      {format.extension.toUpperCase()}
                    </span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <HardDriveIcon className="h-3.5 w-3.5 mr-1" />
                {format.size}
                {selectedFormat?.id === format.id && 
                  <CheckCircle className="h-4 w-4 ml-2 text-primary" />
                }
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default FormatSelector;
