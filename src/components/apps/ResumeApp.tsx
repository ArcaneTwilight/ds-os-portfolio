import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Check
} from 'lucide-react';
import { RESUME_DATA } from '../../data/portfolioData';

export const ResumeApp: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 70));
  const handleResetZoom = () => setZoomLevel(100);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const renderExperience = (experiences: typeof RESUME_DATA.experience) => (
    <div className="space-y-2.5">
      {experiences.map((exp) => (
        <section key={`${exp.company}-${exp.role}`} className="break-inside-avoid">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            <div>
              <span className="font-bold text-slate-900">{exp.role}</span>
              <span className="text-slate-500"> · </span>
              <span className="font-semibold text-indigo-800">{exp.company}</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">{exp.dates}</span>
          </div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-[1.3] text-slate-700">
            {exp.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#12141a] select-text">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-white/5 px-4 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <FileText className="h-4 w-4 text-indigo-400" />
            <span className="hidden sm:inline">Deevann_Shrestha_Resume_2026.pdf</span>
            <span className="sm:hidden">Resume.pdf</span>
          </div>
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-400">
            A4 · 2 pages
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 70}
            className="rounded p-1.5 text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-40"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[42px] px-2 text-center font-mono text-[11px] text-slate-300">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
            className="rounded p-1.5 text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-40"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="rounded p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Reset Zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>

        <a
          href="/Deevann-Resume-Main.pdf"
          download="Deevann Shrestha Resume 2026.pdf"
          onClick={handleDownload}
          className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-600"
        >
          {downloadSuccess ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Downloaded</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              <span>Download CV</span>
            </>
          )}
        </a>
      </div>

      <div className="flex-1 overflow-auto bg-black/40 p-4 sm:p-8">
        <div
          className="mx-auto flex w-full max-w-[210mm] flex-col items-center gap-6"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
        >
          <article
            className="w-full overflow-hidden border border-slate-300 bg-white p-6 text-[12px] leading-[1.35] text-slate-700 shadow-2xl sm:p-7"
            style={{ aspectRatio: '210 / 297' }}
          >
            <header className="border-b border-slate-200 pb-3">
              <h1 className="text-[22px] font-bold tracking-tight text-slate-950">
                {RESUME_DATA.header.name}
              </h1>
              <p className="mt-0.5 text-[12px] font-semibold leading-snug text-indigo-800">
                {RESUME_DATA.header.title}
              </p>
              <p className="mt-1 font-mono text-[11px] text-slate-600">
                {RESUME_DATA.header.location} · {RESUME_DATA.header.email} · {RESUME_DATA.header.phone}
              </p>
              <p className="font-mono text-[11px] text-slate-600">
                {RESUME_DATA.header.linkedin} · {RESUME_DATA.header.website}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed">{RESUME_DATA.header.summary}</p>
            </header>

            <section className="mt-3">
              <h2 className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-indigo-800">
                <Briefcase className="h-3 w-3" />
                Professional Experience
              </h2>
              {renderExperience(RESUME_DATA.experience.slice(0, 2))}
            </section>
          </article>

          <article
            className="w-full overflow-hidden border border-slate-300 bg-white p-6 text-[12px] leading-[1.35] text-slate-700 shadow-2xl sm:p-7"
            style={{ aspectRatio: '210 / 297' }}
          >
            <section>
              <h2 className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-indigo-800">
                <Briefcase className="h-3 w-3" />
                Professional Experience (Continued)
              </h2>
              {renderExperience(RESUME_DATA.experience.slice(2))}
            </section>

            <section className="mt-4 border-t border-slate-200 pt-3">
              <h2 className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-indigo-800">
                Skills
              </h2>
              <div className="space-y-1">
                {RESUME_DATA.skills.map((skill) => (
                  <p key={skill.label} className="text-[11px] leading-[1.3]">
                    <span className="font-bold text-slate-800">{skill.label}: </span>
                    <span>{skill.items.split(';').map((item) => item.trim()).join(' · ')}</span>
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-4 border-t border-slate-200 pt-3">
              <h2 className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-indigo-800">
                <GraduationCap className="h-3 w-3" />
                Education and Licensure
              </h2>
              <p className="font-bold text-slate-900">{RESUME_DATA.education.degree}</p>
              <p>{RESUME_DATA.education.institution} · {RESUME_DATA.education.year}</p>
              <p className="mt-1 flex items-center gap-1 text-slate-600">
                <Award className="h-3 w-3 shrink-0" />
                {RESUME_DATA.licensure}
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};
