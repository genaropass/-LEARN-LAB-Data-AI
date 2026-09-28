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
  position: { x: number; y: number };
}

function calculateWindingPath(indexInWorld: number): { x: number; y: number } {
  const step = indexInWorld;
  const y = 8 + (step * 4.3);
  const wave = Math.sin(step * 0.7);
  const x = Math.round(50 + wave * 32);
  return { x, y };
}

export const GAME_WORLDS = [
  {
    number: 1,
    name: 'Reino de las Praderas',
    subtitle: 'Llanuras de SELECT, WHERE y Proyección',
    biome: 'plains' as const,
    bgImage: '/maps/world_1_plains.jpg',
    levelsRange: [1, 20],
    accentColor: '#10B981'
  },
  {
    number: 2,
    name: 'Cañón de las Dunas',
    subtitle: 'El Desierto de Agregaciones y GROUP BY',
    biome: 'desert' as const,
    bgImage: '/maps/world_2_desert.jpg',
    levelsRange: [21, 40],
    accentColor: '#F59E0B'
  },
  {
    number: 3,
    name: 'Islas de Cristal',
    subtitle: 'El Océano de JOINs Relacionales',
    biome: 'bridge' as const,
    bgImage: '/maps/world_1_plains.jpg',
    levelsRange: [41, 60],
    accentColor: '#06B6D4'
  },
  {
    number: 4,
    name: 'Cavernas de la Lógica',
    subtitle: 'El Subterráneo de CASE, Subconsultas y Funciones',
    biome: 'cavern' as const,
    bgImage: '/maps/world_2_desert.jpg',
    levelsRange: [61, 80],
    accentColor: '#8B5CF6'
  },
  {
    number: 5,
    name: 'Volcán de Bowser',
    subtitle: 'La Ciudadela de CTEs y Funciones Ventana',
    biome: 'volcano' as const,
    bgImage: '/maps/world_3_volcano.jpg',
    levelsRange: [81, 100],
    accentColor: '#EF4444'
  }
];

