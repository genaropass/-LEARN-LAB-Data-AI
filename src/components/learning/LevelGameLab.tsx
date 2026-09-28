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
  ChevronRight, 
  Database,
  Play
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

        let starsAwarded = 3;
        if (showSolution) starsAwarded = 1;
        else if (revealedHints > 1) starsAwarded = 1;
        else if (revealedHints === 1) starsAwarded = 2;

        setEarnedStars(starsAwarded);
        completeGameLevel(level.levelNumber, starsAwarded, level.xpReward, level.coinReward);

        try {
          confetti({
            particleCount: 110,
            spread: 80,
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

  const handleUseBlueprint = () => {
    if ((inventory.sql_blueprint || 0) <= 0) {
      setIsShopOpen(true);
      return;
    }
    const used = usePowerUp('sql_blueprint');
    if (used) {
      const blueprint = `-- Plantilla de Sintaxis Inyectada:\nSELECT \nFROM ${level.targetTables[0] || 'customers'}\nWHERE ;\n`;
      setQuery(blueprint);
      sfx.playSuccess();
    }
  };

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

  const difficultyEs =
    level.difficulty === 'Master Boss'
      ? 'Gran Jefe'
      : level.difficulty === 'Expert'
      ? 'Experto'
      : level.difficulty === 'Hard'
      ? 'Difícil'
      : 'Fácil';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0b172a] text-slate-100 overflow-hidden font-sans">
      
      {/* HUD Superior del Nivel */}
      <div className="flex h-18 items-center justify-between border-b-4 border-amber-500/40 bg-[#0e1d38] px-4 sm:px-6 shadow-xl">
        
        {/* Botón Volver y Número de Nivel */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 rounded-2xl border-2 border-slate-600 bg-slate-800 px-3.5 py-2 text-xs font-black text-slate-200 hover:border-amber-400 hover:text-white transition-all shadow-[0_2px_0_#334155] active:translate-y-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Mapa</span>
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="flex h-11 items-center justify-center rounded-2xl border-2 border-yellow-300 bg-amber-400 px-3.5 font-mono text-sm font-black text-slate-950 shadow-[0_3px_0_#b45309]">
              NIVEL {String(level.levelNumber).padStart(2, '0')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xs text-amber-400">
                  {level.worldName}
                </span>
                <span className="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.2 text-[10px] font-black text-amber-300">
                  {difficultyEs}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-white tracking-tight leading-none mt-0.5">
                {level.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Estrellas */}
        <div className="hidden md:flex items-center space-x-1 rounded-2xl border-2 border-amber-400/30 bg-amber-400/10 px-3 py-1">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`h-5 w-5 transition-all ${
                starIdx <= (earnedStars || stars[level.levelNumber] || 0)
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]'
                  : 'text-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Monedas y Tienda */}
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => setIsShopOpen(true)}
            className="cursor-pointer flex items-center space-x-1.5 rounded-2xl border-2 border-yellow-400/60 bg-yellow-400/20 px-3.5 py-1.5 text-xs font-black text-yellow-300 hover:scale-105 transition-transform shadow-[0_2px_0_#ca8a04]"
          >
            <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span className="font-mono text-sm">{profile.coins}</span>
            <span className="text-[10px] text-yellow-200 hidden sm:inline">MONEDAS</span>
          </div>

          <button
            onClick={() => setIsShopOpen(true)}
            className="flex items-center space-x-1.5 rounded-2xl border-2 border-emerald-400 bg-emerald-500 px-3.5 py-1.5 text-xs font-black text-white hover:bg-emerald-400 shadow-[0_3px_0_#15803d] active:translate-y-1 active:shadow-none transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">TIENDA</span>
          </button>
        </div>

      </div>

      {/* Área de Juego Principal (Izquierda: Misión y Ayudas, Derecha: Editor y Resultados) */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Panel Izquierdo: Misión y Poderes Canjeables */}
        <div className="w-full lg:w-[45%] flex flex-col border-r-4 border-slate-800 bg-[#0c182c] p-5 overflow-y-auto space-y-4">
          
          {/* Tarjeta de Objetivo */}
          <div className="rounded-3xl border-3 border-amber-400/40 bg-gradient-to-br from-amber-400/10 via-slate-900 to-slate-900 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
                OBJETIVO DEL NIVEL
              </span>
              <span className="font-mono text-xs font-black text-yellow-300">
                +{level.xpReward} XP • +{level.coinReward} 🪙 Monedas
              </span>
            </div>
            
            <p className="text-sm font-bold text-white leading-relaxed mt-2">
              {level.prompt}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-700/80">
              <span className="text-xs font-bold text-amber-300">Tablas Disponibles:</span>
              {level.targetTables.map(t => (
                <span
                  key={t}
                  className="flex items-center space-x-1 rounded-xl border border-sky-400/50 bg-sky-950/60 px-2.5 py-1 font-mono text-xs font-bold text-sky-200"
                >
                  <Database className="h-3 w-3 text-sky-400" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Barra de Poderes Canjeables (Item Shop Integrada) */}
          <div className="rounded-3xl border-3 border-slate-700/80 bg-slate-900/90 p-4 shadow-md">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-black uppercase tracking-wide text-amber-400 flex items-center space-x-1.5">
                <ShoppingBag className="h-4 w-4" />
                <span>AYUDAS &amp; PODERES CANJEABLES</span>
              </span>
              <button
                onClick={() => setIsShopOpen(true)}
                className="text-xs text-yellow-300 hover:underline font-bold"
              >
                + Comprar más
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Pergamino de Pista */}
              <button
                onClick={handleUseScroll}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-amber-500/50 bg-amber-500/10 p-3 hover:bg-amber-500/20 transition-all text-center shadow-sm group active:scale-95"
              >
                <Lightbulb className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-black text-xs text-white mt-1">Pista</span>
                <span className="rounded-full bg-amber-400/20 px-2 py-0.2 font-mono text-[10px] text-amber-300 font-black mt-0.5">
                  Tienes: {inventory.hint_scroll || 0}
                </span>
              </button>

              {/* Plantilla de Código */}
              <button
                onClick={handleUseBlueprint}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-sky-500/50 bg-sky-500/10 p-3 hover:bg-sky-500/20 transition-all text-center shadow-sm group active:scale-95"
              >
                <FileCode className="h-6 w-6 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="font-black text-xs text-white mt-1">Plantilla</span>
                <span className="rounded-full bg-sky-400/20 px-2 py-0.2 font-mono text-[10px] text-sky-300 font-black mt-0.5">
                  Tienes: {inventory.sql_blueprint || 0}
                </span>
              </button>

              {/* Llave Maestra */}
              <button
                onClick={handleUseMasterKey}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/10 p-3 hover:bg-yellow-500/20 transition-all text-center shadow-sm group active:scale-95"
              >
                <Key className="h-6 w-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="font-black text-xs text-white mt-1">Llave Solución</span>
                <span className="rounded-full bg-yellow-400/20 px-2 py-0.2 font-mono text-[10px] text-yellow-300 font-black mt-0.5">
                  Tienes: {inventory.master_key || 0}
                </span>
              </button>
            </div>
          </div>

          {/* Pistas Desbloqueadas */}
          <div className="space-y-2">
            {level.hints.slice(0, revealedHints).map((hint, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-amber-400/40 bg-amber-950/40 p-3.5 text-xs sm:text-sm text-amber-200 leading-relaxed font-sans shadow-sm"
              >
                <span className="font-black text-amber-400 mr-1.5">
                  Pista {idx + 1}:
                </span>
                {hint}
              </div>
            ))}

            {showSolution && (
              <div className="rounded-2xl border-3 border-yellow-400 bg-slate-950 p-4 shadow-lg">
                <span className="rounded-full bg-yellow-400 px-2.5 py-0.5 text-[10px] font-black text-slate-950 uppercase block w-fit mb-2">
                  CONSULTA DE REFERENCIA DESBLOQUEADA
                </span>
                <pre className="font-mono text-xs text-yellow-300 whitespace-pre-wrap">
                  {level.expectedQuery}
                </pre>
              </div>
            )}
          </div>

          {/* Explorador de Esquema */}
          <div className="pt-2">
            <SchemaViewer relevantTables={level.targetTables} />
          </div>

        </div>

        {/* Panel Derecho: Editor y Resultados */}
        <div className="w-full lg:w-[55%] flex flex-col p-4 sm:p-5 space-y-4 overflow-y-auto bg-[#081224]">
          <SqlEditor
            value={query}
            onChange={setQuery}
            onRun={handleRun}
            onReset={() => setQuery(level.initialQuery || 'SELECT ')}
            isRunning={isRunning}
          />

          {/* Banner de Feedback y Victoria */}
          {validation && (
            <div
              className={`rounded-3xl border-3 p-5 transition-all shadow-xl ${
                validation.isValid
                  ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_35px_rgba(16,185,129,0.3)]'
                  : 'border-red-400 bg-red-950/50'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                {validation.isValid ? (
                  <CheckCircle2 className="h-7 w-7 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-7 w-7 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-black ${validation.isValid ? 'text-emerald-300' : 'text-red-300'}`}>
                      {validation.isValid ? '¡NIVEL SUPERADO! 🎉' : 'Aún no coincide'}
                    </h3>
                    {validation.isValid && (
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3].map(st => (
                          <Star
                            key={st}
                            className={`h-5 w-5 ${
                              st <= earnedStars
                                ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                    {validation.pedagogicalFeedback || validation.message}
                  </p>

                  {validation.differences?.details && (
                    <p className="mt-2 font-mono text-xs text-red-200 bg-slate-950/80 p-2.5 rounded-xl border border-red-900/50">
                      {validation.differences.details}
                    </p>
                  )}

                  {validation.isValid && (
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-emerald-500/30">
                      <div className="flex items-center space-x-3 text-xs font-black">
                        <span className="text-emerald-300">+{level.xpReward} XP</span>
                        <span className="text-yellow-300">+{level.coinReward} 🪙 Monedas</span>
                      </div>

                      {onNextLevel && (
                        <button
                          onClick={onNextLevel}
                          className="flex items-center space-x-2 rounded-2xl border-2 border-emerald-300 bg-emerald-500 px-5 py-2.5 font-black text-slate-950 hover:bg-emerald-400 transition-all shadow-[0_4px_0_#15803d] active:translate-y-1 active:shadow-none text-xs sm:text-sm"
                        >
                          <span>SIGUIENTE NIVEL</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tabla de Resultados en Vivo */}
          <div className="flex-1 flex flex-col">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
              RESULTADO EN VIVO (SQLITE WASM)
            </span>
            <ResultTable result={result} />
          </div>

        </div>

      </div>

      {/* Modal de Tienda */}
      {isShopOpen && (
        <PowerUpShopModal onClose={() => setIsShopOpen(false)} />
      )}

    </div>
  );
};
