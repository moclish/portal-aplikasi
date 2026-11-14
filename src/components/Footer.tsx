import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-xs text-slate-500 dark:text-slate-300">
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean Divider Line between Tutorial and Footer */}
        <div className="w-full border-t border-slate-200/90 dark:border-slate-800" />

        {/* Content Perfectly Centered Both Vertically and Horizontally */}
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-center text-center gap-1.5 sm:gap-3">
          <span className="font-medium text-slate-700 dark:text-slate-300 leading-normal">
            Copyright &copy; {currentYear}.
          </span>
          <span className="hidden sm:inline-flex items-center text-slate-300 dark:text-slate-600 select-none leading-none">
            •
          </span>
          <span className="inline-flex items-center justify-center gap-1.5 leading-normal">
            <span>Created with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
            <span>by</span>
            <a
              href="https://instagram.com/sadonox"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-600 dark:text-sky-300 hover:underline"
            >
              Mo
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
