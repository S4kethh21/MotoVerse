import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { MOTORCYCLES } from '../data/motorcycles';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { VideoModal } from '../components/VideoModal';
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  Compass,
  Play,
} from 'lucide-react';
import type { Motorcycle } from '../types';

interface CategoryDetailPageProps {
  onToggleCompare?: (bike: Motorcycle) => void;
  comparedBikeIds?: string[];
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'power-desc' | 'displacement-desc' | 'weight-asc'>('power-desc');

  const categoryBikes = useMemo(() => {
    if (!category) return [];
    return MOTORCYCLES.filter(
      (bike) => bike.category.toLowerCase() === category.id.toLowerCase()
    );
  }, [category]);

  const availableBrands = useMemo(() => {
    const brands = new Set(categoryBikes.map((b) => b.brand));
    return ['All', ...Array.from(brands)];
  }, [categoryBikes]);

  const filteredBikes = useMemo(() => {
    let result = categoryBikes.filter((bike) => {
      if (selectedBrand !== 'All' && bike.brand !== selectedBrand) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'power-desc') return b.power - a.power;
      if (sortBy === 'displacement-desc') return b.displacement - a.displacement;
      if (sortBy === 'weight-asc') return a.weight - b.weight;
      return 0;
    });

    return result;
  }, [categoryBikes, selectedBrand, sortBy]);

  if (!category) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="font-display font-black text-3xl text-white mb-3 uppercase tracking-tight">
          Discipline Not Found
        </h2>
        <p className="text-neutral-400 text-sm max-w-md mb-8">
          The requested riding category does not exist in our catalog.
        </p>
        <button
          onClick={() => navigate('/categories')}
          className="px-6 py-3 bg-[#e50914] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Categories</span>
        </button>
      </div>
    );
  }

  const otherCategories = CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <div className="min-h-screen bg-[#0a0c0f] pt-20 pb-24 text-white">
      {/* Category Hero Header */}
      <section className="relative overflow-hidden border-b border-[#222631] bg-[#0c0e14]">
        {/* Background Video or Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {category.video ? (
            <video
              src={category.video}
              poster={category.videoPoster || category.image}
              autoPlay
              loop
              muted
              playsInline
              style={{ filter: 'brightness(1.15) contrast(1.05) saturate(1.04)' }}
              className="w-full h-full object-cover object-center transition-all duration-700"
            />
          ) : (
            <ImageWithFallback
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-105"
              containerClassName="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/40 to-[#0a0c0f]/60 pointer-events-none" />
        </div>

        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          <div className="mb-6">
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Riding Disciplines</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-red-600 text-white">
                Discipline Fleet
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {categoryBikes.length} Verified Machines
              </span>
              {category.video && (
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Watch Discipline Film</span>
                </button>
              )}
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none mb-3">
              {category.title}
            </h1>

            <p className="text-base sm:text-lg text-red-400 font-sans font-medium mb-4">
              {category.subtitle}
            </p>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#222631]">
          {/* Brand Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-mono uppercase text-neutral-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Brand:
            </span>
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  selectedBrand === brand
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-[#111318] text-neutral-400 hover:text-white border border-[#222631]'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-neutral-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111318] border border-[#222631] text-xs font-mono uppercase rounded-lg px-3 py-1.5 text-neutral-200 focus:outline-none focus:border-red-500"
            >
              <option value="power-desc">Highest Power (bhp)</option>
              <option value="displacement-desc">Displacement (cc)</option>
              <option value="weight-asc">Lowest Weight (kg)</option>
            </select>
          </div>
        </div>

        {/* Motorcycles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredBikes.map((bike) => {
            return (
              <div
                key={bike.id}
                className="group bg-[#111318] rounded-xl border border-[#222631] hover:border-[#383e50] overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Motorcycle Image */}
                <div
                  onClick={() => navigate(`/bikes/${bike.id}`)}
                  className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-[#12141c] to-[#08090d] cursor-pointer flex items-center justify-center p-4"
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-black/70 blur-lg rounded-full pointer-events-none" />
                  <ImageWithFallback
                    src={bike.image}
                    alt={bike.name}
                    className="max-h-[92%] max-w-[94%] object-contain group-hover:scale-105 transition-transform duration-500 filter brightness-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
                    containerClassName="w-full h-full flex items-center justify-center"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600/90 text-white">
                      {bike.brand}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => navigate(`/bikes/${bike.id}`)}
                      className="font-display font-bold text-xl text-white group-hover:text-red-400 transition-colors cursor-pointer"
                    >
                      {bike.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
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

                    {/* Colourway swatches */}
                    {bike.colours && bike.colours.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase mr-1">
                          Shades:
                        </span>
                        {bike.colours.slice(0, 3).map((c, idx) => (
                          <span
                            key={c.name + idx}
                            className="w-2.5 h-2.5 rounded-full border border-black/50"
                            style={{
                              backgroundColor: c.hex,
                              background: c.secondaryHex
                                ? `linear-gradient(135deg, ${c.hex} 50%, ${c.secondaryHex} 50%)`
                                : c.hex
                            }}
                            title={c.name}
                          />
                        ))}
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
                        <span className="text-[9px] uppercase font-mono text-neutral-400 block">Weight</span>
                        <span className="text-xs font-bold text-white font-mono">{bike.weight} kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-[#222631] flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigate(`/bikes/${bike.id}`)}
                      className="text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1 group-hover:text-red-400 transition-colors"
                    >
                      <span>View Machine</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Categories Strip */}
        <div className="border-t border-[#222631] pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-500 mb-1">
                Other Disciplines
              </p>
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                Explore More Riding Styles
              </h3>
            </div>
            <Link
              to="/categories"
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase flex items-center gap-1"
            >
              <span>View All 6 Classes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                to={`/categories/${c.slug}`}
                className="group relative h-40 rounded-xl overflow-hidden border border-[#222631] hover:border-red-500/50 p-4 flex flex-col justify-between transition-all"
              >
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-transparent to-transparent" />
                </div>
                <div className="relative z-10 flex justify-end">
                  <Compass className="w-4 h-4 text-neutral-400 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">Class</span>
                  <h4 className="font-display font-bold text-base text-white group-hover:text-red-300 transition-colors">
                    {c.id}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {category.video && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoSrc={category.video}
          poster={category.videoPoster || category.image}
          title={`${category.title} — Discipline Film`}
          subtitle="MotoVerse Category Cinema Exhibition"
          aspectRatio="16:9"
        />
      )}
    </div>
  );
};
