import { TableSchema } from '@/types/sql';

export const SCHEMA_DEFINITIONS: TableSchema[] = [
  {
    name: 'customers',
    description: 'E-commerce platform registered customers',
    columns: [
      { name: 'customer_id', type: 'INTEGER', isPrimary: true, description: 'Unique customer identifier' },
      { name: 'first_name', type: 'TEXT', description: 'Customer first name' },
      { name: 'last_name', type: 'TEXT', description: 'Customer last name' },
      { name: 'email', type: 'TEXT', description: 'Account email address' },
      { name: 'city', type: 'TEXT', description: 'Billing / resident city' },
      { name: 'country', type: 'TEXT', description: 'Country of residence' },
      { name: 'signup_date', type: 'TEXT', description: 'Registration date (YYYY-MM-DD)' }
    ]
  },
  {
    name: 'categories',
    description: 'Product categorization departments',
    columns: [
      { name: 'category_id', type: 'INTEGER', isPrimary: true, description: 'Category identifier' },
      { name: 'name', type: 'TEXT', description: 'Category name' },
      { name: 'department', type: 'TEXT', description: 'Department grouping' }
    ]
  },
  {
    name: 'products',
    description: 'Catalog items with inventory and pricing',
    columns: [
      { name: 'product_id', type: 'INTEGER', isPrimary: true, description: 'Product identifier' },
      { name: 'name', type: 'TEXT', description: 'Commercial product title' },
      { name: 'category_id', type: 'INTEGER', isForeign: true, foreignTable: 'categories', foreignColumn: 'category_id', description: 'Category relation' },
      { name: 'price', type: 'REAL', description: 'Base retail price in USD' },
      { name: 'stock_quantity', type: 'INTEGER', description: 'Available warehouse stock' }
    ]
  },
  {
    name: 'orders',
    description: 'Customer purchase orders',
    columns: [
      { name: 'order_id', type: 'INTEGER', isPrimary: true, description: 'Order identifier' },
      { name: 'customer_id', type: 'INTEGER', isForeign: true, foreignTable: 'customers', foreignColumn: 'customer_id', description: 'Customer who placed order' },
      { name: 'order_date', type: 'TEXT', description: 'Purchase date (YYYY-MM-DD)' },
      { name: 'status', type: 'TEXT', description: 'Status: completed, shipped, cancelled, pending' },
      { name: 'total_amount', type: 'REAL', description: 'Calculated order gross total' }
    ]
  },
  {
    name: 'order_items',
    description: 'Line item records per transaction',
    columns: [
      { name: 'item_id', type: 'INTEGER', isPrimary: true, description: 'Line item identifier' },
      { name: 'order_id', type: 'INTEGER', isForeign: true, foreignTable: 'orders', foreignColumn: 'order_id', description: 'Associated order' },
      { name: 'product_id', type: 'INTEGER', isForeign: true, foreignTable: 'products', foreignColumn: 'product_id', description: 'Purchased product' },
      { name: 'quantity', type: 'INTEGER', description: 'Units purchased' },
      { name: 'unit_price', type: 'REAL', description: 'Price per unit at purchase time' }
    ]
  },
  {
    name: 'payments',
    description: 'Financial transactions linked to orders',
    columns: [
      { name: 'payment_id', type: 'INTEGER', isPrimary: true, description: 'Transaction record ID' },
      { name: 'order_id', type: 'INTEGER', isForeign: true, foreignTable: 'orders', foreignColumn: 'order_id', description: 'Settled order ID' },
      { name: 'payment_method', type: 'TEXT', description: 'Method: credit_card, paypal, apple_pay, bank_transfer' },
      { name: 'amount', type: 'REAL', description: 'Settled amount in USD' },
      { name: 'payment_date', type: 'TEXT', description: 'Settlement date' },
      { name: 'status', type: 'TEXT', description: 'Payment status: approved, declined, refunded' }
    ]
  },
  {
    name: 'subscriptions',
    description: 'Recurring SaaS subscriptions for cohort & retention analysis',
    columns: [
      { name: 'subscription_id', type: 'INTEGER', isPrimary: true, description: 'Subscription ID' },
      { name: 'customer_id', type: 'INTEGER', isForeign: true, foreignTable: 'customers', foreignColumn: 'customer_id', description: 'Customer ID' },
      { name: 'plan', type: 'TEXT', description: 'Plan: starter, pro, enterprise' },
      { name: 'monthly_cost', type: 'REAL', description: 'Monthly fee in USD' },
      { name: 'start_date', type: 'TEXT', description: 'Subscription start date' },
      { name: 'cancel_date', type: 'TEXT', description: 'Cancellation date or NULL if active' },
      { name: 'status', type: 'TEXT', description: 'active, cancelled, paused' }
    ]
  },
  {
    name: 'cuevas',
    description: 'Refugios y cavernas de la tribu en la Edad de Piedra',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, description: 'ID de la cueva' },
      { name: 'nombre', type: 'TEXT', description: 'Nombre o apodo de la cueva' },
      { name: 'region', type: 'TEXT', description: 'Región geográfica del valle' },
      { name: 'habitada', type: 'INTEGER', description: '1 si tiene fuego y ocupantes, 0 si está desierta' },
      { name: 'capacidad', type: 'INTEGER', description: 'Cantidad máxima de personas que abriga' }
    ]
  },
  {
    name: 'mamuts',
    description: 'Registro de manadas y avistamientos de megafauna',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, description: 'ID de registro del mamut' },
      { name: 'apodo', type: 'TEXT', description: 'Nombre dado por los rastreadores' },
      { name: 'manada', type: 'TEXT', description: 'Sector o manada a la que pertenece' },
      { name: 'peso_toneladas', type: 'REAL', description: 'Peso estimado en toneladas métricas' },
      { name: 'peligrosidad', type: 'TEXT', description: 'Nivel de riesgo: Baja, Media, Alta, Extrema' }
    ]
  },
  {
    name: 'recursos_tribu',
    description: 'Inventario de supervivencia y materiales del campamento',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, description: 'Identificador del recurso' },
      { name: 'recurso', type: 'TEXT', description: 'Nombre del material' },
      { name: 'tipo', type: 'TEXT', description: 'Categoría: Armas, Madera, Ropa, Combustible, Cuerdas' },
      { name: 'cantidad', type: 'INTEGER', description: 'Unidades disponibles en el almacén' },
      { name: 'estado', type: 'TEXT', description: 'Condición: Crítico, Bajo, Bueno, Excelente' }
    ]
  },
  {
    name: 'cazadores',
    description: 'Rango y registros de caza de los miembros del clan',
    columns: [
      { name: 'id', type: 'INTEGER', isPrimary: true, description: 'ID del cazador' },
      { name: 'nombre', type: 'TEXT', description: 'Nombre del miembro' },
      { name: 'edad', type: 'INTEGER', description: 'Edad en ciclos solares' },
      { name: 'rango', type: 'TEXT', description: 'Jerarquía: Novato, Iniciado, Veterano, Líder' },
      { name: 'presas_cobradas', type: 'INTEGER', description: 'Cantidad de presas aportadas al clan' }
    ]
  }
];

