'use client';

import React from 'react';
import { useGameState } from '@/context/GameStateContext';
import { WorldMap } from '@/components/map/WorldMap';
import { DashboardView } from '@/components/views/DashboardView';
import { ProfileView } from '@/components/views/ProfileView';

export default function HomePage() {
  const { activeView } = useGameState();

  return (
    <div className="flex-1 flex flex-col">
      {activeView === 'world' && <WorldMap />}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'profile' && <ProfileView />}
    </div>
  );
}
