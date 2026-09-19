import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Motorcycle } from '../types';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface BikeCardProps {
  bike: Motorcycle;
  onViewDetails?: (bike: Motorcycle) => void;
  onToggleCompare?: (bike: Motorcycle) => void;
  isCompared?: boolean;
}

export const BikeCard: React.FC<BikeCardProps> = ({
  bike,
  onViewDetails,
}) => {
  const navigate = useNavigate();

  const handleInspect = () => {
    if (onViewDetails) {
      onViewDetails(bike);
    } else {
      navigate(`/bikes/${bike.id}`);
    }
  };

  return (
    <div className="group bg-[#111318] rounded-xl border border-[#262a35] overflow-hidden editorial-card flex flex-col justify-between hover:border-[#3a4050] transition-all">
      {/* Dominant Image Container with Turntable Reflection */}
      <div 
        onClick={handleInspect}
        className="relative h-52 sm:h-56 w-full overflow-hidden bg-gradient-to-b from-[#11131a] to-[#07080a] cursor-pointer flex items-center justify-center p-4"
      >
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-black/70 blur-lg rounded-full pointer-events-none" />
        <ImageWithFallback
          src={bike.image}
          alt={bike.name}
          className="max-h-[92%] max-w-[94%] object-contain group-hover:scale-105 transition-transform duration-500 filter brightness-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
          containerClassName="w-full h-full flex items-center justify-center"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a0c0f]/80 backdrop-blur-sm text-neutral-300 border border-white/10">
            {bike.category}
          </span>
        </div>
      </div>

      {/* Information Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-0.5">
            {bike.brand}
          </span>
          <h3
            onClick={handleInspect}
            className="text-base sm:text-lg font-bold font-display text-white group-hover:text-red-400 transition-colors cursor-pointer line-clamp-1"
          >
            {bike.name}
          </h3>

          {/* Price & Colourways */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#262a35]/40">
            <span className="text-xs font-bold font-mono text-white">
              {bike.price.displayPrice}*
            </span>
            {bike.colours && bike.colours.length > 0 && (
              <div className="flex items-center gap-1">
                {bike.colours.slice(0, 3).map((c, idx) => (
                  <span
                    key={c.name + idx}
                    className="w-2 h-2 rounded-full border border-black/50"
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
          </div>

          {/* Small Metadata Line */}
          <div className="mt-2.5 pt-2 border-t border-[#262a35]/60 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="font-semibold text-neutral-200">{bike.displacement} cc</span>
            <span className="text-neutral-600">•</span>
            <span className="font-semibold text-neutral-200">{bike.power} bhp</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">{bike.weight} kg</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-3.5 pt-3 border-t border-[#262a35]/60 flex items-center justify-between">
          <button
            onClick={handleInspect}
            className="w-full py-2 rounded bg-[#161922] hover:bg-[#e50914] text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 group/link transition-colors cursor-pointer"
          >
            <span>View Machine</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
