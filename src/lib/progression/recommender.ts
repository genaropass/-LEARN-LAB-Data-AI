import { LearningNode } from '@/types/curriculum';
import { SkillMastery } from '@/types/gamification';

export interface NextStepRecommendation {
  type: 'next_node' | 'drill_weakness' | 'boss_battle' | 'capstone';
  title: string;
  reason: string;
  targetNodeId: string;
  targetNodeTitle: string;
  actionLabel: string;
}

export function getSmartNextStep(
  allNodes: LearningNode[],
  completedNodeIds: Set<string>,
  masteries: SkillMastery[]
): NextStepRecommendation {
  // 1. Check if capstone project is available
  const projectNode = allNodes.find(n => n.type === 'project');
  if (projectNode && !completedNodeIds.has(projectNode.id)) {
    const isUnlocked = projectNode.prerequisites.every(p => completedNodeIds.has(p));
    if (isUnlocked) {
      return {
        type: 'capstone',
        title: 'Misión Final Lista',
        reason: 'Has superado todos los desafíos previos. Aplica tus habilidades relacionales en el Proyecto Analítico Final.',
        targetNodeId: projectNode.id,
        targetNodeTitle: projectNode.title,
        actionLabel: 'Iniciar Proyecto Final'
      };
    }
  }

  // 2. Check for unlocked Boss battles that haven't been defeated
  const pendingBoss = allNodes.find(
    n => n.type === 'boss' && !completedNodeIds.has(n.id) && n.prerequisites.every(p => completedNodeIds.has(p))
  );

  if (pendingBoss) {
    return {
      type: 'boss_battle',
      title: 'Puerta del Castillo Abierta',
      reason: `Has superado los niveles previos. Pon a prueba tu destreza analítica contra ${pendingBoss.title}.`,
      targetNodeId: pendingBoss.id,
      targetNodeTitle: pendingBoss.title,
      actionLabel: 'Entrar a la Fortaleza del Jefe'
    };
  }

  // 3. Check for any weak skill that is between 1% and 65% and has available practice
  const developingSkill = masteries.find(m => m.percentage > 0 && m.percentage < 70);
  if (developingSkill) {
    const uncompletedPracticeInSkill = allNodes.find(
      n => n.skillId === developingSkill.skillId &&
           !completedNodeIds.has(n.id) &&
           n.prerequisites.every(p => completedNodeIds.has(p))
    );

    if (uncompletedPracticeInSkill) {
      return {
        type: 'drill_weakness',
        title: `Reforzar ${developingSkill.name}`,
        reason: `Tu dominio en ${developingSkill.name} está al ${developingSkill.percentage}%. Reforzar esta base te garantizará el éxito en los mundos siguientes.`,
        targetNodeId: uncompletedPracticeInSkill.id,
        targetNodeTitle: uncompletedPracticeInSkill.title,
        actionLabel: 'Practicar Habilidad'
      };
    }
  }

  // 4. Default: Find the next unlocked node in sequence
  const nextUnlocked = allNodes.find(
    n => !completedNodeIds.has(n.id) && n.prerequisites.every(p => completedNodeIds.has(p))
  );

  if (nextUnlocked) {
    return {
      type: 'next_node',
      title: 'Continuar Aventura',
      reason: `Avanza en tu camino hacia ${nextUnlocked.title}.`,
      targetNodeId: nextUnlocked.id,
      targetNodeTitle: nextUnlocked.title,
      actionLabel: `Iniciar ${nextUnlocked.title}`
    };
  }

  // If all completed:
  const firstNode = allNodes[0];
  return {
    type: 'next_node',
    title: 'Plan Conquistado',
    reason: '¡Has conquistado todo el Reino SQL! Repasa cualquier nivel para mantener tus reflejos analíticos al máximo.',
    targetNodeId: firstNode ? firstNode.id : '',
    targetNodeTitle: 'Mundo Completado',
    actionLabel: 'Volver a Jugar'
  };
}
