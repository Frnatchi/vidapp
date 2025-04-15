
import React from 'react';
import { Download } from "lucide-react";

const AppHeader: React.FC = () => {
  return (
    <header className="bg-gradient-brand text-white p-4 shadow-md w-full">
      <div className="flex items-center justify-center">
        <Download className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-bold">VidGrabber</h1>
      </div>
    </header>
  );
};

export default AppHeader;