export function build100Levels(): GameLevel[] {
  const levels: GameLevel[] = [];

  // =========================================================================
  // MUNDO 1: REINO DE LAS PRADERAS (Niveles 1 al 20)
  // =========================================================================
  const w1Titles = [
    { 
      title: 'La Primera Chispa', 
      prompt: '¡Bienvenido a Learn-Lab! Selecciona todas las columnas de la tabla customers usando el asterisco (*). Puedes ejecutar la consulta inicial directamente.', 
      expected: 'SELECT * FROM customers;', 
      initial: 'SELECT * FROM customers;',
      tbls: ['customers'],
      hint: 'En SQL usamos el asterisco (*) para traer todas las columnas: SELECT * FROM customers;'
    },
    { 
      title: 'Proyección Individual', 
      prompt: 'Selecciona únicamente la columna first_name de la tabla customers.', 
      expected: 'SELECT first_name FROM customers;', 
      initial: 'SELECT first_name FROM customers;',
      tbls: ['customers'],
      hint: 'Reemplaza el asterisco por el nombre del campo: SELECT first_name FROM customers;'
    },
    { 
      title: 'Doble Identidad', 
      prompt: 'Selecciona las columnas first_name y last_name de la tabla customers.', 
      expected: 'SELECT first_name, last_name FROM customers;', 
      initial: 'SELECT first_name, last_name FROM customers;',
      tbls: ['customers'],
      hint: 'Separa múltiples columnas con una coma: SELECT first_name, last_name FROM customers;'
    },
    { 
      title: 'Directorio de Contacto', 
      prompt: 'Selecciona email y city de la tabla customers.', 
      expected: 'SELECT email, city FROM customers;', 
      initial: 'SELECT email, city FROM customers;',
      tbls: ['customers'],
      hint: 'Escribe: SELECT email, city FROM customers;'
    },
    { 
      title: 'Alias de Columnas (AS)', 
      prompt: 'Selecciona name AS product_name y price AS retail_price de la tabla products.', 
      expected: 'SELECT name AS product_name, price AS retail_price FROM products;', 
      initial: 'SELECT name AS product_name, price AS retail_price FROM products;',
      tbls: ['products'],
      hint: 'Usa la palabra AS para renombrar columnas en la salida.'
    },
    { 
      title: 'Puerta de Igualdad (WHERE)', 
      prompt: "Filtra los clientes donde country sea 'Germany'. Trae todas las columnas (*).", 
      expected: "SELECT * FROM customers WHERE country = 'Germany';", 
      initial: "SELECT * FROM customers WHERE country = 'Germany';",
      tbls: ['customers'],
      hint: "Los textos en SQL van entre comillas simples: WHERE country = 'Germany';"
    },
    { 
      title: 'Umbral de Precios', 
      prompt: 'Selecciona name y price de la tabla products donde price sea mayor a 500.', 
      expected: 'SELECT name, price FROM products WHERE price > 500;', 
      initial: 'SELECT name, price FROM products WHERE price > 500;',
      tbls: ['products'],
      hint: 'Usa el operador mayor que (>): WHERE price > 500;'
    },
    { 
      title: 'Alerta de Inventario', 
      prompt: 'Selecciona name y stock_quantity de la tabla products donde stock_quantity sea menor o igual a 25.', 
      expected: 'SELECT name, stock_quantity FROM products WHERE stock_quantity <= 25;', 
      initial: 'SELECT name, stock_quantity FROM products WHERE stock_quantity <= 25;',
      tbls: ['products'],
      hint: 'Usa el operador menor o igual (<=): WHERE stock_quantity <= 25;'
    },
    { 
      title: 'Aislamiento por País', 
      prompt: "Selecciona first_name y email de la tabla customers donde country sea 'USA'.", 
      expected: "SELECT first_name, email FROM customers WHERE country = 'USA';", 
      initial: "SELECT first_name, email FROM customers WHERE country = 'USA';",
      tbls: ['customers'],
      hint: "Escribe: SELECT first_name, email FROM customers WHERE country = 'USA';"
    },
    { 
      title: 'Doble Condición (AND)', 
      prompt: 'Selecciona name y price de la tabla products donde price > 200 AND price < 1000.', 
      expected: 'SELECT name, price FROM products WHERE price > 200 AND price < 1000;', 
      initial: 'SELECT name, price FROM products WHERE price > 200 AND price < 1000;',
      tbls: ['products'],
      hint: 'Usa el operador AND para exigir que ambas condiciones se cumplan.'
    },
    { 
      title: 'Caminos Alternativos (OR)', 
      prompt: "Selecciona todas las columnas de orders donde status = 'completed' OR status = 'shipped'.", 
      expected: "SELECT * FROM orders WHERE status = 'completed' OR status = 'shipped';", 
      initial: "SELECT * FROM orders WHERE status = 'completed' OR status = 'shipped';",
      tbls: ['orders'],
      hint: 'Usa OR para incluir filas que cumplan cualquiera de los dos estados.'
    },
    { 
      title: 'Rango Numérico (BETWEEN)', 
      prompt: 'Selecciona name y price de la tabla products donde price esté BETWEEN 100 AND 500.', 
      expected: 'SELECT name, price FROM products WHERE price BETWEEN 100 AND 500;', 
      initial: 'SELECT name, price FROM products WHERE price BETWEEN 100 AND 500;',
      tbls: ['products'],
      hint: 'BETWEEN incluye los valores límites: WHERE price BETWEEN 100 AND 500;'
    },
    { 
      title: 'Conjunto de Valores (IN)', 
      prompt: "Selecciona first_name y country de customers donde country esté en ('Germany', 'France', 'Japan').", 
      expected: "SELECT first_name, country FROM customers WHERE country IN ('Germany', 'France', 'Japan');", 
      initial: "SELECT first_name, country FROM customers WHERE country IN ('Germany', 'France', 'Japan');",
      tbls: ['customers'],
      hint: "Usa IN ('Germany', 'France', 'Japan') en lugar de múltiples OR."
    },
    { 
      title: 'Orden Ascendente (ORDER BY)', 
      prompt: 'Selecciona name y price de products ordenados por price de menor a mayor (ASC).', 
      expected: 'SELECT name, price FROM products ORDER BY price ASC;', 
      initial: 'SELECT name, price FROM products ORDER BY price ASC;',
      tbls: ['products'],
      hint: 'Añade ORDER BY price ASC al final de la consulta.'
    },
    { 
      title: 'Prioridad Descendente (DESC)', 
      prompt: 'Selecciona order_id y total_amount de orders ordenados por total_amount de mayor a menor (DESC).', 
      expected: 'SELECT order_id, total_amount FROM orders ORDER BY total_amount DESC;', 
      initial: 'SELECT order_id, total_amount FROM orders ORDER BY total_amount DESC;',
      tbls: ['orders'],
      hint: 'Usa ORDER BY total_amount DESC para ordenar de mayor a menor.'
    },
    { 
      title: 'Top-3 Artículos Estrella (LIMIT)', 
      prompt: 'Selecciona name y price de products ordenados por price DESC con un límite de 3 (LIMIT 3).', 
      expected: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;', 
      initial: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;',
      tbls: ['products'],
      hint: 'LIMIT 3 devuelve únicamente los primeros 3 resultados del ordenamiento.'
    },
    { 
      title: 'Naciones sin Duplicados (DISTINCT)', 
      prompt: 'Selecciona valores únicos con DISTINCT country de customers ordenados por country ASC.', 
      expected: 'SELECT DISTINCT country FROM customers ORDER BY country ASC;', 
      initial: 'SELECT DISTINCT country FROM customers ORDER BY country ASC;',
      tbls: ['customers'],
      hint: 'DISTINCT elimina filas duplicadas del resultado.'
    },
    { 
      title: 'Paginación de Datos (OFFSET)', 
      prompt: 'Selecciona name y price de products ORDER BY price ASC LIMIT 3 OFFSET 3;', 
      expected: 'SELECT name, price FROM products ORDER BY price ASC LIMIT 3 OFFSET 3;', 
      initial: 'SELECT name, price FROM products ORDER BY price ASC LIMIT 3 OFFSET 3;',
      tbls: ['products'],
      hint: 'OFFSET 3 omite las primeras 3 filas antes de tomar las 3 siguientes.'
    },
    { 
      title: 'Descubrimiento de Nulos (IS NULL)', 
      prompt: 'Selecciona todas las columnas (*) de subscriptions donde cancel_date IS NULL;', 
      expected: 'SELECT * FROM subscriptions WHERE cancel_date IS NULL;', 
      initial: 'SELECT * FROM subscriptions WHERE cancel_date IS NULL;',
      tbls: ['subscriptions'],
      hint: 'Los valores nulos se comparan con IS NULL (nunca con = NULL).'
    },
    { 
      title: 'Castillo del Jefe Mundo 1', 
      prompt: "Jefe #01: Selecciona customer_id y total_amount de orders donde status = 'completed' y total_amount > 500, ordenado por total_amount DESC LIMIT 5;", 
      expected: "SELECT customer_id, total_amount FROM orders WHERE status = 'completed' AND total_amount > 500 ORDER BY total_amount DESC LIMIT 5;", 
      initial: "SELECT customer_id, total_amount FROM orders WHERE status = 'completed' AND total_amount > 500 ORDER BY total_amount DESC LIMIT 5;",
      tbls: ['orders'],
      hint: "Combina WHERE status = 'completed' AND total_amount > 500 con ORDER BY y LIMIT."
    }
  ];

  w1Titles.forEach((item, idx) => {
    const lvlNum = idx + 1;
    const isBoss = lvlNum === 20;
    const isMystery = lvlNum === 5 || lvlNum === 12;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 1,
      worldName: 'Reino de las Praderas',
      biome: 'plains',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 8 ? 'Easy' : 'Medium',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: item.initial || 'SELECT * FROM customers;',
      expectedQuery: item.expected,
      hints: [
        item.hint,
        `Tablas del objetivo: ${item.tbls.join(', ')}.`,
        `Estructura esperada: ${item.expected}`
      ],
      xpReward: isBoss ? 150 : 25 + lvlNum * 2,
      coinReward: isBoss ? 60 : 15,
      pedagogicalNote: `¡Nivel ${lvlNum} completado! Dominar SELECT y WHERE es la base absoluta de la analítica relacional.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // MUNDO 2: CAÑÓN DE LAS DUNAS (Niveles 21 al 40) — Agregaciones y GROUP BY
  // =========================================================================
  const w2Titles = [
    { title: 'Censo de Clientes (COUNT)', prompt: 'Calcula el número total de clientes con SELECT COUNT(*) AS total_customers FROM customers;', expected: 'SELECT COUNT(*) AS total_customers FROM customers;', tbls: ['customers'] },
    { title: 'Ingresos Brutos (SUM)', prompt: 'Calcula la suma total facturada con SELECT SUM(total_amount) AS gross_sales FROM orders;', expected: 'SELECT SUM(total_amount) AS gross_sales FROM orders;', tbls: ['orders'] },
    { title: 'Precio Promedio (AVG)', prompt: 'Calcula el precio promedio redondeado a 2 decimales: SELECT ROUND(AVG(price), 2) AS average_price FROM products;', expected: 'SELECT ROUND(AVG(price), 2) AS average_price FROM products;', tbls: ['products'] },
    { title: 'Límites Extremos (MIN/MAX)', prompt: 'Selecciona MIN(price) AS lowest_price, MAX(price) AS highest_price FROM products;', expected: 'SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price FROM products;', tbls: ['products'] },
    { title: 'Volumen Completado Filtrado', prompt: "Calcula cuántas órdenes están completadas: SELECT COUNT(*) AS completed_count FROM orders WHERE status = 'completed';", expected: "SELECT COUNT(*) AS completed_count FROM orders WHERE status = 'completed';", tbls: ['orders'] },
    { title: 'Agrupación por País (GROUP BY)', prompt: 'Agrupa por country y cuenta clientes: SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country ORDER BY customer_count DESC;', expected: 'SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country ORDER BY customer_count DESC;', tbls: ['customers'] },
    { title: 'Resumen por Estado de Pedido', prompt: 'Cuenta pedidos por estado: SELECT status, COUNT(*) AS orders_count FROM orders GROUP BY status;', expected: 'SELECT status, COUNT(*) AS orders_count FROM orders GROUP BY status;', tbls: ['orders'] },
    { title: 'Ingresos por Estado', prompt: 'Calcula los ingresos por estado: SELECT status, SUM(total_amount) AS status_revenue FROM orders GROUP BY status ORDER BY status_revenue DESC;', expected: 'SELECT status, SUM(total_amount) AS status_revenue FROM orders GROUP BY status ORDER BY status_revenue DESC;', tbls: ['orders'] },
    { title: 'Inventario por Categoría', prompt: 'Suma el stock_quantity por category_id: SELECT category_id, SUM(stock_quantity) AS total_inventory FROM products GROUP BY category_id ORDER BY total_inventory DESC;', expected: 'SELECT category_id, SUM(stock_quantity) AS total_inventory FROM products GROUP BY category_id ORDER BY total_inventory DESC;', tbls: ['products'] },
    { title: 'Precio Promedio por Categoría', prompt: 'Calcula el promedio de precio por categoría: SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id ORDER BY avg_price DESC;', expected: 'SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id ORDER BY avg_price DESC;', tbls: ['products'] },
    { title: 'Pedidos por Cliente', prompt: 'Cuenta los pedidos por cada cliente: SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id ORDER BY total_orders DESC;', expected: 'SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id ORDER BY total_orders DESC;', tbls: ['orders'] },
    { title: 'Gasto Total por Cliente', prompt: 'Calcula el gasto acumulado por cliente: SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id ORDER BY total_spent DESC;', expected: 'SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id ORDER BY total_spent DESC;', tbls: ['orders'] },
    { title: 'Censo de Suscripciones por Plan', prompt: 'Cuenta suscriptores por plan: SELECT plan, COUNT(*) AS subscriber_count FROM subscriptions GROUP BY plan ORDER BY subscriber_count DESC;', expected: 'SELECT plan, COUNT(*) AS subscriber_count FROM subscriptions GROUP BY plan ORDER BY subscriber_count DESC;', tbls: ['subscriptions'] },
    { title: 'Facturación Mensual MRR', prompt: 'Calcula los ingresos mensuales recurrentes: SELECT plan, SUM(monthly_cost) AS total_mrr FROM subscriptions GROUP BY plan ORDER BY total_mrr DESC;', expected: 'SELECT plan, SUM(monthly_cost) AS total_mrr FROM subscriptions GROUP BY plan ORDER BY total_mrr DESC;', tbls: ['subscriptions'] },
    { title: 'Filtro sobre Grupos (HAVING)', prompt: 'Filtra clientes con más de 1 pedido: SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY order_count DESC;', expected: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY order_count DESC;', tbls: ['orders'] },
    { title: 'Umbral de Altos Compradores', prompt: 'Filtra clientes que gastaron más de 1000: SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 1000 ORDER BY total_spend DESC;', expected: 'SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 1000 ORDER BY total_spend DESC;', tbls: ['orders'] },
    { title: 'Auditoría de Métodos de Pago', prompt: 'Analiza pagos por método: SELECT payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum FROM payments GROUP BY payment_method ORDER BY settled_sum DESC;', expected: 'SELECT payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum FROM payments GROUP BY payment_method ORDER BY settled_sum DESC;', tbls: ['payments'] },
    { title: 'MRR de Suscriptores Activos', prompt: "Suma monthly_cost de suscriptores activos: SELECT plan, SUM(monthly_cost) AS active_mrr FROM subscriptions WHERE status = 'active' GROUP BY plan ORDER BY active_mrr DESC;", expected: "SELECT plan, SUM(monthly_cost) AS active_mrr FROM subscriptions WHERE status = 'active' GROUP BY plan ORDER BY active_mrr DESC;", tbls: ['subscriptions'] },
    { title: 'Compradores Únicos Reales', prompt: 'Cuenta clientes únicos que han comprado: SELECT COUNT(DISTINCT customer_id) AS buying_customers FROM orders;', expected: 'SELECT COUNT(DISTINCT customer_id) AS buying_customers FROM orders;', tbls: ['orders'] },
    { title: 'Castillo del Jefe Mundo 2', prompt: "Jefe #02: Selecciona customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;", expected: "SELECT customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;", tbls: ['orders'] }
  ];

  w2Titles.forEach((item, idx) => {
    const lvlNum = 21 + idx;
    const isBoss = lvlNum === 40;
    const isMystery = lvlNum === 25 || lvlNum === 35;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 2,
      worldName: 'Cañón de las Dunas',
      biome: 'desert',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 28 ? 'Medium' : 'Hard',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: item.expected,
      expectedQuery: item.expected,
      hints: [
        'Recuerda: Cualquier columna no agregada en SELECT debe estar presente en GROUP BY.',
        `Tablas del objetivo: ${item.tbls.join(', ')}.`,
        `Consulta de referencia: ${item.expected}`
      ],
      xpReward: isBoss ? 200 : 40 + idx * 3,
      coinReward: isBoss ? 70 : 20,
      pedagogicalNote: `¡Nivel ${lvlNum} superado! GROUP BY y HAVING transforman millones de transacciones individuales en métricas gerenciales (KPIs).`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // MUNDO 3: ISLAS DE CRISTAL (Niveles 41 al 60) — JOINs Relacionales
  // =========================================================================
  const w3Titles = [
    { title: 'El Primer Puente (INNER JOIN)', prompt: 'Conecta orders y customers: SELECT o.order_id, c.first_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', expected: 'SELECT o.order_id, c.first_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', tbls: ['orders', 'customers'] },
    { title: 'Enlace Producto y Categoría', prompt: 'Conecta products y categories: SELECT p.name, c.name AS category_name, p.price FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.price DESC;', expected: 'SELECT p.name, c.name AS category_name, p.price FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.price DESC;', tbls: ['products', 'categories'] },
    { title: 'Correo y Pedidos', prompt: 'Conecta orders y customers: SELECT o.order_id, c.email, o.status FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', expected: 'SELECT o.order_id, c.email, o.status FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', tbls: ['orders', 'customers'] },
    { title: 'Detalle de Líneas de Ítems', prompt: 'Conecta order_items y products: SELECT oi.order_id, p.name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.item_id ASC;', expected: 'SELECT oi.order_id, p.name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.item_id ASC;', tbls: ['order_items', 'products'] },
    { title: 'Liquidación de Pagos', prompt: 'Conecta payments y orders: SELECT p.payment_id, o.order_id, p.payment_method, p.amount FROM payments p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.payment_id ASC;', expected: 'SELECT p.payment_id, o.order_id, p.payment_method, p.amount FROM payments p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.payment_id ASC;', tbls: ['payments', 'orders'] },
    { title: 'Unión Izquierda (LEFT JOIN)', prompt: 'Incluye clientes sin pedidos: SELECT c.customer_id, c.first_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id ASC, o.order_id ASC;', expected: 'SELECT c.customer_id, c.first_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id ASC, o.order_id ASC;', tbls: ['customers', 'orders'] },
    { title: 'Clientes sin Compras (Anti-Join)', prompt: 'Encuentra clientes que nunca han pedido nada usando LEFT JOIN y WHERE o.order_id IS NULL: SELECT c.customer_id, c.first_name, c.country FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name, c.country FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL ORDER BY c.customer_id ASC;', tbls: ['customers', 'orders'] },
    { title: 'Ingresos por Departamento', prompt: 'Conecta categories, products y order_items: SELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY dept_sales DESC;', expected: 'SELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY dept_sales DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Volumen de Órdenes por Ciudad', prompt: 'Cuenta pedidos por ciudad: SELECT c.city, COUNT(o.order_id) AS total_orders FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city ORDER BY total_orders DESC;', expected: 'SELECT c.city, COUNT(o.order_id) AS total_orders FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city ORDER BY total_orders DESC;', tbls: ['customers', 'orders'] },
    { title: 'Esquema Estrella Triple', prompt: 'Conecta customers, orders y payments: SELECT c.first_name, o.order_id, p.payment_method, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id ORDER BY o.order_id ASC;', expected: 'SELECT c.first_name, o.order_id, p.payment_method, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id ORDER BY o.order_id ASC;', tbls: ['customers', 'orders', 'payments'] },
    { title: 'Relación Clientes y Suscripciones', prompt: 'Conecta customers y subscriptions: SELECT c.first_name, s.plan, s.monthly_cost FROM customers c INNER JOIN subscriptions s ON c.customer_id = s.customer_id ORDER BY s.monthly_cost DESC;', expected: 'SELECT c.first_name, s.plan, s.monthly_cost FROM customers c INNER JOIN subscriptions s ON c.customer_id = s.customer_id ORDER BY s.monthly_cost DESC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Top Productos Más Vendidos', prompt: 'Conecta products y order_items: SELECT p.name, SUM(oi.quantity) AS units_sold FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY units_sold DESC LIMIT 5;', expected: 'SELECT p.name, SUM(oi.quantity) AS units_sold FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY units_sold DESC LIMIT 5;', tbls: ['products', 'order_items'] },
    { title: 'Facturación por Línea de Producto', prompt: 'Calcula ingresos por producto: SELECT p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY product_revenue DESC LIMIT 5;', expected: 'SELECT p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY product_revenue DESC LIMIT 5;', tbls: ['products', 'order_items'] },
    { title: 'Catálogo de SKUs por Categoría', prompt: 'Cuenta productos por categoría: SELECT c.name, COUNT(p.product_id) AS sku_count FROM categories c INNER JOIN products p ON c.category_id = p.category_id GROUP BY c.name ORDER BY sku_count DESC;', expected: 'SELECT c.name, COUNT(p.product_id) AS sku_count FROM categories c INNER JOIN products p ON c.category_id = p.category_id GROUP BY c.name ORDER BY sku_count DESC;', tbls: ['categories', 'products'] },
    { title: 'Facturación por País de Origen', prompt: 'Calcula ingresos por país: SELECT c.country, SUM(o.total_amount) AS country_revenue FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country ORDER BY country_revenue DESC;', expected: 'SELECT c.country, SUM(o.total_amount) AS country_revenue FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country ORDER BY country_revenue DESC;', tbls: ['customers', 'orders'] },
    { title: 'Rastro de Pagos Rechazados', prompt: "Detecta pagos declinados con clientes: SELECT c.first_name, o.order_id, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id WHERE p.status = 'declined';", expected: "SELECT c.first_name, o.order_id, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id WHERE p.status = 'declined';", tbls: ['customers', 'orders', 'payments'] },
    { title: 'Compradores No Suscritos', prompt: 'Encuentra clientes sin plan de suscripción: SELECT c.customer_id, c.first_name FROM customers c LEFT JOIN subscriptions s ON c.customer_id = s.customer_id WHERE s.subscription_id IS NULL ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name FROM customers c LEFT JOIN subscriptions s ON c.customer_id = s.customer_id WHERE s.subscription_id IS NULL ORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Ticket Promedio por Nivel de Plan', prompt: 'Calcula el ticket promedio según el plan: SELECT s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val FROM subscriptions s INNER JOIN orders o ON s.customer_id = o.customer_id GROUP BY s.plan ORDER BY avg_order_val DESC;', expected: 'SELECT s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val FROM subscriptions s INNER JOIN orders o ON s.customer_id = o.customer_id GROUP BY s.plan ORDER BY avg_order_val DESC;', tbls: ['subscriptions', 'orders'] },
    { title: 'Unidades Promedio por Departamento', prompt: 'Calcula unidades promedio por compra en cada departamento: SELECT c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY avg_qty DESC;', expected: 'SELECT c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY avg_qty DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Castillo del Jefe Mundo 3', prompt: 'Jefe #03: Conecta las 5 tablas relacionales y filtra clientes con gasto mayor a 1000 en departamentos: SELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY c.first_name, cat.department HAVING spend > 1000 ORDER BY spend DESC;', expected: 'SELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY c.first_name, cat.department HAVING spend > 1000 ORDER BY spend DESC;', tbls: ['customers', 'orders', 'order_items', 'products', 'categories'] }
  ];

  w3Titles.forEach((item, idx) => {
    const lvlNum = 41 + idx;
    const isBoss = lvlNum === 60;
    const isMystery = lvlNum === 48 || lvlNum === 55;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 3,
      worldName: 'Islas de Cristal',
      biome: 'bridge',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 48 ? 'Medium' : 'Hard',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: item.expected,
      expectedQuery: item.expected,
      hints: [
        'Usa alias de tabla cortos (ej: customers c, orders o) para mantener las uniones legibles.',
        `Tablas del objetivo: ${item.tbls.join(', ')}.`,
        `Consulta de referencia: ${item.expected}`
      ],
      xpReward: isBoss ? 220 : 50 + idx * 3,
      coinReward: isBoss ? 75 : 22,
      pedagogicalNote: `¡Nivel ${lvlNum} completado! Los JOINs relacionales permiten cruzar entidades de negocio de forma consistente.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // MUNDO 4: CAVERNAS DE LA LÓGICA (Niveles 61 al 80) — CASE, Subconsultas
  // =========================================================================
  const w4Titles = [
    { title: 'Bifurcación Binaria (CASE)', prompt: "Clasifica precios: SELECT name, price, CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class FROM products ORDER BY price DESC;", expected: "SELECT name, price, CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class FROM products ORDER BY price DESC;", tbls: ['products'] },
    { title: 'Segmentación en Tres Niveles', prompt: "Segmenta precios en Budget, Mid-Tier y Premium: SELECT name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS tier FROM products ORDER BY price ASC;", expected: "SELECT name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS tier FROM products ORDER BY price ASC;", tbls: ['products'] },
    { title: 'Normalización de Estados', prompt: "Etiqueta órdenes: SELECT order_id, total_amount, CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state FROM orders ORDER BY order_id ASC;", expected: "SELECT order_id, total_amount, CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state FROM orders ORDER BY order_id ASC;", tbls: ['orders'] },
    { title: 'Longitud de Texto (LENGTH)', prompt: 'Calcula caracteres de nombres: SELECT name, LENGTH(name) AS name_char_count FROM products ORDER BY name_char_count DESC;', expected: 'SELECT name, LENGTH(name) AS name_char_count FROM products ORDER BY name_char_count DESC;', tbls: ['products'] },
    { title: 'Transformación UPPER y LOWER', prompt: 'Limpia texto: SELECT UPPER(first_name) AS loud_name, LOWER(email) AS clean_email FROM customers ORDER BY loud_name ASC;', expected: 'SELECT UPPER(first_name) AS loud_name, LOWER(email) AS clean_email FROM customers ORDER BY loud_name ASC;', tbls: ['customers'] },
    { title: 'Extracción de Año (SUBSTR)', prompt: 'Extrae el año YYYY: SELECT order_id, SUBSTR(order_date, 1, 4) AS order_year FROM orders ORDER BY order_id ASC;', expected: 'SELECT order_id, SUBSTR(order_date, 1, 4) AS order_year FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Extracción de Mes (SUBSTR)', prompt: 'Extrae el año y mes YYYY-MM: SELECT order_id, SUBSTR(order_date, 1, 7) AS order_month FROM orders ORDER BY order_id ASC;', expected: 'SELECT order_id, SUBSTR(order_date, 1, 7) AS order_month FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Cohorte de Ingresos Mensuales', prompt: 'Agrupa por mes de orden: SELECT SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue FROM orders GROUP BY month ORDER BY month ASC;', expected: 'SELECT SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue FROM orders GROUP BY month ORDER BY month ASC;', tbls: ['orders'] },
    { title: 'Reemplazo de Nulos (COALESCE)', prompt: "Reemplaza nulos por texto: SELECT subscription_id, COALESCE(cancel_date, 'Active Plan') AS plan_state FROM subscriptions ORDER BY subscription_id ASC;", expected: "SELECT subscription_id, COALESCE(cancel_date, 'Active Plan') AS plan_state FROM subscriptions ORDER BY subscription_id ASC;", tbls: ['subscriptions'] },
    { title: 'Filtro con Subconsulta Escalar', prompt: 'Productos más caros que el promedio: SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;', expected: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;', tbls: ['products'] },
    { title: 'Subconsulta con Fecha Máxima', prompt: 'Órdenes de la fecha más reciente: SELECT order_id, customer_id, order_date FROM orders WHERE order_date = (SELECT MAX(order_date) FROM orders);', expected: 'SELECT order_id, customer_id, order_date FROM orders WHERE order_date = (SELECT MAX(order_date) FROM orders);', tbls: ['orders'] },
    { title: 'Subconsulta con WHERE IN', prompt: "Clientes con compras completadas: SELECT first_name, email FROM customers WHERE customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed') ORDER BY first_name ASC;", expected: "SELECT first_name, email FROM customers WHERE customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed') ORDER BY first_name ASC;", tbls: ['customers', 'orders'] },
    { title: 'Subconsulta con WHERE NOT IN', prompt: 'Clientes sin ningún pedido: SELECT first_name, country FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders) ORDER BY first_name ASC;', expected: 'SELECT first_name, country FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders) ORDER BY first_name ASC;', tbls: ['customers', 'orders'] },
    { title: 'Subconsulta en Proyección SELECT', prompt: 'Diferencia de precio frente al promedio: SELECT name, price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean FROM products ORDER BY diff_from_mean DESC;', expected: 'SELECT name, price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean FROM products ORDER BY diff_from_mean DESC;', tbls: ['products'] },
    { title: 'Filtro de Existencia (EXISTS)', prompt: 'Clientes con suscripción activa usando EXISTS: SELECT c.customer_id, c.first_name FROM customers c WHERE EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name FROM customers c WHERE EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Inexistencia con NOT EXISTS', prompt: 'Clientes sin suscripción usando NOT EXISTS: SELECT c.customer_id, c.first_name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', expected: 'SELECT c.customer_id, c.first_name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Agregación Condicional (SUM CASE)', prompt: "Suma condicional de pedidos completados: SELECT COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders FROM orders;", expected: "SELECT COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders FROM orders;", tbls: ['orders'] },
    { title: 'Pivote de Canales de Pago', prompt: "Calcula volúmenes por método con CASE: SELECT SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_volume FROM payments;", expected: "SELECT SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_volume FROM payments;", tbls: ['payments'] },
    { title: 'Comparación con Promedio General', prompt: 'Pedidos con monto superior a la media: SELECT customer_id, total_amount FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;', expected: 'SELECT customer_id, total_amount FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;', tbls: ['orders'] },
    { title: 'Castillo del Jefe Mundo 4', prompt: "Jefe #04: Etiqueta productos según superen o no la media: SELECT name, price, CASE WHEN price > (SELECT AVG(price) FROM products) THEN 'Above Average' ELSE 'Below Average' END AS benchmark_tag FROM products ORDER BY price DESC;", expected: "SELECT name, price, CASE WHEN price > (SELECT AVG(price) FROM products) THEN 'Above Average' ELSE 'Below Average' END AS benchmark_tag FROM products ORDER BY price DESC;", tbls: ['products'] }
  ];

  w4Titles.forEach((item, idx) => {
    const lvlNum = 61 + idx;
    const isBoss = lvlNum === 80;
    const isMystery = lvlNum === 67 || lvlNum === 75;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 4,
      worldName: 'Cavernas de la Lógica',
      biome: 'cavern',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : lvlNum <= 70 ? 'Hard' : 'Expert',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: item.expected,
      expectedQuery: item.expected,
      hints: [
        'Estructura: CASE WHEN condición THEN resultado ELSE alternativo END.',
        `Tablas del objetivo: ${item.tbls.join(', ')}.`,
        `Consulta de referencia: ${item.expected}`
      ],
      xpReward: isBoss ? 250 : 60 + idx * 3,
      coinReward: isBoss ? 80 : 25,
      pedagogicalNote: `¡Nivel ${lvlNum} dominado! Las estructuras condicionales y subconsultas procesan lógica de negocio directamente en el motor de base de datos.`,
      position: calculateWindingPath(idx)
    });
  });

  // =========================================================================
  // MUNDO 5: VOLCÁN DE BOWSER (Niveles 81 al 100) — CTEs y Funciones Ventana
  // =========================================================================
  const w5Titles = [
    { title: 'Primer Pipeline con CTE (WITH)', prompt: 'Define un CTE para gastos de clientes: WITH spending AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT * FROM spending WHERE total_spent > 1000 ORDER BY total_spent DESC;', expected: 'WITH spending AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT * FROM spending WHERE total_spent > 1000 ORDER BY total_spent DESC;', tbls: ['orders'] },
    { title: 'CTE con Unión Posterior', prompt: 'Une clientes con el resumen del CTE: WITH order_totals AS (SELECT customer_id, COUNT(*) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, ot.orders_count FROM customers c INNER JOIN order_totals ot ON c.customer_id = ot.customer_id ORDER BY ot.orders_count DESC;', expected: 'WITH order_totals AS (SELECT customer_id, COUNT(*) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, ot.orders_count FROM customers c INNER JOIN order_totals ot ON c.customer_id = ot.customer_id ORDER BY ot.orders_count DESC;', tbls: ['customers', 'orders'] },
    { title: 'CTEs Encadenados Múltiples', prompt: 'Encadena dos CTEs con coma: WITH active_subs AS (SELECT customer_id, monthly_cost FROM subscriptions WHERE status = "active"), total_orders AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id) SELECT a.customer_id, a.monthly_cost, t.spend FROM active_subs a INNER JOIN total_orders t ON a.customer_id = t.customer_id ORDER BY t.spend DESC;', expected: "WITH active_subs AS (SELECT customer_id, monthly_cost FROM subscriptions WHERE status = 'active'), total_orders AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id) SELECT a.customer_id, a.monthly_cost, t.spend FROM active_subs a INNER JOIN total_orders t ON a.customer_id = t.customer_id ORDER BY t.spend DESC;", tbls: ['subscriptions', 'orders'] },
    { title: 'Resumen Categórico en CTE', prompt: 'Calcula ingresos por SKU en CTE y selecciona el Top 5: WITH sku_rev AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, sr.rev FROM products p INNER JOIN sku_rev sr ON p.product_id = sr.product_id ORDER BY sr.rev DESC LIMIT 5;', expected: 'WITH sku_rev AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, sr.rev FROM products p INNER JOIN sku_rev sr ON p.product_id = sr.product_id ORDER BY sr.rev DESC LIMIT 5;', tbls: ['order_items', 'products'] },
    { title: 'Ranking con ROW_NUMBER', prompt: 'Numera órdenes de mayor a menor gasto: SELECT order_id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank FROM orders ORDER BY spend_rank ASC;', expected: 'SELECT order_id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank FROM orders ORDER BY spend_rank ASC;', tbls: ['orders'] },
    { title: 'Partición por Cliente (PARTITION BY)', prompt: 'Numera pedidos dentro de cada cliente: SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank FROM orders ORDER BY customer_id ASC, customer_rank ASC;', expected: 'SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank FROM orders ORDER BY customer_id ASC, customer_rank ASC;', tbls: ['orders'] },
    { title: 'Desempates con RANK', prompt: 'Rankea productos por precio con RANK(): SELECT product_id, name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products ORDER BY price_rank ASC;', expected: 'SELECT product_id, name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products ORDER BY price_rank ASC;', tbls: ['products'] },
    { title: 'Rankings Densos con DENSE_RANK', prompt: 'Rankea densamente por categoría: SELECT product_id, category_id, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank FROM products ORDER BY category_id ASC, category_price_rank ASC;', expected: 'SELECT product_id, category_id, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank FROM products ORDER BY category_id ASC, category_price_rank ASC;', tbls: ['products'] },
    { title: 'Paso Temporal con LAG', prompt: 'Obtén el monto de la orden anterior: SELECT order_id, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount FROM orders ORDER BY order_id ASC;', expected: 'SELECT order_id, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Mirada al Futuro con LEAD', prompt: 'Obtén el monto de la siguiente orden: SELECT order_id, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount FROM orders ORDER BY order_id ASC;', expected: 'SELECT order_id, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Suma Acumulada Móvil (Running Total)', prompt: 'Calcula el gasto acumulado por cliente en el tiempo: SELECT order_id, customer_id, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend FROM orders ORDER BY customer_id ASC, order_id ASC;', expected: 'SELECT order_id, customer_id, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend FROM orders ORDER BY customer_id ASC, order_id ASC;', tbls: ['orders'] },
    { title: 'Primer Valor en Ventana (FIRST_VALUE)', prompt: 'Obtén el monto de la primera orden de cada cliente: SELECT order_id, customer_id, total_amount, FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount FROM orders ORDER BY customer_id ASC, order_id ASC;', expected: 'SELECT order_id, customer_id, total_amount, FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount FROM orders ORDER BY customer_id ASC, order_id ASC;', tbls: ['orders'] },
    { title: 'Ranking de Precios por Departamento', prompt: 'Rankea productos en cada departamento: SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank FROM categories c INNER JOIN products p ON c.category_id = p.category_id ORDER BY c.department ASC, dept_rank ASC;', expected: 'SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank FROM categories c INNER JOIN products p ON c.category_id = p.category_id ORDER BY c.department ASC, dept_rank ASC;', tbls: ['categories', 'products'] },
    { title: 'Artículo #1 por Cada Departamento', prompt: 'Filtra el producto top de cada departamento con CTE: WITH ranked AS (SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS rnk FROM categories c INNER JOIN products p ON c.category_id = p.category_id) SELECT department, name, price FROM ranked WHERE rnk = 1 ORDER BY price DESC;', expected: 'WITH ranked AS (SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS rnk FROM categories c INNER JOIN products p ON c.category_id = p.category_id) SELECT department, name, price FROM ranked WHERE rnk = 1 ORDER BY price DESC;', tbls: ['categories', 'products'] },
    { title: 'Diferencial de Crecimiento MoM', prompt: 'Calcula el cambio de valor frente a la orden previa: SELECT order_id, total_amount, ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta FROM orders ORDER BY order_id ASC;', expected: 'SELECT order_id, total_amount, ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta FROM orders ORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Top 3 Gastadores con Ventana', prompt: 'Filtra el podio de clientes con mayor gasto: WITH ranked_cust AS (SELECT customer_id, SUM(total_amount) AS spent, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spender_rank FROM orders GROUP BY customer_id) SELECT customer_id, spent, spender_rank FROM ranked_cust WHERE spender_rank <= 3;', expected: 'WITH ranked_cust AS (SELECT customer_id, SUM(total_amount) AS spent, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spender_rank FROM orders GROUP BY customer_id) SELECT customer_id, spent, spender_rank FROM ranked_cust WHERE spender_rank <= 3;', tbls: ['orders'] },
    { title: 'Participación Global de Ventas (%)', prompt: 'Calcula el porcentaje de ventas que representa cada departamento: WITH dept_sales AS (SELECT c.department, SUM(oi.quantity * oi.unit_price) AS sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department) SELECT department, sales, ROUND(sales * 100.0 / (SELECT SUM(sales) FROM dept_sales), 2) AS pct_share FROM dept_sales ORDER BY sales DESC;', expected: 'WITH dept_sales AS (SELECT c.department, SUM(oi.quantity * oi.unit_price) AS sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department) SELECT department, sales, ROUND(sales * 100.0 / (SELECT SUM(sales) FROM dept_sales), 2) AS pct_share FROM dept_sales ORDER BY sales DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Métricas de Confiabilidad de Pagos', prompt: 'Rankea métodos de pago aprobados por volumen: WITH p_stats AS (SELECT payment_method, COUNT(*) AS txs, SUM(amount) AS vol FROM payments WHERE status = "approved" GROUP BY payment_method) SELECT payment_method, txs, vol, DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank FROM p_stats;', expected: "WITH p_stats AS (SELECT payment_method, COUNT(*) AS txs, SUM(amount) AS vol FROM payments WHERE status = 'approved' GROUP BY payment_method) SELECT payment_method, txs, vol, DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank FROM p_stats;", tbls: ['payments'] },
    { title: 'La Puerta ante el Dragón', prompt: 'Calcula ventas mensuales y compara con el mes previo usando LAG: WITH monthly_kpi AS (SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY month) SELECT month, total_orders, monthly_revenue, LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev FROM monthly_kpi ORDER BY month ASC;', expected: 'WITH monthly_kpi AS (SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY month) SELECT month, total_orders, monthly_revenue, LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev FROM monthly_kpi ORDER BY month ASC;', tbls: ['orders'] },
    { title: 'Ciudadela de Bowser: Gran Jefe Final', prompt: 'Jefe Supremo #100: Calcula el KPI de cliente (LTV, total de órdenes y rango) y selecciona el Top 5: WITH customer_kpi AS (SELECT c.customer_id, c.first_name, c.country, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS lifetime_value, DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS ltv_rank FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.country) SELECT customer_id, first_name, country, total_orders, lifetime_value, ltv_rank FROM customer_kpi WHERE ltv_rank <= 5 ORDER BY ltv_rank ASC;', expected: 'WITH customer_kpi AS (SELECT c.customer_id, c.first_name, c.country, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS lifetime_value, DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS ltv_rank FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.country) SELECT customer_id, first_name, country, total_orders, lifetime_value, ltv_rank FROM customer_kpi WHERE ltv_rank <= 5 ORDER BY ltv_rank ASC;', tbls: ['customers', 'orders'] }
  ];

  w5Titles.forEach((item, idx) => {
    const lvlNum = 81 + idx;
    const isBoss = lvlNum === 100;
    const isMystery = lvlNum === 88 || lvlNum === 95;
    levels.push({
      levelNumber: lvlNum,
      worldNumber: 5,
      worldName: 'Volcán de Bowser',
      biome: 'volcano',
      title: item.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : 'Expert',
      targetTables: item.tbls,
      prompt: item.prompt,
      initialQuery: item.expected,
      expectedQuery: item.expected,
      hints: [
        'Define el CTE con: WITH nombre_cte AS (...) SELECT ...',
        `Tablas del objetivo: ${item.tbls.join(', ')}.`,
        `Consulta de referencia: ${item.expected}`
      ],
      xpReward: isBoss ? 500 : 80 + idx * 4,
      coinReward: isBoss ? 150 : 30,
      pedagogicalNote: `¡Nivel ${lvlNum} conquistado! Las funciones analíticas calculan métricas avanzadas preservando el detalle individual de cada transacción.`,
      position: calculateWindingPath(idx)
    });
  });

  return levels;
}

export const ALL_100_LEVELS = build100Levels();
