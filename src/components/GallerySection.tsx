import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DomeGallery from './DomeGallery';
import { MOTORCYCLES } from '../data/motorcycles';
import { getCuratedDomeImages } from '../utils/domeImages';

export const GallerySection: React.FC = () => {
  const navigate = useNavigate();

  // Curate 185 unique, brand-interleaved real motorcycle photos from MOTORCYCLES
  const galleryImages = useMemo(() => {
    return getCuratedDomeImages(MOTORCYCLES, 185);
  }, []);

  return (
    <section
      id="gallery"
      className="relative w-screen h-screen min-h-screen bg-[#0A0A0A] text-white selection:bg-red-600 selection:text-white overflow-hidden m-0 p-0"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Minimal Top-Left Header Overlay */}
      <div className="absolute top-[18px] left-[18px] sm:top-[28px] sm:left-[40px] z-20 pointer-events-none select-none">
        <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          MOTOVERSE GALLERY
        </h2>
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-400 uppercase mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          REAL MACHINES. REAL RIDES.
        </p>
      </div>

      {/* Fullscreen 3D Dome Gallery */}
      <div className="w-full h-full">
        <DomeGallery
          images={galleryImages}
          fit={0.72}
          fitBasis="auto"
          minRadius={520}
          padFactor={0.05}
          maxVerticalRotationDeg={5}
          dragSensitivity={20}
          enlargeTransitionMs={400}
          segments={35}
          dragDampening={0.85}
          openedImageWidth="520px"
          openedImageHeight="520px"
          imageBorderRadius="14px"
          openedImageBorderRadius="18px"
          grayscale={false}
          overlayBlurColor="#0A0A0A"
          onSelectBike={(_id: string, url: string) => navigate(url)}
        />
      </div>

      {/* Subtle Minimal Drag Hint Overlay (Bottom Right) */}
      <div className="absolute bottom-5 right-6 sm:bottom-7 sm:right-10 z-20 pointer-events-none select-none text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        <span>DRAG TO ROTATE &bull; CLICK TO INSPECT</span>
      </div>
    </section>
  );
};
