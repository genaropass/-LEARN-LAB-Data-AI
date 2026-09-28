'use client';

import React, { useState, useMemo } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { SQL_LEARNING_NODES } from '@/content/data-ai/sql/nodes';
import { SQL_REGIONS } from '@/content/data-ai/sql/regions';
import { LearningNode, NodeStatus } from '@/types/curriculum';
import { MapNode } from './MapNode';
import { NodeDetailModal } from './NodeDetailModal';
import { ExerciseLab } from '../learning/ExerciseLab';
import { BossArena } from '../learning/BossArena';
import { ProjectWorkspace } from '../learning/ProjectWorkspace';
import { getSmartNextStep } from '@/lib/progression/recommender';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Trophy, 
  Flame,
  Award
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

export const WorldMap: React.FC = () => {
  const { 
    completedNodes, 
    unlockedNodes, 
    masteries, 
    activeNodeId, 
    setActiveNodeId 
  } = useGameState();

  const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInteractiveNode, setActiveInteractiveNode] = useState<LearningNode | null>(null);

  // Compute Smart Next Step
  const nextStep = useMemo(() => {
    return getSmartNextStep(SQL_LEARNING_NODES, completedNodes, masteries);
  }, [completedNodes, masteries]);

  // Overall Completion stats
  const completedCount = completedNodes.size;
  const totalCount = SQL_LEARNING_NODES.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const handleNodeClick = (node: LearningNode) => {
    sfx.playClick();
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleLaunchNode = (node: LearningNode) => {
    setIsModalOpen(false);
    setActiveInteractiveNode(node);
  };

  // Generate SVG Path Connections between nodes
  const pathConnections = useMemo(() => {
    const nodeMap = new Map<string, LearningNode>();
    SQL_LEARNING_NODES.forEach(n => nodeMap.set(n.id, n));

    const connections: {
      fromId: string;
      toId: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      isCompleted: boolean;
      isAvailable: boolean;
    }[] = [];

    SQL_LEARNING_NODES.forEach(toNode => {
      toNode.prerequisites.forEach(fromId => {
        const fromNode = nodeMap.get(fromId);
        if (fromNode) {
          const isCompleted = completedNodes.has(fromNode.id) && completedNodes.has(toNode.id);
          const isAvailable = completedNodes.has(fromNode.id) && unlockedNodes.has(toNode.id);
          connections.push({
            fromId: fromNode.id,
            toId: toNode.id,
            x1: fromNode.position.x,
            y1: fromNode.position.y,
            x2: toNode.position.x,
            y2: toNode.position.y,
            isCompleted,
            isAvailable
          });
        }
      });
    });

    return connections;
  }, [completedNodes, unlockedNodes]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#070A0F] text-slate-100 overflow-x-hidden pb-24">
      
      {/* Background Cartographic Grid / Depth Texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#F59E0B 1px, transparent 1px), radial-gradient(#06B6D4 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* Sticky Journey Overview Banner */}
      <div className="sticky top-16 z-20 border-b border-slate-800/80 bg-[#090D14]/90 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Progress Metrics */}
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                  SQL WORLD CAMPAIGN
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-xs text-slate-400">
                  {completedCount} / {totalCount} Nodes Conquered
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <div className="h-2 w-36 sm:w-48 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {completionPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Smart Next Step Action Button */}
          {nextStep.targetNodeId && (
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <div className="hidden lg:block text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  RECOMMENDED NEXT OBJECTIVE:
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  {nextStep.title}
                </span>
              </div>
              <button
                onClick={() => {
                  const target = SQL_LEARNING_NODES.find(n => n.id === nextStep.targetNodeId);
                  if (target) {
                    handleNodeClick(target);
                  }
                }}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] active:scale-95"
              >
                <span>{nextStep.actionLabel}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Main Adventure Route Canvas */}
      <div className="relative mx-auto max-w-4xl px-4 py-8">
        
        {/* Route Container with defined height for 100% relative coordinates */}
        <div className="relative w-full h-[2200px]">
          
          {/* SVG Connection Paths Overlay */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-completed" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-available" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {pathConnections.map((conn, idx) => {
              // Convert percentage coordinates to viewBox percentage curves
              const x1 = conn.x1;
              const y1 = conn.y1;
              const x2 = conn.x2;
              const y2 = conn.y2;
              const midY = (y1 + y2) / 2;

              // Cubic Bezier curve path string in SVG
              const pathData = `M ${x1}% ${y1}% C ${x1}% ${midY}%, ${x2}% ${midY}%, ${x2}% ${y2}%`;

              return (
                <g key={idx}>
                  {/* Subtle shadow glow for active path */}
                  {conn.isAvailable && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="6"
                      strokeOpacity="0.2"
                      strokeLinecap="round"
                    />
                  )}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={
                      conn.isCompleted
                        ? '#10B981'
                        : conn.isAvailable
                        ? '#F59E0B'
                        : '#1E293B'
                    }
                    strokeWidth={conn.isCompleted || conn.isAvailable ? '3' : '2'}
                    strokeDasharray={conn.isAvailable && !conn.isCompleted ? '6,6' : 'none'}
                    strokeLinecap="round"
                    className={conn.isAvailable && !conn.isCompleted ? 'animate-pulse' : ''}
                  />
                </g>
              );
            })}
          </svg>

          {/* Regional Banners & Milestones along the canvas */}
          {SQL_REGIONS.map((region) => {
            let topPosition = 0;
            if (region.number === 1) topPosition = 0.5;
            else if (region.number === 2) topPosition = 29.5;
            else if (region.number === 3) topPosition = 53.0;
            else if (region.number === 4) topPosition = 62.5;
            else if (region.number === 5) topPosition = 78.5;

            return (
              <div
                key={region.id}
                style={{ top: `${topPosition}%` }}
                className="absolute left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none px-4"
              >
                <div className="flex items-center justify-center space-x-3 rounded-xl border border-slate-800/80 bg-[#090D14]/90 px-4 py-2 backdrop-blur-md shadow-lg">
                  <div 
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: region.accentColor }}
                  />
                  <div className="text-center">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      REGION 0{region.number}
                    </span>
                    <h3 className="font-bold text-xs text-white tracking-tight">
                      {region.title} — {region.subtitle}
                    </h3>
                  </div>
                  <div 
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: region.accentColor }}
                  />
                </div>
              </div>
            );
          })}

          {/* Render All Adventure Map Nodes */}
          {SQL_LEARNING_NODES.map((node) => {
            const isCompleted = completedNodes.has(node.id);
            const isUnlocked = unlockedNodes.has(node.id);
            const isCurrent = node.id === nextStep.targetNodeId;

            let status: NodeStatus = 'locked';
            if (isCompleted) status = 'completed';
            else if (isUnlocked) status = 'available';

            return (
              <MapNode
                key={node.id}
                node={node}
                status={status}
                isCurrentTarget={isCurrent}
                onClick={() => handleNodeClick(node)}
              />
            );
          })}

        </div>

      </div>

      {/* Node Preview Modal */}
      {isModalOpen && selectedNode && (
        <NodeDetailModal
          node={selectedNode}
          status={
            completedNodes.has(selectedNode.id)
              ? 'completed'
              : unlockedNodes.has(selectedNode.id)
              ? 'available'
              : 'locked'
          }
          onClose={() => setIsModalOpen(false)}
          onLaunch={() => handleLaunchNode(selectedNode)}
        />
      )}

      {/* Active Interactive Mode (Exercise Lab, Boss Arena, or Project Workspace) */}
      {activeInteractiveNode && (
        <>
          {activeInteractiveNode.type === 'boss' ? (
            <BossArena
              node={activeInteractiveNode}
              onClose={() => setActiveInteractiveNode(null)}
            />
          ) : activeInteractiveNode.type === 'project' ? (
            <ProjectWorkspace
              node={activeInteractiveNode}
              onClose={() => setActiveInteractiveNode(null)}
            />
          ) : (
            <ExerciseLab
              node={activeInteractiveNode}
              onClose={() => setActiveInteractiveNode(null)}
            />
          )}
        </>
      )}

    </div>
  );
};
