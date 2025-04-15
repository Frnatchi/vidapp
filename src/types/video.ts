
export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

export interface VideoFormat {
  id: string;
  quality: string;
  extension: string;
  size: string;
}

export interface DownloadItem {
  id: string;
  metadata: VideoMetadata;
  format: VideoFormat;
  progress: number;
  status: 'queued' | 'downloading' | 'completed' | 'error';
  filePath?: string;
  error?: string;
}
