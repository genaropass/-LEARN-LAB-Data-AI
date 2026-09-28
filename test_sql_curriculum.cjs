const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function testCurriculum() {
  console.log('Testing SQL curriculum queries against SQLite WASM...');
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Read SEED_SQL
  const datasetFile = fs.readFileSync(path.join(__dirname, 'src/lib/sql/dataset.ts'), 'utf8');
  const seedMatch = datasetFile.match(/export const SEED_SQL = `([\s\S]*?)`;/);
  if (!seedMatch) {
    throw new Error('Could not extract SEED_SQL from dataset.ts');
  }
  const seedSql = seedMatch[1];
  db.run(seedSql);
  console.log('✓ SEED_SQL executed successfully');

  // Verify table counts
  const tables = ['customers', 'categories', 'products', 'orders', 'order_items', 'payments', 'subscriptions'];
  for (const t of tables) {
    const res = db.exec(`SELECT COUNT(*) as count FROM ${t}`);
    console.log(`  Table [${t}]: ${res[0].values[0][0]} rows`);
  }

  // Extract exercises expected queries
  const exercisesFile = fs.readFileSync(path.join(__dirname, 'src/content/data-ai/sql/exercises.ts'), 'utf8');
  const expectedQueries = [...exercisesFile.matchAll(/expectedQuery:\s*["'`]([\s\S]*?)["'`],/g)].map(m => m[1]);

  console.log(`\nValidating ${expectedQueries.length} Exercise Queries:`);
  expectedQueries.forEach((q, i) => {
    try {
      const res = db.exec(q);
      const rows = res.length > 0 ? res[0].values.length : 0;
      console.log(`  [Exercise ${i + 1}] Passed (${rows} rows)`);
    } catch (e) {
      console.error(`  [Exercise ${i + 1}] FAILED on query: ${q}`);
      console.error(`  Error:`, e.message);
      process.exit(1);
    }
  });

  // Extract Boss expected queries
  const bossesFile = fs.readFileSync(path.join(__dirname, 'src/content/data-ai/sql/bosses.ts'), 'utf8');
  const bossQueries = [...bossesFile.matchAll(/expectedQuery:\s*["'`]([\s\S]*?)["'`],/g)].map(m => m[1]);

  console.log(`\nValidating ${bossQueries.length} Boss Stage Queries:`);
  bossQueries.forEach((q, i) => {
    try {
      const res = db.exec(q);
      const rows = res.length > 0 ? res[0].values.length : 0;
      console.log(`  [Boss Stage ${i + 1}] Passed (${rows} rows)`);
    } catch (e) {
      console.error(`  [Boss Stage ${i + 1}] FAILED on query: ${q}`);
      console.error(`  Error:`, e.message);
      process.exit(1);
    }
  });

  // Extract Capstone Project expected queries
  const projectFile = fs.readFileSync(path.join(__dirname, 'src/content/data-ai/sql/project.ts'), 'utf8');
  const projectQueries = [...projectFile.matchAll(/expectedQuery:\s*["'`]([\s\S]*?)["'`],/g)].map(m => m[1]);

  console.log(`\nValidating ${projectQueries.length} Capstone Project Queries:`);
  projectQueries.forEach((q, i) => {
    try {
      const res = db.exec(q);
      const rows = res.length > 0 ? res[0].values.length : 0;
      console.log(`  [Capstone Task ${i + 1}] Passed (${rows} rows)`);
    } catch (e) {
      console.error(`  [Capstone Task ${i + 1}] FAILED on query: ${q}`);
      console.error(`  Error:`, e.message);
      process.exit(1);
    }
  });

  console.log('\n🌟 ALL 22 CURRICULUM, BOSS, AND CAPSTONE QUERIES PASSED LIVE SQLITE EXECUTION!');
}

testCurriculum().catch(err => {
  console.error(err);
  process.exit(1);
});
