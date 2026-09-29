export type AppId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'tech-stack'
  | 'resume'
  | 'customizer'
  | 'files'
  | 'terminal';

export type WallpaperId = 'aurora' | 'cyberpunk' | 'deep-space' | 'slate' | 'sunset';

export type ThemeId = 'dark-void' | 'midnight-navy' | 'obsidian' | 'graphite';

export type BlurLevel = 'low' | 'medium' | 'ultra';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  prevRect?: { x: number; y: number; width: number; height: number };
}

export interface DesktopIconItem {
  id: string;
  title: string;
  appId: AppId;
  type: 'app' | 'folder' | 'file';
  target?: string;
  iconName: string;
  x?: number;
  y?: number;
}

export interface SystemSettings {
  wallpaper: WallpaperId;
  theme: ThemeId;
  glassBlur: BlurLevel;
  contrast: number; // 80 - 120
  particles: boolean;
  ambientAudio: boolean;
  ambientVolume: number;
  showGrid: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Systems' | 'AI' | 'Cloud' | 'Interface';
  technologies: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  architectureNotes?: string;
  accentColor: string;
  stats?: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  category: 'Full-Stack' | 'Architecture' | 'Frontend' | 'Systems';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI' | 'Tools & Cloud';
  proficiency: number; // 0 - 100
  experienceYears: number;
  description: string;
  iconName: string;
  featured?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'txt' | 'code';
  size: string;
  updatedAt: string;
  appId?: AppId;
  content?: string;
}
