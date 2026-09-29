import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  ChevronRight, 
  HardDrive, 
  Home, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  FolderGit2
} from 'lucide-react';
import { AppId, FileItem } from '../../types/os';
import { VIRTUAL_FILES } from '../../data/portfolioData';
import { soundManager } from '../../utils/audio';

interface FilesAppProps {
  onOpenApp: (appId: AppId) => void;
}

export const FilesApp: React.FC<FilesAppProps> = ({ onOpenApp }) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('Spatial OS / Developer / Home');

  const handleItemClick = (file: FileItem) => {
    setSelectedFileId(file.id);
    soundManager.playClick(750, 0.02);
  };

  const handleItemDoubleClick = (file: FileItem) => {
    if (file.appId) {
      onOpenApp(file.appId);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none">
      {/* File Explorer Nav Toolbar */}
      <div className="h-10 px-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors opacity-40">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-slate-300 font-mono text-[11px] bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            <Home className="w-3 h-3 text-cyan-400" />
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span>Developer</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-white font-semibold">Workspace</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          {VIRTUAL_FILES.length} items
        </span>
      </div>

      {/* Explorer Content Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <div className="w-48 bg-black/40 border-r border-white/10 p-3 space-y-4 shrink-0 hidden sm:block">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2">
              Favorites
            </span>
            <div className="mt-1 space-y-0.5">
              <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium text-left">
                <Home className="w-3.5 h-3.5 text-cyan-400" />
                <span>Workspace</span>
              </button>
              <button
                onClick={() => onOpenApp('projects')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white text-xs text-left transition-colors"
              >
                <Folder className="w-3.5 h-3.5 text-sky-400" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => onOpenApp('experience')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white text-xs text-left transition-colors"
              >
                <Folder className="w-3.5 h-3.5 text-emerald-400" />
                <span>Experience</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2">
              System Volume
            </span>
            <div className="mt-1 space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-400">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                <span>Spatial HD (NVMe)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {VIRTUAL_FILES.map((file) => {
              const isSelected = selectedFileId === file.id;
              const isFolder = file.type === 'folder';

              return (
                <div
                  key={file.id}
                  onClick={() => handleItemClick(file)}
                  onDoubleClick={() => handleItemDoubleClick(file)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-150 cursor-pointer text-center group ${
                    isSelected
                      ? 'bg-white/15 border-white/30 shadow-lg ring-1 ring-white/20'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleItemDoubleClick(file);
                  }}
                >
                  {/* File/Folder Icon Graphic */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-105">
                    {isFolder ? (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/30 border border-sky-400/30 flex items-center justify-center shadow-md">
                        <Folder className="w-6 h-6 text-sky-400" />
                      </div>
                    ) : file.type === 'pdf' ? (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/30 border border-indigo-400/30 flex items-center justify-center shadow-md">
                        <FileText className="w-6 h-6 text-indigo-400" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-500/20 to-slate-700/30 border border-slate-400/30 flex items-center justify-center shadow-md">
                        <FileText className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <span className="text-xs font-medium text-white truncate max-w-full">
                    {file.name}
                  </span>

                  {/* Meta */}
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {file.size}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span>Tip: Double-click any folder or document to open the native application.</span>
            <span className="font-mono text-[11px]">POSIX Virtual FS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
