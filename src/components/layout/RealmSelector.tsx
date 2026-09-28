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
    name: 'Reino SQL Interactivo',
    category: 'Data & IA',
    description: 'Álgebra relacional, proyecciones, multi-JOINs, CTEs y funciones ventana analíticas.',
    isAvailable: true,
    icon: Database,
    tags: ['100 Niveles', 'Motor SQLite WASM', 'Castillos de Jefes', 'Monedas y Poderes']
  },
  {
    id: 'databases',
    name: 'Arquitectura de Bases de Datos',
    category: 'Data & IA',
    description: 'Árboles B-Tree, estrategias de índices, transacciones ACID y planes de ejecución.',
    isAvailable: false,
    icon: Terminal,
    tags: ['Próximamente', 'LSM Trees', 'PostgreSQL Internals']
  },
  {
    id: 'power_bi',
    name: 'BI y Modelado Analítico',
    category: 'Data & IA',
    description: 'Modelado DAX, esquemas estrella, cubos dimensionales y métricas ejecutivas.',
    isAvailable: false,
    icon: BarChart3,
    tags: ['Próximamente', 'Lógica DAX', 'KPIs']
  },
  {
    id: 'python_data',
    name: 'Python para Ingeniería de Datos',
    category: 'Data & IA',
    description: 'Cómputo vectorizado con Polars, memoria Arrow y pipelines ETL robustos.',
    isAvailable: false,
    icon: Code2,
    tags: ['Próximamente', 'Polars', 'Pipelines ETL']
  },
  {
    id: 'statistics',
    name: 'Probabilidad y Estadística',
    category: 'Data & IA',
    description: 'Pruebas de hipótesis, inferencia bayesiana y diseño de experimentos A/B.',
    isAvailable: false,
    icon: LineChart,
    tags: ['Próximamente', 'A/B Testing', 'Inferencia']
  },
  {
    id: 'machine_learning',
    name: 'Laboratorio de Machine Learning',
    category: 'Data & IA',
    description: 'Modelos predictivos, descenso de gradiente, regularización y métricas de evaluación.',
    isAvailable: false,
    icon: Cpu,
    tags: ['Próximamente', 'Algoritmos', 'Evaluación']
  }
];

export const RealmSelector: React.FC<RealmSelectorProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border-4 border-amber-400 bg-slate-900 p-6 sm:p-7 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-700/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                Ecosistema Learn-Lab
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-bold">Mundos de Aprendizaje</span>
            </div>
            <h2 className="mt-1 text-2xl font-black text-white tracking-tight">
              🗺️ Seleccionar Mundo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-black"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modules Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1">
          {WORLD_MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className={`relative flex flex-col justify-between rounded-2xl border-2 p-4 transition-all ${
                  module.isAvailable
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-lg hover:scale-[1.02] cursor-pointer'
                    : 'border-slate-800 bg-slate-950/50 opacity-60'
                }`}
                onClick={() => {
                  if (module.isAvailable) onClose();
                }}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 ${
                      module.isAvailable
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-sm'
                        : 'border-slate-700 bg-slate-800 text-slate-500'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {module.isAvailable ? (
                      <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-400 bg-emerald-500/30 px-2.5 py-0.5 text-xs font-black text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>DISPONIBLE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-slate-400">
                        <Lock className="h-3 w-3" />
                        <span>BLOQUEADO</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-black text-white text-base">
                    {module.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-medium">
                    {module.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-slate-800/90 px-2 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700"
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
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-slate-700/80 pt-4 text-xs text-slate-400">
          <span className="font-medium">Plan activo: 100 Niveles de SQL interactivo con SQLite real en el navegador</span>
          <button
            onClick={onClose}
            className="btn-mario text-xs px-4 py-2 font-black uppercase tracking-wide"
          >
            Entrar al Reino SQL
          </button>
        </div>

      </div>
    </div>
  );
};
