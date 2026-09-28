'use client';

import React from 'react';
import { Database, Lock, CheckCircle2, X, Terminal, Cpu, BarChart3, LineChart, Code2 } from 'lucide-react';

interface RealmSelectorProps {
  onClose: () => void;
}

interface WorldModule {
  id: string;
  name: string;
  category: string;
  description: string;
  isAvailable: boolean;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const WORLD_MODULES: WorldModule[] = [
  {
    id: 'sql',
    name: 'SQL World',
    category: 'Data & AI',
    description: 'Relational algebra, projection, multi-table joins, CTEs, and window functions.',
    isAvailable: true,
    icon: Database,
    tags: ['Active Track', 'Browser SQLite Engine', 'Boss Arenas']
  },
  {
    id: 'databases',
    name: 'Database Architecture',
    category: 'Data & AI',
    description: 'B-Trees, indexing strategies, ACID guarantees, transaction isolation, and query execution plans.',
    isAvailable: false,
    icon: Terminal,
    tags: ['Coming Soon', 'LSM Trees', 'PostgreSQL Internals']
  },
  {
    id: 'power_bi',
    name: 'BI & Analytical Modeling',
    category: 'Data & AI',
    description: 'DAX modeling, star schemas, dimensional cubes, and executive KPI design.',
    isAvailable: false,
    icon: BarChart3,
    tags: ['Coming Soon', 'DAX Logic', 'Executive BI']
  },
  {
    id: 'python_data',
    name: 'Python for Data Engineering',
    category: 'Data & AI',
    description: 'Vectorized computing with Polars, Arrow memory layouts, and ETL pipelines.',
    isAvailable: false,
    icon: Code2,
    tags: ['Coming Soon', 'Polars', 'Arrow']
  },
  {
    id: 'statistics',
    name: 'Probability & Statistics',
    category: 'Data & AI',
    description: 'Hypothesis testing, Bayesian inference, A/B experiment design, and distributions.',
    isAvailable: false,
    icon: LineChart,
    tags: ['Coming Soon', 'A/B Testing', 'Inference']
  },
  {
    id: 'machine_learning',
    name: 'Machine Learning Lab',
    category: 'Data & AI',
    description: 'Supervised learning, gradient descent algorithms, loss landscapes, and model evaluation.',
    isAvailable: false,
    icon: Cpu,
    tags: ['Coming Soon', 'Algorithms', 'Evaluation']
  }
];

export const RealmSelector: React.FC<RealmSelectorProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0B0F17] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                Learn-Lab Ecosystem
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Data &amp; AI Realm</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-white tracking-tight">
              Select Learning World
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modules Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1">
          {WORLD_MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all ${
                  module.isAvailable
                    ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-900/60 shadow-[0_0_15px_rgba(245,158,11,0.08)] cursor-pointer'
                    : 'border-slate-800/80 bg-slate-950/40 opacity-70'
                }`}
                onClick={() => {
                  if (module.isAvailable) onClose();
                }}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      module.isAvailable
                        ? 'border-amber-500/30 bg-amber-500/15 text-amber-400'
                        : 'border-slate-800 bg-slate-900 text-slate-500'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {module.isAvailable ? (
                      <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>ACTIVE WORLD</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 rounded-full border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                        <Lock className="h-3 w-3" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-semibold text-white text-sm">
                    {module.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/40">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-900/80 px-1.5 py-0.5 font-mono text-[9px] text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
          <span>Current active curriculum: SQL Foundations to Capstone</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-amber-500/10 px-3 py-1.5 font-semibold text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
          >
            Enter SQL World
          </button>
        </div>

      </div>
    </div>
  );
};
