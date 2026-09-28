import { LearningNode } from '@/types/curriculum';

export const SQL_LEARNING_NODES: LearningNode[] = [
  // --- REGION 1: THE RELATIONAL PLAINS ---
  {
    id: 'node_select',
    regionId: 'region_foundations',
    skillId: 'foundations',
    order: 1,
    title: 'SELECT Projection',
    shortDescription: 'Project specific columns from relational tables with zero overhead.',
    type: 'lesson',
    xpReward: 20,
    prerequisites: [],
    position: { x: 50, y: 4 },
    lessonContent: {
      summary: 'The SELECT statement retrieves data from a database. Instead of querying everything with SELECT *, specifying required columns reduces network bandwidth, memory consumption, and I/O bottlenecks.',
      syntax: 'SELECT column1, column2 FROM table_name;',
      keyPoints: [
        'Projection: extracting specific vertical columns',
        'Comma-delimited column lists',
        'FROM clause defines the source table'
      ],
      codeExample: 'SELECT first_name, email FROM customers;'
    },
    exerciseIds: ['ex_select_basic']
  },
  {
    id: 'node_where',
    regionId: 'region_foundations',
    skillId: 'foundations',
    order: 2,
    title: 'WHERE Predicates',
    shortDescription: 'Filter records using comparison and boolean logic operators.',
    type: 'challenge',
    xpReward: 30,
    prerequisites: ['node_select'],
    position: { x: 30, y: 11 },
    lessonContent: {
      summary: 'The WHERE clause filters rows based on a specified boolean condition. Only rows for which the predicate evaluates to TRUE are included in the result set.',
      syntax: 'SELECT column1 FROM table_name WHERE condition1 AND condition2;',
      keyPoints: [
        'Relational operators: =, !=, <, >, <=, >=',
        'Logical operators: AND, OR, NOT',
        'Predicate pushdown maximizes database indexing efficiency'
      ],
      codeExample: 'SELECT name, price FROM products WHERE price > 500 AND stock_quantity < 50;'
    },
    exerciseIds: ['ex_where_filter']
  },
  {
    id: 'node_order_limit',
    regionId: 'region_foundations',
    skillId: 'foundations',
    order: 3,
    title: 'ORDER BY & LIMIT',
    shortDescription: 'Sort output sets and isolate top-N records efficiently.',
    type: 'practice',
    xpReward: 25,
    prerequisites: ['node_select'],
    position: { x: 70, y: 11 },
    lessonContent: {
      summary: 'ORDER BY sorts query results in ascending (ASC) or descending (DESC) order. LIMIT restricts the number of rows returned, which is indispensable for pagination and top-performer rankings.',
      syntax: 'SELECT column1 FROM table_name ORDER BY column1 DESC LIMIT n;',
      keyPoints: [
        'Default ordering is ASC (ascending)',
        'DESC sorts from highest to lowest or latest to earliest',
        'LIMIT stops scanning after n matched rows'
      ],
      codeExample: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5;'
    },
    exerciseIds: ['ex_order_limit']
  },
  {
    id: 'node_distinct',
    regionId: 'region_foundations',
    skillId: 'foundations',
    order: 4,
    title: 'DISTINCT Values',
    shortDescription: 'Deduplicate result sets to identify unique categorical values.',
    type: 'practice',
    xpReward: 20,
    prerequisites: ['node_where', 'node_order_limit'],
    position: { x: 50, y: 18 },
    lessonContent: {
      summary: 'The DISTINCT keyword eliminates duplicate rows from your query output, ensuring every returned tuple represents a unique combination of values.',
      syntax: 'SELECT DISTINCT column1, column2 FROM table_name;',
      keyPoints: [
        'Eliminates duplicate rows from results',
        'Operates on the entire projected column tuple',
        'Frequently paired with ORDER BY for categorical audits'
      ],
      codeExample: 'SELECT DISTINCT country FROM customers ORDER BY country ASC;'
    },
    exerciseIds: ['ex_distinct_countries']
  },
  {
    id: 'node_null',
    regionId: 'region_foundations',
    skillId: 'foundations',
    order: 5,
    title: 'NULL & COALESCE',
    shortDescription: 'Handle missing data safely with fallback defaults.',
    type: 'challenge',
    xpReward: 30,
    prerequisites: ['node_distinct'],
    position: { x: 50, y: 25 },
    lessonContent: {
      summary: 'NULL represents an unknown or missing value in SQL. Because NULL cannot be compared with regular = operators, functions like COALESCE provide crucial fallback values for clean data pipelines.',
      syntax: "COALESCE(column_name, 'Fallback Default')",
      keyPoints: [
        'NULL is not zero or empty string—it signifies absence of value',
        'Use IS NULL and IS NOT NULL for testing',
        'COALESCE returns the first non-null argument'
      ],
      codeExample: "SELECT plan, COALESCE(cancel_date, 'Active') AS status FROM subscriptions;"
    },
    exerciseIds: ['ex_null_handling']
  },

  // --- REGION 2: THE AGGREGATION VALLEY ---
  {
    id: 'node_aggregates',
    regionId: 'region_aggregation',
    skillId: 'aggregation',
    order: 6,
    title: 'Aggregates (COUNT, SUM, AVG)',
    shortDescription: 'Calculate executive metrics across sets of records.',
    type: 'lesson',
    xpReward: 25,
    prerequisites: ['node_null'],
    position: { x: 50, y: 33 },
    lessonContent: {
      summary: 'Aggregate functions summarize multi-row data into single values. COUNT tracks record volume, SUM computes total quantitative value, and AVG measures arithmetic means.',
      syntax: 'SELECT COUNT(*), SUM(amount), AVG(price) FROM table_name;',
      keyPoints: [
        'COUNT(*) counts total rows including nulls',
        'COUNT(column) counts non-null occurrences',
        'SUM and AVG ignore NULL values automatically'
      ],
      codeExample: "SELECT COUNT(*) AS total_orders, SUM(total_amount) AS gross_revenue FROM orders WHERE status = 'completed';"
    },
    exerciseIds: ['ex_aggregates_orders']
  },
  {
    id: 'node_group_by',
    regionId: 'region_aggregation',
    skillId: 'aggregation',
    order: 7,
    title: 'GROUP BY Breakdown',
    shortDescription: 'Segment and summarize transactional data by dimensions.',
    type: 'practice',
    xpReward: 30,
    prerequisites: ['node_aggregates'],
    position: { x: 32, y: 40 },
    lessonContent: {
      summary: 'GROUP BY divides rows into summary groups based on one or more dimension columns. Every column in the SELECT list that is not aggregated must appear in the GROUP BY clause.',
      syntax: 'SELECT category, COUNT(*), SUM(revenue) FROM orders GROUP BY category;',
      keyPoints: [
        'Essential for dimensional business analysis',
        'Must include all unaggregated SELECT columns in GROUP BY',
        'Combine with ORDER BY to rank category metrics'
      ],
      codeExample: 'SELECT status, COUNT(*) AS count, SUM(total_amount) AS revenue FROM orders GROUP BY status;'
    },
    exerciseIds: ['ex_group_by_department']
  },
  {
    id: 'node_having',
    regionId: 'region_aggregation',
    skillId: 'aggregation',
    order: 8,
    title: 'HAVING Thresholds',
    shortDescription: 'Filter aggregated groups based on calculated values.',
    type: 'challenge',
    xpReward: 35,
    prerequisites: ['node_aggregates'],
    position: { x: 68, y: 40 },
    lessonContent: {
      summary: 'WHERE filters individual records before aggregation. HAVING filters summarized groups after aggregation. If you need to filter on a metric like COUNT(*) > 2 or SUM(revenue) > 1000, you must use HAVING.',
      syntax: 'SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) > 2;',
      keyPoints: [
        'WHERE filters raw rows before GROUP BY',
        'HAVING filters summarized groups after GROUP BY',
        'Can reference aggregate expressions directly'
      ],
      codeExample: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 2;'
    },
    exerciseIds: ['ex_having_filter']
  },
  {
    id: 'boss_01_sales',
    regionId: 'region_aggregation',
    skillId: 'aggregation',
    order: 9,
    title: 'BOSS #01: The Sales Inquisitor',
    shortDescription: 'Multi-stage revenue investigation and business audit battle.',
    type: 'boss',
    xpReward: 120,
    prerequisites: ['node_group_by', 'node_having'],
    position: { x: 50, y: 48 },
    bossId: 'boss_01_sales'
  },

  // --- REGION 3: THE RELATIONAL BRIDGES ---
  {
    id: 'node_inner_join',
    regionId: 'region_joins',
    skillId: 'joins',
    order: 10,
    title: 'INNER JOIN Traverse',
    shortDescription: 'Cross-reference relational entities using primary-foreign key links.',
    type: 'lesson',
    xpReward: 30,
    prerequisites: ['boss_01_sales'],
    position: { x: 32, y: 57 },
    lessonContent: {
      summary: 'INNER JOIN combines rows from two tables whenever the specified join predicate evaluates to TRUE. Records without matches on either side are omitted from the output.',
      syntax: 'SELECT a.col, b.col FROM table_a a INNER JOIN table_b b ON a.id = b.a_id;',
      keyPoints: [
        'Enforces relational integrity across tables',
        'Uses ON clause to define matching foreign keys',
        'Table aliases (o, c) avoid column ambiguity'
      ],
      codeExample: 'SELECT c.first_name, o.order_id, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id;'
    },
    exerciseIds: ['ex_inner_join']
  },
  {
    id: 'node_left_join',
    regionId: 'region_joins',
    skillId: 'joins',
    order: 11,
    title: 'LEFT JOIN Anti-Join',
    shortDescription: 'Preserve unmatched left records and isolate churn patterns.',
    type: 'challenge',
    xpReward: 35,
    prerequisites: ['boss_01_sales'],
    position: { x: 68, y: 57 },
    lessonContent: {
      summary: 'LEFT JOIN returns all rows from the left table, and matching rows from the right table. If no match exists, NULL values appear on the right side. Filtering with WHERE right.id IS NULL uncovers missing relationships (Anti-Join).',
      syntax: 'SELECT a.* FROM table_a a LEFT JOIN table_b b ON a.id = b.a_id WHERE b.a_id IS NULL;',
      keyPoints: [
        'Never drops rows from the left table',
        'Right table yields NULL for non-matching rows',
        'Anti-join pattern: WHERE right.id IS NULL'
      ],
      codeExample: 'SELECT c.customer_id, c.first_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;'
    },
    exerciseIds: ['ex_left_join']
  },

  // --- REGION 4: THE LOGIC CITADEL ---
  {
    id: 'node_case_logic',
    regionId: 'region_logic_transform',
    skillId: 'logic',
    order: 12,
    title: 'CASE Expressions',
    shortDescription: 'Implement conditional IF-THEN branching directly in SQL.',
    type: 'practice',
    xpReward: 30,
    prerequisites: ['node_inner_join', 'node_left_join'],
    position: { x: 50, y: 66 },
    lessonContent: {
      summary: 'The CASE expression provides declarative conditional branching in SQL statements. It evaluates sequential conditions and returns a value when the first condition is satisfied.',
      syntax: "CASE WHEN condition THEN result WHEN condition2 THEN result2 ELSE fallback END",
      keyPoints: [
        'Declarative branching inside queries',
        'Evaluated sequentially from top to bottom',
        'Always close with END and provide an alias'
      ],
      codeExample: "SELECT name, price, CASE WHEN price < 500 THEN 'Budget' ELSE 'Premium' END AS tier FROM products;"
    },
    exerciseIds: ['ex_case_logic']
  },
  {
    id: 'node_subqueries',
    regionId: 'region_logic_transform',
    skillId: 'subqueries',
    order: 13,
    title: 'Nested Subqueries',
    shortDescription: 'Evaluate dynamic metrics within filter predicates.',
    type: 'challenge',
    xpReward: 35,
    prerequisites: ['node_case_logic'],
    position: { x: 32, y: 74 },
    lessonContent: {
      summary: 'A subquery is an SQL query nested inside another query. Scalar subqueries return a single value and can be embedded within WHERE, SELECT, or HAVING clauses to compare against dynamic thresholds.',
      syntax: 'SELECT * FROM table WHERE value > (SELECT AVG(value) FROM table);',
      keyPoints: [
        'Inner query executes to produce input for outer query',
        'Scalar subqueries return 1 row, 1 column',
        'Allows dynamic benchmarking without hardcoded values'
      ],
      codeExample: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);'
    },
    exerciseIds: ['ex_subqueries']
  },
  {
    id: 'node_ctes',
    regionId: 'region_logic_transform',
    skillId: 'ctes',
    order: 14,
    title: 'CTEs (WITH Pipelines)',
    shortDescription: 'Modularize complex multi-step analytical pipelines.',
    type: 'practice',
    xpReward: 40,
    prerequisites: ['node_case_logic'],
    position: { x: 68, y: 74 },
    lessonContent: {
      summary: 'Common Table Expressions (CTEs) define temporary named result sets that exist only within the execution of a single query. They improve code readability, facilitate modular debugging, and power modern data transformations.',
      syntax: 'WITH cte_name AS (SELECT col FROM table) SELECT * FROM cte_name;',
      keyPoints: [
        'Introduced via the WITH keyword',
        'Transforms nested query messes into readable sequential stages',
        'Essential pattern in modern analytics engineering (dbt)'
      ],
      codeExample: 'WITH high_spenders AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id) SELECT * FROM high_spenders WHERE spend > 1000;'
    },
    exerciseIds: ['ex_cte_pipeline']
  },

  // --- REGION 5: THE APEX OBSERVATORY ---
  {
    id: 'node_window_functions',
    regionId: 'region_advanced_analytics',
    skillId: 'windows',
    order: 15,
    title: 'Window Functions (OVER / PARTITION)',
    shortDescription: 'Calculate rankings and running metrics across partitions without collapsing rows.',
    type: 'challenge',
    xpReward: 45,
    prerequisites: ['node_subqueries', 'node_ctes'],
    position: { x: 50, y: 82 },
    lessonContent: {
      summary: 'Window functions perform calculations across sets of rows related to the current query row while retaining individual row-level identity. The OVER clause defines the partitioning and ordering window.',
      syntax: 'ROW_NUMBER() OVER (PARTITION BY group_col ORDER BY sort_col DESC)',
      keyPoints: [
        'Preserves row granularity while computing aggregates',
        'PARTITION BY resets the calculation window per group',
        'ORDER BY defines the calculation sequence inside the frame'
      ],
      codeExample: 'SELECT order_id, customer_id, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS rank FROM orders;'
    },
    exerciseIds: ['ex_window_functions']
  },
  {
    id: 'boss_02_cohorts',
    regionId: 'region_advanced_analytics',
    skillId: 'windows',
    order: 16,
    title: 'BOSS #02: The Churn Sentinel',
    shortDescription: 'Advanced SaaS subscription cohorts & recurring revenue battle.',
    type: 'boss',
    xpReward: 180,
    prerequisites: ['node_window_functions'],
    position: { x: 50, y: 90 },
    bossId: 'boss_02_cohorts'
  },
  {
    id: 'node_capstone_project',
    regionId: 'region_advanced_analytics',
    skillId: 'windows',
    order: 17,
    title: 'CAPSTONE: Retail Intelligence Project',
    shortDescription: 'Comprehensive end-to-end retail business analytics assignment.',
    type: 'project',
    xpReward: 300,
    prerequisites: ['boss_02_cohorts'],
    position: { x: 50, y: 97 },
    projectId: 'project_ecommerce_analytics'
  }
];

export const NODE_SKILL_MAPPING: Record<string, string> = {
  node_select: 'foundations',
  node_where: 'foundations',
  node_order_limit: 'foundations',
  node_distinct: 'foundations',
  node_null: 'foundations',
  node_aggregates: 'aggregation',
  node_group_by: 'aggregation',
  node_having: 'aggregation',
  boss_01_sales: 'aggregation',
  node_inner_join: 'joins',
  node_left_join: 'joins',
  node_case_logic: 'logic',
  node_subqueries: 'subqueries',
  node_ctes: 'ctes',
  node_window_functions: 'windows',
  boss_02_cohorts: 'windows',
  node_capstone_project: 'windows'
};
