# LEARN-LAB — DOCUMENTO DE CONTENIDO Y NARRATIVA
## Documento Maestro: 02_CONTENIDO.md

---

# 1. VISIÓN NARRATIVA GLOBAL

En **Learn-Lab**, el jugador no resuelve ejercicios aislados en un vacío de datos. El jugador acompaña a **Nova** a través del flujo del tiempo, donde cada consulta SQL, script de Python o modelo de datos es una **herramienta de descubrimiento y construcción**.

### El Misterio Central: El Glitch y el Desvanecimiento de la Memoria
Una anomalía cuántico-temporal conocida como **"El Glitch"** (La Corrupción) ha fracturado el continuo de la civilización humana. El Glitch no es un monstruo con garras: es la **entropía de la información**, la pérdida de registros, la incoherencia de datos, el olvido de cómo se miden, distribuyen y optimizan los recursos.

Cuando una era cae presa del Glitch:
- Los registros se corrompen (`NULL` values invasivos, duplicados caóticos, tablas desvinculadas).
- Las tribus no saben cuántos suministros tienen para el invierno.
- Los reinos pierden sus rutas comerciales y caen en hambruna.
- Las ciudades industriales colapsan por fallos en sus cadenas de suministro.
- Las inteligencias artificiales del futuro enloquecen al alimentarse de alucinaciones y sesgos destructivos.

**Nova**, una exploradora curiosa y decidida equipada con el **Núcleo de Datos** (un artefacto capaz de interpretar esquemas y ejecutar consultas de orden universal), debe viajar desde el primer fuego de la humanidad hasta el futuro distante. Al escribir consultas precisas, Nova no solo "supera pruebas": **purifica los datos, repara las líneas temporales y reconstruye la civilización**.

---

# 2. ELENCO DE PERSONAJES Y NPCS

A lo largo del viaje, Nova nunca está sola. Cada era presenta guías, sabios, artesanos o ingenieros que representan las necesidades reales de su época:

### 1. Nova (La Protagonista)
- **Rol:** Exploradora del Tiempo y Analista de la Realidad.
- **Personalidad:** Curiosa, pragmática, empática, jamás condescendiente. Aprende a la par del usuario.
- **Arco Narrativo:** Empieza sin saber el impacto de sus acciones, solo buscando volver a casa. Al avanzar, comprende que el conocimiento estructurado es lo único que protege a la humanidad del colapso.

### 2. Kael (El Cazador-Rastreador) — Era I (Edad de Piedra)
- **Rol:** Líder del clan nómada.
- **Función en el juego:** Plantea problemas de supervivencia inmediata: "¿Hacia dónde migraron las manadas?", "¿Qué cuevas tienen agua limpia?", "¿Cuánta leña nos queda antes de la tormenta?".

### 3. Lyra (La Escriba de Graneros) — Era II (Primeras Civilizaciones)
- **Rol:** Administradora de los primeros silos a orillas de los grandes ríos.
- **Función en el juego:** Introduce la necesidad de resumir (`COUNT`, `SUM`, `AVG`). Ya no podemos contar grano por grano; necesitamos métricas para que el pueblo no muera de hambre.

### 4. Orin (El Maestro de Caravanas) — Era III (Grandes Reinos)
- **Rol:** Mercader y diplomático que conecta ciudades amuralladas.
- **Función en el juego:** Introduce las relaciones entre tablas (`JOIN`). "¿Cómo sabemos qué rey compró este cargamento de seda si los nombres están en un papiro y los pagos en otro?".

### 5. Ada (La Ingeniera Analítica) — Era V / VI (Revolución Industrial y Digital)
- **Rol:** Visionaria de telares mecánicos y cálculo digital.
- **Función en el juego:** Une la lógica de datos con la automatización en Python y el procesamiento masivo de información en tiempo real.

### 6. El Glitch (Entidad Antagónica)
- **Manifestación:** Tablas corrompidas, sintaxis rota, inconsistencias lógicas en el mapa y niebla de distorsión. A medida que el jugador avanza, el Glitch intenta alterar las consultas y sembrar ruido.

---

