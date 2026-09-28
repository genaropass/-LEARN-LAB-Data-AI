'use client';

import React, { useState } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { LearningNode, ProjectTask } from '@/types/curriculum';
import { SQL_CAPSTONE_PROJECT } from '@/content/data-ai/sql/project';
import { validateUserQuery } from '@/lib/sql/validator';
import { QueryResult, ValidationResult } from '@/types/sql';
import { SqlEditor } from '../sql/SqlEditor';
import { ResultTable } from '../sql/ResultTable';
import { SchemaViewer } from '../sql/SchemaViewer';
import { sfx } from '@/lib/audio/sfx';
import confetti from 'canvas-confetti';
import { 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Trophy, 
  FileText, 
  Building2, 
  ChevronRight,
  Database
} from 'lucide-react';

interface ProjectWorkspaceProps {
  node: LearningNode;
  onClose: () => void;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ node, onClose }) => {
  const { completeNode } = useGameState();
  const project = SQL_CAPSTONE_PROJECT;

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState<string>('SELECT ');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isProjectFinished, setIsProjectFinished] = useState(false);

  const currentTask: ProjectTask = project.tasks[currentTaskIndex];

  const handleExecuteTask = async () => {
    setIsRunning(true);
    sfx.playClick();

    try {
      const val = await validateUserQuery(
        query,
        currentTask.expectedQuery,
        currentTask.explanation
      );

      setValidation(val);
      if (val.actualResult) {
        setResult(val.actualResult);
      }

      if (val.isValid) {
        sfx.playSuccess();
        const nextCompleted = new Set(completedTaskIds);
        nextCompleted.add(currentTask.id);
        setCompletedTaskIds(nextCompleted);

        // Check if all tasks done
        if (nextCompleted.size >= project.tasks.length) {
          setIsProjectFinished(true);
          completeNode(node.id, project.xpReward);
          sfx.playBossDefeated();
          try {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 }
            });
          } catch {
            // ignore
          }
        } else {
          // Advance to next task after 1.2s
          setTimeout(() => {
            if (currentTaskIndex + 1 < project.tasks.length) {
              setCurrentTaskIndex(prev => prev + 1);
              setQuery('SELECT ');
              setResult(null);
              setValidation(null);
            }
          }, 1200);
        }
      } else {
        sfx.playError();
      }
    } catch (e) {
      console.error(e);
      sfx.playError();
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#05080E] text-slate-100 overflow-hidden">
      
      {/* Project Top Bar */}
      <div className="flex h-16 items-center justify-between border-b border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-950 to-slate-950 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>World Map</span>
          </button>

          <div className="h-5 w-px bg-slate-800" />

          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  FINAL CAPSTONE PROJECT
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{project.company}</span>
              </div>
              <h1 className="text-base font-extrabold text-white tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Capstone Progress */}
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-slate-400">
            Tasks: <span className="text-amber-400 font-bold">{completedTaskIds.size}</span> / {project.tasks.length}
          </span>
          <div className="flex items-center space-x-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-300">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>+{project.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isProjectFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-amber-500/60 bg-[#0B0F17] p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.25)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-400 mb-4 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              <Award className="h-10 w-10" />
            </div>

            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
              CAPSTONE ASSIGNMENT COMPLETE
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-white tracking-tight">
              SQL WORLD CONQUERED!
            </h2>
            <p className="mt-2 text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              You successfully engineered all 5 analytical deliverables for {project.company}. You have validated production SQL fluency across projection, filtering, relational joins, subqueries, and multi-tier aggregations.
            </p>

            <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-950/20 p-4">
              <span className="text-xs text-slate-400 block mb-1">NEW CHARACTER TITLE GRANTED:</span>
              <span className="font-extrabold font-mono text-base text-amber-300">
                ⭐ {project.rewardTitle} ⭐
              </span>
            </div>

            <div className="mt-3 font-mono text-sm font-bold text-emerald-400">
              +{project.xpReward} XP ADDED TO PROFILE
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
            >
              Inspect Character Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Tasks Overview & Active Requirement */}
        <div className="w-full lg:w-[45%] flex flex-col border-r border-slate-800/80 bg-[#080C14] p-5 overflow-y-auto space-y-4">
          
          {/* Mission Description Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-1">
              <Building2 className="h-4 w-4" />
              <span>CONSULTING MISSION</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.mission}
            </p>
          </div>

          {/* Task Selectors */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Consulting Deliverables:
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {project.tasks.map((tsk, i) => (
                <button
                  key={tsk.id}
                  onClick={() => {
                    setCurrentTaskIndex(i);
                    setQuery('SELECT ');
                    setResult(null);
                    setValidation(null);
                  }}
                  className={`flex items-center justify-between rounded-lg border p-2.5 text-left text-xs transition-all ${
                    currentTaskIndex === i
                      ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-sm'
                      : completedTaskIds.has(tsk.id)
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {completedTaskIds.has(tsk.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 font-mono">
                        {i + 1}
                      </span>
                    )}
                    <span className="font-semibold">{tsk.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">
                    +{tsk.xp} XP
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Deliverable Requirement */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
              DELIVERABLE #{currentTask.taskNumber}: {currentTask.title}
            </span>
            <p className="mt-2 text-xs text-slate-200 leading-relaxed font-sans">
              {currentTask.question}
            </p>
            <div className="mt-3 rounded border border-slate-800 bg-slate-950/80 p-2.5 text-[11px] text-slate-400">
              <span className="font-bold text-cyan-400 mr-1">Objective:</span>
              {currentTask.businessObjective}
            </div>
          </div>

          {/* Schematics Explorer */}
          <SchemaViewer />

        </div>

        {/* Right: Code Terminal */}
        <div className="w-full lg:w-[55%] flex flex-col p-4 space-y-4 overflow-y-auto bg-[#04060A]">
          <SqlEditor
            value={query}
            onChange={setQuery}
            onRun={handleExecuteTask}
            onReset={() => setQuery('SELECT ')}
            isRunning={isRunning}
          />

          {validation && (
            <div
              className={`rounded-xl border p-4 ${
                validation.isValid
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : 'border-amber-500/40 bg-amber-950/20'
              }`}
            >
              <div className="flex items-start space-x-2.5">
                {validation.isValid ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`text-sm font-bold ${validation.isValid ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {validation.message}
                  </h4>
                  {validation.pedagogicalFeedback && (
                    <p className="mt-1 text-xs text-slate-300">
                      {validation.pedagogicalFeedback}
                    </p>
                  )}
                  {validation.differences?.details && (
                    <p className="mt-1 font-mono text-xs text-amber-300">
                      {validation.differences.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              DELIVERABLE EXECUTION AUDIT
            </span>
            <ResultTable result={result} />
          </div>
        </div>

      </div>

    </div>
  );
};
