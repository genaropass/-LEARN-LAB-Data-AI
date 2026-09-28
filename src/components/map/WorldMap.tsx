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
  Castle, 
  Sparkles,
  Play,
  ArrowRight
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

const WORLD_NAMES_ES: Record<number, { name: string; subtitle: string }> = {
  1: { name: 'Era I: Edad de Piedra', subtitle: 'El Dominio del Fuego y los Primeros Registros (Niveles 1–14)' },
  2: { name: 'Era II: Primeras Civilizaciones', subtitle: 'Riberas del Nilo, Cosechas y Agrupaciones (Niveles 15–28)' },
  3: { name: 'Era III: Grandes Reinos e Hierro', subtitle: 'Fortalezas, Molinos y Relaciones JOIN (Niveles 29–42)' },
  4: { name: 'Era IV: Revolución del Vapor', subtitle: 'Fábricas, Ferrocarriles y Lógica Condicional (Niveles 43–56)' },
  5: { name: 'Era V: Hub de la Globalización Conectada', subtitle: 'Comercio Transfronterizo, Logística y Subconsultas CTE (Niveles 57–70)' },
  6: { name: 'Era VI: Metrópolis de la Inteligencia Artificial', subtitle: 'Ciberespacio, Modelos Neuronales y Funciones de Ventana (Niveles 71–84)' }
};

interface PathSegment {
  fromLevel: number;
  toLevel: number;
  color?: string;
}