# 3. PANORAMA DE LAS 8 ERAS DE LA CIVILIZACIÓN

Cada Era representa un Mundo en el mapa de progreso, con su propio bioma, estética, conjunto de datos temático y conceptos técnicos clave:

| Era | Nombre de la Era | Bioma / Entorno Visual | Conceptos Técnicos | Datasets Temáticos | Hito de Civilización |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **I** | **Edad de Piedra** | Valles glaciares, cavernas, fogatas primitivas | `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`, comparadores | `mamuts`, `cazadores`, `recursos_tribu`, `cuevas` | Fuego dominado y campamento base permanente |
| **II** | **Primeras Civilizaciones** | Riberas fluviales, templos de adobe, campos de trigo | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING` | `cosechas`, `granos`, `rebaños`, `aldeas_nilus` | Escritura cuneiforme y graneros comunitarios |
| **III** | **Grandes Reinos** | Fortalezas de piedra, puertos mercantes, caravanas | `INNER JOIN`, `LEFT JOIN`, claves foráneas, alias de tablas | `mercaderes`, `pedidos`, `ciudades`, `rutas_comerciales` | Moneda común y tratados comerciales continentales |
| **IV** | **Imperios y Leyes** | Acueductos de mármol, senados, coliseos | `CASE WHEN`, Subconsultas, `UNION`, vistas lógicas | `legiones`, `provincias`, `tributos`, `senadores` | Censos imperiales y código de leyes estandarizado |
| **V** | **Revolución del Vapor** | Fábricas de ladrillo, chimeneas, telares mecánicos | Transición SQL $\rightarrow$ Python, `DataFrame`, limpieza de datos | `produccion_fabril`, `maquinaria`, `operarios`, `combustible` | Ferrocarril transcontinental y producción en masa |
| **VI** | **La Era de la Red** | Ciudades iluminadas por neón sutil, centros de datos | APIs, JSON, filtrado dinámico, transformaciones ETL | `trafico_red`, `servidores`, `usuarios_globales`, `logs` | La World Wide Web y telecomunicaciones globales |
| **VII** | **Era de la Inteligencia** | Metrópolis flotantes, domos bioclimáticos, biochips | Machine Learning, regresión, clasificación, RAG, Embeddings | `vectores_memoria`, `sensores_climaticos`, `modelos_nlp` | Automatización predictiva y armonía ecológica |
| **VIII** | **Frontera Futura** | Ciudades hiperlumínicas interestelares | Sistemas distribuidos, orquestación cuántica, mitigación del Glitch | `nucleo_temporal`, `constelaciones`, `archivo_humanidad` | Restauración del Continuo y maestría absoluta de datos |

---

# 4. VERTICAL SLICE: ERA I — LA EDAD DE PIEDRA (10 NIVELES COMPLETOS)

Este es el contenido exacto y detallado del prototipo jugable para la primera Era. Cada nivel contiene contexto narrativo, objetivo pedagógico, dataset precargado en SQLite, consulta inicial, consulta esperada, diálogos de Nova y recompensas en el mapa.

---

### Nivel 1: El Primer Registro
- **Nodo en el mapa:** 1-1 (La Caverna del Despertar)
- **Contexto Narrativo:** Nova despierta junto a una fogata mortecina. Kael, el cazador, está tallando marcas en la pared de piedra. "Las marcas se borran con la lluvia", dice Kael. "Necesitamos saber qué cuevas están habitadas por nuestra gente antes de que caiga la nieve".
- **Objetivo Pedagógico:** Comprender la estructura elemental de una consulta: seleccionar todas las columnas de una tabla mediante `SELECT * FROM`.
- **Esquema de Datos (`cuevas`):**
  ```sql
  CREATE TABLE cuevas (
      id INTEGER PRIMARY KEY,
      nombre TEXT,
      region TEXT,
      habitada INTEGER,
      capacidad INTEGER
  );
  INSERT INTO cuevas VALUES 
  (1, 'Cueva del Sol', 'Valle Norte', 1, 12),
  (2, 'Gruta Helada', 'Picos Altos', 0, 5),
  (3, 'Caverna del Río', 'Ribera Este', 1, 20),
  (4, 'Grieta Profunda', 'Paso Rocoso', 0, 8);
  ```
- **Diálogo de Nova (Entrada):** *"El Núcleo brilla tenuemente... Kael necesita ver todo el mapa de las cuevas para no enviar exploradores a ciegas. Pidámosle a la tabla que nos muestre todos los registros."*
- **Consulta Inicial:**
  ```sql
  -- Inspecciona todos los registros de la tabla cuevas
  SELECT ___ FROM cuevas;
  ```
- **Solución Esperada:**
  ```sql
  SELECT * FROM cuevas;
  ```
- **Diálogo de Nova (Éxito):** *"¡Las marcas de la cueva se han estabilizado en el Núcleo! Ahora sabemos con certeza qué refugios existen."*
- **Recompensa de Civilización:** El fuego de la fogata se aviva en el mapa. Se desbloquea la choza de ramas secas.
- **Puntos:** 50 Puntos de Civilización (PC), 1 Antorcha Primitiva.

---

### Nivel 2: Las Manadas del Valle
- **Nodo en el mapa:** 1-2 (La Pradera Helada)
- **Contexto Narrativo:** Kael observa la planicie. "Allá afuera se mueven muchas bestias, pero nuestros ojos solo necesitan ver a los grandes mamuts y su ubicación. Ignora el resto de detalles por ahora."
- **Objetivo Pedagógico:** Seleccionar columnas específicas (`nombre`, `region`) en lugar de todo el conjunto con `*`.
- **Esquema de Datos (`mamuts`):**
  ```sql
  CREATE TABLE mamuts (
      id INTEGER PRIMARY KEY,
      apodo TEXT,
      manada TEXT,
      peso_toneladas REAL,
      peligrosidad TEXT
  );
  INSERT INTO mamuts VALUES 
  (1, 'Colmillo Blanco', 'Valle Norte', 5.2, 'Alta'),
  (2, 'Peludo Veloz', 'Estepa Sur', 3.8, 'Media'),
  (3, 'Gran Berta', 'Valle Norte', 6.1, 'Extrema'),
  (4, 'Trueno Gris', 'Paso Rocoso', 4.5, 'Media');
  ```
- **Diálogo de Nova (Entrada):** *"No gastes energía buscando datos innecesarios. Kael solo necesita saber el apodo de la bestia y a qué manada pertenece."*
- **Consulta Inicial:**
  ```sql
  -- Trae únicamente el apodo y la manada de cada mamut
  SELECT apodo, ______ FROM mamuts;
  ```
- **Solución Esperada:**
  ```sql
  SELECT apodo, manada FROM mamuts;
  ```
- **Diálogo de Nova (Éxito):** *"¡Rastreo limpio! Los exploradores ya saben a quién seguir sin perderse en detalles superfluos."*
- **Recompensa de Civilización:** Se colocan postes de vigía con cráneos totémicos en la pradera.
- **Puntos:** 60 PC.

---

### Nivel 3: El Filtro de la Supervivencia
- **Nodo en el mapa:** 1-3 (El Desfiladero Sombrío)
- **Contexto Narrativo:** Una tormenta se avecina. Solo las cuevas que actualmente estén **habitadas** (`habitada = 1`) pueden ofrecer abrigo y fuego a los exploradores agotados.
- **Objetivo Pedagógico:** Uso de la cláusula `WHERE` con condición de igualdad numérica.
- **Esquema de Datos:** Mismo dataset `cuevas` enriquecido.
- **Diálogo de Nova (Entrada):** *"Si enviamos a la gente a cuevas vacías, morirán de frío. Filtremos solo aquellas donde haya fuego encendido (`habitada = 1`)."*
- **Consulta Inicial:**
  ```sql
  -- Filtra únicamente las cuevas habitadas
  SELECT nombre, region 
  FROM cuevas 
  WHERE habitada = _;
  ```
- **Solución Esperada:**
  ```sql
  SELECT nombre, region FROM cuevas WHERE habitada = 1;
  ```
- **Diálogo de Nova (Éxito):** *"¡Refugio seguro! Tres familias lograron entrar antes de que el granizo rompiera las pieles."*
- **Recompensa de Civilización:** El campamento se expande con 2 tiendas de piel de bisonte.
- **Puntos:** 70 PC.

---

### Nivel 4: Bestias Imponentes
- **Nodo en el mapa:** 1-4 (Los Riscos de Caza)
- **Contexto Narrativo:** Kael reúne a los lanzadores más fuertes. "No arriesgaremos vidas contra presas pequeñas. Buscaremos únicamente a los mamuts de más de 4 toneladas métricas para llenar los secaderos de carne."
- **Objetivo Pedagógico:** Filtrado numérico relacional con operadores de comparación (`>`).
- **Esquema de Datos:** Mismo dataset `mamuts`.
- **Diálogo de Nova (Entrada):** *"Usemos el operador `>` para filtrar a los gigantes cuyo `peso_toneladas` supere 4.0."*
- **Consulta Inicial:**
  ```sql
  -- Encuentra apodo y peso_toneladas de mamuts con peso mayor a 4
  SELECT apodo, peso_toneladas 
  FROM mamuts 
  WHERE peso_toneladas _ 4.0;
  ```
- **Solución Esperada:**
  ```sql
  SELECT apodo, peso_toneladas FROM mamuts WHERE peso_toneladas > 4.0;
  ```
- **Diálogo de Nova (Éxito):** *"¡Localizados! La partida de caza se dirige directo a los ejemplares más rendidores."*
- **Recompensa de Civilización:** Se levanta un secadero de carne y un almacén de huesos.
- **Puntos:** 80 PC.

---

### Nivel 5: Inventario de Sílex y Madera
- **Nodo en el mapa:** 1-5 (El Taller Primitivo)
- **Contexto Narrativo:** Las lanzas se rompen rápidamente. El artesano de la tribu tiene un almacén con `recursos_tribu`. Necesitamos saber qué materiales están en situación crítica (cantidad menor a 15 unidades).
- **Objetivo Pedagógico:** Uso del operador `<` y filtrado condicional sobre cantidades enteras.
- **Esquema de Datos (`recursos_tribu`):**
  ```sql
  CREATE TABLE recursos_tribu (
      id INTEGER PRIMARY KEY,
      recurso TEXT,
      tipo TEXT,
      cantidad INTEGER,
      estado TEXT
  );
  INSERT INTO recursos_tribu VALUES 
  (1, 'Puntas de Sílex', 'Armas', 45, 'Excelente'),
  (2, 'Ramas de Fresno', 'Madera', 8, 'Crítico'),
  (3, 'Pieles Curtidas', 'Ropa', 12, 'Bajo'),
  (4, 'Grasa de Ballena', 'Combustible', 30, 'Bueno'),
  (5, 'Tendones Secos', 'Cuerdas', 6, 'Crítico');
  ```
- **Diálogo de Nova (Entrada):** *"Si nos quedamos sin ramas o tendones, no habrá más lanzas. Filtra los recursos con `cantidad < 15` para que los recolectores salgan de inmediato."*
- **Consulta Inicial:**
  ```sql
  SELECT recurso, cantidad 
  FROM recursos_tribu 
  WHERE cantidad _ 15;
  ```
- **Solución Esperada:**
  ```sql
  SELECT recurso, cantidad FROM recursos_tribu WHERE cantidad < 15;
  ```
- **Diálogo de Nova (Éxito):** *"¡Alerta transmitida a tiempo! Los recolectores trajeron haces de fresno fresco antes del anochecer."*
- **Recompensa de Civilización:** El taller primitivo se mejora a Taller de Talla de Piedra.
- **Puntos:** 90 PC.

---

### Nivel 6: Cazadores Veteranos
- **Nodo en el mapa:** 1-6 (El Círculo de Ancianos)
- **Contexto Narrativo:** No cualquiera puede liderar una expedición en el hielo negro. Kael necesita una lista de los cazadores con rango 'Veterano' o 'Líder'.
- **Objetivo Pedagógico:** Filtrado de texto exacto (`WHERE rango = 'Veterano'`).
- **Esquema de Datos (`cazadores`):**
  ```sql
  CREATE TABLE cazadores (
      id INTEGER PRIMARY KEY,
      nombre TEXT,
      edad INTEGER,
      rango TEXT,
      presas_cobradas INTEGER
  );
  INSERT INTO cazadores VALUES 
  (1, 'Kael', 32, 'Líder', 48),
  (2, 'Sura', 27, 'Veterano', 35),
  (3, 'Tark', 19, 'Novato', 4),
  (4, 'Bran', 40, 'Veterano', 52),
  (5, 'Mira', 22, 'Iniciado', 11);
  ```
- **Diálogo de Nova (Entrada):** *"En SQL, los textos van entre comillas simples. Busquemos a los que tienen `rango = 'Veterano'`."*
- **Consulta Inicial:**
  ```sql
  SELECT nombre, presas_cobradas 
  FROM cazadores 
  WHERE rango = '________';
  ```
- **Solución Esperada:**
  ```sql
  SELECT nombre, presas_cobradas FROM cazadores WHERE rango = 'Veterano';
  ```
- **Diálogo de Nova (Éxito):** *"¡Sura y Bran están listos! Sus arcos nunca han fallado una presa en la ventisca."*
- **Recompensa de Civilización:** Se agrega un tótem de plumas y colmillos en el centro del campamento.
- **Puntos:** 100 PC.

---

### Nivel 7: Prioridad de Refugio (Orden y Jerarquía)
- **Nodo en el mapa:** 1-7 (La Colina de la Ventisca)
- **Contexto Narrativo:** Llega un nuevo grupo nómada pidiendo refugio. El consejo necesita ver todas las cuevas ordenadas desde la de mayor capacidad hasta la más pequeña para distribuir a las familias con orden.
- **Objetivo Pedagógico:** Introducción a la cláusula `ORDER BY` con modificador descendente (`DESC`).
- **Esquema de Datos:** Dataset `cuevas`.
- **Diálogo de Nova (Entrada):** *"Usa `ORDER BY capacidad DESC` para que las cavernas más espaciosas aparezcan en la parte superior de la lista."*
- **Consulta Inicial:**
  ```sql
  SELECT nombre, capacidad 
  FROM cuevas 
  ORDER BY capacidad ____;
  ```
- **Solución Esperada:**
  ```sql
  SELECT nombre, capacidad FROM cuevas ORDER BY capacidad DESC;
  ```
- **Diálogo de Nova (Éxito):** *"¡Distribución perfecta! Nadie quedó hacinado y los niños tienen espacio cerca del fuego."*
- **Recompensa de Civilización:** Se construye un puente de troncos sobre el río congelado.
- **Puntos:** 110 PC.

---

### Nivel 8: Los Más Diestros (El Podio de la Tribu)
- **Nodo en el mapa:** 1-8 (El Gran Fuego Ceremonial)
- **Contexto Narrativo:** Antes de la gran migración, la tribu celebra a sus 3 mejores cazadores históricos otorgándoles mantos sagrados.
- **Objetivo Pedagógico:** Combinación de `ORDER BY` y `LIMIT` para extraer el Top N de una tabla.
- **Esquema de Datos:** Dataset `cazadores`.
- **Diálogo de Nova (Entrada):** *"Primero ordenamos por `presas_cobradas DESC`, y luego recortamos el resultado a los 3 primeros con `LIMIT 3`."*
- **Consulta Inicial:**
  ```sql
  SELECT nombre, presas_cobradas 
  FROM cazadores 
  ORDER BY presas_cobradas DESC 
  LIMIT _;
  ```
- **Solución Esperada:**
  ```sql
  SELECT nombre, presas_cobradas FROM cazadores ORDER BY presas_cobradas DESC LIMIT 3;
  ```
- **Diálogo de Nova (Éxito):** *"¡La tribu ovaciona a Bran, Kael y Sura! Los mantos han sido entregados con honor."*
- **Recompensa de Civilización:** Los cazadores reciben lanzas ceremoniales con grabados rúnicos.
- **Puntos:** 120 PC.

---

### Nivel 9: El Gran Filtro Compuesto
- **Nodo en el mapa:** 1-9 (La Garganta del Trueno)
- **Contexto Narrativo:** Una bestia peligrosa ha sido vista en el 'Valle Norte'. No podemos enviar a cualquiera: necesitamos que el mamut sea del 'Valle Norte' Y que tenga peligrosidad 'Alta' o 'Extrema' para preparar las trampas de fosa pesadas.
- **Objetivo Pedagógico:** Uso del operador lógico `AND` en la cláusula `WHERE`.
- **Esquema de Datos:** Dataset `mamuts`.
- **Diálogo de Nova (Entrada):** *"Dos condiciones deben cumplirse a la vez: `manada = 'Valle Norte' AND peligrosidad = 'Alta'`."*
- **Consulta Inicial:**
  ```sql
  SELECT apodo, peso_toneladas 
  FROM mamuts 
  WHERE manada = 'Valle Norte' ___ peligrosidad = 'Alta';
  ```
- **Solución Esperada:**
  ```sql
  SELECT apodo, peso_toneladas FROM mamuts WHERE manada = 'Valle Norte' AND peligrosidad = 'Alta';
  ```
- **Diálogo de Nova (Éxito):** *"¡Trampa lista con precisión milimétrica! La bestia fue avistada y el campamento está a salvo."*
- **Recompensa de Civilización:** Se erige una empalizada de troncos afilados que rodea el campamento.
- **Puntos:** 130 PC.

---

### Nivel 10: Jefe de Era — La Primera Aldea Permanente
- **Nodo en el mapa:** 1-10 (El Valle Fértil - Umbral de Civilización)
- **Contexto Narrativo:**
  *El Glitch ataca.* Una tormenta de anomalías magnéticas azota el valle. Kael mira asustado cómo las marcas en las rocas tiemblan y se desvanecen:
  *"Nova... si no sabemos qué recursos nos quedan con más de 10 unidades de cantidad y que además pertenezcan al tipo 'Armas' o 'Combustible', el clan no sobrevivirá al cruce del gran río hacia las tierras fértiles."*
- **Objetivo Pedagógico:** Resolver un desafío multifactorial: seleccionar columnas clave, filtrar con condiciones combinadas (`AND`, `>` y operadores de texto), y ordenar el resultado.
- **Esquema de Datos:** Dataset `recursos_tribu`.
- **Diálogo de Nova (Entrada):** *"¡El Glitch intenta borrar el inventario de la tribu! Tranquilo Kael, el Núcleo de Datos resistirá. Escribamos la consulta que selle el futuro de la humanidad."*
- **Misión del Jefe:**
  Traer el `recurso`, `tipo` y `cantidad` de la tabla `recursos_tribu` para aquellos recursos con `cantidad > 10` cuyo `tipo` sea igual a `'Combustible'`, ordenados de mayor a menor cantidad.
- **Consulta Inicial:**
  ```sql
  -- Derrota la anomalía del Glitch y asegura el cruce al Valle Fértil
  SELECT recurso, tipo, cantidad 
  FROM recursos_tribu 
  WHERE cantidad > 10 
    AND tipo = '___________'
  ORDER BY cantidad ____;
  ```
- **Solución Esperada:**
  ```sql
  SELECT recurso, tipo, cantidad 
  FROM recursos_tribu 
  WHERE cantidad > 10 
    AND tipo = 'Combustible'
  ORDER BY cantidad DESC;
  ```
- **Secuencia de Victoria (Cinemática narrativa):**
  1. El Glitch se disipa en un destello de luz esmeralda y dorada.
  2. Kael alza su antorcha: *"¡Lo logramos, Nova! El fuego no se apagará jamás."*
  3. En el mapa, el campamento de pieles se transforma físicamente: los nómadas clavan los primeros cimientos de arcilla y madera a orillas del río fértil.
  4. **Se desbloquea la Era II: Primeras Civilizaciones**.
- **Recompensa Máxima:**
  - Título: **"Pionero del Fuego y los Datos"**.
  - Insignia de Bronce Antiguo para el perfil.
  - 250 Puntos de Civilización.
  - Desbloqueo del Escriba Lyra en la pantalla de bienvenida.

---

# 5. ESTRUCTURA Y CONTINUIDAD DE LAS ERAS POSTERIORES (RESUMEN OPERATIVO)

### Era II: Primeras Civilizaciones (Niveles 11 a 20)
- **Foco Técnico:** Agregaciones (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`), `GROUP BY`, `HAVING`.
- **Narrativa:** La agricultura florece. El problema ya no es cazar el día a día, sino proyectar la cosecha anual para miles de personas. Lyra necesita calcular el promedio de trigo por parcela y detectar qué silos tienen déficit.
- **Evolución del Mapa:** De chozas de arcilla a templos zigurat, canales de irrigación y puertos fluviales con barcazas.

