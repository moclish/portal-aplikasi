import React, { useState, useEffect } from 'react';
import { Play, BookOpen, AlertCircle, X } from 'lucide-react';
import { TutorialItem } from '../types/index.ts';

interface TutorialSectionProps {
  tutorials: TutorialItem[];
}

export const TutorialSection: React.FC<TutorialSectionProps> = ({ tutorials }) => {
  // State for active video in popup modal
  const [modalVideo, setModalVideo] = useState<TutorialItem | null>(null);

  // State for tutorial category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Filter options matching the application categories: RDM, E-Learning, CBT
  const filterOptions = ['Semua', 'RDM', 'E-Learning', 'CBT'];

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (modalVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalVideo]);

  const filteredTutorials = tutorials.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="tutorials" className="mb-10 sm:mb-14 scroll-mt-20 sm:scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tutorial Aplikasi
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
          Panduan video penggunaan aplikasi
        </p>

        {/* Tutorial Filter Tabs with Enhanced Dark Mode Contrast */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {filterOptions.map((option) => {
            const isSelected = selectedCategory === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedCategory(option)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-white font-bold border-sky-400 shadow-sm shadow-sky-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Solid High-Contrast Tutorial Cards or Empty State */}
      {filteredTutorials.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3 opacity-60" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Belum ada video tutorial untuk kategori <span className="text-sky-500">{selectedCategory}</span>.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pilih kategori lain atau klik "Semua" untuk melihat seluruh panduan.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {filteredTutorials.map((item) => {
            const thumbnail = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

            return (
              <div
                key={item.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md lg:max-w-none group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-md dark:shadow-black/40 hover:shadow-xl hover:shadow-sky-500/15 hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail Container (Triggers Modal Pop-Up on Click) */}
                <button
                  type="button"
                  onClick={() => setModalVideo(item)}
                  className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-800 block cursor-pointer group/thumb text-left"
                  aria-label={`Buka video ${item.title}`}
                >
                  <img
                    src={thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover/thumb:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform duration-200">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                </button>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Category and Curriculum arranged with justify-between */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Distinct Badge for Each Category */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${
                          item.category === 'RDM'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700'
                            : item.category === 'E-Learning'
                            ? 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/80 dark:text-sky-200 dark:border-sky-700'
                            : 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/80 dark:text-purple-200 dark:border-purple-700'
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{item.category}</span>
                      </span>

                      {/* Curriculum Badge */}
                      {item.curriculum && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 truncate max-w-[60%]">
                          {item.curriculum}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h4>

                    {/* Description with High Contrast in Dark Mode */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Optional Note (e.g. status P5RA) */}
                    {item.note && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-700/80 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5 leading-relaxed">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{item.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Pop-Up / Modal - CAN ONLY BE CLOSED BY CLICKING THE (X) BUTTON */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          /* Backdrop click does NOT close modal, only (x) button closes it */
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900 text-white">
              <div className="min-w-0 pr-4">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {modalVideo.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-300 truncate mt-0.5">
                  {modalVideo.category}{modalVideo.curriculum ? ` • ${modalVideo.curriculum}` : ''}
                </p>
              </div>

              {/* Explicit (X) Close Button - Only way to close */}
              <button
                type="button"
                onClick={() => setModalVideo(null)}
                className="p-1.5 sm:p-2 rounded-xl text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors shrink-0 flex items-center gap-1 text-xs font-semibold cursor-pointer"
                aria-label="Tutup video"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Video Player (16:9 Cinema Aspect Ratio) */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
