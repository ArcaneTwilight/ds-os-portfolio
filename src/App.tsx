/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  FolderKanban, 
  Layers, 
  FileText, 
  Sliders, 
  FolderGit2, 
  Terminal, 
  Sparkles,
  UserRound,
  Play,
  LucideIcon
} from 'lucide-react';
import { 
  AppId, 
  WindowState, 
  DesktopIconItem, 
  SystemSettings, 
  WallpaperId 
} from './types/os';
import { soundManager } from './utils/audio';

import { DesktopBackground } from './components/desktop/DesktopBackground';
import { DesktopIcon } from './components/desktop/DesktopIcon';
import { TopBar } from './components/desktop/TopBar';
import { Dock } from './components/desktop/Dock';
import { SpatialMenu } from './components/desktop/SpatialMenu';
import { WindowFrame } from './components/window/WindowFrame';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { ExternalLinkModal } from './components/ui/ExternalLinkModal';

// Apps
import { AboutApp } from './components/apps/AboutApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { ExperienceApp } from './components/apps/ExperienceApp';
import { ResumeApp } from './components/apps/ResumeApp';
import { CustomizerApp } from './components/apps/CustomizerApp';
import { FilesApp } from './components/apps/FilesApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { PersonalApp } from './components/apps/PersonalApp';
import { WalkthroughApp } from './components/apps/WalkthroughApp';

const STORAGE_KEY = 'ds_os_settings_v3';
const LEGACY_STORAGE_KEY = 'ds_os_settings_v2';

const DEFAULT_SETTINGS: SystemSettings = {
  wallpaper: 'aurora',
  theme: 'graphite',
  glassBlur: 'medium',
  contrast: 100,
  particles: true,
  soundEffectsEnabled: true,
  ambientAudio: true,
  ambientVolume: 35,
  showGrid: true
};

const APP_META: Record<AppId, { title: string; icon: LucideIcon; color: string; defaultSize: { width: number; height: number }; minSize: { width: number; height: number } }> = {
  about: {
    title: 'About // Deevann Shrestha & DS OS',
    icon: Sparkles,
    color: 'text-blue-400',
    defaultSize: { width: 720, height: 540 },
    minSize: { width: 420, height: 340 }
  },
  projects: {
    title: 'Projects // Apps & Systems',
    icon: FolderKanban,
    color: 'text-sky-400',
    defaultSize: { width: 920, height: 620 },
    minSize: { width: 480, height: 380 }
  },
  experience: {
    title: 'Experience // Career Timeline',
    icon: Layers,
    color: 'text-emerald-400',
    defaultSize: { width: 840, height: 580 },
    minSize: { width: 480, height: 360 }
  },
  files: {
    title: 'Files // Virtual Workspace',
    icon: FolderGit2,
    color: 'text-cyan-400',
    defaultSize: { width: 780, height: 500 },
    minSize: { width: 440, height: 320 }
  },
  resume: {
    title: 'Resume // Curriculum Vitae Preview',
    icon: FileText,
    color: 'text-indigo-400',
    defaultSize: { width: 860, height: 640 },
    minSize: { width: 500, height: 400 }
  },
  terminal: {
    title: 'Terminal // Workstation Shell',
    icon: Terminal,
    color: 'text-slate-200',
    defaultSize: { width: 680, height: 440 },
    minSize: { width: 400, height: 280 }
  },
  customizer: {
    title: 'Settings // Desktop Appearance',
    icon: Sliders,
    color: 'text-purple-400',
    defaultSize: { width: 720, height: 580 },
    minSize: { width: 440, height: 380 }
  },
  personal: {
    title: 'Personal // Beyond the Work',
    icon: UserRound,
    color: 'text-rose-400',
    defaultSize: { width: 820, height: 600 },
    minSize: { width: 460, height: 360 }
  },
  walkthrough: {
    title: 'Quick Walkthrough // Deevann Shrestha',
    icon: Play,
    color: 'text-lime-400',
    defaultSize: { width: 780, height: 560 },
    minSize: { width: 440, height: 340 }
  }
};

const DESKTOP_ICONS: DesktopIconItem[] = [
  { id: 'icon-about', title: 'About DS OS', appId: 'about', type: 'app', iconName: 'about' },
  { id: 'icon-projects', title: 'Projects', appId: 'projects', type: 'app', iconName: 'projects' },
  { id: 'icon-experience', title: 'Experience', appId: 'experience', type: 'app', iconName: 'experience' },
  { id: 'icon-files', title: 'Files', appId: 'files', type: 'folder', iconName: 'files' },
  { id: 'icon-resume', title: 'Resume.pdf', appId: 'resume', type: 'file', iconName: 'resume' },
  { id: 'icon-terminal', title: 'Terminal', appId: 'terminal', type: 'app', iconName: 'terminal' },
  { id: 'icon-customizer', title: 'Settings', appId: 'customizer', type: 'app', iconName: 'customizer' },
  { id: 'icon-personal', title: 'Personal', appId: 'personal', type: 'app', iconName: 'personal' },
  { id: 'icon-walkthrough', title: 'Quick Walkthrough', appId: 'walkthrough', type: 'app', iconName: 'walkthrough' }
];

