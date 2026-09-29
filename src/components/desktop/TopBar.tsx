import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Sliders, 
  FolderKanban, 
  Layers, 
  Terminal, 
  FolderGit2, 
  Sparkles 
} from 'lucide-react';
import { AppId } from '../../types/os';
import { soundManager } from '../../utils/audio';

interface TopBarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onOpenApp: (appId: AppId) => void;
  ambientAudio: boolean;
  onToggleAudio: () => void;
  onOpenCustomizer: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isMenuOpen,
  onToggleMenu,
  onOpenApp,
  ambientAudio,
  onToggleAudio,
  onOpenCustomizer
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-PH', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setDate(
        now.toLocaleDateString('en-PH', {
          timeZone: 'Asia/Manila',
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-3 text-xs select-none">
      {/* Zone 1: Spatial OS Brand & Menu Trigger */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            soundManager.playClick(720, 0.02);
            onToggleMenu();
          }}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-md transition-colors ${
            isMenuOpen
              ? 'bg-white/20 text-white shadow-inner'
              : 'text-slate-200 hover:bg-white/10 hover:text-white'
          }`}
          aria-expanded={isMenuOpen}
          aria-label="Spatial OS System Menu"
        >
          {/* DS OS Symbol */}
          <div className="w-4 h-4 rounded-sm bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-sm">
            <span className="text-[9px] font-extrabold text-black font-mono leading-none">DS</span>
          </div>
          <span className="font-semibold tracking-tight text-white font-sans">
            DS OS
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isMenuOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </button>

        {/* Quiet status pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Connected to virtual desktop</span>
        </span>
      </div>

      {/* Zone 2: Quick App Shortcuts */}
      <nav className="hidden md:flex items-center gap-1 text-slate-300">
        <button
          onClick={() => onOpenApp('projects')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-white/10 hover:text-white transition-colors"
          title="Open Projects"
        >
          <FolderKanban className="w-3.5 h-3.5 text-sky-400" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => onOpenApp('experience')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-white/10 hover:text-white transition-colors"
          title="Open Experience"
        >
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Experience</span>
        </button>

        <button
          onClick={() => onOpenApp('files')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-white/10 hover:text-white transition-colors"
          title="Open Files"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Files</span>
        </button>

        <button
          onClick={() => onOpenApp('terminal')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-white/10 hover:text-white transition-colors"
          title="Open Terminal"
        >
          <Terminal className="w-3.5 h-3.5 text-slate-300" />
          <span>Terminal</span>
        </button>
      </nav>

      {/* Zone 3: Audio, Settings & Digital Clock */}
      <div className="flex items-center gap-2">
        {/* Ambient Sound Toggle */}
        <button
          onClick={onToggleAudio}
          className={`flex shrink-0 items-center justify-center gap-1.5 px-2 py-1 rounded-md transition-colors lg:w-[108px] ${
            ambientAudio
              ? 'text-sky-300 bg-sky-500/15 border border-sky-500/30'
              : 'text-slate-400 hover:bg-white/10 hover:text-slate-200'
          }`}
          title={ambientAudio ? 'Mute background audio' : 'Play background audio'}
          aria-label="Ambient Audio Toggle"
        >
          {ambientAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-mono">Ambient ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-mono text-slate-500">Muted</span>
            </>
          )}
        </button>

        {/* Customizer trigger */}
        <button
          onClick={onOpenCustomizer}
          className="p-1.5 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          title="Desktop Appearance & Customizer"
          aria-label="Customize Desktop"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Date & Time */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-slate-300 bg-white/5 border border-white/5 font-mono text-[11px]">
          <img src="/ph-flag.svg" alt="Philippine flag" className="h-[11px] w-4 rounded-[2px] object-cover" />
          <span className="hidden sm:inline text-slate-400">{date}</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span className="font-semibold text-white tracking-wider">{time || '12:00:00 PM'}</span>
          <span className="text-sky-300">PHT</span>
        </div>
      </div>
    </header>
  );
};
