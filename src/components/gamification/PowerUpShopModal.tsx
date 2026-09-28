'use client';

import React from 'react';
import { useGameState } from '@/context/GameStateContext';
import { SHOP_POWERUPS } from '@/lib/progression/powerups';
import { 
  X, 
  Lightbulb, 
  FileCode, 
  Shield, 
  Key, 
  Coins, 
  ShoppingBag,
  Sparkles,
  Check
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

interface PowerUpShopModalProps {
  onClose: () => void;
}

export const PowerUpShopModal: React.FC<PowerUpShopModalProps> = ({ onClose }) => {
  const { profile, buyPowerUp, inventory } = useGameState();

  const handlePurchase = (powerUpId: string) => {
    const success = buyPowerUp(powerUpId);
    if (!success) {
      alert('Not enough coins! Complete more levels or maintain your streak to earn coins.');
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'hint':
        return <Lightbulb className="h-6 w-6 text-amber-400" />;
      case 'blueprint':
        return <FileCode className="h-6 w-6 text-cyan-400" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-emerald-400" />;
      case 'master_key':
        return <Key className="h-6 w-6 text-yellow-400" />;
      default:
        return <Sparkles className="h-6 w-6 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl border-4 border-amber-500/60 bg-[#0E131F] p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl bg-slate-900 border border-slate-700 p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Shop Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-amber-400">
                MARIO POWER-UP BAZAAR
              </span>
              <h2 className="text-xl font-black text-white tracking-tight">
                Item &amp; Help Shop
              </h2>
            </div>
          </div>

          {/* Current Coins Balance */}
          <div className="flex items-center space-x-2 rounded-2xl border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 px-4 py-2 shadow-inner">
            <Coins className="h-5 w-5 text-yellow-400 animate-bounce" />
            <span className="font-mono text-base font-black text-yellow-300">
              {profile.coins}
            </span>
            <span className="text-[10px] font-bold text-yellow-500 uppercase">
              COINS
            </span>
          </div>
        </div>

        {/* Power-Up Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SHOP_POWERUPS.map((item) => {
            const owned = inventory[item.id] || 0;
            const canAfford = profile.coins >= item.cost;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border-2 border-slate-800 bg-slate-950/70 p-4 transition-all hover:border-amber-500/50 hover:bg-slate-900/60 group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                      {getIcon(item.category)}
                    </div>
                    {owned > 0 && (
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                        Owned: {owned}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-bold text-sm text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 font-mono font-black text-yellow-400 text-sm">
                    <Coins className="h-4 w-4 fill-yellow-400" />
                    <span>{item.cost}</span>
                  </div>

                  <button
                    onClick={() => handlePurchase(item.id)}
                    disabled={!canAfford}
                    className={`flex items-center space-x-1 rounded-xl px-3 py-1.5 font-bold text-xs transition-all active:scale-95 shadow-md ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                    }`}
                  >
                    <span>BUY ITEM</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Earn More Coins Hint */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 text-center">
          <p className="text-xs text-slate-400">
            💡 <strong className="text-amber-300">How to earn coins:</strong> Clear levels (+15 to +40 coins), defeat bosses (+60 to +150 coins), or achieve 3 Stars on challenges!
          </p>
        </div>

      </div>
    </div>
  );
};
