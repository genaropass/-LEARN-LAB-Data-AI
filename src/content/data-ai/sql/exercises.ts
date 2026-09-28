import { Exercise } from '@/types/curriculum';

export const SQL_EXERCISES: Record<string, Exercise> = {
  // 1. SELECT Basics
  ex_select_basic: {
    id: 'ex_select_basic',
    nodeId: 'node_select',
    title: 'Customer Directory Projection',
    businessContext: 'The CRM marketing team needs a list of all registered customer names and contact emails for an upcoming notification campaign.',
    targetTables: ['customers'],
    prompt: 'Write an SQL query to retrieve the first_name, last_name, and email columns for all customers from the customers table.',
    initialQuery: '-- Write your SELECT query here\nSELECT ',
    expectedQuery: 'SELECT first_name, last_name, email FROM customers;',
    hints: [
      'Use the SELECT keyword followed by the column names separated by commas.',
      'Specify the source table using FROM customers.',
      'Query structure: SELECT first_name, last_name, email FROM customers;'
    ],
    pedagogicalFeedback: 'You utilized explicit column projection (SELECT first_name, last_name, email). In production data engineering, avoiding SELECT * reduces I/O bandwidth, network overhead, and prevents breaking schema changes.',
    xp: 20
  },

  // 2. WHERE Filtering
  ex_where_filter: {
    id: 'ex_where_filter',
    nodeId: 'node_where',
    title: 'High-Value Low-Stock Inventory',
    businessContext: 'The logistics warehouse manager needs to identify enterprise products priced over $500 that have fewer than 50 units in stock to prioritize replenishment.',
    targetTables: ['products'],
    prompt: 'Select the name, price, and stock_quantity from the products table where price is strictly greater than 500 and stock_quantity is strictly less than 50.',
    initialQuery: 'SELECT name, price, stock_quantity\nFROM products\nWHERE ',
    expectedQuery: 'SELECT name, price, stock_quantity FROM products WHERE price > 500 AND stock_quantity < 50;',
    hints: [
      'Combine multiple filtering criteria using the boolean AND operator.',
      'Use > 500 for the price condition and < 50 for the stock_quantity condition.',
      'Check: WHERE price > 500 AND stock_quantity < 50;'
    ],
    pedagogicalFeedback: 'Predicate pushdown via WHERE filters rows before memory allocation. Combining relational operators (> and <) with AND filters out ineligible rows at the storage layer.',
    xp: 25
  },

  // 3. ORDER BY & LIMIT
  ex_order_limit: {
    id: 'ex_order_limit',
    nodeId: 'node_order_limit',
    title: 'Top 5 Premium Products',
    businessContext: 'The merchandising team is creating a homepage luxury showcase banner and needs the 5 most expensive products in the store.',
    targetTables: ['products'],
    prompt: 'Select name and price from products, ordered from highest price to lowest price, limiting the output to exactly the top 5 products.',
    initialQuery: 'SELECT name, price\nFROM products\n',
    expectedQuery: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5;',
    hints: [
      'To sort descending from highest to lowest, append DESC after the column name in ORDER BY.',
      'Use LIMIT 5 at the very end of your query to restrict results.',
      'Full syntax: SELECT name, price FROM products ORDER BY price DESC LIMIT 5;'
    ],
    pedagogicalFeedback: 'Combining ORDER BY ... DESC with LIMIT is the standard pattern for top-N ranking queries. In modern query optimizers, this can be accelerated using index scans without loading all table rows into memory.',
    xp: 25
  },

  // 4. DISTINCT
  ex_distinct_countries: {
    id: 'ex_distinct',
    nodeId: 'node_distinct',
    title: 'Unique Global Markets',
    businessContext: 'The international compliance officer requires an alphabetical list of all distinct countries where registered customers reside.',
    targetTables: ['customers'],
    prompt: 'Retrieve the unique country values from the customers table without duplicate entries, ordered alphabetically in ascending order.',
    initialQuery: 'SELECT DISTINCT ',
    expectedQuery: 'SELECT DISTINCT country FROM customers ORDER BY country ASC;',
    hints: [
      'The DISTINCT keyword removes duplicate rows from the query result set.',
      'Alphabetical order is achieved with ORDER BY country ASC (or simply ORDER BY country).',
      'Query: SELECT DISTINCT country FROM customers ORDER BY country ASC;'
    ],
    pedagogicalFeedback: 'DISTINCT enforces uniqueness by performing a deduplication hash or sort-merge operation. It is essential for reporting on categorical cardinality.',
    xp: 20
  },

  // 5. NULL & COALESCE
  ex_null_handling: {
    id: 'ex_null_handling',
    nodeId: 'node_null',
    title: 'Subscription Status Cleanse',
    businessContext: 'The finance team is generating an active subscriber audit. Subscriptions without a cancel date must display "Active Subscription" instead of a blank NULL value.',
    targetTables: ['subscriptions'],
    prompt: 'Select subscription_id, plan, and use COALESCE on cancel_date to display "Active Subscription" if cancel_date is NULL. Alias the computed column as exit_status.',
    initialQuery: 'SELECT subscription_id, plan, COALESCE(cancel_date, ',
    expectedQuery: "SELECT subscription_id, plan, COALESCE(cancel_date, 'Active Subscription') AS exit_status FROM subscriptions;",
    hints: [
      'COALESCE takes two or more arguments and returns the first non-null argument.',
      'Use single quotes for string literals: COALESCE(cancel_date, \'Active Subscription\').',
      'Assign the alias with AS exit_status.'
    ],
    pedagogicalFeedback: 'NULL represents missing or unknown information in SQL. COALESCE provides defensive data sanitization, ensuring downstream reporting pipelines do not crash on unexpected null pointers.',
    xp: 25
  },

  // 6. Aggregates (COUNT, SUM, AVG)
  ex_aggregates_orders: {
    id: 'ex_aggregates_orders',
    nodeId: 'node_aggregates',
    title: 'Gross Revenue & Completed Orders',
    businessContext: 'Executive leadership wants a quick financial snapshot of settled business: total number of completed orders and total gross revenue from those completed orders.',
    targetTables: ['orders'],
    prompt: "Write a query to calculate the COUNT of orders as order_count and the SUM of total_amount as gross_revenue from the orders table where status = 'completed'.",
    initialQuery: 'SELECT COUNT(*) AS order_count, SUM(total_amount) AS gross_revenue\nFROM orders\nWHERE ',
    expectedQuery: "SELECT COUNT(*) AS order_count, SUM(total_amount) AS gross_revenue FROM orders WHERE status = 'completed';",
    hints: [
      'Use COUNT(*) to count matching records and SUM(total_amount) for the monetary total.',
      "Filter only settled orders using WHERE status = 'completed'.",
      'Ensure you provide the requested aliases AS order_count and AS gross_revenue.'
    ],
    pedagogicalFeedback: 'Aggregate functions process multi-row datasets into single scalar metrics. Filtering with WHERE occurs before aggregation, optimizing performance.',
    xp: 25
  },

  // 7. GROUP BY
  ex_group_by_department: {
    id: 'ex_group_by',
    nodeId: 'node_group_by',
    title: 'Revenue Aggregation by Status',
    businessContext: 'The operations team wants to see a breakdown of order volume and total financial value categorized by each order status.',
    targetTables: ['orders'],
    prompt: 'Select status, COUNT(*) AS order_count, and SUM(total_amount) AS total_value from orders GROUP BY status ORDER BY total_value DESC;',
    initialQuery: 'SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS total_value\nFROM orders\n',
    expectedQuery: 'SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS total_value FROM orders GROUP BY status ORDER BY total_value DESC;',
    hints: [
      'Every non-aggregated column in your SELECT clause (here, status) must be present in the GROUP BY clause.',
      'Add ORDER BY total_value DESC to sort from highest financial volume to lowest.'
    ],
    pedagogicalFeedback: 'GROUP BY collapses rows with identical grouping keys into summary records. This is the cornerstone of business intelligence and dimensional modeling.',
    xp: 30
  },

  // 8. HAVING
  ex_having_filter: {
    id: 'ex_having',
    nodeId: 'node_having',
    title: 'High-Volume Customer Filter',
    businessContext: 'Marketing wants to identify repeat power shoppers: customers who have placed strictly more than 2 orders across the system.',
    targetTables: ['orders'],
    prompt: 'Select customer_id and COUNT(*) AS order_count from orders GROUP BY customer_id HAVING COUNT(*) > 2 ORDER BY order_count DESC;',
    initialQuery: 'SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\n',
    expectedQuery: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 2 ORDER BY order_count DESC;',
    hints: [
      'Use HAVING (not WHERE) to filter based on an aggregate condition like COUNT(*) > 2.',
      'WHERE filters raw rows before aggregation, while HAVING filters grouped rows after aggregation.'
    ],
    pedagogicalFeedback: 'HAVING evaluates aggregate calculations after grouping. Remember the SQL lifecycle: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.',
    xp: 30
  },

  // 9. INNER JOIN
  ex_inner_join: {
    id: 'ex_inner_join',
    nodeId: 'node_inner_join',
    title: 'Customer Order Relationship',
    businessContext: 'Customer support needs a consolidated view of each order showing the customer\'s full name, email, order ID, and order total.',
    targetTables: ['orders', 'customers'],
    prompt: 'Perform an INNER JOIN between orders and customers on orders.customer_id = customers.customer_id. Select first_name, last_name, email, order_id, and total_amount, sorted by order_id ASC.',
    initialQuery: 'SELECT c.first_name, c.last_name, c.email, o.order_id, o.total_amount\nFROM orders o\nINNER JOIN customers c ON ',
    expectedQuery: 'SELECT c.first_name, c.last_name, c.email, o.order_id, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;',
    hints: [
      'Join condition: o.customer_id = c.customer_id',
      'Table aliases like "orders o" and "customers c" make queries concise and readable.',
      'Order results by o.order_id ASC.'
    ],
    pedagogicalFeedback: 'INNER JOIN combines rows from two tables where the joining predicate matches in both. Records with no matching key on either side are excluded.',
    xp: 35
  },

  // 10. LEFT JOIN
  ex_left_join: {
    id: 'ex_left_join',
    nodeId: 'node_left_join',
    title: 'Unengaged Customer Audit (Anti-Join)',
    businessContext: 'The growth team wants to re-engage registered users who have never placed a single order on the platform.',
    targetTables: ['customers', 'orders'],
    prompt: 'Use a LEFT JOIN between customers and orders to find all customers who have no matching records in orders. Select customers.customer_id, first_name, and last_name where orders.order_id IS NULL.',
    initialQuery: 'SELECT c.customer_id, c.first_name, c.last_name\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE ',
    expectedQuery: 'SELECT c.customer_id, c.first_name, c.last_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;',
    hints: [
      'A LEFT JOIN preserves every row from the left table (customers). If there is no match in orders, the order fields will be NULL.',
      'Use WHERE o.order_id IS NULL to isolate unmatched customers (the anti-join pattern).'
    ],
    pedagogicalFeedback: 'The LEFT JOIN with IS NULL filter is known as an anti-join. It is one of the most widely used SQL patterns in data quality checks, fraud detection, and marketing churn analysis.',
    xp: 35
  },

  // 11. CASE WHEN
  ex_case_logic: {
    id: 'ex_case_logic',
    nodeId: 'node_case_logic',
    title: 'Catalog Price Segmentation',
    businessContext: 'Pricing strategy requires tagging every product into three tiers: "Budget" if price < 200, "Mid-Tier" if price between 200 and 1000, and "Premium" if price >= 1000.',
    targetTables: ['products'],
    prompt: 'Select name, price, and a CASE expression aliased as price_tier that outputs "Budget" when price < 200, "Mid-Tier" when price < 1000, and "Premium" for all others. Order by price ASC.',
    initialQuery: 'SELECT name, price,\n  CASE\n    WHEN price < 200 THEN \'Budget\'\n',
    expectedQuery: "SELECT name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS price_tier FROM products ORDER BY price ASC;",
    hints: [
      'Syntax: CASE WHEN cond1 THEN val1 WHEN cond2 THEN val2 ELSE val3 END AS price_tier',
      'CASE evaluates sequentially: the first condition that evaluates to TRUE will be returned.'
    ],
    pedagogicalFeedback: 'CASE WHEN brings procedural IF-THEN branching directly into relational projections without requiring procedural stored procedures.',
    xp: 30
  },

  // 12. Subqueries
  ex_subqueries: {
    id: 'ex_subqueries',
    nodeId: 'node_subqueries',
    title: 'Above-Average Pricing Analysis',
    businessContext: 'Product managers need to identify flagship catalog items whose retail price strictly exceeds the average product price across the entire company.',
    targetTables: ['products'],
    prompt: 'Write a query to select name and price from products where price is strictly greater than the average price computed via a scalar subquery (SELECT AVG(price) FROM products) ORDER BY price DESC.',
    initialQuery: 'SELECT name, price\nFROM products\nWHERE price > (',
    expectedQuery: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;',
    hints: [
      'A scalar subquery returns a single value (1 row, 1 column) that can be directly compared with an operator like >.',
      'Enclose the subquery in parentheses: (SELECT AVG(price) FROM products).'
    ],
    pedagogicalFeedback: 'Scalar subqueries allow dynamic threshold comparisons without hardcoding manual magic numbers. The inner query computes the baseline metric dynamically.',
    xp: 35
  },

  // 13. CTEs (Common Table Expressions)
  ex_cte_pipeline: {
    id: 'ex_cte_pipeline',
    nodeId: 'node_ctes',
    title: 'Customer Spending Metrics Pipeline',
    businessContext: 'Analytics engineering needs a clean CTE that first calculates each customer\'s total spend and order count, then selects customers with over $1,000 in total spend.',
    targetTables: ['orders', 'customers'],
    prompt: 'Define a CTE named customer_summary using WITH that selects customer_id, COUNT(*) AS total_orders, and SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id. In the main query, select customer_id, total_orders, total_spend FROM customer_summary WHERE total_spend > 1000 ORDER BY total_spend DESC.',
    initialQuery: 'WITH customer_summary AS (\n  SELECT customer_id, COUNT(*) AS total_orders, SUM(total_amount) AS total_spend\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT ',
    expectedQuery: 'WITH customer_summary AS (SELECT customer_id, COUNT(*) AS total_orders, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id) SELECT customer_id, total_orders, total_spend FROM customer_summary WHERE total_spend > 1000 ORDER BY total_spend DESC;',
    hints: [
      'Begin with WITH customer_summary AS (...)',
      'Query the CTE just like a real table in your outer SELECT statement.',
      'Filter with WHERE total_spend > 1000 and ORDER BY total_spend DESC.'
    ],
    pedagogicalFeedback: 'Common Table Expressions (CTEs) modularize complex SQL logic into readable, testable, and reusable named blocks. In enterprise analytics (dbt, Snowflake, BigQuery), CTEs are the gold standard for data modeling.',
    xp: 40
  },

  // 14. Window Functions
  ex_window_functions: {
    id: 'ex_window_functions',
    nodeId: 'node_window_functions',
    title: 'Order Ranking by Customer',
    businessContext: 'Audit requires numbering and ranking each customer\'s individual purchases from most expensive to least expensive without collapsing individual transaction rows.',
    targetTables: ['orders'],
    prompt: 'Select order_id, customer_id, total_amount, and ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS order_rank FROM orders ORDER BY customer_id ASC, order_rank ASC;',
    initialQuery: 'SELECT order_id, customer_id, total_amount,\n  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS order_rank\nFROM orders\n',
    expectedQuery: 'SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS order_rank FROM orders ORDER BY customer_id ASC, order_rank ASC;',
    hints: [
      'Window functions use the OVER clause to define the data partition and ordering.',
      'PARTITION BY customer_id resets the ranking counter for each distinct customer.',
      'ORDER BY total_amount DESC within the OVER clause ranks from highest spend to lowest.'
    ],
    pedagogicalFeedback: 'Window functions perform calculations across a set of table rows related to the current row without grouping rows into a single summary output. This preserves transaction-level granularity while unlocking powerful analytical ranking.',
    xp: 45
  }
};
