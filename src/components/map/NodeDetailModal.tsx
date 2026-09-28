'use client';

import React from 'react';
import { LearningNode, NodeStatus } from '@/types/curriculum';
import { 
  X, 
  Play, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Code2, 
  Skull, 
  Briefcase, 
  Sparkles,
  Lock
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

interface NodeDetailModalProps {
  node: LearningNode | null;
  status: NodeStatus;
  onClose: () => void;
  onLaunch: () => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  status,
  onClose,
  onLaunch
}) => {
  if (!node) return null;

  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';

  const handleStart = () => {
    sfx.playClick();
    onLaunch();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B0F17] p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Node Badge */}
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border ${
            node.type === 'boss'
              ? 'border-red-500/40 bg-red-950/30 text-red-400'
              : node.type === 'project'
              ? 'border-amber-500/40 bg-amber-950/30 text-amber-400'
              : 'border-cyan-500/40 bg-cyan-950/30 text-cyan-400'
          }`}>
            <span>{node.type.toUpperCase()}</span>
          </span>

          {isCompleted && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>COMPLETED</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-xl font-extrabold text-white tracking-tight">
          {node.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          {node.shortDescription}
        </p>

        {/* Lesson Points Preview if available */}
        {node.lessonContent && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Curriculum Core Syntax
            </span>
            <pre className="font-mono text-xs text-amber-300 overflow-x-auto p-2 rounded bg-[#070A0F] border border-slate-800/80">
              {node.lessonContent.syntax}
            </pre>
          </div>
        )}

        {/* XP Reward Chip */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Analytical Mastery Reward</span>
          </div>
          <span className="font-mono text-xs font-bold text-amber-400">
            +{node.xpReward} XP
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center space-x-3">
          {isLocked ? (
            <div className="w-full flex items-center justify-center space-x-2 rounded-xl border border-slate-800 bg-slate-900 py-3 text-xs font-bold text-slate-500 cursor-not-allowed">
              <Lock className="h-4 w-4" />
              <span>Complete Prerequisites to Unlock</span>
            </div>
          ) : (
            <button
              onClick={handleStart}
              className={`w-full flex items-center justify-center space-x-2 rounded-xl py-3 text-sm font-bold text-slate-950 transition-all shadow-lg active:scale-95 ${
                node.type === 'boss'
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
              }`}
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{isCompleted ? 'Review & Practice Again' : 'Enter Challenge'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
