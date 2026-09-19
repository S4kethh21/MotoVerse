import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { ArrowRight } from 'lucide-react';

interface BrandsSectionProps {
  onSelectBrand?: (brandName: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand }) => {
  const navigate = useNavigate();

  const handleBrandClick = (slug: string, name: string) => {
    if (onSelectBrand) {
      onSelectBrand(name);
    }
    navigate(`/brands/${slug}`);
  };

  return (
    <section id="brands" className="py-24 bg-[#0a0c0f] border-t border-[#1a1d24] relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#262a35]/60">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-red-500 mb-1">
              OFFICIAL MANUFACTURERS
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              EXPLORE BY BRAND
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs font-mono text-neutral-400">
            Engineered by the world's most iconic motorcycle marques. Select a brand to explore its official fleet.
          </p>
        </div>

        {/* High-Contrast Prominent Brand Grid: Large Official Logo + Brand Name */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandClick(brand.slug, brand.name)}
              className="group relative bg-[#111318] hover:bg-[#161922] border border-[#222631] hover:border-red-500/60 rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-[0_12px_35px_rgba(229,9,20,0.12)] hover:-translate-y-1 cursor-pointer"
            >
              {/* Prominent High-Contrast Logo Container */}
              <div className="w-full h-16 sm:h-20 flex items-center justify-center mb-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 max-w-[130px] sm:max-w-[150px] w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Brand Name */}
              <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-red-400 transition-colors tracking-tight">
                {brand.name}
              </span>
            </button>
          ))}
        </div>

        {/* Directory Footer Action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate('/brands')}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>View Complete Brand Overview</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
