import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  // Support ESC on desktop
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
      aria-labelledby="creator-modal-title"
    >
      {/* Small Premium Creator Card */}
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#0d0f14] border border-[#20242e] shadow-2xl p-6 sm:p-7 text-white select-none animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Red Glow Accent */}
        <div className="absolute top-0 right-1/4 w-36 h-20 bg-red-600/[0.08] blur-3xl pointer-events-none rounded-full" />

        {/* Header with Title & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1c202a] mb-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <h3
              id="creator-modal-title"
              className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-300"
            >
              ABOUT THE CREATOR
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#181c24] border border-transparent hover:border-[#2a303d] transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Creator Name */}
        <div className="mb-6">
          <p className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
            Creator &amp; Developer
          </p>
          <h2 className="font-display font-black text-2xl text-white tracking-tight">
            Saketh Reddy
          </h2>
        </div>

        {/* Social Handles */}
        <div className="space-y-2.5">
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/sakheth-reddy-793530376"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-xl bg-[#12151c] hover:bg-[#181d27] border border-[#1e232f] hover:border-red-500/40 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0077b5]/15 text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">
                  LinkedIn
                </span>
                <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                  linkedin.com/in/sakheth-reddy-793530376
                </span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </a>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/SakethReddy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-xl bg-[#12151c] hover:bg-[#181d27] border border-[#1e232f] hover:border-red-500/40 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e1306c]/15 text-[#e1306c] group-hover:bg-[#e1306c] group-hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">
                  Instagram
                </span>
                <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                  @SakethReddy
                </span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};
