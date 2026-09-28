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
  Sparkles
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

interface PowerUpShopModalProps {
  onClose: () => void;
}

const ITEMS_ES: Record<string, { name: string; description: string }> = {
  hint_scroll: {
    name: 'Pergamino de Sabiduría',
    description: 'Desbloquea instantáneamente la siguiente pista táctica sin gastar tus intentos de ayuda.'
  },
  sql_blueprint: {
    name: 'Plano de Sintaxis SQL',
    description: 'Inyecta automáticamente en tu editor la estructura de consulta con las cláusulas y tablas correctas.'
  },
  streak_shield: {
    name: 'Escudo de Racha',
    description: 'Protege tu racha de días activos contra interrupciones si no puedes practicar un día.'
  },
  master_key: {
    name: 'Llave Maestra de Thoth',
    description: 'Revela la consulta de referencia profesional de inmediato para analizar la solución exacta.'
  }
};

export const PowerUpShopModal: React.FC<PowerUpShopModalProps> = ({ onClose }) => {
  const { profile, buyPowerUp, inventory } = useGameState();

  const handlePurchase = (powerUpId: string) => {
    const success = buyPowerUp(powerUpId);
    if (!success) {
      alert('¡Monedas insuficientes! Supera más niveles o mantén tu racha diaria para ganar monedas.');
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'hint':
        return <Lightbulb className="h-7 w-7 text-amber-400" />;
      case 'blueprint':
        return <FileCode className="h-7 w-7 text-sky-400" />;
      case 'shield':
        return <Shield className="h-7 w-7 text-emerald-400" />;
      case 'master_key':
        return <Key className="h-7 w-7 text-yellow-400" />;
      default:
        return <Sparkles className="h-7 w-7 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in font-sans">
      <div className="relative w-full max-w-xl rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-[#112344] to-[#0c182c] p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.35)] text-slate-100">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-2xl bg-slate-900 border-2 border-slate-700 p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-[0_2px_0_#1e293b] active:translate-y-1"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado de la Tienda */}
        <div className="flex items-center justify-between border-b-2 border-slate-700/80 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 border-2 border-yellow-200 text-slate-950 shadow-[0_4px_0_#b45309]">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <div>
              <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-amber-300">
                BAZAR MARIO DE PODERES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Tienda de Ayudas &amp; Ítems
              </h2>
            </div>
          </div>

          {/* Saldo de Monedas */}
          <div className="flex items-center space-x-2 rounded-2xl border-3 border-yellow-400 bg-yellow-400/20 px-4 py-2 shadow-[0_3px_0_#ca8a04]">
            <Coins className="h-6 w-6 text-yellow-400 animate-bounce" />
            <span className="font-mono text-lg font-black text-yellow-300">
              {profile.coins}
            </span>
            <span className="text-[10px] font-black text-yellow-400 uppercase hidden sm:inline">
              MONEDAS
            </span>
          </div>
        </div>

        {/* Cuadrícula de Objetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SHOP_POWERUPS.map((item) => {
            const itemEs = ITEMS_ES[item.id] || { name: item.name, description: item.description };
            const owned = inventory[item.id] || 0;
            const canAfford = profile.coins >= item.cost;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border-3 border-slate-700/80 bg-slate-900/90 p-4 transition-all hover:border-amber-400 hover:bg-slate-800/90 group shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 border-2 border-slate-700 group-hover:scale-110 transition-transform shadow-inner">
                      {getIcon(item.category)}
                    </div>
                    {owned > 0 && (
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-400/50 px-2.5 py-0.5 font-mono text-[10px] font-black text-emerald-300">
                        Tienes: {owned}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-black text-sm text-white">
                    {itemEs.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed min-h-[38px] font-medium">
                    {itemEs.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1 font-mono font-black text-yellow-300 text-sm">
                    <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.cost}</span>
                  </div>

                  <button
                    onClick={() => handlePurchase(item.id)}
                    disabled={!canAfford}
                    className={`flex items-center space-x-1 rounded-2xl px-4 py-2 font-black text-xs transition-all active:scale-95 shadow-md ${
                      canAfford
                        ? 'border-2 border-amber-300 bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_3px_0_#b45309]'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <span>CANJEAR</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consejo para Ganar Monedas */}
        <div className="mt-6 rounded-2xl border-2 border-amber-400/40 bg-amber-400/10 p-3.5 text-center">
          <p className="text-xs text-amber-200 font-medium">
            🪙 <strong className="text-yellow-300 font-black">¿Cómo ganar más monedas?</strong> Supera niveles (+15 a +40 monedas), vence a los jefes de castillo (+60 a +150 monedas) o consigue 3 estrellas en cada desafío.
          </p>
        </div>

      </div>
    </div>
  );
};
