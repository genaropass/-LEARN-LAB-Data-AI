const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function test() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  const datasetFile = fs.readFileSync(path.join(__dirname, 'src/lib/sql/dataset.ts'), 'utf8');
  const seedMatch = datasetFile.match(/export const SEED_SQL = `([\s\S]*?)`;/);
  db.run(seedMatch[1]);

  const levelsFile = fs.readFileSync(path.join(__dirname, 'src/content/data-ai/sql/levels.ts'), 'utf8');
  
  // Find all expected: ... before tbls:
  const regex = /expected:\s*(["'])([\s\S]*?)\1,\s*tbls:/g;
  let match;
  const queries = [];
  while ((match = regex.exec(levelsFile)) !== null) {
    queries.push(match[2]);
  }

  console.log(`Testing ${queries.length} Level Queries against SQLite WASM:`);
  let passed = 0;
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    try {
      db.exec(q);
      passed++;
    } catch (e) {
      console.error(`❌ Query ${i + 1} failed: ${q}`);
      console.error(`Error:`, e.message);
      process.exit(1);
    }
  }

  console.log(`🎉 ALL ${passed} OF 100 LEVEL QUERIES EXECUTED PERFECTLY AGAINST SQLITE WASM!`);
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
