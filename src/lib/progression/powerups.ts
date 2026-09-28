import { PowerUpItem } from '@/types/gamification';

export const SHOP_POWERUPS: PowerUpItem[] = [
  {
    id: 'hint_scroll',
    name: 'Scroll of Wisdom',
    description: 'Instantly unlocks the next tactical query hint without using your standard hint attempts.',
    cost: 15,
    icon: 'Lightbulb',
    category: 'hint'
  },
  {
    id: 'sql_blueprint',
    name: 'Syntax Blueprint',
    description: 'Auto-injects the foundational SQL clauses and table aliases directly into your editor.',
    cost: 25,
    icon: 'FileCode',
    category: 'blueprint'
  },
  {
    id: 'streak_shield',
    name: 'Flame Shield',
    description: 'Protects your active daily streak from breaking even if you miss a day.',
    cost: 40,
    icon: 'Shield',
    category: 'shield'
  },
  {
    id: 'master_key',
    name: 'Master Key of Thoth',
    description: 'Unlocks the benchmark solution query immediately to analyze professional syntax.',
    cost: 75,
    icon: 'Key',
    category: 'master_key'
  }
];
