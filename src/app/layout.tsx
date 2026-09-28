import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';
import { GameStateProvider } from '@/context/GameStateContext';
import { TopNav } from '@/components/layout/TopNav';
import { AchievementToast } from '@/components/gamification/AchievementToast';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka'
});

export const metadata: Metadata = {
  title: 'Learn-Lab | Mundo de Datos & SQL',
  description: 'Aventura gamificada interactiva para dominar SQL al estilo Super Mario y Duolingo.',
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
    <html lang="es" className={`${fredoka.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col bg-[#0b172a] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
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