export default function App() {
  // Load settings from localStorage
  const [settings, setSettings] = useState<SystemSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedSettings = JSON.parse(saved) as Partial<SystemSettings>;
        return {
          ...DEFAULT_SETTINGS,
          ...savedSettings,
          theme: savedSettings.theme === 'dark-void' ? 'graphite' : savedSettings.theme ?? DEFAULT_SETTINGS.theme
        };
      }
      const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacySaved) {
        const savedSettings = JSON.parse(legacySaved) as Partial<SystemSettings>;
        return {
          ...DEFAULT_SETTINGS,
          ...savedSettings,
          theme: savedSettings.theme === 'dark-void' ? 'graphite' : savedSettings.theme ?? DEFAULT_SETTINGS.theme,
          ambientAudio: true
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  // Windows State Dictionary
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

    const initialDict = {} as Record<AppId, WindowState>;

    (Object.keys(APP_META) as AppId[]).forEach((appId, index) => {
      const meta = APP_META[appId];
      // Responsive initial size bounded to viewport
      const width = Math.min(meta.defaultSize.width, screenWidth - 40);
      const height = Math.min(meta.defaultSize.height, screenHeight - 140);

      // Centered staggered position
      const posX = Math.max(20, Math.floor((screenWidth - width) / 2) + (index % 4) * 24 - 36);
      const posY = Math.max(50, Math.floor((screenHeight - height) / 2) + (index % 4) * 20 - 40);

      // Initial active window: ONLY About is opened by default, others are closed!
      const isDefaultOpen = appId === 'about';

      initialDict[appId] = {
        id: appId,
        title: meta.title,
        isOpen: isDefaultOpen,
        isMinimized: false,
        isMaximized: screenWidth <= 1024,
        zIndex: isDefaultOpen ? 10 : 1,
        position: { x: posX, y: posY },
        size: { width, height },
        minSize: meta.minSize
      };
    });

    return initialDict;
  });

  const [activeWindowId, setActiveWindowId] = useState<AppId | null>('about');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [highestZIndex, setHighestZIndex] = useState<number>(15);
  const [loadingExiting, setLoadingExiting] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [pendingExternalUrl, setPendingExternalUrl] = useState<string | null>(null);

  useEffect(() => {
    const maximizeForTablet = () => {
      if (window.innerWidth > 1024) return;
      setWindows((previous) => {
        const updates = Object.fromEntries(
          Object.entries(previous).map(([id, state]) => [id, state.isMaximized ? state : { ...state, isMaximized: true }])
        ) as Record<AppId, WindowState>;
        return updates;
      });
    };
    maximizeForTablet();
    window.addEventListener('resize', maximizeForTablet);
    return () => window.removeEventListener('resize', maximizeForTablet);
  }, []);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setLoadingExiting(true), 2200);
    const hideTimer = window.setTimeout(() => setShowLoading(false), 2700);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Synchronize settings with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage unavailable
    }
  }, [settings]);

  // Synchronize audio ambient state
  useEffect(() => {
    if (!settings.ambientAudio) {
      soundManager.stopAmbient();
      return;
    }

    soundManager.startAmbient();
    const startAfterInteraction = () => {
      window.removeEventListener('pointerdown', startAfterInteraction);
      window.removeEventListener('keydown', startAfterInteraction);
      soundManager.startAmbient();
    };
    window.addEventListener('pointerdown', startAfterInteraction, { once: true });
    window.addEventListener('keydown', startAfterInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', startAfterInteraction);
      window.removeEventListener('keydown', startAfterInteraction);
    };
  }, [settings.ambientAudio]);

  useEffect(() => {
    soundManager.setAmbientVolume(settings.ambientVolume / 100);
  }, [settings.ambientVolume]);

  useEffect(() => {
    soundManager.setSoundEffectsEnabled(settings.soundEffectsEnabled !== false);
  }, [settings.soundEffectsEnabled]);

  const handleUpdateSettings = (newSettings: Partial<SystemSettings>) => {
    if (typeof newSettings.ambientAudio === 'boolean') {
      soundManager.toggleAmbient(newSettings.ambientAudio);
    }
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    soundManager.playClick(500, 0.04);
  };

  // Focus a window
  const focusWindow = useCallback((appId: AppId) => {
    setHighestZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((wPrev) => ({
        ...wPrev,
        [appId]: {
          ...wPrev[appId],
          zIndex: nextZ,
          isMinimized: false
        }
      }));
      return nextZ;
    });
    setActiveWindowId(appId);
  }, []);

  // Open an app window
  const openApp = useCallback(
    (appId: AppId) => {
      soundManager.playWindowOpen();
      setWindows((prev) => {
        const current = prev[appId];
        if (!current) return prev;

        const nextZ = highestZIndex + 1;
        setHighestZIndex(nextZ);
        setActiveWindowId(appId);

        return {
          ...prev,
          [appId]: {
            ...current,
            isOpen: true,
            isMinimized: false,
            isMaximized: window.innerWidth <= 1024 || current.isMaximized,
            zIndex: nextZ
          }
        };
      });
    },
    [highestZIndex]
  );

  // Close a window
  const closeWindow = useCallback((appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false
      }
    }));
    setActiveWindowId((prevActive) => (prevActive === appId ? null : prevActive));
  }, []);

  // Minimize a window
  const minimizeWindow = useCallback((appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: true
      }
    }));
    setActiveWindowId((prevActive) => (prevActive === appId ? null : prevActive));
  }, []);

  // Maximize or restore a window
  const toggleMaximizeWindow = useCallback((appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMaximized: !prev[appId].isMaximized
      }
    }));
  }, []);

  // Update window position
  const updatePosition = useCallback((appId: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        position: pos
      }
    }));
  }, []);

  // Update window size
  const updateSize = useCallback((appId: AppId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        size
      }
    }));
  }, []);

  // Dock item click handler
  const handleDockAppClick = (appId: AppId) => {
    const win = windows[appId];
    if (!win.isOpen) {
      openApp(appId);
    } else if (win.isMinimized) {
      focusWindow(appId);
    } else if (activeWindowId === appId) {
      // Toggle minimize if already the active foreground window
      minimizeWindow(appId);
    } else {
      focusWindow(appId);
    }
  };

  // Keyboard shortcut to close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setSelectedIconId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onClick={() => {
        setSelectedIconId(null);
      }}
      data-theme={settings.theme}
      className={`desktop-shell relative w-screen h-screen overflow-hidden select-none bg-black text-slate-100 font-sans ${
        settings.theme === 'midnight-navy'
          ? 'selection:bg-sky-500/30'
          : settings.theme === 'obsidian'
          ? 'selection:bg-purple-500/30'
          : 'selection:bg-white/20'
      }`}
    >
      {/* 1. Dynamic Desktop Background & Canvas Particles */}
      <DesktopBackground
        wallpaper={settings.wallpaper}
        showGrid={settings.showGrid}
        particlesEnabled={settings.particles}
        contrast={settings.contrast}
      />

      {/* 2. Top Bar */}
      <TopBar
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onOpenApp={openApp}
        ambientAudio={settings.ambientAudio}
        onToggleAudio={() => handleUpdateSettings({ ambientAudio: !settings.ambientAudio })}
        onOpenCustomizer={() => openApp('customizer')}
      />

      {/* 3. DS OS Dropdown Menu */}
      <SpatialMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenApp={openApp}
        onExternalLink={(url) => setPendingExternalUrl(url)}
      />

      {/* 4. Desktop Grid of Icons */}
      <main className="absolute top-12 left-4 bottom-24 w-auto flex flex-col flex-wrap gap-2 pointer-events-auto z-10 p-2">
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            appId={icon.appId}
            label={icon.title}
            iconName={icon.iconName}
            isSelected={selectedIconId === icon.id}
            onSelect={(id) => setSelectedIconId(id)}
            onOpen={openApp}
          />
        ))}
      </main>

      {/* 5. Floating Windows Layer */}
      <WindowFrame
          {...windows.about}
          icon={APP_META.about.icon}
          iconColor={APP_META.about.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('about')}
          onClose={() => closeWindow('about')}
          onMinimize={() => minimizeWindow('about')}
          onMaximizeToggle={() => toggleMaximizeWindow('about')}
          onUpdatePosition={(pos) => updatePosition('about', pos)}
          onUpdateSize={(size) => updateSize('about', size)}
        >
          <AboutApp onExternalLink={(url) => setPendingExternalUrl(url)} onOpenApp={openApp} />
      </WindowFrame>

      <WindowFrame
          {...windows.projects}
          icon={APP_META.projects.icon}
          iconColor={APP_META.projects.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('projects')}
          onClose={() => closeWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          onMaximizeToggle={() => toggleMaximizeWindow('projects')}
          onUpdatePosition={(pos) => updatePosition('projects', pos)}
          onUpdateSize={(size) => updateSize('projects', size)}
        >
          <ProjectsApp onExternalLink={(url) => setPendingExternalUrl(url)} />
      </WindowFrame>

      <WindowFrame
          {...windows.experience}
          icon={APP_META.experience.icon}
          iconColor={APP_META.experience.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('experience')}
          onClose={() => closeWindow('experience')}
          onMinimize={() => minimizeWindow('experience')}
          onMaximizeToggle={() => toggleMaximizeWindow('experience')}
          onUpdatePosition={(pos) => updatePosition('experience', pos)}
          onUpdateSize={(size) => updateSize('experience', size)}
        >
          <ExperienceApp />
      </WindowFrame>

      <WindowFrame
          {...windows.files}
          icon={APP_META.files.icon}
          iconColor={APP_META.files.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('files')}
          onClose={() => closeWindow('files')}
          onMinimize={() => minimizeWindow('files')}
          onMaximizeToggle={() => toggleMaximizeWindow('files')}
          onUpdatePosition={(pos) => updatePosition('files', pos)}
          onUpdateSize={(size) => updateSize('files', size)}
        >
          <FilesApp onOpenApp={openApp} />
      </WindowFrame>

      <WindowFrame
          {...windows.resume}
          icon={APP_META.resume.icon}
          iconColor={APP_META.resume.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('resume')}
          onClose={() => closeWindow('resume')}
          onMinimize={() => minimizeWindow('resume')}
          onMaximizeToggle={() => toggleMaximizeWindow('resume')}
          onUpdatePosition={(pos) => updatePosition('resume', pos)}
          onUpdateSize={(size) => updateSize('resume', size)}
        >
          <ResumeApp />
      </WindowFrame>

      <WindowFrame
          {...windows.terminal}
          icon={APP_META.terminal.icon}
          iconColor={APP_META.terminal.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('terminal')}
          onClose={() => closeWindow('terminal')}
          onMinimize={() => minimizeWindow('terminal')}
          onMaximizeToggle={() => toggleMaximizeWindow('terminal')}
          onUpdatePosition={(pos) => updatePosition('terminal', pos)}
          onUpdateSize={(size) => updateSize('terminal', size)}
        >
          <TerminalApp
            onOpenApp={openApp}
            onExternalLink={(url) => setPendingExternalUrl(url)}
            onSetWallpaper={(wp: WallpaperId) => handleUpdateSettings({ wallpaper: wp })}
          />
      </WindowFrame>

      <WindowFrame
          {...windows.customizer}
          icon={APP_META.customizer.icon}
          iconColor={APP_META.customizer.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('customizer')}
          onClose={() => closeWindow('customizer')}
          onMinimize={() => minimizeWindow('customizer')}
          onMaximizeToggle={() => toggleMaximizeWindow('customizer')}
          onUpdatePosition={(pos) => updatePosition('customizer', pos)}
          onUpdateSize={(size) => updateSize('customizer', size)}
        >
          <CustomizerApp
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetSettings={handleResetSettings}
            onExternalLink={(url) => setPendingExternalUrl(url)}
          />
      </WindowFrame>

      <WindowFrame
          {...windows.personal}
          icon={APP_META.personal.icon}
          iconColor={APP_META.personal.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('personal')}
          onClose={() => closeWindow('personal')}
          onMinimize={() => minimizeWindow('personal')}
          onMaximizeToggle={() => toggleMaximizeWindow('personal')}
          onUpdatePosition={(pos) => updatePosition('personal', pos)}
          onUpdateSize={(size) => updateSize('personal', size)}
        >
          <PersonalApp />
      </WindowFrame>

      <WindowFrame
          {...windows.walkthrough}
          icon={APP_META.walkthrough.icon}
          iconColor={APP_META.walkthrough.color}
          glassBlur={settings.glassBlur}
          onFocus={() => focusWindow('walkthrough')}
          onClose={() => closeWindow('walkthrough')}
          onMinimize={() => minimizeWindow('walkthrough')}
          onMaximizeToggle={() => toggleMaximizeWindow('walkthrough')}
          onUpdatePosition={(pos) => updatePosition('walkthrough', pos)}
          onUpdateSize={(size) => updateSize('walkthrough', size)}
        >
          <WalkthroughApp />
      </WindowFrame>

      {/* 6. Centered Floating Dock (Files, Terminal, Settings pinned; open windows shown dynamically) */}
      <Dock
        windows={windows}
        activeWindowId={activeWindowId}
        onAppClick={handleDockAppClick}
      />
      {pendingExternalUrl && (
        <ExternalLinkModal
          url={pendingExternalUrl}
          onCancel={() => setPendingExternalUrl(null)}
          onContinue={() => {
            window.open(pendingExternalUrl, '_blank', 'noopener,noreferrer');
            setPendingExternalUrl(null);
          }}
        />
      )}
      {showLoading && <LoadingScreen exiting={loadingExiting} />}
    </div>
  );
}
