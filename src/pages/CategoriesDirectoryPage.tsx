import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { MOTORCYCLES } from '../data/motorcycles';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export const CategoriesDirectoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0c0f] pt-24 pb-24 text-white">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-[#222631]">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-500 mb-1">
            RIDING DISCIPLINES
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                Motorcycle Classes
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Discover distinct motorcycle classes engineered for circuit racing, highway touring, or daily urban commuting.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 bg-[#111318] px-4 py-2 rounded-lg border border-[#222631] self-start sm:self-auto">
              6 Core Disciplines
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => {
            const count = MOTORCYCLES.filter((b) => b.category === cat.id).length;

            return (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="group bg-[#111318] rounded-xl border border-[#222631] hover:border-red-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-56 w-full overflow-hidden bg-[#07080a]">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.55] transition-all duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent" />

                  {/* Class Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600/90 text-white">
                      Class 0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a0c0f]/80 text-neutral-300 border border-white/10">
                      {count} Models
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-white group-hover:text-red-400 transition-colors">
                      {cat.title}
                    </h2>

                    <p className="text-xs font-semibold text-red-400/90 uppercase tracking-wider mt-1">
                      {cat.subtitle}
                    </p>

                    <p className="text-xs text-neutral-400 mt-3 line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Benchmark Pills */}
                    <div className="mt-4 pt-3 border-t border-white/[0.04]">
                      <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1.5">
                        Key Benchmarks:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.examples.slice(0, 3).map((ex) => (
                          <span
                            key={ex}
                            className="px-2 py-0.5 rounded text-[11px] bg-[#0a0c0f] text-neutral-300 border border-white/[0.06]"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-[#222631] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-red-500" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
