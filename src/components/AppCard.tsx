import React from 'react';
import {
  GraduationCap,
  Laptop,
  FileCheck,
  Layers,
  ArrowUpRight,
  Users,
  BookOpen,
  Wallet,
  ClipboardCheck,
  Building2,
  ShieldCheck,
  FileSpreadsheet,
  Mail,
} from 'lucide-react';
import { AppLink } from '../types/index.ts';

interface AppCardProps {
  app: AppLink;
}

const UNIT_STYLES = {
  MTs: {
    cardHover:
      'hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/15 dark:hover:shadow-emerald-900/30',
    topBar: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600',
    iconContainer:
      'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200/90 dark:border-emerald-700/80 group-hover:border-emerald-400 dark:group-hover:border-emerald-500',
    iconText: 'text-emerald-600 dark:text-emerald-300',
    badge:
      'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-600',
    badgeDot: 'bg-emerald-500 dark:bg-emerald-400',
    titleHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300',
    button:
      'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:via-emerald-600 dark:to-teal-600 shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30',
  },
  MA: {
    cardHover:
      'hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/15 dark:hover:shadow-blue-900/30',
    topBar: 'bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600',
    iconContainer:
      'bg-blue-50 dark:bg-blue-950/70 border-blue-200/90 dark:border-blue-700/80 group-hover:border-blue-400 dark:group-hover:border-blue-500',
    iconText: 'text-blue-600 dark:text-blue-300',
    badge:
      'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/90 dark:text-blue-200 dark:border-blue-600',
    badgeDot: 'bg-blue-500 dark:bg-blue-400',
    titleHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
    button:
      'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:via-blue-600 dark:to-indigo-600 shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30',
  },
  Pondok: {
    cardHover:
      'hover:border-violet-500 dark:hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/15 dark:hover:shadow-violet-950/40',
    topBar: 'bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500',
    iconContainer:
      'bg-violet-50 dark:bg-violet-950/60 border-violet-200/90 dark:border-violet-800/80 group-hover:border-violet-400 dark:group-hover:border-violet-500',
    iconText: 'text-violet-600 dark:text-violet-300',
    badge:
      'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/80 dark:text-violet-200 dark:border-violet-700',
    badgeDot: 'bg-violet-500 dark:bg-violet-400',
    titleHover: 'group-hover:text-violet-600 dark:group-hover:text-violet-300',
    button:
      'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-600 dark:hover:from-violet-500 dark:hover:to-indigo-500 shadow-violet-500/20 hover:shadow-md hover:shadow-violet-500/30',
  },
};

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const styles = UNIT_STYLES[app.unit] || UNIT_STYLES.Pondok;

  // Consistent icon mapping per category & customizable iconName for Pondok apps
  const renderIcon = () => {
    const iconProps = {
      className: `w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110 ${styles.iconText}`,
    };

    if (app.category === 'RDM') return <GraduationCap {...iconProps} />;
    if (app.category === 'E-Learning') return <Laptop {...iconProps} />;
    if (app.category === 'CBT') return <FileCheck {...iconProps} />;

    switch (app.iconName) {
      case 'Users':
        return <Users {...iconProps} />;
      case 'BookOpen':
        return <BookOpen {...iconProps} />;
      case 'Wallet':
        return <Wallet {...iconProps} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet {...iconProps} />;
      case 'Mail':
        return <Mail {...iconProps} />;
      case 'ClipboardCheck':
        return <ClipboardCheck {...iconProps} />;
      case 'Building2':
        return <Building2 {...iconProps} />;
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      default:
        return <Layers {...iconProps} />;
    }
  };

  return (
    <div
      className={`w-full flex-1 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-lg dark:shadow-black/35 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${styles.cardHover}`}
    >
      {/* Top accent color bar - Green for MTs, Blue for MA, Violet for Pondok */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${styles.topBar}`} />

      {/* Top Section */}
      <div className="relative z-10 pt-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Stylized Solid Icon Container with High-Contrast Dark Mode Styling */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-xs transition-all duration-300 group-hover:shadow-md ${styles.iconContainer}`}
          >
            {renderIcon()}
          </div>

          {/* Unit Badge with High Contrast */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.badgeDot}`} />
            {app.unit}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors ${styles.titleHover}`}
        >
          {app.title}
        </h3>

        {/* Description with Balanced High Contrast */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {app.description}
        </p>
      </div>

      {/* Bottom Action Area: Centered Button with Unit-Dominant Color */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-center">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer outline-none group/btn ${styles.button}`}
        >
          <span>Masuk</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};
