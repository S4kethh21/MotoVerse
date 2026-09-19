import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOTORCYCLES } from '../data/motorcycles';
import { BRANDS } from '../data/brands';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { VideoPlayer } from '../components/VideoPlayer';
import { getBikeVideo } from '../utils/bikeVideos';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Check,
  Share2,
  Phone,
  User,
  MapPin,
  CheckCircle2,
  Sparkles,
  Film,
} from 'lucide-react';
import type { Motorcycle } from '../types';

const ANGLE_LABELS = [
  '01 / FULL MACHINE PROFILE',
  '02 / FRONT AERO & SUSPENSION',
  '03 / POWERTRAIN & CHASSIS CORE',
  '04 / COCKPIT & FUEL CELL',
  '05 / TAIL COWL & EXHAUST SYSTEM',
];

const MAJOR_CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Kolkata',
  'Jaipur',
  'Chandigarh',
];

interface BikeDetailPageProps {
  onToggleCompare?: (bike: Motorcycle) => void;
  comparedBikeIds?: string[];
}

export const BikeDetailPage: React.FC<BikeDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Robust bike lookup supporting exact ID, prefixed/suffixed ID, or name slug
  const bike = MOTORCYCLES.find((b) => 
    b.id === id || 
    b.id.endsWith(`-${id}`) || 
    b.id.replace(/^[a-z0-9]+-/, '') === id ||
    b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
  );

  // Active colourway ID
  const [selectedColourId, setSelectedColourId] = useState('');

  // Active variant index
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Active gallery photo index (for the dedicated gallery section)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Upper showroom stage display mode: 'photo' (default master showroom photography) or 'video' (official brand reel)
  const [stageMode, setStageMode] = useState<'video' | 'photo'>('photo');

  // Lightbox modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxCaption, setLightboxCaption] = useState('');

  // Test Ride / Enquiry Modal State
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCity, setEnquiryCity] = useState('Mumbai');
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Specifications tabs
  const [activeSpecTab, setActiveSpecTab] = useState<'specs' | 'features'>('specs');

  // Reset indices and stage mode if bike changes
  useEffect(() => {
    if (bike && bike.colours && bike.colours.length > 0) {
      if (bike.variants && bike.variants.length > 0 && bike.variants[0].colourIds && bike.variants[0].colourIds.length > 0) {
        setSelectedColourId(bike.variants[0].colourIds[0]);
      } else {
        setSelectedColourId(bike.colours[0].id || '0');
      }
    } else {
      setSelectedColourId('');
    }
    setStageMode('photo');
    setSelectedVariantIndex(0);
    setActiveGalleryIndex(0);
    setEnquirySubmitted(false);
    window.scrollTo(0, 0);
  }, [id, bike?.id]);

  // Reset active gallery photo when colour or variant switches
  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [selectedColourId, selectedVariantIndex]);

  const brandInfo = bike ? BRANDS.find((b) => b.name === bike.brand) : null;

  // Active variant and price
  const variants = bike && bike.variants && bike.variants.length > 0 ? bike.variants : null;
  const currentVariant = variants ? variants[selectedVariantIndex] : null;
  const currentPriceDisplay = currentVariant ? currentVariant.displayPrice : (bike?.price.displayPrice || '');
  const currentExShowroom = currentVariant ? currentVariant.exShowroom : (bike?.price.exShowroom || 0);

  // Full verified manufacturer colours array
  const allColours = (bike && bike.colours && bike.colours.length > 0) ? bike.colours : (
    bike ? [{ id: 'standard', name: 'Standard Edition', hex: '#dc2626', image: bike.image, gallery: bike.images || [bike.image] }] : []
  );

  // Active colour: resolve by selectedColourId or default to first
  const currentColour = allColours.find(c => c.id === selectedColourId) || allColours[0];

  // Resolve single authentic motorcycle video (if available)
  const bikeVideo = bike ? getBikeVideo(bike, currentColour) : null;

  // Primary active showroom stage image
  const stageImage = currentColour?.image || bike?.image || '';

  // Authentic Machine Gallery:
  // If the active colour has dedicated colourway gallery images, display them;
  // otherwise fallback to bike.gallery (real-world action photos) or bike.images
  const galleryImages: string[] = useMemo(() => {
    if (!bike) return [];
    if (currentColour && currentColour.gallery && currentColour.gallery.length > 1) {
      return currentColour.gallery;
    }
    if (bike.gallery && bike.gallery.length > 0) return bike.gallery;
    if (bike.images && bike.images.length > 0) return bike.images;
    return [stageImage];
  }, [bike, currentColour, stageImage]);

  const currentGalleryPhoto = galleryImages[activeGalleryIndex] || galleryImages[0] || '';

  // Calculated EMI estimate (85% loan @ 9.5% for 48 months)
  const loanAmount = Math.round(currentExShowroom * 0.85);
  const monthlyRate = 0.095 / 12;
  const tenureMonths = 48;
  const estimatedEMI = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openLightbox = (imgUrl: string, caption: string) => {
    setLightboxImage(imgUrl);
    setLightboxCaption(caption);
    setIsLightboxOpen(true);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;
    setEnquirySubmitted(true);
    setTimeout(() => {
      setIsEnquiryOpen(false);
      setEnquirySubmitted(false);
      setEnquiryName('');
      setEnquiryPhone('');
    }, 2800);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        setActiveGalleryIndex((prev) => {
          const next = prev > 0 ? prev - 1 : galleryImages.length - 1;
          setLightboxImage(galleryImages[next]);
          setLightboxCaption(`${bike?.name || 'Machine'} — ${ANGLE_LABELS[next]}`);
          return next;
        });
      }
      if (e.key === 'ArrowRight') {
        setActiveGalleryIndex((prev) => {
          const next = prev < galleryImages.length - 1 ? prev + 1 : 0;
          setLightboxImage(galleryImages[next]);
          setLightboxCaption(`${bike?.name || 'Machine'} — ${ANGLE_LABELS[next]}`);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, galleryImages, bike?.name]);

  if (!bike) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#0a0c0f]">
        <h2 className="font-display font-black text-3xl text-white mb-3 uppercase tracking-tight">
          Machine Not Found
        </h2>
        <p className="text-neutral-400 text-sm max-w-md mb-8 font-sans">
          The requested motorcycle could not be located in our verified fleet directory.
        </p>
        <button
          onClick={() => navigate('/bikes')}
          className="px-6 py-3 bg-[#e50914] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Fleet Directory</span>
        </button>
      </div>
    );
  }

  // Find 3 similar motorcycles in same category (excluding current)
  const similarBikes = MOTORCYCLES.filter(
    (b) => b.category === bike.category && b.id !== bike.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#07080a] text-white pt-20 pb-24 selection:bg-red-600 selection:text-white">
      {/* Sub-Header / Showroom Breadcrumb Navigation */}
      <div className="border-b border-[#1a1d24] bg-[#0c0e14]/90 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/bikes" className="hover:text-white transition-colors">
              Motorcycles
            </Link>
            <span>/</span>
            {brandInfo && (
              <>
                <Link
                  to={`/brands/${brandInfo.slug}`}
                  className="hover:text-white transition-colors text-neutral-300"
                >
                  {bike.brand}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white font-bold truncate max-w-[180px]">{bike.name}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              <a href="#showroom-stage" className="hover:text-red-500 transition-colors">
                Configurator
              </a>
              <a href="#specifications-section" className="hover:text-red-500 transition-colors">
                Specs &amp; Features
              </a>
              <a href="#gallery-section" className="hover:text-red-500 transition-colors">
                Machine Gallery
              </a>
              {bikeVideo && (
                <button
                  type="button"
                  onClick={() => {
                    setStageMode('video');
                    const el = document.getElementById('showroom-stage');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-500 transition-colors uppercase font-mono"
                >
                  Official Video
                </button>
              )}
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors uppercase font-bold text-[11px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DIGITAL MOTORCYCLE SHOWROOM STAGE & CONFIGURATOR HUB                   */}
      {/* ========================================================================= */}
      <section id="showroom-stage" className="relative pt-6 sm:pt-10 pb-16 overflow-hidden border-b border-[#1a1d24]">
        {/* Background Atmosphere Lights */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/[0.03] blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT / MAIN SHOWROOM STAGE: Dominant Studio Motorcycle Hero    */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-7 flex flex-col justify-center relative">
              {/* Massive Ghost Watermark Typography behind the bike */}
              <div className="absolute -top-6 sm:-top-10 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.06] text-center">
                <span className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tighter uppercase whitespace-nowrap text-white">
                  {bike.name}
                </span>
              </div>

              {/* Showroom Presentation Pedestal / Video Stage */}
              <div 
                className="relative h-[340px] sm:h-[460px] lg:h-[520px] w-full rounded-2xl overflow-hidden border border-[#222631]/80 bg-gradient-to-b from-[#11131a] via-[#090b0f] to-[#06070a] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group flex items-center justify-center select-none"
              >
                {stageMode === 'video' && bikeVideo ? (
                  <div className="relative z-10 w-full h-full">
                    <VideoPlayer
                      src={bikeVideo.src}
                      poster={stageImage}
                      title={bikeVideo.title}
                      subtitle={bikeVideo.subtitle}
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      className="w-full h-full object-contain sm:object-cover"
                      containerClassName="w-full h-full rounded-2xl border-0 bg-transparent"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => openLightbox(stageImage, `${bike.name} — ${currentColour.name}`)}
                    className="relative z-10 w-full h-full p-4 sm:p-8 flex items-center justify-center cursor-zoom-in"
                  >
                    {/* Neutral Studio Floor Pedestal / Soft Contact Shadow */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-black/80 blur-xl rounded-full pointer-events-none" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[76%] h-16 rounded-[100%] pointer-events-none border border-white/[0.04] bg-white/[0.01]" />
                    
                    {/* The Motorcycle Image — Pure manufacturer image with smooth crossfade */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <ImageWithFallback
                        key={stageImage}
                        src={stageImage}
                        alt={`${bike.name} - ${currentColour.name}`}
                        className="max-h-[85%] max-w-[95%] object-contain group-hover:scale-[1.02] transition-all duration-300 ease-out drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] animate-fadeIn"
                        containerClassName="w-full h-full flex items-center justify-center"
                      />
                    </div>
                  </div>
                )}

                {/* Top Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-red-600 text-white shadow-md">
                      {bike.category}
                    </span>
                    {bikeVideo ? (
                      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 pointer-events-auto shadow-md">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStageMode('video');
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            stageMode === 'video'
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <Film className="w-3 h-3" />
                          <span>Official Video</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStageMode('photo');
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            stageMode === 'photo'
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>Studio Photo</span>
                        </button>
                      </div>
                    ) : (
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-neutral-300 border border-white/10">
                        Studio Configurator
                      </span>
                    )}
                    {currentColour?.image?.includes('/colourways/') && (
                      <span className="hidden sm:flex px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified Livery
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(stageImage, `${bike.name} — ${currentColour.name}`);
                      }}
                      className="p-2 rounded-lg bg-black/75 backdrop-blur-md text-neutral-300 hover:text-white border border-white/10 hover:border-red-500/60 transition-colors"
                      title="Inspect in Fullscreen Lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Stage Status HUD: Active Colour Name & Zoom prompt */}
                {stageMode === 'photo' && (
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-neutral-200">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm"
                        style={{
                          backgroundColor: currentColour.hex,
                          background: currentColour.secondaryHex
                            ? `linear-gradient(135deg, ${currentColour.hex} 50%, ${currentColour.secondaryHex} 50%)`
                            : currentColour.hex
                        }}
                      />
                      <span className="font-bold text-white">{currentColour.name}</span>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline-flex items-center gap-1">
                      <span>Click machine to zoom</span>
                      <span className="text-red-500">↗</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Stage Livery / Colour Quick Switcher Strip directly underneath */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#0f1117] border border-[#222631] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                    Colourways ({allColours.length}):
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    {currentColour.name}
                  </span>
                </div>

                {/* Interactive Colour Dots */}
                <div className="flex items-center gap-2.5">
                  {allColours.map((col) => {
                    const isSelected = col.id === currentColour.id;
                    const isBelongingToVariant = !currentVariant || !currentVariant.colourIds || currentVariant.colourIds.length === 0 || currentVariant.colourIds.includes(col.id || '');
                    return (
                      <button
                        key={col.id || col.name}
                        type="button"
                        onClick={() => {
                          setSelectedColourId(col.id || '');
                          setActiveGalleryIndex(0);
                          setStageMode('photo');
                          // Auto-sync variant if this colour is associated with a specific variant
                          if (variants && variants.length > 0 && col.id) {
                            const vIdx = variants.findIndex(v => v.colourIds && v.colourIds.includes(col.id!));
                            if (vIdx !== -1 && vIdx !== selectedVariantIndex) {
                              setSelectedVariantIndex(vIdx);
                            }
                          }
                        }}
                        className={`group relative p-0.5 rounded-full transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-red-500 scale-110 shadow-[0_0_12px_rgba(229,9,20,0.5)]'
                            : isBelongingToVariant
                              ? 'hover:scale-105 opacity-90 hover:opacity-100 ring-1 ring-white/20'
                              : 'hover:scale-105 opacity-45 hover:opacity-85 ring-1 ring-white/10'
                        }`}
                        title={isBelongingToVariant ? col.name : `${col.name} (Selects ${variants?.find(v => v.colourIds?.includes(col.id || ''))?.name || 'matching variant'})`}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/40 shadow-inner"
                          style={{
                            backgroundColor: col.hex,
                            background: col.secondaryHex
                              ? `linear-gradient(135deg, ${col.hex} 50%, ${col.secondaryHex} 50%)`
                              : col.hex
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT / INFORMATION & CONFIGURATOR HUB                        */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Official Brand Logo & Motto */}
                <div className="flex items-center gap-3.5 mb-3">
                  {brandInfo && (
                    <Link
                      to={`/brands/${brandInfo.slug}`}
                      className="p-2 rounded-lg bg-[#141720] border border-[#262a36] hover:border-red-500/50 transition-colors flex items-center justify-center group/logo"
                      title={`Explore ${brandInfo.name}`}
                    >
                      <img
                        src={brandInfo.logo}
                        alt={brandInfo.name}
                        className="h-7 w-auto max-w-[80px] object-contain group-hover/logo:scale-105 transition-transform"
                      />
                    </Link>
                  )}
                  <div>
                    <Link
                      to={brandInfo ? `/brands/${brandInfo.slug}` : '#'}
                      className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-red-500 hover:text-red-400 transition-colors block"
                    >
                      {bike.brand}
                    </Link>
                    {brandInfo && brandInfo.brandLine && (
                      <span className="text-[11px] font-serif italic text-neutral-400">
                        “{brandInfo.brandLine}”
                      </span>
                    )}
                  </div>
                </div>

                {/* Model Title */}
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-none mb-3">
                  {bike.name}
                </h1>

                {/* Model Tagline */}
                <p className="text-sm sm:text-base text-neutral-300 italic font-sans leading-snug mb-4 border-l-2 border-red-500 pl-3.5">
                  “{bike.tagline}”
                </p>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mb-6 line-clamp-3">
                  {bike.description}
                </p>

                {/* ======================================================== */}
                {/* EX-SHOWROOM PRICING BOX                                  */}
                {/* ======================================================== */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#11131a] border border-[#222631] relative overflow-hidden mb-6 shadow-lg">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/[0.04] rounded-bl-full pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                        Ex-Showroom Price (India)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                          {currentPriceDisplay}
                        </span>
                        <span className="text-xs font-mono text-red-500 font-bold">*</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-mono text-neutral-400 block">Est. Finance EMI</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                        ₹{estimatedEMI.toLocaleString('en-IN')}/month
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 block">@ 9.5% for 48m</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-mono text-neutral-500 leading-tight pt-2 border-t border-white/[0.06]">
                    *Prices may vary by location, dealership &amp; variant options. RTO registration, road tax &amp; insurance extra.
                  </p>
                </div>

                {/* ======================================================== */}
                {/* VARIANT / EDITION SELECTOR                               */}
                {/* ======================================================== */}
                {variants && variants.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold uppercase tracking-wider text-neutral-300">
                        Select Variant / Edition:
                      </span>
                      <span className="text-neutral-400">
                        {currentVariant?.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {variants.map((v, idx) => {
                        const isSelected = idx === selectedVariantIndex;
                        return (
                          <button
                            key={v.name + idx}
                            type="button"
                            onClick={() => {
                              setSelectedVariantIndex(idx);
                              if (v.colourIds && v.colourIds.length > 0 && !v.colourIds.includes(currentColour.id || '')) {
                                const targetCol = allColours.find(c => v.colourIds!.includes(c.id || ''));
                                if (targetCol) {
                                  setSelectedColourId(targetCol.id || '');
                                  setActiveGalleryIndex(0);
                                }
                              }
                            }}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              isSelected
                                ? 'bg-red-600/10 border-red-500 text-white shadow-md'
                                : 'bg-[#111318] border-[#262a35] text-neutral-300 hover:border-neutral-500'
                            }`}
                          >
                            <span className="block text-xs font-bold font-sans">{v.name}</span>
                            <span className="block text-[11px] font-mono text-neutral-400 mt-0.5">
                              {v.displayPrice}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Key Spec Mini Matrix */}
                <div className="grid grid-cols-4 gap-2 p-3 bg-[#0d0f14] rounded-lg border border-[#1f232e] mb-6 text-center font-mono">
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase block">Engine</span>
                    <span className="text-xs font-bold text-white">{bike.displacement} cc</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase block">Power</span>
                    <span className="text-xs font-bold text-red-400">{bike.power} bhp</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase block">Torque</span>
                    <span className="text-xs font-bold text-white">{bike.torque} Nm</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase block">Weight</span>
                    <span className="text-xs font-bold text-neutral-300">{bike.weight} kg</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-[#222631]">
                <div className="flex items-center gap-3">
                  {/* Primary CTA: Book / Test Ride */}
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="flex-1 py-3.5 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(229,9,20,0.3)] hover:shadow-[0_6px_25px_rgba(229,9,20,0.45)] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Book / Request Test Ride</span>
                  </button>

                  {/* Share button */}
                  <button
                    type="button"
                    onClick={handleShare}
                    className="py-3.5 px-3.5 rounded-lg bg-[#141720] hover:bg-[#1c202d] border border-[#262a36] text-neutral-400 hover:text-white transition-colors"
                    title="Copy machine link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {copied && (
                  <p className="text-[11px] font-mono text-emerald-400 text-center animate-fadeIn">
                    ✓ Link copied to clipboard!
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DETAILED SPECIFICATIONS & FEATURES SECTION                             */}
      {/* ========================================================================= */}
      <section id="specifications-section" className="py-20 border-b border-[#1a1d24] bg-[#07080a]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 border-b border-[#222631] mb-10">
            <button
              onClick={() => setActiveSpecTab('specs')}
              className={`pb-4 text-xs font-mono uppercase tracking-wider font-bold transition-colors relative ${
                activeSpecTab === 'specs'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Engine &amp; Chassis Specifications
              {activeSpecTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveSpecTab('features')}
              className={`pb-4 text-xs font-mono uppercase tracking-wider font-bold transition-colors relative ${
                activeSpecTab === 'features'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Engineering Features ({bike.features.length})
              {activeSpecTab === 'features' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
          </div>

          {activeSpecTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Group 1: Powertrain */}
              <div className="bg-[#111318] rounded-xl border border-[#222631] p-6 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold border-b border-[#222631] pb-2">
                  Powertrain &amp; Dynamics
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Displacement</span>
                    <span className="text-white font-mono font-bold">{bike.displacement} cc</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Engine Type</span>
                    <span className="text-white font-medium text-right max-w-[200px]">{bike.engineType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Max Power</span>
                    <span className="text-red-400 font-mono font-bold">{bike.power} bhp</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Peak Torque</span>
                    <span className="text-white font-mono font-bold">{bike.torque} Nm</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Transmission</span>
                    <span className="text-white font-medium text-right">{bike.transmission}</span>
                  </div>
                </div>
              </div>

              {/* Group 2: Dimensions & Weights */}
              <div className="bg-[#111318] rounded-xl border border-[#222631] p-6 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold border-b border-[#222631] pb-2">
                  Dimensions &amp; Chassis
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Curb Weight</span>
                    <span className="text-white font-mono font-bold">{bike.weight} kg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Fuel Capacity</span>
                    <span className="text-white font-mono font-bold">{bike.fuelCapacity} L</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Top Speed</span>
                    <span className="text-white font-mono font-bold">{bike.topSpeed} km/h</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Approx. Fuel Economy</span>
                    <span className="text-white font-mono font-bold">~{bike.mileage} km/l</span>
                  </div>
                </div>
              </div>

              {/* Group 3: Commercial & Warranty */}
              <div className="bg-[#111318] rounded-xl border border-[#222631] p-6 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold border-b border-[#222631] pb-2">
                  Market &amp; Availability
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Ex-Showroom Price</span>
                    <span className="text-white font-mono font-bold">{currentPriceDisplay}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Origin / Brand</span>
                    <span className="text-white">{bike.brand}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Category</span>
                    <span className="text-white">{bike.category}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Colourways Available</span>
                    <span className="text-white font-bold">{allColours.length} manufacturer shades</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSpecTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bike.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#111318] border border-[#222631] flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-md bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block mb-0.5">
                      FEATURE #{idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-white">{feat}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DEDICATED AUTHENTIC MACHINE GALLERY SECTION                             */}
      {/* ========================================================================= */}
      <section id="gallery-section" className="py-20 bg-[#090b0f] border-b border-[#1a1d24]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#222631]">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-500 mb-1">
                Authentic Machine Photography
              </p>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Official Machine Gallery
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs font-mono text-neutral-400">
              Verified real-world action, track &amp; engineering photography for <span className="text-white font-bold">{bike.name}</span>
            </p>
          </div>

          {/* Large Preview Stage */}
          <div 
            onClick={() => openLightbox(currentGalleryPhoto, `${bike.name} — Photo 0${activeGalleryIndex + 1}`)}
            className="relative h-80 sm:h-[440px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-[#222631] bg-[#0c0e14] group shadow-2xl cursor-zoom-in mb-4"
          >
            <ImageWithFallback
              src={currentGalleryPhoto}
              alt={`${bike.name} - Photo 0${activeGalleryIndex + 1}`}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Photo HUD tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white">
                <span className="text-red-500 mr-1.5 font-bold">●</span>
                SHOT 0{activeGalleryIndex + 1}
              </span>
            </div>

            {/* Expand Fullscreen Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(currentGalleryPhoto, `${bike.name} — ${ANGLE_LABELS[activeGalleryIndex]}`);
                }}
                className="p-2 rounded-lg bg-black/80 backdrop-blur-md text-white border border-white/10 hover:border-red-500 transition-colors"
                title="Open Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Prev / Next Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 text-white border border-white/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGalleryIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 text-white border border-white/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* 5 Thumbnails Strip */}
          <div className="grid grid-cols-5 gap-2.5 sm:gap-4">
            {galleryImages.slice(0, 5).map((imgUrl, idx) => {
              const isSelected = idx === activeGalleryIndex;
              return (
                <button
                  key={imgUrl + idx}
                  type="button"
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`relative h-18 sm:h-24 rounded-xl overflow-hidden border transition-all text-left group/thumb ${
                    isSelected
                      ? 'border-red-500 ring-2 ring-red-500/40 shadow-[0_0_15px_rgba(229,9,20,0.35)] scale-[1.02]'
                      : 'border-[#222631] hover:border-neutral-500 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={imgUrl}
                    alt={`${bike.name} thumb ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className={`absolute bottom-1.5 left-2 text-[10px] font-mono font-bold ${
                    isSelected ? 'text-red-400' : 'text-neutral-400'
                  }`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 4. SIMILAR FLEET BENCHMARKS                                               */}
      {/* ========================================================================= */}
      {similarBikes.length > 0 && (
        <section className="py-20 border-t border-[#1a1d24] bg-[#0a0c0f]">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 mb-1">
                  Cross-Shopping Matrix
                </p>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Similar in {bike.category}
                </h3>
              </div>
              <Link
                to={`/categories/${bike.category.toLowerCase()}`}
                className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarBikes.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/bikes/${sim.id}`}
                  className="group bg-[#111318] rounded-xl border border-[#222631] hover:border-red-500/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#07080a]">
                    <ImageWithFallback
                      src={sim.image}
                      alt={sim.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#0a0c0f]/80 text-neutral-300">
                        {sim.displacement} cc
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-0.5">
                        {sim.brand}
                      </p>
                      <h4 className="font-display font-bold text-base text-white group-hover:text-red-400 transition-colors">
                        {sim.name}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {sim.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#222631] flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">{sim.price.displayPrice}</span>
                      <span className="group-hover:translate-x-1 transition-transform text-red-500 font-bold">
                        Inspect →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. FULLSCREEN SHOWROOM LIGHTBOX MODAL                                     */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">
                {bike.brand}
              </span>
              <span className="text-neutral-500">/</span>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                {bike.name}
              </h3>
              {lightboxCaption && (
                <span className="hidden md:inline-block text-xs font-mono text-neutral-400">
                  — {lightboxCaption}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Center Photo */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt={lightboxCaption || bike.name}
              className="max-h-[78vh] max-w-[92vw] object-contain rounded-lg shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Modal Bottom Thumbnail Switcher */}
          <div
            className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={'modal-gallery-' + idx}
                type="button"
                onClick={() => {
                  setLightboxImage(imgUrl);
                  setLightboxCaption(`${bike.name} — ${ANGLE_LABELS[idx]}`);
                }}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden border transition-all ${
                  lightboxImage === imgUrl
                    ? 'border-red-500 ring-2 ring-red-500/50 scale-105'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TEST RIDE & DEALERSHIP ENQUIRY MODAL                                  */}
      {/* ========================================================================= */}
      {isEnquiryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsEnquiryOpen(false)}
        >
          <div
            className="bg-[#11131a] border border-[#262a36] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEnquiryOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Enquiry Registered!
                </h3>
                <p className="text-neutral-300 text-sm max-w-sm mx-auto">
                  Thank you, <span className="text-white font-bold">{enquiryName}</span>. The nearest authorized {bike.brand} dealership in <span className="text-white font-bold">{enquiryCity}</span> will contact you shortly to schedule your test ride for the {bike.name}.
                </p>
                <span className="text-xs font-mono text-neutral-500 block pt-2">
                  Window closing automatically...
                </span>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 block mb-1">
                    Official Dealership Network
                  </span>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Book a Test Ride: {bike.name}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1">
                    Ex-showroom: <span className="text-white font-mono font-bold">{currentPriceDisplay}</span> • Shade: <span className="text-red-400 font-bold">{currentColour.name}</span>
                  </p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1.5 uppercase">
                      Select Your City
                    </label>
                    <div className="relative">
                      <select
                        value={enquiryCity}
                        onChange={(e) => setEnquiryCity(e.target.value)}
                        className="w-full bg-[#181b24] border border-[#2a2f3d] rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none appearance-none font-sans"
                      >
                        {MAJOR_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1.5 uppercase">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arjun Sharma"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="w-full bg-[#181b24] border border-[#2a2f3d] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none font-sans"
                      />
                      <User className="w-3.5 h-3.5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1.5 uppercase">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-[#181b24] border border-[#2a2f3d] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none font-mono"
                      />
                      <Phone className="w-3.5 h-3.5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Summary Callout */}
                  <div className="p-3 bg-[#161922] rounded-lg border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Selected Shade:</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: currentColour.hex }}
                      />
                      {currentColour.name}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg"
                  >
                    Confirm Test Ride Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
