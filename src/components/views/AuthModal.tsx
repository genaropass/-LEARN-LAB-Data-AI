'use client';

import React, { useState } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { X, Shield, Lock, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { profile } = useGameState();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(profile.username);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    sfx.playClick();

    const supabase = getSupabase();
    if (!supabase) {
      // Local Guest profile update
      profile.username = username;
      localStorage.setItem('learnlab_profile_v2', JSON.stringify(profile));
      setMessage('¡Nombre de explorador actualizado! Tu progreso se guarda automáticamente en tu navegador.');
      setIsLoading(false);
      setTimeout(() => {
        onClose();
      }, 1500);
      return;
    }

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        });
        if (error) throw error;
        setMessage('¡Registro completado! Revisa tu bandeja de entrada para verificar tu cuenta.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setMessage('¡Sesión iniciada con éxito! Sincronizando progreso en la nube...');
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessage(`Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl border-4 border-amber-400 bg-slate-900 p-6 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-black"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-amber-400 bg-amber-400/20 text-amber-300">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-lg text-white">
              {isSupabaseConfigured
                ? mode === 'login' ? 'Iniciar Sesión en Learn-Lab' : 'Crear Perfil en la Nube'
                : 'Perfil de Jugador & Ajustes'}
            </h3>
          </div>
        </div>

        {/* Cloud Config Notice */}
        {!isSupabaseConfigured && (
          <div className="mt-3 rounded-2xl border-2 border-amber-400/40 bg-amber-950/20 p-3.5 text-xs text-amber-200 leading-relaxed font-sans font-medium">
            <span className="font-black font-mono text-amber-300 block mb-0.5">
              🎮 MODO AVENTURA LOCAL ACTIVO
            </span>
            Tus 100 niveles, monedas ganadas, poderes y racha se guardan de forma segura y permanente en tu navegador local.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1 font-bold">
              Nombre del Explorador
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none font-bold"
                placeholder="Genaro"
              />
            </div>
          </div>

          {isSupabaseConfigured && (
            <>
              <div>
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1 font-bold">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    placeholder="explorador@data.io"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1 font-bold">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </>
          )}

          {message && (
            <div className="rounded-xl bg-slate-950 border-2 border-amber-400/50 p-3 text-xs text-amber-200 font-bold">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-mario w-full flex items-center justify-center space-x-2 py-3 text-sm font-black disabled:opacity-50"
          >
            <span>{isSupabaseConfigured ? (mode === 'login' ? 'Iniciar Sesión' : 'Registrar Cuenta') : 'Guardar Nombre'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {isSupabaseConfigured && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-bold"
            >
              {mode === 'login' ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
