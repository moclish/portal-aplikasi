import React from 'react';
import { UnitType } from '../types/index.ts';

interface HeroSectionProps {
  selectedUnit: UnitType;
  onSelectUnit: (unit: UnitType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedUnit,
  onSelectUnit,
}) => {
  const units: UnitType[] = ['Semua', 'MTs', 'MA', 'Pondok'];

  return (
    <div className="relative pt-8 pb-6 sm:pt-12 sm:pb-8 text-center max-w-3xl mx-auto px-4">
      {/* Main Heading with Green-to-Blue Gradient */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
        Layanan{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 drop-shadow-2xs">
          Aplikasi Al-Furqan
        </span>
      </h2>

      {/* Clean Subtitle with High Contrast in Dark Mode */}
      <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-200 max-w-xl mx-auto leading-relaxed">
        Pilih aplikasi yang ingin Anda tuju
      </p>

      {/* Clean Unit Filter Tabs with Enhanced Dark Mode Contrast */}
      <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {units.map((unit) => {
          const isSelected = selectedUnit === unit;
          return (
            <button
              key={unit}
              type="button"
              onClick={() => onSelectUnit(unit)}
              className={`px-3.5 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-300 shadow-xs border border-slate-200/70 dark:border-slate-700 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {unit === 'Semua' ? 'Semua' : unit}
            </button>
          );
        })}
      </div>
    </div>
  );
};
