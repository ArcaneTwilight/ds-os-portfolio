import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  FolderKanban, 
  Layers, 
  HardDrive, 
  Mail, 
  FileText, 
  Sliders, 
  FolderGit2, 
  Terminal, 
  Info, 
  Palette, 
  Sparkles, 
  ExternalLink,
  UserRound,
  Play
} from 'lucide-react';
import { AppId } from '../../types/os';
import { DEVELOPER_PROFILE } from '../../data/portfolioData';

interface SpatialMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onExternalLink: (url: string) => void;
}

export const SpatialMenu: React.FC<SpatialMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onExternalLink
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }
    if (!shouldRender) return;

    const timeoutId = window.setTimeout(() => setShouldRender(false), 150);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen, shouldRender]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!shouldRender && !isOpen) return null;

  const apps = [
    { id: 'about' as AppId, title: 'About DS OS', desc: 'System specs & developer profile', icon: Info, color: 'text-blue-400' },
    { id: 'projects' as AppId, title: 'Projects', desc: 'System tools, vector search & compilers', icon: FolderKanban, color: 'text-sky-400' },
    { id: 'experience' as AppId, title: 'Experience', desc: 'Staff engineer timeline & leadership', icon: Layers, color: 'text-emerald-400' },
    { id: 'tech-stack' as AppId, title: 'Tech Stack', desc: 'Frontend, backend, AI & cloud skills', icon: HardDrive, color: 'text-amber-400' },
    { id: 'files' as AppId, title: 'Files & Folders', desc: 'Virtual filesystem & documents', icon: FolderGit2, color: 'text-cyan-400' },
    { id: 'resume' as AppId, title: 'Resume', desc: 'Curriculum vitae document reader', icon: FileText, color: 'text-indigo-400' },
    { id: 'terminal' as AppId, title: 'Terminal', desc: 'Workstation command shell', icon: Terminal, color: 'text-slate-300' },
    { id: 'customizer' as AppId, title: 'Customizer', desc: 'Wallpaper, theme & glass blur', icon: Sliders, color: 'text-purple-400' },
    { id: 'personal' as AppId, title: 'Personal', desc: 'Gallery and listening room', icon: UserRound, color: 'text-rose-400' },
    { id: 'walkthrough' as AppId, title: 'Quick Walkthrough', desc: 'A one-minute portfolio overview', icon: Play, color: 'text-lime-400' },
  ];

  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      ref={menuRef}
      className={`menu-panel fixed top-11 left-3 w-80 max-h-[85vh] overflow-hidden rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 flex flex-col text-slate-200 ring-1 ring-white/10 ${
        isOpen ? 'menu-panel-visible' : 'menu-panel-exit'
      }`}
    >
      {/* Header Profile / OS Lockup */}
      <div className="p-3.5 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md font-mono text-xs">
            DS
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-white text-sm truncate">
              {DEVELOPER_PROFILE.name}
            </span>
            <span className="text-[11px] text-slate-400 truncate">
              {DEVELOPER_PROFILE.role}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications & documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
            autoFocus
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="p-2 overflow-y-auto max-h-[340px] space-y-1">
        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Applications
        </div>
        {filteredApps.length === 0 ? (
          <div className="py-4 text-center text-xs text-slate-400">
            No matching applications found
          </div>
        ) : (
          filteredApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15">
                  <Icon className={`w-4 h-4 ${app.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white group-hover:text-sky-300 transition-colors">
                    {app.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {app.desc}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* System Actions & Footer */}
      <div className="p-2 border-t border-white/10 bg-white/5 flex flex-col gap-1 text-xs">
        <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          System & Settings
        </div>
        <div className="grid grid-cols-2 gap-1 mt-0.5">
          <button
            onClick={() => {
              onOpenApp('customizer');
              onClose();
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-left"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px]">Wallpapers</span>
          </button>

          <button
            onClick={() => {
              onOpenApp('about');
              onClose();
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-left"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px]">Specs & Bio</span>
          </button>
        </div>

        {/* External Quick Link */}
        {DEVELOPER_PROFILE.github && <button
          type="button"
          onClick={() => onExternalLink(DEVELOPER_PROFILE.github)}
          className="flex items-center justify-between px-2.5 py-1.5 mt-1 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>GitHub Profile</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </button>}
      </div>
    </div>
  );
};
