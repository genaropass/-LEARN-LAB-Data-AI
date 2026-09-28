export type NodeType = 'lesson' | 'practice' | 'challenge' | 'boss' | 'project' | 'mastery';

export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Exercise {
  id: string;
  nodeId: string;
  title: string;
  prompt: string;
  businessContext?: string;
  targetTables: string[];
  initialQuery?: string;
  expectedQuery: string;
  hints: string[];
  pedagogicalFeedback: string;
  conceptNotes?: string[];
  xp: number;
}

export interface BossStage {
  stageNumber: number;
  title: string;
  scenario: string;
  objective: string;
  expectedQuery: string;
  hints: string[];
  pedagogicalNote: string;
  xpReward: number;
}

export interface BossScenario {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  description: string;
  datasetContext: string;
  stages: BossStage[];
  totalHp: number;
  xpReward: number;
  unlockedRegionTitle: string;
}

export interface ProjectTask {
  id: string;
  taskNumber: number;
  title: string;
  question: string;
  businessObjective: string;
  expectedQuery: string;
  hints: string[];
  explanation: string;
  xp: number;
}

export interface CapstoneProject {
  id: string;
  nodeId: string;
  title: string;
  role: string;
  company: string;
  mission: string;
  datasetOverview: string;
  tasks: ProjectTask[];
  rewardTitle: string;
  xpReward: number;
}

export interface LearningNode {
  id: string;
  regionId: string;
  skillId: string;
  order: number;
  title: string;
  shortDescription: string;
  type: NodeType;
  xpReward: number;
  prerequisites: string[]; // Node IDs required before unlocking
  position: { x: number; y: number }; // Relative coordinates on the adventure map (0-100%)
  lessonContent?: {
    summary: string;
    syntax: string;
    keyPoints: string[];
    codeExample: string;
  };
  exerciseIds?: string[];
  bossId?: string;
  projectId?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

export interface Region {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  requiredXpToAccess: number;
  accentColor: string;
  bossNodeId?: string;
}
