import React from 'react';
import { ArticlesSection } from '../components/ArticlesSection';

export const ArticlesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0c0f] pt-16 pb-24 text-white">
      <ArticlesSection />
    </div>
  );
};