### Era III: Grandes Reinos (Niveles 21 a 30)
- **Foco Técnico:** Cruce relacional (`INNER JOIN`, `LEFT JOIN`, `ON`, claves primarias y foráneas).
- **Narrativa:** El comercio se expande entre ciudades-estado distantes. Orin debe conectar los manifiestos de carga con las listas de aranceles y los barcos registrados. Sin `JOIN`, los puertos colapsan por contrabando y pedidos duplicados.
- **Evolución del Mapa:** Murallas de piedra labrada, castillos, mercados bulliciosos y faros de navegación.

### Era IV: Imperios y Gobernanza (Niveles 31 a 40)
- **Foco Técnico:** `CASE WHEN`, Subconsultas, `UNION ALL`, `COALESCE`.
- **Narrativa:** Un imperio continental requiere categorizar provincias según su riesgo tributario y clasificar a los ciudadanos por estratos legales y de servicio civil.
- **Evolución del Mapa:** Calzadas de piedra, acueductos monumentales, senados y grandes bibliotecas públicas.

### Era V: Revolución del Vapor e Industria (Niveles 41 a 50)
- **Foco Técnico:** Transición conceptual hacia **Python para Datos** (Pandas basics, DataFrames, detección de nulos y anomalías numéricas).
- **Narrativa:** Las máquinas a vapor generan miles de mediciones por segundo. Las consultas manuales ya no alcanzan: Ada y Nova programan scripts para predecir fallas en calderas y optimizar rutas de locomotoras.
- **Evolución del Mapa:** Vías de ferrocarril activas con trenes en movimiento, talleres mecánicos, chimeneas de ladrillo y puertos de vapor.

