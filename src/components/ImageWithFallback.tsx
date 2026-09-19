import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0c0e13] ${containerClassName}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt || 'Motorcycle'}
          onError={() => {
            console.warn('[MISSING OFFICIAL IMAGE ASSET]:', src, alt);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
          loading="lazy"
          {...props}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#13161f] to-[#0a0c10] border border-white/[0.04] select-none">
          {/* Neutral Clean Motorcycle Icon with subtle red accent */}
          <div className="w-12 h-12 rounded-full bg-red-950/30 border border-red-500/20 flex items-center justify-center mb-3">
            <svg
              className="w-6 h-6 text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h4" />
            </svg>
          </div>

          <span className="text-[10px] uppercase font-mono font-bold tracking-[0.25em] text-red-500 mb-1">
            MISSING OFFICIAL IMAGE
          </span>

          {alt && (
            <span className="text-xs font-mono font-bold text-white max-w-[280px] block mb-1">
              {alt}
            </span>
          )}

          <span className="text-[10px] font-mono text-neutral-400">
            Awaiting verified manufacturer studio photograph
          </span>
        </div>
      )}
    </div>
  );
};
