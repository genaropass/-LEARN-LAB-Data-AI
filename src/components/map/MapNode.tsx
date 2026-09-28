'use client';

import React from 'react';
import { LearningNode, NodeStatus } from '@/types/curriculum';
import { 
  Check, 
  Lock, 
  Skull, 
  Award, 
  Flame, 
  Code2, 
  BookOpen, 
  Sparkles,
  Trophy,
  Swords,
  ChevronRight
} from 'lucide-react';

interface MapNodeProps {
  node: LearningNode;
  status: NodeStatus;
  isCurrentTarget?: boolean;
  onClick: () => void;
}

export const MapNode: React.FC<MapNodeProps> = ({
  node,
  status,
  isCurrentTarget = false,
  onClick
}) => {
  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';
  const isAvailable = status === 'available' || status === 'in_progress';

  // Different shapes & visual identities based on node type
  if (node.type === 'boss') {
    return (
      <div
        onClick={isLocked ? undefined : onClick}
        style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
          isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105 active:scale-95'
        }`}
      >
        <div className={`relative flex flex-col items-center group`}>
          {/* Boss Arena Frame */}
          <div
            className={`relative flex items-center justify-center rounded-2xl border-2 px-5 py-3 transition-all ${
              isCompleted
                ? 'border-emerald-500 bg-emerald-950/80 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                : isLocked
                ? 'border-slate-800 bg-slate-950/90 text-slate-600'
                : 'border-red-500 bg-gradient-to-b from-red-950/90 to-black shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                isCompleted
                  ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                  : isLocked
                  ? 'border-slate-800 bg-slate-900 text-slate-600'
                  : 'border-red-500/50 bg-red-500/20 text-red-400'
              }`}>
                {isCompleted ? (
                  <Trophy className="h-5 w-5" />
                ) : isLocked ? (
                  <Lock className="h-5 w-5" />
                ) : (
                  <Skull className="h-5 w-5" />
                )}
              </div>

              <div className="text-left">
                <span className={`font-mono text-[9px] font-extrabold uppercase tracking-widest ${
                  isCompleted ? 'text-emerald-400' : isLocked ? 'text-slate-500' : 'text-red-400'
                }`}>
                  BOSS ARENA
                </span>
                <h4 className="font-extrabold text-sm text-white tracking-tight leading-none mt-0.5">
                  {node.title}
                </h4>
                <span className="font-mono text-[10px] text-amber-400 font-bold mt-1 block">
                  +{node.xpReward} XP
                </span>
              </div>
            </div>

            {/* Current Target Indicator */}
            {isCurrentTarget && (
              <span className="absolute -top-3 right-3 flex items-center space-x-1 rounded-full bg-red-600 px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-md uppercase">
                <span>ACTIVE BOSS</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (node.type === 'project') {
    return (
      <div
        onClick={isLocked ? undefined : onClick}
        style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
          isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105 active:scale-95'
        }`}
      >
        <div className="relative flex flex-col items-center group">
          <div
            className={`relative flex items-center justify-center rounded-2xl border-2 px-6 py-3.5 transition-all ${
              isCompleted
                ? 'border-amber-400 bg-amber-950/80 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
                : isLocked
                ? 'border-slate-800 bg-slate-950/90 text-slate-600'
                : 'border-amber-500 bg-gradient-to-b from-amber-950/90 to-black shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/50 bg-amber-500/20 text-amber-300 shadow-sm">
                <Award className="h-6 w-6" />
              </div>

              <div className="text-left">
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-amber-400">
                  FINAL CAPSTONE MISSION
                </span>
                <h4 className="font-extrabold text-sm text-white tracking-tight leading-none mt-0.5">
                  {node.title}
                </h4>
                <span className="font-mono text-[10px] text-amber-300 font-bold mt-1 block">
                  +{node.xpReward} XP • SQL Master Title
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Learning Nodes: Lesson (Circle), Practice (Diamond), Challenge (Hexagon)
  return (
    <div
      onClick={isLocked ? undefined : onClick}
      style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
        isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110 active:scale-95'
      }`}
    >
      <div className="relative flex flex-col items-center group">
        
        {/* Beacon Ring if current target */}
        {isCurrentTarget && (
          <div className="absolute -inset-2 rounded-full border-2 border-amber-400/80 animate-ping opacity-75 pointer-events-none" />
        )}

        {/* Node Icon Container */}
        <div
          className={`relative flex items-center justify-center transition-all ${
            node.type === 'challenge'
              ? 'h-14 w-14 rounded-2xl rotate-45'
              : node.type === 'practice'
              ? 'h-13 w-13 rounded-xl rotate-12'
              : 'h-13 w-13 rounded-full'
          } ${
            isCompleted
              ? 'border-2 border-emerald-400 bg-emerald-950/90 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
              : isLocked
              ? 'border-2 border-slate-800 bg-[#0B0F17] text-slate-600'
              : 'border-2 border-amber-400 bg-slate-900 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          }`}
        >
          {/* Inner Glyph Un-rotated */}
          <div className={node.type === 'challenge' ? '-rotate-45' : node.type === 'practice' ? '-rotate-12' : ''}>
            {isCompleted ? (
              <Check className="h-5 w-5 stroke-[2.5]" />
            ) : isLocked ? (
              <Lock className="h-4 w-4" />
            ) : node.type === 'lesson' ? (
              <BookOpen className="h-4 w-4 text-amber-300" />
            ) : node.type === 'challenge' ? (
              <Code2 className="h-4 w-4 text-amber-300" />
            ) : (
              <Sparkles className="h-4 w-4 text-amber-300" />
            )}
          </div>
        </div>

        {/* Node Label Capsule */}
        <div className="mt-2 text-center pointer-events-none">
          <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-tight border backdrop-blur-sm ${
            isCompleted
              ? 'border-emerald-500/30 bg-emerald-950/80 text-emerald-300'
              : isLocked
              ? 'border-slate-800 bg-slate-950/80 text-slate-500'
              : 'border-amber-500/40 bg-slate-950/90 text-amber-300 shadow-sm'
          }`}>
            {node.title}
          </span>
        </div>

      </div>
    </div>
  );
};
