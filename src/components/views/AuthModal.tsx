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
      localStorage.setItem('learnlab_profile_v1', JSON.stringify(profile));
      setMessage('Guest profile updated! Connect Supabase credentials in .env.local for cloud syncing.');
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
        setMessage('Registration successful! Please check your email inbox to confirm your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setMessage('Login successful! Syncing cloud progress...');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B0F17] p-6 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">
              {isSupabaseConfigured
                ? mode === 'login' ? 'Sign In to Learn-Lab' : 'Create Cloud Profile'
                : 'Player Profile & Cloud Setup'}
            </h3>
          </div>
        </div>

        {/* Cloud Config Notice */}
        {!isSupabaseConfigured && (
          <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200 leading-relaxed font-sans">
            <span className="font-bold font-mono text-amber-400 block mb-0.5">
              OFFLINE / GUEST MODE ACTIVE
            </span>
            All XP, levels, streak, and curriculum progress persist automatically in your browser storage. To enable multi-device sync, connect your Supabase project keys in <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">.env.local</code>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Explorer Codename
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                placeholder="Genaro"
              />
            </div>
          </div>

          {isSupabaseConfigured && (
            <>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    placeholder="explorer@data.io"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </>
          )}

          {message && (
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-cyan-300">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <span>{isSupabaseConfigured ? (mode === 'login' ? 'Sign In' : 'Register Account') : 'Save Profile Name'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {isSupabaseConfigured && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
