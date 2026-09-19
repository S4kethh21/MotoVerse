import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import type { Motorcycle } from '../types';

interface ShowcaseSlide {
  id: string;
  brand: string;
  name: string;
  fullName: string;
  buttonTitle: string;
  category: string;
  displacement: string;
  power: string;
  price: string;
  tagline: string;
  image: string;
  videoSrc: string;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'bmw-s-1000-rr',
    brand: 'BMW Motorrad',
    name: 'S 1000 RR',
    fullName: 'BMW S 1000 RR',
    buttonTitle: 'BMW S 1000 RR',
    category: 'Supersport',
    displacement: '999 cc',
    power: '206.5 bhp',
    price: '₹20.75 Lakh*',
    tagline: 'Race DNA. Apex Dominance.',
    image: '/images/bikes/bmw/bmw-s1000rr-cutout.png',
    videoSrc: '/videos/bmw-s1000rr.mp4',
  },
  {
    id: 'yamaha-r15-v4',
    brand: 'Yamaha',
    name: 'YZF-R15 V4',
    fullName: 'Yamaha R15 V4',
    buttonTitle: 'YAMAHA R15 V4',
    category: 'Sport',
    displacement: '155 cc',
    power: '18.4 bhp',
    price: '₹1.82 Lakh*',
    tagline: 'Born of MotoGP DNA.',
    image: '/images/bikes/yamaha/colourways/r15-v4-side-sharp.png',
    videoSrc: '/video/yamaha-r15-v4.mp4',
  },
  {
    id: 'tvs-ronin',
    brand: 'TVS',
    name: 'Ronin',
    fullName: 'TVS Ronin',
    buttonTitle: 'TVS RONIN',
    category: 'Roadster',
    displacement: '226 cc',
    power: '20.4 bhp',
    price: '₹1.49 Lakh*',
    tagline: 'Unscripted Modern-Retro Agility.',
    image: '/images/bikes/tvs/colourways/tvs-ronin-sharp.png',
    videoSrc: '/video/tvs-ronin.mp4',
  },
  {
    id: 'kawasaki-ninja-h2',
    brand: 'Kawasaki',
    name: 'Ninja H2',
    fullName: 'Kawasaki Ninja H2',
    buttonTitle: 'KAWASAKI NINJA H2',
    category: 'Supersport',
    displacement: '998 cc',
    power: '231 bhp',
    price: '₹35.00 Lakh*',
    tagline: 'Built Beyond Belief. Supercharged Supremacy.',
    image: '/images/bikes/kawasaki/kawasaki-ninja-h2.png',
    videoSrc: '/videos/kawasaki-ninja-h2.mp4',
  },
];

interface InteractiveShowcaseProps {
  onToggleCompare?: (bike: Motorcycle) => void;
  comparedBikeIds?: string[];
}

