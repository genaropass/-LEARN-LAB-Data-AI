import { BossScenario } from '@/types/curriculum';

export const SQL_BOSSES: Record<string, BossScenario> = {
  // BOSS #01: Sales Intelligence Investigation
  boss_01_sales: {
    id: 'boss_01_sales',
    nodeId: 'boss_01_sales',
    title: 'The Sales Inquisitor',
    subtitle: 'Boss Battle #01 — E-Commerce Revenue Audit',
    description: 'A critical quarterly audit has exposed major discrepancies in reported sales figures. As lead data investigator, execute multi-stage relational diagnostics to uncover revenue drivers, high-ticket channels, and unbilled leaks.',
    datasetContext: 'Tables involved: customers, orders, products, order_items, payments.',
    totalHp: 3,
    xpReward: 120,
    unlockedRegionTitle: 'The Relational Bridges (JOIN Mastery)',
    stages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Top Revenue Generators',
        scenario: 'Executive leadership wants to know which customers generate the most gross revenue from completed orders to invite them to the VIP advisory council.',
        objective: 'Write a query returning customer_id and the SUM(total_amount) AS total_revenue from orders WHERE status = \'completed\', grouped by customer_id, ordered by total_revenue DESC, LIMIT 3.',
        expectedQuery: "SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders WHERE status = 'completed' GROUP BY customer_id ORDER BY total_revenue DESC LIMIT 3;",
        hints: [
          "Filter by status = 'completed' first.",
          'GROUP BY customer_id and calculate SUM(total_amount) AS total_revenue.',
          'ORDER BY total_revenue DESC LIMIT 3;'
        ],
        pedagogicalNote: 'You identified the top 3 power spenders driving 60%+ of gross business revenue.',
        xpReward: 35
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Payment Settlement Reconciliation',
        scenario: 'Finance reports that certain transactions failed settlement. Identify total revenue approved versus declined across all recorded payments.',
        objective: 'Select status, COUNT(*) AS transaction_count, and SUM(amount) AS total_settled FROM payments GROUP BY status ORDER BY total_settled DESC;',
        expectedQuery: 'SELECT status, COUNT(*) AS transaction_count, SUM(amount) AS total_settled FROM payments GROUP BY status ORDER BY total_settled DESC;',
        hints: [
          'Aggregate the payments table by the status column.',
          'Calculate both COUNT(*) and SUM(amount).',
          'Sort by total_settled DESC.'
        ],
        pedagogicalNote: 'Uncovered $2,399 in declined settlements requiring gateway retries.',
        xpReward: 40
      },
      {
        stageNumber: 3,
        title: 'Phase 3: The Critical Velocity Strike',
        scenario: 'The CEO demands an analysis of average order value (AOV) by city across registered customer accounts.',
        objective: 'Join customers c with orders o on c.customer_id = o.customer_id. Select c.city, COUNT(o.order_id) AS total_orders, and ROUND(AVG(o.total_amount), 2) AS average_order_value FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city HAVING total_orders >= 2 ORDER BY average_order_value DESC;',
        expectedQuery: 'SELECT c.city, COUNT(o.order_id) AS total_orders, ROUND(AVG(o.total_amount), 2) AS average_order_value FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city HAVING total_orders >= 2 ORDER BY average_order_value DESC;',
        hints: [
          'Join customers and orders on customer_id.',
          'Group by c.city.',
          'Use HAVING total_orders >= 2 and ORDER BY average_order_value DESC.'
        ],
        pedagogicalNote: 'Boss Defeated! You successfully isolated territorial unit economics and unlocked the Relational Bridges region.',
        xpReward: 45
      }
    ]
  },

  // BOSS #02: SaaS Cohort & Churn Sentinel
  boss_02_cohorts: {
    id: 'boss_02_cohorts',
    nodeId: 'boss_02_cohorts',
    title: 'The Churn Sentinel',
    subtitle: 'Boss Battle #02 — SaaS Cohort & Retention Citadel',
    description: 'The Board is convening an emergency session on subscription retention. Deconstruct customer lifecycles, active recurring ARR, and plan distribution using advanced SQL transformations.',
    datasetContext: 'Tables involved: subscriptions, customers, orders.',
    totalHp: 3,
    xpReward: 180,
    unlockedRegionTitle: 'The Apex Observatory (Capstone Project)',
    stages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Active MRR by Subscription Tier',
        scenario: 'Calculate Monthly Recurring Revenue (MRR) and active subscriber counts for all plans that are currently active.',
        objective: 'Select plan, COUNT(*) AS active_subscribers, SUM(monthly_cost) AS monthly_recurring_revenue FROM subscriptions WHERE status = \'active\' GROUP BY plan ORDER BY monthly_recurring_revenue DESC;',
        expectedQuery: "SELECT plan, COUNT(*) AS active_subscribers, SUM(monthly_cost) AS monthly_recurring_revenue FROM subscriptions WHERE status = 'active' GROUP BY plan ORDER BY monthly_recurring_revenue DESC;",
        hints: [
          "Filter by status = 'active'.",
          'Group by plan.',
          'Order by monthly_recurring_revenue DESC.'
        ],
        pedagogicalNote: 'Active Enterprise accounts contribute over 70% of total company MRR.',
        xpReward: 50
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Churn Rate Identification',
        scenario: 'Identify the total count of cancelled subscriptions compared to active subscriptions.',
        objective: 'Select status, COUNT(*) AS total_count, ROUND(AVG(monthly_cost), 2) AS avg_plan_cost FROM subscriptions GROUP BY status ORDER BY total_count DESC;',
        expectedQuery: 'SELECT status, COUNT(*) AS total_count, ROUND(AVG(monthly_cost), 2) AS avg_plan_cost FROM subscriptions GROUP BY status ORDER BY total_count DESC;',
        hints: [
          'Group subscriptions by status.',
          'Compute COUNT(*) and ROUND(AVG(monthly_cost), 2).'
        ],
        pedagogicalNote: 'Isolated that cancelled plans concentrated in starter tiers with low average cost.',
        xpReward: 60
      },
      {
        stageNumber: 3,
        title: 'Phase 3: The Master Analytical Strike',
        scenario: 'Use a CTE or subquery to determine which customers hold an active subscription AND have also spent more than $500 in total e-commerce orders.',
        objective: 'WITH big_spenders AS (SELECT customer_id FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 500) SELECT s.customer_id, s.plan, s.monthly_cost FROM subscriptions s INNER JOIN big_spenders b ON s.customer_id = b.customer_id WHERE s.status = \'active\' ORDER BY s.monthly_cost DESC;',
        expectedQuery: "WITH big_spenders AS (SELECT customer_id FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 500) SELECT s.customer_id, s.plan, s.monthly_cost FROM subscriptions s INNER JOIN big_spenders b ON s.customer_id = b.customer_id WHERE s.status = 'active' ORDER BY s.monthly_cost DESC;",
        hints: [
          'Create a CTE big_spenders finding customer_id with SUM(total_amount) > 500.',
          "Join with subscriptions s on customer_id where s.status = 'active'.",
          'Order by s.monthly_cost DESC.'
        ],
        pedagogicalNote: 'Sentinel Defeated! You demonstrated advanced multi-model SQL mastery and unlocked the Final Capstone Assignment.',
        xpReward: 70
      }
    ]
  }
};
