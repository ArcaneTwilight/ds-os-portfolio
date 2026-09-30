import React from 'react';
import { 
  Palette, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Grid, 
  Eye, 
  RotateCcw,
  Check,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { SystemSettings, WallpaperId, ThemeId, BlurLevel } from '../../types/os';
import { soundManager } from '../../utils/audio';

interface CustomizerAppProps {
  settings: SystemSettings;
  onUpdateSettings: (newSettings: Partial<SystemSettings>) => void;
  onResetSettings: () => void;
  onExternalLink: (url: string) => void;
}

export const CustomizerApp: React.FC<CustomizerAppProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings,
  onExternalLink
}) => {
  const [showMusicAttribution, setShowMusicAttribution] = useState(false);

  const wallpapers: { id: WallpaperId; name: string; gradient: string }[] = [
    {
      id: 'aurora',
      name: 'Aurora',
      gradient: 'from-emerald-950 via-teal-900 to-slate-950'
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      gradient: 'from-purple-950 via-fuchsia-950 to-zinc-950'
    },
    {
      id: 'deep-space',
      name: 'Deep Space',
      gradient: 'from-indigo-950 via-sky-950 to-black'
    },
    {
      id: 'slate',
      name: 'Slate',
      gradient: 'from-slate-900 via-zinc-900 to-black'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      gradient: 'from-amber-950 via-rose-950 to-indigo-950'
    }
  ];

  const themes: { id: ThemeId; name: string; desc: string }[] = [
    { id: 'graphite', name: 'Graphite', desc: 'Subtle warm titanium neutrality' },
    { id: 'dark-void', name: 'Dark Void', desc: 'Absolute pure black deep contrast' },
    { id: 'midnight-navy', name: 'Midnight Navy', desc: 'Deep sapphire atmospheric tint' },
    { id: 'obsidian', name: 'Obsidian', desc: 'Monolithic charcoal glass balance' }
  ];

  const blurLevels: { id: BlurLevel; label: string; desc: string }[] = [
    { id: 'low', label: 'Low', desc: 'Light blur (optimal for low-spec devices)' },
    { id: 'medium', label: 'Medium', desc: 'Balanced frosted glass diffusion' },
    { id: 'ultra', label: 'Ultra', desc: 'Deep multi-layer spatial dispersion' }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto max-w-4xl mx-auto w-full space-y-8 select-none">
      {/* Wallpapers Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Spatial Wallpapers</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {wallpapers.map((wp) => {
            const isSelected = settings.wallpaper === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => {
                  soundManager.playClick(600, 0.02);
                  onUpdateSettings({ wallpaper: wp.id });
                }}
                className={`relative flex flex-col p-2 rounded-2xl border transition-all duration-200 text-left group ${
                  isSelected
                    ? 'border-purple-400/80 bg-white/10 ring-2 ring-purple-400/30 shadow-lg'
                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
                }`}
              >
                {/* Wallpaper Preview Swatch */}
                <div
                  className={`w-full h-16 rounded-xl bg-gradient-to-br ${wp.gradient} border border-white/10 mb-2 relative overflow-hidden flex items-center justify-center`}
                >
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {wp.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isSelected ? 'Active' : 'Select'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Surface Theme */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-white">Interface Tone Theme</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map((theme) => {
            const isSelected = settings.theme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  soundManager.playClick(650, 0.02);
                  onUpdateSettings({ theme: theme.id });
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-sky-400/70 bg-sky-500/10 ring-1 ring-sky-400/30'
                    : 'border-white/10 bg-white/5 hover:bg-white/8'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white">{theme.name}</div>
                  <div className="text-[11px] text-slate-400">{theme.desc}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Glass Blur & Contrast */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Glass Blur Level */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold text-white">Glass Backdrop Blur</h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {blurLevels.map((lvl) => {
              const isSelected = settings.glassBlur === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    soundManager.playClick(700, 0.02);
                    onUpdateSettings({ glassBlur: lvl.id });
                  }}
                  className={`py-2 px-2 rounded-xl text-center border text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contrast Adjuster */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-white">Atmospheric Contrast</h4>
            <span className="text-xs font-mono text-slate-300">{settings.contrast}%</span>
          </div>
          <input
            type="range"
            min="80"
            max="120"
            value={settings.contrast}
            onChange={(e) => onUpdateSettings({ contrast: Number(e.target.value) })}
            className="w-full accent-sky-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>80% Soft</span>
            <span>100% Native</span>
            <span>120% Punchy</span>
          </div>
        </div>
      </div>

      {/* Toggles: Particles, Audio, Grid */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <h4 className="text-xs font-semibold text-white mb-2">Desktop Physics & Ambiance</h4>

        <div className="divide-y divide-white/5">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
              {settings.soundEffectsEnabled !== false ? (
                <Volume2 className="w-4 h-4 text-amber-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <div>
                <div className="text-xs font-medium text-white">Sound Effects</div>
                <div className="text-[11px] text-slate-400">Interface clicks and window chimes</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateSettings({ soundEffectsEnabled: settings.soundEffectsEnabled === false })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.soundEffectsEnabled !== false ? 'bg-amber-600' : 'bg-white/20'
              }`}
              role="switch"
              aria-checked={settings.soundEffectsEnabled !== false}
              aria-label="Sound effects"
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.soundEffectsEnabled !== false ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Dynamic Particles */}
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-xs font-medium text-white">Ambient Star Particles</div>
                <div className="text-[11px] text-slate-400">Interactive canvas particle drift</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ particles: !settings.particles })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.particles ? 'bg-purple-600' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.particles ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Ambient Music */}
          <div className="flex flex-col gap-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {settings.ambientAudio ? (
                  <Volume2 className="w-4 h-4 text-sky-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
                <div>
                  <div className="text-xs font-medium text-white">Ambient Music</div>
                  <div className="text-[11px] text-slate-400">Honey Jam by massobeats</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowMusicAttribution((visible) => !visible)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Music attribution"
                  aria-label="Show music attribution"
                  aria-expanded={showMusicAttribution}
                >
                  <Info className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ ambientAudio: !settings.ambientAudio })}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    settings.ambientAudio ? 'bg-sky-600' : 'bg-white/20'
                  }`}
                  role="switch"
                  aria-checked={settings.ambientAudio}
                  aria-label="Ambient music"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.ambientAudio ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-6">
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.ambientVolume}
                onChange={(event) => onUpdateSettings({ ambientVolume: Number(event.target.value) })}
                className="flex-1 accent-sky-400 cursor-pointer"
                aria-label="Ambient music volume"
              />
              <span className="w-9 text-right text-[11px] font-mono text-slate-400">
                {settings.ambientVolume}%
              </span>
            </div>
            {showMusicAttribution && (
              <div className="ml-6 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-[11px] leading-5 text-slate-300">
                <div>Music track: honey jam by massobeats</div>
                <div>Source: <button type="button" onClick={() => onExternalLink('https://freetouse.com/music')} className="text-sky-300 hover:underline">https://freetouse.com/music</button></div>
                <div>Vlog Music for Video (Free Download)</div>
              </div>
            )}
          </div>

          {/* Viewport Grid Lines */}
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
              <Grid className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-medium text-white">Spatial Grid Matrix</div>
                <div className="text-[11px] text-slate-400">Faint architectural coordinate grid</div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ showGrid: !settings.showGrid })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.showGrid ? 'bg-emerald-600' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showGrid ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reset Action */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-slate-400">
          Preferences automatically saved to browser storage.
        </span>
        <button
          onClick={onResetSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Factory Defaults</span>
        </button>
      </div>
    </div>
  );
};
