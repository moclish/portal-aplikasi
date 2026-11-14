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
    <div className="relative pt-8 pb-5 sm:pt-12 sm:pb-7 text-center max-w-3xl mx-auto px-4">
      {/* Main Heading with Green-to-Blue Gradient */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
        Layanan{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 drop-shadow-2xs">
          Aplikasi Al-Furqan
        </span>
      </h2>

      {/* Clean Subtitle with High Contrast in Light & Dark Mode */}
      <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
        Pilih aplikasi yang ingin Anda tuju
      </p>

      {/* Unified Segmented Unit Filter Tabs */}
      <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {units.map((unit) => {
          const isSelected = selectedUnit === unit;
          return (
            <button
              key={unit}
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onSelectUnit(unit);
              }}
              className={`px-3.5 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm border transition-all duration-200 cursor-pointer outline-none ${
                isSelected
                  ? 'bg-sky-500 text-white border-sky-400 shadow-sm shadow-sky-500/25 font-bold'
                  : 'border-transparent font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70'
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
