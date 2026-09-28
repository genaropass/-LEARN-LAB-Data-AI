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
    name: 'Era I: Edad de Piedra',
    subtitle: 'El Dominio del Fuego y los Primeros Registros (Niveles 1–20)',
    biome: 'plains' as const,
    bgImage: '/maps/era_1_piedra.jpg',
    levelsRange: [1, 20],
    accentColor: '#F97316'
  },
  {
    number: 2,
    name: 'Era II: Primeras Civilizaciones',
    subtitle: 'Riberas del Nilo, Cosechas y Agrupaciones (Niveles 21–40)',
    biome: 'desert' as const,
    bgImage: '/maps/era_2_antigua.jpg',
    levelsRange: [21, 40],
    accentColor: '#0284C7'
  },
  {
    number: 3,
    name: 'Era III: Grandes Reinos e Hierro',
    subtitle: 'Fortalezas, Forjas y Relaciones JOIN (Niveles 41–60)',
    biome: 'bridge' as const,
    bgImage: '/maps/era_3_hierro.jpg',
    levelsRange: [41, 60],
    accentColor: '#B91C1C'
  },
  {
    number: 4,
    name: 'Era IV: Revolución del Vapor',
    subtitle: 'Fábricas, Ferrocarriles y Transformaciones (Niveles 61–80)',
    biome: 'cavern' as const,
    bgImage: '/maps/era_4_vapor.jpg',
    levelsRange: [61, 80],
    accentColor: '#C2410C'
  },
  {
    number: 5,
    name: 'Era V: Era Digital e Inteligencia',
    subtitle: 'Ciberespacio, Modelos de IA y Futuro (Niveles 81–100)',
    biome: 'volcano' as const,
    bgImage: '/maps/era_5_digital.jpg',
    levelsRange: [81, 100],
    accentColor: '#2563EB'
  }
];

