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
  branch?: 'main' | 'easy' | 'hard';
  branchLabel?: string;
  prerequisites?: number[];
  targetTables: string[];
  prompt: string;
  initialQuery: string;
  expectedQuery: string;
  hints: string[];
  xpReward: number;
  coinReward: number;
  pedagogicalNote: string;
  position: { x: number; y: number };
  storyContext?: string;
  characterDialogue?: {
    speaker: string;
    text: string;
  };
}

export const GAME_WORLDS = [
  {
    number: 1,
    name: 'Era I: Edad de Piedra',
    subtitle: 'El Dominio del Fuego y los Primeros Registros (Niveles 1–14)',
    biome: 'plains' as const,
    bgImage: '/maps/era_1_piedra.jpg',
    levelsRange: [1, 14],
    accentColor: '#10B981'
  },
  {
    number: 2,
    name: 'Era II: Primeras Civilizaciones',
    subtitle: 'Riberas del Nilo, Cosechas y Agrupaciones (Niveles 15–28)',
    biome: 'desert' as const,
    bgImage: '/maps/era_2_antigua.jpg',
    levelsRange: [15, 28],
    accentColor: '#0284C7'
  },
  {
    number: 3,
    name: 'Era III: Grandes Reinos e Hierro',
    subtitle: 'Fortalezas, Molinos y Relaciones JOIN (Niveles 29–42)',
    biome: 'bridge' as const,
    bgImage: '/maps/era_3_hierro.jpg',
    levelsRange: [29, 42],
    accentColor: '#EAB308'
  },
  {
    number: 4,
    name: 'Era IV: Revolución del Vapor',
    subtitle: 'Fábricas, Ferrocarriles y Lógica Condicional (Niveles 43–56)',
    biome: 'cavern' as const,
    bgImage: '/maps/era_4_vapor.jpg',
    levelsRange: [43, 56],
    accentColor: '#F97316'
  },
  {
    number: 5,
    name: 'Era V: Hub de la Globalización Conectada',
    subtitle: 'Comercio Transfronterizo, Logística y Subconsultas CTE (Niveles 57–70)',
    biome: 'plains' as const,
    bgImage: '/maps/era_5_global.jpg',
    levelsRange: [57, 70],
    accentColor: '#06B6D4'
  },
  {
    number: 6,
    name: 'Era VI: Metrópolis de la Inteligencia Artificial',
    subtitle: 'Ciberespacio, Modelos Neuronales y Funciones de Ventana (Niveles 71–84)',
    biome: 'volcano' as const,
    bgImage: '/maps/era_6_ia.jpg',
    levelsRange: [71, 84],
    accentColor: '#8B5CF6'
  }
];

