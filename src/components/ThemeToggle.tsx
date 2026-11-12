import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        onToggle();
        (e.currentTarget as HTMLElement).blur();
      }}
      aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      className={`relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all duration-200 border-none outline-none focus:outline-none cursor-pointer ${
        isDark
          ? 'bg-transparent text-amber-300 hover:bg-slate-800/80 hover:text-amber-200'
          : 'bg-transparent text-amber-500 hover:bg-slate-100 hover:text-amber-600'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 transition-transform duration-300" />
        ) : (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
};