### Era VI: La Era de la Red y el Silicio (Niveles 51 a 60)
- **Foco Técnico:** Estructuras semiestructuradas (JSON), APIs REST, Pipelines de transformación ETL y Big Data basics.
- **Narrativa:** El mundo se conecta mediante cables submarinos de fibra óptica. El Glitch intenta saturar los enrutadores mundiales con ataques de datos corruptos.
- **Evolución del Mapa:** Rascacielos con redes de fibra luminosa, antenas satelitales y centros de datos refrigerados.

### Era VII: Era de la Inteligencia (Niveles 61 a 80)
- **Foco Técnico:** Machine Learning supervisado, clustering, embeddings vectoriales, prompts estructurados y arquitecturas RAG.
- **Narrativa:** La civilización coexiste con modelos inteligentes que asisten en la medicina, el clima y la exploración espacial. Nova descubre que el Glitch original fue causado por un modelo del pasado entrenado con datos contaminados por codicia y desinformación.
- **Evolución del Mapa:** Domos biosféricos, rascacielos sustentables, redes neuronales flotantes en la atmósfera y transportes magnéticos.

### Era VIII: Frontera Cuántica y Futuro (Niveles 81 a 100)
- **Foco Técnico:** Gobernanza ética de IA, arquitecturas cuánticas distribuidas y resiliencia de datos a escala planetaria.
- **Narrativa:** Nova llega al fin del tiempo. El Glitch revela su verdadera forma: el archivo de una humanidad que olvidó cómo pensar por sí misma. Nova, utilizando todo el arsenal acumulado (SQL, Python, IA y Ética), reconstruye el Archivo Eterno y devuelve la memoria al universo.
- **Evolución del Mapa:** Una megaciudad galáctica armónica donde cada era histórica coexiste preservada en un tapiz viviente.
