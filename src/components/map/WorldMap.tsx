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
  ArrowRight,
  Flame,
  Compass
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

const WORLD_NAMES_ES: Record<number, { name: string; subtitle: string }> = {
  1: { name: 'Reino Pradera', subtitle: 'Las Llanuras de SELECT y Bifurcación (Niveles 1–20)' },
  2: { name: 'Cañón de Dunas', subtitle: 'El Desierto de Agrupaciones y Métricas (Niveles 21–40)' },
  3: { name: 'Islas de Cristal', subtitle: 'El Océano de Relaciones y JOINs (Niveles 41–60)' },
  4: { name: 'Cavernas Lógicas', subtitle: 'Las Minas de CASE y Subconsultas (Niveles 61–80)' },
  5: { name: 'Volcán de Bowser', subtitle: 'La Ciudadela de CTEs y Funciones Ventana (Niveles 81–100)' }
};

interface PathSegment {
  fromLevel: number;
  toLevel: number;
  color?: string;
}

const WORLD_1_SEGMENTS: PathSegment[] = [
  // Tronco Principal 1 a 10
  { fromLevel: 1, toLevel: 2 },
  { fromLevel: 2, toLevel: 3 },
  { fromLevel: 3, toLevel: 4 },
  { fromLevel: 4, toLevel: 5 },
  { fromLevel: 5, toLevel: 6 },
  { fromLevel: 6, toLevel: 7 },
  { fromLevel: 7, toLevel: 8 },
  { fromLevel: 8, toLevel: 9 },
  { fromLevel: 9, toLevel: 10 },
  // Bifurcación Izquierda: Ruta Verde (11-14)
  { fromLevel: 10, toLevel: 11, color: '#10b981' },
  { fromLevel: 11, toLevel: 12, color: '#10b981' },
  { fromLevel: 12, toLevel: 13, color: '#10b981' },
  { fromLevel: 13, toLevel: 14, color: '#10b981' },
  // Bifurcación Derecha: Ruta Roja (15-18)
  { fromLevel: 10, toLevel: 15, color: '#f59e0b' },
  { fromLevel: 15, toLevel: 16, color: '#f59e0b' },
  { fromLevel: 16, toLevel: 17, color: '#f59e0b' },
  { fromLevel: 17, toLevel: 18, color: '#f59e0b' },
  // Reunificación hacia 19
  { fromLevel: 14, toLevel: 19, color: '#10b981' },
  { fromLevel: 18, toLevel: 19, color: '#f59e0b' },
  // Hacia el Castillo de Bowser
  { fromLevel: 19, toLevel: 20, color: '#ef4444' }
];

