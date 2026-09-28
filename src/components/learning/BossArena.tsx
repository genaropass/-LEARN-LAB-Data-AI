'use client';

import React, { useState } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { LearningNode, BossScenario, BossStage } from '@/types/curriculum';
import { SQL_BOSSES } from '@/content/data-ai/sql/bosses';
import { validateUserQuery } from '@/lib/sql/validator';
import { QueryResult, ValidationResult } from '@/types/sql';
import { SqlEditor } from '../sql/SqlEditor';
import { ResultTable } from '../sql/ResultTable';
import { SchemaViewer } from '../sql/SchemaViewer';
import { sfx } from '@/lib/audio/sfx';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  Flame, 
  ArrowLeft, 
  Skull, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Trophy,
  Swords
} from 'lucide-react';

interface BossArenaProps {
  node: LearningNode;
  onClose: () => void;
}

export const BossArena: React.FC<BossArenaProps> = ({ node, onClose }) => {
  const { completeNode } = useGameState();
  const bossId = node.bossId || 'boss_01_sales';
  const boss: BossScenario = SQL_BOSSES[bossId];

  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [query, setQuery] = useState<string>('SELECT ');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isBossDefeated, setIsBossDefeated] = useState(false);
  const [revealedHint, setRevealedHint] = useState(false);

  const stage: BossStage = boss.stages[currentStageIdx];
  const hpPercent = Math.round(((boss.stages.length - currentStageIdx) / boss.stages.length) * 100);

  const handleExecuteStage = async () => {
    setIsRunning(true);
    sfx.playClick();

    try {
      const val = await validateUserQuery(
        query,
        stage.expectedQuery,
        stage.pedagogicalNote
      );

      setValidation(val);
      if (val.actualResult) {
        setResult(val.actualResult);
      }

      if (val.isValid) {
        sfx.playSuccess();
        
        // If this is the last stage, victory!
        if (currentStageIdx + 1 >= boss.stages.length) {
          setIsBossDefeated(true);
          completeNode(node.id, boss.xpReward);
          sfx.playBossDefeated();
          try {
            confetti({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.6 }
            });
          } catch {
            // ignore
          }
        } else {
          // Advance to next stage after short tactical feedback
          setTimeout(() => {
            setCurrentStageIdx(prev => prev + 1);
            setQuery('SELECT ');
            setResult(null);
            setValidation(null);
            setRevealedHint(false);
          }, 1500);
        }
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#05070B] text-slate-100 overflow-hidden">
      
      {/* Boss Header Banner */}
      <div className="flex h-16 items-center justify-between border-b border-red-900/60 bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retreat to Map</span>
          </button>

          <div className="h-5 w-px bg-red-900/50" />

          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Skull className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-red-400">
                BOSS ARENA ENCOUNTER
              </span>
              <h1 className="text-base font-extrabold text-white tracking-tight">
                {boss.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Boss HP Bar */}
        <div className="hidden sm:flex flex-col items-end w-64">
          <div className="flex items-center justify-between w-full text-xs font-mono mb-1">
            <span className="text-red-400 font-bold flex items-center space-x-1">
              <Flame className="h-3.5 w-3.5 fill-red-400" />
              <span>BOSS SHIELD INTEGRITY</span>
            </span>
            <span className="text-slate-300">{hpPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 border border-red-900/50 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-500"
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Reward */}
        <div className="flex items-center space-x-2 rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-1.5 font-mono text-xs font-bold text-amber-300">
          <Trophy className="h-4 w-4 text-amber-400" />
          <span>+{boss.xpReward} XP</span>
        </div>
      </div>

      {/* Victory Modal Overlay */}
      {isBossDefeated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-amber-500/50 bg-[#0B0F17] p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Trophy className="h-8 w-8" />
            </div>

            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
              TACTICAL OBJECTIVE COMPLETE
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-white tracking-tight">
              BOSS DEFEATED!
            </h2>
            <p className="mt-2 text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              You resolved the complex analytical investigation under high stakes and unlocked:
            </p>

            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-emerald-300 font-semibold text-sm">
              ✨ NEW REGION UNLOCKED: {boss.unlockedRegionTitle}
            </div>

            <div className="mt-3 font-mono text-sm font-bold text-amber-300">
              +{boss.xpReward} XP REWARD EARNED
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
            >
              Return to World Map
            </button>
          </div>
        </div>
      )}

      {/* Main Arena Split Layout */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Investigation Dossier & Stages */}
        <div className="w-full lg:w-[45%] flex flex-col border-r border-slate-800/80 bg-[#070B11] p-6 overflow-y-auto space-y-5">
          
          {/* Phase Progress Bar */}
          <div className="flex items-center space-x-2">
            {boss.stages.map((stg, idx) => (
              <div
                key={idx}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg font-mono text-xs font-bold border transition-all ${
                  idx < currentStageIdx
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400'
                    : idx === currentStageIdx
                    ? 'border-red-500/50 bg-red-950/30 text-red-300 animate-pulse'
                    : 'border-slate-800 bg-slate-900/40 text-slate-600'
                }`}
              >
                {idx < currentStageIdx ? '✓ Phase ' + (idx + 1) : 'Phase ' + (idx + 1)}
              </div>
            ))}
          </div>

          {/* Current Stage Objective */}
          <div className="rounded-xl border border-red-500/30 bg-red-950/15 p-5">
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-red-400">
              ACTIVE STRIKE OBJECTIVE • {stage.title}
            </span>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
              {stage.scenario}
            </p>
            <div className="mt-4 rounded-lg border border-red-500/20 bg-slate-950/80 p-3 text-xs font-mono text-slate-200">
              {stage.objective}
            </div>
          </div>

          {/* Tactical Hints */}
          <div className="space-y-2">
            {revealedHint ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200">
                <span className="font-bold font-mono text-amber-400 block mb-1">
                  Tactical Recon:
                </span>
                {stage.hints.join(' ')}
              </div>
            ) : (
              <button
                onClick={() => setRevealedHint(true)}
                className="w-full rounded-lg border border-dashed border-slate-700 bg-slate-900/40 py-2 text-xs text-slate-400 hover:text-amber-300 hover:border-amber-500/40 transition-all"
              >
                Request Tactical Hint
              </button>
            )}
          </div>

          {/* Schema quick inspection */}
          <div className="pt-2">
            <SchemaViewer />
          </div>

        </div>

        {/* Right: Code Execution Terminal */}
        <div className="w-full lg:w-[55%] flex flex-col p-4 space-y-4 overflow-y-auto bg-[#040609]">
          <SqlEditor
            value={query}
            onChange={setQuery}
            onRun={handleExecuteStage}
            onReset={() => setQuery('SELECT ')}
            isRunning={isRunning}
          />

          {validation && (
            <div
              className={`rounded-xl border p-4 ${
                validation.isValid
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : 'border-red-500/40 bg-red-950/20'
              }`}
            >
              <div className="flex items-start space-x-2.5">
                {validation.isValid ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`text-sm font-bold ${validation.isValid ? 'text-emerald-300' : 'text-red-300'}`}>
                    {validation.message}
                  </h4>
                  {validation.pedagogicalFeedback && (
                    <p className="mt-1 text-xs text-slate-300">
                      {validation.pedagogicalFeedback}
                    </p>
                  )}
                  {validation.differences?.details && (
                    <p className="mt-1.5 font-mono text-xs text-red-300 bg-red-950/40 p-2 rounded">
                      {validation.differences.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              BATTLE ARENA TELEMETRY &amp; RESULT
            </span>
            <ResultTable result={result} />
          </div>
        </div>

      </div>

    </div>
  );
};
