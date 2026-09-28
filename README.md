# ⚡ LEARN-LAB: DATA & AI — SQL WORLD
> **A gamified interactive learning platform for professional and technical data engineering skills.**

---

## 🧭 Core Product Philosophy: "The Map Is The Product"

Learn-Lab rejects the ubiquitous "generic AI SaaS" aesthetic (dark purple/blue gradients, floating glass cards, AI sparkle icons, endless enterprise analytics dashboards). Instead, it adopts the conceptual DNA of **video game world maps, RPG progression systems, tactile engineering laboratories, and modern developer tooling**:

```text
DISCOVER
   ↓
CHOOSE A PATH
   ↓
FOLLOW A VISUAL JOURNEY
   ↓
LEARN
   ↓
PRACTICE (Real SQLite WASM)
   ↓
SOLVE
   ↓
DEFEAT A BOSS (Sales Inquisitor & Churn Sentinel)
   ↓
EARN XP
   ↓
MASTER A SKILL
   ↓
UNLOCK THE NEXT AREA
   ↓
BUILD CAPSTONE PROJECT
```

---

## 🏛️ System Architecture

```text
learn-lab/
├── public/
│   └── sql-wasm.wasm                 # Local SQLite WASM binary (zero CDN failures)
├── src/
│   ├── app/
│   │   ├── layout.tsx                # App shell, GameStateProvider, TopNav & HUD
│   │   ├── page.tsx                  # Dynamic view router (WorldMap, Dashboard, Profile)
│   │   └── globals.css               # Deep slate lab styling, CodeMirror overrides
│   ├── types/
│   │   ├── curriculum.ts             # LearningNode, Exercise, BossScenario, ProjectTask
│   │   ├── gamification.ts           # UserProfile, Achievement, DailyQuest, SkillMastery
│   │   └── sql.ts                    # QueryResult, ValidationResult, TableSchema
│   ├── content/data-ai/sql/
│   │   ├── regions.ts                # 5 Regional Milestones & Visual Gates
│   │   ├── nodes.ts                  # 17 Learning Journey Nodes & Coordinates (x, y)
│   │   ├── exercises.ts              # Real SQL tasks with hints & pedagogical explanations
│   │   ├── bosses.ts                 # Multi-stage boss battles (Sales Intel & Churn Sentinel)
│   │   └── project.ts                # Capstone Retail Analytics Project (5 Deliverables)
│   ├── lib/
│   │   ├── sql/
│   │   │   ├── engine.ts             # In-browser SQLite WASM execution runner (sql.js)
│   │   │   ├── dataset.ts            # Realistic E-commerce & SaaS relational schema & seeds
│   │   │   └── validator.ts          # Live result validator (row count, columns, values, order)
│   │   ├── progression/
│   │   │   ├── xp.ts                 # RPG level curve formula & title tiers
│   │   │   ├── mastery.ts            # Weighted skill category mastery calculations
│   │   │   ├── recommender.ts        # Deterministic "Smart Next Step" engine
│   │   │   ├── achievements.ts       # Hall of Triumphs badge catalog
│   │   │   └── quests.ts             # Daily quest generator & streak tracker
│   │   ├── audio/
│   │   │   └── sfx.ts                # Web Audio API synthesizer (muted by default)
│   │   └── supabase/
│   │       ├── client.ts             # Supabase client with graceful guest mode fallback
│   │       └── schema.sql            # Production PostgreSQL schema with Row-Level Security
│   ├── context/
│   │   └── GameStateContext.tsx      # Central reactive player state & local persistence
│   └── components/
│       ├── layout/                   # TopNav & RealmSelector (Data & AI ecosystem)
│       ├── map/                      # WorldMap, MapNode, NodeDetailModal, SVG Bezier paths
│       ├── sql/                      # SqlEditor (CodeMirror 6), ResultTable, SchemaViewer
│       ├── learning/                 # ExerciseLab, BossArena, ProjectWorkspace
│       ├── gamification/             # AchievementToast, LevelUpCelebration
│       └── views/                    # DashboardView, ProfileView, AuthModal
```

---

## ⚡ Real SQL Execution Engine (No Fake Mocks)

The platform runs a real **SQLite WebAssembly engine** directly inside the client's browser:
* Queries execute against realistic relational schemas: `customers`, `categories`, `products`, `orders`, `order_items`, `payments`, `subscriptions`.
* The validator executes both the student's live SQL and the benchmark query against the in-memory SQLite database, checking row count, column structure, order preservation, and values with floating-point tolerance.
* Full schema explorer with live table schematics, primary/foreign key tags, and real-time 4-row sample data queries.
* Syntax error reporting provided directly by SQLite WASM with execution latency telemetry in milliseconds.

