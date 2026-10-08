import React, { useState } from 'react';
import { MapPin, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';

export const ExperienceApp: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('');

  return (
    <div className="flex-1 flex flex-col p-5 overflow-y-auto">
      {/* Career Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/15">
        {EXPERIENCE_DATA.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="experience-card-enter relative group" style={{ animationDelay: `${index * 60}ms` }}>
              {/* Timeline Node dot */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className={`absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  isExpanded
                    ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : 'border-slate-500 bg-black hover:border-emerald-400'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isExpanded ? 'bg-emerald-400' : 'bg-slate-400'
                  }`}
                />
              </div>

              {/* Experience Card */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isExpanded
                    ? 'bg-white/10 border-white/20 shadow-xl ring-1 ring-emerald-500/30'
                    : 'bg-white/5 hover:bg-white/8 border-white/10'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.role}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {item.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {item.period}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Short Overview */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                        Key Accomplishments & Systems Built
                      </h4>
                      <div className="space-y-2">
                        {item.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-slate-200 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
