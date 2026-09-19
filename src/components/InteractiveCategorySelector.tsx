import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { MOTORCYCLES } from '../data/motorcycles';
import { ImageWithFallback } from './ImageWithFallback';

interface InteractiveCategorySelectorProps {
  onSelectCategory?: (categorySlug: string) => void;
}

export const InteractiveCategorySelector: React.FC<InteractiveCategorySelectorProps> = ({
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const [selectedSlug, setSelectedSlug] = useState<string>(CATEGORIES[0].slug);

  const activeCategory =
    CATEGORIES.find((c) => c.slug === selectedSlug) || CATEGORIES[0];

  const bikeCount = MOTORCYCLES.filter((b) => b.category === activeCategory.id).length;

  const handleExplore = () => {
    if (onSelectCategory) {
      onSelectCategory(activeCategory.slug);
    }
    navigate(`/categories/${activeCategory.slug}`);
  };

  return (
    <section id="categories" className="py-24 bg-[#0a0c0f] border-t border-[#1a1d24] relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#262a35]/60">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-red-500 mb-1">
              Vehicle Classes &amp; Segments
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs font-mono text-neutral-400">
            Interactive vehicle class selector — explore silhouettes tailored to your riding style
          </p>
        </div>

        {/* Interactive Configurator Layout: Left Switcher List + Right Dynamic Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Category Switcher Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
            <div className="space-y-2">
              {CATEGORIES.map((cat, idx) => {
                const isCurrent = cat.slug === selectedSlug;
                const count = MOTORCYCLES.filter((b) => b.category === cat.id).length;

                return (
                  <button
                    key={cat.slug}
                    onMouseEnter={() => setSelectedSlug(cat.slug)}
                    onClick={() => setSelectedSlug(cat.slug)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                      isCurrent
                        ? 'bg-[#161922] border-red-500/60 shadow-[0_4px_20px_rgba(229,9,20,0.12)]'
                        : 'bg-[#101217]/80 hover:bg-[#13161e] border-[#222631] hover:border-[#323846]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-xs font-mono font-bold transition-colors ${
                          isCurrent ? 'text-red-500' : 'text-neutral-500'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <span
                          className={`font-display font-bold text-base block transition-colors ${
                            isCurrent ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                          }`}
                        >
                          {cat.id}
                        </span>
                        <span className="text-[11px] text-neutral-400 block font-normal">
                          {count} models
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          isCurrent
                            ? 'text-red-500 translate-x-1'
                            : 'text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-0.5'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Configurator hint */}
            <div className="hidden lg:flex items-center gap-2 p-3 bg-[#111318]/70 rounded-lg border border-white/[0.04] text-[11px] text-neutral-400">
              <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
              <span>Hover over any discipline to preview its machine class and specifications.</span>
            </div>
          </div>

          {/* Right: Dynamic High-Impact Visual Preview Panel (Span 8) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#262a35] bg-[#0c0e13] flex flex-col justify-between min-h-[460px] lg:min-h-[520px]">
            {/* Dynamic Background Image with Smooth Transition */}
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                key={activeCategory.slug}
                src={activeCategory.image}
                alt={activeCategory.title}
                className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105 transition-all duration-700 animate-fadeIn"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0f]/80 via-transparent to-transparent" />
            </div>

            {/* Top Bar: Category Pill & Model Count */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-widest bg-red-600/90 text-white shadow-sm border border-red-500/50">
                {activeCategory.id} Class
              </span>

              <span className="text-xs font-mono font-semibold text-neutral-300 bg-[#0a0c0f]/80 px-3 py-1 rounded-md border border-white/10 backdrop-blur-md">
                {bikeCount} Curated Models
              </span>
            </div>

            {/* Bottom Content: Title, Subtitle, Description, Examples, CTA */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-red-400 uppercase mb-1">
                {activeCategory.subtitle}
              </p>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
                {activeCategory.title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                {activeCategory.description}
              </p>

              {/* Quick Examples Badges */}
              <div className="mb-6">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Featured Benchmarks:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.examples.map((ex) => (
                    <span
                      key={ex}
                      className="px-2.5 py-1 rounded text-xs font-medium bg-[#111318]/90 text-neutral-200 border border-white/10 backdrop-blur-sm"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Explore Category Button */}
              <div>
                <button
                  onClick={handleExplore}
                  className="px-6 py-3 bg-[#e50914] hover:bg-[#c70812] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-sm inline-flex"
                >
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
