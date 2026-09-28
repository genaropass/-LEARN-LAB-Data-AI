import { DailyQuest } from '@/types/gamification';

export function getDailyQuests(completedCount = 0): DailyQuest[] {
  return [
    {
      id: 'quest_1',
      title: 'Active Ingestion',
      description: 'Complete at least 1 SQL level or concept challenge today.',
      category: 'lesson',
      target: 1,
      current: Math.min(1, completedCount),
      xpReward: 30,
      coinReward: 15,
      completed: completedCount >= 1
    },
    {
      id: 'quest_2',
      title: 'Mario Pathway Dash',
      description: 'Solve 3 hands-on SQL query levels.',
      category: 'exercises',
      target: 3,
      current: Math.min(3, completedCount),
      xpReward: 50,
      coinReward: 25,
      completed: completedCount >= 3
    },
    {
      id: 'quest_3',
      title: 'Deep Focus & Boss Defense',
      description: 'Conquer a Fortress Boss level or maintain your 3-star streak.',
      category: 'mastery',
      target: 1,
      current: completedCount > 0 ? 1 : 0,
      xpReward: 40,
      coinReward: 20,
      completed: completedCount > 0
    }
  ];
}
