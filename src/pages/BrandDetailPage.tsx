import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { MOTORCYCLES } from '../data/motorcycles';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  Globe,
  Calendar,
} from 'lucide-react';
import type { Motorcycle } from '../types';

interface BrandDetailPageProps {
  onToggleCompare?: (bike: Motorcycle) => void;
  comparedBikeIds?: string[];
}

interface BrandBikeCardProps {
  bike: Motorcycle;
  onNavigate: (id: string) => void;
}

const BrandBikeCard: React.FC<BrandBikeCardProps> = ({ bike, onNavigate }) => {
  const [activeColourIndex, setActiveColourIndex] = useState(0);

  const activeColour =
    bike.colours && bike.colours.length > 0 && bike.colours[activeColourIndex]
      ? bike.colours[activeColourIndex]
      : null;

  const displayImage = activeColour?.image || bike.image;

  return (
    <div className="group bg-[#111318] rounded-xl border border-[#222631] hover:border-[#383e50] overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Motorcycle Image */}
      <div
        onClick={() => onNavigate(bike.id)}
        className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-[#12141c] to-[#08090d] cursor-pointer flex items-center justify-center p-4 group/img"
      >
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-black/70 blur-lg rounded-full pointer-events-none" />
        <ImageWithFallback
          key={displayImage}
          src={displayImage}
          alt={`${bike.name} - ${activeColour?.name || 'Showroom'}`}
          className="max-h-[92%] max-w-[94%] object-contain group-hover:scale-105 transition-transform duration-500 filter brightness-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
          containerClassName="w-full h-full flex items-center justify-center"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a0c0f]/85 backdrop-blur-md text-white border border-white/10">
            {bike.category}
          </span>
        </div>
        {activeColour && (
          <div className="absolute top-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-[#0a0c0f]/90 text-neutral-300 border border-white/10 backdrop-blur-md">
              {activeColour.name}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onNavigate(bike.id)}
            className="font-display font-bold text-xl text-white group-hover:text-red-400 transition-colors cursor-pointer"
          >
            {bike.name}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
            {bike.tagline}
          </p>

          <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/[0.04]">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">
              Ex-Showroom
            </span>
            <span className="text-sm font-bold font-mono text-white">
              {bike.price.displayPrice}*
            </span>
          </div>

          {/* Interactive Colours */}
          {bike.colours && bike.colours.length > 0 && (
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-neutral-500 uppercase mr-1">
                  Colours:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {bike.colours.map((c, idx) => {
                    const isActive = idx === activeColourIndex;
                    return (
                      <button
                        key={c.name + idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveColourIndex(idx);
                        }}
                        onMouseEnter={() => setActiveColourIndex(idx)}
                        className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'border-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.5)] ring-1 ring-red-500'
                            : 'border-black/60 hover:scale-110 opacity-75 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: c.hex,
                          background: c.secondaryHex
                            ? `linear-gradient(135deg, ${c.hex} 50%, ${c.secondaryHex} 50%)`
                            : c.hex,
                        }}
                        title={c.name}
                        aria-label={`Select colour: ${c.name}`}
                      />
                    );
                  })}
                </div>
              </div>
              {activeColour && (
                <span className="text-[9px] font-mono text-neutral-400 truncate max-w-[120px] text-right">
                  {activeColour.name}
                </span>
              )}
            </div>
          )}

          {/* Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-[#0a0c0f]/60 rounded-lg border border-white/[0.04] mt-3 text-center">
            <div>
              <span className="text-[9px] uppercase font-mono text-neutral-400 block">Disp.</span>
              <span className="text-xs font-bold text-white font-mono">{bike.displacement} cc</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono text-neutral-400 block">Power</span>
              <span className="text-xs font-bold text-red-400 font-mono">{bike.power} bhp</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono text-neutral-400 block">Torque</span>
              <span className="text-xs font-bold text-white font-mono">{bike.torque} Nm</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-3.5 border-t border-[#222631] flex items-center justify-between">
          <button
            onClick={() => onNavigate(bike.id)}
            className="text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5 group-hover:text-red-400 transition-colors"
          >
            <span>View Machine</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const BrandDetailPage: React.FC<BrandDetailPageProps> = () => {
  const { brand: brandSlug } = useParams<{ brand: string }>();
  const navigate = useNavigate();

  // Find brand by slug with alias support (e.g. 'bmw' -> 'bmw-motorrad')
  const brand = BRANDS.find((b) => 
    b.slug === brandSlug ||
    b.id === brandSlug ||
    (brandSlug === 'bmw' && (b.slug === 'bmw-motorrad' || b.id === 'bmw-motorrad')) ||
    b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === brandSlug
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [displacementRange, setDisplacementRange] = useState<string>('All');

  const brandBikes = useMemo(() => {
    if (!brand) return [];
    return MOTORCYCLES.filter(
      (bike) =>
        bike.brandId === brand.id ||
        bike.brandId === brand.slug ||
        bike.brand.toLowerCase() === brand.name.toLowerCase()
    );
  }, [brand]);

  // Available categories for this brand
  const availableCategories = useMemo(() => {
    const cats = new Set(brandBikes.map((b) => b.category));
    return ['All', ...Array.from(cats)];
  }, [brandBikes]);

  // Filtered bikes
  const filteredBikes = useMemo(() => {
    return brandBikes.filter((bike) => {
      if (selectedCategory !== 'All' && bike.category !== selectedCategory) {
        return false;
      }
      if (displacementRange === 'under-400' && bike.displacement >= 400) {
        return false;
      }
      if (
        displacementRange === '400-900' &&
        (bike.displacement < 400 || bike.displacement > 900)
      ) {
        return false;
      }
      if (displacementRange === 'over-900' && bike.displacement <= 900) {
        return false;
      }
      return true;
    });
  }, [brandBikes, selectedCategory, displacementRange]);

  if (!brand) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="font-display font-black text-3xl text-white mb-3 uppercase tracking-tight">
          Brand Not Found
        </h2>
        <p className="text-neutral-400 text-sm max-w-md mb-8">
          The requested manufacturer could not be found in our registered marque directory.
        </p>
        <button
          onClick={() => navigate('/brands')}
          className="px-6 py-3 bg-[#e50914] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Brands</span>
        </button>
      </div>
    );
  }

  // Other brands for footer navigation
  const otherBrands = BRANDS.filter((b) => b.id !== brand.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0c0f] pt-20 pb-24 text-white">
      {/* Brand Hero Header */}
      <section className="relative overflow-hidden border-b border-[#222631] bg-[#0c0e14]">
        {/* Background Video or Image with Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {brand.video ? (
            <video
              src={brand.video}
              poster={brand.videoPoster || brand.heroImage}
              autoPlay
              loop
              muted
              playsInline
              style={{ filter: 'brightness(1.15) contrast(1.05) saturate(1.04)' }}
              className="w-full h-full object-cover object-center transition-all duration-700"
            />
          ) : (
            <ImageWithFallback
              src={brand.heroImage}
              alt={brand.name}
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-105"
              containerClassName="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/40 to-[#0a0c0f]/60 pointer-events-none" />
        </div>

        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/brands"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Marque Directory</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo & Headline */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 p-3 rounded-xl bg-[#0a0c0f]/80 border border-white/10 backdrop-blur-md flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-12 max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-red-500" />
                      {brand.origin}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      Est. {brand.founded}
                    </span>
                  </div>
                  <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none mt-1">
                    {brand.name}
                  </h1>
                  {brand.brandLine && (
                    <p className="text-xs font-serif italic text-red-400 mt-1">
                      “{brand.brandLine}”
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed font-normal mb-4">
                {brand.description}
              </p>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4">
              <div className="flex-1 p-5 rounded-xl bg-[#111318]/90 border border-[#222631] backdrop-blur-md">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  Verified Fleet Size
                </span>
                <p className="font-display font-black text-3xl text-white">
                  {brandBikes.length}{' '}
                  <span className="text-sm font-normal text-neutral-400">Models</span>
                </p>
              </div>

              <div className="flex-1 p-5 rounded-xl bg-[#111318]/90 border border-[#222631] backdrop-blur-md">
                <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                  Disciplines Covered
                </span>
                <p className="font-display font-black text-3xl text-white">
                  {availableCategories.length - 1}{' '}
                  <span className="text-sm font-normal text-neutral-400">Classes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222631]">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-red-500 mb-1">
              Official Showroom Range
            </p>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              Explore the Range
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs font-mono text-neutral-400">
            Showing {filteredBikes.length} of {brandBikes.length} official {brand.name} motorcycles
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#222631]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-mono uppercase text-neutral-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Class:
            </span>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-[#111318] text-neutral-400 hover:text-white border border-[#222631]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Displacement Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-neutral-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Engine:
            </span>
            <select
              value={displacementRange}
              onChange={(e) => setDisplacementRange(e.target.value)}
              className="bg-[#111318] border border-[#222631] text-xs font-mono uppercase rounded-lg px-3 py-1.5 text-neutral-200 focus:outline-none focus:border-red-500"
            >
              <option value="All">All Capacities</option>
              <option value="under-400">Under 400 cc</option>
              <option value="400-900">400 cc – 900 cc</option>
              <option value="over-900">Over 900 cc</option>
            </select>
          </div>
        </div>

        {/* Model Grid */}
        {filteredBikes.length === 0 ? (
          <div className="py-20 text-center bg-[#111318] rounded-xl border border-[#222631]">
            <p className="text-neutral-400 text-sm">
              No motorcycles found matching your filter criteria for {brand.name}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setDisplacementRange('All');
              }}
              className="mt-4 px-4 py-2 bg-[#161922] text-xs font-mono uppercase rounded text-white border border-[#2e3342]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredBikes.map((bike) => (
              <BrandBikeCard
                key={bike.id}
                bike={bike}
                onNavigate={(id) => navigate(`/bikes/${id}`)}
              />
            ))}
          </div>
        )}

        {/* Explore Other Brands Strip */}
        <div className="border-t border-[#222631] pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-500 mb-1">
                Marque Directory
              </p>
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                Explore Other Brands
              </h3>
            </div>
            <Link
              to="/brands"
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase flex items-center gap-1"
            >
              <span>View All 12 Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherBrands.map((b) => (
              <Link
                key={b.id}
                to={`/brands/${b.slug}`}
                className="group p-4 bg-[#111318] hover:bg-[#161922] rounded-xl border border-[#222631] hover:border-red-500/40 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <div className="w-14 h-12 flex items-center justify-center mb-2">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-9 max-w-[90%] object-contain opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <span className="text-xs font-display font-bold text-neutral-300 group-hover:text-white transition-colors">
                  {b.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
