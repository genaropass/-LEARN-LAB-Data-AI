import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { SEED_SQL } from './dataset';
import { QueryResult } from '@/types/sql';

let SQL: SqlJsStatic | null = null;
let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;

export async function getSqlEngine(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      if (!SQL) {
        try {
          SQL = await initSqlJs({
            locateFile: (file) => {
              if (file.endsWith('.wasm')) return '/sql-wasm.wasm';
              return `/${file}`;
            }
          });
        } catch (localErr) {
          console.warn('WASM local no disponible, intentando CDN de respaldo...', localErr);
          SQL = await initSqlJs({
            locateFile: (file) => `https://sql.js.org/dist/${file}`
          });
        }
      }

      dbInstance = new SQL.Database();
      dbInstance.run(SEED_SQL);
      return dbInstance;
    } catch (err) {
      console.error('Error al inicializar el motor SQLite:', err);
      initPromise = null;
      throw err;
    }
  })();

  return initPromise;
}

export async function resetDatabase(): Promise<void> {
  const db = await getSqlEngine();
  try {
    db.run(SEED_SQL);
  } catch (err) {
    console.error('Error al reiniciar base de datos:', err);
  }
}

export async function executeQuery(query: string): Promise<QueryResult> {
  const startTime = performance.now();
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs: 0,
      error: 'La consulta está vacía. Por favor escribe una sentencia SQL.'
    };
  }

  try {
    const db = await getSqlEngine();
    const results = db.exec(trimmed);
    const duration = Math.round((performance.now() - startTime) * 10) / 10;

    if (!results || results.length === 0) {
      return {
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: duration
      };
    }

    const lastResult = results[results.length - 1];
    const safeValues: (string | number | null | boolean)[][] = (lastResult.values || []).map(row =>
      row.map(val => (val instanceof Uint8Array ? '[DATOS BINARIOS]' : (val as string | number | null | boolean)))
    );

    return {
      columns: lastResult.columns || [],
      values: safeValues,
      rowCount: safeValues.length,
      executionTimeMs: duration
    };
  } catch (err: unknown) {
    const duration = Math.round((performance.now() - startTime) * 10) / 10;
    const message = err instanceof Error ? err.message : String(err);
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs: duration,
      error: message
    };
  }
}

export async function getSampleRows(tableName: string, limit = 5): Promise<Record<string, unknown>[]> {
  try {
    const result = await executeQuery(`SELECT * FROM ${tableName} LIMIT ${limit};`);
    if (result.error || !result.columns.length) return [];
    
    return result.values.map(row => {
      const obj: Record<string, unknown> = {};
      result.columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });
  } catch {
    return [];
  }
}
