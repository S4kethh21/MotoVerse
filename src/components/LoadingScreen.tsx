import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    // Hold loading screen for 2.3 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2300);

    // Completely unmount after fade-out transition (duration 700ms)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#060709] flex flex-col items-center justify-center px-6 select-none transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle ambient red automotive backlight */}
      <div className="absolute w-[320px] sm:w-[500px] h-[240px] sm:h-[350px] bg-red-600/[0.08] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* MotoVerse Official Logo */}
        <div className="mb-6 sm:mb-8">
          <img
            src="/images/brand/motoverse-logo-full.png"
            alt="MotoVerse"
            className="h-20 sm:h-28 md:h-32 w-auto object-contain filter drop-shadow-[0_10px_35px_rgba(229,9,20,0.4)]"
          />
        </div>

        {/* MotoVerse Headline */}
        <h2 className="font-display font-black text-xs sm:text-sm md:text-base tracking-[0.35em] sm:tracking-[0.45em] uppercase text-neutral-200 mb-6 sm:mb-8">
          MOTORCYCLES. STORIES. THE RIDE.
        </h2>

        {/* Sleek Progress Line Accent */}
        <div className="w-28 sm:w-36 h-[2px] bg-[#1a1d24] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-600 via-white to-red-600 w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
