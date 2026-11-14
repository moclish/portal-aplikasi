export type UnitType = 'Semua' | 'MTs' | 'MA' | 'Pondok';

export interface AppLink {
  id: string;
  title: string;
  shortName: string;
  unit: 'MTs' | 'MA' | 'Pondok';
  category: 'RDM' | 'E-Learning' | 'CBT' | 'Pondok';
  description: string;
  url: string;
  iconName: string;
  accentColor: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  category: 'RDM' | 'E-Learning' | 'CBT';
  curriculum?: string;
  note?: string;
  youtubeId: string;
  youtubeUrl: string;
  description: string;
}

export interface PortalConfig {
  institutionName: string;
  subTitle: string;
  logoUrl: string;
  faviconUrl?: string;
}
