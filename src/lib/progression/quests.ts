import { DailyQuest } from '@/types/gamification';

export function getDailyQuests(completedCount = 0): DailyQuest[] {
  return [
    {
      id: 'quest_1',
      title: 'Active Ingestion',
      description: 'Complete at least 1 SQL lesson or concept node today.',
      category: 'lesson',
      target: 1,
      current: Math.min(1, completedCount),
      xpReward: 30,
      completed: completedCount >= 1
    },
    {
      id: 'quest_2',
      title: 'Terminal Practice',
      description: 'Solve 3 hands-on SQL query challenges.',
      category: 'exercises',
      target: 3,
      current: Math.min(3, completedCount),
      xpReward: 50,
      completed: completedCount >= 3
    },
    {
      id: 'quest_3',
      title: 'Deep Focus',
      description: 'Tackle a Boss Stage, Project task, or reinforce your weakest skill.',
      category: 'mastery',
      target: 1,
      current: completedCount > 0 ? 1 : 0,
      xpReward: 40,
      completed: completedCount > 0
    }
  ];
}
