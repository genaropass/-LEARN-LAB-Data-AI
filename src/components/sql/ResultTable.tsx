'use client';

import React, { useState } from 'react';
import { QueryResult } from '@/types/sql';
import { ChevronLeft, ChevronRight, Table as TableIcon, Clock } from 'lucide-react';

interface ResultTableProps {
  result: QueryResult | null;
  emptyMessage?: string;
}

export const ResultTable: React.FC<ResultTableProps> = ({
  result,
  emptyMessage = 'Execute a query to inspect live results.'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  if (!result) {
    return (
      <div className="flex h-44 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-6 text-center">
        <TableIcon className="h-8 w-8 text-slate-600 mb-2" />
        <p className="text-xs text-slate-400 font-mono">{emptyMessage}</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
        <div className="flex items-center space-x-2 text-red-400 font-semibold text-xs mb-1">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>Execution Error (SQLite WASM)</span>
        </div>
        <pre className="font-mono text-xs text-red-300 whitespace-pre-wrap overflow-x-auto p-2 bg-red-950/40 rounded border border-red-900/40">
          {result.error}
        </pre>
      </div>
    );
  }

  const totalPages = Math.ceil(result.rowCount / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = result.values.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-[#070B11] shadow-md overflow-hidden">
      {/* Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 text-slate-300">
            <span className="font-bold text-amber-400">{result.rowCount}</span>
            <span>{result.rowCount === 1 ? 'row' : 'rows'}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">
            <span className="font-bold text-cyan-400">{result.columns.length}</span> columns
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <Clock className="h-3 w-3 text-slate-500" />
          <span>{result.executionTimeMs} ms</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="overflow-x-auto max-h-[260px]">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300 sticky top-0 z-10">
              <th className="py-2 px-3 text-[10px] uppercase font-semibold text-slate-500 w-10 text-center">
                #
              </th>
              {result.columns.map((col, idx) => (
                <th key={idx} className="py-2 px-3 text-slate-300 font-bold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={result.columns.length + 1} className="py-8 text-center text-slate-500">
                  Query returned 0 rows.
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-3 text-[10px] text-slate-500 text-center select-none">
                    {startIndex + rIdx + 1}
                  </td>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-1.5 px-3 text-slate-300 whitespace-nowrap">
                      {cell === null ? (
                        <span className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-amber-500 font-bold">
                          NULL
                        </span>
                      ) : typeof cell === 'number' ? (
                        <span className="text-emerald-400">{cell}</span>
                      ) : (
                        <span>{String(cell)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-400 font-mono">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded p-1 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded p-1 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
