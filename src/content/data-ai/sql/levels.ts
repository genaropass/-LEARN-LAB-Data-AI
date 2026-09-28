export type LevelDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Master Boss';
export type LevelType = 'standard' | 'challenge' | 'mystery_block' | 'boss_fortress';

export interface GameLevel {
  levelNumber: number;
  worldNumber: number;
  worldName: string;
  biome: 'plains' | 'desert' | 'bridge' | 'cavern' | 'volcano';
  title: string;
  type: LevelType;
  difficulty: LevelDifficulty;
  targetTables: string[];
  prompt: string;
  initialQuery: string;
  expectedQuery: string;
  hints: string[];
  xpReward: number;
  coinReward: number;
  pedagogicalNote: string;
  // Position in Mario-style zig-zag path (0-100% within the world board)
  position: { x: number; y: number };
}

// Generate the winding Mario / Duolingo path coordinates for 20 levels per world
function calculateWindingPath(indexInWorld: number): { x: number; y: number } {
  // S-curve snake path descending vertically
  const step = indexInWorld; // 0 to 19
  const y = 8 + (step * 4.3);
  // Oscillate x back and forth like Super Mario World / Duolingo
  const wave = Math.sin(step * 0.7);
  const x = Math.round(50 + wave * 32);
  return { x, y };
}

export const GAME_WORLDS = [
  {
    number: 1,
    name: 'Grassland Kingdom',
    subtitle: 'The Plains of SELECT & WHERE',
    biome: 'plains' as const,
    bgImage: '/maps/world_1_plains.jpg',
    levelsRange: [1, 20],
    accentColor: '#10B981'
  },
  {
    number: 2,
    name: 'Dune Canyon',
    subtitle: 'The Desert of Aggregates & Groupings',
    biome: 'desert' as const,
    bgImage: '/maps/world_2_desert.jpg',
    levelsRange: [21, 40],
    accentColor: '#F59E0B'
  },
  {
    number: 3,
    name: 'Crystal Isles',
    subtitle: 'The Ocean of Relational JOINs',
    biome: 'bridge' as const,
    bgImage: '/maps/world_1_plains.jpg',
    levelsRange: [41, 60],
    accentColor: '#06B6D4'
  },
  {
    number: 4,
    name: 'Logic Caverns',
    subtitle: 'The Underground of CASE & Subqueries',
    biome: 'cavern' as const,
    bgImage: '/maps/world_2_desert.jpg',
    levelsRange: [61, 80],
    accentColor: '#8B5CF6'
  },
  {
    number: 5,
    name: "Bowser's Volcano",
    subtitle: 'The Citadel of CTEs & Window Functions',
    biome: 'volcano' as const,
    bgImage: '/maps/world_3_volcano.jpg',
    levelsRange: [81, 100],
    accentColor: '#EF4444'
  }
];

