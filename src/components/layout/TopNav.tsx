'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGameState } from '@/context/GameStateContext';
import { 
  Map, 
  Target, 
  User, 
  Flame, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  Coins, 
  Shield, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { RealmSelector } from './RealmSelector';
import { AuthModal } from '../views/AuthModal';
import { PowerUpShopModal } from '../gamification/PowerUpShopModal';

export const TopNav: React.FC = () => {
  const { 
    profile, 
    activeView, 
    setActiveView, 
    isAudioMuted, 
    toggleAudio 
  } = useGameState();

  const [isRealmOpen, setIsRealmOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-4 border-amber-500/30 bg-[#0e1d38]/95 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-3 sm:px-6">
          
          {/* Brand & Mascot Logo */}
          <div className="flex items-center space-x-3">
            <div 
              onClick={() => setActiveView('world')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              {/* Cute Mascot Avatar */}
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-0.5 shadow-[0_4px_0_#b45309] group-hover:scale-105 transition-transform overflow-hidden">
                <Image
                  src="/mascot.png"
                  alt="Mascota Learn-Lab"
                  width={44}
                  height={44}
                  className="rounded-xl object-cover"
                />
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white drop-shadow-sm">
                    LEARN<span className="text-amber-400">-LAB</span>
                  </span>
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 font-bold text-[10px] text-white shadow-sm">
                    SQL WORLD
                  </span>
                </div>
              </div>
            </div>

            {/* Selector de Mundo */}
            <div className="hidden lg:block h-6 w-px bg-slate-700/60" />
            <button
              onClick={() => setIsRealmOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 rounded-2xl border-2 border-sky-400/40 bg-sky-950/40 px-3 py-1.5 text-xs font-bold text-sky-200 hover:border-sky-300 hover:bg-sky-900/50 transition-all shadow-[0_2px_0_#0284c7]"
            >
              <span className="text-sky-300">Reino:</span>
              <span className="font-black text-amber-300">Data &amp; AI / SQL</span>
              <ChevronDown className="h-4 w-4 text-sky-300" />
            </button>
          </div>

          {/* Central Gamified Navigation Tabs (Estilo Mario / Duolingo) */}
          <nav className="flex items-center space-x-1.5 sm:space-x-2 rounded-2xl border-2 border-slate-700/80 bg-slate-900/90 p-1.5 shadow-inner">
            <button
              onClick={() => setActiveView('world')}
              className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-black transition-all ${
                activeView === 'world'
                  ? 'bg-amber-400 text-slate-950 shadow-[0_3px_0_#b45309] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Mapa del Mundo</span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-black transition-all ${
                activeView === 'dashboard'
                  ? 'bg-amber-400 text-slate-950 shadow-[0_3px_0_#b45309] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Misiones</span>
            </button>

            <button
              onClick={() => setActiveView('profile')}
              className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-black transition-all ${
                activeView === 'profile'
                  ? 'bg-amber-400 text-slate-950 shadow-[0_3px_0_#b45309] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Personaje</span>
            </button>
          </nav>

          {/* Right Game Metrics & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Racha de Fuego */}
            <div 
              className="flex items-center space-x-1.5 rounded-2xl border-2 border-amber-500/50 bg-amber-500/20 px-3 py-1.5 text-xs font-black text-amber-300 shadow-[0_2px_0_#b45309]"
              title={`${profile.streakDays} Días de Racha Activa`}
            >
              <Flame className="h-4 w-4 fill-amber-400 text-amber-400 animate-bounce" />
              <span>{profile.streakDays}</span>
            </div>

            {/* Monedas de Oro */}
            <div 
              onClick={() => setIsShopOpen(true)}
              className="cursor-pointer flex items-center space-x-1.5 rounded-2xl border-2 border-yellow-400/60 bg-yellow-400/20 px-3 py-1.5 text-xs font-black text-yellow-300 hover:scale-105 transition-transform shadow-[0_2px_0_#ca8a04]"
              title="Monedas conseguidas (Click para abrir la Tienda)"
            >
              <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="font-mono text-sm">{profile.coins}</span>
            </div>

            {/* Botón Tienda Mario */}
            <button
              onClick={() => setIsShopOpen(true)}
              className="flex items-center space-x-1.5 rounded-2xl border-2 border-emerald-400 bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-400 shadow-[0_3px_0_#15803d] active:translate-y-1 active:shadow-none transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">TIENDA</span>
            </button>

            {/* Nivel */}
            <div 
              onClick={() => setActiveView('profile')}
              className="cursor-pointer hidden sm:flex items-center space-x-1.5 rounded-2xl border-2 border-blue-400/40 bg-blue-500/20 px-3 py-1.5 text-xs font-black text-blue-200 shadow-[0_2px_0_#1d4ed8]"
            >
              <span>NIVEL {profile.level}</span>
            </div>

            {/* Sonido Toggle */}
            <button
              onClick={toggleAudio}
              className={`flex h-9 w-9 items-center justify-center rounded-2xl border-2 transition-all ${
                isAudioMuted
                  ? 'border-slate-700 bg-slate-900 text-slate-500 hover:text-slate-300 shadow-[0_2px_0_#1e293b]'
                  : 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_2px_0_#b45309]'
              }`}
              title={isAudioMuted ? 'Efectos de sonido silenciados' : 'Efectos de sonido activados'}
            >
              {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            {/* Estado de Cuenta */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="hidden sm:flex items-center space-x-1 rounded-2xl border-2 border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-500"
            >
              <Shield className="h-3.5 w-3.5 text-cyan-400" />
              <span>{profile.isGuest ? 'Invitado' : profile.username}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Modal de Reinos */}
      {isRealmOpen && <RealmSelector onClose={() => setIsRealmOpen(false)} />}

      {/* Modal de Autenticación */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}

      {/* Modal de Tienda de Poderes */}
      {isShopOpen && <PowerUpShopModal onClose={() => setIsShopOpen(false)} />}
    </>
  );
};
