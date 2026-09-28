'use client';

import React, { useState } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { 
  Compass, 
  LayoutDashboard, 
  User, 
  Flame, 
  Volume2, 
  VolumeX, 
  Layers, 
  Sparkles,
  Shield,
  ChevronDown,
  Coins,
  ShoppingBag
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
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090D14]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* Brand & Realm Selector */}
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => setActiveView('world')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              {/* Tactical Lab Logo */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <span className="font-mono text-base font-extrabold tracking-tighter">LL</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold tracking-tight text-white text-base">LEARN-LAB</span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-medium text-amber-400 border border-amber-500/20">
                    V1.0
                  </span>
                </div>
              </div>
            </div>

            {/* Realm Indicator Button */}
            <div className="hidden md:block h-5 w-px bg-slate-800" />
            <button
              onClick={() => setIsRealmOpen(true)}
              className="hidden md:flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 transition-all"
              title="Change Learning World"
            >
              <span className="text-slate-400">Realm:</span>
              <span className="font-semibold text-cyan-400">Data &amp; AI</span>
              <span className="text-slate-500">/</span>
              <span className="font-bold text-amber-400">SQL World</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>

          {/* Center Navigation Views */}
          <nav className="flex items-center space-x-1 rounded-xl border border-slate-800 bg-slate-950/60 p-1">
            <button
              onClick={() => setActiveView('world')}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'world'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>World Map</span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'dashboard'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveView('profile')}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'profile'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Character</span>
            </button>
          </nav>

          {/* Right Game Metrics & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Streak Counter */}
            <div 
              className="flex items-center space-x-1.5 rounded-lg border border-amber-500/20 bg-amber-950/20 px-2.5 py-1 text-xs font-bold text-amber-400 shadow-sm"
              title={`${profile.streakDays} Day Active Streak`}
            >
              <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{profile.streakDays}</span>
            </div>

            {/* Level & XP Chip */}
            <div 
              onClick={() => setActiveView('profile')}
              className="cursor-pointer flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs hover:border-slate-700 transition-all"
            >
              <div className="flex h-5 items-center justify-center rounded bg-amber-500/20 px-1.5 font-mono text-[11px] font-bold text-amber-300">
                LVL {String(profile.level).padStart(2, '0')}
              </div>
              <div className="hidden sm:flex items-center space-x-1 font-mono text-slate-300">
                <span>{profile.xp.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500">XP</span>
              </div>
            </div>

            {/* Coins Balance */}
            <div 
              onClick={() => setIsShopOpen(true)}
              className="cursor-pointer flex items-center space-x-1.5 rounded-lg border border-yellow-500/30 bg-yellow-950/20 px-2.5 py-1 text-xs font-bold text-yellow-300 hover:border-yellow-400 transition-all shadow-sm"
              title="Open Power-Up Item Shop"
            >
              <Coins className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="font-mono">{profile.coins}</span>
            </div>

            {/* Shop Button */}
            <button
              onClick={() => setIsShopOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-1 text-xs font-extrabold text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-sm"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Shop</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                isAudioMuted
                  ? 'border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
              }`}
              title={isAudioMuted ? 'Sound FX Muted (Click to enable)' : 'Sound FX Enabled (Click to mute)'}
            >
              {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            {/* User Auth / Guest Status */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-all"
            >
              <Shield className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-medium">
                {profile.isGuest ? 'Guest' : profile.username}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Realm Selection Modal */}
      {isRealmOpen && <RealmSelector onClose={() => setIsRealmOpen(false)} />}

      {/* Auth Modal */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}

      {/* Shop Modal */}
      {isShopOpen && <PowerUpShopModal onClose={() => setIsShopOpen(false)} />}
    </>
  );
};