// Helper to construct all 100 rich game levels
export function build100Levels(): GameLevel[] {
  const levels: GameLevel[] = [];

  // =========================================================================
  // WORLD 1: GRASSLAND KINGDOM (Levels 1 to 20) — Foundations
  // =========================================================================
  const w1Titles = [
    { title: 'The First Spark', prompt: 'Select all columns from customers.', expected: 'SELECT * FROM customers;', tbls: ['customers'] },
    { title: 'Single Column Projection', prompt: 'Select first_name from customers.', expected: 'SELECT first_name FROM customers;', tbls: ['customers'] },
    { title: 'Dual Identity', prompt: 'Select first_name and last_name from customers.', expected: 'SELECT first_name, last_name FROM customers;', tbls: ['customers'] },
    { title: 'Contact Directory', prompt: 'Select email and city from customers.', expected: 'SELECT email, city FROM customers;', tbls: ['customers'] },
    { title: 'Column Aliasing', prompt: 'Select name AS product_name, price AS retail_price FROM products;', expected: 'SELECT name AS product_name, price AS retail_price FROM products;', tbls: ['products'] },
    { title: 'The Equality Gate', prompt: "Select * from customers where country = 'Germany';", expected: "SELECT * FROM customers WHERE country = 'Germany';", tbls: ['customers'] },
    { title: 'Price Threshold', prompt: 'Select name, price from products where price > 500;', expected: 'SELECT name, price FROM products WHERE price > 500;', tbls: ['products'] },
    { title: 'Inventory Check', prompt: 'Select name, stock_quantity from products where stock_quantity <= 25;', expected: 'SELECT name, stock_quantity FROM products WHERE stock_quantity <= 25;', tbls: ['products'] },
    { title: 'Country Isolation', prompt: "Select first_name, email from customers where country = 'USA';", expected: "SELECT first_name, email FROM customers WHERE country = 'USA';", tbls: ['customers'] },
    { title: 'Dual Predicates (AND)', prompt: 'Select name, price from products where price > 200 AND price < 1000;', expected: 'SELECT name, price FROM products WHERE price > 200 AND price < 1000;', tbls: ['products'] },
    { title: 'Alternative Roads (OR)', prompt: "Select * from orders where status = 'completed' OR status = 'shipped';", expected: "SELECT * FROM orders WHERE status = 'completed' OR status = 'shipped';", tbls: ['orders'] },
    { title: 'Range Sentinel (BETWEEN)', prompt: 'Select name, price from products where price BETWEEN 100 AND 500;', expected: 'SELECT name, price FROM products WHERE price BETWEEN 100 AND 500;', tbls: ['products'] },
    { title: 'The IN Collective', prompt: "Select first_name, country from customers where country IN ('Germany', 'France', 'Japan');", expected: "SELECT first_name, country FROM customers WHERE country IN ('Germany', 'France', 'Japan');", tbls: ['customers'] },
    { title: 'Ascending Order', prompt: 'Select name, price from products ORDER BY price ASC;', expected: 'SELECT name, price FROM products ORDER BY price ASC;', tbls: ['products'] },
    { title: 'Descending Priority', prompt: 'Select order_id, total_amount from orders ORDER BY total_amount DESC;', expected: 'SELECT order_id, total_amount FROM orders ORDER BY total_amount DESC;', tbls: ['orders'] },
    { title: 'Top-3 Flagship Items', prompt: 'Select name, price from products ORDER BY price DESC LIMIT 3;', expected: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;', tbls: ['products'] },
    { title: 'Deduplicated Nations', prompt: 'Select DISTINCT country from customers ORDER BY country ASC;', expected: 'SELECT DISTINCT country FROM customers ORDER BY country ASC;', tbls: ['customers'] },
    { title: 'Pagination Offset', prompt: 'Select name, price from products ORDER BY price ASC LIMIT 3 OFFSET 3;', expected: 'SELECT name, price FROM products ORDER BY price ASC LIMIT 3 OFFSET 3;', tbls: ['products'] },
    { title: 'Null Discovery', prompt: 'Select * from subscriptions where cancel_date IS NULL;', expected: 'SELECT * FROM subscriptions WHERE cancel_date IS NULL;', tbls: ['subscriptions'] },
    { title: 'World 1 Fortress Boss', prompt: "Select customer_id, total_amount from orders where status = 'completed' and total_amount > 500 ORDER BY total_amount DESC LIMIT 5;", expected: "SELECT customer_id, total_amount FROM orders WHERE status = 'completed' AND total_amount > 500 ORDER BY total_amount DESC LIMIT 5;", tbls: ['orders'] }
  ];

  w1Titles.forEach((item, idx) => {
    const lvlNum = idx + 1;
    const isBoss = lvlNum === 20;
    const isMystery = lvlNum === 5 || lvlNum === 12;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 1,
      worldName: 'Grassland Kingdom',
      biome: 'plains',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 8 ? 'Easy' : 'Medium',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: 'SELECT ',
      expectedQuery: item.expected,
      hints: [
        'Check column names and table spelling.',
        `Target tables: ${item.tbls.join(', ')}.`,
        `Expected syntax structure: ${item.expected}`
      ],
      xpReward: isBoss ? 150 : 25 + lvlNum * 2,
      coinReward: isBoss ? 60 : 15,
      pedagogicalNote: `Level ${lvlNum} completed! Precision filtering establishes the base of relational query planning.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // WORLD 2: DUNE CANYON (Levels 21 to 40) — Aggregation & Grouping
  // =========================================================================
  const w2Titles = [
    { title: 'Customer Census (COUNT)', prompt: 'Select COUNT(*) AS total_customers from customers;', expected: 'SELECT COUNT(*) AS total_customers FROM customers;', tbls: ['customers'] },
    { title: 'Gross Revenue (SUM)', prompt: 'Select SUM(total_amount) AS gross_sales from orders;', expected: 'SELECT SUM(total_amount) AS gross_sales FROM orders;', tbls: ['orders'] },
    { title: 'Mean Price Benchmark (AVG)', prompt: 'Select ROUND(AVG(price), 2) AS average_price from products;', expected: 'SELECT ROUND(AVG(price), 2) AS average_price FROM products;', tbls: ['products'] },
    { title: 'Extreme Boundaries (MIN/MAX)', prompt: 'Select MIN(price) AS lowest_price, MAX(price) AS highest_price from products;', expected: 'SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price FROM products;', tbls: ['products'] },
    { title: 'Completed Volume Filter', prompt: "Select COUNT(*) AS completed_count from orders where status = 'completed';", expected: "SELECT COUNT(*) AS completed_count FROM orders WHERE status = 'completed';", tbls: ['orders'] },
    { title: 'Grouping by Country', prompt: 'Select country, COUNT(*) AS customer_count from customers GROUP BY country ORDER BY customer_count DESC;', expected: 'SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country ORDER BY customer_count DESC;', tbls: ['customers'] },
    { title: 'Order Status Rollup', prompt: 'Select status, COUNT(*) AS orders_count from orders GROUP BY status;', expected: 'SELECT status, COUNT(*) AS orders_count FROM orders GROUP BY status;', tbls: ['orders'] },
    { title: 'Revenue by Order Status', prompt: 'Select status, SUM(total_amount) AS status_revenue from orders GROUP BY status ORDER BY status_revenue DESC;', expected: 'SELECT status, SUM(total_amount) AS status_revenue FROM orders GROUP BY status ORDER BY status_revenue DESC;', tbls: ['orders'] },
    { title: 'Category Inventory Depth', prompt: 'Select category_id, SUM(stock_quantity) AS total_inventory from products GROUP BY category_id ORDER BY total_inventory DESC;', expected: 'SELECT category_id, SUM(stock_quantity) AS total_inventory FROM products GROUP BY category_id ORDER BY total_inventory DESC;', tbls: ['products'] },
    { title: 'Average Category Pricing', prompt: 'Select category_id, ROUND(AVG(price), 2) AS avg_price from products GROUP BY category_id ORDER BY avg_price DESC;', expected: 'SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id ORDER BY avg_price DESC;', tbls: ['products'] },
    { title: 'Customer Order Count', prompt: 'Select customer_id, COUNT(*) AS total_orders from orders GROUP BY customer_id ORDER BY total_orders DESC;', expected: 'SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id ORDER BY total_orders DESC;', tbls: ['orders'] },
    { title: 'Customer Lifetime Spend', prompt: 'Select customer_id, SUM(total_amount) AS total_spent from orders GROUP BY customer_id ORDER BY total_spent DESC;', expected: 'SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id ORDER BY total_spent DESC;', tbls: ['orders'] },
    { title: 'Subscription Tier Census', prompt: 'Select plan, COUNT(*) AS subscriber_count from subscriptions GROUP BY plan ORDER BY subscriber_count DESC;', expected: 'SELECT plan, COUNT(*) AS subscriber_count FROM subscriptions GROUP BY plan ORDER BY subscriber_count DESC;', tbls: ['subscriptions'] },
    { title: 'Recurring Monthly MRR', prompt: 'Select plan, SUM(monthly_cost) AS total_mrr from subscriptions GROUP BY plan ORDER BY total_mrr DESC;', expected: 'SELECT plan, SUM(monthly_cost) AS total_mrr FROM subscriptions GROUP BY plan ORDER BY total_mrr DESC;', tbls: ['subscriptions'] },
    { title: 'The HAVING Vanguard', prompt: 'Select customer_id, COUNT(*) AS order_count from orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY order_count DESC;', expected: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY order_count DESC;', tbls: ['orders'] },
    { title: 'High-Spender Threshold', prompt: 'Select customer_id, SUM(total_amount) AS total_spend from orders GROUP BY customer_id HAVING SUM(total_amount) > 1000 ORDER BY total_spend DESC;', expected: 'SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 1000 ORDER BY total_spend DESC;', tbls: ['orders'] },
    { title: 'Payment Channel Audit', prompt: 'Select payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum from payments GROUP BY payment_method ORDER BY settled_sum DESC;', expected: 'SELECT payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum FROM payments GROUP BY payment_method ORDER BY settled_sum DESC;', tbls: ['payments'] },
    { title: 'Active Subscriber MRR', prompt: "Select plan, SUM(monthly_cost) AS active_mrr from subscriptions where status = 'active' GROUP BY plan ORDER BY active_mrr DESC;", expected: "SELECT plan, SUM(monthly_cost) AS active_mrr FROM subscriptions WHERE status = 'active' GROUP BY plan ORDER BY active_mrr DESC;", tbls: ['subscriptions'] },
    { title: 'Distinct Product Buyers', prompt: 'Select COUNT(DISTINCT customer_id) AS buying_customers from orders;', expected: 'SELECT COUNT(DISTINCT customer_id) AS buying_customers FROM orders;', tbls: ['orders'] },
    { title: 'World 2 Fortress Boss', prompt: "Select customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent from orders where status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;", expected: "SELECT customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;", tbls: ['orders'] }
  ];

  w2Titles.forEach((item, idx) => {
    const lvlNum = 21 + idx;
    const isBoss = lvlNum === 40;
    const isMystery = lvlNum === 25 || lvlNum === 35;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 2,
      worldName: 'Dune Canyon',
      biome: 'desert',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 28 ? 'Medium' : 'Hard',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: 'SELECT ',
      expectedQuery: item.expected,
      hints: [
        'Remember: All non-aggregated columns in SELECT must appear in GROUP BY.',
        `Target tables: ${item.tbls.join(', ')}.`,
        `Expected query: ${item.expected}`
      ],
      xpReward: isBoss ? 200 : 40 + idx * 3,
      coinReward: isBoss ? 70 : 20,
      pedagogicalNote: `Level ${lvlNum} conquered! Aggregate functions summarize multi-row transactions into KPIs.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // WORLD 3: CRYSTAL ISLES (Levels 41 to 60) — Relational JOINs
  // =========================================================================
  const w3Titles = [
    { title: 'The First Bridge (INNER JOIN)', prompt: 'Join orders o and customers c on o.customer_id = c.customer_id. Select o.order_id, c.first_name, o.total_amount ORDER BY o.order_id ASC;', expected: 'SELECT o.order_id, c.first_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', tbls: ['orders', 'customers'] },
    { title: 'Product Category Link', prompt: 'Join products p and categories c on p.category_id = c.category_id. Select p.name, c.name AS category_name, p.price ORDER BY p.price DESC;', expected: 'SELECT p.name, c.name AS category_name, p.price FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.price DESC;', tbls: ['products', 'categories'] },
    { title: 'Customer Email Orders', prompt: 'Join orders o and customers c on o.customer_id = c.customer_id. Select o.order_id, c.email, o.status ORDER BY o.order_id ASC;', expected: 'SELECT o.order_id, c.email, o.status FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', tbls: ['orders', 'customers'] },
    { title: 'Order Line Items Link', prompt: 'Join order_items oi and products p on oi.product_id = p.product_id. Select oi.order_id, p.name, oi.quantity, oi.unit_price ORDER BY oi.item_id ASC;', expected: 'SELECT oi.order_id, p.name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.item_id ASC;', tbls: ['order_items', 'products'] },
    { title: 'Payment Order Settlement', prompt: 'Join payments p and orders o on p.order_id = o.order_id. Select p.payment_id, o.order_id, p.payment_method, p.amount ORDER BY p.payment_id ASC;', expected: 'SELECT p.payment_id, o.order_id, p.payment_method, p.amount FROM payments p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.payment_id ASC;', tbls: ['payments', 'orders'] },
    { title: 'LEFT JOIN Ingress', prompt: 'Left join customers c with orders o on c.customer_id = o.customer_id. Select c.customer_id, c.first_name, o.order_id ORDER BY c.customer_id ASC, o.order_id ASC;', expected: 'SELECT c.customer_id, c.first_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id ASC, o.order_id ASC;', tbls: ['customers', 'orders'] },
    { title: 'Anti-Join Churn Recon', prompt: 'Use LEFT JOIN between customers c and orders o where o.order_id IS NULL. Select c.customer_id, c.first_name, c.country ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name, c.country FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL ORDER BY c.customer_id ASC;', tbls: ['customers', 'orders'] },
    { title: 'Department Revenue Bridge', prompt: 'Join categories c, products p on c.category_id = p.category_id, and order_items oi on p.product_id = oi.product_id. Select c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales GROUP BY c.department ORDER BY dept_sales DESC;', expected: 'SELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY dept_sales DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Customer City Order Totals', prompt: 'Join customers c and orders o. Select c.city, COUNT(o.order_id) AS total_orders from customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city ORDER BY total_orders DESC;', expected: 'SELECT c.city, COUNT(o.order_id) AS total_orders FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city ORDER BY total_orders DESC;', tbls: ['customers', 'orders'] },
    { title: 'Triple Star Schema', prompt: 'Join customers c, orders o, and payments p. Select c.first_name, o.order_id, p.payment_method, p.amount from customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id ORDER BY o.order_id ASC;', expected: 'SELECT c.first_name, o.order_id, p.payment_method, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id ORDER BY o.order_id ASC;', tbls: ['customers', 'orders', 'payments'] },
    { title: 'Subscriber Customer Map', prompt: 'Join customers c and subscriptions s on c.customer_id = s.customer_id. Select c.first_name, s.plan, s.monthly_cost ORDER BY s.monthly_cost DESC;', expected: 'SELECT c.first_name, s.plan, s.monthly_cost FROM customers c INNER JOIN subscriptions s ON c.customer_id = s.customer_id ORDER BY s.monthly_cost DESC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Top Ordered Products (Join)', prompt: 'Join products p and order_items oi on p.product_id = oi.product_id. Select p.name, SUM(oi.quantity) AS units_sold GROUP BY p.name ORDER BY units_sold DESC LIMIT 5;', expected: 'SELECT p.name, SUM(oi.quantity) AS units_sold FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY units_sold DESC LIMIT 5;', tbls: ['products', 'order_items'] },
    { title: 'Revenue Per Product Line', prompt: 'Join products p and order_items oi on p.product_id = oi.product_id. Select p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue GROUP BY p.name ORDER BY product_revenue DESC LIMIT 5;', expected: 'SELECT p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY product_revenue DESC LIMIT 5;', tbls: ['products', 'order_items'] },
    { title: 'Category Catalog Volume', prompt: 'Join categories c and products p on c.category_id = p.category_id. Select c.name, COUNT(p.product_id) AS sku_count from categories c INNER JOIN products p ON c.category_id = p.category_id GROUP BY c.name ORDER BY sku_count DESC;', expected: 'SELECT c.name, COUNT(p.product_id) AS sku_count FROM categories c INNER JOIN products p ON c.category_id = p.category_id GROUP BY c.name ORDER BY sku_count DESC;', tbls: ['categories', 'products'] },
    { title: 'Country Spending Matrix', prompt: 'Join customers c and orders o on c.customer_id = o.customer_id. Select c.country, SUM(o.total_amount) AS country_revenue GROUP BY c.country ORDER BY country_revenue DESC;', expected: 'SELECT c.country, SUM(o.total_amount) AS country_revenue FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country ORDER BY country_revenue DESC;', tbls: ['customers', 'orders'] },
    { title: 'Declined Payment Trace', prompt: "Join customers c, orders o, payments p. Select c.first_name, o.order_id, p.amount from customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id WHERE p.status = 'declined';", expected: "SELECT c.first_name, o.order_id, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id WHERE p.status = 'declined';", tbls: ['customers', 'orders', 'payments'] },
    { title: 'Non-Subscribed Shoppers', prompt: 'Left join customers c with subscriptions s on c.customer_id = s.customer_id. Select c.customer_id, c.first_name from customers c LEFT JOIN subscriptions s ON c.customer_id = s.customer_id WHERE s.subscription_id IS NULL ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name FROM customers c LEFT JOIN subscriptions s ON c.customer_id = s.customer_id WHERE s.subscription_id IS NULL ORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Average Order Value By Tier', prompt: 'Join subscriptions s and orders o on s.customer_id = o.customer_id. Select s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val from subscriptions s INNER JOIN orders o ON s.customer_id = o.customer_id GROUP BY s.plan ORDER BY avg_order_val DESC;', expected: 'SELECT s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val FROM subscriptions s INNER JOIN orders o ON s.customer_id = o.customer_id GROUP BY s.plan ORDER BY avg_order_val DESC;', tbls: ['subscriptions', 'orders'] },
    { title: 'Category Average Order Size', prompt: 'Join categories c, products p on c.category_id = p.category_id, and order_items oi on p.product_id = oi.product_id. Select c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty from categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY avg_qty DESC;', expected: 'SELECT c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY avg_qty DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'World 3 Fortress Boss', prompt: "Join customers c, orders o, and categories cat, products p, order_items oi on o.customer_id = c.customer_id and o.order_id = oi.order_id and oi.product_id = p.product_id and p.category_id = cat.category_id. Select c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend from customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY c.first_name, cat.department HAVING spend > 1000 ORDER BY spend DESC;", expected: 'SELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY c.first_name, cat.department HAVING spend > 1000 ORDER BY spend DESC;', tbls: ['customers', 'orders', 'order_items', 'products', 'categories'] }
  ];

  w3Titles.forEach((item, idx) => {
    const lvlNum = 41 + idx;
    const isBoss = lvlNum === 60;
    const isMystery = lvlNum === 48 || lvlNum === 55;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 3,
      worldName: 'Crystal Isles',
      biome: 'bridge',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 48 ? 'Medium' : 'Hard',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: 'SELECT ',
      expectedQuery: item.expected,
      hints: [
        'Use table aliases (e.g. customers c, orders o) to keep joins concise.',
        `Target tables: ${item.tbls.join(', ')}.`,
        `Expected query: ${item.expected}`
      ],
      xpReward: isBoss ? 220 : 50 + idx * 3,
      coinReward: isBoss ? 75 : 22,
      pedagogicalNote: `Level ${lvlNum} completed! Relational integrity connects independent entities into unified enterprise views.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // WORLD 4: LOGIC CAVERNS (Levels 61 to 80) — CASE, Subqueries & Transformation
  // =========================================================================
  const w4Titles = [
    { title: 'Binary CASE Branching', prompt: "Select name, price, CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class from products ORDER BY price DESC;", expected: "SELECT name, price, CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class FROM products ORDER BY price DESC;", tbls: ['products'] },
    { title: 'Three-Tier Segmentation', prompt: "Select name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS tier from products ORDER BY price ASC;", expected: "SELECT name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS tier FROM products ORDER BY price ASC;", tbls: ['products'] },
    { title: 'OrderStatus Flagging', prompt: "Select order_id, total_amount, CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state from orders ORDER BY order_id ASC;", expected: "SELECT order_id, total_amount, CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state FROM orders ORDER BY order_id ASC;", tbls: ['orders'] },
    { title: 'String Length Calculation', prompt: 'Select name, LENGTH(name) AS name_char_count from products ORDER BY name_char_count DESC;', expected: 'SELECT name, LENGTH(name) AS name_char_count FROM products ORDER BY name_char_count DESC;', tbls: ['products'] },
    { title: 'Uppercase Transformation', prompt: 'Select UPPER(first_name) AS loud_name, LOWER(email) AS clean_email from customers ORDER BY loud_name ASC;', expected: 'SELECT UPPER(first_name) AS loud_name, LOWER(email) AS clean_email FROM customers ORDER BY loud_name ASC;', tbls: ['customers'] },
    { title: 'Year Extraction (SUBSTR)', prompt: 'Select order_id, SUBSTR(order_date, 1, 4) AS order_year from orders ORDER BY order_id ASC;', expected: 'SELECT order_id, SUBSTR(order_date, 1, 4) AS order_year FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Month Extraction', prompt: 'Select order_id, SUBSTR(order_date, 1, 7) AS order_month from orders ORDER BY order_id ASC;', expected: 'SELECT order_id, SUBSTR(order_date, 1, 7) AS order_month FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Monthly Revenue Cohort', prompt: 'Select SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue from orders GROUP BY month ORDER BY month ASC;', expected: 'SELECT SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue FROM orders GROUP BY month ORDER BY month ASC;', tbls: ['orders'] },
    { title: 'COALESCE Null Shield', prompt: "Select subscription_id, COALESCE(cancel_date, 'Active Plan') AS plan_state from subscriptions ORDER BY subscription_id ASC;", expected: "SELECT subscription_id, COALESCE(cancel_date, 'Active Plan') AS plan_state FROM subscriptions ORDER BY subscription_id ASC;", tbls: ['subscriptions'] },
    { title: 'Scalar Subquery Filter', prompt: 'Select name, price from products where price > (SELECT AVG(price) FROM products) ORDER BY price DESC;', expected: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;', tbls: ['products'] },
    { title: 'Subquery With Max Date', prompt: 'Select order_id, customer_id, order_date from orders where order_date = (SELECT MAX(order_date) FROM orders);', expected: 'SELECT order_id, customer_id, order_date FROM orders WHERE order_date = (SELECT MAX(order_date) FROM orders);', tbls: ['orders'] },
    { title: 'WHERE IN Subquery', prompt: "Select first_name, email from customers where customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed') ORDER BY first_name ASC;", expected: "SELECT first_name, email FROM customers WHERE customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed') ORDER BY first_name ASC;", tbls: ['customers', 'orders'] },
    { title: 'WHERE NOT IN Anti-Subquery', prompt: 'Select first_name, country from customers where customer_id NOT IN (SELECT customer_id FROM orders) ORDER BY first_name ASC;', expected: 'SELECT first_name, country FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders) ORDER BY first_name ASC;', tbls: ['customers', 'orders'] },
    { title: 'Subquery in SELECT Projection', prompt: 'Select name, price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean from products ORDER BY diff_from_mean DESC;', expected: 'SELECT name, price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean FROM products ORDER BY diff_from_mean DESC;', tbls: ['products'] },
    { title: 'EXISTS Predicate Guard', prompt: 'Select c.customer_id, c.first_name from customers c where EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name FROM customers c WHERE EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'NOT EXISTS Anti-Guard', prompt: 'Select c.customer_id, c.first_name from customers c where NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Conditional Aggregation (SUM CASE)', prompt: "Select COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders from orders;", expected: "SELECT COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders FROM orders;", tbls: ['orders'] },
    { title: 'Payment Channel Pivot with CASE', prompt: "Select SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_volume from payments;", expected: "SELECT SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_volume FROM payments;", tbls: ['payments'] },
    { title: 'Subquery Aggregate Comparison', prompt: 'Select customer_id, total_amount from orders where total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;', expected: 'SELECT customer_id, total_amount FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;', tbls: ['orders'] },
    { title: 'World 4 Fortress Boss', prompt: "Select name, price, CASE WHEN price > (SELECT AVG(price) FROM products) THEN 'Above Average' ELSE 'Below Average' END AS benchmark_tag from products ORDER BY price DESC;", expected: "SELECT name, price, CASE WHEN price > (SELECT AVG(price) FROM products) THEN 'Above Average' ELSE 'Below Average' END AS benchmark_tag FROM products ORDER BY price DESC;", tbls: ['products'] }
  ];

  w4Titles.forEach((item, idx) => {
    const lvlNum = 61 + idx;
    const isBoss = lvlNum === 80;
    const isMystery = lvlNum === 67 || lvlNum === 75;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 4,
      worldName: 'Logic Caverns',
      biome: 'cavern',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 70 ? 'Hard' : 'Expert',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: 'SELECT ',
      expectedQuery: item.expected,
      hints: [
        'CASE WHEN condition THEN result ELSE fallback END.',
        `Target tables: ${item.tbls.join(', ')}.`,
        `Expected query: ${item.expected}`
      ],
      xpReward: isBoss ? 250 : 60 + idx * 3,
      coinReward: isBoss ? 80 : 25,
      pedagogicalNote: `Level ${lvlNum} mastered! Procedural conditional branching is executed natively in SQL without backend latency.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // WORLD 5: BOWSER'S VOLCANO (Levels 81 to 100) — CTEs & Window Functions
  // =========================================================================
  const w5Titles = [
    { title: 'First CTE Pipeline (WITH)', prompt: 'WITH spending AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT * FROM spending WHERE total_spent > 1000 ORDER BY total_spent DESC;', expected: 'WITH spending AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT * FROM spending WHERE total_spent > 1000 ORDER BY total_spent DESC;', tbls: ['orders'] },
    { title: 'CTE with Joined Output', prompt: 'WITH order_totals AS (SELECT customer_id, COUNT(*) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, ot.orders_count FROM customers c INNER JOIN order_totals ot ON c.customer_id = ot.customer_id ORDER BY ot.orders_count DESC;', expected: 'WITH order_totals AS (SELECT customer_id, COUNT(*) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, ot.orders_count FROM customers c INNER JOIN order_totals ot ON c.customer_id = ot.customer_id ORDER BY ot.orders_count DESC;', tbls: ['customers', 'orders'] },
    { title: 'Dual Chained CTEs', prompt: 'WITH active_subs AS (SELECT customer_id, monthly_cost FROM subscriptions WHERE status = "active"), total_orders AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id) SELECT a.customer_id, a.monthly_cost, t.spend FROM active_subs a INNER JOIN total_orders t ON a.customer_id = t.customer_id ORDER BY t.spend DESC;', expected: "WITH active_subs AS (SELECT customer_id, monthly_cost FROM subscriptions WHERE status = 'active'), total_orders AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id) SELECT a.customer_id, a.monthly_cost, t.spend FROM active_subs a INNER JOIN total_orders t ON a.customer_id = t.customer_id ORDER BY t.spend DESC;", tbls: ['subscriptions', 'orders'] },
    { title: 'CTE Categorical Rollup', prompt: 'WITH sku_rev AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, sr.rev FROM products p INNER JOIN sku_rev sr ON p.product_id = sr.product_id ORDER BY sr.rev DESC LIMIT 5;', expected: 'WITH sku_rev AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, sr.rev FROM products p INNER JOIN sku_rev sr ON p.product_id = sr.product_id ORDER BY sr.rev DESC LIMIT 5;', tbls: ['order_items', 'products'] },
    { title: 'ROW_NUMBER Ranking', prompt: 'Select order_id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank from orders ORDER BY spend_rank ASC;', expected: 'SELECT order_id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank FROM orders ORDER BY spend_rank ASC;', tbls: ['orders'] },
    { title: 'PARTITION BY Customer', prompt: 'Select order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank from orders ORDER BY customer_id ASC, customer_rank ASC;', expected: 'SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank FROM orders ORDER BY customer_id ASC, customer_rank ASC;', tbls: ['orders'] },
    { title: 'RANK Function Tie Breaker', prompt: 'Select product_id, name, price, RANK() OVER (ORDER BY price DESC) AS price_rank from products ORDER BY price_rank ASC;', expected: 'SELECT product_id, name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products ORDER BY price_rank ASC;', tbls: ['products'] },
    { title: 'DENSE_RANK Density Check', prompt: 'Select product_id, category_id, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank from products ORDER BY category_id ASC, category_price_rank ASC;', expected: 'SELECT product_id, category_id, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank FROM products ORDER BY category_id ASC, category_price_rank ASC;', tbls: ['products'] },
    { title: 'LAG Temporal Step', prompt: 'Select order_id, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount from orders ORDER BY order_id ASC;', expected: 'SELECT order_id, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'LEAD Future Lookahead', prompt: 'Select order_id, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount from orders ORDER BY order_id ASC;', expected: 'SELECT order_id, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Running Cumulative Spend', prompt: 'Select order_id, customer_id, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend from orders ORDER BY customer_id ASC, order_id ASC;', expected: 'SELECT order_id, customer_id, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend FROM orders ORDER BY customer_id ASC, order_id ASC;', tbls: ['orders'] },
    { title: 'First Value in Window', prompt: 'Select order_id, customer_id, total_amount, FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount from orders ORDER BY customer_id ASC, order_id ASC;', expected: 'SELECT order_id, customer_id, total_amount, FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount FROM orders ORDER BY customer_id ASC, order_id ASC;', tbls: ['orders'] },
    { title: 'Department Price Rank', prompt: 'Select c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank from categories c INNER JOIN products p ON c.category_id = p.category_id ORDER BY c.department ASC, dept_rank ASC;', expected: 'SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank FROM categories c INNER JOIN products p ON c.category_id = p.category_id ORDER BY c.department ASC, dept_rank ASC;', tbls: ['categories', 'products'] },
    { title: 'Top-1 Item Per Department', prompt: 'WITH ranked AS (SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS rnk FROM categories c INNER JOIN products p ON c.category_id = p.category_id) SELECT department, name, price FROM ranked WHERE rnk = 1 ORDER BY price DESC;', expected: 'WITH ranked AS (SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS rnk FROM categories c INNER JOIN products p ON c.category_id = p.category_id) SELECT department, name, price FROM ranked WHERE rnk = 1 ORDER BY price DESC;', tbls: ['categories', 'products'] },
    { title: 'Growth Delta Over Previous Order', prompt: 'Select order_id, total_amount, ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta from orders ORDER BY order_id ASC;', expected: 'SELECT order_id, total_amount, ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Top Spender Window Filter', prompt: 'WITH ranked_cust AS (SELECT customer_id, SUM(total_amount) AS spent, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spender_rank FROM orders GROUP BY customer_id) SELECT customer_id, spent, spender_rank FROM ranked_cust WHERE spender_rank <= 3;', expected: 'WITH ranked_cust AS (SELECT customer_id, SUM(total_amount) AS spent, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spender_rank FROM orders GROUP BY customer_id) SELECT customer_id, spent, spender_rank FROM ranked_cust WHERE spender_rank <= 3;', tbls: ['orders'] },
    { title: 'Global Share of Department Sales', prompt: 'WITH dept_sales AS (SELECT c.department, SUM(oi.quantity * oi.unit_price) AS sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department) SELECT department, sales, ROUND(sales * 100.0 / (SELECT SUM(sales) FROM dept_sales), 2) AS pct_share FROM dept_sales ORDER BY sales DESC;', expected: 'WITH dept_sales AS (SELECT c.department, SUM(oi.quantity * oi.unit_price) AS sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department) SELECT department, sales, ROUND(sales * 100.0 / (SELECT SUM(sales) FROM dept_sales), 2) AS pct_share FROM dept_sales ORDER BY sales DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Payment Reliability Metrics', prompt: 'WITH p_stats AS (SELECT payment_method, COUNT(*) AS txs, SUM(amount) AS vol FROM payments WHERE status = "approved" GROUP BY payment_method) SELECT payment_method, txs, vol, DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank FROM p_stats;', expected: "WITH p_stats AS (SELECT payment_method, COUNT(*) AS txs, SUM(amount) AS vol FROM payments WHERE status = 'approved' GROUP BY payment_method) SELECT payment_method, txs, vol, DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank FROM p_stats;", tbls: ['payments'] },
    { title: 'The Gate Before The Dragon', prompt: 'WITH monthly_kpi AS (SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY month) SELECT month, total_orders, monthly_revenue, LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev FROM monthly_kpi ORDER BY month ASC;', expected: 'WITH monthly_kpi AS (SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY month) SELECT month, total_orders, monthly_revenue, LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev FROM monthly_kpi ORDER BY month ASC;', tbls: ['orders'] },
    { title: "Bowser's Citadel: Grand Master Boss", prompt: 'WITH customer_kpi AS (SELECT c.customer_id, c.first_name, c.country, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS lifetime_value, DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS ltv_rank FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.country) SELECT customer_id, first_name, country, total_orders, lifetime_value, ltv_rank FROM customer_kpi WHERE ltv_rank <= 5 ORDER BY ltv_rank ASC;', expected: 'WITH customer_kpi AS (SELECT c.customer_id, c.first_name, c.country, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS lifetime_value, DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS ltv_rank FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.country) SELECT customer_id, first_name, country, total_orders, lifetime_value, ltv_rank FROM customer_kpi WHERE ltv_rank <= 5 ORDER BY ltv_rank ASC;', tbls: ['customers', 'orders'] }
  ];

  w5Titles.forEach((item, idx) => {
    const lvlNum = 81 + idx;
    const isBoss = lvlNum === 100;
    const isMystery = lvlNum === 88 || lvlNum === 95;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 5,
      worldName: "Bowser's Volcano",
      biome: 'volcano',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : 'Expert',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: 'WITH ',
      expectedQuery: item.expected,
      hints: [
        'Define the CTE with: WITH cte_name AS (...) SELECT ...',
        `Target tables: ${item.tbls.join(', ')}.`,
        `Expected query: ${item.expected}`
      ],
      xpReward: isBoss ? 500 : 80 + idx * 4,
      coinReward: isBoss ? 150 : 30,
      pedagogicalNote: `Level ${lvlNum} conquered! Window functions compute analytical rankings while preserving granular event streams.`,
      position: calculateWindingPath(idx)
    });
  });

  return levels;
}

export const ALL_100_LEVELS = build100Levels();
