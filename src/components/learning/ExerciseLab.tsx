'use client';

import React, { useState, useEffect } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { LearningNode, Exercise } from '@/types/curriculum';
import { SQL_EXERCISES } from '@/content/data-ai/sql/exercises';
import { validateUserQuery } from '@/lib/sql/validator';
import { ValidationResult, QueryResult } from '@/types/sql';
import { SqlEditor } from '../sql/SqlEditor';
import { ResultTable } from '../sql/ResultTable';
import { SchemaViewer } from '../sql/SchemaViewer';
import { sfx } from '@/lib/audio/sfx';
import { 
  ArrowLeft, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Code, 
  BookOpen, 
  Database,
  Award,
  ChevronRight
} from 'lucide-react';

interface ExerciseLabProps {
  node: LearningNode;
  onClose: () => void;
}

export const ExerciseLab: React.FC<ExerciseLabProps> = ({ node, onClose }) => {
  const { completeNode, recordExerciseAttempt, completedNodes } = useGameState();

  // Find exercise for this node
  const exerciseId = node.exerciseIds && node.exerciseIds.length > 0 ? node.exerciseIds[0] : null;
  const exercise: Exercise | undefined = exerciseId ? SQL_EXERCISES[exerciseId] : undefined;

  const [query, setQuery] = useState<string>(
    exercise?.initialQuery || 'SELECT * FROM customers;'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'lesson' | 'schema'>('prompt');
  const [hasPassed, setHasPassed] = useState(completedNodes.has(node.id));

  useEffect(() => {
    if (exercise?.initialQuery) {
      setQuery(exercise.initialQuery);
    }
    setResult(null);
    setValidation(null);
    setRevealedHints(0);
    setShowSolution(false);
    setHasPassed(completedNodes.has(node.id));
  }, [node.id, exercise?.initialQuery, completedNodes]);

  if (!exercise) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <div className="rounded-xl border border-slate-800 bg-[#0B0F17] p-6 text-center text-slate-300">
          <p>Exercise content not found for this node.</p>
          <button onClick={onClose} className="mt-4 rounded bg-slate-800 px-4 py-2 text-xs">
            Return to Map
          </button>
        </div>
      </div>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    sfx.playClick();

    try {
      const valResult = await validateUserQuery(
        query,
        exercise.expectedQuery,
        exercise.pedagogicalFeedback
      );

      setValidation(valResult);
      if (valResult.actualResult) {
        setResult(valResult.actualResult);
      }

      recordExerciseAttempt({
        exerciseId: exercise.id,
        passed: valResult.isValid,
        submittedQuery: query,
        executionTimeMs: valResult.actualResult?.executionTimeMs || 0,
        hintsUsed: revealedHints,
        timestamp: new Date().toISOString()
      });

      if (valResult.isValid) {
        setHasPassed(true);
        completeNode(node.id, node.xpReward);
        sfx.playSuccess();
      } else {
        sfx.playError();
      }
    } catch (err) {
      console.error(err);
      sfx.playError();
    } finally {
      setIsRunning(false);
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHints < exercise.hints.length) {
      setRevealedHints(h => h + 1);
      sfx.playClick();
    } else {
      setShowSolution(true);
      sfx.playClick();
    }
  };

  const handleResetQuery = () => {
    setQuery(exercise.initialQuery || '');
    setResult(null);
    setValidation(null);
    sfx.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070B11] text-slate-100 overflow-hidden">
      
      {/* Top Action Bar */}
      <div className="flex h-14 items-center justify-between border-b border-slate-800 bg-[#090D14] px-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>World Map</span>
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                {node.type.toUpperCase()}
              </span>
              <span className="text-slate-600">•</span>
              <h1 className="text-sm font-bold text-white tracking-tight">
                {node.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {hasPassed && (
            <div className="flex items-center space-x-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>COMPLETED</span>
            </div>
          )}

          <div className="flex items-center space-x-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-300">
            <Award className="h-3.5 w-3.5" />
            <span>+{node.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid (Left: Instructions & Hints, Right: Editor & Results) */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: Mission Context & Hints */}
        <div className="w-full lg:w-[45%] flex flex-col border-r border-slate-800/80 bg-[#090D14]/70 overflow-y-auto">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex-1 flex items-center justify-center space-x-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                activeTab === 'prompt'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Mission Prompt</span>
            </button>

            {node.lessonContent && (
              <button
                onClick={() => setActiveTab('lesson')}
                className={`flex-1 flex items-center justify-center space-x-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  activeTab === 'lesson'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Concept Guide</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('schema')}
              className={`flex-1 flex items-center justify-center space-x-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                activeTab === 'schema'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              <span>Tables &amp; Schema</span>
            </button>
          </div>

          <div className="p-5 space-y-5">
            {activeTab === 'prompt' && (
              <>
                {/* Business Context */}
                {exercise.businessContext && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400/90">
                      OPERATIONAL BUSINESS CONTEXT
                    </span>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                      {exercise.businessContext}
                    </p>
                  </div>
                )}

                {/* Main Challenge Objective */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    ANALYTICAL REQUIREMENT
                  </h2>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4 text-slate-100 text-sm leading-relaxed font-sans font-medium">
                    {exercise.prompt}
                  </div>
                </div>

                {/* Target Schema Pills */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Target Tables Available:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exercise.targetTables.map(t => (
                      <span
                        key={t}
                        onClick={() => setActiveTab('schema')}
                        className="cursor-pointer flex items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300 hover:border-cyan-400 transition-all"
                      >
                        <Database className="h-3 w-3 text-cyan-400" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progressive Hint System */}
                <div className="border-t border-slate-800/80 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                      <span>Progressive Hints</span>
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {revealedHints} of {exercise.hints.length} unlocked
                    </span>
                  </div>

                  <div className="space-y-2">
                    {exercise.hints.slice(0, revealedHints).map((hint, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-xs text-amber-200/90 leading-relaxed font-sans"
                      >
                        <span className="font-bold font-mono text-amber-400 mr-1.5">
                          Hint {idx + 1}:
                        </span>
                        {hint}
                      </div>
                    ))}

                    {showSolution && (
                      <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-3">
                        <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                          Benchmark Solution SQL
                        </span>
                        <pre className="font-mono text-xs text-cyan-200 whitespace-pre-wrap">
                          {exercise.expectedQuery}
                        </pre>
                      </div>
                    )}

                    {!showSolution && (
                      <button
                        onClick={handleRevealNextHint}
                        className="w-full mt-2 rounded-lg border border-dashed border-slate-700 bg-slate-900/40 py-2 text-xs font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-all flex items-center justify-center space-x-1.5"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span>
                          {revealedHints < exercise.hints.length
                            ? `Unlock Hint ${revealedHints + 1}`
                            : 'Show Benchmark Solution'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Concept Guide Tab */}
            {activeTab === 'lesson' && node.lessonContent && (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                  <h3 className="text-sm font-bold text-white mb-2">Core Theory</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {node.lessonContent.summary}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#070B11] p-4">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Standard Syntax Blueprint
                  </span>
                  <pre className="mt-2 font-mono text-xs text-slate-200 p-2 bg-slate-950 rounded border border-slate-800/80">
                    {node.lessonContent.syntax}
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Architectural Takeaways
                  </h4>
                  <ul className="space-y-1.5">
                    {node.lessonContent.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Schema Tab */}
            {activeTab === 'schema' && (
              <SchemaViewer relevantTables={exercise.targetTables} />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SQL Editor & Real Result Execution */}
        <div className="w-full lg:w-[55%] flex flex-col p-4 space-y-4 overflow-y-auto bg-[#070B11]">
          
          {/* SQL Editor */}
          <SqlEditor
            value={query}
            onChange={setQuery}
            onRun={handleRun}
            onReset={handleResetQuery}
            isRunning={isRunning}
          />

          {/* Validation Feedback Banner */}
          {validation && (
            <div
              className={`rounded-xl border p-4 transition-all ${
                validation.isValid
                  ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                  : 'border-amber-500/40 bg-amber-950/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                {validation.isValid ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${validation.isValid ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {validation.message}
                  </h4>

                  {validation.pedagogicalFeedback && (
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-sans">
                      {validation.pedagogicalFeedback}
                    </p>
                  )}

                  {validation.differences?.details && (
                    <div className="mt-2 rounded bg-slate-950/60 p-2 text-xs font-mono text-amber-200/90 border border-amber-900/40">
                      {validation.differences.details}
                    </div>
                  )}

                  {validation.isValid && (
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-500/20">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        +{node.xpReward} XP Added to Profile
                      </span>
                      <button
                        onClick={onClose}
                        className="flex items-center space-x-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm"
                      >
                        <span>Continue Path</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Live Result Table */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                LIVE QUERY EXECUTION RESULTS
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Real SQLite WASM Runtime
              </span>
            </div>
            <ResultTable result={result} />
          </div>

        </div>

      </div>

    </div>
  );
};
