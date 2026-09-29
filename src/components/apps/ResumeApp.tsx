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

  return (
    <div className="flex-1 flex flex-col h-full bg-[#12141a] overflow-hidden select-text">
      {/* PDF / Document Toolbar */}
      <div className="h-11 px-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Deevann_Shrestha_Resume.pdf</span>
            <span className="sm:hidden">Resume.pdf</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-slate-400 font-mono">
            Page 1 / 1
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 70}
            className="p-1.5 rounded hover:bg-white/10 text-slate-300 disabled:opacity-40 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 text-[11px] font-mono text-slate-300 min-w-[42px] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
            className="p-1.5 rounded hover:bg-white/10 text-slate-300 disabled:opacity-40 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="/Deevann-Resume-Main.pdf"
            download="Deevann Resume Main.pdf"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors shadow-sm"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </>
            )}
          </a>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center bg-black/40">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="self-start h-fit min-h-full w-full max-w-3xl bg-[#0f1117] text-slate-200 rounded-lg border border-white/15 shadow-2xl p-8 sm:p-12 pb-20 sm:pb-24 mb-4 space-y-6"
        >
          {/* Header */}
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {RESUME_DATA.header.name}
            </h1>
            <p className="text-sm font-semibold text-indigo-400 mt-1">
              {RESUME_DATA.header.title}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {RESUME_DATA.header.contact}
            </p>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {RESUME_DATA.header.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
              Technical Core Competencies
            </h2>
            <div className="space-y-3 text-xs">
              {RESUME_DATA.skills.map((skill, i) => (
                <div key={i} className="space-y-1.5">
                  <h3 className="font-semibold text-slate-300">{skill.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.split(';').map((item) => item.trim()).filter(Boolean).map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-slate-200 border border-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </h2>
            <div className="space-y-5">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{exp.role}</span>
                      <span className="text-slate-400"> · </span>
                      <span className="font-semibold text-indigo-300">{exp.company}</span>
                    </div>
                    <span className="font-mono text-slate-400 text-[11px]">{exp.dates}</span>
                  </div>

                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </h2>
              <div className="text-xs">
                <div className="font-bold text-white">{RESUME_DATA.education.degree}</div>
                <div className="text-slate-300">{RESUME_DATA.education.institution} · {RESUME_DATA.education.year}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{RESUME_DATA.education.honors}</div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Certifications</span>
              </h2>
              <div className="space-y-1 text-xs text-slate-300">
                {RESUME_DATA.certifications.map((cert, cIdx) => (
                  <div key={cIdx}>• {cert}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
