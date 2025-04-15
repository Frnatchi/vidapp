
import { VideoMetadata, VideoFormat, DownloadItem } from "../types/video";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';

// Mock data - In a real app, this would be replaced by actual API calls
const mockVideoData = (url: string): Promise<{ metadata: VideoMetadata, formats: VideoFormat[] }> => {
  // Extract video ID from URL (simplified)
  const videoId = url.includes('youtu.be') 
    ? url.split('/').pop() 
    : url.includes('v=') ? url.split('v=')[1].split('&')[0] : 'dQw4w9WgXcQ';
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        metadata: {
          id: videoId || 'dQw4w9WgXcQ',
          title: "Sample YouTube Video",
          thumbnail: `https://i.ytimg.com/vi/${videoId || 'dQw4w9WgXcQ'}/maxresdefault.jpg`,
          duration: "3:32",
          author: "YouTube Creator"
        },
        formats: [
          { id: "1", quality: "1080p", extension: "mp4", size: "120MB" },
          { id: "2", quality: "720p", extension: "mp4", size: "80MB" },
          { id: "3", quality: "480p", extension: "mp4", size: "45MB" },
          { id: "4", quality: "360p", extension: "mp4", size: "30MB" },
          { id: "5", quality: "Audio Only", extension: "mp3", size: "15MB" }
        ]
      });
    }, 1500);
  });
};

// Simulate download process with progress updates
const downloadVideo = async (
  metadata: VideoMetadata,
  format: VideoFormat,
  onProgress: (progress: number) => void
): Promise<string> => {
  // In a real app, this would be an actual download
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Create the simulated file
        const fileName = `${metadata.title.replace(/[^a-z0-9]/gi, '_')}.${format.extension}`;
        
        // In a real app, we would actually save the file
        // Here we'll just simulate a successful download
        resolve(fileName);
      }
      onProgress(progress);
    }, 300);
  });
};

const saveDownloadedFile = async (fileName: string, fileContent: Blob): Promise<string> => {
  try {
    // In a real implementation, we would save the actual file content
    // Here we just simulate it with a success message
    const filePath = `downloads/${fileName}`;
    
    // Log the file saving operation
    console.log(`File would be saved at: ${filePath}`);
    
    // Show success message
    await Toast.show({
      text: `Video saved successfully as ${fileName}`,
      duration: 'long'
    });
    
    return filePath;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
};

export const VideoService = {
  getVideoInfo: mockVideoData,
  downloadVideo,
  saveDownloadedFile
};
