import React from 'react';
import { Sparkles, Terminal, Cpu, Globe, Github, Linkedin, Mail, ExternalLink, HardDrive, ChevronDown } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../../data/portfolioData';

export const AboutApp: React.FC = () => {
  const hasGitHub = Boolean(DEVELOPER_PROFILE.github?.trim());

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto max-w-3xl mx-auto w-full space-y-6">
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shrink-0 font-mono">
          DS
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {DEVELOPER_PROFILE.name}
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Online
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mt-0.5">
            {DEVELOPER_PROFILE.role}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {DEVELOPER_PROFILE.location} · {DEVELOPER_PROFILE.yearsExperience} Experience
          </p>
        </div>
      </div>

      {/* Philosophy */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Professional Summary</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {DEVELOPER_PROFILE.bio}
        </p>
      </div>

      {/* System Specifications */}
      <details className="group rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-sans text-xs font-semibold uppercase tracking-wider text-white">
          <span className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>DS OS Environment Specs</span>
          </span>
          <ChevronDown className="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-1.5 px-5 pb-5 text-slate-300">
          <div className="flex flex-wrap justify-between gap-x-4 py-1 border-t border-white/5">
            <span className="text-slate-400">Environment</span>
            <span className="text-white">DS OS Single-Viewport Desktop Runtime</span>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 py-1 border-b border-white/5">
            <span className="text-slate-400">Compositor</span>
            <span className="text-white">CSS Glass Matrix & 2D Canvas Physics</span>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 py-1 border-b border-white/5">
            <span className="text-slate-400">Audio Synthesizer</span>
            <span className="text-white">Web Audio Harmonic Drone & Biquad Lowpass</span>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 py-1">
            <span className="text-slate-400">Window Manager</span>
            <span className="text-white">Dynamic Z-Index Stack & Bounding Matrix</span>
          </div>
        </div>
      </details>

      {/* Connect Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
        <span className="text-slate-300">Let's build something extraordinary together.</span>
        <div className="flex items-center gap-2">
          {hasGitHub && (
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          <a
            href={DEVELOPER_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${DEVELOPER_PROFILE.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
