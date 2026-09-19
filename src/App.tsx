import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { CreatorModal } from './components/CreatorModal';

// Route-level Code Splitting for optimal web performance
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ExplorePage = lazy(() => import('./pages/ExplorePage').then(m => ({ default: m.ExplorePage })));
const BikeDetailPage = lazy(() => import('./pages/BikeDetailPage').then(m => ({ default: m.BikeDetailPage })));
const BrandsDirectoryPage = lazy(() => import('./pages/BrandsDirectoryPage').then(m => ({ default: m.BrandsDirectoryPage })));
const BrandDetailPage = lazy(() => import('./pages/BrandDetailPage').then(m => ({ default: m.BrandDetailPage })));
const CategoriesDirectoryPage = lazy(() => import('./pages/CategoriesDirectoryPage').then(m => ({ default: m.CategoriesDirectoryPage })));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage').then(m => ({ default: m.CategoryDetailPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage').then(m => ({ default: m.ArticlesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#0a0c0f]">
    <div className="w-8 h-8 rounded-full border-2 border-red-600/20 border-t-red-600 animate-spin" />
  </div>
);

const AppLayout: React.FC = () => {
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-neutral-100 flex flex-col font-sans selection:bg-[#e50914] selection:text-white">
      <ScrollToTop />

      {/* 2-3s Initial Loading Screen with MotoVerse Logo & Branding */}
      <LoadingScreen />

      {/* Top Sticky Navigation with ⓘ Creator Info Entry */}
      <Navbar onOpenCreator={() => setIsCreatorModalOpen(true)} />

      {/* Main Routed Content with Lazy Suspense */}
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bikes" element={<ExplorePage />} />
            <Route path="/bikes/:id" element={<BikeDetailPage />} />
            <Route path="/brands" element={<BrandsDirectoryPage />} />
            <Route path="/brands/:brand" element={<BrandDetailPage />} />
            <Route path="/categories" element={<CategoriesDirectoryPage />} />
            <Route path="/categories/:category" element={<CategoryDetailPage />} />

            {/* Clean redirect for /compare -> /bikes (Explore) */}
            <Route path="/compare" element={<Navigate to="/bikes" replace />} />

            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/news" element={<ArticlesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<AboutPage />} />

            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Modern Automotive Footer with ⓘ Creator Info Entry */}
      <Footer onOpenCreator={() => setIsCreatorModalOpen(true)} />

      {/* Minimal About the Creator Modal */}
      <CreatorModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