export const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isBikeHovered, setIsBikeHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isAutoPaused, setIsAutoPaused] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeSlide = SHOWCASE_SLIDES[currentSlideIndex];

  // Control video playback based on hover state
  useEffect(() => {
    if (isBikeHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay catch handler
        });
      }
    } else if (!isBikeHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isBikeHovered, currentSlideIndex]);

  // Smooth cinematic bike switching
  const switchSlide = (targetIdx: number, direction: 'next' | 'prev' = 'next') => {
    if (targetIdx === currentSlideIndex || isTransitioning) return;
    setIsBikeHovered(false);
    setIsTransitioning(true);
    setSlideDirection(direction);

    // Initial fade/slide out
    setTimeout(() => {
      setCurrentSlideIndex(targetIdx);
      // Fade/slide in target bike
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 280);
  };

  const handlePrev = () => {
    const prevIdx = (currentSlideIndex - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length;
    switchSlide(prevIdx, 'prev');
  };

  const handleNext = () => {
    const nextIdx = (currentSlideIndex + 1) % SHOWCASE_SLIDES.length;
    switchSlide(nextIdx, 'next');
  };

  // Optional background subtle auto-advance when not interacting
  useEffect(() => {
    if (isAutoPaused || isBikeHovered || isTransitioning) return;
    const timer = setInterval(() => {
      const nextIdx = (currentSlideIndex + 1) % SHOWCASE_SLIDES.length;
      switchSlide(nextIdx, 'next');
    }, 9000);
    return () => clearInterval(timer);
  }, [isAutoPaused, isBikeHovered, isTransitioning, currentSlideIndex]);

  return (
    <section
      id="find-your-machine"
      onMouseEnter={() => setIsAutoPaused(true)}
      onMouseLeave={() => {
        setIsAutoPaused(false);
        setIsBikeHovered(false);
      }}
      className="py-20 lg:py-24 bg-[#08090d] border-t border-[#1a1d24] relative overflow-hidden"
    >
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/[0.035] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-white/[0.015] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Typography & Action Buttons (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-400">
                CURATED SHOWCASE
              </span>
            </div>

            {/* Section Headline */}
            <h2 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.95] mb-5">
              FIND YOUR <br />
              <span className="text-[#e50914]">MACHINE.</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base font-normal leading-relaxed max-w-md mb-8">
              Explore high-performance motorcycles engineered for track, street, and adventure. Authentic specifications, official colourways, and verified exhaust reels.
            </p>

            {/* Dynamic Explore Button for the Selected Motorcycle */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={() => navigate(`/bikes/${activeSlide.id}`)}
                className={`px-7 py-3.5 bg-[#e50914] hover:bg-[#c70812] text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(229,9,20,0.4)] hover:shadow-[0_6px_25px_rgba(229,9,20,0.6)] cursor-pointer group ${
                  isTransitioning ? 'opacity-60 scale-98' : 'opacity-100 scale-100'
                }`}
              >
                <span>EXPLORE {activeSlide.buttonTitle}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('brands');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/brands');
                }}
                className="px-7 py-3.5 bg-[#14171f] hover:bg-[#1e2330] text-neutral-200 hover:text-white border border-[#2a2f3d] font-bold text-xs tracking-wider uppercase rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE BRANDS</span>
              </button>
            </div>

            {/* Active Machine Telemetry Bar with Smooth Text Transition */}
            <div
              className={`flex items-center gap-6 pt-6 border-t border-white/[0.08] transition-all duration-500 ease-out ${
                isTransitioning ? 'opacity-30 -translate-y-1 blur-[0.5px]' : 'opacity-100 translate-y-0 blur-0'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Displacement
                </span>
                <span className="text-sm font-bold font-mono text-white">
                  {activeSlide.displacement}
                </span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Power Output
                </span>
                <span className="text-sm font-bold font-mono text-white">
                  {activeSlide.power}
                </span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Starting Price
                </span>
                <span className="text-sm font-bold font-mono text-white">
                  {activeSlide.price}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Motorcycle Stage Presentation & Floating Spec Badge (Span 7) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
            
            {/* Top Right Floating Badge with Model Name & Explore Action */}
            <div
              className={`absolute top-0 right-0 sm:right-4 z-20 bg-[#11131a]/90 backdrop-blur-md border border-[#262a35] rounded-xl p-3.5 sm:p-4 text-left shadow-2xl max-w-[220px] sm:max-w-[250px] transition-all duration-500 ease-out ${
                isTransitioning ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e50914] block">
                {activeSlide.brand}
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-tight mt-0.5 mb-1">
                {activeSlide.name}
              </h3>
              <p className="text-[11px] text-neutral-400 line-clamp-1 mb-2.5 font-mono">
                {activeSlide.tagline}
              </p>
              <button
                onClick={() => navigate(`/bikes/${activeSlide.id}`)}
                className="text-xs font-bold text-white hover:text-red-400 flex items-center gap-1.5 transition-colors uppercase tracking-wider group cursor-pointer"
              >
                <span>EXPLORE {activeSlide.buttonTitle}</span>
                <ArrowRight className="w-3 h-3 text-[#e50914] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Center Stage Presentation */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              
              {/* Studio Stage Turntable Contact Shadow & Reflective Ring */}
              <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[85%] sm:w-[75%] h-12 bg-black/85 blur-xl rounded-full pointer-events-none" />
              <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[72%] h-16 border border-white/[0.05] rounded-[100%] pointer-events-none" />

              {/* Interactive Motorcycle Stage with Smooth Cinematic Transitions & Video Hover */}
              <div
                onMouseEnter={() => setIsBikeHovered(true)}
                onMouseLeave={() => setIsBikeHovered(false)}
                onClick={() => navigate(`/bikes/${activeSlide.id}`)}
                className={`relative z-10 w-full h-72 sm:h-96 lg:h-[460px] flex items-center justify-center cursor-pointer group transition-all duration-500 ease-out ${
                  isTransitioning
                    ? slideDirection === 'next'
                      ? 'opacity-0 translate-x-6 scale-98 blur-[1px]'
                      : 'opacity-0 -translate-x-6 scale-98 blur-[1px]'
                    : 'opacity-100 translate-x-0 scale-100 blur-0'
                }`}
              >
                {/* 1. NORMAL STATE: Clean High-Quality Motorcycle Image */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                    isBikeHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    key={activeSlide.id}
                    src={activeSlide.image}
                    alt={activeSlide.fullName}
                    className="max-h-[92%] max-w-[95%] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-all duration-500 group-hover:scale-105"
                    containerClassName="w-full h-full flex items-center justify-center"
                  />
                  
                  {/* Subtle Hover Video Cue */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Play className="w-2.5 h-2.5 fill-red-500 text-red-500" />
                    <span>Hover to play {activeSlide.name} reel</span>
                  </div>
                </div>

                {/* 2. HOVER STATE: Matching Bike Video Plays Smoothly inside the same visual frame */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                    isBikeHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_20px_50px_rgba(229,9,20,0.3)] bg-black">
                    <video
                      ref={videoRef}
                      key={activeSlide.videoSrc}
                      src={activeSlide.videoSrc}
                      poster={activeSlide.image}
                      muted
                      loop
                      playsInline
                      style={{ filter: 'brightness(1.18) contrast(1.05)' }}
                      className="w-full h-full object-cover"
                    />

                    {/* Active Reel Indicator */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-red-500/40 text-[10px] font-mono font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span>{activeSlide.fullName} • REEL</span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1 uppercase">
                      <span>Click to view machine</span>
                      <ArrowRight className="w-3 h-3 text-red-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slide Controls & Direct Bike Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-[#1b1e27]">
          
          {/* Direct Bike Model Selector Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => switchSlide(idx, idx > currentSlideIndex ? 'next' : 'prev')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#e50914] text-white shadow-[0_2px_10px_rgba(229,9,20,0.4)]'
                      : 'bg-[#14171f] text-neutral-400 hover:text-white hover:bg-[#1f2432] border border-[#2a2f3d]'
                  }`}
                  title={slide.fullName}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-neutral-500'}`} />
                  <span>{slide.name}</span>
                </button>
              );
            })}
          </div>

          {/* Center 01 / 04 Slide Controls */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-neutral-400">
              <span className="text-white">0{currentSlideIndex + 1}</span> / 0{SHOWCASE_SLIDES.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-[#14171f] hover:bg-[#1e2330] border border-[#2a2f3d] flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Previous machine"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-[#14171f] hover:bg-[#1e2330] border border-[#2a2f3d] flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Next machine"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Label */}
          <div className="hidden sm:block text-right">
            <span className="text-xs font-mono text-neutral-400">
              Selected: <span className="text-white font-bold">{activeSlide.fullName}</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
