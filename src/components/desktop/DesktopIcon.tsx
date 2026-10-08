import React from 'react';
import { 
  FolderKanban, 
  Layers, 
  Terminal as TerminalIcon, 
  FileText, 
  Sliders, 
  FolderGit2, 
  Sparkles,
  UserRound,
  Play,
  LucideIcon
} from 'lucide-react';
import { AppId } from '../../types/os';
import { soundManager } from '../../utils/audio';

interface DesktopIconProps {
  id: string;
  appId: AppId;
  label: string;
  iconName: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (appId: AppId) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  about: Sparkles,
  projects: FolderKanban,
  experience: Layers,
  resume: FileText,
  customizer: Sliders,
  files: FolderGit2,
  terminal: TerminalIcon,
  personal: UserRound,
  walkthrough: Play
};

const COLOR_MAP: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  about: {
    bg: 'from-blue-500/20 to-indigo-600/20',
    border: 'border-blue-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
    text: 'text-blue-300'
  },
  projects: {
    bg: 'from-sky-500/20 to-blue-600/20',
    border: 'border-sky-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]',
    text: 'text-sky-300'
  },
  experience: {
    bg: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    text: 'text-emerald-300'
  },
  resume: {
    bg: 'from-indigo-500/20 to-violet-600/20',
    border: 'border-indigo-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]',
    text: 'text-indigo-300'
  },
  customizer: {
    bg: 'from-purple-500/20 to-fuchsia-600/20',
    border: 'border-purple-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]',
    text: 'text-purple-300'
  },
  files: {
    bg: 'from-cyan-500/20 to-teal-600/20',
    border: 'border-cyan-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    text: 'text-cyan-300'
  },
  terminal: {
    bg: 'from-zinc-500/20 to-slate-700/20',
    border: 'border-zinc-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(148,163,184,0.25)]',
    text: 'text-slate-200'
  },
  personal: {
    bg: 'from-rose-500/20 to-orange-600/20',
    border: 'border-rose-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]',
    text: 'text-rose-300'
  },
  walkthrough: {
    bg: 'from-lime-500/20 to-emerald-600/20',
    border: 'border-lime-400/30',
    glow: 'group-hover:shadow-[0_0_20px_rgba(132,204,22,0.25)]',
    text: 'text-lime-300'
  }
};

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  appId,
  label,
  iconName,
  isSelected,
  onSelect,
  onOpen
}) => {
  const IconComponent = ICON_MAP[iconName] || FolderKanban;
  const colors = COLOR_MAP[iconName] || COLOR_MAP.projects;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelect(id);
    soundManager.playClick(600, 0.02);
    onOpen(appId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 cursor-pointer w-24 select-none border-0 text-inherit ${
        isSelected
          ? 'bg-white/15 backdrop-blur-md shadow-lg ring-1 ring-white/30'
          : 'hover:bg-white/10 hover:backdrop-blur-sm'
      }`}
      aria-label={`Open ${label}`}
      data-ph-capture-attribute-app-id={appId}
      data-ph-capture-attribute-app-name={label}
    >
      {/* Icon Frame */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} flex items-center justify-center shadow-md transition-all duration-200 group-hover:scale-105 ${colors.glow}`}
      >
        <IconComponent className={`w-7 h-7 ${colors.text} drop-shadow-sm`} />
      </div>

      {/* Label */}
      <span className="mt-2 text-xs font-medium text-slate-200 tracking-wide text-center px-1.5 py-0.5 rounded truncate max-w-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
};
