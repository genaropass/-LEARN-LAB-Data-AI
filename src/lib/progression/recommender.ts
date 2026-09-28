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
        title: 'Capstone Mission Ready',
        reason: 'You have cleared all preceding challenges. Synthesize your relational skills in the Final Analytics Project.',
        targetNodeId: projectNode.id,
        targetNodeTitle: projectNode.title,
        actionLabel: 'Launch Final Project'
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
      title: 'Arena Gate Open',
      reason: `You have cleared the prerequisite curriculum. Test your analytical endurance against ${pendingBoss.title}.`,
      targetNodeId: pendingBoss.id,
      targetNodeTitle: pendingBoss.title,
      actionLabel: 'Enter Boss Arena'
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
        title: `Reinforce ${developingSkill.name}`,
        reason: `Your ${developingSkill.name} mastery is currently at ${developingSkill.percentage}%. Cementing this foundation will prevent bottlenecks ahead.`,
        targetNodeId: uncompletedPracticeInSkill.id,
        targetNodeTitle: uncompletedPracticeInSkill.title,
        actionLabel: 'Practice Weakest Skill'
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
      title: 'Continue Adventure',
      reason: `Advance along your learning path into ${nextUnlocked.title}.`,
      targetNodeId: nextUnlocked.id,
      targetNodeTitle: nextUnlocked.title,
      actionLabel: `Start ${nextUnlocked.title}`
    };
  }

  // If all completed:
  const firstNode = allNodes[0];
  return {
    type: 'next_node',
    title: 'Curriculum Mastered',
    reason: 'You have conquered the entire SQL World! Review any node to keep your analytical reflexes sharp.',
    targetNodeId: firstNode ? firstNode.id : '',
    targetNodeTitle: 'World Complete',
    actionLabel: 'Replay Curriculum'
  };
}
