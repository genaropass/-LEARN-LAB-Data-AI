import { Achievement } from '@/types/gamification';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_query',
    title: 'First Query Executed',
    description: 'Construct and execute your first successful SQL statement in the lab.',
    icon: 'Target',
    category: 'progression'
  },
  {
    id: 'foundation_complete',
    title: 'Relational Explorer',
    description: 'Master core SQL Foundations (SELECT, WHERE, ORDER BY, LIMIT).',
    icon: 'Compass',
    category: 'mastery'
  },
  {
    id: 'first_boss',
    title: 'Boss Vanquished: Sales Intel',
    description: 'Defeat SQL Boss #01 by solving the multi-stage business investigation.',
    icon: 'Trophy',
    category: 'boss'
  },
  {
    id: 'joins_virtuoso',
    title: 'Bridge Builder',
    description: 'Execute multi-table relational joins with precision and accuracy.',
    icon: 'Link',
    category: 'mastery'
  },
  {
    id: 'second_boss',
    title: 'Cohort Commander',
    description: 'Defeat SQL Boss #02 by dissecting subscription retention cohorts.',
    icon: 'ShieldAlert',
    category: 'boss'
  },
  {
    id: 'window_wizard',
    title: 'Analytical Maestro',
    description: 'Successfully partition and rank temporal data using Window Functions.',
    icon: 'Zap',
    category: 'mastery'
  },
  {
    id: 'capstone_master',
    title: 'Certified SQL Architect',
    description: 'Complete the comprehensive Final E-Commerce Analytics Project.',
    icon: 'Award',
    category: 'progression'
  },
  {
    id: 'streak_flame',
    title: 'Continuous Momentum',
    description: 'Maintain an active daily learning streak in Learn-Lab.',
    icon: 'Flame',
    category: 'streak'
  }
];
