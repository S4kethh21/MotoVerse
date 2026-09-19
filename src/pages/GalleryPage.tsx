import React from 'react';
import { GallerySection } from '../components/GallerySection';

export const GalleryPage: React.FC = () => {
  return (
    <div className="w-screen h-screen min-h-screen bg-[#0A0A0A] overflow-hidden text-white m-0 p-0">
      <GallerySection />
    </div>
  );
};