export function build100Levels(): GameLevel[] {
  const levels: GameLevel[] = [];

  // =========================================================================
  // MUNDO 1: REINO DE LAS PRADERAS (Niveles 1 al 20)
  // Con Bifurcación en Nivel 10:
  // - Ruta Verde (11-14): Fácil / Praderas
  // - Ruta Roja (15-18): Desafío / Cañón (+Monedas)
  // - Nivel 19: Reunificación
  // - Nivel 20: Castillo
  // =========================================================================
  const w1Config = [
    // 1-10: Tronco Principal (Era I: Edad de Piedra)
    {
      lvl: 1, title: 'El Primer Registro',
      storyContext: "Nova despierta junto a una fogata mortecina en el valle glaciar. Kael, líder de la tribu nómada, necesita saber qué cuevas existen antes de que azote la gran ventisca.",
      characterDialogue: {
        speaker: 'Kael',
        text: '¡Nova! Las marcas en la roca se borran con la lluvia. Necesito ver todas las cuevas registradas en este valle para no enviar a mi gente a ciegas.'
      },
      prompt: "Inspecciona la tabla 'cuevas'. Usa el asterisco (*) para seleccionar todas las columnas de la tabla 'cuevas'.",
      expected: 'SELECT * FROM cuevas;',
      initial: "-- Nivel 1: Escribe el asterisco (*) para traer todas las columnas\nSELECT \nFROM cuevas;",
      tbls: ['cuevas'], hint: "En SQL usamos el asterisco (*) para traer todas las columnas: SELECT * FROM cuevas;",
      pos: { x: 8.0, y: 92.0 }, prereqs: []
    },
    {
      lvl: 2, title: 'Las Manadas del Valle',
      storyContext: "Kael observa la planicie nevada. Allá afuera se mueven manadas gigantescas, pero los cazadores solo necesitan el apodo y la manada de cada bestia.",
      characterDialogue: {
        speaker: 'Nova',
        text: 'No gastes energía procesando columnas innecesarias. Trae únicamente el apodo y la manada de los mamuts avistados.'
      },
      prompt: "Selecciona únicamente las columnas 'apodo' y 'manada' de la tabla 'mamuts'.",
      expected: 'SELECT apodo, manada FROM mamuts;',
      initial: "-- Nivel 2: Escribe 'apodo, manada' después de SELECT\nSELECT \nFROM mamuts;",
      tbls: ['mamuts'], hint: "Separa los nombres de las columnas con una coma: SELECT apodo, manada FROM mamuts;",
      pos: { x: 17.0, y: 85.0 }, prereqs: [1]
    },
    {
      lvl: 3, title: 'El Filtro de la Supervivencia',
      storyContext: "El frío arreciará pronto. Solo las cuevas que actualmente estén habitadas (habitada = 1) cuentan con fuego encendido y abrigo para los exploradores agotados.",
      characterDialogue: {
        speaker: 'Kael',
        text: '¡Rápido! Si enviamos a las familias a cavernas vacías perecerán de frío. Filtra solo las cuevas donde habitada sea igual a 1.'
      },
      prompt: "Selecciona 'nombre' y 'region' de la tabla 'cuevas' donde habitada = 1.",
      expected: 'SELECT nombre, region FROM cuevas WHERE habitada = 1;',
      initial: "-- Nivel 3: Completa la condición WHERE habitada = 1\nSELECT nombre, region \nFROM cuevas \nWHERE ;",
      tbls: ['cuevas'], hint: "Usa la cláusula WHERE: SELECT nombre, region FROM cuevas WHERE habitada = 1;",
      pos: { x: 28.0, y: 78.0 }, prereqs: [2]
    },
    {
      lvl: 4, title: 'Bestias Imponentes',
      storyContext: "El clan prepara sus lanzas pesadas de sílex. Para almacenar carne antes del invierno, solo rastrearemos mamuts con un peso mayor a 4 toneladas métricas.",
      characterDialogue: {
        speaker: 'Nova',
        text: 'Usa el operador de comparación mayor que (>) para encontrar a los gigantes cuyo peso_toneladas supere 4.0.'
      },
      prompt: "Selecciona 'apodo' y 'peso_toneladas' de la tabla 'mamuts' donde peso_toneladas > 4.0.",
      expected: 'SELECT apodo, peso_toneladas FROM mamuts WHERE peso_toneladas > 4.0;',
      initial: "-- Nivel 4: Filtra mamuts con peso_toneladas > 4.0\nSELECT apodo, peso_toneladas \nFROM mamuts \nWHERE peso_toneladas > ;",
      tbls: ['mamuts'], hint: "Escribe: SELECT apodo, peso_toneladas FROM mamuts WHERE peso_toneladas > 4.0;",
      pos: { x: 35.0, y: 73.0 }, prereqs: [3]
    },
    {
      lvl: 5, title: 'Inventario de Sílex y Madera',
      storyContext: "Las herramientas del taller se desgastan rápidamente. Necesitamos alertar a los recolectores sobre aquellos recursos cuya cantidad sea menor a 15 unidades.",
      characterDialogue: {
        speaker: 'Kael',
        text: 'Nuestras reservas de ramas y tendones están bajando. Revisa la tabla recursos_tribu y avísame cuáles tienen cantidad menor a 15.'
      },
      prompt: "Selecciona 'recurso' y 'cantidad' de 'recursos_tribu' donde cantidad < 15.",
      expected: 'SELECT recurso, cantidad FROM recursos_tribu WHERE cantidad < 15;',
      initial: "-- Nivel 5: Filtra los recursos con cantidad < 15\nSELECT recurso, cantidad \nFROM recursos_tribu \nWHERE cantidad < ;",
      tbls: ['recursos_tribu'], hint: "Usa el operador menor que (<): WHERE cantidad < 15;",
      pos: { x: 44.0, y: 69.0 }, prereqs: [4]
    },
    {
      lvl: 6, title: 'Cazadores Veteranos',
      storyContext: "El cruce del torrente requiere experiencia en el hielo. Kael convoca a los miembros del clan que ostentan el rango de 'Veterano'.",
      characterDialogue: {
        speaker: 'Nova',
        text: 'Recuerda que en SQL las cadenas de texto van envueltas en comillas simples. Filtra cazadores donde rango sea igual a \'Veterano\'.'
      },
      prompt: "Selecciona 'nombre' y 'presas_cobradas' de 'cazadores' donde rango = 'Veterano'.",
      expected: "SELECT nombre, presas_cobradas FROM cazadores WHERE rango = 'Veterano';",
      initial: "-- Nivel 6: Filtra cazadores con rango 'Veterano'\nSELECT nombre, presas_cobradas \nFROM cazadores \nWHERE rango = ;",
      tbls: ['cazadores'], hint: "Los textos van entre comillas simples: WHERE rango = 'Veterano';",
      pos: { x: 54.0, y: 69.0 }, prereqs: [5]
    },
    {
      lvl: 7, title: 'Prioridad de Refugio',
      storyContext: "Llegan familias nómadas buscando abrigo. El consejo de ancianos necesita ver todas las cuevas ordenadas desde la de mayor capacidad hasta la más pequeña.",
      characterDialogue: {
        speaker: 'Kael',
        text: '¡Ordenemos las cavernas! Quiero ver primero las que tengan más espacio para albergar a los clanes que vienen marchando.'
      },
      prompt: "Selecciona 'nombre' y 'capacidad' de 'cuevas' ordenando por 'capacidad' de forma descendente (DESC).",
      expected: 'SELECT nombre, capacidad FROM cuevas ORDER BY capacidad DESC;',
      initial: "-- Nivel 7: Ordena por capacidad en orden descendente\nSELECT nombre, capacidad \nFROM cuevas \nORDER BY ;",
      tbls: ['cuevas'], hint: "Usa ORDER BY columna DESC: SELECT nombre, capacidad FROM cuevas ORDER BY capacidad DESC;",
      pos: { x: 67.0, y: 75.0 }, prereqs: [6]
    },
    {
      lvl: 8, title: 'Los Más Diestros (Top 3)',
      storyContext: "La tribu celebra a sus 3 mejores cazadores históricos entregándoles capas ceremoniales de lince. Debemos obtener el Top 3 con mayor presas_cobradas.",
      characterDialogue: {
        speaker: 'Nova',
        text: 'Combina ORDER BY con LIMIT: primero ordena por presas_cobradas DESC y luego quédate solo con los 3 primeros.'
      },
      prompt: "Selecciona 'nombre' y 'presas_cobradas' de 'cazadores' ordenados por presas_cobradas DESC y limitados a 3.",
      expected: 'SELECT nombre, presas_cobradas FROM cazadores ORDER BY presas_cobradas DESC LIMIT 3;',
      initial: "-- Nivel 8: Top 3 cazadores con ORDER BY y LIMIT 3\nSELECT nombre, presas_cobradas \nFROM cazadores \nORDER BY presas_cobradas DESC \nLIMIT ;",
      tbls: ['cazadores'], hint: "Escribe: SELECT nombre, presas_cobradas FROM cazadores ORDER BY presas_cobradas DESC LIMIT 3;",
      pos: { x: 76.0, y: 78.0 }, prereqs: [7]
    },
    {
      lvl: 9, title: 'El Gran Filtro Compuesto',
      storyContext: "Una bestia peligrosa acecha cerca del campamento. Los exploradores deben hallar mamuts que pertenezcan a la manada 'Valle Norte' Y que tengan peligrosidad 'Alta'.",
      characterDialogue: {
        speaker: 'Kael',
        text: '¡Alerta máxima! Solo prepararemos las trampas de foso si la presa es del Valle Norte y su peligrosidad es Alta.'
      },
      prompt: "Selecciona 'apodo' y 'peso_toneladas' de 'mamuts' donde manada = 'Valle Norte' AND peligrosidad = 'Alta'.",
      expected: "SELECT apodo, peso_toneladas FROM mamuts WHERE manada = 'Valle Norte' AND peligrosidad = 'Alta';",
      initial: "-- Nivel 9: Combina filtros con AND\nSELECT apodo, peso_toneladas \nFROM mamuts \nWHERE manada = 'Valle Norte'  peligrosidad = 'Alta';",
      tbls: ['mamuts'], hint: "Usa el operador AND: WHERE manada = 'Valle Norte' AND peligrosidad = 'Alta';",
      pos: { x: 83.0, y: 67.0 }, prereqs: [8]
    },
    {
      lvl: 10, title: 'Jefe de Era: La Primera Aldea',
      storyContext: "¡El Glitch intenta borrar el inventario del clan! Para cruzar al Valle Fértil y fundar la primera aldea permanente, debemos asegurar los recursos de combustible con más de 10 unidades.",
      characterDialogue: {
        speaker: 'Nova',
        text: '¡El Núcleo de Datos resistirá la tormenta! Recuperemos los recursos con cantidad > 10 y tipo = \'Combustible\', ordenados de mayor a menor cantidad.'
      },
      prompt: "Selecciona 'recurso', 'tipo' y 'cantidad' de 'recursos_tribu' donde cantidad > 10 AND tipo = 'Combustible' ORDER BY cantidad DESC.",
      expected: "SELECT recurso, tipo, cantidad FROM recursos_tribu WHERE cantidad > 10 AND tipo = 'Combustible' ORDER BY cantidad DESC;",
      initial: "-- Nivel 10: Derrota al Glitch completando el filtro y el orden\nSELECT recurso, tipo, cantidad \nFROM recursos_tribu \nWHERE cantidad > 10 AND tipo = \nORDER BY ;",
      tbls: ['recursos_tribu'], hint: "Combina WHERE con AND y finaliza con ORDER BY cantidad DESC.",
      pos: { x: 76.0, y: 57.0 }, prereqs: [9]
    },

    // BIFURCACIÓN IZQUIERDA: RUTA CAVERNA (11-14)
    {
      lvl: 11, title: 'Ruta Caverna: Alternativas (OR)',
      prompt: "[Ruta Caverna] Selecciona todas las columnas de 'cuevas' donde region = 'Valle Norte' OR region = 'Ribera Este'.",
      expected: "SELECT * FROM cuevas WHERE region = 'Valle Norte' OR region = 'Ribera Este';",
      initial: "-- Ruta Caverna 11: Usa OR para incluir ambas regiones\nSELECT * \nFROM cuevas \nWHERE region = 'Valle Norte' OR ;",
      tbls: ['cuevas'], hint: "Escribe: SELECT * FROM cuevas WHERE region = 'Valle Norte' OR region = 'Ribera Este';",
      pos: { x: 71.0, y: 52.0 }, prereqs: [10], branch: 'easy' as const, branchLabel: '🟢 Caverna'
    },
    {
      lvl: 12, title: 'Ruta Caverna: Capacidad (BETWEEN)',
      prompt: "[Ruta Caverna] Selecciona 'nombre' y 'capacidad' de 'cuevas' donde capacidad esté BETWEEN 10 AND 25.",
      expected: 'SELECT nombre, capacidad FROM cuevas WHERE capacidad BETWEEN 10 AND 25;',
      initial: "-- Ruta Caverna 12: Completa con BETWEEN 10 AND 25\nSELECT nombre, capacidad \nFROM cuevas \nWHERE capacidad BETWEEN ;",
      tbls: ['cuevas'], hint: "BETWEEN incluye los extremos: WHERE capacidad BETWEEN 10 AND 25;",
      pos: { x: 74.0, y: 47.0 }, prereqs: [11], branch: 'easy' as const, branchLabel: '🟢 Caverna'
    },
    {
      lvl: 13, title: 'Ruta Caverna: Regiones (IN)',
      prompt: "[Ruta Caverna] Selecciona 'nombre' y 'region' de 'cuevas' donde region esté IN ('Valle Norte', 'Picos Altos').",
      expected: "SELECT nombre, region FROM cuevas WHERE region IN ('Valle Norte', 'Picos Altos');",
      initial: "-- Ruta Caverna 13: Usa el operador IN\nSELECT nombre, region \nFROM cuevas \nWHERE region IN ;",
      tbls: ['cuevas'], hint: "Usa: WHERE region IN ('Valle Norte', 'Picos Altos');",
      pos: { x: 78.0, y: 44.0 }, prereqs: [12], branch: 'easy' as const, branchLabel: '🟢 Caverna'
    },
    {
      lvl: 14, title: 'Ruta Caverna: Portal de la Gruta',
      prompt: "[Ruta Caverna] Selecciona 'nombre' y 'capacidad' de 'cuevas' ordenados por capacidad de menor a mayor (ORDER BY capacidad ASC).",
      expected: 'SELECT nombre, capacidad FROM cuevas ORDER BY capacidad ASC;',
      initial: "-- Ruta Caverna 14: Ordena de menor a mayor\nSELECT nombre, capacidad \nFROM cuevas \nORDER BY ;",
      tbls: ['cuevas'], hint: "Añade: ORDER BY capacidad ASC;",
      pos: { x: 83.0, y: 41.0 }, prereqs: [13], branch: 'easy' as const, branchLabel: '🟢 Caverna'
    },

    // BIFURCACIÓN DERECHA: RUTA MAMUT GLACIAR (15-20)
    {
      lvl: 15, title: 'Ruta Mamut: Gigantes del Hielo',
      prompt: "🔥 [Ruta Mamut] Selecciona 'apodo' y 'peso_toneladas' de 'mamuts' ordenados de mayor a menor peso (ORDER BY peso_toneladas DESC).",
      expected: 'SELECT apodo, peso_toneladas FROM mamuts ORDER BY peso_toneladas DESC;',
      initial: "-- Ruta Mamut 15: Ordena por peso_toneladas DESC\nSELECT apodo, peso_toneladas \nFROM mamuts \nORDER BY ;",
      tbls: ['mamuts'], hint: "Usa: ORDER BY peso_toneladas DESC;",
      pos: { x: 22.0, y: 56.0 }, prereqs: [10], branch: 'hard' as const, branchLabel: '🔴 Mamut Glaciar'
    },
    {
      lvl: 16, title: 'Ruta Mamut: Top 2 Colosos',
      prompt: "🔥 [Ruta Mamut] Selecciona 'apodo' y 'peso_toneladas' de 'mamuts' ORDER BY peso_toneladas DESC LIMIT 2.",
      expected: 'SELECT apodo, peso_toneladas FROM mamuts ORDER BY peso_toneladas DESC LIMIT 2;',
      initial: "-- Ruta Mamut 16: Top 2 colosos\nSELECT apodo, peso_toneladas \nFROM mamuts \nORDER BY \nLIMIT ;",
      tbls: ['mamuts'], hint: "Escribe: ORDER BY peso_toneladas DESC LIMIT 2;",
      pos: { x: 27.0, y: 53.0 }, prereqs: [15], branch: 'hard' as const, branchLabel: '🔴 Mamut Glaciar'
    },
    {
      lvl: 17, title: 'Ruta Mamut: Manadas Únicas',
      prompt: "🔥 [Ruta Mamut] Selecciona valores únicos con DISTINCT manada de 'mamuts' ordenados alfabéticamente (ORDER BY manada ASC).",
      expected: 'SELECT DISTINCT manada FROM mamuts ORDER BY manada ASC;',
      initial: "-- Ruta Mamut 17: DISTINCT manada\nSELECT DISTINCT \nFROM mamuts \nORDER BY manada ASC;",
      tbls: ['mamuts'], hint: "Escribe: SELECT DISTINCT manada FROM mamuts ORDER BY manada ASC;",
      pos: { x: 35.0, y: 49.0 }, prereqs: [16], branch: 'hard' as const, branchLabel: '🔴 Mamut Glaciar'
    },
    {
      lvl: 18, title: 'Ruta Mamut: Paginación Glaciar',
      prompt: "🔥 [Ruta Mamut] Selecciona 'apodo' y 'peso_toneladas' de 'mamuts' ORDER BY peso_toneladas ASC LIMIT 2 OFFSET 2;",
      expected: 'SELECT apodo, peso_toneladas FROM mamuts ORDER BY peso_toneladas ASC LIMIT 2 OFFSET 2;',
      initial: "-- Ruta Mamut 18: LIMIT 2 OFFSET 2\nSELECT apodo, peso_toneladas \nFROM mamuts \nORDER BY peso_toneladas ASC \nLIMIT 2 OFFSET ;",
      tbls: ['mamuts'], hint: "Usa: LIMIT 2 OFFSET 2;",
      pos: { x: 38.0, y: 44.0 }, prereqs: [17], branch: 'hard' as const, branchLabel: '🔴 Mamut Glaciar'
    },
    {
      lvl: 19, title: 'Ruta Mamut: Aproximación al Coloso',
      prompt: "¡Ante el santuario del Mamut! Selecciona 'apodo' y 'peligrosidad' de 'mamuts' donde peligrosidad = 'Extrema'.",
      expected: "SELECT apodo, peligrosidad FROM mamuts WHERE peligrosidad = 'Extrema';",
      initial: "-- Nivel 19: Filtra peligrosidad 'Extrema'\nSELECT apodo, peligrosidad \nFROM mamuts \nWHERE peligrosidad = ;",
      tbls: ['mamuts'], hint: "Escribe: WHERE peligrosidad = 'Extrema';",
      pos: { x: 31.0, y: 36.0 }, prereqs: [14, 18], branch: 'main' as const
    },
    {
      lvl: 20, title: 'Tótem Ancestral del Mamut',
      prompt: "👑 ¡JEFE DE ERA I! Selecciona 'recurso', 'tipo' y 'cantidad' de 'recursos_tribu' donde tipo = 'Armas' AND cantidad >= 14 ORDER BY cantidad DESC;",
      expected: "SELECT recurso, tipo, cantidad FROM recursos_tribu WHERE tipo = 'Armas' AND cantidad >= 14 ORDER BY cantidad DESC;",
      initial: "-- Nivel 20 JEFE: Combina WHERE con AND y ORDER BY\nSELECT recurso, tipo, cantidad \nFROM recursos_tribu \nWHERE tipo = 'Armas' AND \nORDER BY ;",
      tbls: ['recursos_tribu'], hint: "Usa: WHERE tipo = 'Armas' AND cantidad >= 14 ORDER BY cantidad DESC;",
      pos: { x: 22.0, y: 36.0 }, prereqs: [19], branch: 'main' as const
    }
  ];

  w1Config.forEach((cfg) => {
    const isBoss = cfg.lvl === 20;
    const isMystery = cfg.lvl === 5 || cfg.lvl === 12;
    const isHard = cfg.branch === 'hard';
    levels.push({
      levelNumber: cfg.lvl,
      worldNumber: 1,
      worldName: 'Reino de las Praderas',
      biome: 'plains',
      title: cfg.title,
      type: isBoss ? 'boss_fortress' : isMystery ? 'mystery_block' : 'standard',
      difficulty: isBoss ? 'Master Boss' : isHard ? 'Hard' : cfg.lvl <= 8 ? 'Easy' : 'Medium',
      branch: cfg.branch || 'main',
      branchLabel: cfg.branchLabel,
      prerequisites: cfg.prereqs,
      targetTables: cfg.tbls,
      prompt: cfg.prompt,
      initialQuery: cfg.initial,
      expectedQuery: cfg.expected,
      hints: [
        cfg.hint,
        `Tablas del objetivo: ${cfg.tbls.join(', ')}.`,
        `Estructura esperada: ${cfg.expected}`
      ],
      xpReward: isBoss ? 200 : isHard ? 65 : 25 + cfg.lvl * 2,
      coinReward: isBoss ? 80 : isHard ? 45 : 15,
      pedagogicalNote: `¡Nivel ${cfg.lvl} completado! Dominar proyecciones y filtros WHERE establece la base de la analítica SQL.`,
      position: cfg.pos
    });
  });

  // =========================================================================
  // MUNDO 2: CAÑÓN DE LAS DUNAS (Niveles 21 al 40) — Agregaciones y GROUP BY
  // =========================================================================
  const w2Titles = [
    { title: 'Censo de Clientes (COUNT)', prompt: 'Calcula el número total de clientes usando COUNT(*) AS total_customers de customers.', expected: 'SELECT COUNT(*) AS total_customers FROM customers;', initial: '-- Nivel 21: Calcula COUNT(*) AS total_customers\nSELECT \nFROM customers;', tbls: ['customers'] },
    { title: 'Ingresos Brutos (SUM)', prompt: 'Calcula la suma total facturada con SUM(total_amount) AS gross_sales de orders.', expected: 'SELECT SUM(total_amount) AS gross_sales FROM orders;', initial: '-- Nivel 22: Suma total_amount con SUM()\nSELECT \nFROM orders;', tbls: ['orders'] },
    { title: 'Precio Promedio (AVG)', prompt: 'Calcula el precio promedio redondeado: ROUND(AVG(price), 2) AS average_price de products.', expected: 'SELECT ROUND(AVG(price), 2) AS average_price FROM products;', initial: '-- Nivel 23: Calcula ROUND(AVG(price), 2)\nSELECT \nFROM products;', tbls: ['products'] },
    { title: 'Límites Extremos (MIN/MAX)', prompt: 'Selecciona MIN(price) AS lowest_price y MAX(price) AS highest_price de products.', expected: 'SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price FROM products;', initial: '-- Nivel 24: Extrae MIN(price) y MAX(price)\nSELECT \nFROM products;', tbls: ['products'] },
    { title: 'Volumen Completado Filtrado', prompt: "Calcula cuántas órdenes están completadas: COUNT(*) AS completed_count de orders donde status = 'completed'.", expected: "SELECT COUNT(*) AS completed_count FROM orders WHERE status = 'completed';", initial: "-- Nivel 25: Cuenta pedidos con status = 'completed'\nSELECT COUNT(*) AS completed_count \nFROM orders \nWHERE ;", tbls: ['orders'] },
    { title: 'Agrupación por País (GROUP BY)', prompt: 'Agrupa clientes por country y cuéntalos: country, COUNT(*) AS customer_count ordenado descendente.', expected: 'SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country ORDER BY customer_count DESC;', initial: '-- Nivel 26: Agrupa por country\nSELECT country, COUNT(*) AS customer_count \nFROM customers \nGROUP BY \nORDER BY customer_count DESC;', tbls: ['customers'] },
    { title: 'Resumen por Estado de Pedido', prompt: 'Cuenta pedidos agrupados por status: status, COUNT(*) AS orders_count.', expected: 'SELECT status, COUNT(*) AS orders_count FROM orders GROUP BY status;', initial: '-- Nivel 27: Agrupa pedidos por status\nSELECT status, COUNT(*) AS orders_count \nFROM orders \nGROUP BY ;', tbls: ['orders'] },
    { title: 'Ingresos por Estado', prompt: 'Calcula los ingresos agrupados por status: status, SUM(total_amount) AS status_revenue.', expected: 'SELECT status, SUM(total_amount) AS status_revenue FROM orders GROUP BY status ORDER BY status_revenue DESC;', initial: '-- Nivel 28: Suma total_amount por status\nSELECT status, SUM(total_amount) AS status_revenue \nFROM orders \nGROUP BY \nORDER BY status_revenue DESC;', tbls: ['orders'] },
    { title: 'Inventario por Categoría', prompt: 'Suma el stock_quantity por category_id: category_id, SUM(stock_quantity) AS total_inventory.', expected: 'SELECT category_id, SUM(stock_quantity) AS total_inventory FROM products GROUP BY category_id ORDER BY total_inventory DESC;', initial: '-- Nivel 29: Suma inventario por categoría\nSELECT category_id, SUM(stock_quantity) AS total_inventory \nFROM products \nGROUP BY \nORDER BY total_inventory DESC;', tbls: ['products'] },
    { title: 'Precio Promedio por Categoría', prompt: 'Calcula el promedio de precio por categoría: category_id, ROUND(AVG(price), 2) AS avg_price.', expected: 'SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id ORDER BY avg_price DESC;', initial: '-- Nivel 30: Promedia precios por category_id\nSELECT category_id, ROUND(AVG(price), 2) AS avg_price \nFROM products \nGROUP BY \nORDER BY avg_price DESC;', tbls: ['products'] },
    { title: 'Pedidos por Cliente', prompt: 'Cuenta los pedidos por cada cliente: customer_id, COUNT(*) AS total_orders.', expected: 'SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id ORDER BY total_orders DESC;', initial: '-- Nivel 31: Agrupa por customer_id\nSELECT customer_id, COUNT(*) AS total_orders \nFROM orders \nGROUP BY \nORDER BY total_orders DESC;', tbls: ['orders'] },
    { title: 'Gasto Total por Cliente', prompt: 'Calcula el gasto acumulado por cliente: customer_id, SUM(total_amount) AS total_spent.', expected: 'SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id ORDER BY total_spent DESC;', initial: '-- Nivel 32: Suma gasto por customer_id\nSELECT customer_id, SUM(total_amount) AS total_spent \nFROM orders \nGROUP BY \nORDER BY total_spent DESC;', tbls: ['orders'] },
    { title: 'Censo de Suscripciones por Plan', prompt: 'Cuenta suscriptores por plan: plan, COUNT(*) AS subscriber_count.', expected: 'SELECT plan, COUNT(*) AS subscriber_count FROM subscriptions GROUP BY plan ORDER BY subscriber_count DESC;', initial: '-- Nivel 33: Cuenta suscriptores por plan\nSELECT plan, COUNT(*) AS subscriber_count \nFROM subscriptions \nGROUP BY \nORDER BY subscriber_count DESC;', tbls: ['subscriptions'] },
    { title: 'Facturación Mensual MRR', prompt: 'Calcula los ingresos mensuales por plan: plan, SUM(monthly_cost) AS total_mrr.', expected: 'SELECT plan, SUM(monthly_cost) AS total_mrr FROM subscriptions GROUP BY plan ORDER BY total_mrr DESC;', initial: '-- Nivel 34: Suma monthly_cost por plan\nSELECT plan, SUM(monthly_cost) AS total_mrr \nFROM subscriptions \nGROUP BY \nORDER BY total_mrr DESC;', tbls: ['subscriptions'] },
    { title: 'Filtro sobre Grupos (HAVING)', prompt: 'Filtra clientes con más de 1 pedido: customer_id, COUNT(*) AS order_count HAVING COUNT(*) > 1.', expected: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY order_count DESC;', initial: '-- Nivel 35: Filtra grupos con HAVING COUNT(*) > 1\nSELECT customer_id, COUNT(*) AS order_count \nFROM orders \nGROUP BY customer_id \nHAVING \nORDER BY order_count DESC;', tbls: ['orders'] },
    { title: 'Umbral de Altos Compradores', prompt: 'Filtra clientes que gastaron más de 1000: customer_id, SUM(total_amount) AS total_spend HAVING SUM(total_amount) > 1000.', expected: 'SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 1000 ORDER BY total_spend DESC;', initial: '-- Nivel 36: Usa HAVING SUM(total_amount) > 1000\nSELECT customer_id, SUM(total_amount) AS total_spend \nFROM orders \nGROUP BY customer_id \nHAVING \nORDER BY total_spend DESC;', tbls: ['orders'] },
    { title: 'Auditoría de Métodos de Pago', prompt: 'Analiza pagos: payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum.', expected: 'SELECT payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum FROM payments GROUP BY payment_method ORDER BY settled_sum DESC;', initial: '-- Nivel 37: Agrupa pagos por payment_method\nSELECT payment_method, COUNT(*) AS tx_count, SUM(amount) AS settled_sum \nFROM payments \nGROUP BY \nORDER BY settled_sum DESC;', tbls: ['payments'] },
    { title: 'MRR de Suscriptores Activos', prompt: "Suma monthly_cost de suscriptores activos: plan, SUM(monthly_cost) AS active_mrr WHERE status = 'active' GROUP BY plan.", expected: "SELECT plan, SUM(monthly_cost) AS active_mrr FROM subscriptions WHERE status = 'active' GROUP BY plan ORDER BY active_mrr DESC;", initial: "-- Nivel 38: Combina WHERE status = 'active' con GROUP BY\nSELECT plan, SUM(monthly_cost) AS active_mrr \nFROM subscriptions \nWHERE status = 'active' \nGROUP BY \nORDER BY active_mrr DESC;", tbls: ['subscriptions'] },
    { title: 'Compradores Únicos Reales', prompt: 'Cuenta clientes únicos que han comprado: COUNT(DISTINCT customer_id) AS buying_customers de orders.', expected: 'SELECT COUNT(DISTINCT customer_id) AS buying_customers FROM orders;', initial: '-- Nivel 39: Cuenta clientes únicos con COUNT(DISTINCT ...)\nSELECT \nFROM orders;', tbls: ['orders'] },
    { title: 'Castillo del Jefe Mundo 2', prompt: "👑 Jefe #02: Selecciona customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;", expected: "SELECT customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent FROM orders WHERE status = 'completed' GROUP BY customer_id HAVING SUM(total_amount) > 1500 ORDER BY gross_spent DESC;", initial: "-- Nivel 40 JEFE: Combina WHERE, GROUP BY y HAVING\nSELECT customer_id, COUNT(*) AS completed_orders, SUM(total_amount) AS gross_spent \nFROM orders \nWHERE status = 'completed' \nGROUP BY customer_id \nHAVING \nORDER BY gross_spent DESC;", tbls: ['orders'] }
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
      initialQuery: item.initial,
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
    { title: 'El Primer Puente (INNER JOIN)', prompt: 'Conecta orders y customers: o.order_id, c.first_name, o.total_amount vinculados por customer_id.', expected: 'SELECT o.order_id, c.first_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', initial: '-- Nivel 41: Une orders y customers con INNER JOIN\nSELECT o.order_id, c.first_name, o.total_amount \nFROM orders o \nINNER JOIN customers c ON \nORDER BY o.order_id ASC;', tbls: ['orders', 'customers'] },
    { title: 'Enlace Producto y Categoría', prompt: 'Conecta products p y categories c: p.name, c.name AS category_name, p.price por category_id.', expected: 'SELECT p.name, c.name AS category_name, p.price FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.price DESC;', initial: '-- Nivel 42: Une products con categories\nSELECT p.name, c.name AS category_name, p.price \nFROM products p \nINNER JOIN categories c ON \nORDER BY p.price DESC;', tbls: ['products', 'categories'] },
    { title: 'Correo y Pedidos', prompt: 'Conecta orders o y customers c: o.order_id, c.email, o.status.', expected: 'SELECT o.order_id, c.email, o.status FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;', initial: '-- Nivel 43: Vincula orders con email de clientes\nSELECT o.order_id, c.email, o.status \nFROM orders o \nINNER JOIN customers c ON \nORDER BY o.order_id ASC;', tbls: ['orders', 'customers'] },
    { title: 'Detalle de Líneas de Ítems', prompt: 'Conecta order_items oi y products p: oi.order_id, p.name, oi.quantity, oi.unit_price.', expected: 'SELECT oi.order_id, p.name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.item_id ASC;', initial: '-- Nivel 44: Une order_items y products por product_id\nSELECT oi.order_id, p.name, oi.quantity, oi.unit_price \nFROM order_items oi \nINNER JOIN products p ON \nORDER BY oi.item_id ASC;', tbls: ['order_items', 'products'] },
    { title: 'Liquidación de Pagos', prompt: 'Conecta payments p y orders o: p.payment_id, o.order_id, p.payment_method, p.amount.', expected: 'SELECT p.payment_id, o.order_id, p.payment_method, p.amount FROM payments p INNER JOIN orders o ON p.order_id = o.order_id ORDER BY p.payment_id ASC;', initial: '-- Nivel 45: Une payments y orders por order_id\nSELECT p.payment_id, o.order_id, p.payment_method, p.amount \nFROM payments p \nINNER JOIN orders o ON \nORDER BY p.payment_id ASC;', tbls: ['payments', 'orders'] },
    { title: 'Unión Izquierda (LEFT JOIN)', prompt: 'Incluye clientes sin pedidos con LEFT JOIN: c.customer_id, c.first_name, o.order_id.', expected: 'SELECT c.customer_id, c.first_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id ASC, o.order_id ASC;', initial: '-- Nivel 46: Aplica LEFT JOIN para no descartar clientes sin pedidos\nSELECT c.customer_id, c.first_name, o.order_id \nFROM customers c \nLEFT JOIN orders o ON \nORDER BY c.customer_id ASC, o.order_id ASC;', tbls: ['customers', 'orders'] },
    { title: 'Clientes sin Compras (Anti-Join)', prompt: 'Encuentra clientes que nunca han comprado con LEFT JOIN y WHERE o.order_id IS NULL: c.customer_id, c.first_name, c.country.', expected: 'SELECT c.customer_id, c.first_name, c.country FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL ORDER BY c.customer_id ASC;', initial: '-- Nivel 47: Anti-Join con LEFT JOIN y WHERE o.order_id IS NULL\nSELECT c.customer_id, c.first_name, c.country \nFROM customers c \nLEFT JOIN orders o ON c.customer_id = o.customer_id \nWHERE \nORDER BY c.customer_id ASC;', tbls: ['customers', 'orders'] },
    { title: 'Ingresos por Departamento', prompt: 'Conecta categories c, products p y order_items oi: c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales.', expected: 'SELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY dept_sales DESC;', initial: '-- Nivel 48: Triple JOIN para calcular ventas por departamento\nSELECT c.department, SUM(oi.quantity * oi.unit_price) AS dept_sales \nFROM categories c \nINNER JOIN products p ON c.category_id = p.category_id \nINNER JOIN order_items oi ON \nGROUP BY c.department \nORDER BY dept_sales DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Volumen de Órdenes por Ciudad', prompt: 'Cuenta pedidos por ciudad: c.city, COUNT(o.order_id) AS total_orders conectando customers c y orders o.', expected: 'SELECT c.city, COUNT(o.order_id) AS total_orders FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.city ORDER BY total_orders DESC;', initial: '-- Nivel 49: Une customers y orders y agrupa por c.city\nSELECT c.city, COUNT(o.order_id) AS total_orders \nFROM customers c \nINNER JOIN orders o ON \nGROUP BY c.city \nORDER BY total_orders DESC;', tbls: ['customers', 'orders'] },
    { title: 'Esquema Estrella Triple', prompt: 'Conecta customers c, orders o y payments p: c.first_name, o.order_id, p.payment_method, p.amount.', expected: 'SELECT c.first_name, o.order_id, p.payment_method, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id ORDER BY o.order_id ASC;', initial: '-- Nivel 50: Conecta 3 tablas centrales\nSELECT c.first_name, o.order_id, p.payment_method, p.amount \nFROM customers c \nINNER JOIN orders o ON \nINNER JOIN payments p ON \nORDER BY o.order_id ASC;', tbls: ['customers', 'orders', 'payments'] },
    { title: 'Relación Clientes y Suscripciones', prompt: 'Conecta customers c y subscriptions s: c.first_name, s.plan, s.monthly_cost.', expected: 'SELECT c.first_name, s.plan, s.monthly_cost FROM customers c INNER JOIN subscriptions s ON c.customer_id = s.customer_id ORDER BY s.monthly_cost DESC;', initial: '-- Nivel 51: Une customers y subscriptions por customer_id\nSELECT c.first_name, s.plan, s.monthly_cost \nFROM customers c \nINNER JOIN subscriptions s ON \nORDER BY s.monthly_cost DESC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Top Productos Más Vendidos', prompt: 'Conecta products p y order_items oi: p.name, SUM(oi.quantity) AS units_sold GROUP BY p.name LIMIT 5.', expected: 'SELECT p.name, SUM(oi.quantity) AS units_sold FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY units_sold DESC LIMIT 5;', initial: '-- Nivel 52: Une products y order_items y calcula el top 5 de unidades vendidas\nSELECT p.name, SUM(oi.quantity) AS units_sold \nFROM products p \nINNER JOIN order_items oi ON \nGROUP BY p.name \nORDER BY units_sold DESC \nLIMIT 5;', tbls: ['products', 'order_items'] },
    { title: 'Facturación por Línea de Producto', prompt: 'Calcula ingresos por producto: p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue.', expected: 'SELECT p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue FROM products p INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY product_revenue DESC LIMIT 5;', initial: '-- Nivel 53: Multiplica cantidad por precio unitario\nSELECT p.name, SUM(oi.quantity * oi.unit_price) AS product_revenue \nFROM products p \nINNER JOIN order_items oi ON \nGROUP BY p.name \nORDER BY product_revenue DESC \nLIMIT 5;', tbls: ['products', 'order_items'] },
    { title: 'Catálogo de SKUs por Categoría', prompt: 'Cuenta productos por categoría: c.name, COUNT(p.product_id) AS sku_count.', expected: 'SELECT c.name, COUNT(p.product_id) AS sku_count FROM categories c INNER JOIN products p ON c.category_id = p.category_id GROUP BY c.name ORDER BY sku_count DESC;', initial: '-- Nivel 54: Une categories y products por category_id\nSELECT c.name, COUNT(p.product_id) AS sku_count \nFROM categories c \nINNER JOIN products p ON \nGROUP BY c.name \nORDER BY sku_count DESC;', tbls: ['categories', 'products'] },
    { title: 'Facturación por País de Origen', prompt: 'Calcula ingresos por país: c.country, SUM(o.total_amount) AS country_revenue.', expected: 'SELECT c.country, SUM(o.total_amount) AS country_revenue FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.country ORDER BY country_revenue DESC;', initial: '-- Nivel 55: Agrupa por país del cliente y suma total_amount\nSELECT c.country, SUM(o.total_amount) AS country_revenue \nFROM customers c \nINNER JOIN orders o ON \nGROUP BY c.country \nORDER BY country_revenue DESC;', tbls: ['customers', 'orders'] },
    { title: 'Rastro de Pagos Rechazados', prompt: "Detecta pagos declinados con clientes: c.first_name, o.order_id, p.amount WHERE p.status = 'declined'.", expected: "SELECT c.first_name, o.order_id, p.amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN payments p ON o.order_id = p.order_id WHERE p.status = 'declined';", initial: "-- Nivel 56: Une 3 tablas y filtra con WHERE p.status = 'declined'\nSELECT c.first_name, o.order_id, p.amount \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nINNER JOIN payments p ON o.order_id = p.order_id \nWHERE ;", tbls: ['customers', 'orders', 'payments'] },
    { title: 'Compradores No Suscritos', prompt: 'Encuentra clientes sin plan de suscripción con LEFT JOIN y WHERE s.subscription_id IS NULL: c.customer_id, c.first_name.', expected: 'SELECT c.customer_id, c.first_name FROM customers c LEFT JOIN subscriptions s ON c.customer_id = s.customer_id WHERE s.subscription_id IS NULL ORDER BY c.customer_id ASC;', initial: '-- Nivel 57: Clientes sin suscripción con LEFT JOIN\nSELECT c.customer_id, c.first_name \nFROM customers c \nLEFT JOIN subscriptions s ON c.customer_id = s.customer_id \nWHERE \nORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Ticket Promedio por Nivel de Plan', prompt: 'Calcula el ticket promedio según el plan: s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val.', expected: 'SELECT s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val FROM subscriptions s INNER JOIN orders o ON s.customer_id = o.customer_id GROUP BY s.plan ORDER BY avg_order_val DESC;', initial: '-- Nivel 58: Une subscriptions con orders y agrupa por plan\nSELECT s.plan, ROUND(AVG(o.total_amount), 2) AS avg_order_val \nFROM subscriptions s \nINNER JOIN orders o ON \nGROUP BY s.plan \nORDER BY avg_order_val DESC;', tbls: ['subscriptions', 'orders'] },
    { title: 'Unidades Promedio por Departamento', prompt: 'Calcula unidades promedio por compra en cada departamento: c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty.', expected: 'SELECT c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department ORDER BY avg_qty DESC;', initial: '-- Nivel 59: Conecta categories, products y order_items\nSELECT c.department, ROUND(AVG(oi.quantity), 2) AS avg_qty \nFROM categories c \nINNER JOIN products p ON c.category_id = p.category_id \nINNER JOIN order_items oi ON \nGROUP BY c.department \nORDER BY avg_qty DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Castillo del Jefe Mundo 3', prompt: '👑 Jefe #03: Conecta las 5 tablas relacionales y filtra clientes con gasto mayor a 1000 en departamentos.', expected: 'SELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY c.first_name, cat.department HAVING spend > 1000 ORDER BY spend DESC;', initial: '-- Nivel 60 JEFE: Conecta customers, orders, order_items, products y categories\nSELECT c.first_name, cat.department, SUM(oi.quantity * oi.unit_price) AS spend \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nINNER JOIN order_items oi ON o.order_id = oi.order_id \nINNER JOIN products p ON oi.product_id = p.product_id \nINNER JOIN categories cat ON p.category_id = cat.category_id \nGROUP BY c.first_name, cat.department \nHAVING \nORDER BY spend DESC;', tbls: ['customers', 'orders', 'order_items', 'products', 'categories'] }
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
      initialQuery: item.initial,
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
    { title: 'Bifurcación Binaria (CASE)', prompt: "Clasifica precios con CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class de products.", expected: "SELECT name, price, CASE WHEN price >= 500 THEN 'Expensive' ELSE 'Affordable' END AS price_class FROM products ORDER BY price DESC;", initial: "-- Nivel 61: Clasifica precios con CASE WHEN\nSELECT name, price, \n  CASE WHEN price >= 500 THEN 'Expensive' \n  ELSE 'Affordable' \n  END AS price_class \nFROM products \nORDER BY price DESC;", tbls: ['products'] },
    { title: 'Segmentación en Tres Niveles', prompt: "Segmenta precios en Budget, Mid-Tier y Premium con CASE.", expected: "SELECT name, price, CASE WHEN price < 200 THEN 'Budget' WHEN price < 1000 THEN 'Mid-Tier' ELSE 'Premium' END AS tier FROM products ORDER BY price ASC;", initial: "-- Nivel 62: Segmenta en tres categorías con WHEN\nSELECT name, price, \n  CASE \n    WHEN price < 200 THEN 'Budget' \n    WHEN price < 1000 THEN 'Mid-Tier' \n    ELSE 'Premium' \n  END AS tier \nFROM products \nORDER BY price ASC;", tbls: ['products'] },
    { title: 'Normalización de Estados', prompt: "Etiqueta órdenes: CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state.", expected: "SELECT order_id, total_amount, CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state FROM orders ORDER BY order_id ASC;", initial: "-- Nivel 63: Etiqueta pedidos completados como 'Settled'\nSELECT order_id, total_amount, \n  CASE WHEN status = 'completed' THEN 'Settled' ELSE 'Unsettled' END AS settlement_state \nFROM orders \nORDER BY order_id ASC;", tbls: ['orders'] },
    { title: 'Longitud de Texto (LENGTH)', prompt: 'Calcula caracteres de nombres: LENGTH(name) AS name_char_count de products.', expected: 'SELECT name, LENGTH(name) AS name_char_count FROM products ORDER BY name_char_count DESC;', initial: '-- Nivel 64: Mide la longitud del nombre con LENGTH()\nSELECT name, \nFROM products \nORDER BY name_char_count DESC;', tbls: ['products'] },
    { title: 'Transformación UPPER y LOWER', prompt: 'Limpia texto: UPPER(first_name) AS loud_name, LOWER(email) AS clean_email.', expected: 'SELECT UPPER(first_name) AS loud_name, LOWER(email) AS clean_email FROM customers ORDER BY loud_name ASC;', initial: '-- Nivel 65: Transforma con UPPER() y LOWER()\nSELECT UPPER(first_name) AS loud_name, \nFROM customers \nORDER BY loud_name ASC;', tbls: ['customers'] },
    { title: 'Extracción de Año (SUBSTR)', prompt: 'Extrae el año YYYY: SUBSTR(order_date, 1, 4) AS order_year.', expected: 'SELECT order_id, SUBSTR(order_date, 1, 4) AS order_year FROM orders ORDER BY order_id ASC;', initial: '-- Nivel 66: Extrae los primeros 4 dígitos de la fecha con SUBSTR()\nSELECT order_id, \nFROM orders \nORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Extracción de Mes (SUBSTR)', prompt: 'Extrae el año y mes YYYY-MM: SUBSTR(order_date, 1, 7) AS order_month.', expected: 'SELECT order_id, SUBSTR(order_date, 1, 7) AS order_month FROM orders ORDER BY order_id ASC;', initial: '-- Nivel 67: Extrae los primeros 7 caracteres con SUBSTR()\nSELECT order_id, \nFROM orders \nORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Cohorte de Ingresos Mensuales', prompt: 'Agrupa por mes de orden: SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue.', expected: 'SELECT SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue FROM orders GROUP BY month ORDER BY month ASC;', initial: '-- Nivel 68: Agrupa por mes extraído\nSELECT SUBSTR(order_date, 1, 7) AS month, SUM(total_amount) AS revenue \nFROM orders \nGROUP BY month \nORDER BY month ASC;', tbls: ['orders'] },
    { title: 'Reemplazo de Nulos (COALESCE)', prompt: "Reemplaza nulos por texto: COALESCE(cancel_date, 'Active Plan') AS plan_state de subscriptions.", expected: "SELECT subscription_id, COALESCE(cancel_date, 'Active Plan') AS plan_state FROM subscriptions ORDER BY subscription_id ASC;", initial: "-- Nivel 69: Reemplaza valores nulos con COALESCE()\nSELECT subscription_id, COALESCE(cancel_date, 'Active Plan') AS plan_state \nFROM subscriptions \nORDER BY subscription_id ASC;", tbls: ['subscriptions'] },
    { title: 'Filtro con Subconsulta Escalar', prompt: 'Productos más caros que el promedio: WHERE price > (SELECT AVG(price) FROM products).', expected: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC;', initial: '-- Nivel 70: Subconsulta escalar para comparar con el promedio\nSELECT name, price \nFROM products \nWHERE price > (SELECT AVG(price) FROM products) \nORDER BY price DESC;', tbls: ['products'] },
    { title: 'Subconsulta con Fecha Máxima', prompt: 'Órdenes de la fecha más reciente: WHERE order_date = (SELECT MAX(order_date) FROM orders).', expected: 'SELECT order_id, customer_id, order_date FROM orders WHERE order_date = (SELECT MAX(order_date) FROM orders);', initial: '-- Nivel 71: Filtra por la fecha máxima con subconsulta\nSELECT order_id, customer_id, order_date \nFROM orders \nWHERE order_date = (SELECT MAX(order_date) FROM orders);', tbls: ['orders'] },
    { title: 'Subconsulta con WHERE IN', prompt: "Clientes con compras completadas: customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed').", expected: "SELECT first_name, email FROM customers WHERE customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed') ORDER BY first_name ASC;", initial: "-- Nivel 72: Subconsulta con IN\nSELECT first_name, email \nFROM customers \nWHERE customer_id IN (SELECT customer_id FROM orders WHERE status = 'completed') \nORDER BY first_name ASC;", tbls: ['customers', 'orders'] },
    { title: 'Subconsulta con WHERE NOT IN', prompt: 'Clientes sin ningún pedido: customer_id NOT IN (SELECT customer_id FROM orders).', expected: 'SELECT first_name, country FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders) ORDER BY first_name ASC;', initial: '-- Nivel 73: Anti-filtro con NOT IN\nSELECT first_name, country \nFROM customers \nWHERE customer_id NOT IN (SELECT customer_id FROM orders) \nORDER BY first_name ASC;', tbls: ['customers', 'orders'] },
    { title: 'Subconsulta en Proyección SELECT', prompt: 'Diferencia de precio frente al promedio en cada fila: ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean.', expected: 'SELECT name, price, ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean FROM products ORDER BY diff_from_mean DESC;', initial: '-- Nivel 74: Subconsulta dentro de la cláusula SELECT\nSELECT name, price, \n  ROUND(price - (SELECT AVG(price) FROM products), 2) AS diff_from_mean \nFROM products \nORDER BY diff_from_mean DESC;', tbls: ['products'] },
    { title: 'Filtro de Existencia (EXISTS)', prompt: 'Clientes con suscripción usando EXISTS: WHERE EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id).', expected: 'SELECT c.customer_id, c.first_name FROM customers c WHERE EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', initial: '-- Nivel 75: Filtro con EXISTS correlacionado\nSELECT c.customer_id, c.first_name \nFROM customers c \nWHERE EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) \nORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Inexistencia con NOT EXISTS', prompt: 'Clientes sin suscripción usando NOT EXISTS.', expected: 'SELECT c.customer_id, c.first_name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) ORDER BY c.customer_id ASC;', initial: '-- Nivel 76: Filtro con NOT EXISTS\nSELECT c.customer_id, c.first_name \nFROM customers c \nWHERE NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.customer_id = c.customer_id) \nORDER BY c.customer_id ASC;', tbls: ['customers', 'subscriptions'] },
    { title: 'Agregación Condicional (SUM CASE)', prompt: "Suma condicional: SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders.", expected: "SELECT COUNT(*) AS total_orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders FROM orders;", initial: "-- Nivel 77: Cuenta pedidos completados sumando con CASE\nSELECT COUNT(*) AS total_orders, \n  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders \nFROM orders;", tbls: ['orders'] },
    { title: 'Pivote de Canales de Pago', prompt: "Calcula volúmenes por método con CASE: SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume.", expected: "SELECT SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume, SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_volume FROM payments;", initial: "-- Nivel 78: Pivota montos de tarjetas y paypal\nSELECT \n  SUM(CASE WHEN payment_method = 'credit_card' THEN amount ELSE 0 END) AS cc_volume, \n  SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) AS paypal_volume \nFROM payments;", tbls: ['payments'] },
    { title: 'Comparación con Promedio General', prompt: 'Pedidos con monto superior a la media: WHERE total_amount > (SELECT AVG(total_amount) FROM orders).', expected: 'SELECT customer_id, total_amount FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;', initial: '-- Nivel 79: Filtra pedidos por encima de la media con subconsulta\nSELECT customer_id, total_amount \nFROM orders \nWHERE total_amount > (SELECT AVG(total_amount) FROM orders) \nORDER BY total_amount DESC;', tbls: ['orders'] },
    { title: 'Castillo del Jefe Mundo 4', prompt: "👑 Jefe #04: Etiqueta productos según superen o no la media con CASE y subconsulta.", expected: "SELECT name, price, CASE WHEN price > (SELECT AVG(price) FROM products) THEN 'Above Average' ELSE 'Below Average' END AS benchmark_tag FROM products ORDER BY price DESC;", initial: "-- Nivel 80 JEFE: Combina CASE con subconsulta AVG()\nSELECT name, price, \n  CASE WHEN price > (SELECT AVG(price) FROM products) THEN 'Above Average' ELSE 'Below Average' END AS benchmark_tag \nFROM products \nORDER BY price DESC;", tbls: ['products'] }
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
      initialQuery: item.initial,
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
    { title: 'Primer Pipeline con CTE (WITH)', prompt: 'Define un CTE para gastos de clientes con WITH spending AS (...) y filtra total_spent > 1000.', expected: 'WITH spending AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT * FROM spending WHERE total_spent > 1000 ORDER BY total_spent DESC;', initial: '-- Nivel 81: Define tu primer CTE con WITH\nWITH spending AS (\n  SELECT customer_id, SUM(total_amount) AS total_spent \n  FROM orders \n  GROUP BY customer_id\n)\nSELECT * \nFROM spending \nWHERE total_spent > 1000 \nORDER BY total_spent DESC;', tbls: ['orders'] },
    { title: 'CTE con Unión Posterior', prompt: 'Une clientes con el resumen del CTE: c.first_name, ot.orders_count.', expected: 'WITH order_totals AS (SELECT customer_id, COUNT(*) AS orders_count FROM orders GROUP BY customer_id) SELECT c.first_name, ot.orders_count FROM customers c INNER JOIN order_totals ot ON c.customer_id = ot.customer_id ORDER BY ot.orders_count DESC;', initial: '-- Nivel 82: Conecta un CTE con la tabla customers\nWITH order_totals AS (\n  SELECT customer_id, COUNT(*) AS orders_count \n  FROM orders \n  GROUP BY customer_id\n)\nSELECT c.first_name, ot.orders_count \nFROM customers c \nINNER JOIN order_totals ot ON c.customer_id = ot.customer_id \nORDER BY ot.orders_count DESC;', tbls: ['customers', 'orders'] },
    { title: 'CTEs Encadenados Múltiples', prompt: 'Encadena dos CTEs separados por coma: WITH active_subs AS (...), total_orders AS (...).', expected: "WITH active_subs AS (SELECT customer_id, monthly_cost FROM subscriptions WHERE status = 'active'), total_orders AS (SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id) SELECT a.customer_id, a.monthly_cost, t.spend FROM active_subs a INNER JOIN total_orders t ON a.customer_id = t.customer_id ORDER BY t.spend DESC;", initial: "-- Nivel 83: Encadena 2 CTEs\nWITH active_subs AS (\n  SELECT customer_id, monthly_cost FROM subscriptions WHERE status = 'active'\n),\ntotal_orders AS (\n  SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id\n)\nSELECT a.customer_id, a.monthly_cost, t.spend \nFROM active_subs a \nINNER JOIN total_orders t ON a.customer_id = t.customer_id \nORDER BY t.spend DESC;", tbls: ['subscriptions', 'orders'] },
    { title: 'Resumen Categórico en CTE', prompt: 'Calcula ingresos por SKU en CTE y selecciona el Top 5 con LIMIT 5.', expected: 'WITH sku_rev AS (SELECT product_id, SUM(quantity * unit_price) AS rev FROM order_items GROUP BY product_id) SELECT p.name, sr.rev FROM products p INNER JOIN sku_rev sr ON p.product_id = sr.product_id ORDER BY sr.rev DESC LIMIT 5;', initial: '-- Nivel 84: Agregación en CTE y unión final\nWITH sku_rev AS (\n  SELECT product_id, SUM(quantity * unit_price) AS rev \n  FROM order_items \n  GROUP BY product_id\n)\nSELECT p.name, sr.rev \nFROM products p \nINNER JOIN sku_rev sr ON p.product_id = sr.product_id \nORDER BY sr.rev DESC \nLIMIT 5;', tbls: ['order_items', 'products'] },
    { title: 'Ranking con ROW_NUMBER', prompt: 'Numera órdenes de mayor a menor gasto: ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank.', expected: 'SELECT order_id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank FROM orders ORDER BY spend_rank ASC;', initial: '-- Nivel 85: Función Ventana ROW_NUMBER()\nSELECT order_id, total_amount, \n  ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS spend_rank \nFROM orders \nORDER BY spend_rank ASC;', tbls: ['orders'] },
    { title: 'Partición por Cliente (PARTITION BY)', prompt: 'Numera pedidos dentro de cada cliente: ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank.', expected: 'SELECT order_id, customer_id, total_amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank FROM orders ORDER BY customer_id ASC, customer_rank ASC;', initial: '-- Nivel 86: Agrega PARTITION BY a la ventana\nSELECT order_id, customer_id, total_amount, \n  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank \nFROM orders \nORDER BY customer_id ASC, customer_rank ASC;', tbls: ['orders'] },
    { title: 'Desempates con RANK', prompt: 'Rankea productos por precio con RANK(): RANK() OVER (ORDER BY price DESC) AS price_rank.', expected: 'SELECT product_id, name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products ORDER BY price_rank ASC;', initial: '-- Nivel 87: Función Ventana RANK()\nSELECT product_id, name, price, \n  RANK() OVER (ORDER BY price DESC) AS price_rank \nFROM products \nORDER BY price_rank ASC;', tbls: ['products'] },
    { title: 'Rankings Densos con DENSE_RANK', prompt: 'Rankea densamente por categoría: DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank.', expected: 'SELECT product_id, category_id, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank FROM products ORDER BY category_id ASC, category_price_rank ASC;', initial: '-- Nivel 88: Función Ventana DENSE_RANK()\nSELECT product_id, category_id, price, \n  DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS category_price_rank \nFROM products \nORDER BY category_id ASC, category_price_rank ASC;', tbls: ['products'] },
    { title: 'Paso Temporal con LAG', prompt: 'Obtén el monto de la orden anterior: LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount.', expected: 'SELECT order_id, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount FROM orders ORDER BY order_id ASC;', initial: '-- Nivel 89: Mira la fila anterior con LAG()\nSELECT order_id, total_amount, \n  LAG(total_amount, 1) OVER (ORDER BY order_id ASC) AS previous_order_amount \nFROM orders \nORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Mirada al Futuro con LEAD', prompt: 'Obtén el monto de la siguiente orden: LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount.', expected: 'SELECT order_id, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount FROM orders ORDER BY order_id ASC;', initial: '-- Nivel 90: Mira la fila siguiente con LEAD()\nSELECT order_id, total_amount, \n  LEAD(total_amount, 1) OVER (ORDER BY order_id ASC) AS next_order_amount \nFROM orders \nORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Suma Acumulada Móvil (Running Total)', prompt: 'Calcula el gasto acumulado en el tiempo: SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend.', expected: 'SELECT order_id, customer_id, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend FROM orders ORDER BY customer_id ASC, order_id ASC;', initial: '-- Nivel 91: Suma móvil acumulada con ventana\nSELECT order_id, customer_id, total_amount, \n  SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_id ASC) AS running_customer_spend \nFROM orders \nORDER BY customer_id ASC, order_id ASC;', tbls: ['orders'] },
    { title: 'Primer Valor en Ventana (FIRST_VALUE)', prompt: 'Obtén el monto de la primera orden de cada cliente: FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount.', expected: 'SELECT order_id, customer_id, total_amount, FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount FROM orders ORDER BY customer_id ASC, order_id ASC;', initial: '-- Nivel 92: Obtén el valor inicial con FIRST_VALUE()\nSELECT order_id, customer_id, total_amount, \n  FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS first_order_amount \nFROM orders \nORDER BY customer_id ASC, order_id ASC;', tbls: ['orders'] },
    { title: 'Ranking de Precios por Departamento', prompt: 'Rankea productos en cada departamento: ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank.', expected: 'SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank FROM categories c INNER JOIN products p ON c.category_id = p.category_id ORDER BY c.department ASC, dept_rank ASC;', initial: '-- Nivel 93: Ventana sobre tablas unidas\nSELECT c.department, p.name, p.price, \n  ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS dept_rank \nFROM categories c \nINNER JOIN products p ON c.category_id = p.category_id \nORDER BY c.department ASC, dept_rank ASC;', tbls: ['categories', 'products'] },
    { title: 'Artículo #1 por Cada Departamento', prompt: 'Filtra el producto top de cada departamento con CTE y WHERE rnk = 1.', expected: 'WITH ranked AS (SELECT c.department, p.name, p.price, ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS rnk FROM categories c INNER JOIN products p ON c.category_id = p.category_id) SELECT department, name, price FROM ranked WHERE rnk = 1 ORDER BY price DESC;', initial: '-- Nivel 94: Filtra el ranking 1 dentro de un CTE\nWITH ranked AS (\n  SELECT c.department, p.name, p.price, \n    ROW_NUMBER() OVER (PARTITION BY c.department ORDER BY p.price DESC) AS rnk \n  FROM categories c \n  INNER JOIN products p ON c.category_id = p.category_id\n)\nSELECT department, name, price \nFROM ranked \nWHERE rnk = 1 \nORDER BY price DESC;', tbls: ['categories', 'products'] },
    { title: 'Diferencial de Crecimiento MoM', prompt: 'Calcula el cambio de valor frente a la orden previa: ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta.', expected: 'SELECT order_id, total_amount, ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta FROM orders ORDER BY order_id ASC;', initial: '-- Nivel 95: Resta la orden actual con LAG()\nSELECT order_id, total_amount, \n  ROUND(total_amount - LAG(total_amount, 1, total_amount) OVER (ORDER BY order_id ASC), 2) AS spend_delta \nFROM orders \nORDER BY order_id ASC;', tbls: ['orders'] },
    { title: 'Top 3 Gastadores con Ventana', prompt: 'Filtra el podio de clientes con mayor gasto usando DENSE_RANK() dentro de un CTE: WHERE spender_rank <= 3.', expected: 'WITH ranked_cust AS (SELECT customer_id, SUM(total_amount) AS spent, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spender_rank FROM orders GROUP BY customer_id) SELECT customer_id, spent, spender_rank FROM ranked_cust WHERE spender_rank <= 3;', initial: '-- Nivel 96: Top 3 clientes gastadores con CTE y DENSE_RANK\nWITH ranked_cust AS (\n  SELECT customer_id, SUM(total_amount) AS spent, \n    DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spender_rank \n  FROM orders \n  GROUP BY customer_id\n)\nSELECT customer_id, spent, spender_rank \nFROM ranked_cust \nWHERE spender_rank <= 3;', tbls: ['orders'] },
    { title: 'Participación Global de Ventas (%)', prompt: 'Calcula el porcentaje de ventas que representa cada departamento con un CTE.', expected: 'WITH dept_sales AS (SELECT c.department, SUM(oi.quantity * oi.unit_price) AS sales FROM categories c INNER JOIN products p ON c.category_id = p.category_id INNER JOIN order_items oi ON p.product_id = oi.product_id GROUP BY c.department) SELECT department, sales, ROUND(sales * 100.0 / (SELECT SUM(sales) FROM dept_sales), 2) AS pct_share FROM dept_sales ORDER BY sales DESC;', initial: '-- Nivel 97: Calcula el porcentaje de ventas de cada departamento\nWITH dept_sales AS (\n  SELECT c.department, SUM(oi.quantity * oi.unit_price) AS sales \n  FROM categories c \n  INNER JOIN products p ON c.category_id = p.category_id \n  INNER JOIN order_items oi ON p.product_id = oi.product_id \n  GROUP BY c.department\n)\nSELECT department, sales, \n  ROUND(sales * 100.0 / (SELECT SUM(sales) FROM dept_sales), 2) AS pct_share \nFROM dept_sales \nORDER BY sales DESC;', tbls: ['categories', 'products', 'order_items'] },
    { title: 'Métricas de Confiabilidad de Pagos', prompt: 'Rankea métodos de pago aprobados por volumen con CTE: DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank.', expected: "WITH p_stats AS (SELECT payment_method, COUNT(*) AS txs, SUM(amount) AS vol FROM payments WHERE status = 'approved' GROUP BY payment_method) SELECT payment_method, txs, vol, DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank FROM p_stats;", initial: "-- Nivel 98: Filtra status = 'approved' en CTE y rankea volumen\nWITH p_stats AS (\n  SELECT payment_method, COUNT(*) AS txs, SUM(amount) AS vol \n  FROM payments \n  WHERE status = 'approved' \n  GROUP BY payment_method\n)\nSELECT payment_method, txs, vol, \n  DENSE_RANK() OVER (ORDER BY vol DESC) AS vol_rank \nFROM p_stats;", tbls: ['payments'] },
    { title: 'La Puerta ante el Dragón', prompt: 'Calcula ventas mensuales y compara con el mes previo usando LAG en un CTE: LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev.', expected: 'WITH monthly_kpi AS (SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY month) SELECT month, total_orders, monthly_revenue, LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev FROM monthly_kpi ORDER BY month ASC;', initial: '-- Nivel 99: Crecimiento mensual con LAG()\nWITH monthly_kpi AS (\n  SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue \n  FROM orders \n  GROUP BY month\n)\nSELECT month, total_orders, monthly_revenue, \n  LAG(monthly_revenue, 1) OVER (ORDER BY month ASC) AS prev_month_rev \nFROM monthly_kpi \nORDER BY month ASC;', tbls: ['orders'] },
    { title: 'Ciudadela de Bowser: Gran Jefe Final', prompt: '👑 Jefe Supremo #100: Calcula el KPI de cliente (LTV, total de órdenes y rango) y selecciona el Top 5 con DENSE_RANK() en un CTE.', expected: 'WITH customer_kpi AS (SELECT c.customer_id, c.first_name, c.country, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS lifetime_value, DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS ltv_rank FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.country) SELECT customer_id, first_name, country, total_orders, lifetime_value, ltv_rank FROM customer_kpi WHERE ltv_rank <= 5 ORDER BY ltv_rank ASC;', initial: '-- Nivel 100 GRAN JEFE: Pipeline completo de LTV por cliente\nWITH customer_kpi AS (\n  SELECT c.customer_id, c.first_name, c.country, \n    COUNT(o.order_id) AS total_orders, \n    SUM(o.total_amount) AS lifetime_value, \n    DENSE_RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS ltv_rank \n  FROM customers c \n  INNER JOIN orders o ON c.customer_id = o.customer_id \n  GROUP BY c.customer_id, c.first_name, c.country\n)\nSELECT customer_id, first_name, country, total_orders, lifetime_value, ltv_rank \nFROM customer_kpi \nWHERE ltv_rank <= 5 \nORDER BY ltv_rank ASC;', tbls: ['customers', 'orders'] }
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
      initialQuery: item.initial,
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
