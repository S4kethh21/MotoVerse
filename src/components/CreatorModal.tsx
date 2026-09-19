import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  // Support ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      {/* Premium Minimal Info Card */}
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#0c0e14] border border-[#1f242e] shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-7 text-white select-none animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Red Glow Accent */}
        <div className="absolute top-0 right-1/4 w-32 h-20 bg-red-600/[0.08] blur-3xl pointer-events-none rounded-full" />

        {/* Top Header: Branding + Version + Close */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1a1f29]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <h2
                id="info-modal-title"
                className="font-display font-black text-lg sm:text-xl tracking-tight text-white uppercase"
              >
                MOTOVERSE
              </h2>
            </div>
            <p className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">
              Motorcycle Discovery Platform
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#141720] border border-[#222836] text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
              v1.0
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#161a22] border border-transparent hover:border-[#262c3a] transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Creator Info */}
        <div className="pt-4">
          <p className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 mb-0.5">
            Created by
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="font-display font-bold text-xl text-white tracking-tight">
              Saketh Reddy
            </h3>
            <span className="text-xs font-mono text-red-400 font-medium">
              Web Developer
            </span>
          </div>
        </div>

        {/* Platform Statement */}
        <div className="my-4 p-3.5 rounded-xl bg-[#10131a] border border-[#1a1f29] border-l-2 border-l-red-500">
          <p className="text-xs text-neutral-300 leading-relaxed font-sans italic">
            “A digital space built for people who love motorcycles — explore machines, brands, categories, specifications, colours, galleries and stories in one place.”
          </p>
        </div>

        {/* Specs / Meta Details */}
        <div className="space-y-2.5 py-1">
          <div className="p-2.5 rounded-lg bg-[#0f1218] border border-[#181d26]">
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-0.5">
              BUILT WITH
            </span>
            <p className="text-xs font-mono text-neutral-200">
              React • JavaScript • Modern Web Technologies
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0f1218] border border-[#181d26]">
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-0.5">
              FOCUS
            </span>
            <p className="text-xs font-mono text-neutral-200">
              Motorcycle Discovery • Web Design • Digital Experience
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4 mt-3 border-t border-[#1a1f29]">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-2.5">
            SOCIAL
          </span>

          <div className="grid grid-cols-3 gap-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sakheth-reddy-793530376?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#10131a] hover:bg-[#151922] border border-[#1c212c] hover:border-red-500/40 transition-all duration-200 text-center cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0077b5]/15 text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white flex items-center justify-center transition-colors mb-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-300 group-hover:text-white flex items-center gap-0.5">
                LinkedIn
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
              </span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/S4kethh21"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#10131a] hover:bg-[#151922] border border-[#1c212c] hover:border-red-500/40 transition-all duration-200 text-center cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 text-white group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors mb-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-300 group-hover:text-white flex items-center gap-0.5">
                GitHub
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/sakethh07?igsi=eXdoNmdxdWhnd2g0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#10131a] hover:bg-[#151922] border border-[#1c212c] hover:border-red-500/40 transition-all duration-200 text-center cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#e1306c]/15 text-[#e1306c] group-hover:bg-[#e1306c] group-hover:text-white flex items-center justify-center transition-colors mb-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-300 group-hover:text-white flex items-center gap-0.5">
                Instagram
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
