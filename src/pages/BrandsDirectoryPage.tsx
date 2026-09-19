import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { MOTORCYCLES } from '../data/motorcycles';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, Globe, Calendar } from 'lucide-react';

export const BrandsDirectoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0c0f] pt-24 pb-24 text-white">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-[#222631]">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-500 mb-1">
            MARQUE DIRECTORY
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                Iconic Manufacturers
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Explore the verified motorcycle catalogs and histories of 12 global motorcycle icons.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 bg-[#111318] px-4 py-2 rounded-lg border border-[#222631] self-start sm:self-auto">
              12 Manufacturers • 70+ Verified Machines
            </div>
          </div>
        </div>

        {/* Brands Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((brand) => {
            const count = MOTORCYCLES.filter(
              (b) => b.brand.toLowerCase() === brand.name.toLowerCase()
            ).length;

            return (
              <Link
                key={brand.id}
                to={`/brands/${brand.slug}`}
                className="group bg-[#111318] rounded-xl border border-[#222631] hover:border-red-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden bg-[#07080a]">
                  <ImageWithFallback
                    src={brand.heroImage}
                    alt={brand.name}
                    className="w-full h-full object-cover object-center filter brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent" />

                  {/* Brand Logo in Floating Badge */}
                  <div className="absolute bottom-4 left-6 w-14 h-14 p-2 bg-[#0a0c0f]/90 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-9 max-w-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Bike Count */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a0c0f]/80 text-white border border-white/10">
                      {count} Models
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-red-500" />
                        {brand.origin}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-red-500" />
                        Est. {brand.founded}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-2xl text-white group-hover:text-red-400 transition-colors">
                      {brand.name}
                    </h2>

                    <p className="text-xs font-medium text-red-400/90 italic mt-1">
                      “{brand.tagline}”
                    </p>

                    <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-[#222631] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                    <span>Inspect Brand Fleet</span>
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
