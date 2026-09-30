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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Systems', 'AI', 'Cloud', 'Interface'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
              <span>Released {activeProject.year}</span>
            </div>

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
                <span>Executive Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Key Engineering Capabilities</span>
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

            {activeProject.architectureNotes && (
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Architecture & Performance Considerations</span>
                </h2>
                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                  {activeProject.architectureNotes}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Stack & Metadata */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-sm font-semibold text-white mb-3">Technologies Deployed</h2>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-slate-200 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>System Status</span>
                <span className="text-emerald-400 font-medium">Production Verified</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Domain Category</span>
                <span className="text-slate-200">{activeProject.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Release Cycle</span>
                <span className="text-slate-200">{activeProject.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="window-content-enter flex-1 flex flex-col p-5 overflow-y-auto">
      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-white/10 mb-5">
        {/* Category Pills (Functional buttons) */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tech-filter-pill ${selectedCategory === cat ? 'tech-filter-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
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
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-sky-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="project-card-enter group flex flex-col justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl relative overflow-hidden"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              {/* Subtle accent glow top border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-60 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: project.accentColor }}
              />

              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <span className="font-semibold text-sky-400 uppercase tracking-wider text-[10px]">
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px]">{project.year}</span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {project.tagline}
                </p>
              </div>

              <div>
                {/* Tech chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/5 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-medium text-sky-400 group-hover:text-sky-300">
                  <span>Inspect Details</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