---

## 🗺️ SQL Curriculum & World Map

### 1. Region 01: The Relational Plains (Foundations)
* `SELECT Projection`: Vertical column extraction, avoiding bandwidth waste.
* `WHERE Predicates`: Relational filtering and predicate pushdown.
* `ORDER BY & LIMIT`: Descending sorts, index scans, and top-N rankings.
* `DISTINCT Values`: Deduplicating row tuples.
* `NULL & COALESCE`: Safe data sanitization and missing value fallbacks.

### 2. Region 02: The Aggregation Valley (Metrics & Boss #01)
* `Aggregates`: `COUNT(*)`, `SUM()`, and `AVG()` metric reductions.
* `GROUP BY Breakdown`: Dimensional rollups and transaction segmentations.
* `HAVING Thresholds`: Post-aggregation group filtering.
* ⚔️ **BOSS #01: The Sales Inquisitor**: Multi-stage investigation auditing quarterly revenue discrepancies, failed gateway settlements, and regional Average Order Value (AOV).

### 3. Region 03: The Relational Bridges (JOIN Mastery)
* `INNER JOIN Traverse`: Navigating primary-to-foreign key relationships.
* `LEFT JOIN Anti-Join`: Preserving unmatched left rows to isolate unengaged users.

### 4. Region 04: The Logic Citadel (Branching & Pipelines)
* `CASE Expressions`: Declarative conditional logic directly in SQL.
* `Nested Subqueries`: Scalar benchmark thresholds evaluated dynamically.
* `CTEs (WITH Pipelines)`: Modular data engineering transformations (dbt style).

### 5. Region 05: The Apex Observatory (Advanced Analytics & Capstone)
* `Window Functions`: `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` rankings preserving row-level granularity.
* ⚔️ **BOSS #02: The Churn Sentinel**: Multi-stage SaaS subscriber retention battle analyzing ARR, plan churn, and high-LTV account behaviors.
* 🏆 **FINAL CAPSTONE: Global Retail Intelligence**: Comprehensive 5-deliverable analytics consulting mission for *NovaTech Omnichannel Enterprises*.

---

## 🎮 Gamification Mechanics

* **XP Rewards**:
  * Lesson: `+20 XP`
  * Practice: `+15 XP`
  * Challenge: `+30 XP`
  * Boss Battle: `+100 - 180 XP`
  * Capstone Project: `+300 XP`
* **RPG Level Curve**: Progressive formula: $\text{Level} = \lfloor\sqrt{\text{XP} / 40}\rfloor + 1$
* **Character Titles**:
  * Level 1: *SQL Novice*
  * Level 2–3: *Query Apprentice*
  * Level 4–5: *Data Operator*
  * Level 6–7: *SQL Explorer*
  * Level 8–9: *Analytics Specialist*
  * Level 10+: *Master of Relational Logic*
  * Capstone Completed: *Certified SQL Architect*
* **Daily Quests**: Refreshed targets rewarding daily practice.
* **Smart Next Step Engine**: Deterministic recommendation algorithm that detects the player's weakest skill or pending milestones and recommends targeted drills.
* **Audio FX**: Web Audio API tactile feedback (muted by default, zero audio asset downloads).

---

## ☁️ Database & Supabase Integration

Learn-Lab runs with **first-class Guest Mode** using `localStorage` for offline persistence and zero-friction trial. 

To link your cloud Supabase database:
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Open SQL Editor in Supabase and execute [`src/lib/supabase/schema.sql`](file:///e:/Genaro/Desktop/portfolio/learn-lab/src/lib/supabase/schema.sql).
3. Create `.env.local` in `learn-lab/`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Authenticated users will automatically synchronize profiles, progress, attempts, and achievements with Row Level Security (RLS) active!

---

## 🚀 Local Development & Deployment

```bash
# Navigate to project directory
cd learn-lab

# Install dependencies (if not already installed)
npm install

# Run automated verification suite for all 22 SQL curriculum queries
node test_sql_curriculum.cjs

# Start development server
npm run dev

# Build for Vercel production deployment
npm run build
```

The application is 100% static-ready and builds clean for instant deployment on [Vercel](https://vercel.com).
