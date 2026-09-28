'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useGameState } from '@/context/GameStateContext';
import { ALL_100_LEVELS, GAME_WORLDS, GameLevel } from '@/content/data-ai/sql/levels';
import { LevelGameLab } from '../learning/LevelGameLab';
import { PowerUpShopModal } from '../gamification/PowerUpShopModal';
import { 
  Star, 
  Lock, 
  Check, 
  Coins, 
  ShoppingBag, 
  Trophy, 
  Castle, 
  Sparkles,
  Play,
  ArrowRight
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

const WORLD_NAMES_ES: Record<number, { name: string; subtitle: string }> = {
  1: { name: 'Reino Pradera', subtitle: 'Las Llanuras de SELECT y Filtros (Niveles 1–20)' },
  2: { name: 'Cañón de Dunas', subtitle: 'El Desierto de Agrupaciones y Métricas (Niveles 21–40)' },
  3: { name: 'Islas de Cristal', subtitle: 'El Océano de Relaciones y JOINs (Niveles 41–60)' },
  4: { name: 'Cavernas Lógicas', subtitle: 'Las Minas de CASE y Subconsultas (Niveles 61–80)' },
  5: { name: 'Volcán de Bowser', subtitle: 'La Ciudadela de CTEs y Funciones Ventana (Niveles 81–100)' }
};

export const WorldMap: React.FC = () => {
  const { 
    profile, 
    completedLevels, 
    unlockedLevelMax, 
    stars, 
    selectedWorldNumber, 
    setSelectedWorldNumber 
  } = useGameState();

  const [activeLevel, setActiveLevel] = useState<GameLevel | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const currentWorld = useMemo(() => {
    return GAME_WORLDS.find(w => w.number === selectedWorldNumber) || GAME_WORLDS[0];
  }, [selectedWorldNumber]);

  const worldInfoEs = WORLD_NAMES_ES[selectedWorldNumber] || WORLD_NAMES_ES[1];

  const worldLevels = useMemo(() => {
    return ALL_100_LEVELS.filter(l => l.worldNumber === selectedWorldNumber);
  }, [selectedWorldNumber]);

  // Total de estrellas conseguidas
  const totalStarsEarned = useMemo(() => {
    return Object.values(stars).reduce((acc, curr) => acc + curr, 0);
  }, [stars]);

  const handleLevelClick = (level: GameLevel) => {
    if (level.levelNumber > unlockedLevelMax) {
      sfx.playError();
      return;
    }
    sfx.playClick();
    setActiveLevel(level);
  };

  const handleNextLevel = () => {
    if (!activeLevel) return;
    const nextNum = activeLevel.levelNumber + 1;
    const nextLvl = ALL_100_LEVELS.find(l => l.levelNumber === nextNum);
    if (nextLvl) {
      if (nextLvl.worldNumber !== selectedWorldNumber) {
        setSelectedWorldNumber(nextLvl.worldNumber);
      }
      setActiveLevel(nextLvl);
    } else {
      setActiveLevel(null);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full bg-[#0a192f] text-slate-100 overflow-x-hidden pb-32">
      
      {/* Fondo de Cielo con Nubes Animadas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1d4ed8]/30 via-[#0f284e]/20 to-[#0a192f] opacity-80" />

      {/* Selector de Mundos Estilo Mario Bros */}
      <div className="sticky top-18 z-30 border-b-4 border-amber-500/30 bg-[#0f213d]/95 backdrop-blur-md px-3 py-3 shadow-xl">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Botones de Mundos 1 a 5 */}
          <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {GAME_WORLDS.map((world) => {
              const isSelected = world.number === selectedWorldNumber;
              const isUnlocked = unlockedLevelMax >= world.levelsRange[0];

              return (
                <button
                  key={world.number}
                  onClick={() => {
                    sfx.playClick();
                    setSelectedWorldNumber(world.number);
                  }}
                  className={`flex items-center space-x-2 rounded-2xl px-4 py-2 font-black text-xs transition-all whitespace-nowrap border-3 shadow-sm ${
                    isSelected
                      ? 'border-yellow-300 bg-amber-400 text-slate-950 scale-105 shadow-[0_4px_0_#b45309]'
                      : isUnlocked
                      ? 'border-blue-400/40 bg-blue-900/60 text-blue-100 hover:bg-blue-800/80 shadow-[0_3px_0_#1e3a8a]'
                      : 'border-slate-700 bg-slate-900/80 text-slate-500 opacity-60'
                  }`}
                >
                  <span>MUNDO {world.number}</span>
                  {!isUnlocked && <Lock className="h-3.5 w-3.5" />}
                </button>
              );
            })}
          </div>

          {/* Marcadores de Juego: Estrellas y Monedas */}
          <div className="flex items-center space-x-3">
            {/* Contador de Estrellas */}
            <div className="flex items-center space-x-1.5 rounded-2xl border-2 border-yellow-400/50 bg-yellow-400/20 px-3.5 py-1.5 text-xs font-black text-yellow-300 shadow-[0_3px_0_#ca8a04]">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-mono text-sm">{totalStarsEarned}</span>
              <span className="text-[10px] text-yellow-200">/ 300 ⭐</span>
            </div>

            {/* Contador de Monedas */}
            <div 
              onClick={() => setIsShopOpen(true)}
              className="cursor-pointer flex items-center space-x-1.5 rounded-2xl border-2 border-amber-400/60 bg-amber-500/20 px-3.5 py-1.5 text-xs font-black text-yellow-300 hover:scale-105 transition-transform shadow-[0_3px_0_#b45309]"
            >
              <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="font-mono text-sm">{profile.coins}</span>
              <span className="text-[10px] text-yellow-200">MONEDAS</span>
            </div>

            {/* Tienda */}
            <button
              onClick={() => setIsShopOpen(true)}
              className="flex items-center space-x-1.5 rounded-2xl border-2 border-emerald-400 bg-emerald-500 px-3.5 py-1.5 text-xs font-black text-white hover:bg-emerald-400 shadow-[0_3px_0_#15803d] active:translate-y-1 active:shadow-none transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">TIENDA</span>
            </button>
          </div>

        </div>
      </div>

      {/* Contenedor del Tablero de Aventura */}
      <div className="mx-auto max-w-4xl px-3 sm:px-6 pt-6">
        
        {/* Banner de Presentación del Mundo */}
        <div className="relative mb-6 overflow-hidden rounded-3xl border-4 border-amber-400/50 bg-gradient-to-r from-blue-900/90 via-sky-900/80 to-blue-950/90 p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-amber-400 px-3 py-1 font-mono text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-sm inline-block mb-1.5">
                MUNDO {currentWorld.number} • BIOMA {currentWorld.biome.toUpperCase()}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                {worldInfoEs.name}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-sky-100 font-medium">
                {worldInfoEs.subtitle}
              </p>
            </div>

            <div className="rounded-2xl border-3 border-amber-400/40 bg-slate-900/90 px-4 py-2.5 text-center shadow-lg">
              <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                PROGRESO TOTAL
              </span>
              <span className="font-mono font-black text-emerald-400 text-lg">
                {completedLevels.size} / 100
              </span>
              <span className="text-[10px] text-slate-300 block font-semibold">
                Niveles Conquistados
              </span>
            </div>
          </div>
        </div>

        {/* TABLERO DE AVENTURA VÍVIDO (Sin máscara opaca para que se vean los colores vivos del fondo) */}
        <div className="relative w-full rounded-3xl border-4 border-amber-400/60 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          
          {/* Imagen de fondo viva y brillante (opacidad al 95%) */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-95"
            style={{ backgroundImage: `url(${currentWorld.bgImage})` }}
          />
          {/* Suave degradado en los bordes para mejorar contraste con las fichas */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/15 via-transparent to-blue-950/20 pointer-events-none" />

          {/* Lienzo del Camino Serpenteante (1800px) */}
          <div className="relative w-full h-[1850px]">
            
            {/* SVG del Camino de Adoquines conectando los 20 niveles del mundo */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {worldLevels.map((lvl, idx) => {
                if (idx === worldLevels.length - 1) return null;
                const nextLvl = worldLevels[idx + 1];
                const x1 = lvl.position.x;
                const y1 = lvl.position.y;
                const x2 = nextLvl.position.x;
                const y2 = nextLvl.position.y;
                const midY = (y1 + y2) / 2;
                const pathData = `M ${x1}% ${y1}% C ${x1}% ${midY}%, ${x2}% ${midY}%, ${x2}% ${y2}%`;

                const isCompleted = completedLevels.has(lvl.levelNumber) && completedLevels.has(nextLvl.levelNumber);
                const isUnlocked = completedLevels.has(lvl.levelNumber) || lvl.levelNumber < unlockedLevelMax;

                return (
                  <g key={lvl.levelNumber}>
                    {/* Sombra gruesa del camino */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="18"
                      strokeOpacity="0.7"
                      strokeLinecap="round"
                    />
                    {/* Camino adoquinado con estilo Mario */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isCompleted ? '#22c55e' : isUnlocked ? '#fbbf24' : '#64748b'}
                      strokeWidth="10"
                      strokeDasharray="8,8"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Fichas y Piedras de Camino (Stepping Stones) */}
            {worldLevels.map((lvl) => {
              const isCompleted = completedLevels.has(lvl.levelNumber);
              const isCurrent = lvl.levelNumber === unlockedLevelMax;
              const isLocked = lvl.levelNumber > unlockedLevelMax;
              const starCount = stars[lvl.levelNumber] || 0;

              return (
                <div
                  key={lvl.levelNumber}
                  onClick={() => handleLevelClick(lvl)}
                  style={{ left: `${lvl.position.x}%`, top: `${lvl.position.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isLocked
                      ? 'cursor-not-allowed opacity-75'
                      : 'cursor-pointer hover:scale-125 active:scale-95 z-20'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* MASCOTA ANIMADA DE DUOLINGO / MARIO sobre el nivel actual */}
                    {isCurrent && (
                      <div className="absolute -top-20 flex flex-col items-center animate-bounce z-40 pointer-events-none">
                        
                        {/* Bocadillo de Diálogo estilo Duolingo */}
                        <div className="rounded-2xl border-2 border-amber-400 bg-white px-2.5 py-1 text-[11px] font-black text-slate-900 shadow-xl whitespace-nowrap mb-1">
                          ¡Tu turno! 👇
                        </div>

                        {/* Personaje Ilustrado de Mascota */}
                        <div className="relative h-14 w-14 drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]">
                          <Image
                            src="/mascot.png"
                            alt="Tu personaje"
                            width={56}
                            height={56}
                            className="rounded-full object-cover border-2 border-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* Botón / Ficha de Nivel 3D */}
                    <div
                      className={`relative flex items-center justify-center transition-all ${
                        lvl.type === 'boss_fortress'
                          ? 'h-20 w-20 rounded-3xl border-4'
                          : lvl.type === 'mystery_block'
                          ? 'h-16 w-16 rounded-2xl border-4 rotate-3'
                          : 'h-16 w-16 rounded-full border-4'
                      } ${
                        isCompleted
                          ? 'border-yellow-200 bg-emerald-500 text-white shadow-[0_7px_0_#15803d,0_12px_20px_rgba(0,0,0,0.4)]'
                          : isCurrent
                          ? 'border-yellow-200 bg-amber-400 text-slate-950 shadow-[0_8px_0_#b45309,0_15px_30px_rgba(245,158,11,0.7)] animate-pulse scale-110'
                          : 'border-slate-500 bg-slate-700 text-slate-400 shadow-[0_5px_0_#334155]'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-8 w-8 stroke-[3.5]" />
                      ) : isLocked ? (
                        <Lock className="h-6 w-6 text-slate-300" />
                      ) : lvl.type === 'boss_fortress' ? (
                        <Castle className="h-9 w-9 text-slate-950" />
                      ) : lvl.type === 'mystery_block' ? (
                        <span className="font-mono text-2xl font-black text-slate-950">?</span>
                      ) : (
                        <span className="font-mono text-xl font-black">{lvl.levelNumber}</span>
                      )}
                    </div>

                    {/* Estrellas Doradas bajo la Ficha */}
                    {isCompleted && (
                      <div className="mt-1 flex items-center space-x-0.5 rounded-full bg-slate-900/80 px-2 py-0.5 border border-amber-400/40">
                        {[1, 2, 3].map(st => (
                          <Star
                            key={st}
                            className={`h-3 w-3 ${
                              st <= starCount
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Nombre del Nivel en Español */}
                    <div className="mt-1.5 max-w-[130px] text-center pointer-events-none">
                      <span className={`inline-block truncate rounded-xl px-2.5 py-1 font-black text-[10px] border-2 shadow-lg backdrop-blur-md ${
                        isCompleted
                          ? 'border-emerald-400 bg-emerald-900/90 text-white'
                          : isCurrent
                          ? 'border-yellow-300 bg-amber-400 text-slate-950'
                          : 'border-slate-600 bg-slate-900/90 text-slate-300'
                      }`}>
                        {lvl.title}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Laboratorio del Nivel Activo */}
      {activeLevel && (
        <LevelGameLab
          level={activeLevel}
          onClose={() => setActiveLevel(null)}
          onNextLevel={handleNextLevel}
        />
      )}

      {/* Modal de Tienda de Objetos */}
      {isShopOpen && (
        <PowerUpShopModal onClose={() => setIsShopOpen(false)} />
      )}

    </div>
  );
};
