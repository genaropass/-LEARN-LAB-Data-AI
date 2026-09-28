'use client';

import React, { useState } from 'react';
import { SCHEMA_DEFINITIONS } from '@/lib/sql/dataset';
import { TableSchema } from '@/types/sql';
import { executeQuery } from '@/lib/sql/engine';
import { Database, Table, Key, ChevronDown, ChevronRight, Eye, RefreshCw } from 'lucide-react';

interface SchemaViewerProps {
  relevantTables?: string[];
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({ relevantTables }) => {
  const [expandedTable, setExpandedTable] = useState<string | null>(
    relevantTables && relevantTables.length > 0 ? relevantTables[0] : 'customers'
  );
  const [sampleRows, setSampleRows] = useState<Record<string, unknown>[]>([]);
  const [sampleColumns, setSampleColumns] = useState<string[]>([]);
  const [isLoadingSample, setIsLoadingSample] = useState(false);

  const tablesToShow = relevantTables && relevantTables.length > 0
    ? SCHEMA_DEFINITIONS.filter(t => relevantTables.includes(t.name))
    : SCHEMA_DEFINITIONS;

  const loadSample = async (tableName: string) => {
    setIsLoadingSample(true);
    try {
      const res = await executeQuery(`SELECT * FROM ${tableName} LIMIT 4;`);
      setSampleColumns(res.columns);
      const rows = res.values.map(v => {
        const obj: Record<string, unknown> = {};
        res.columns.forEach((c, idx) => {
          obj[c] = v[idx];
        });
        return obj;
      });
      setSampleRows(rows);
    } catch {
      setSampleRows([]);
    } finally {
      setIsLoadingSample(false);
    }
  };

  const handleTableToggle = (tableName: string) => {
    if (expandedTable === tableName) {
      setExpandedTable(null);
      setSampleRows([]);
    } else {
      setExpandedTable(tableName);
      loadSample(tableName);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-[#070B11] p-3 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
          <Database className="h-4 w-4 text-cyan-400" />
          <span>ACTIVE SCHEMA SCHEMATICS</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">
          {tablesToShow.length} {tablesToShow.length === 1 ? 'Table' : 'Tables'}
        </span>
      </div>

      <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
        {tablesToShow.map((table: TableSchema) => {
          const isExpanded = expandedTable === table.name;
          return (
            <div
              key={table.name}
              className={`rounded-lg border transition-all ${
                isExpanded
                  ? 'border-cyan-500/40 bg-slate-900/80 shadow-[0_0_10px_rgba(6,182,212,0.06)]'
                  : 'border-slate-800/80 bg-slate-950/50 hover:border-slate-700'
              }`}
            >
              {/* Table Header Bar */}
              <button
                onClick={() => handleTableToggle(table.name)}
                className="flex w-full items-center justify-between px-3 py-2 text-left"
              >
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-cyan-400" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  )}
                  <Table className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-mono text-xs font-bold text-slate-200">
                    {table.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {table.columns.length} cols
                </span>
              </button>

              {/* Table Details */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 p-3 bg-slate-950/70">
                  <p className="text-[11px] text-slate-400 mb-2 italic">
                    {table.description}
                  </p>

                  <div className="grid grid-cols-1 gap-1 font-mono text-[11px]">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center justify-between rounded bg-slate-900/60 px-2 py-1 border border-slate-800/60"
                      >
                        <div className="flex items-center space-x-1.5">
                          {col.isPrimary && (
                            <span title="Primary Key">
                              <Key className="h-3 w-3 text-amber-400" />
                            </span>
                          )}
                          {col.isForeign && (
                            <span className="text-[9px] font-bold text-cyan-400" title={`Foreign Key -> ${col.foreignTable}`}>
                              FK
                            </span>
                          )}
                          <span className={col.isPrimary ? 'font-bold text-amber-300' : 'text-slate-300'}>
                            {col.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sample rows drawer */}
                  <div className="mt-3 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-slate-500" />
                        <span>Sample Preview</span>
                      </span>
                      <button
                        onClick={() => loadSample(table.name)}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <RefreshCw className={`h-2.5 w-2.5 ${isLoadingSample ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                    </div>

                    {sampleRows.length > 0 ? (
                      <div className="overflow-x-auto rounded border border-slate-800 bg-[#070B11]">
                        <table className="w-full text-left font-mono text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/90">
                              {sampleColumns.map(c => (
                                <th key={c} className="py-1 px-1.5 whitespace-nowrap">
                                  {c}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {sampleRows.map((r, i) => (
                              <tr key={i} className="hover:bg-slate-800/40">
                                {sampleColumns.map(c => (
                                  <td key={c} className="py-1 px-1.5 text-slate-300 whitespace-nowrap">
                                    {String(r[c] ?? 'NULL')}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500 italic">No sample preview loaded.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
