import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Volume2, VolumeX } from 'lucide-react';
import { HERO_VIDEO } from '../data/media';

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 16; // subtle shift
    const y = ((clientY - top) / height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleDiscoverBrands = () => {
    if (onScrollToSection) {
      onScrollToSection('brands');
    } else {
      const el = document.getElementById('brands');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else navigate('/brands');
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#0a0c0f]"
    >
      {/* Fullscreen Cinematic Motorcycle Video with Interactive Subtle Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1}px, 0) scale(1.04)`,
          }}
        >
          <video
            ref={videoRef}
            src={HERO_VIDEO.src}
            poster={HERO_VIDEO.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{ filter: 'brightness(1.15) contrast(1.05) saturate(1.05)' }}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
        </div>
        {/* Subtle Dark Editorial Gradients for Crystal-Clear Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/35 to-[#0a0c0f]/50 pointer-events-none" />
      </div>

      {/* Floating Subtle Audio Control */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:block">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white text-xs font-mono tracking-wider transition-all"
          title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span className="text-[10px] uppercase font-bold tracking-widest">{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>
      </div>

      {/* Hero Stable Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle Official MotoVerse Emblem Crest */}
        <div className="mb-4 inline-flex items-center justify-center">
          <img
            src="/images/brand/motoverse-emblem.png"
            alt="MotoVerse Emblem"
            className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_4px_24px_rgba(229,9,20,0.6)] opacity-95"
          />
        </div>

        {/* Exact Label Requested */}
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-5">
          MOTOVERSE / MOTORCYCLE DISCOVERY
        </p>

        {/* Exact Headline Requested */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.92] mb-6">
          RIDE BEYOND <br className="hidden sm:inline" />
          <span className="text-white">LIMITS.</span>
        </h1>

        {/* Exact Description Requested */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-10">
          “Explore machines built for speed, freedom and every road in between.”
        </p>

        {/* Exact Buttons Requested */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-sm mx-auto mb-16">
          <button
            onClick={() => navigate('/bikes')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#e50914] hover:bg-[#c70812] text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Explore Motorcycles</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDiscoverBrands}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#161920]/90 hover:bg-[#20242e] text-neutral-200 hover:text-white border border-[#262a35] font-semibold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-neutral-400" />
            <span>Discover Brands</span>
          </button>
        </div>

        {/* Exact Bottom Navigation / Scroll Indicator Requested */}
        <div className="pt-8 border-t border-white/[0.08] flex items-center justify-center gap-6 sm:gap-12 text-center">
          <button
            onClick={() => navigate('/bikes')}
            className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
          >
            01 — DISCOVER
          </button>
          <span className="text-neutral-700">•</span>
          <button
            onClick={handleDiscoverBrands}
            className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
          >
            02 — BRANDS
          </button>
          <span className="text-neutral-700">•</span>
          <button
            onClick={() => {
              const el = document.getElementById('categories');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('/categories');
            }}
            className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
          >
            03 — CATEGORIES
          </button>
        </div>
      </div>
    </section>
  );
};
