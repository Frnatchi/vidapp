
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a5986b9995374ff5bff56a12b9fcec8e',
  appName: 'vid-grabber-android-app',
  webDir: 'dist',
  server: {
    url: 'https://a5986b99-9537-4ff5-bff5-6a12b9fcec8e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Filesystem: {
      directory: 'DOCUMENTS'
    },
    Permissions: {
      permissions: [
        "storage"
      ]
    },
    Toast: {
      // Default Toast configuration
    }
  }
};

export default config;
