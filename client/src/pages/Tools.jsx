import { useState } from 'react';
import tools from '../data/seoTools';

const categories = [...new Set(tools.map((t) => t.category))];

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Free Tools & AI Resources</h1>
      <p className="text-text-muted mb-8">Curated free tools and AI assistants for SEO, design, coding, writing, research, and productivity</p>
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveCategory('All')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-neon-cyan text-background' : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'}`}>
          All
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-neon-cyan text-background' : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool, i) => (
          <a key={i} href={tool.link} target="_blank" rel="noopener noreferrer" className="bg-surface/50 rounded-xl p-6 border border-electric-violet/20 hover:border-neon-cyan/40 transition-all block group">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-text-primary font-semibold group-hover:text-neon-cyan transition-colors">{tool.name}</h3>
              <div className="flex gap-1 shrink-0 ml-2">
                <span className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded">{tool.category}</span>
                {tool.affiliate && <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded">Affiliate</span>}
              </div>
            </div>
            <p className="text-text-muted text-sm">{tool.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}