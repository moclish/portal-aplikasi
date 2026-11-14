import React, { useState, useEffect, useRef } from 'react';
import { Video, Grid, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  logoUrl?: string;
  institutionName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleDark,
  logoUrl,
  institutionName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'apps' | 'tutorials'>('apps');
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Close mobile menu when tapping outside the header
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  // Track scroll position accurately using bounding rect + bottom-of-page check
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const headerEl = document.querySelector('header');
      const navHeight = headerEl ? headerEl.offsetHeight : 64;
      const tutorialsEl = document.getElementById('tutorials');

      // Check if user reached near the bottom of the page
      const isAtBottom =
        window.innerHeight + (window.pageYOffset || document.documentElement.scrollTop) >=
        document.documentElement.scrollHeight - 40;

      if (tutorialsEl) {
        const tutorialRect = tutorialsEl.getBoundingClientRect();
        // Activate 'tutorials' when section top approaches viewport focus or user hits page bottom
        if (isAtBottom || tutorialRect.top <= navHeight + 140) {
          setActiveSection('tutorials');
          return;
        }
      }

      setActiveSection('apps');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.currentTarget.blur();

    const targetTab: 'apps' | 'tutorials' = id === 'tutorials' ? 'tutorials' : 'apps';
    setActiveSection(targetTab);

    // Pause scroll-spy briefly while smooth scrolling so active highlight never flickers
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      isManualScrollRef.current = false;
    }, 650);

    const wasMobileMenuOpen = mobileMenuOpen;
    if (wasMobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    const performScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerEl = document.querySelector('header');
      const navHeight = headerEl ? headerEl.offsetHeight : window.innerWidth < 640 ? 56 : 64;

      const width = window.innerWidth;
      const breathingRoom = width < 640 ? 12 : width <= 1024 ? 18 : 22;
      const targetOffset = navHeight + breathingRoom;

      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementDocTop = el.getBoundingClientRect().top + currentScrollY;
      const targetScrollTop = Math.max(0, elementDocTop - targetOffset);

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    };

    if (wasMobileMenuOpen) {
      setTimeout(performScroll, 50);
    } else {
      performScroll();
    }
  };

  const scrollToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection('apps');
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      isManualScrollRef.current = false;
    }, 650);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Brand Info (Left) - Clickable Link to Home */}
        <a
          href="#"
          onClick={scrollToHome}
          className="flex items-center gap-2 sm:gap-3 min-w-0 shrink cursor-pointer group transition-opacity hover:opacity-90"
          title="Kembali ke Beranda"
        >
          <BrandLogo customLogoUrl={logoUrl} size="sm" />
          <div className="min-w-0">
            <h1 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {institutionName}
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-300 truncate leading-tight mt-0.5">
              Portal Aplikasi Terpadu
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links - Crisp & High-Contrast Active Highlight */}
        <nav className="hidden sm:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-semibold shrink-0">
          <button
            type="button"
            onClick={(e) => scrollToSection('apps-section', e)}
            title="Aplikasi"
            aria-label="Aplikasi"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer outline-none ${
              activeSection === 'apps'
                ? 'bg-sky-500 text-white border-sky-400 shadow-sm shadow-sky-500/25 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70'
            }`}
          >
            <Grid
              className={`w-4 h-4 transition-colors ${
                activeSection === 'apps' ? 'text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            />
            <span>Aplikasi</span>
          </button>
          <button
            type="button"
            onClick={(e) => scrollToSection('tutorials', e)}
            title="Tutorial"
            aria-label="Tutorial"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer outline-none ${
              activeSection === 'tutorials'
                ? 'bg-sky-500 text-white border-sky-400 shadow-sm shadow-sky-500/25 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70'
            }`}
          >
            <Video
              className={`w-4 h-4 transition-colors ${
                activeSection === 'tutorials' ? 'text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            />
            <span>Tutorial</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle (Border-free) & Mobile Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <ThemeToggle isDark={isDark} onToggle={onToggleDark} />

          {/* Interactive Mobile Hamburger Button */}
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            className="sm:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Interactive Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-md px-4 py-3 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            type="button"
            onClick={(e) => scrollToSection('apps-section', e)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm border transition-colors cursor-pointer outline-none ${
              activeSection === 'apps'
                ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-sm shadow-sky-500/20'
                : 'border-transparent font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Grid
              className={`w-4 h-4 ${
                activeSection === 'apps' ? 'text-white' : 'text-sky-500 dark:text-sky-400'
              }`}
            />
            <span>Aplikasi</span>
          </button>

          <button
            type="button"
            onClick={(e) => scrollToSection('tutorials', e)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm border transition-colors cursor-pointer outline-none ${
              activeSection === 'tutorials'
                ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-sm shadow-sky-500/20'
                : 'border-transparent font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Video
              className={`w-4 h-4 ${
                activeSection === 'tutorials' ? 'text-white' : 'text-sky-500 dark:text-sky-400'
              }`}
            />
            <span>Tutorial</span>
          </button>
        </div>
      )}
    </header>
  );
};
