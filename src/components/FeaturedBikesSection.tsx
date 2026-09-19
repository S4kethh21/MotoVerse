import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { MOTORCYCLES } from '../data/motorcycles';

interface FeaturedBikesSectionProps {
  onToggleCompare?: any;
  comparedBikeIds?: string[];
}

interface TopPickItem {
  bikeId: string;
  brandTag: string;
  modelTitle: string;
  categoryTag: string;
  tagline: string;
  price: string;
  image: string;
}

const TOP_PICK_IDS = [
  'royal-enfield-hunter-350',
  'tvs-apache-rr-310',
  'aprilia-rs-457',
  'triumph-speed-400',
];

export const FeaturedBikesSection: React.FC<FeaturedBikesSectionProps> = () => {
  const navigate = useNavigate();

  // Centralized data mapping from MOTORCYCLES
  const topPicks: TopPickItem[] = TOP_PICK_IDS.map((id) => {
    const bike = MOTORCYCLES.find((b) => b.id === id);
    if (!bike) {
      return {
        bikeId: id,
        brandTag: 'MOTOVERSE',
        modelTitle: id,
        categoryTag: 'FLAGSHIP',
        tagline: 'High-performance machine.',
        price: 'Price on Request',
        image: '',
      };
    }

    let defaultImg = bike.image;
    if (id === 'tvs-apache-rr-310') {
      defaultImg = '/images/bikes/tvs/colourways/apache-rr-310-black-toppick.png';
    } else if (id === 'aprilia-rs-457') {
      defaultImg = '/images/bikes/aprilia/colourways/rs457-prismatic-dark-toppick.png';
    } else if (id === 'triumph-speed-400') {
      defaultImg = '/images/bikes/triumph/colourways/speed-400-red-toppick.png';
    } else if (id === 'royal-enfield-hunter-350') {
      defaultImg = '/images/bikes/royal-enfield/colourways/hunter-tokyo-black.png';
    }

    return {
      bikeId: bike.id,
      brandTag: bike.brand.toUpperCase(),
      modelTitle: bike.name.replace(bike.brand, '').trim() || bike.name,
      categoryTag: `${bike.category.toUpperCase()} • ${bike.displacement} CC`,
      tagline: bike.tagline || bike.description.slice(0, 70) + '...',
      price: bike.price?.displayPrice ? `${bike.price.displayPrice}*` : 'Price on Request',
      image: defaultImg,
    };
  });

  return (
    <section id="featured" className="py-20 bg-[#08090d] border-b border-[#1b1e27] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-red-600/[0.025] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#222631]">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-red-500 mb-1">
              CURATED BENCHMARKS
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              TOP PICKS. REAL RIDES.
            </h2>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-400">
              4 Selected Icons • Authentic Photography &amp; Specs
            </span>
            <button
              onClick={() => navigate('/bikes')}
              className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View Fleet</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - Clean Static Images, NO Hover Video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topPicks.map((item) => {
            return (
              <div
                key={item.bikeId}
                className="group bg-[#111318] rounded-2xl border border-[#222631] hover:border-red-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:-translate-y-1"
              >
                {/* Visual Area with Static Real Cutout (Strictly NO video on hover) */}
                <div
                  onClick={() => navigate(`/bikes/${item.bikeId}`)}
                  className="relative h-56 w-full bg-gradient-to-b from-[#141720] via-[#0d0f14] to-[#0a0c10] flex items-center justify-center p-4 cursor-pointer overflow-hidden"
                >
                  {/* Turntable Floor Shadow */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-black/80 blur-md rounded-full pointer-events-none" />

                  {/* Clean Static Motorcycle Image - Subtle scale on card hover only */}
                  <ImageWithFallback
                    src={item.image}
                    alt={item.modelTitle}
                    className="max-h-[92%] max-w-[94%] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full flex items-center justify-center"
                  />
                </div>

                {/* Information Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Brand Tag */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-500 block mb-1">
                      {item.brandTag}
                    </span>

                    {/* Model Name */}
                    <h3
                      onClick={() => navigate(`/bikes/${item.bikeId}`)}
                      className="font-display font-black text-lg text-white group-hover:text-red-400 transition-colors cursor-pointer leading-tight mb-1"
                    >
                      {item.modelTitle}
                    </h3>

                    {/* Category & Displacement */}
                    <span className="text-[11px] font-mono text-neutral-400 block mb-2">
                      {item.categoryTag}
                    </span>

                    {/* Tagline */}
                    <p className="text-xs text-neutral-400 line-clamp-1 leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Card Bottom: Price + Explore Action */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#222631]">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        Starting At
                      </span>
                      <span className="text-xs font-bold font-mono text-white">
                        {item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/bikes/${item.bikeId}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1a1e28] group-hover:bg-[#e50914] text-neutral-300 group-hover:text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-all duration-300 cursor-pointer"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
