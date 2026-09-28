import type { Metadata } from 'next';
import './globals.css';
import { GameStateProvider } from '@/context/GameStateContext';
import { TopNav } from '@/components/layout/TopNav';
import { AchievementToast } from '@/components/gamification/AchievementToast';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';

export const metadata: Metadata = {
  title: 'Learn-Lab | Data & AI — SQL World',
  description: 'Gamified interactive learning world for professional SQL and data engineering skills.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased bg-[#070A0F] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <body className="min-h-full flex flex-col bg-[#070A0F]">
        <GameStateProvider>
          <TopNav />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <AchievementToast />
          <LevelUpCelebration />
        </GameStateProvider>
      </body>
    </html>
  );
}
