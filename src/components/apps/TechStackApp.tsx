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
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white/20 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
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
          />
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTech.map((item) => {
          const Icon = TECH_ICON_MAP[item.iconName] || Code;

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200 flex flex-col justify-between shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.name}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {item.experienceYears}y exp
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
