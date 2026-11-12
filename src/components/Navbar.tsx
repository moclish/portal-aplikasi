import React, { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState<'apps' | 'tutorials' | null>('apps');

  // Track scroll position to dynamically highlight current section
  useEffect(() => {
    const handleScroll = () => {
      const headerEl = document.querySelector('header');
      const navHeight = headerEl ? headerEl.offsetHeight : 64;
      const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) + navHeight + 30;
      const tutorialsEl = document.getElementById('tutorials');
      const appsEl = document.getElementById('apps-section');

      if (tutorialsEl && scrollPosition >= tutorialsEl.offsetTop) {
        setActiveSection('tutorials');
      } else if (appsEl && scrollPosition >= appsEl.offsetTop - 60) {
        setActiveSection('apps');
      } else {
        setActiveSection('apps');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const wasMobileMenuOpen = mobileMenuOpen;
    if (wasMobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    const performScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;

      // Exact pixel height of fixed navbar
      const headerEl = document.querySelector('header');
      const navHeight = headerEl ? headerEl.offsetHeight : (window.innerWidth < 640 ? 56 : 64);

      // Dedicated breathing room for mobile (12px), tablet (18px), and desktop (22px)
      const width = window.innerWidth;
      const breathingRoom = width < 640 ? 12 : width <= 1024 ? 18 : 22;
      const targetOffset = navHeight + breathingRoom;

      // Calculate absolute document Y coordinate without relying on bodyRect
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementDocTop = el.getBoundingClientRect().top + currentScrollY;
      const targetScrollTop = Math.max(0, elementDocTop - targetOffset);

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    };

    // On mobile, slight delay allows dropdown menu to close cleanly; on tablet and desktop, scroll executes immediately
    if (wasMobileMenuOpen) {
      setTimeout(performScroll, 50);
    } else {
      performScroll();
    }
  };

  const scrollToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2.5 sm:gap-4">
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

        {/* Desktop Navigation Links (Center/Right) - With Dynamic Active Highlight */}
        <nav className="hidden sm:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-semibold shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('apps-section')}
            title="Aplikasi"
            aria-label="Aplikasi"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
              activeSection === 'apps'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs border border-slate-200/90 dark:border-slate-700 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <Grid className={`w-4 h-4 ${activeSection === 'apps' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`} />
            <span>Aplikasi</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('tutorials')}
            title="Tutorial"
            aria-label="Tutorial"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
              activeSection === 'tutorials'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs border border-slate-200/90 dark:border-slate-700 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <Video className={`w-4 h-4 ${activeSection === 'tutorials' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`} />
            <span>Tutorial</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle (Border-free) & Mobile Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <ThemeToggle isDark={isDark} onToggle={onToggleDark} />

          {/* Interactive Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            className="sm:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
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
            onClick={() => scrollToSection('apps-section')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeSection === 'apps'
                ? 'bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold border border-sky-100 dark:border-slate-700'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Grid className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <span>Aplikasi</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('tutorials')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeSection === 'tutorials'
                ? 'bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold border border-sky-100 dark:border-slate-700'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Video className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <span>Tutorial</span>
          </button>
        </div>
      )}
    </header>
  );
};
