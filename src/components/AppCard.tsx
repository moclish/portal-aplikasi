import React from 'react';
import {
  GraduationCap,
  Laptop,
  FileCheck,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { AppLink } from '../types/index.ts';

interface AppCardProps {
  app: AppLink;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const isMTs = app.unit === 'MTs';

  // Consistent icon mapping per category with unit-specific accent color & enhanced dark contrast
  const renderIcon = () => {
    const iconProps = {
      className: `w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110 ${
        isMTs
          ? 'text-emerald-600 dark:text-emerald-300'
          : 'text-blue-600 dark:text-blue-300'
      }`,
    };

    switch (app.category) {
      case 'RDM':
        return <GraduationCap {...iconProps} />;
      case 'E-Learning':
        return <Laptop {...iconProps} />;
      case 'CBT':
        return <FileCheck {...iconProps} />;
      default:
        return <Layers {...iconProps} />;
    }
  };

  return (
    <div
      className={`w-full flex-1 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-md dark:shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
        isMTs
          ? 'hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/15 dark:hover:shadow-emerald-900/30'
          : 'hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/15 dark:hover:shadow-blue-900/30'
      }`}
    >
      {/* Top accent color bar - Dominant Green for MTs, Dominant Blue for MA */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isMTs
            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600'
            : 'bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600'
        }`}
      />

      {/* Top Section */}
      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Stylized Solid Icon Container with High-Contrast Dark Mode Styling */}
          <div
            className={`flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl border shadow-xs transition-all duration-300 group-hover:shadow-md ${
              isMTs
                ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200/90 dark:border-emerald-700/80 group-hover:border-emerald-400 dark:group-hover:border-emerald-500'
                : 'bg-blue-50 dark:bg-blue-950/70 border-blue-200/90 dark:border-blue-700/80 group-hover:border-blue-400 dark:group-hover:border-blue-500'
            }`}
          >
            {renderIcon()}
          </div>

          {/* Unit Badge with High Contrast */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isMTs
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-600'
                : 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/90 dark:text-blue-200 dark:border-blue-600'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isMTs ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-blue-500 dark:bg-blue-400'
              }`}
            />
            {app.unit}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors ${
            isMTs
              ? 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300'
              : 'group-hover:text-blue-600 dark:group-hover:text-blue-300'
          }`}
        >
          {app.title}
        </h3>

        {/* Description with High Contrast in Dark Mode */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed line-clamp-2">
          {app.description}
        </p>
      </div>

      {/* Bottom Action Area: Centered Button with Unit-Dominant Color */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm active:scale-98 transition-all duration-200 group/btn ${
            isMTs
              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:via-emerald-600 dark:to-teal-600 shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30'
              : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:via-blue-600 dark:to-indigo-600 shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30'
          }`}
        >
          <span>Masuk</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};
