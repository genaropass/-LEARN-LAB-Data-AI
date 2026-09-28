'use client';

import React, { useState, useEffect } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { GameLevel } from '@/content/data-ai/sql/levels';
import { validateUserQuery } from '@/lib/sql/validator';
import { QueryResult, ValidationResult } from '@/types/sql';
import { SqlEditor } from '../sql/SqlEditor';
import { ResultTable } from '../sql/ResultTable';
import { SchemaViewer } from '../sql/SchemaViewer';
import { PowerUpShopModal } from '../gamification/PowerUpShopModal';
import { sfx } from '@/lib/audio/sfx';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Lightbulb, 
  FileCode, 
  Key, 
  ShoppingBag, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  Coins, 
  Award, 
  ChevronRight, 
  HelpCircle,
  Database,
  Code2
} from 'lucide-react';

interface LevelGameLabProps {
  level: GameLevel;
  onClose: () => void;
  onNextLevel?: () => void;
}

export const LevelGameLab: React.FC<LevelGameLabProps> = ({
  level,
  onClose,
  onNextLevel
}) => {
  const { 
    profile, 
    completeGameLevel, 
    stars, 
    inventory, 
    usePowerUp 
  } = useGameState();

  const [query, setQuery] = useState<string>(level.initialQuery || 'SELECT ');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [earnedStars, setEarnedStars] = useState<number>(0);
  const [hasPassed, setHasPassed] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'schema'>('prompt');

  useEffect(() => {
    setQuery(level.initialQuery || 'SELECT ');
    setResult(null);
    setValidation(null);
    setRevealedHints(0);
    setShowSolution(false);
    setHasPassed(false);
    setEarnedStars(stars[level.levelNumber] || 0);
  }, [level, stars]);

  const handleRun = async () => {
    setIsRunning(true);
    sfx.playClick();

    try {
      const val = await validateUserQuery(
        query,
        level.expectedQuery,
        level.pedagogicalNote
      );

      setValidation(val);
      if (val.actualResult) {
        setResult(val.actualResult);
      }

      if (val.isValid) {
        sfx.playSuccess();
        setHasPassed(true);

        // Compute Stars earned (3 stars: 0 hints; 2 stars: 1 hint; 1 star: solution/many hints)
        let starsAwarded = 3;
        if (showSolution) starsAwarded = 1;
        else if (revealedHints > 1) starsAwarded = 1;
        else if (revealedHints === 1) starsAwarded = 2;

        setEarnedStars(starsAwarded);
        completeGameLevel(level.levelNumber, starsAwarded, level.xpReward, level.coinReward);

        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
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

  // Use Scroll of Wisdom
  const handleUseScroll = () => {
    if ((inventory.hint_scroll || 0) <= 0) {
      setIsShopOpen(true);
      return;
    }
    const used = usePowerUp('hint_scroll');
    if (used) {
      setRevealedHints(h => Math.min(level.hints.length, h + 1));
      sfx.playSuccess();
    }
  };

  // Use Syntax Blueprint
  const handleUseBlueprint = () => {
    if ((inventory.sql_blueprint || 0) <= 0) {
      setIsShopOpen(true);
      return;
    }
    const used = usePowerUp('sql_blueprint');
    if (used) {
      // Extract target tables and create blueprint
      const blueprint = `-- Syntax Blueprint Injected:\nSELECT \nFROM ${level.targetTables[0] || 'customers'}\nWHERE ;\n`;
      setQuery(blueprint);
      sfx.playSuccess();
    }
  };

  // Use Master Key
  const handleUseMasterKey = () => {
    if ((inventory.master_key || 0) <= 0) {
      setIsShopOpen(true);
      return;
    }
    const used = usePowerUp('master_key');
    if (used) {
      setShowSolution(true);
      setQuery(level.expectedQuery);
      sfx.playBossDefeated();
    }
  };

  const difficultyColor =
    level.difficulty === 'Master Boss'
      ? 'border-red-500 bg-red-950/40 text-red-400'
      : level.difficulty === 'Expert'
      ? 'border-purple-500 bg-purple-950/40 text-purple-300'
      : level.difficulty === 'Hard'
      ? 'border-amber-500 bg-amber-950/40 text-amber-300'
      : 'border-emerald-500 bg-emerald-950/40 text-emerald-300';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070A11] text-slate-100 overflow-hidden">
      
      {/* Mario Level Top HUD */}
      <div className="flex h-16 items-center justify-between border-b-2 border-slate-800 bg-[#0B0F19] px-4 sm:px-6">
        
        {/* Left: Back & Level Designation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-amber-400 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">World Map</span>
          </button>

          <div className="h-5 w-px bg-slate-800" />

          <div className="flex items-center space-x-2.5">
            <div className="flex h-10 items-center justify-center rounded-xl border-2 border-amber-400 bg-amber-500/20 px-3 font-mono text-sm font-black text-amber-300 shadow-sm">
              LEVEL {String(level.levelNumber).padStart(2, '0')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  {level.worldName}
                </span>
                <span className={`rounded-full border px-2 py-0.2 font-mono text-[9px] font-bold ${difficultyColor}`}>
                  {level.difficulty}
                </span>
              </div>
              <h1 className="text-sm font-black text-white tracking-tight leading-none mt-0.5">
                {level.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Center: Stars Rating */}
        <div className="hidden md:flex items-center space-x-1">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`h-5 w-5 transition-all ${
                starIdx <= (earnedStars || stars[level.levelNumber] || 0)
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                  : 'text-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Right: Coins Balance & Shop Button */}
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => setIsShopOpen(true)}
            className="cursor-pointer flex items-center space-x-1.5 rounded-xl border-2 border-yellow-400/40 bg-yellow-500/10 px-3 py-1 text-xs font-black text-yellow-300 hover:border-yellow-400 transition-all shadow-sm"
          >
            <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span className="font-mono">{profile.coins}</span>
            <span className="text-[10px] text-yellow-500 hidden sm:inline">COINS</span>
          </div>

          <button
            onClick={() => setIsShopOpen(true)}
            className="flex items-center space-x-1.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-black text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">POWER-UP SHOP</span>
          </button>
        </div>

      </div>

      {/* Main Workspace (Left: Mission & Power-Ups, Right: Code Editor & Execution) */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Mission & Tactical Helps */}
        <div className="w-full lg:w-[45%] flex flex-col border-r-2 border-slate-800 bg-[#090D17] p-5 overflow-y-auto space-y-4">
          
          {/* Mission Objective Box */}
          <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-amber-400">
                LEVEL OBJECTIVE
              </span>
              <span className="font-mono text-xs font-bold text-amber-300">
                +{level.xpReward} XP • +{level.coinReward} 🪙
              </span>
            </div>
            <p className="text-sm font-bold text-white leading-relaxed font-sans">
              {level.prompt}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400">Tables:</span>
              {level.targetTables.map(t => (
                <span
                  key={t}
                  onClick={() => setActiveTab('schema')}
                  className="cursor-pointer flex items-center space-x-1 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-2 py-0.5 font-mono text-xs font-bold text-cyan-300 hover:border-cyan-400"
                >
                  <Database className="h-3 w-3 text-cyan-400" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>

          {/* In-Game Power-Up Quick Usage Bar (Canjeable con monedas) */}
          <div className="rounded-2xl border-2 border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>IN-GAME POWER-UPS (CANJEABLES)</span>
              </span>
              <button
                onClick={() => setIsShopOpen(true)}
                className="text-[10px] text-amber-400 hover:underline font-bold"
              >
                + Get More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* 1. Scroll of Wisdom */}
              <button
                onClick={handleUseScroll}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 hover:border-amber-400 hover:bg-slate-800 transition-all text-center group"
              >
                <Lightbulb className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[10px] text-slate-200 mt-1">Hint Scroll</span>
                <span className="font-mono text-[9px] text-amber-300 font-extrabold">
                  Qty: {inventory.hint_scroll || 0}
                </span>
              </button>

              {/* 2. Syntax Blueprint */}
              <button
                onClick={handleUseBlueprint}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 hover:border-cyan-400 hover:bg-slate-800 transition-all text-center group"
              >
                <FileCode className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[10px] text-slate-200 mt-1">Blueprint</span>
                <span className="font-mono text-[9px] text-cyan-300 font-extrabold">
                  Qty: {inventory.sql_blueprint || 0}
                </span>
              </button>

              {/* 3. Master Key */}
              <button
                onClick={handleUseMasterKey}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 hover:border-yellow-400 hover:bg-slate-800 transition-all text-center group"
              >
                <Key className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[10px] text-slate-200 mt-1">Master Key</span>
                <span className="font-mono text-[9px] text-yellow-300 font-extrabold">
                  Qty: {inventory.master_key || 0}
                </span>
              </button>
            </div>
          </div>

          {/* Progressive Hints & Revealed Content */}
          <div className="space-y-2">
            {level.hints.slice(0, revealedHints).map((hint, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200 leading-relaxed font-sans"
              >
                <span className="font-bold font-mono text-amber-400 mr-1.5">
                  Hint {idx + 1}:
                </span>
                {hint}
              </div>
            ))}

            {showSolution && (
              <div className="rounded-xl border-2 border-yellow-400/50 bg-slate-950 p-4">
                <span className="font-mono text-[10px] font-black text-yellow-400 uppercase tracking-widest block mb-1">
                  Master Key Solution Revealed
                </span>
                <pre className="font-mono text-xs text-yellow-200 whitespace-pre-wrap">
                  {level.expectedQuery}
                </pre>
              </div>
            )}
          </div>

          {/* Schema Explorer */}
          <div className="pt-2">
            <SchemaViewer relevantTables={level.targetTables} />
          </div>

        </div>

        {/* Right: Code Editor & Execution Results */}
        <div className="w-full lg:w-[55%] flex flex-col p-4 space-y-4 overflow-y-auto bg-[#05070D]">
          <SqlEditor
            value={query}
            onChange={setQuery}
            onRun={handleRun}
            onReset={() => setQuery(level.initialQuery || 'SELECT ')}
            isRunning={isRunning}
          />

          {/* Victory / Feedback Banner */}
          {validation && (
            <div
              className={`rounded-2xl border-2 p-5 transition-all ${
                validation.isValid
                  ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                  : 'border-red-500/50 bg-red-950/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                {validation.isValid ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-base font-black ${validation.isValid ? 'text-emerald-300' : 'text-red-300'}`}>
                      {validation.isValid ? 'LEVEL CLEARED!' : 'Not Quite Right'}
                    </h3>
                    {validation.isValid && (
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3].map(st => (
                          <Star
                            key={st}
                            className={`h-5 w-5 ${
                              st <= earnedStars
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-sans">
                    {validation.pedagogicalFeedback || validation.message}
                  </p>

                  {validation.differences?.details && (
                    <p className="mt-2 font-mono text-xs text-red-300 bg-slate-950 p-2 rounded-lg border border-red-900/40">
                      {validation.differences.details}
                    </p>
                  )}

                  {validation.isValid && (
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-emerald-500/20">
                      <div className="flex items-center space-x-3 font-mono text-xs font-bold">
                        <span className="text-emerald-400">+{level.xpReward} XP</span>
                        <span className="text-yellow-400">+{level.coinReward} 🪙 Coins</span>
                      </div>

                      {onNextLevel && (
                        <button
                          onClick={onNextLevel}
                          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2 font-black text-slate-950 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-md text-xs"
                        >
                          <span>NEXT LEVEL</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Live Result Table */}
          <div className="flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              SQLITE WASM LIVE RESULT TABLE
            </span>
            <ResultTable result={result} />
          </div>

        </div>

      </div>

      {/* Shop Modal */}
      {isShopOpen && (
        <PowerUpShopModal onClose={() => setIsShopOpen(false)} />
      )}

    </div>
  );
};
