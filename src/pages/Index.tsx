
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import UrlInput from "@/components/UrlInput";
import VideoPreview from "@/components/VideoPreview";
import FormatSelector from "@/components/FormatSelector";
import DownloadButton from "@/components/DownloadButton";
import DownloadsList from "@/components/DownloadsList";
import AppHeader from "@/components/AppHeader";
import { VideoService } from "@/services/video-service";
import { VideoMetadata, VideoFormat, DownloadItem } from "@/types/video";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const Index: React.FC = () => {
  // States for video data
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  const [videoFormats, setVideoFormats] = useState<VideoFormat[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("download");

  // Analyze video when URL is submitted
  const handleUrlSubmit = async (url: string) => {
    setIsAnalyzing(true);
    try {
      const data = await VideoService.getVideoInfo(url);
      setVideoMetadata(data.metadata);
      setVideoFormats(data.formats);
      setSelectedFormat(data.formats[0]); // Select first format by default
      toast.success("Video analyzed successfully");
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast.error("Failed to analyze video");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Start download process
  const handleDownload = async () => {
    if (!videoMetadata || !selectedFormat) {
      toast.error("Please select a video and format first");
      return;
    }

    setIsDownloading(true);
    
    // Create a new download item
    const downloadId = uuidv4();
    const newDownload: DownloadItem = {
      id: downloadId,
      metadata: videoMetadata,
      format: selectedFormat,
      progress: 0,
      status: 'downloading'
    };
    
    // Add to downloads list
    setDownloads(prev => [newDownload, ...prev]);
    
    // Switch to downloads tab to show progress
    setActiveTab("downloads");
    
    try {
      // Start the download process
      await VideoService.downloadVideo(
        videoMetadata,
        selectedFormat,
        (progress) => {
          // Update download progress
          setDownloads(prev => prev.map(item => 
            item.id === downloadId 
              ? { ...item, progress, status: progress === 100 ? 'completed' : 'downloading' }
              : item
          ));
        }
      );
      
      toast.success(`Download completed: ${videoMetadata.title}`);
      
      // Clear the current video selection
      setTimeout(() => {
        setVideoMetadata(null);
        setVideoFormats([]);
        setSelectedFormat(null);
      }, 1000);
      
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed");
      
      // Update download status to error
      setDownloads(prev => prev.map(item => 
        item.id === downloadId 
          ? { ...item, status: 'error', error: 'Download failed' }
          : item
      ));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container max-w-md mx-auto py-4 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="downloads">My Downloads</TabsTrigger>
          </TabsList>
          
          <TabsContent value="download" className="space-y-4">
            <UrlInput onSubmit={handleUrlSubmit} isLoading={isAnalyzing} />
            
            {(videoMetadata || isAnalyzing) && (
              <>
                <Separator className="my-4" />
                
                <VideoPreview 
                  metadata={videoMetadata} 
                  isLoading={isAnalyzing} 
                />
                
                <FormatSelector 
                  formats={videoFormats}
                  selectedFormat={selectedFormat}
                  onSelectFormat={setSelectedFormat}
                  isLoading={isAnalyzing}
                />
                
                <DownloadButton 
                  onDownload={handleDownload}
                  isDisabled={!videoMetadata || !selectedFormat}
                  isLoading={isDownloading}
                />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="downloads">
            <DownloadsList downloads={downloads} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-3 text-center text-sm text-muted-foreground">
        <p>VidGrabber &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