export function build84Levels(): GameLevel[] {
  const levels: GameLevel[] = [];

  // =========================================================================
  // MUNDO 1: EL INICIO DE LA PREHISTORIA (Niveles 1 al 14)
  // Sendero del Valle Prehistórico: Cueva -> Fogata -> Bosque -> Puente de Troncos -> Tótem del Mamut
  // =========================================================================
  const w1Config = [
    {
      lvl: 1, title: 'El Primer Registro',
      storyContext: "Nova despierta junto a la fogata en el valle glaciar. Kael, líder de la tribu nómada, necesita ver todas las cavernas descubiertas antes de que azote la tormenta.",
      characterDialogue: { speaker: 'Kael', text: '¡Nova! Las marcas en la roca se borran con la lluvia. Necesito ver todas las columnas de la tabla de cuevas.' },
      prompt: "Inspecciona la tabla 'cuevas'. Usa el asterisco (*) para seleccionar todas las columnas de 'cuevas'.",
      expected: 'SELECT * FROM cuevas;',
      initial: "-- Nivel 1: Selecciona todas las columnas usando el asterisco (*)\nSELECT \nFROM cuevas;",
      tbls: ['cuevas'], hint: "Escribe: SELECT * FROM cuevas;",
      pos: { x: 81.0, y: 46.0 }
    },
    {
      lvl: 2, title: 'Las Manadas del Valle',
      storyContext: "Kael observa la planicie. Se mueven manadas gigantescas, pero los cazadores solo necesitan el apodo y la manada de cada bestia.",
      characterDialogue: { speaker: 'Nova', text: 'No gastes memoria procesando columnas innecesarias. Trae únicamente el apodo y la manada de los mamuts.' },
      prompt: "Selecciona únicamente las columnas 'apodo' y 'manada' de la tabla 'mamuts'.",
      expected: 'SELECT apodo, manada FROM mamuts;',
      initial: "-- Nivel 2: Proyecta apodo y manada\nSELECT \nFROM mamuts;",
      tbls: ['mamuts'], hint: "Separa los nombres con comas: SELECT apodo, manada FROM mamuts;",
      pos: { x: 74.0, y: 55.0 }
    },
    {
      lvl: 3, title: 'Regiones Únicas (DISTINCT)',
      storyContext: "La tribu quiere saber qué regiones diferentes abarcan las cavernas sin repetir nombres en el censo.",
      characterDialogue: { speaker: 'Nova', text: 'Usa DISTINCT para eliminar regiones duplicadas en tu consulta.' },
      prompt: "Selecciona las regiones únicas de la tabla 'cuevas' usando DISTINCT region.",
      expected: 'SELECT DISTINCT region FROM cuevas;',
      initial: "-- Nivel 3: Elimina duplicados con DISTINCT\nSELECT DISTINCT \nFROM cuevas;",
      tbls: ['cuevas'], hint: "Escribe: SELECT DISTINCT region FROM cuevas;",
      pos: { x: 79.0, y: 64.0 }
    },
    {
      lvl: 4, title: 'El Refugio Habitado',
      storyContext: "El frío arreciará pronto. Solo las cuevas que actualmente estén habitadas (habitada = 1) cuentan con fuego encendido y abrigo.",
      characterDialogue: { speaker: 'Kael', text: '¡Filtra solo las cuevas donde habitada sea igual a 1!' },
      prompt: "Selecciona 'nombre' y 'region' de la tabla 'cuevas' donde habitada = 1.",
      expected: 'SELECT nombre, region FROM cuevas WHERE habitada = 1;',
      initial: "-- Nivel 4: Filtra cuevas habitadas\nSELECT nombre, region \nFROM cuevas \nWHERE ;",
      tbls: ['cuevas'], hint: "Usa WHERE habitada = 1;",
      pos: { x: 69.0, y: 72.0 }
    },
    {
      lvl: 5, title: 'Bestias Imponentes',
      storyContext: "El clan prepara lanzas pesadas. Para almacenar carne antes del invierno, solo rastrearemos mamuts con un peso mayor a 4 toneladas.",
      characterDialogue: { speaker: 'Nova', text: 'Usa el operador mayor que (>) para encontrar a los gigantes cuyo peso_toneladas supere 4.0.' },
      prompt: "Selecciona 'apodo' y 'peso_toneladas' de 'mamuts' donde peso_toneladas > 4.0.",
      expected: 'SELECT apodo, peso_toneladas FROM mamuts WHERE peso_toneladas > 4.0;',
      initial: "-- Nivel 5: Filtra mamuts con peso_toneladas > 4.0\nSELECT apodo, peso_toneladas \nFROM mamuts \nWHERE peso_toneladas > ;",
      tbls: ['mamuts'], hint: "Escribe: WHERE peso_toneladas > 4.0;",
      pos: { x: 57.0, y: 70.0 }
    },
    {
      lvl: 6, title: 'Cazadores Veteranos',
      storyContext: "El cruce del torrente requiere experiencia en el hielo. Kael convoca a los cazadores con rango 'Veterano'.",
      characterDialogue: { speaker: 'Nova', text: 'Las cadenas de texto en SQL se encierran en comillas simples: \'Veterano\'.' },
      prompt: "Selecciona 'nombre' y 'presas_cobradas' de 'cazadores' donde rango = 'Veterano'.",
      expected: "SELECT nombre, presas_cobradas FROM cazadores WHERE rango = 'Veterano';",
      initial: "-- Nivel 6: Filtra cazadores con rango 'Veterano'\nSELECT nombre, presas_cobradas \nFROM cazadores \nWHERE rango = ;",
      tbls: ['cazadores'], hint: "WHERE rango = 'Veterano';",
      pos: { x: 45.0, y: 73.0 }
    },
    {
      lvl: 7, title: 'Prioridad de Refugio (ORDER BY)',
      storyContext: "Llegan familias nómadas buscando abrigo. El consejo de ancianos necesita ver las cuevas ordenadas desde la de mayor capacidad a la menor.",
      characterDialogue: { speaker: 'Kael', text: '¡Quiero ver primero las cavernas con más espacio disponible!' },
      prompt: "Selecciona 'nombre' y 'capacidad' de 'cuevas' ordenando por 'capacidad' descendente (DESC).",
      expected: 'SELECT nombre, capacidad FROM cuevas ORDER BY capacidad DESC;',
      initial: "-- Nivel 7: Ordena descendente por capacidad\nSELECT nombre, capacidad \nFROM cuevas \nORDER BY ;",
      tbls: ['cuevas'], hint: "Escribe: ORDER BY capacidad DESC;",
      pos: { x: 33.0, y: 77.0 }
    },
    {
      lvl: 8, title: 'Los Más Diestros (LIMIT)',
      storyContext: "La tribu celebra a sus 3 mejores cazadores con mantas de lince ceremonial. Debemos obtener el Top 3 con mayor presas_cobradas.",
      characterDialogue: { speaker: 'Nova', text: 'Combina ORDER BY presas_cobradas DESC con LIMIT 3.' },
      prompt: "Selecciona 'nombre' y 'presas_cobradas' de 'cazadores' ordenados por presas_cobradas DESC y limitados a 3.",
      expected: 'SELECT nombre, presas_cobradas FROM cazadores ORDER BY presas_cobradas DESC LIMIT 3;',
      initial: "-- Nivel 8: Top 3 cazadores\nSELECT nombre, presas_cobradas \nFROM cazadores \nORDER BY presas_cobradas DESC \nLIMIT ;",
      tbls: ['cazadores'], hint: "Finaliza con: LIMIT 3;",
      pos: { x: 23.0, y: 83.0 }
    },
    {
      lvl: 9, title: 'Filtro Compuesto (AND)',
      storyContext: "Bestias acechan en la noche. Filtraremos mamuts de la manada 'Valle Norte' cuya peligrosidad sea 'Alta'.",
      characterDialogue: { speaker: 'Kael', text: '¡Alerta máxima! Solo prepararemos las trampas si coinciden ambas condiciones.' },
      prompt: "Selecciona 'apodo' y 'peso_toneladas' de 'mamuts' donde manada = 'Valle Norte' AND peligrosidad = 'Alta'.",
      expected: "SELECT apodo, peso_toneladas FROM mamuts WHERE manada = 'Valle Norte' AND peligrosidad = 'Alta';",
      initial: "-- Nivel 9: Concatena con AND\nSELECT apodo, peso_toneladas \nFROM mamuts \nWHERE manada = 'Valle Norte'  peligrosidad = 'Alta';",
      tbls: ['mamuts'], hint: "Usa AND entre ambas expresiones.",
      pos: { x: 14.0, y: 88.0 }
    },
    {
      lvl: 10, title: 'Refugios Alternativos (OR)',
      storyContext: "Los exploradores buscan cuevas seguras en el 'Valle Norte' o en la 'Ribera Este'.",
      characterDialogue: { speaker: 'Nova', text: 'Usa OR para que la consulta devuelva registros que cumplan cualquiera de las dos zonas.' },
      prompt: "Selecciona 'nombre' y 'region' de 'cuevas' donde region = 'Valle Norte' OR region = 'Ribera Este'.",
      expected: "SELECT nombre, region FROM cuevas WHERE region = 'Valle Norte' OR region = 'Ribera Este';",
      initial: "-- Nivel 10: Usa el operador OR\nSELECT nombre, region \nFROM cuevas \nWHERE region = 'Valle Norte'  region = 'Ribera Este';",
      tbls: ['cuevas'], hint: "Escribe OR entre las dos comparaciones.",
      pos: { x: 11.0, y: 69.0 }
    },
    {
      lvl: 11, title: 'Rango de Capacidad (BETWEEN)',
      storyContext: "Para un grupo mediano de exploradores, buscamos cuevas cuya capacidad esté entre 10 y 25 personas.",
      characterDialogue: { speaker: 'Kael', text: 'BETWEEN incluye tanto el valor inicial como el valor final.' },
      prompt: "Selecciona 'nombre' y 'capacidad' de 'cuevas' donde capacidad BETWEEN 10 AND 25.",
      expected: 'SELECT nombre, capacity FROM cuevas WHERE capacidad BETWEEN 10 AND 25;'
        .replace('capacity', 'capacidad'),
      initial: "-- Nivel 11: Usa BETWEEN 10 AND 25\nSELECT nombre, capacidad \nFROM cuevas \nWHERE capacidad BETWEEN ;",
      tbls: ['cuevas'], hint: "Escribe: WHERE capacidad BETWEEN 10 AND 25;",
      pos: { x: 17.0, y: 56.0 }
    },
    {
      lvl: 12, title: 'Regiones Seguras (IN)',
      storyContext: "Las patrullas se concentran solo en cavernas de ciertas regiones conocidas.",
      characterDialogue: { speaker: 'Nova', text: 'El operador IN permite verificar si un valor pertenece a una lista de opciones.' },
      prompt: "Selecciona 'nombre' y 'region' de 'cuevas' donde region IN ('Valle Norte', 'Picos Altos').",
      expected: "SELECT nombre, region FROM cuevas WHERE region IN ('Valle Norte', 'Picos Altos');",
      initial: "-- Nivel 12: Usa el operador IN\nSELECT nombre, region \nFROM cuevas \nWHERE region IN ;",
      tbls: ['cuevas'], hint: "Usa: WHERE region IN ('Valle Norte', 'Picos Altos');",
      pos: { x: 26.0, y: 52.0 }
    },
    {
      lvl: 13, title: 'El Mamut Alfa',
      storyContext: "Cerca de los riscos de hielo se vislumbran mamuts con peligrosidad 'Extrema'.",
      characterDialogue: { speaker: 'Kael', text: '¡Cuidado con la estampida! Localicemos sus apodos y pesos.' },
      prompt: "Selecciona 'apodo', 'peso_toneladas' de 'mamuts' donde peligrosidad = 'Extrema'.",
      expected: "SELECT apodo, peso_toneladas FROM mamuts WHERE peligrosidad = 'Extrema';",
      initial: "-- Nivel 13: Filtra peligrosidad 'Extrema'\nSELECT apodo, peso_toneladas \nFROM mamuts \nWHERE peligrosidad = ;",
      tbls: ['mamuts'], hint: "WHERE peligrosidad = 'Extrema';",
      pos: { x: 36.0, y: 44.0 }
    },
    {
      lvl: 14, title: 'Tótem Ancestral del Mamut',
      storyContext: "👑 ¡JEFE DE ERA I! Para cruzar la cordillera y fundar las primeras ciudades, debemos certificar el arsenal de armas con al menos 14 unidades.",
      characterDialogue: { speaker: 'Nova', text: '¡El clan resistirá el invierno! Selecciona los recursos de tipo \'Armas\' con cantidad >= 14 ordenados por cantidad DESC.' },
      prompt: "Selecciona 'recurso', 'tipo' y 'cantidad' de 'recursos_tribu' donde tipo = 'Armas' AND cantidad >= 14 ORDER BY cantidad DESC.",
      expected: "SELECT recurso, tipo, cantidad FROM recursos_tribu WHERE tipo = 'Armas' AND cantidad >= 14 ORDER BY cantidad DESC;",
      initial: "-- Nivel 14 JEFE: Combina WHERE, AND y ORDER BY\nSELECT recurso, tipo, cantidad \nFROM recursos_tribu \nWHERE tipo = 'Armas' AND \nORDER BY ;",
      tbls: ['recursos_tribu'], hint: "Usa: WHERE tipo = 'Armas' AND cantidad >= 14 ORDER BY cantidad DESC;",
      pos: { x: 23.0, y: 35.0 }
    }
  ];

  w1Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 14;
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 1,
      worldName: 'Era I: Edad de Piedra',
      biome: 'plains',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : cfg.lvl === 8 ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : cfg.lvl <= 6 ? 'Easy' : 'Medium',
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: [cfg.hint, `Tablas involucradas: ${cfg.tbls.join(', ')}.`, `Estructura esperada: ${cfg.expected}`],
      xpReward: isBoss ? 200 : 25 + cfg.lvl * 2,
      coinReward: isBoss ? 80 : 15,
      pedagogicalNote: `¡Nivel ${cfg.lvl} completado! Dominar proyecciones y filtros WHERE establece la base de la analítica SQL.`,
      position: cfg.pos,
      storyContext: cfg.storyContext,
      characterDialogue: cfg.characterDialogue
    });
  });

  // =========================================================================
  // MUNDO 2: EL DESIERTO DE LOS ANCESTROS (Niveles 15 al 28)
  // Ruta del Río Nilo y las Pirámides: Puente -> Palmeras del Oasis -> Meandro -> Gran Pirámide
  // =========================================================================
  const w2Config = [
    {
      lvl: 15, title: 'Censo de Clientes (COUNT)',
      prompt: 'Calcula el número total de clientes registrados usando COUNT(*) AS total_customers de la tabla customers.',
      expected: 'SELECT COUNT(*) AS total_customers FROM customers;',
      initial: '-- Nivel 15: Cuenta registros con COUNT(*)\nSELECT COUNT(*) AS total_customers \nFROM customers;',
      tbls: ['customers'], pos: { x: 73.0, y: 60.0 }
    },
    {
      lvl: 16, title: 'Granero Real (SUM)',
      prompt: 'Calcula la suma total facturada con SUM(total_amount) AS gross_sales de orders.',
      expected: 'SELECT SUM(total_amount) AS gross_sales FROM orders;',
      initial: '-- Nivel 16: Suma ingresos brutos\nSELECT \nFROM orders;',
      tbls: ['orders'], pos: { x: 65.0, y: 73.0 }
    },
    {
      lvl: 17, title: 'Rendimiento de Cosechas (AVG)',
      prompt: 'Calcula el precio promedio de productos redondeado a 2 decimales: ROUND(AVG(price), 2) AS average_price de products.',
      expected: 'SELECT ROUND(AVG(price), 2) AS average_price FROM products;',
      initial: '-- Nivel 17: Calcula el promedio redondeado\nSELECT ROUND(AVG(price), 2) AS average_price \nFROM products;',
      tbls: ['products'], pos: { x: 55.0, y: 73.0 }
    },
    {
      lvl: 18, title: 'Extremos del Caudal (MIN/MAX)',
      prompt: 'Extrae el precio más bajo y más alto: MIN(price) AS lowest_price, MAX(price) AS highest_price de products.',
      expected: 'SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price FROM products;',
      initial: '-- Nivel 18: Límites de precios con MIN y MAX\nSELECT MIN(price) AS lowest_price, MAX(price) AS highest_price \nFROM products;',
      tbls: ['products'], pos: { x: 44.0, y: 76.0 }
    },
    {
      lvl: 19, title: 'Tributos Pagados (COUNT Filtrado)',
      prompt: "Calcula cuántas órdenes están completadas: COUNT(*) AS completed_count de orders donde status = 'completed'.",
      expected: "SELECT COUNT(*) AS completed_count FROM orders WHERE status = 'completed';",
      initial: "-- Nivel 19: Cuenta con filtro WHERE\nSELECT COUNT(*) AS completed_count \nFROM orders \nWHERE status = 'completed';",
      tbls: ['orders'], pos: { x: 33.0, y: 78.0 }
    },
    {
      lvl: 20, title: 'Censo por Región (GROUP BY)',
      prompt: 'Agrupa clientes por country y cuéntalos: country, COUNT(*) AS customer_count ordenado descendente.',
      expected: 'SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country ORDER BY customer_count DESC;',
      initial: '-- Nivel 20: Agrupa por país\nSELECT country, COUNT(*) AS customer_count \nFROM customers \nGROUP BY country \nORDER BY customer_count DESC;',
      tbls: ['customers'], pos: { x: 22.0, y: 70.0 }
    },
    {
      lvl: 21, title: 'Estados de Pedidos',
      prompt: 'Cuenta los pedidos agrupados por estado: status, COUNT(*) AS orders_count de orders.',
      expected: 'SELECT status, COUNT(*) AS orders_count FROM orders GROUP BY status;',
      initial: '-- Nivel 21: Agrupa por status\nSELECT status, COUNT(*) AS orders_count \nFROM orders \nGROUP BY status;',
      tbls: ['orders'], pos: { x: 15.0, y: 58.0 }
    },
    {
      lvl: 22, title: 'Inventario por Categoría',
      prompt: 'Suma el stock_quantity por category_id: category_id, SUM(stock_quantity) AS total_inventory de products agrupado por category_id.',
      expected: 'SELECT category_id, SUM(stock_quantity) AS total_inventory FROM products GROUP BY category_id ORDER BY total_inventory DESC;',
      initial: '-- Nivel 22: Inventario por categoría\nSELECT category_id, SUM(stock_quantity) AS total_inventory \nFROM products \nGROUP BY category_id \nORDER BY total_inventory DESC;',
      tbls: ['products'], pos: { x: 20.0, y: 46.0 }
    },
    {
      lvl: 23, title: 'Precio Promedio por Sector',
      prompt: 'Calcula el promedio de precio por categoría: category_id, ROUND(AVG(price), 2) AS avg_price de products.',
      expected: 'SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id ORDER BY avg_price DESC;',
      initial: '-- Nivel 23: Promedio por category_id\nSELECT category_id, ROUND(AVG(price), 2) AS avg_price \nFROM products \nGROUP BY category_id \nORDER BY avg_price DESC;',
      tbls: ['products'], pos: { x: 29.0, y: 44.0 }
    },
    {
      lvl: 24, title: 'Compras por Mercader',
      prompt: 'Cuenta los pedidos de cada cliente: customer_id, COUNT(*) AS total_orders de orders agrupado por customer_id.',
      expected: 'SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id ORDER BY total_orders DESC;',
      initial: '-- Nivel 24: Total de órdenes por customer_id\nSELECT customer_id, COUNT(*) AS total_orders \nFROM orders \nGROUP BY customer_id \nORDER BY total_orders DESC;',
      tbls: ['orders'], pos: { x: 40.0, y: 41.0 }
    },
    {
      lvl: 25, title: 'Mercaderes Frecuentes (HAVING)',
      prompt: 'Filtra clientes con más de 1 pedido: customer_id, COUNT(*) AS order_count de orders agrupado por customer_id HAVING COUNT(*) > 1.',
      expected: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY order_count DESC;',
      initial: '-- Nivel 25: Filtra con HAVING COUNT(*) > 1\nSELECT customer_id, COUNT(*) AS order_count \nFROM orders \nGROUP BY customer_id \nHAVING COUNT(*) > 1 \nORDER BY order_count DESC;',
      tbls: ['orders'], pos: { x: 44.0, y: 32.0 }
    },
    {
      lvl: 26, title: 'Altos Contribuyentes',
      prompt: 'Filtra clientes cuyo gasto acumulado supere 1000: customer_id, SUM(total_amount) AS total_spend agrupado por customer_id HAVING SUM(total_amount) > 1000.',
      expected: 'SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 1000 ORDER BY total_spend DESC;',
      initial: '-- Nivel 26: Gasto mayor a 1000 con HAVING\nSELECT customer_id, SUM(total_amount) AS total_spend \nFROM orders \nGROUP BY customer_id \nHAVING SUM(total_amount) > 1000 \nORDER BY total_spend DESC;',
      tbls: ['orders'], pos: { x: 37.0, y: 27.0 }
    },
    {
      lvl: 27, title: 'Contribuyentes Únicos Reales',
      prompt: 'Cuenta clientes únicos que han realizado pedidos: COUNT(DISTINCT customer_id) AS buying_customers de orders.',
      expected: 'SELECT COUNT(DISTINCT customer_id) AS buying_customers FROM orders;',
      initial: '-- Nivel 27: Conteo distintivo\nSELECT COUNT(DISTINCT customer_id) AS buying_customers \nFROM orders;',
      tbls: ['orders'], pos: { x: 35.0, y: 22.0 }
    },
    {
      lvl: 28, title: 'La Gran Pirámide de los Ancestros',
      prompt: "👑 ¡JEFE DE ERA II! Selecciona customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;",
      expected: "SELECT customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;",
      initial: "-- Nivel 28 JEFE: Combina WHERE, GROUP BY y HAVING\nSELECT customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent \nFROM orders \nWHERE status = 'completed' \nGROUP BY customer_id \nHAVING SUM(total_amount) > 1500 \nORDER BY gross_spent DESC;",
      tbls: ['orders'], pos: { x: 30.0, y: 21.0 }
    }
  ];

  w2Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 28;
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 2,
      worldName: 'Era II: Primeras Civilizaciones',
      biome: 'desert',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : cfg.lvl === 23 ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : cfg.lvl <= 20 ? 'Medium' : 'Hard',
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: ['Recuerda: Cualquier columna en SELECT no agregada debe estar en GROUP BY.', `Estructura esperada: ${cfg.expected}`],
      xpReward: isBoss ? 250 : 35 + (cfg.lvl - 14) * 3,
      coinReward: isBoss ? 90 : 20,
      pedagogicalNote: `¡Nivel ${cfg.lvl} completado! GROUP BY y funciones de agregación sintetizan transacciones masivas en métricas ejecutivas.`,
      position: cfg.pos
    });
  });

  // =========================================================================
  // MUNDO 3: EL REINO MEDIEVAL DE LA AGRICULTURA (Niveles 29 al 42)
  // Ruta Feudal: Molino y Granja -> Puente de Piedra -> Bosque de Pinos -> Castillo -> Faro
  // =========================================================================
  const w3Config = [
    {
      lvl: 29, title: 'El Molino del Feudo (INNER JOIN)',
      prompt: 'Conecta orders o y customers c: o.order_id, c.first_name, o.total_amount vinculados por customer_id.',
      expected: 'SELECT o.order_id, c.first_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;',
      initial: '-- Nivel 29: Une orders y customers con INNER JOIN\nSELECT o.order_id, c.first_name, o.total_amount \nFROM orders o \nINNER JOIN customers c ON o.customer_id = c.customer_id \nORDER BY o.order_id ASC;',
      tbls: ['orders', 'customers'], pos: { x: 73.0, y: 82.0 }
    },
    {
      lvl: 30, title: 'Productos y Gremios',
      prompt: 'Conecta products p y categories c: p.name, c.name AS category_name, p.price por category_id.',
      expected: 'SELECT p.name, c.name AS category_name, p.price FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.price DESC;',
      initial: '-- Nivel 30: Conecta products y categories\nSELECT p.name, c.name AS category_name, p.price \nFROM products p \nINNER JOIN categories c ON p.category_id = c.category_id \nORDER BY p.price DESC;',
      tbls: ['products', 'categories'], pos: { x: 67.0, y: 76.0 }
    },
    {
      lvl: 31, title: 'El Puente de Piedra',
      prompt: 'Conecta orders o y customers c: o.order_id, c.email, o.status por customer_id.',
      expected: 'SELECT o.order_id, c.email, o.status FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;',
      initial: '-- Nivel 31: Relaciona orders y email de customers\nSELECT o.order_id, c.email, o.status \nFROM orders o \nINNER JOIN customers c ON o.customer_id = c.customer_id \nORDER BY o.order_id ASC;',
      tbls: ['orders', 'customers'], pos: { x: 79.0, y: 63.0 }
    },
    {
      lvl: 32, title: 'Detalle de Línea de Tarea',
      prompt: 'Conecta order_items oi y products p: oi.order_id, p.name, oi.quantity, oi.unit_price por product_id.',
      expected: 'SELECT oi.order_id, p.name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.item_id ASC;',
      initial: '-- Nivel 32: Une order_items y products por product_id\nSELECT oi.order_id, p.name, oi.quantity, oi.unit_price \nFROM order_items oi \nINNER JOIN products p ON oi.product_id = p.product_id \nORDER BY oi.item_id ASC;',
      tbls: ['order_items', 'products'], pos: { x: 84.0, y: 53.0 }
    },
    {
      lvl: 33, title: 'Liquidación de Pagos',
      prompt: 'Conecta payments p y orders o: p.payment_id, o.order_id, p.payment_method, p.amount por order_id.',
      expected: 'SELECT p.payment_id, o.order_id, p.payment_method, p.amount FROM payments p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.payment_id ASC;',
      initial: '-- Nivel 33: Une payments y orders por order_id\nSELECT p.payment_id, o.order_id, p.payment_method, p.amount \nFROM payments p \nINNER JOIN orders o ON p.order_id = o.order_id \nORDER BY p.payment_id ASC;',
      tbls: ['payments', 'orders'], pos: { x: 86.0, y: 41.0 }
    },
    {
      lvl: 34, title: 'Unión Izquierda (LEFT JOIN)',
      prompt: 'Preserva clientes sin compras usando LEFT JOIN: c.customer_id, c.first_name, o.order_id.',
      expected: 'SELECT c.customer_id, c.first_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id ASC, o.order_id ASC;',
      initial: '-- Nivel 34: LEFT JOIN para incluir clientes sin pedidos\nSELECT c.customer_id, c.first_name, o.order_id \nFROM customers c \nLEFT JOIN orders o ON c.customer_id = o.customer_id \nORDER BY c.customer_id ASC, o.order_id ASC;',
      tbls: ['customers', 'orders'], pos: { x: 78.0, y: 32.0 }
    },
    {
      lvl: 35, title: 'Aldeanos sin Compras (Anti-Join)',
      prompt: 'Encuentra clientes sin pedidos con LEFT JOIN y WHERE o.order_id IS NULL: c.customer_id, c.first_name, c.country.',
      expected: 'SELECT c.customer_id, c.first_name, c.country FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL ORDER BY c.customer_id ASC;',
      initial: '-- Nivel 35: Detecta registros huérfanos con Anti-Join\nSELECT c.customer_id, c.first_name, c.country \nFROM customers c \nLEFT JOIN orders o ON c.customer_id = o.customer_id \nWHERE o.order_id IS NULL \nORDER BY c.customer_id ASC;',
      tbls: ['customers', 'orders'], pos: { x: 57.0, y: 55.0 }
    },
    {
      lvl: 36, title: 'Ingresos por Feudo (Triple JOIN)',
      prompt: 'Conecta categories c, products p y order_items oi: c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales agrupado por department.',
      expected: 'SELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY dept_sales DESC;',
      initial: '-- Nivel 36: Triple JOIN con agregación de ventas\nSELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales \nFROM categories c \nINNER JOIN products p ON c.category_id = p.category_id \nINNER JOIN order_items oi ON p.product_id = oi.product_id \nGROUP BY c.department \nORDER BY dept_sales DESC;',
      tbls: ['categories', 'products', 'order_items'], pos: { x: 48.0, y: 63.0 }
    },
    {
      lvl: 37, title: 'Volumen por Ciudadela',
      prompt: 'Cuenta órdenes por ciudad: c.city, COUNT(o.order_id) AS total_orders uniendo customers c y orders o.',
      expected: 'SELECT c.city, COUNT(o.order_id) AS total_orders FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city ORDER BY total_orders DESC;',
      initial: '-- Nivel 37: Une customers y orders y agrupa por ciudad\nSELECT c.city, COUNT(o.order_id) AS total_orders \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nGROUP BY c.city \nORDER BY total_orders DESC;',
      tbls: ['customers', 'orders'], pos: { x: 38.0, y: 68.0 }
    },
    {
      lvl: 38, title: 'Top Productos Más Vendidos',
      prompt: 'Conecta products p y order_items oi: p.name, SUM(oi.quantity) AS units_sold GROUP BY p.name ORDER BY units_sold DESC LIMIT 5.',
      expected: 'SELECT p.name, SUM(oi.quantity) AS units_sold FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY units_sold DESC LIMIT 5;',
      initial: '-- Nivel 38: Top 5 productos en volumen de ventas\nSELECT p.name, SUM(oi.quantity) AS units_sold \nFROM products p \nINNER JOIN order_items oi ON p.product_id = oi.product_id \nGROUP BY p.name \nORDER BY units_sold DESC \nLIMIT 5;',
      tbls: ['products', 'order_items'], pos: { x: 33.0, y: 61.0 }
    },
    {
      lvl: 39, title: 'Gremios y Tributos (Subscriptions)',
      prompt: 'Conecta customers c y subscriptions s: c.first_name, s.plan, s.monthly_cost por customer_id.',
      expected: 'SELECT c.first_name, s.plan, s.monthly_cost FROM customers c INNER JOIN subscriptions s ON c.customer_id = s.customer_id ORDER BY s.monthly_cost DESC;',
      initial: '-- Nivel 39: Une clientes con sus planes de suscripción\nSELECT c.first_name, s.plan, s.monthly_cost \nFROM customers c \nINNER JOIN subscriptions s ON c.customer_id = s.customer_id \nORDER BY s.monthly_cost DESC;',
      tbls: ['customers', 'subscriptions'], pos: { x: 38.0, y: 51.0 }
    },
    {
      lvl: 40, title: 'Rastro de Pagos Rechazados',
      prompt: "Conecta customers c, orders o y payments p: c.first_name, o.order_id, p.amount WHERE p.status = 'declined'.",
      expected: "SELECT c.first_name, o.order_id, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id WHERE p.status = 'declined';",
      initial: "-- Nivel 40: Detecta pagos fallidos en 3 tablas\nSELECT c.first_name, o.order_id, p.amount \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nINNER JOIN payments p ON o.order_id = p.order_id \nWHERE p.status = 'declined';",
      tbls: ['customers', 'orders', 'payments'], pos: { x: 45.0, y: 44.0 }
    },
    {
      lvl: 41, title: 'El Faro de la Costa (Sin Plan)',
      prompt: 'Encuentra clientes sin suscripción activa usando LEFT JOIN y WHERE s.subscription_id IS NULL: c.customer_id, c.first_name.',
      expected: 'SELECT c.customer_id, c.first_name FROM customers c LEFT JOIN subscriptions s ON c.customer_id = s.customer_id WHERE s.subscription_id IS NULL ORDER BY c.customer_id ASC;',
      initial: '-- Nivel 41: Anti-Join con subscriptions\nSELECT c.customer_id, c.first_name \nFROM customers c \nLEFT JOIN subscriptions s ON c.customer_id = s.customer_id \nWHERE s.subscription_id IS NULL \nORDER BY c.customer_id ASC;',
      tbls: ['customers', 'subscriptions'], pos: { x: 12.0, y: 46.0 }
    },
    {
      lvl: 42, title: 'Fortaleza del Rey Feudal',
      prompt: '👑 ¡JEFE DE ERA III! Une customers, orders, order_items, products y categories y filtra clientes con gasto > 1000 en departamentos.',
      expected: 'SELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY c.first_name, cat.department HAVING spend > 1000 ORDER BY spend DESC;',
      initial: '-- Nivel 42 JEFE: Cruce relacional de 5 tablas con HAVING\nSELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nINNER JOIN order_items oi ON o.order_id = oi.order_id \nINNER JOIN products p ON oi.product_id = p.product_id \nINNER JOIN categories cat ON p.category_id = cat.category_id \nGROUP BY c.first_name, cat.department \nHAVING spend > 1000 \nORDER BY spend DESC;',
      tbls: ['customers', 'orders', 'order_items', 'products', 'categories'], pos: { x: 39.0, y: 33.0 }
    }
  ];

  w3Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 42;
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 3,
      worldName: 'Era III: Grandes Reinos e Hierro',
      biome: 'bridge',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : cfg.lvl === 35 ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : 'Hard',
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: ['Usa alias cortos como c, o, p para mantener legibles los JOINs.', `Consulta esperada: ${cfg.expected}`],
      xpReward: isBoss ? 300 : 45 + (cfg.lvl - 28) * 3,
      coinReward: isBoss ? 100 : 25,
      pedagogicalNote: `¡Nivel ${cfg.lvl} completado! Los JOINs relacionales permiten vincular entidades heterogéneas manteniendo la normalización.`,
      position: cfg.pos
    });
  });

  // =========================================================================
  // MUNDO 4: LA CIUDAD DE LA REVOLUCIÓN INDUSTRIAL (Niveles 43 al 56)
  // Ruta Urbana e Industrial: Puerto de Vapor -> Ferrocarriles -> Torre del Reloj -> Fábricas
  // =========================================================================
  const w4Config = [
    {
      lvl: 43, title: 'Transformación UPPER y LOWER',
      prompt: 'Normaliza textos: SELECT UPPER(first_name) AS upper_name, LOWER(email) AS lower_email FROM customers ORDER BY upper_name ASC;',
      expected: 'SELECT UPPER(first_name) AS upper_name, LOWER(email) AS lower_email FROM customers ORDER BY upper_name ASC;',
      initial: '-- Nivel 43: Normaliza cadenas de texto\nSELECT UPPER(first_name) AS upper_name, LOWER(email) AS lower_email \nFROM customers \nORDER BY upper_name ASC;',
      tbls: ['customers'], pos: { x: 13.0, y: 53.0 }
    },
    {
      lvl: 44, title: 'Bifurcación Binaria (CASE)',
      prompt: "Clasifica precios con CASE: WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class de products.",
      expected: "SELECT name, price, CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class FROM products ORDER BY price DESC;",
      initial: "-- Nivel 44: Lógica condicional binaria con CASE\nSELECT name, price, \n  CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class \nFROM products \nORDER BY price DESC;",
      tbls: ['products'], pos: { x: 23.0, y: 42.0 }
    },
    {
      lvl: 45, title: 'Segmentación en Tres Niveles',
      prompt: "Segmenta precios en Budget, Mid-Tier y Premium con CASE: price < 200, price < 1000, ELSE 'Premium'.",
      expected: "SELECT name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS tier FROM products ORDER BY price ASC;",
      initial: "-- Nivel 45: Clasificación en 3 rangos con CASE\nSELECT name, price, \n  CASE \n    WHEN price < 200 THEN 'Budget' \n    WHEN price < 1000 THEN 'Mid-Tier' \n    ELSE 'Premium' \n  END AS tier \nFROM products \nORDER BY price ASC;",
      tbls: ['products'], pos: { x: 25.0, y: 78.0 }
    },
    {
      lvl: 46, title: 'Agregación Condicional (SUM CASE)',
      prompt: "Calcula ventas de órdenes completadas frente a canceladas usando SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS completed_rev.",
      expected: "SELECT SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS completed_rev, SUM(CASE WHEN status = 'cancelled' THEN total_amount ELSE 0 END) AS lost_rev FROM orders;",
      initial: "-- Nivel 46: SUM con CASE WHEN adentro\nSELECT \n  SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS completed_rev, \n  SUM(CASE WHEN status = 'cancelled' THEN total_amount ELSE 0 END) AS lost_rev \nFROM orders;",
      tbls: ['orders'], pos: { x: 35.0, y: 80.0 }
    },
    {
      lvl: 47, title: 'Matriz de Métodos de Pago',
      prompt: "Pivota pagos: SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS card_total, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_total de payments.",
      expected: "SELECT SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS card_total, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_total FROM payments;",
      initial: "-- Nivel 47: Pivotaje de pagos por método\nSELECT \n  SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS card_total, \n  SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_total \nFROM payments;",
      tbls: ['payments'], pos: { x: 47.0, y: 72.0 }
    },
    {
      lvl: 48, title: 'Filtro con Subconsulta Escalar',
      prompt: 'Filtra productos cuyo precio supera el promedio general: price > (SELECT AVG(price) FROM products).',
      expected: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;',
      initial: '-- Nivel 48: Subconsulta escalar en WHERE\nSELECT name, price \nFROM products \nWHERE price > (SELECT AVG(price) FROM products) \nORDER BY price DESC;',
      tbls: ['products'], pos: { x: 56.0, y: 66.0 }
    },
    {
      lvl: 49, title: 'Subconsulta con Lista (IN)',
      prompt: 'Encuentra clientes que han colocado al menos un pedido usando WHERE customer_id IN (SELECT customer_id FROM orders).',
      expected: 'SELECT first_name, email FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY first_name ASC;',
      initial: '-- Nivel 49: Subconsulta IN en WHERE\nSELECT first_name, email \nFROM customers \nWHERE customer_id IN (SELECT customer_id FROM orders) \nORDER BY first_name ASC;',
      tbls: ['customers', 'orders'], pos: { x: 67.0, y: 75.0 }
    },
    {
      lvl: 50, title: 'Exclusión con NOT IN',
      prompt: 'Encuentra productos que nunca han sido vendidos: product_id NOT IN (SELECT product_id FROM order_items).',
      expected: 'SELECT product_id, name FROM products WHERE product_id NOT IN (SELECT product_id FROM order_items) ORDER BY product_id ASC;',
      initial: '-- Nivel 50: Productos sin ventas con NOT IN\nSELECT product_id, name \nFROM products \nWHERE product_id NOT IN (SELECT product_id FROM order_items) \nORDER BY product_id ASC;',
      tbls: ['products', 'order_items'], pos: { x: 52.0, y: 47.0 }
    },
    {
      lvl: 51, title: 'Subconsulta Correlacionada (EXISTS)',
      prompt: 'Encuentra clientes que tienen al menos un pedido completado usando WHERE EXISTS.',
      expected: "SELECT c.customer_id, c.first_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id AND o.status = 'completed') ORDER BY c.customer_id ASC;",
      initial: "-- Nivel 51: Subconsulta correlacionada con EXISTS\nSELECT c.customer_id, c.first_name \nFROM customers c \nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id AND o.status = 'completed') \nORDER BY c.customer_id ASC;",
      tbls: ['customers', 'orders'], pos: { x: 36.0, y: 38.0 }
    },
    {
      lvl: 52, title: 'Tabla Derivada en FROM',
      prompt: 'Calcula el promedio de gasto de los clientes a partir de una tabla derivada en FROM.',
      expected: 'SELECT ROUND(AVG(customer_spent), 2) AS avg_customer_spend FROM (SELECT customer_id, SUM(total_amount) AS customer_spent FROM orders GROUP BY customer_id) AS spend_subquery;',
      initial: '-- Nivel 52: Subconsulta como tabla derivada en FROM\nSELECT ROUND(AVG(customer_spent), 2) AS avg_customer_spend \nFROM (SELECT customer_id, SUM(total_amount) AS customer_spent FROM orders GROUP BY customer_id) AS spend_subquery;',
      tbls: ['orders'], pos: { x: 27.0, y: 28.0 }
    },
    {
      lvl: 53, title: 'Cálculo de Promedios por Categoría',
      prompt: 'Compara el precio de cada producto con el precio promedio de su categoría usando una subconsulta correlacionada.',
      expected: 'SELECT p.name, p.price, ROUND((SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id), 2) AS cat_avg_price FROM products p ORDER BY p.price DESC;',
      initial: '-- Nivel 53: Subconsulta correlacionada en SELECT\nSELECT p.name, p.price, \n  ROUND((SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id), 2) AS cat_avg_price \nFROM products p \nORDER BY p.price DESC;',
      tbls: ['products'], pos: { x: 40.0, y: 25.0 }
    },
    {
      lvl: 54, title: 'Extracción Temporal con STRFTIME',
      prompt: "Extrae año y mes de pedidos: STRFTIME('%Y-%m', order_date) AS order_month, COUNT(*) AS monthly_orders de orders.",
      expected: "SELECT STRFTIME('%Y-%m', order_date) AS order_month, COUNT(*) AS monthly_orders FROM orders GROUP BY order_month ORDER BY order_month ASC;",
      initial: "-- Nivel 54: Agrupación temporal con STRFTIME\nSELECT STRFTIME('%Y-%m', order_date) AS order_month, COUNT(*) AS monthly_orders \nFROM orders \nGROUP BY order_month \nORDER BY order_month ASC;",
      tbls: ['orders'], pos: { x: 62.0, y: 32.0 }
    },
    {
      lvl: 55, title: 'Reemplazo y Limpieza (REPLACE)',
      prompt: "Limpia correos: REPLACE(email, '@example.com', '@empresa.com') AS enterprise_email de customers.",
      expected: "SELECT first_name, REPLACE(email, '@example.com', '@empresa.com') AS enterprise_email FROM customers ORDER BY first_name ASC;",
      initial: "-- Nivel 55: Transformación con REPLACE\nSELECT first_name, REPLACE(email, '@example.com', '@empresa.com') AS enterprise_email \nFROM customers \nORDER BY first_name ASC;",
      tbls: ['customers'], pos: { x: 74.0, y: 25.0 }
    },
    {
      lvl: 56, title: 'La Maquinaria Central de la Revolución',
      prompt: '👑 ¡JEFE DE ERA IV! Selecciona customers cuyo gasto supere el promedio de todos los compradores activos, categorizados con CASE en Gold y Platinum.',
      expected: "SELECT c.first_name, SUM(o.total_amount) AS total_spent, CASE WHEN SUM(o.total_amount) > 1500 THEN 'Platinum' ELSE 'Gold' END AS customer_tier FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id HAVING total_spent > (SELECT AVG(total_amount) FROM orders) ORDER BY total_spent DESC;",
      initial: "-- Nivel 56 JEFE: CASE, Subconsulta en HAVING y JOIN\nSELECT c.first_name, SUM(o.total_amount) AS total_spent, \n  CASE WHEN SUM(o.total_amount) > 1500 THEN 'Platinum' ELSE 'Gold' END AS customer_tier \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nGROUP BY c.customer_id \nHAVING total_spent > (SELECT AVG(total_amount) FROM orders) \nORDER BY total_spent DESC;",
      tbls: ['customers', 'orders'], pos: { x: 50.0, y: 34.0 }
    }
  ];

  w4Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 56;
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 4,
      worldName: 'Era IV: Revolución del Vapor',
      biome: 'cavern',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : cfg.lvl === 50 ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : 'Hard',
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: ['Asegura cerrar cada bloque CASE con END.', `Consulta esperada: ${cfg.expected}`],
      xpReward: isBoss ? 350 : 55 + (cfg.lvl - 42) * 3,
      coinReward: isBoss ? 110 : 28,
      pedagogicalNote: `¡Nivel ${cfg.lvl} conquistado! La lógica condicional CASE y las subconsultas desbloquean análisis adaptativos sin código procedimental.`,
      position: cfg.pos
    });
  });

  // =========================================================================
  // MUNDO 5: EL HUB DE LA GLOBALIZACIÓN CONECTADA (Niveles 57 al 70) [NUEVO MUNDO]
  // Terminal Portuaria -> Autopista Intermodal -> Cúpulas de Cristal -> Aeropuerto
  // Conceptos: Common Table Expressions (WITH / CTEs), Subconsultas Correlacionadas, Análisis Transfronterizo
  // =========================================================================
  const w5Config = [
    {
      lvl: 57, title: 'Terminal Portuaria (Primer CTE)',
      prompt: 'Escribe un CTE con WITH high_orders AS (SELECT * FROM orders WHERE total_amount > 500) SELECT order_id, total_amount FROM high_orders ORDER BY total_amount DESC;',
      expected: 'WITH high_orders AS (SELECT * FROM orders WHERE total_amount > 500) SELECT order_id, total_amount FROM high_orders ORDER BY total_amount DESC;',
      initial: '-- Nivel 57: Declara tu primer CTE con WITH\nWITH high_orders AS (\n  SELECT * FROM orders WHERE total_amount > 500\n)\nSELECT order_id, total_amount \nFROM high_orders \nORDER BY total_amount DESC;',
      tbls: ['orders'], pos: { x: 15.0, y: 77.0 }
    },
    {
      lvl: 58, title: 'Optimización de Inventario Global',
      prompt: 'Usa un CTE con stock_critico AS (SELECT product_id, name, stock_quantity FROM products WHERE stock_quantity < 20) SELECT * FROM stock_critico ORDER BY stock_quantity ASC;',
      expected: 'WITH stock_critico AS (SELECT product_id, name, stock_quantity FROM products WHERE stock_quantity < 20) SELECT * FROM stock_critico ORDER BY stock_quantity ASC;',
      initial: '-- Nivel 58: CTE para aislar inventario crítico\nWITH stock_critico AS (\n  SELECT product_id, name, stock_quantity FROM products WHERE stock_quantity < 20\n)\nSELECT * FROM stock_critico ORDER BY stock_quantity ASC;',
      tbls: ['products'], pos: { x: 24.0, y: 68.0 }
    },
    {
      lvl: 59, title: 'Enrutamiento de Pedidos Transfronterizos',
      prompt: "Conecta un CTE de países con clientes: WITH foreign_customers AS (SELECT customer_id, first_name, country FROM customers WHERE country != 'USA') SELECT fc.first_name, fc.country, o.order_id, o.total_amount FROM foreign_customers fc INNER JOIN orders o ON fc.customer_id = o.customer_id ORDER BY o.total_amount DESC;",
      expected: "WITH foreign_customers AS (SELECT customer_id, first_name, country FROM customers WHERE country != 'USA') SELECT fc.first_name, fc.country, o.order_id, o.total_amount FROM foreign_customers fc INNER JOIN orders o ON fc.customer_id = o.customer_id ORDER BY o.total_amount DESC;",
      initial: "-- Nivel 59: Cruza un CTE con una tabla real mediante JOIN\nWITH foreign_customers AS (\n  SELECT customer_id, first_name, country FROM customers WHERE country != 'USA'\n)\nSELECT fc.first_name, fc.country, o.order_id, o.total_amount \nFROM foreign_customers fc \nINNER JOIN orders o ON fc.customer_id = o.customer_id \nORDER BY o.total_amount DESC;",
      tbls: ['customers', 'orders'], pos: { x: 34.0, y: 74.0 }
    },
    {
      lvl: 60, title: 'Autopista Intermodal (Doble CTE)',
      prompt: 'Encadena dos CTEs: WITH sum_orders AS (SELECT customer_id, SUM(total_amount) AS gross_spend FROM orders GROUP BY customer_id), top_customers AS (SELECT customer_id, gross_spend FROM sum_orders WHERE gross_spend > 800) SELECT c.first_name, tc.gross_spend FROM top_customers tc INNER JOIN customers c ON tc.customer_id = c.customer_id ORDER BY tc.gross_spend DESC;',
      expected: 'WITH sum_orders AS (SELECT customer_id, SUM(total_amount) AS gross_spend FROM orders GROUP BY customer_id), top_customers AS (SELECT customer_id, gross_spend FROM sum_orders WHERE gross_spend > 800) SELECT c.first_name, tc.gross_spend FROM top_customers tc INNER JOIN customers c ON tc.customer_id = c.customer_id ORDER BY tc.gross_spend DESC;',
      initial: '-- Nivel 60: Dos CTEs encadenados separados por coma\nWITH sum_orders AS (\n  SELECT customer_id, SUM(total_amount) AS gross_spend FROM orders GROUP BY customer_id\n),\ntop_customers AS (\n  SELECT customer_id, gross_spend FROM sum_orders WHERE gross_spend > 800\n)\nSELECT c.first_name, tc.gross_spend \nFROM top_customers tc \nINNER JOIN customers c ON tc.customer_id = c.customer_id \nORDER BY tc.gross_spend DESC;',
      tbls: ['orders', 'customers'], pos: { x: 44.0, y: 84.0 }
    },
    {
      lvl: 61, title: 'Análisis de Demanda Regional',
      prompt: 'Calcula ingresos por país con CTE: WITH country_sales AS (SELECT c.country, SUM(o.total_amount) AS sales FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country) SELECT country, sales FROM country_sales WHERE sales > 1000 ORDER BY sales DESC;',
      expected: 'WITH country_sales AS (SELECT c.country, SUM(o.total_amount) AS sales FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country) SELECT country, sales FROM country_sales WHERE sales > 1000 ORDER BY sales DESC;',
      initial: '-- Nivel 61: Demanda regional aislada con CTE\nWITH country_sales AS (\n  SELECT c.country, SUM(o.total_amount) AS sales \n  FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id \n  GROUP BY c.country\n)\nSELECT country, sales FROM country_sales WHERE sales > 1000 ORDER BY sales DESC;',
      tbls: ['customers', 'orders'], pos: { x: 55.0, y: 88.0 }
    },
    {
      lvl: 62, title: 'Tasa de Cumplimiento de Pedidos',
      prompt: "Calcula el porcentaje de cumplimiento: WITH order_stats AS (SELECT COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders FROM orders) SELECT total_orders, completed_orders, ROUND((completed_orders * 100.0) / total_orders, 2) AS fulfillment_rate FROM order_stats;",
      expected: "WITH order_stats AS (SELECT COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders FROM orders) SELECT total_orders, completed_orders, ROUND((completed_orders * 100.0) / total_orders, 2) AS fulfillment_rate FROM order_stats;",
      initial: "-- Nivel 62: Tasa porcentual calculada en un CTE\nWITH order_stats AS (\n  SELECT COUNT(*) AS total_orders, \n         SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders \n  FROM orders\n)\nSELECT total_orders, completed_orders, ROUND((completed_orders * 100.0) / total_orders, 2) AS fulfillment_rate \nFROM order_stats;",
      tbls: ['orders'], pos: { x: 64.0, y: 77.0 }
    },
    {
      lvl: 63, title: 'Integración de API de Terceros',
      prompt: "Aisla pagos pasados por PayPal: WITH paypal_tx AS (SELECT * FROM payments WHERE payment_method = 'paypal') SELECT p.payment_id, p.amount, o.customer_id FROM paypal_tx p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.amount DESC;",
      expected: "WITH paypal_tx AS (SELECT * FROM payments WHERE payment_method = 'paypal') SELECT p.payment_id, p.amount, o.customer_id FROM paypal_tx p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.amount DESC;",
      initial: "-- Nivel 63: Pasarela de pagos en CTE\nWITH paypal_tx AS (\n  SELECT * FROM payments WHERE payment_method = 'paypal'\n)\nSELECT p.payment_id, p.amount, o.customer_id \nFROM paypal_tx p \nINNER JOIN orders o ON p.order_id = o.order_id \nORDER BY p.amount DESC;",
      tbls: ['payments', 'orders'], pos: { x: 62.0, y: 62.0 }
    },
    {
      lvl: 64, title: 'Análisis de Cohortes de Clientes',
      prompt: "Agrupa clientes por año de registro: WITH cohorts AS (SELECT STRFTIME('%Y', signup_date) AS signup_year, customer_id FROM customers) SELECT signup_year, COUNT(customer_id) AS customers_count FROM cohorts GROUP BY signup_year ORDER BY signup_year ASC;",
      expected: "WITH cohorts AS (SELECT STRFTIME('%Y', signup_date) AS signup_year, customer_id FROM customers) SELECT signup_year, COUNT(customer_id) AS customers_count FROM cohorts GROUP BY signup_year ORDER BY signup_year ASC;",
      initial: "-- Nivel 64: Cohortes de registro con STRFTIME y CTE\nWITH cohorts AS (\n  SELECT STRFTIME('%Y', signup_date) AS signup_year, customer_id FROM customers\n)\nSELECT signup_year, COUNT(customer_id) AS customers_count \nFROM cohorts \nGROUP BY signup_year \nORDER BY signup_year ASC;",
      tbls: ['customers'], pos: { x: 75.0, y: 59.0 }
    },
    {
      lvl: 65, title: 'Customer Lifetime Value (LTV)',
      prompt: 'Calcula el LTV histórico por cliente: WITH customer_ltv AS (SELECT customer_id, SUM(total_amount) AS lifetime_spent, COUNT(order_id) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, cltv.lifetime_spent, cltv.orders_count FROM customer_ltv cltv INNER JOIN customers c ON cltv.customer_id = c.customer_id ORDER BY cltv.lifetime_spent DESC LIMIT 5;',
      expected: 'WITH customer_ltv AS (SELECT customer_id, SUM(total_amount) AS lifetime_spent, COUNT(order_id) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, cltv.lifetime_spent, cltv.orders_count FROM customer_ltv cltv INNER JOIN customers c ON cltv.customer_id = c.customer_id ORDER BY cltv.lifetime_spent DESC LIMIT 5;',
      initial: '-- Nivel 65: LTV y volumen por cliente\nWITH customer_ltv AS (\n  SELECT customer_id, SUM(total_amount) AS lifetime_spent, COUNT(order_id) AS orders_count \n  FROM orders GROUP BY customer_id\n)\nSELECT c.first_name, cltv.lifetime_spent, cltv.orders_count \nFROM customer_ltv cltv \nINNER JOIN customers c ON cltv.customer_id = c.customer_id \nORDER BY cltv.lifetime_spent DESC LIMIT 5;',
      tbls: ['orders', 'customers'], pos: { x: 86.0, y: 50.0 }
    },
    {
      lvl: 66, title: 'Carritos Abandonados',
      prompt: 'Detecta carritos que no llegaron a pagarse uniendo órdenes con payments en un CTE.',
      expected: 'WITH unpaid_orders AS (SELECT o.order_id, o.customer_id, o.total_amount FROM orders o LEFT JOIN payments p ON o.order_id = p.order_id WHERE p.payment_id IS NULL) SELECT c.first_name, uo.order_id, uo.total_amount FROM unpaid_orders uo INNER JOIN customers c ON uo.customer_id = c.customer_id ORDER BY uo.total_amount DESC;',
      initial: '-- Nivel 66: Identifica órdenes sin liquidación con CTE\nWITH unpaid_orders AS (\n  SELECT o.order_id, o.customer_id, o.total_amount \n  FROM orders o \n  LEFT JOIN payments p ON o.order_id = p.order_id \n  WHERE p.payment_id IS NULL\n)\nSELECT c.first_name, uo.order_id, uo.total_amount \nFROM unpaid_orders uo \nINNER JOIN customers c ON uo.customer_id = c.customer_id \nORDER BY uo.total_amount DESC;',
      tbls: ['orders', 'payments', 'customers'], pos: { x: 91.0, y: 38.0 }
    },
    {
      lvl: 67, title: 'Optimización de Rutas de Envío',
      prompt: 'Filtra productos con ventas activas y stock saludable: WITH active_sales AS (SELECT DISTINCT product_id FROM order_items) SELECT p.name, p.stock_quantity FROM products p WHERE p.product_id IN (SELECT product_id FROM active_sales) AND p.stock_quantity > 30 ORDER BY p.stock_quantity DESC;',
      expected: 'WITH active_sales AS (SELECT DISTINCT product_id FROM order_items) SELECT p.name, p.stock_quantity FROM products p WHERE p.product_id IN (SELECT product_id FROM active_sales) AND p.stock_quantity > 30 ORDER BY p.stock_quantity DESC;',
      initial: '-- Nivel 67: Despachos con inventario óptimo\nWITH active_sales AS (\n  SELECT DISTINCT product_id FROM order_items\n)\nSELECT p.name, p.stock_quantity \nFROM products p \nWHERE p.product_id IN (SELECT product_id FROM active_sales) AND p.stock_quantity > 30 \nORDER BY p.stock_quantity DESC;',
      tbls: ['order_items', 'products'], pos: { x: 81.0, y: 28.0 }
    },
    {
      lvl: 68, title: 'Torre de Control Aéreo (KPIs Globales)',
      prompt: 'Calcula ticket promedio por país: WITH country_aov AS (SELECT c.country, AVG(o.total_amount) AS aov, COUNT(o.order_id) AS orders_count FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country) SELECT country, ROUND(aov, 2) AS avg_ticket, orders_count FROM country_aov ORDER BY avg_ticket DESC;',
      expected: 'WITH country_aov AS (SELECT c.country, AVG(o.total_amount) AS aov, COUNT(o.order_id) AS orders_count FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country) SELECT country, ROUND(aov, 2) AS avg_ticket, orders_count FROM country_aov ORDER BY avg_ticket DESC;',
      initial: '-- Nivel 68: AOV por territorio con CTE\nWITH country_aov AS (\n  SELECT c.country, AVG(o.total_amount) AS aov, COUNT(o.order_id) AS orders_count \n  FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id \n  GROUP BY c.country\n)\nSELECT country, ROUND(aov, 2) AS avg_ticket, orders_count FROM country_aov ORDER BY avg_ticket DESC;',
      tbls: ['customers', 'orders'], pos: { x: 67.0, y: 21.0 }
    },
    {
      lvl: 69, title: 'Pista Internacional de Carga',
      prompt: 'Calcula productos de alto rendimiento: WITH prod_perf AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, pp.rev FROM prod_perf pp INNER JOIN products p ON pp.product_id = p.product_id ORDER BY pp.rev DESC LIMIT 5;',
      expected: 'WITH prod_perf AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, pp.rev FROM prod_perf pp INNER JOIN products p ON pp.product_id = p.product_id ORDER BY pp.rev DESC LIMIT 5;',
      initial: '-- Nivel 69: Rendimiento de SKUs con CTE\nWITH prod_perf AS (\n  SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id\n)\nSELECT p.name, pp.rev \nFROM prod_perf pp \nINNER JOIN products p ON pp.product_id = p.product_id \nORDER BY pp.rev DESC LIMIT 5;',
      tbls: ['order_items', 'products'], pos: { x: 51.0, y: 27.0 }
    },
    {
      lvl: 70, title: 'Centro Global de Logística',
      prompt: '👑 ¡JEFE DE ERA V! Encadena CTEs para calcular el gasto total y la suscripción activa de los mejores compradores globales.',
      expected: "WITH client_sales AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id HAVING spend > 1000), active_subs AS (SELECT customer_id, plan FROM subscriptions WHERE status = 'active') SELECT c.first_name, cs.spend, COALESCE(asub.plan, 'None') AS plan FROM client_sales cs INNER JOIN customers c ON cs.customer_id = c.customer_id LEFT JOIN active_subs asub ON cs.customer_id = asub.customer_id ORDER BY cs.spend DESC;",
      initial: "-- Nivel 70 JEFE: Múltiples CTEs y COALESCE\nWITH client_sales AS (\n  SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id HAVING spend > 1000\n),\nactive_subs AS (\n  SELECT customer_id, plan FROM subscriptions WHERE status = 'active'\n)\nSELECT c.first_name, cs.spend, COALESCE(asub.plan, 'None') AS plan \nFROM client_sales cs \nINNER JOIN customers c ON cs.customer_id = c.customer_id \nLEFT JOIN active_subs asub ON cs.customer_id = asub.customer_id \nORDER BY cs.spend DESC;",
      tbls: ['orders', 'subscriptions', 'customers'], pos: { x: 79.0, y: 44.0 }
    }
  ];

  w5Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 70;
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 5,
      worldName: 'Era V: Hub de la Globalización Conectada',
      biome: 'plains',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : cfg.lvl === 65 ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : 'Expert',
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: ['Los CTEs se declaran con WITH y permiten modularizar consultas complejas en pasos limpios.', `Consulta esperada: ${cfg.expected}`],
      xpReward: isBoss ? 400 : 70 + (cfg.lvl - 56) * 3,
      coinReward: isBoss ? 130 : 30,
      pedagogicalNote: `¡Nivel ${cfg.lvl} completado! Los CTEs (WITH) son la herramienta estándar en ingeniería de datos para construir pipelines limpios y legibles.`,
      position: cfg.pos
    });
  });

  // =========================================================================
  // MUNDO 6: LA METRÓPOLIS DE LA INTELIGENCIA ARTIFICIAL (Niveles 71 al 84)
  // Carretera Magnética Neón -> Parque Solar -> Centro de Servidores -> Monolito AI
  // Conceptos: Window Functions (OVER, PARTITION BY, ROW_NUMBER, RANK, Running Total, LAG/LEAD)
  // =========================================================================
  const w6Config = [
    {
      lvl: 71, title: 'Ranking con ROW_NUMBER',
      prompt: 'Enumera pedidos ordenados por total_amount descendente con ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS row_num.',
      expected: 'SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS row_num FROM orders;',
      initial: '-- Nivel 71: Enumeración con ROW_NUMBER()\nSELECT order_id, customer_id, total_amount, \n  ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS row_num \nFROM orders;',
      tbls: ['orders'], pos: { x: 12.0, y: 54.0 }
    },
    {
      lvl: 72, title: 'Empates con RANK y DENSE_RANK',
      prompt: 'Calcula ranking de precios de productos: RANK() OVER (ORDER BY price DESC) AS price_rank, DENSE_RANK() OVER (ORDER BY price DESC) AS dense_price_rank.',
      expected: 'SELECT name, price, RANK() OVER (ORDER BY price DESC) AS price_rank, DENSE_RANK() OVER (ORDER BY price DESC) AS dense_price_rank FROM products;',
      initial: '-- Nivel 72: RANK vs DENSE_RANK\nSELECT name, price, \n  RANK() OVER (ORDER BY price DESC) AS price_rank, \n  DENSE_RANK() OVER (ORDER BY price DESC) AS dense_price_rank \nFROM products;',
      tbls: ['products'], pos: { x: 14.0, y: 74.0 }
    },
    {
      lvl: 73, title: 'Partición por Cliente (PARTITION BY)',
      prompt: 'Enumera pedidos de cada cliente independientemente: ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS customer_order_seq.',
      expected: 'SELECT order_id, customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS customer_order_seq FROM orders;',
      initial: '-- Nivel 73: Reinicia el contador por cada cliente con PARTITION BY\nSELECT order_id, customer_id, order_date, \n  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS customer_order_seq \nFROM orders;',
      tbls: ['orders'], pos: { x: 25.0, y: 82.0 }
    },
    {
      lvl: 74, title: 'Primer Pedido de Cada Cliente',
      prompt: 'Filtra el primer pedido de cada cliente envolviendo ROW_NUMBER en un CTE.',
      expected: 'WITH ranked_orders AS (SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS seq FROM orders) SELECT order_id, customer_id, total_amount FROM ranked_orders WHERE seq = 1;',
      initial: '-- Nivel 74: Filtro de seq = 1 con CTE\nWITH ranked_orders AS (\n  SELECT order_id, customer_id, total_amount, \n         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS seq \n  FROM orders\n)\nSELECT order_id, customer_id, total_amount FROM ranked_orders WHERE seq = 1;',
      tbls: ['orders'], pos: { x: 37.0, y: 91.0 }
    },
    {
      lvl: 75, title: 'Suma Acumulada Móvil (Running Total)',
      prompt: 'Calcula la suma acumulada de ingresos: SUM(total_amount) OVER (ORDER BY order_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total.',
      expected: 'SELECT order_id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM orders;',
      initial: '-- Nivel 75: Running Total progresivo con SUM OVER\nSELECT order_id, order_date, total_amount, \n  SUM(total_amount) OVER (ORDER BY order_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total \nFROM orders;',
      tbls: ['orders'], pos: { x: 51.0, y: 80.0 }
    },
    {
      lvl: 76, title: 'Promedio Móvil de Ventas',
      prompt: 'Calcula el promedio móvil de 3 órdenes: ROUND(AVG(total_amount) OVER (ORDER BY order_id ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg.',
      expected: 'SELECT order_id, total_amount, ROUND(AVG(total_amount) OVER (ORDER BY order_id ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg FROM orders;',
      initial: '-- Nivel 76: Media móvil con ROWS BETWEEN 2 PRECEDING\nSELECT order_id, total_amount, \n  ROUND(AVG(total_amount) OVER (ORDER BY order_id ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg \nFROM orders;',
      tbls: ['orders'], pos: { x: 70.0, y: 87.0 }
    },
    {
      lvl: 77, title: 'Comparativa MoM (LAG)',
      prompt: 'Obtén el monto de la orden anterior con LAG(total_amount, 1) OVER (ORDER BY order_date ASC) AS prev_amount de orders.',
      expected: 'SELECT order_id, order_date, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_date ASC) AS prev_amount FROM orders;',
      initial: '-- Nivel 77: Consulta la fila precedente con LAG\nSELECT order_id, order_date, total_amount, \n  LAG(total_amount, 1) OVER (ORDER BY order_date ASC) AS prev_amount \nFROM orders;',
      tbls: ['orders'], pos: { x: 30.0, y: 36.0 }
    },
    {
      lvl: 78, title: 'Proyección Futura (LEAD)',
      prompt: 'Consulta el monto de la siguiente orden con LEAD(total_amount, 1) OVER (ORDER BY order_date ASC) AS next_amount de orders.',
      expected: 'SELECT order_id, order_date, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_date ASC) AS next_amount FROM orders;',
      initial: '-- Nivel 78: Anticipa la siguiente fila con LEAD\nSELECT order_id, order_date, total_amount, \n  LEAD(total_amount, 1) OVER (ORDER BY order_date ASC) AS next_amount \nFROM orders;',
      tbls: ['orders'], pos: { x: 45.0, y: 46.0 }
    },
    {
      lvl: 79, title: 'Primer Valor en Ventana (FIRST_VALUE)',
      prompt: 'Obtén el precio más caro de cada categoría preservando cada fila: FIRST_VALUE(price) OVER (PARTITION BY category_id ORDER BY price DESC) AS highest_cat_price.',
      expected: 'SELECT product_id, category_id, name, price, FIRST_VALUE(price) OVER (PARTITION BY category_id ORDER BY price DESC) AS highest_cat_price FROM products;',
      initial: '-- Nivel 79: Extrae el extremo superior con FIRST_VALUE\nSELECT product_id, category_id, name, price, \n  FIRST_VALUE(price) OVER (PARTITION BY category_id ORDER BY price DESC) AS highest_cat_price \nFROM products;',
      tbls: ['products'], pos: { x: 50.0, y: 59.0 }
    },
    {
      lvl: 80, title: 'Segmentación en Cuartiles (NTILE)',
      prompt: 'Divide los productos en 4 cuartiles de precio: NTILE(4) OVER (ORDER BY price ASC) AS price_quartile de products.',
      expected: 'SELECT name, price, NTILE(4) OVER (ORDER BY price ASC) AS price_quartile FROM products ORDER BY price ASC;',
      initial: '-- Nivel 80: Segmenta en cuartiles con NTILE(4)\nSELECT name, price, \n  NTILE(4) OVER (ORDER BY price ASC) AS price_quartile \nFROM products \nORDER BY price ASC;',
      tbls: ['products'], pos: { x: 74.0, y: 61.0 }
    },
    {
      lvl: 81, title: 'Diferencia Respecto a la Media',
      prompt: 'Calcula cuánto se desvía cada producto de la media de su categoría con ROUND(price - AVG(price) OVER (PARTITION BY category_id), 2) AS diff_from_cat_avg.',
      expected: 'SELECT product_id, category_id, name, price, ROUND(price - AVG(price) OVER (PARTITION BY category_id), 2) AS diff_from_cat_avg FROM products;',
      initial: '-- Nivel 81: Desviación respecto al promedio del grupo\nSELECT product_id, category_id, name, price, \n  ROUND(price - AVG(price) OVER (PARTITION BY category_id), 2) AS diff_from_cat_avg \nFROM products;',
      tbls: ['products'], pos: { x: 84.0, y: 45.0 }
    },
    {
      lvl: 82, title: 'Diferencia de Crecimiento MoM',
      prompt: 'Calcula la variación absoluta respecto a la orden anterior: total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_date ASC) AS delta_amount.',
      expected: 'SELECT order_id, order_date, total_amount, (total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_date ASC)) AS delta_amount FROM orders;',
      initial: '-- Nivel 82: Delta de variación con LAG\nSELECT order_id, order_date, total_amount, \n  (total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_date ASC)) AS delta_amount \nFROM orders;',
      tbls: ['orders'], pos: { x: 88.0, y: 30.0 }
    },
    {
      lvl: 83, title: 'Top 2 Productos por Categoría',
      prompt: 'Encuentra los 2 productos más caros de cada categoría usando DENSE_RANK() dentro de un CTE.',
      expected: 'WITH ranked_prods AS (SELECT category_id, name, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk FROM products) SELECT category_id, name, price FROM ranked_prods WHERE rnk <= 2 ORDER BY category_id ASC, price DESC;',
      initial: '-- Nivel 83: Top N por partición con DENSE_RANK y CTE\nWITH ranked_prods AS (\n  SELECT category_id, name, price, \n         DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk \n  FROM products\n)\nSELECT category_id, name, price FROM ranked_prods WHERE rnk <= 2 ORDER BY category_id ASC, price DESC;',
      tbls: ['products'], pos: { x: 64.0, y: 30.0 }
    },
    {
      lvl: 84, title: 'La Metrópolis de la Inteligencia Artificial',
      prompt: '👑 ¡JEFE FINAL DE ERA VI! Calcula para cada cliente su gasto acumulado progresivo (Running Total) y numera cada compra con ROW_NUMBER(), ordenado por customer_id y order_date.',
      expected: 'SELECT customer_id, order_id, order_date, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS purchase_number, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_spend FROM orders ORDER BY customer_id ASC, order_date ASC;',
      initial: '-- Nivel 84 JEFE FINAL: PARTITION BY dual con ROW_NUMBER y Running Total\nSELECT customer_id, order_id, order_date, total_amount, \n  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS purchase_number, \n  SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_spend \nFROM orders \nORDER BY customer_id ASC, order_date ASC;',
      tbls: ['orders'], pos: { x: 63.0, y: 22.0 }
    }
  ];

  w6Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 84;
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 6,
      worldName: 'Era VI: Metrópolis de la Inteligencia Artificial',
      biome: 'volcano',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : cfg.lvl === 77 ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : 'Expert',
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: ['Las funciones de ventana OVER (...) conservan la granularidad de cada fila a diferencia de GROUP BY.', `Consulta esperada: ${cfg.expected}`],
      xpReward: isBoss ? 500 : 85 + (cfg.lvl - 70) * 4,
      coinReward: isBoss ? 150 : 35,
      pedagogicalNote: `¡Nivel ${cfg.lvl} conquistado! Las Window Functions calculan métricas analíticas avanzadas sin colapsar el detalle de las transacciones.`,
      position: cfg.pos
    });
  });

  return levels;
}

export const ALL_100_LEVELS = build84Levels();