export const SEED_SQL = `
-- Drop existing tables to allow clean re-init
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS cazadores;
DROP TABLE IF EXISTS recursos_tribu;
DROP TABLE IF EXISTS mamuts;
DROP TABLE IF EXISTS cuevas;

-- 1. Customers
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  country TEXT NOT NULL,
  signup_date TEXT NOT NULL
);

INSERT INTO customers VALUES
(1, 'Elena', 'Rostova', 'elena.rostova@techmail.com', 'Berlin', 'Germany', '2023-01-15'),
(2, 'Marcus', 'Vance', 'mvance@datawave.io', 'Austin', 'USA', '2023-02-10'),
(3, 'Sophia', 'Chen', 'sophia.chen@cloudpulse.cn', 'Singapore', 'Singapore', '2023-03-05'),
(4, 'Mateo', 'Silva', 'mateo.silva@innova.br', 'Sao Paulo', 'Brazil', '2023-03-22'),
(5, 'Aisha', 'Diallo', 'aisha.d@dakartech.sn', 'Dakar', 'Senegal', '2023-04-18'),
(6, 'Liam', 'OConnor', 'liam.oc@celticnet.ie', 'Dublin', 'Ireland', '2023-05-12'),
(7, 'Yuki', 'Tanaka', 'yuki.t@tokyodev.jp', 'Tokyo', 'Japan', '2023-06-01'),
(8, 'Zara', 'Khan', 'zara.k@indusdata.pk', 'Karachi', 'Pakistan', '2023-07-14'),
(9, 'Diego', 'Hernandez', 'diego.h@latamcode.mx', 'Mexico City', 'Mexico', '2023-08-20'),
(10, 'Chloe', 'Dubois', 'chloe.d@hexagone.fr', 'Paris', 'France', '2023-09-09'),
(11, 'Arjun', 'Mehta', 'arjun.m@bengalurubit.in', 'Bengaluru', 'India', '2023-10-04'),
(12, 'Freja', 'Lind', 'freja.lind@nordicstream.se', 'Stockholm', 'Sweden', '2023-11-28'),
(13, 'Klaus', 'Weber', 'klaus.w@alpinebit.ch', 'Zurich', 'Switzerland', '2023-12-05'),
(14, 'Camila', 'Rios', 'camila.r@andesteam.co', 'Bogota', 'Colombia', '2023-12-18');

-- 2. Categories
CREATE TABLE categories (
  category_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL
);

INSERT INTO categories VALUES
(1, 'Hardware & Laptops', 'Computing'),
(2, 'Peripherals & Audio', 'Computing'),
(3, 'Office & Ergonomics', 'Workplace'),
(4, 'Data Infrastructure', 'Enterprise'),
(5, 'Smart Wearables', 'Consumer');

-- 3. Products
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(category_id),
  price REAL NOT NULL,
  stock_quantity INTEGER NOT NULL
);

INSERT INTO products VALUES
(101, 'NeuralBlade Pro Laptop 16"', 1, 2399.00, 45),
(102, 'CoreDesk Ultra Workstation', 1, 1850.00, 20),
(103, 'AcousticZero ANC Headphones', 2, 349.50, 110),
(104, 'MechMatrix Split Keyboard', 2, 199.99, 85),
(105, 'PrecisionTrack Vertical Mouse', 2, 89.00, 140),
(106, 'ErgoSpine Carbon Chair', 3, 720.00, 25),
(107, 'OmniLift Motorized Standing Desk', 3, 650.00, 30),
(108, 'EdgeServer Mini Cluster', 4, 3200.00, 12),
(109, 'SecureVault Hardware HSM', 4, 1450.00, 18),
(110, 'PulseFit Biometric Ring', 5, 299.00, 95),
(111, 'Chronos Watch Titanium', 5, 499.00, 60),
(112, 'HyperPort Thunderbolt 4 Dock', 2, 229.00, 75);

-- 4. Orders
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(customer_id),
  order_date TEXT NOT NULL,
  status TEXT NOT NULL,
  total_amount REAL NOT NULL
);

INSERT INTO orders VALUES
(1001, 1, '2024-01-10', 'completed', 2748.50),
(1002, 2, '2024-01-14', 'completed', 199.99),
(1003, 3, '2024-01-22', 'completed', 3200.00),
(1004, 4, '2024-02-05', 'completed', 809.00),
(1005, 1, '2024-02-18', 'completed', 349.50),
(1006, 5, '2024-02-28', 'cancelled', 2399.00),
(1007, 6, '2024-03-03', 'completed', 1370.00),
(1008, 2, '2024-03-12', 'completed', 89.00),
(1009, 7, '2024-03-25', 'completed', 2399.00),
(1010, 8, '2024-04-02', 'shipped', 720.00),
(1011, 9, '2024-04-15', 'completed', 499.00),
(1012, 3, '2024-04-20', 'completed', 1450.00),
(1013, 10, '2024-05-02', 'completed', 229.00),
(1014, 11, '2024-05-18', 'completed', 1850.00),
(1015, 2, '2024-05-24', 'completed', 650.00),
(1016, 4, '2024-06-01', 'completed', 349.50),
(1017, 7, '2024-06-11', 'shipped', 299.00),
(1018, 1, '2024-06-19', 'completed', 199.99),
(1019, 12, '2024-06-25', 'pending', 2399.00),
(1020, 3, '2024-06-28', 'completed', 458.00);

-- 5. Order Items
CREATE TABLE order_items (
  item_id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders(order_id),
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL
);

INSERT INTO order_items VALUES
(1, 1001, 101, 1, 2399.00),
(2, 1001, 103, 1, 349.50),
(3, 1002, 104, 1, 199.99),
(4, 1003, 108, 1, 3200.00),
(5, 1004, 106, 1, 720.00),
(6, 1004, 105, 1, 89.00),
(7, 1005, 103, 1, 349.50),
(8, 1006, 101, 1, 2399.00),
(9, 1007, 106, 1, 720.00),
(10, 1007, 107, 1, 650.00),
(11, 1008, 105, 1, 89.00),
(12, 1009, 101, 1, 2399.00),
(13, 1010, 106, 1, 720.00),
(14, 1011, 111, 1, 499.00),
(15, 1012, 109, 1, 1450.00),
(16, 1013, 112, 1, 229.00),
(17, 1014, 102, 1, 1850.00),
(18, 1015, 107, 1, 650.00),
(19, 1016, 103, 1, 349.50),
(20, 1017, 110, 1, 299.00),
(21, 1018, 104, 1, 199.99),
(22, 1019, 101, 1, 2399.00),
(23, 1020, 112, 2, 229.00);

-- 6. Payments
CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders(order_id),
  payment_method TEXT NOT NULL,
  amount REAL NOT NULL,
  payment_date TEXT NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO payments VALUES
(501, 1001, 'credit_card', 2748.50, '2024-01-10', 'approved'),
(502, 1002, 'paypal', 199.99, '2024-01-14', 'approved'),
(503, 1003, 'bank_transfer', 3200.00, '2024-01-22', 'approved'),
(504, 1004, 'credit_card', 809.00, '2024-02-05', 'approved'),
(505, 1005, 'apple_pay', 349.50, '2024-02-18', 'approved'),
(506, 1006, 'credit_card', 2399.00, '2024-02-28', 'declined'),
(507, 1007, 'credit_card', 1370.00, '2024-03-03', 'approved'),
(508, 1008, 'paypal', 89.00, '2024-03-12', 'approved'),
(509, 1009, 'apple_pay', 2399.00, '2024-03-25', 'approved'),
(510, 1010, 'credit_card', 720.00, '2024-04-02', 'approved'),
(511, 1011, 'credit_card', 499.00, '2024-04-15', 'approved'),
(512, 1012, 'bank_transfer', 1450.00, '2024-04-20', 'approved'),
(513, 1013, 'paypal', 229.00, '2024-05-02', 'approved'),
(514, 1014, 'bank_transfer', 1850.00, '2024-05-18', 'approved'),
(515, 1015, 'credit_card', 650.00, '2024-05-24', 'approved'),
(516, 1016, 'apple_pay', 349.50, '2024-06-01', 'approved'),
(517, 1017, 'credit_card', 299.00, '2024-06-11', 'approved'),
(518, 1018, 'credit_card', 199.99, '2024-06-19', 'approved');

-- 7. Subscriptions
CREATE TABLE subscriptions (
  subscription_id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(customer_id),
  plan TEXT NOT NULL,
  monthly_cost REAL NOT NULL,
  start_date TEXT NOT NULL,
  cancel_date TEXT,
  status TEXT NOT NULL
);

INSERT INTO subscriptions VALUES
(201, 1, 'enterprise', 299.00, '2023-02-01', NULL, 'active'),
(202, 2, 'starter', 49.00, '2023-03-01', '2023-11-15', 'cancelled'),
(203, 3, 'enterprise', 299.00, '2023-04-01', NULL, 'active'),
(204, 4, 'pro', 129.00, '2023-04-15', NULL, 'active'),
(205, 5, 'starter', 49.00, '2023-05-01', NULL, 'active'),
(206, 6, 'pro', 129.00, '2023-06-01', '2024-01-10', 'cancelled'),
(207, 7, 'pro', 129.00, '2023-07-01', NULL, 'active'),
(208, 8, 'starter', 49.00, '2023-08-01', '2023-12-01', 'cancelled'),
(209, 9, 'starter', 49.00, '2023-09-01', NULL, 'active'),
(210, 10, 'pro', 129.00, '2023-10-01', NULL, 'active'),
(211, 11, 'enterprise', 299.00, '2023-11-01', NULL, 'active'),
(212, 12, 'starter', 49.00, '2023-12-01', NULL, 'active');

-- 8. Cuevas (Era I: Edad de Piedra)
CREATE TABLE cuevas (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  region TEXT NOT NULL,
  habitada INTEGER NOT NULL,
  capacidad INTEGER NOT NULL
);

INSERT INTO cuevas VALUES 
(1, 'Cueva del Sol', 'Valle Norte', 1, 12),
(2, 'Gruta Helada', 'Picos Altos', 0, 5),
(3, 'Caverna del Río', 'Ribera Este', 1, 20),
(4, 'Grieta Profunda', 'Paso Rocoso', 0, 8),
(5, 'Abrigo del Bosque', 'Valle Norte', 1, 15);

-- 9. Mamuts (Era I: Edad de Piedra)
CREATE TABLE mamuts (
  id INTEGER PRIMARY KEY,
  apodo TEXT NOT NULL,
  manada TEXT NOT NULL,
  peso_toneladas REAL NOT NULL,
  peligrosidad TEXT NOT NULL
);

INSERT INTO mamuts VALUES 
(1, 'Colmillo Blanco', 'Valle Norte', 5.2, 'Alta'),
(2, 'Peludo Veloz', 'Estepa Sur', 3.8, 'Media'),
(3, 'Gran Berta', 'Valle Norte', 6.1, 'Extrema'),
(4, 'Trueno Gris', 'Paso Rocoso', 4.5, 'Media'),
(5, 'Sombra Ártica', 'Valle Norte', 4.8, 'Alta'),
(6, 'Titán Colosal', 'Glaciar Eterno', 7.2, 'Extrema');

-- 10. Recursos de la Tribu (Era I: Edad de Piedra)
CREATE TABLE recursos_tribu (
  id INTEGER PRIMARY KEY,
  recurso TEXT NOT NULL,
  tipo TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  estado TEXT NOT NULL
);

INSERT INTO recursos_tribu VALUES 
(1, 'Puntas de Sílex', 'Armas', 45, 'Excelente'),
(2, 'Ramas de Fresno', 'Madera', 8, 'Crítico'),
(3, 'Pieles Curtidas', 'Ropa', 12, 'Bajo'),
(4, 'Grasa de Ballena', 'Combustible', 30, 'Bueno'),
(5, 'Tendones Secos', 'Cuerdas', 6, 'Crítico'),
(6, 'Madera de Pino', 'Combustible', 24, 'Excelente'),
(7, 'Lanzas con Espinas', 'Armas', 14, 'Bueno');

-- 11. Cazadores del Clan (Era I: Edad de Piedra)
CREATE TABLE cazadores (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  edad INTEGER NOT NULL,
  rango TEXT NOT NULL,
  presas_cobradas INTEGER NOT NULL
);

INSERT INTO cazadores VALUES 
(1, 'Kael', 32, 'Líder', 48),
(2, 'Sura', 27, 'Veterano', 35),
(3, 'Tark', 19, 'Novato', 4),
(4, 'Bran', 40, 'Veterano', 52),
(5, 'Mira', 22, 'Iniciado', 11),
(6, 'Orik', 29, 'Veterano', 38);
`;
