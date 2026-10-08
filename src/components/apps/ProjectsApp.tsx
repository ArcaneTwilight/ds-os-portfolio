import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Activity, 
  Sparkles 
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectItem } from '../../types/os';

export const ProjectsApp: React.FC<{ onExternalLink: (url: string) => void }> = ({ onExternalLink }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // If viewing project detail inspector
  if (activeProject) {
    return (
      <div className="window-content-enter flex-1 flex flex-col p-6 overflow-y-auto bg-gradient-to-b from-white/5 to-transparent">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveProject(null)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Overview</span>
          </button>

          <div className="flex items-center gap-3">
            {activeProject.githubUrl && (
              <button
                type="button"
                onClick={() => onExternalLink(activeProject.githubUrl!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </button>
            )}
            {activeProject.liveUrl && (
              <button
                type="button"
                onClick={() => onExternalLink(activeProject.liveUrl!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400/30 hover:bg-sky-500/30 text-xs text-sky-200 font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Demo</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Header Banner */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden mb-6">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: activeProject.accentColor }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span className="font-semibold text-sky-400 uppercase tracking-wider">{activeProject.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeProject.year}</span>
            </div>

            {activeProject.screenshotUrl && (
              <img
                src={activeProject.screenshotUrl}
                alt={`${activeProject.title} application dashboard`}
                className="w-full rounded-xl border border-white/10 mb-6"
              />
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              {activeProject.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {activeProject.tagline}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        {activeProject.stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {activeProject.stats.map((stat, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <span className="text-xl font-bold text-white font-mono mt-1">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Two-Column Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Description & Features */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Project Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>
              {activeProject.audience && (
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">Audience: </span>
                  {activeProject.audience}
                </p>
              )}
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Core Capabilities</span>
              </h2>
              <div className="space-y-2.5">
                {activeProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeProject.extendedCapabilities && (
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-sm font-semibold text-white mb-3">Extended Functionality</h2>
                <div className="space-y-2.5">
                  {activeProject.extendedCapabilities.map((capability) => (
                    <div key={capability} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeProject.architectureNotes && (
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Architecture & Integrations</span>
                </h2>
                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                  {activeProject.architectureNotes}
                </p>
              </div>
            )}
            {activeProject.designNotes && (
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-sm font-semibold text-white mb-2">Design</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{activeProject.designNotes}</p>
              </div>
            )}
          </div>

          {/* Right Column: Stack & Metadata */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-sm font-semibold text-white mb-3">Technology Stack</h2>
              <div className="space-y-3">
                {(activeProject.techStack ?? [{ area: 'Technologies', technologies: activeProject.technologies }]).map((group) => (
                  <div key={group.area}>
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{group.area}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-white/10 text-[11px] text-slate-200 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Demo</span>
                <span className="text-emerald-400 font-medium">{activeProject.projectStatus ?? 'Details available'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Category</span>
                <span className="text-slate-200">{activeProject.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Project Year</span>
                <span className="text-slate-200">{activeProject.year}</span>
              </div>
            </div>

            {activeProject.demoAccess && (
              <div className="p-5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs">
                <h2 className="text-sm font-semibold text-white mb-1">Demo Access</h2>
                <p className="text-slate-400 mb-3">Use these credentials to explore the app.</p>
                <dl className="space-y-2 select-text">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-slate-400">Username</dt>
                    <dd className="font-mono text-slate-100">{activeProject.demoAccess.username}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-slate-400">Password</dt>
                    <dd className="font-mono text-slate-100">{activeProject.demoAccess.password}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="window-content-enter flex-1 flex flex-col p-5 overflow-y-auto">
      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-white/10 mb-5">
        <p className="text-xs text-slate-400">Apps I’m creating and have created</p>
        <div className="relative min-w-[220px] sm:max-w-xs sm:w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-slate-400">
          <p className="text-sm">No projects found matching your query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-sky-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card-enter group flex flex-col lg:flex-row rounded-2xl bg-white/5 border border-white/10 shadow-lg relative overflow-hidden"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              {/* Project accent */}
              <div
                className="absolute top-0 left-0 right-0 lg:bottom-0 lg:right-auto lg:w-1 h-1 lg:h-auto opacity-70"
                style={{ backgroundColor: project.accentColor }}
              />

              {project.screenshotUrl && (
                <img
                  src={project.screenshotUrl}
                  alt={`${project.title} application dashboard`}
                  className="w-full lg:w-[55%] h-52 lg:h-auto lg:min-h-[280px] object-cover object-top border-b lg:border-b-0 lg:border-r border-white/10"
                />
              )}

              <div className="flex flex-1 flex-col justify-center p-5 sm:p-7">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                  <span className="font-semibold text-sky-400 uppercase tracking-wider">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">{project.tagline}</p>

                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Main Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(project.mainTechnologies ?? project.technologies.slice(0, 6)).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] text-slate-200 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/20 border border-sky-400/30 hover:bg-sky-500/30 text-xs text-sky-200 font-medium transition-colors"
                >
                  More details
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
