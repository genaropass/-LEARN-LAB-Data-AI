'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning?: boolean;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  value,
  onChange,
  onRun,
  onReset,
  isRunning = false
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    sfx.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-[#070B11] shadow-lg overflow-hidden" onKeyDown={handleKeyDown}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="font-mono text-xs font-semibold text-slate-400 pl-2">
            query_editor.sql
          </span>
          <span className="rounded bg-slate-900 px-1.5 py-0.2 font-mono text-[10px] text-slate-500 border border-slate-800">
            SQLite WASM
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 rounded-xl px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all font-bold"
            title="Copiar consulta"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline text-xs">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-1 rounded-xl px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all font-bold"
            title="Restablecer plantilla inicial"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Reiniciar</span>
          </button>

          <button
            onClick={onRun}
            disabled={isRunning}
            className="btn-mario flex items-center space-x-2 px-4 py-2 text-xs font-black disabled:opacity-50"
          >
            {isRunning ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-slate-950 text-slate-950" />
            )}
            <span>EJECUTAR CONSULTA</span>
            <kbd className="hidden sm:inline rounded bg-amber-600/30 px-1.5 py-0.5 font-mono text-[10px] text-slate-950 border border-amber-600/40">
              Ctrl+↵
            </kbd>
          </button>
        </div>
      </div>

      {/* CodeMirror Surface */}
      <div className="text-sm font-mono min-h-[160px] max-h-[320px] overflow-y-auto">
        <CodeMirror
          value={value}
          height="100%"
          minHeight="160px"
          theme="dark"
          extensions={[sql()]}
          onChange={onChange}
          className="learnlab-codemirror"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: false,
            dropCursor: true,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: false,
            completionKeymap: true,
            lintKeymap: true
          }}
        />
      </div>
    </div>
  );
};
