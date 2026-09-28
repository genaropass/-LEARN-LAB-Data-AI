import { Region } from '@/types/curriculum';

export const SQL_REGIONS: Region[] = [
  {
    id: 'region_foundations',
    number: 1,
    title: 'The Relational Plains',
    subtitle: 'SQL Foundations & Row Filtering',
    description: 'Master core projection, predicate filtering, ordering, and deduplication of relational datasets.',
    requiredXpToAccess: 0,
    accentColor: '#10B981' // Emerald
  },
  {
    id: 'region_aggregation',
    number: 2,
    title: 'The Aggregation Valley',
    subtitle: 'Groupings, Metrics & Boss #01',
    description: 'Transform granular row-level transactions into executive summary metrics and defeat the first analytical boss.',
    requiredXpToAccess: 100,
    accentColor: '#F59E0B', // Amber Gold
    bossNodeId: 'boss_01_sales'
  },
  {
    id: 'region_joins',
    number: 3,
    title: 'The Relational Bridges',
    subtitle: 'Multi-Table Joins & Schema Traversal',
    description: 'Connect disparate entities through primary and foreign keys using INNER, LEFT, and SELF joins.',
    requiredXpToAccess: 260,
    accentColor: '#06B6D4' // Cyan
  },
  {
    id: 'region_logic_transform',
    number: 4,
    title: 'The Logic Citadel',
    subtitle: 'CASE Expressions, Dates & Subqueries',
    description: 'Implement conditional branching, temporal aggregations, and nested subquery evaluations.',
    requiredXpToAccess: 450,
    accentColor: '#8B5CF6' // Purple
  },
  {
    id: 'region_advanced_analytics',
    number: 5,
    title: 'The Apex Observatory',
    subtitle: 'CTEs, Window Functions, Boss #02 & Capstone',
    description: 'Architect complex analytical pipelines with CTEs, compute rolling metrics with Window Functions, and execute the final capstone assignment.',
    requiredXpToAccess: 700,
    accentColor: '#EC4899', // Pink / Rose
    bossNodeId: 'boss_02_cohorts'
  }
];
