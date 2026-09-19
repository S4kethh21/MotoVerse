import React from 'react';
import { Hero } from '../components/Hero';
import { InteractiveShowcase } from '../components/InteractiveShowcase';
import { BrandsSection } from '../components/BrandsSection';
import { InteractiveCategorySelector } from '../components/InteractiveCategorySelector';
import { FeaturedBikesSection } from '../components/FeaturedBikesSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { GallerySection } from '../components/GallerySection';
import { AboutSection } from '../components/AboutSection';
import type { Motorcycle } from '../types';

interface HomePageProps {
  onToggleCompare?: (bike: Motorcycle) => void;
  comparedBikeIds?: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onToggleCompare,
  comparedBikeIds = [],
}) => {
  return (
    <div className="animate-fadeIn">
      {/* 1. ORIGINAL VIDEO HERO */}
      <Hero />

      {/* 2. FIND YOUR MACHINE (Immediately Below Hero with BMW S 1000 RR, Yamaha R15 V4, TVS Ronin, Kawasaki Ninja H2) */}
      <InteractiveShowcase
        onToggleCompare={onToggleCompare}
        comparedBikeIds={comparedBikeIds}
      />

      {/* 3. EXPLORE BY BRAND */}
      <BrandsSection />

      {/* 4. EXPLORE BY CATEGORY */}
      <InteractiveCategorySelector />

      {/* 5. FEATURED BIKES: TOP PICKS. REAL RIDES. (New Reference Design) */}
      <FeaturedBikesSection
        onToggleCompare={onToggleCompare}
        comparedBikeIds={comparedBikeIds}
      />

      {/* 6. LATEST STORIES */}
      <ArticlesSection />

      {/* 7. GALLERY ARCHIVES */}
      <GallerySection />

      {/* 8. ABOUT MOTOVERSE */}
      <AboutSection />
    </div>
  );
};