export const WorldMap: React.FC = () => {
  const { 
    profile, 
    completedLevels, 
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
    return worldLevels[worldLevels.length - 1]?.levelNumber || worldLevels[0]?.levelNumber || 1;
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

  // Construcción de conexiones de caminos SVG para los niveles del mundo actual
  const pathSegmentsToDraw = useMemo(() => {
    const segs: PathSegment[] = [];
    for (let i = 0; i < worldLevels.length - 1; i++) {
      segs.push({
        fromLevel: worldLevels[i].levelNumber,
        toLevel: worldLevels[i + 1].levelNumber
      });
    }
    return segs;
  }, [worldLevels]);

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full bg-[#0a192f] text-slate-100 overflow-x-hidden pb-32">
      
      {/* Fondo de Cielo con Nubes */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1d4ed8]/30 via-[#0f284e]/20 to-[#0a192f] opacity-80" />

      {/* Selector de Mundos (6 Eras Históricas) */}
      <div className="relative z-30 border-b-4 border-amber-500/30 bg-[#0f213d] px-3 py-3.5 shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Botones de Mundos 1 a 6 */}
          <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-thin">
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
                  className={`flex items-center space-x-1.5 rounded-2xl px-3.5 py-2 font-black transition-all text-xs whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-[0_4px_0_#b45309] scale-105'
                      : isUnlocked
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 shadow-[0_3px_0_#334155]'
                      : 'bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <span className="uppercase font-bold">Mundo {world.number}</span>
                  {!isUnlocked && <Lock className="h-3 w-3" />}
                </button>
              );
            })}
          </div>

          {/* Estadísticas de Monedas, Estrellas y Bazar */}
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
              className="flex items-center space-x-1.5 rounded-2xl border-2 border-emerald-400 bg-emerald-500 px-3.5 py-1.5 text-xs font-black text-white hover:bg-emerald-400 shadow-[0_3px_0_#15803d] active:translate-y-1 active:shadow-none transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">BAZAR</span>
            </button>
          </div>

        </div>
      </div>

      {/* Contenedor del Mapa en Pantalla Completa */}
      <div className="w-full px-2 sm:px-6 pt-4">
        
        {/* Cabecera del Reino / Era Actual */}
        <div className="mb-4 w-full rounded-2xl border-3 border-amber-400/50 bg-[#0e1d38]/95 p-4 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-emerald-500 px-3 py-0.5 font-mono text-xs font-black text-slate-950 uppercase tracking-wide">
                MUNDO {selectedWorldNumber} DE 6
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-xs text-amber-400 font-bold">Niveles {currentWorld.levelsRange[0]} a {currentWorld.levelsRange[1]}</span>
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-black text-white tracking-tight">
              {worldInfoEs.name}
            </h1>
            <p className="text-xs text-slate-200 mt-0.5 font-medium">
              {worldInfoEs.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="rounded-2xl border-2 border-amber-400/40 bg-slate-900/90 px-4 py-2 text-center shadow-md">
              <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                PROGRESO TOTAL
              </span>
              <span className="font-mono font-black text-emerald-400 text-base">
                {completedLevels.size} / {ALL_100_LEVELS.length}
              </span>
            </div>
          </div>
        </div>

        {/* TABLERO DE AVENTURA EN PANTALLA COMPLETA - ASPECT RATIO EXACTO 16:9 */}
        <div className="relative w-full overflow-x-auto rounded-3xl border-4 border-amber-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-slate-950">
          
          {/* Contenedor con Aspect Ratio Proporcional Idéntico a la Ilustración (1376x768) */}
          <div className="relative w-full aspect-[1376/768] min-w-[1000px] select-none">
            
            {/* Imagen de fondo viva y sin deformaciones */}
            <Image 
              src={currentWorld.bgImage}
              alt={worldInfoEs.name}
              fill
              priority
              sizes="100vw"
              className="object-cover pointer-events-none select-none transition-all duration-700"
            />

            {/* SVG del Camino conectando los niveles exactamente sobre la carretera ilustrada */}
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
                    {/* Sombra del camino */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="12"
                      strokeOpacity="0.85"
                      strokeLinecap="round"
                    />
                    {/* Sendero activo */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={
                        isCompleted
                          ? '#22c55e'
                          : isUnlocked
                          ? '#fbbf24'
                          : '#475569'
                      }
                      strokeWidth="8"
                      strokeOpacity="0.9"
                      strokeLinecap="round"
                    />
                    {/* Línea punteada de adoquines */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeDasharray="5,6"
                      strokeOpacity={isUnlocked ? 0.75 : 0.25}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Fichas y Nodos de Nivel Estandarizados (14 niveles por mundo) */}
            {worldLevels.map((lvl) => {
              const isCompleted = completedLevels.has(lvl.levelNumber);
              const isUnlocked = isLevelUnlocked(lvl.levelNumber);
              const isCurrent = lvl.levelNumber === activeMascotLevelNum;
              const isBoss = lvl.type === 'boss_fortress';
              const starCount = stars[lvl.levelNumber] || 0;
              const isLabelAbove = lvl.position.y > 75;

              return (
                <div
                  key={lvl.levelNumber}
                  onClick={() => handleLevelClick(lvl)}
                  style={{ left: `${lvl.position.x}%`, top: `${lvl.position.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    !isUnlocked
                      ? 'cursor-not-allowed opacity-80'
                      : 'cursor-pointer hover:scale-120 active:scale-95 z-20'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* MASCOTA ANIMADA PROTAGONISTA NOVA sobre el nivel activo */}
                    {isCurrent && (
                      <div className="absolute -top-28 sm:-top-32 flex flex-col items-center animate-bounce z-40 pointer-events-none">
                        
                        {/* Bocadillo de Diálogo estilo Comic */}
                        <div className="relative rounded-2xl border-2 border-amber-400 bg-white/95 backdrop-blur-xs px-3 py-1.5 text-[11px] font-black text-slate-950 shadow-[0_4px_0_#b45309,0_8px_16px_rgba(0,0,0,0.5)] whitespace-nowrap mb-1 flex items-center gap-1 max-w-[220px] truncate">
                          <span>
                            {lvl.characterDialogue?.text 
                              ? (lvl.characterDialogue.text.length > 36 
                                  ? lvl.characterDialogue.text.slice(0, 34) + '...' 
                                  : lvl.characterDialogue.text)
                              : '¡Avanza en la historia! 🚀'}
                          </span>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-solid border-t-amber-400 border-t-6 border-x-transparent border-x-6 border-b-0" />
                        </div>

                        {/* Personaje Nova transparente */}
                        <div className="relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                          <Image
                            src="/mascot.png"
                            alt="Nova la Exploradora"
                            width={96}
                            height={96}
                            className="object-contain filter drop-shadow-md select-none"
                            priority
                          />
                        </div>

                        {/* Pedestal de Brillo 3D bajo sus pies */}
                        <div className="w-16 h-3 rounded-full bg-amber-400/50 blur-xs -mt-1 border border-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.9)]" />
                      </div>
                    )}

                    {/* Etiqueta Superior si el nodo está al fondo de la pantalla */}
                    {isLabelAbove && (
                      <div className="mb-2 max-w-[170px] text-center pointer-events-none z-10">
                        <span className={`inline-block truncate rounded-xl px-2.5 py-1 font-black text-xs border-2 shadow-xl backdrop-blur-md transition-all ${
                          isCompleted
                            ? 'border-emerald-400 bg-slate-950/95 text-emerald-300 shadow-emerald-950/50'
                            : isCurrent
                            ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-amber-950/50'
                            : isUnlocked
                            ? 'border-amber-500/80 bg-slate-950/95 text-slate-100 shadow-slate-950/50'
                            : 'border-slate-700 bg-slate-950/85 text-slate-400'
                        }`}>
                          {isBoss ? `👑 ${lvl.title}` : lvl.title}
                        </span>
                      </div>
                    )}

                    {/* Botón / Ficha de Nivel 3D Estandarizada */}
                    <div
                      className={`relative flex items-center justify-center transition-all ${
                        isBoss
                          ? 'h-14 w-14 sm:h-16 sm:w-16 rounded-3xl border-3 bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-[0_6px_0_#991b1b,0_10px_20px_rgba(0,0,0,0.5)] border-amber-300'
                          : lvl.type === 'mystery_block'
                          ? 'h-12 w-12 sm:h-13 sm:w-13 rounded-2xl border-3 rotate-3 bg-amber-500 text-slate-950 border-amber-300 shadow-[0_5px_0_#b45309]'
                          : 'h-12 w-12 sm:h-13 sm:w-13 rounded-full border-3'
                      } ${
                        !isBoss && (
                          isCompleted
                            ? 'border-yellow-200 bg-emerald-500 text-white shadow-[0_5px_0_#15803d,0_8px_16px_rgba(0,0,0,0.4)]'
                            : isCurrent
                            ? 'border-yellow-200 bg-amber-400 text-slate-950 shadow-[0_6px_0_#b45309,0_10px_20px_rgba(245,158,11,0.7)] animate-pulse scale-110'
                            : isUnlocked
                            ? 'border-yellow-300 bg-amber-500 text-slate-950 shadow-[0_5px_0_#b45309]'
                            : 'border-slate-600 bg-slate-800 text-slate-400 shadow-[0_4px_0_#1e293b]'
                        )
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6 stroke-[3.5]" />
                      ) : !isUnlocked ? (
                        <Lock className="h-5 w-5 text-slate-300" />
                      ) : isBoss ? (
                        <Castle className="h-7 w-7 text-white drop-shadow-md" />
                      ) : lvl.type === 'mystery_block' ? (
                        <span className="font-mono text-lg font-black text-slate-950">?</span>
                      ) : (
                        <span className="font-mono text-sm sm:text-base font-black">{lvl.levelNumber}</span>
                      )}
                    </div>

                    {/* Estrellas Doradas bajo la Ficha */}
                    {isCompleted && (
                      <div className="mt-1 flex items-center space-x-0.5 rounded-full bg-slate-900/90 px-2 py-0.5 border border-amber-400/50 shadow">
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

                    {/* Etiqueta Inferior (para nodos arriba del 75% del mapa) */}
                    {!isLabelAbove && (
                      <div className="mt-2 max-w-[170px] text-center pointer-events-none z-10">
                        <span className={`inline-block truncate rounded-xl px-2.5 py-1 font-black text-xs border-2 shadow-xl backdrop-blur-md transition-all ${
                          isCompleted
                            ? 'border-emerald-400 bg-slate-950/95 text-emerald-300 shadow-emerald-950/50'
                            : isCurrent
                            ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-amber-950/50'
                            : isUnlocked
                            ? 'border-amber-500/80 bg-slate-950/95 text-slate-100 shadow-slate-950/50'
                            : 'border-slate-700 bg-slate-950/85 text-slate-400'
                        }`}>
                          {isBoss ? `👑 ${lvl.title}` : lvl.title}
                        </span>
                      </div>
                    )}

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
