import { AppLink, TutorialItem, PortalConfig } from '../types/index.ts';

export const INITIAL_APPS: AppLink[] = [
  {
    id: 'rdm-mts',
    title: 'Rapor Digital',
    shortName: 'Rapor Digital MTs',
    unit: 'MTs',
    category: 'RDM',
    description: 'Aplikasi untuk pengelolaan nilai dan pelaporan hasil belajar santri.',
    url: 'https://rdm.mts.alfurqanpaser.com/',
    iconName: 'GraduationCap',
    accentColor: 'emerald',
  },
  {
    id: 'rdm-ma',
    title: 'Rapor Digital',
    shortName: 'Rapor Digital MA',
    unit: 'MA',
    category: 'RDM',
    description: 'Aplikasi untuk pengelolaan nilai dan pelaporan hasil belajar santri.',
    url: 'https://rdm.ma.alfurqanpaser.com/',
    iconName: 'GraduationCap',
    accentColor: 'blue',
  },
  {
    id: 'learn-mts',
    title: 'E-Learning',
    shortName: 'Pembelajaran MTs',
    unit: 'MTs',
    category: 'E-Learning',
    description: 'Ruang kelas digital & materi pembelajaran interaktif Madrasah Tsanawiyah.',
    url: 'https://learn.mts.alfurqanpaser.com/',
    iconName: 'Laptop',
    accentColor: 'emerald',
  },
  {
    id: 'learn-ma',
    title: 'E-Learning',
    shortName: 'Pembelajaran MA',
    unit: 'MA',
    category: 'E-Learning',
    description: 'Ruang kelas digital & materi pembelajaran interaktif Madrasah Aliyah.',
    url: 'https://learn.ma.alfurqanpaser.com/',
    iconName: 'Laptop',
    accentColor: 'blue',
  },
  {
    id: 'cbt-mts',
    title: 'Ujian Online',
    shortName: 'Ujian Online MTs',
    unit: 'MTs',
    category: 'CBT',
    description: 'Aplikasi Ujian Online Madrasah Tsanawiyah yang aman dan praktis.',
    url: 'https://cbt.mts.alfurqanpaser.com/',
    iconName: 'FileCheck',
    accentColor: 'emerald',
  },
  {
    id: 'cbt-ma',
    title: 'Ujian Online',
    shortName: 'Ujian Online MA',
    unit: 'MA',
    category: 'CBT',
    description: 'Aplikasi Ujian Online Madrasah Aliyah yang aman dan praktis.',
    url: 'https://cbt.ma.alfurqanpaser.com/',
    iconName: 'FileCheck',
    accentColor: 'blue',
  },
];

export const INITIAL_TUTORIALS: TutorialItem[] = [
  {
    id: 'tut-kurikulum-merdeka',
    title: 'Tutorial RDM Kurikulum Merdeka',
    category: 'RDM',
    curriculum: 'Kurikulum Merdeka',
    description: 'Panduan pengisian penilaian capaian pembelajaran (TP), deskripsi nilai, dan cetak rapor.',
    youtubeId: 'r9Y5TQQSpFk',
    youtubeUrl: 'https://www.youtube.com/watch?v=r9Y5TQQSpFk',
  },
  {
    id: 'tut-rapor-p5ra',
    title: 'Tutorial Rapor P5RA',
    category: 'RDM',
    curriculum: 'P5RA',
    description: 'Dokumentasi teknis penilaian projek penguatan profil pelajar (mulai tahun 2025 sudah tidak digunakan).',
    note: 'Mulai tahun 2025 sudah tidak dipakai',
    youtubeId: '4ZErpnde3c0',
    youtubeUrl: 'https://www.youtube.com/watch?v=4ZErpnde3c0',
  },
];

export const DEFAULT_CONFIG: PortalConfig = {
  institutionName: 'Apps Al-Furqan',
  subTitle: 'Portal Aplikasi Terpadu',
  logoUrl: 'https://drive.google.com/file/d/1Lnjb5gB-SnhqZBKN2XuXbg187LtT7W1L/view?usp=sharing', // Tempelkan tautan Google Drive logo Anda di sini
  faviconUrl: 'https://drive.google.com/file/d/1Pc_HuTjT5Yeotefa5zZEtazHMSGyXMFO/view?usp=sharing', // Opsional: Tempelkan tautan Google Drive favicon Anda di sini (jika kosong, otomatis menggunakan logoUrl)
};
