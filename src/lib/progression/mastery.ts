import { SkillMastery } from '@/types/gamification';

export interface SkillCategoryDef {
  id: string;
  name: string;
  weight: number;
}

export const SKILL_CATEGORIES: SkillCategoryDef[] = [
  { id: 'foundations', name: 'SELECT y Filtrado', weight: 1.0 },
  { id: 'aggregation', name: 'GROUP BY y Agregaciones', weight: 1.0 },
  { id: 'joins', name: 'JOINs Relacionales', weight: 1.2 },
  { id: 'logic', name: 'CASE WHEN y Lógica Condicional', weight: 1.0 },
  { id: 'manipulation', name: 'Transformación de Fechas y Textos', weight: 1.0 },
  { id: 'subqueries', name: 'Subconsultas y EXISTS', weight: 1.2 },
  { id: 'ctes', name: 'CTEs y Pipelines con WITH', weight: 1.3 },
  { id: 'windows', name: 'Funciones Ventana Analíticas', weight: 1.5 }
];

export function computeMasteryStatus(percentage: number): SkillMastery['levelStatus'] {
  if (percentage === 0) return 'Locked';
  if (percentage < 35) return 'Novice';
  if (percentage < 70) return 'Developing';
  if (percentage < 95) return 'Advanced';
  return 'Mastered';
}

export function calculateSkillMasteries(
  completedNodeIds: Set<string>,
  nodeSkillMapping: Record<string, string>
): SkillMastery[] {
  // Count total nodes vs completed per skill
  const skillCounts: Record<string, { total: number; completed: number }> = {};

  SKILL_CATEGORIES.forEach(cat => {
    skillCounts[cat.id] = { total: 0, completed: 0 };
  });

  Object.entries(nodeSkillMapping).forEach(([nodeId, skillId]) => {
    if (skillCounts[skillId]) {
      skillCounts[skillId].total += 1;
      if (completedNodeIds.has(nodeId)) {
        skillCounts[skillId].completed += 1;
      }
    }
  });

  return SKILL_CATEGORIES.map(cat => {
    const counts = skillCounts[cat.id] || { total: 1, completed: 0 };
    const percentage = counts.total > 0
      ? Math.min(100, Math.round((counts.completed / counts.total) * 100))
      : 0;

    return {
      skillId: cat.id,
      name: cat.name,
      percentage,
      exercisesCompleted: counts.completed,
      totalExercises: counts.total,
      levelStatus: computeMasteryStatus(percentage)
    };
  });
}
