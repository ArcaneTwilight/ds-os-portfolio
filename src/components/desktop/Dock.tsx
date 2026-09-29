import React, { useState } from 'react';
import { 
  FolderKanban, 
  Layers, 
  HardDrive, 
  FileText, 
  Sliders, 
  FolderGit2, 
  Terminal,
  Sparkles,
  LucideIcon 
} from 'lucide-react';
import { AppId, WindowState } from '../../types/os';
import { soundManager } from '../../utils/audio';

interface DockAppDefinition {
  id: AppId;
  label: string;
  icon: LucideIcon;
  color: string;
}

// Pinned to the dock at all times
const PINNED_APPS: DockAppDefinition[] = [
  { id: 'files', label: 'Files', icon: FolderGit2, color: 'text-cyan-400' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-slate-200' },
  { id: 'customizer', label: 'Settings', icon: Sliders, color: 'text-purple-400' }
];

// Other applications that appear in the dock only when open
const UNPINNED_APP_METAS: Record<string, DockAppDefinition> = {
  about: { id: 'about', label: 'About', icon: Sparkles, color: 'text-blue-400' },
  projects: { id: 'projects', label: 'Projects', icon: FolderKanban, color: 'text-sky-400' },
  experience: { id: 'experience', label: 'Experience', icon: Layers, color: 'text-emerald-400' },
  'tech-stack': { id: 'tech-stack', label: 'Tech Stack', icon: HardDrive, color: 'text-amber-400' },
  resume: { id: 'resume', label: 'Resume', icon: FileText, color: 'text-indigo-400' }
};

interface DockProps {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  onAppClick: (appId: AppId) => void;
}

export const Dock: React.FC<DockProps> = ({
  windows,
  activeWindowId,
  onAppClick
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dynamic open apps that are NOT pinned
  const activeUnpinnedApps: DockAppDefinition[] = Object.keys(UNPINNED_APP_METAS)
    .filter((id) => windows[id as AppId]?.isOpen)
    .map((id) => UNPINNED_APP_METAS[id]);

  // Combine unpinned open apps on the left, then pinned apps on the right
  const dockItems: DockAppDefinition[] = [...activeUnpinnedApps, ...PINNED_APPS];

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none z-40 select-none">
      <div 
        onMouseLeave={() => setHoveredIndex(null)}
        className="pointer-events-auto flex items-end gap-2 px-3.5 py-2 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 ring-1 ring-white/10"
      >
        {dockItems.map((app, index) => {
          const Icon = app.icon;
          const windowState = windows[app.id];
          const isOpen = windowState?.isOpen;
          const isMinimized = windowState?.isMinimized;
          const isActive = activeWindowId === app.id && isOpen && !isMinimized;

          // Only the currently hovered icon gets scaled
          const isHovered = hoveredIndex === index;
          const scale = isHovered ? 1.25 : 1;

          // If this is the boundary between open dynamic apps and pinned apps, show a subtle divider
          const showDividerBefore = activeUnpinnedApps.length > 0 && index === activeUnpinnedApps.length;

          return (
            <React.Fragment key={app.id}>
              {showDividerBefore && (
                <div className="w-px h-7 bg-white/15 mx-1 self-center" />
              )}
              <div
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-white/10 rounded-md text-[11px] font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {app.label}
                </div>

                {/* Icon button */}
                <button
                  onClick={() => {
                    soundManager.playClick(680, 0.03);
                    onAppClick(app.id);
                  }}
                  style={{
                    transform: `scale(${scale}) translateY(${isHovered ? '-6px' : '0px'})`,
                    transformOrigin: 'bottom center'
                  }}
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ease-out focus:outline-none ${
                    isActive
                      ? 'bg-white/20 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                      : 'bg-white/10 hover:bg-white/15 border border-white/10'
                  }`}
                  aria-label={`Launch ${app.label}`}
                >
                  <Icon className={`w-5 h-5 ${app.color} transition-transform ${isHovered ? 'scale-110' : ''}`} />
                </button>

                {/* Indicator Dot */}
                <div className="h-1.5 flex items-center justify-center mt-1">
                  {isOpen && (
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-2 h-2 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                          : isMinimized
                          ? 'w-1.5 h-1.5 bg-slate-500'
                          : 'w-1.5 h-1.5 bg-slate-300'
                      }`}
                    />
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
