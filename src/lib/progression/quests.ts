import { DailyQuest } from '@/types/gamification';

export function getDailyQuests(completedCount = 0): DailyQuest[] {
  return [
    {
      id: 'quest_1',
      title: 'Ingesta Activa',
      description: 'Supera al menos 1 nivel o desafío SQL hoy.',
      category: 'lesson',
      target: 1,
      current: Math.min(1, completedCount),
      xpReward: 30,
      coinReward: 15,
      completed: completedCount >= 1
    },
    {
      id: 'quest_2',
      title: 'Carrera por el Reino',
      description: 'Resuelve 3 consultas SQL interactivas con éxito.',
      category: 'exercises',
      target: 3,
      current: Math.min(3, completedCount),
      xpReward: 50,
      coinReward: 25,
      completed: completedCount >= 3
    },
    {
      id: 'quest_3',
      title: 'Foco y Defensa contra el Jefe',
      description: 'Conquista un Castillo de Jefe o mantén tu racha de 3 estrellas.',
      category: 'mastery',
      target: 1,
      current: completedCount > 0 ? 1 : 0,
      xpReward: 40,
      coinReward: 20,
      completed: completedCount > 0
    }
  ];
}
