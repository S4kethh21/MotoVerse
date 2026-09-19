import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Search, Info } from 'lucide-react';

interface NavLinkConfig {
  label: string;
  path: string;
  sectionId?: string;
}

interface NavbarProps {
  onOpenCreator?: () => void;
}

const NAV_LINKS: NavLinkConfig[] = [
  { label: 'Home', path: '/', sectionId: 'hero' },
  { label: 'Explore', path: '/bikes', sectionId: 'featured' },
  { label: 'Brands', path: '/brands', sectionId: 'brands' },
  { label: 'Categories', path: '/categories', sectionId: 'categories' },
  { label: 'Gallery', path: '/gallery', sectionId: 'gallery' },
  { label: 'News', path: '/news', sectionId: 'news' },
  { label: 'About', path: '/about', sectionId: 'about' },
  { label: 'Contact', path: '/contact', sectionId: 'about' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreator }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('Home');

  const isHome = location.pathname === '/';

  // Section tracking on Home page using IntersectionObserver + scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Home page section tracking
  useEffect(() => {
    if (!isHome) {
      // Determine active by route
      const current = NAV_LINKS.find((link) => {
        if (link.path === '/') return location.pathname === '/';
        return location.pathname.startsWith(link.path);
      });
      if (current) {
        setActiveSection(current.label);
      }
      return;
    }

    // On Home page, monitor section visibility
    const sectionMap: Record<string, string> = {
      'hero': 'Home',
      'find-your-machine': 'Home',
      'brands': 'Brands',
      'categories': 'Categories',
      'featured': 'Explore',
      'news': 'News',
      'gallery': 'Gallery',
      'about': 'About',
    };

    const sectionElements = Object.keys(sectionMap)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    // Use IntersectionObserver with top offset
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mappedLabel = sectionMap[entry.target.id];
            if (mappedLabel) {
              setActiveSection(mappedLabel);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Also bind a fallback scroll position check
    const handleHomeScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('Home');
      }
    };
    window.addEventListener('scroll', handleHomeScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('handleHomeScroll', handleHomeScroll);
    };
  }, [isHome, location.pathname]);

  const handleNavClick = (link: NavLinkConfig) => {
    setMobileMenuOpen(false);

    if (isHome && link.sectionId && link.path !== '/bikes') {
      // Smooth scroll to on-page section
      const targetElement = document.getElementById(link.sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(link.label);
        return;
      }
    }

    // Otherwise navigate to the route
    setActiveSection(link.label);
    navigate(link.path);
  };

  const isCurrentActive = useCallback(
    (link: NavLinkConfig) => {
      if (isHome) {
        return activeSection === link.label;
      }
      if (link.path === '/') return location.pathname === '/';
      return location.pathname.startsWith(link.path);
    },
    [isHome, activeSection, location.pathname]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0c0f]/95 backdrop-blur-md border-b border-[#262a35]/70 py-2.5 sm:py-3 shadow-xl'
          : 'bg-[#0a0c0f]/60 backdrop-blur-sm border-b border-white/[0.04] py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official MotoVerse Brand Identity - Enhanced prominent size (1.5-2x larger) */}
        <Link
          to="/"
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('Home');
            }
          }}
          className="flex items-center group text-left focus:outline-none transition-transform hover:scale-[1.02]"
          title="MotoVerse — Explore. Ride."
        >
          {/* Desktop/Tablet Horizontal Logo (1.5–2x visual prominence) */}
          <img
            src="/images/brand/motoverse-logo-horizontal.png"
            alt="MotoVerse"
            className="h-10 sm:h-11 md:h-12 lg:h-13 w-auto object-contain hidden sm:block filter drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]"
          />
          {/* Mobile Logo */}
          <img
            src="/images/brand/motoverse-logo-horizontal.png"
            alt="MotoVerse"
            className="h-8 max-w-[170px] w-auto object-contain sm:hidden filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const active = isCurrentActive(link);
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded relative focus:outline-none cursor-pointer ${
                  active
                    ? 'text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#e50914] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Search + ⓘ Info Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem('navSearch') as HTMLInputElement)?.value;
              if (input && input.trim()) {
                navigate(`/bikes?q=${encodeURIComponent(input.trim())}`);
              } else {
                navigate('/bikes');
              }
            }}
            className="hidden md:flex items-center relative"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              name="navSearch"
              placeholder="Search bikes, brands..."
              className="w-44 xl:w-56 pl-8 pr-3 py-1.5 rounded-full bg-[#111318]/90 border border-[#222631] text-xs font-sans text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/80 focus:w-60 transition-all duration-300"
            />
          </form>

          {/* Desktop ⓘ Info / About Creator Button */}
          {onOpenCreator && (
            <button
              type="button"
              onClick={onOpenCreator}
              className="hidden sm:flex p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#161920] border border-transparent hover:border-white/10 transition-all duration-200 cursor-pointer group items-center justify-center"
              title="About the Creator"
              aria-label="About the Creator"
            >
              <Info className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:text-red-500" />
            </button>
          )}

          {/* Mobile ⓘ Info Button */}
          {onOpenCreator && (
            <button
              type="button"
              onClick={onOpenCreator}
              className="sm:hidden p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#161920] transition-colors cursor-pointer flex items-center justify-center"
              title="About the Creator"
              aria-label="About the Creator"
            >
              <Info className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#161920] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1015] border-b border-[#262a35] px-4 pt-3 pb-6 space-y-1">
          <div className="grid grid-cols-2 gap-1 py-2">
            {NAV_LINKS.map((link) => {
              const active = isCurrentActive(link);
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-2 rounded text-xs uppercase tracking-wider text-left transition-colors font-semibold ${
                    active
                      ? 'text-red-500 font-bold bg-white/[0.04]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#262a35]/60 flex flex-col gap-2">
            {onOpenCreator && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCreator();
                }}
                className="w-full py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/[0.04] border border-[#232733] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-red-500" />
                <span>About the Creator</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/bikes');
              }}
              className="w-full py-2.5 bg-[#e50914] text-white font-bold text-xs uppercase tracking-wider rounded-lg text-center"
            >
              Explore All 70+ Motorcycles
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
