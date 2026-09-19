import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowUp, Info } from 'lucide-react';

interface FooterProps {
  onOpenCreator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCreator }) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Explore Fleet', path: '/bikes' },
    { label: 'Brands', path: '/brands' },
    { label: 'Categories', path: '/categories' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Latest Stories', path: '/news' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#07080a] text-neutral-400 border-t border-[#262a35]/60 pt-20 pb-16">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Massive Branding & Tagline */}
        <div className="pb-14 border-b border-[#262a35]/60 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link to="/" className="inline-block group" title="MotoVerse — Explore. Compare. Ride.">
              <img
                src="/images/brand/motoverse-logo-full.png"
                alt="MotoVerse"
                className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-[1.02] filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-[#111318] text-neutral-400 hover:text-white hover:bg-[#161920] border border-[#262a35] transition-colors flex items-center justify-center"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-[#111318] text-neutral-400 hover:text-white hover:bg-[#161920] border border-[#262a35] transition-colors flex items-center justify-center"
              title="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-[#111318] text-neutral-400 hover:text-white hover:bg-[#161920] border border-[#262a35] transition-colors flex items-center justify-center"
              title="Twitter / X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Spacious Middle Navigation Links */}
        <div className="py-10 border-b border-[#262a35]/60 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-xs uppercase font-semibold tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {onOpenCreator && (
              <button
                type="button"
                onClick={onOpenCreator}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer group"
                title="About the Creator"
              >
                <Info className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                <span>Creator Info</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Micro Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 MotoVerse. Premium Motorcycle Editorial &amp; Discovery Platform.</p>
          <p className="text-[11px] text-neutral-400">Precision engineering metrics • Authentic manufacturer telemetry.</p>
        </div>
      </div>
    </footer>
  );
};
