import React, { useState } from 'react';
import { 
  Search, 
  Code, 
  Server, 
  Sparkles, 
  Cloud, 
  Layers, 
  Cpu, 
  CheckCircle,
  Database,
  Shield,
  Zap,
  Palette,
  Terminal,
  Container,
  LucideIcon
} from 'lucide-react';
import { TECH_STACK_DATA } from '../../data/portfolioData';

const TECH_ICON_MAP: Record<string, LucideIcon> = {
  code: Code,
  react: Layers,
  cube: Cpu,
  palette: Palette,
  server: Server,
  cpu: Cpu,
  shield: Shield,
  database: Database,
  zap: Zap,
  sparkles: Sparkles,
  search: Search,
  'check-circle': CheckCircle,
  container: Container,
  cloud: Cloud,
  terminal: Terminal
};

export const TechStackApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Frontend', 'Backend', 'AI', 'Tools & Cloud'];

  const filteredTech = TECH_STACK_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col p-5 overflow-y-auto">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tech-filter-pill ${selectedCategory === cat ? 'tech-filter-active' : ''}`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
            aria-label="Search technologies"
          />
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTech.map((item, index) => {
          const Icon = TECH_ICON_MAP[item.iconName] || Code;

          return (
            <div
              key={item.id}
              className="tech-card-enter flex min-h-[180px] flex-col rounded-2xl border border-white/10 bg-white/5 p-4 shadow-md transition-all duration-200 hover:border-white/20 hover:bg-white/8"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-amber-400">
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="break-words text-sm font-semibold text-white">
                        {item.name}
                      </h4>
                    </div>
                </div>

                <span className="tech-years-pill shrink-0">
                  {item.experienceYears === 3 ? '3+ Yrs' : `${item.experienceYears} Yrs`}
                </span>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-slate-300">
                {item.description}
              </p>

              <span className="tech-category-pill mt-auto self-start">
                {item.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
