/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_APPS, INITIAL_TUTORIALS, DEFAULT_CONFIG } from './data/initialData.ts';
import { AppLink, UnitType } from './types/index.ts';
import { getGoogleDriveDirectImageUrl } from './utils/driveHelper.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AppCard } from './components/AppCard.tsx';
import { TutorialSection } from './components/TutorialSection.tsx';
import { Footer } from './components/Footer.tsx';

const STORAGE_KEYS = {
  DARK_MODE: 'alfurqan_portal_theme_dark',
};

export default function App() {
  // --- Persistent State: Dark Mode ---
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  // Sync dark class to <html> tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(isDark));
    } catch {
      // ignore
    }
  }, [isDark]);

  // Dynamically sync document favicon if a custom or Google Drive image is configured
  useEffect(() => {
    const faviconSource = DEFAULT_CONFIG.faviconUrl || DEFAULT_CONFIG.logoUrl;
    if (faviconSource) {
      const directUrl = getGoogleDriveDirectImageUrl(faviconSource);
      let faviconLink = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = directUrl;
    }
  }, []);

  // --- Apps Data ---
  const [apps] = useState<AppLink[]>(INITIAL_APPS);

  // --- Unit Filter (Semua, MTs, MA) ---
  const [selectedUnit, setSelectedUnit] = useState<UnitType>('Semua');

  const filteredApps = useMemo(() => {
    if (selectedUnit === 'Semua') return apps;
    return apps.filter((app) => app.unit === selectedUnit);
  }, [apps, selectedUnit]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Subtle ambient light harmonizing MTs (emerald), MA (sky), and Pondok (violet) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-r from-emerald-200/25 via-sky-200/30 to-violet-200/25 dark:from-emerald-900/15 dark:via-sky-900/15 dark:to-violet-900/15 blur-[110px] rounded-full -z-10" />

      {/* Main Container with top padding to account for fixed navbar */}
      <div className="flex min-h-screen flex-col pt-14 sm:pt-16">
        {/* Clean Full-Width Fixed Navbar */}
        <Navbar
          isDark={isDark}
          onToggleDark={() => setIsDark((prev) => !prev)}
          logoUrl={DEFAULT_CONFIG.logoUrl}
          institutionName={DEFAULT_CONFIG.institutionName}
        />

        {/* Content Area */}
        <main className="flex-1 mx-auto max-w-6xl xl:max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          {/* Clean Hero */}
          <HeroSection
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
          />

          {/* Apps Cards Container (Centered: 4 Desktop, 3 Laptop, 2 Tablet, 1 Mobile) */}
          <section id="apps-section" className="my-6 sm:my-8 scroll-mt-20 sm:scroll-mt-24">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] xl:w-[calc(25%-18px)] flex"
                >
                  <AppCard app={app} />
                </div>
              ))}
            </div>
          </section>

          {/* User-Friendly Section Divider */}
          <div className="relative my-10 sm:my-14 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300/90 dark:via-slate-700/90 to-transparent" />
            </div>
            <div className="relative px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                <span>Panduan Penggunaan</span>
              </div>
            </div>
          </div>

          {/* Video Tutorials Section */}
          <TutorialSection tutorials={INITIAL_TUTORIALS} />
        </main>

        {/* Clean Footer with Divider Line */}
        <Footer />
      </div>
    </div>
  );
}