export const WorldMap: React.FC = () => {
  const { 
    profile, 
    completedLevels, 
    unlockedLevelMax, 
    isLevelUnlocked,
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

  // Nivel activo donde se ubica la mascota
  const activeMascotLevelNum = useMemo(() => {
    const uncompleted = worldLevels.find(l => isLevelUnlocked(l.levelNumber) && !completedLevels.has(l.levelNumber));
    if (uncompleted) return uncompleted.levelNumber;
    return worldLevels[worldLevels.length - 1]?.levelNumber || 1;
  }, [worldLevels, isLevelUnlocked, completedLevels]);

  // Total de estrellas conseguidas
  const totalStarsEarned = useMemo(() => {
    return Object.values(stars).reduce((acc, curr) => acc + curr, 0);
  }, [stars]);

  const handleLevelClick = (level: GameLevel) => {
    if (!isLevelUnlocked(level.levelNumber)) {
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

  // Construcción de conexiones de caminos SVG
  const pathSegmentsToDraw = useMemo(() => {
    if (selectedWorldNumber === 1) {
      return WORLD_1_SEGMENTS;
    }
    // Para mundos 2 a 5: conectar secuencialmente
    const segs: PathSegment[] = [];
    for (let i = 0; i < worldLevels.length - 1; i++) {
      segs.push({
        fromLevel: worldLevels[i].levelNumber,
        toLevel: worldLevels[i + 1].levelNumber
      });
    }
    return segs;
  }, [selectedWorldNumber, worldLevels]);

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full bg-[#0a192f] text-slate-100 overflow-x-hidden pb-32">
      
      {/* Fondo de Cielo con Nubes */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1d4ed8]/30 via-[#0f284e]/20 to-[#0a192f] opacity-80" />

      {/* Selector de Mundos Estilo Mario Bros */}
      <div className="sticky top-18 z-30 border-b-4 border-amber-500/30 bg-[#0f213d]/95 backdrop-blur-md px-3 py-3 shadow-xl">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Botones de Mundos 1 a 5 */}
          <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {GAME_WORLDS.map((world) => {
              const isSelected = world.number === selectedWorldNumber;
              const isUnlocked = isLevelUnlocked(world.levelsRange[0]);

              return (
                <button
                  key={world.number}
                  onClick={() => {
                    sfx.playClick();
                    setSelectedWorldNumber(world.number);
                  }}
                  className={`flex items-center space-x-2 rounded-2xl px-4 py-2 font-black transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-[0_4px_0_#b45309] scale-105'
                      : isUnlocked
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 shadow-[0_3px_0_#334155]'
                      : 'bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xs uppercase">Mundo {world.number}</span>
                  {!isUnlocked && <Lock className="h-3 w-3" />}
                </button>
              );
            })}
          </div>

          {/* Estadísticas de Monedas y Estrellas */}
          <div className="flex items-center space-x-3">
            <div 
              onClick={() => setIsShopOpen(true)}
              className="cursor-pointer flex items-center space-x-1.5 rounded-2xl border-2 border-yellow-400/60 bg-yellow-400/20 px-3.5 py-1.5 text-xs font-black text-yellow-300 hover:scale-105 transition-transform shadow-[0_2px_0_#ca8a04]"
              title="Monedas conseguidas (Haz clic para canjear ayudas)"
            >
              <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="font-mono text-sm">{profile.coins}</span>
              <span className="text-[10px] text-yellow-200 hidden sm:inline">CANJEAR</span>
            </div>

            <div className="flex items-center space-x-1.5 rounded-2xl border-2 border-amber-400/40 bg-amber-500/20 px-3 py-1.5 text-xs font-black text-amber-300 shadow-[0_2px_0_#b45309]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{totalStarsEarned} ⭐</span>
            </div>

            <button
              onClick={() => setIsShopOpen(true)}
              className="flex items-center space-x-1.5 rounded-2xl border-2 border-emerald-400 bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-400 shadow-[0_3px_0_#15803d] active:translate-y-1 active:shadow-none transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">BAZAR</span>
            </button>
          </div>

        </div>
      </div>

      {/* Contenedor del Mapa Principal */}
      <div className="mx-auto max-w-4xl px-3 sm:px-6 pt-6">
        
        {/* Cabecera del Reino Actual */}
        <div className="mb-6 rounded-3xl border-4 border-amber-400/50 bg-[#0e1d38]/90 p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-emerald-500 px-3 py-0.5 font-mono text-xs font-black text-slate-950 uppercase tracking-wide">
                MUNDO {selectedWorldNumber}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-xs text-amber-400 font-bold">Niveles {currentWorld.levelsRange[0]} a {currentWorld.levelsRange[1]}</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
              {worldInfoEs.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 font-medium">
              {worldInfoEs.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-4">
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

        {/* TABLERO DE AVENTURA VÍVIDO (Opacidad al 95% para colores vivos del paisaje) */}
        <div className="relative w-full rounded-3xl border-4 border-amber-400/60 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          
          {/* Imagen de fondo viva y brillante */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-95"
            style={{ backgroundImage: `url(${currentWorld.bgImage})` }}
          />
          {/* Suave degradado para mejorar contraste */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/15 via-transparent to-blue-950/20 pointer-events-none" />

          {/* Lienzo del Camino Serpenteante (1850px) */}
          <div className="relative w-full h-[1850px]">
            
            {/* SVG del Camino de Adoquines conectando los niveles */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {pathSegmentsToDraw.map((seg, idx) => {
                const lvl1 = ALL_100_LEVELS.find(l => l.levelNumber === seg.fromLevel);
                const lvl2 = ALL_100_LEVELS.find(l => l.levelNumber === seg.toLevel);
                if (!lvl1 || !lvl2) return null;

                const x1 = lvl1.position.x;
                const y1 = lvl1.position.y;
                const x2 = lvl2.position.x;
                const y2 = lvl2.position.y;
                const midY = (y1 + y2) / 2;
                const pathData = `M ${x1}% ${y1}% C ${x1}% ${midY}%, ${x2}% ${midY}%, ${x2}% ${y2}%`;

                const isCompleted = completedLevels.has(lvl1.levelNumber) && completedLevels.has(lvl2.levelNumber);
                const isUnlocked = isLevelUnlocked(lvl2.levelNumber);

                return (
                  <g key={`${seg.fromLevel}-${seg.toLevel}-${idx}`}>
                    {/* Sombra gruesa del camino de tierra/piedra */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="24"
                      strokeOpacity="0.85"
                      strokeLinecap="round"
                    />
                    {/* Sendero base */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={
                        isCompleted
                          ? seg.color || '#22c55e'
                          : isUnlocked
                          ? seg.color || '#fbbf24'
                          : '#475569'
                      }
                      strokeWidth="14"
                      strokeOpacity="0.9"
                      strokeLinecap="round"
                    />
                    {/* Línea punteada de adoquines de Mario */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeDasharray="6,8"
                      strokeOpacity={isUnlocked ? 0.7 : 0.25}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Cartel de Madera con Bifurcación en Mundo 1 */}
            {selectedWorldNumber === 1 && (
              <div className="absolute left-1/2 top-[53.5%] -translate-x-1/2 -translate-y-1/2 z-25 flex flex-col items-center pointer-events-none">
                <div className="flex items-center gap-2 rounded-2xl border-3 border-amber-500 bg-slate-900/95 p-2 shadow-[0_6px_0_#b45309,0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md">
                  <div className="flex items-center gap-1.5 rounded-xl bg-emerald-950/90 px-3 py-1.5 border border-emerald-400">
                    <span className="text-xs">⬅️</span>
                    <span className="font-mono text-[11px] font-black text-emerald-300 uppercase">Ruta Verde (Fácil)</span>
                  </div>
                  <div className="h-5 w-px bg-slate-600" />
                  <div className="flex items-center gap-1.5 rounded-xl bg-amber-950/90 px-3 py-1.5 border border-amber-400">
                    <span className="font-mono text-[11px] font-black text-amber-300 uppercase">Ruta Desafío (+🪙)</span>
                    <span className="text-xs">➡️</span>
                  </div>
                </div>
                {/* Poste de madera */}
                <div className="w-3.5 h-6 bg-amber-800 border-x-2 border-amber-950 shadow-inner" />
              </div>
            )}

            {/* Fichas y Piedras de Camino (Stepping Stones) */}
            {worldLevels.map((lvl) => {
              const isCompleted = completedLevels.has(lvl.levelNumber);
              const isUnlocked = isLevelUnlocked(lvl.levelNumber);
              const isCurrent = lvl.levelNumber === activeMascotLevelNum;
              const starCount = stars[lvl.levelNumber] || 0;

              return (
                <div
                  key={lvl.levelNumber}
                  onClick={() => handleLevelClick(lvl)}
                  style={{ left: `${lvl.position.x}%`, top: `${lvl.position.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    !isUnlocked
                      ? 'cursor-not-allowed opacity-75'
                      : 'cursor-pointer hover:scale-125 active:scale-95 z-20'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* MASCOTA ANIMADA GRANDE (100px) DE DUOLINGO / MARIO sobre el nivel activo */}
                    {isCurrent && (
                      <div className="absolute -top-32 flex flex-col items-center animate-bounce z-40 pointer-events-none">
                        
                        {/* Bocadillo de Diálogo estilo Comic / Mario */}
                        <div className="relative rounded-2xl border-3 border-amber-400 bg-white px-3.5 py-1.5 text-xs font-black text-slate-950 shadow-[0_6px_0_#b45309,0_12px_25px_rgba(0,0,0,0.5)] whitespace-nowrap mb-1 flex items-center gap-1">
                          <span>¡A por este nivel! 🚀</span>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-amber-400 border-t-8 border-x-transparent border-x-8 border-b-0" />
                        </div>

                        {/* Personaje Ilustrado en Gran Tamaño (100px x 100px) */}
                        <div className="relative h-24 w-24 sm:h-28 sm:w-28 drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]">
                          <Image
                            src="/mascot.png"
                            alt="Tu personaje"
                            width={112}
                            height={112}
                            className="rounded-3xl object-contain filter drop-shadow-md"
                          />
                        </div>

                        {/* Pedestal de Brillo 3D bajo sus pies */}
                        <div className="w-16 h-3 rounded-full bg-amber-400/40 blur-xs -mt-1 border border-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
                      </div>
                    )}

                    {/* Botón / Ficha de Nivel 3D */}
                    <div
                      className={`relative flex items-center justify-center transition-all ${
                        lvl.type === 'boss_fortress'
                          ? 'h-22 w-22 rounded-3xl border-4'
                          : lvl.type === 'mystery_block'
                          ? 'h-16 w-16 rounded-2xl border-4 rotate-3'
                          : 'h-16 w-16 rounded-full border-4'
                      } ${
                        isCompleted
                          ? 'border-yellow-200 bg-emerald-500 text-white shadow-[0_7px_0_#15803d,0_12px_20px_rgba(0,0,0,0.4)]'
                          : isCurrent
                          ? 'border-yellow-200 bg-amber-400 text-slate-950 shadow-[0_8px_0_#b45309,0_15px_30px_rgba(245,158,11,0.7)] animate-pulse scale-110'
                          : isUnlocked
                          ? lvl.branch === 'hard'
                            ? 'border-red-400 bg-red-600 text-white shadow-[0_6px_0_#991b1b]'
                            : 'border-yellow-300 bg-amber-500 text-slate-950 shadow-[0_6px_0_#b45309]'
                          : 'border-slate-500 bg-slate-700 text-slate-400 shadow-[0_5px_0_#334155]'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-8 w-8 stroke-[3.5]" />
                      ) : !isUnlocked ? (
                        <Lock className="h-6 w-6 text-slate-300" />
                      ) : lvl.type === 'boss_fortress' ? (
                        <Castle className="h-10 w-10 text-slate-950" />
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

                    {/* Badge de Ruta si corresponde */}
                    {lvl.branch === 'easy' && (
                      <span className="mt-1 rounded-full bg-emerald-500 px-2 py-0.2 text-[9px] font-black text-slate-950 shadow">
                        🟢 Fácil
                      </span>
                    )}
                    {lvl.branch === 'hard' && (
                      <span className="mt-1 rounded-full bg-red-500 px-2 py-0.2 text-[9px] font-black text-white shadow">
                        🔥 +Monedas
                      </span>
                    )}

                    {/* Nombre del Nivel en Español */}
                    <div className="mt-1 max-w-[130px] text-center pointer-events-none">
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
