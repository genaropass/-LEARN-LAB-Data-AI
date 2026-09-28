import { QueryResult, ValidationResult } from '@/types/sql';
import { executeQuery } from './engine';

function normalizeValue(val: unknown): string | number | null {
  if (val === null || val === undefined) return null;
  if (typeof val === 'number') {
    // Round to 2 decimal places to prevent float epsilon differences
    return Math.round(val * 100) / 100;
  }
  return String(val).trim().toLowerCase();
}

function translateSqlError(error: string): string {
  const err = error.trim();
  if (err.includes('incomplete input')) {
    return 'Error de sintaxis: La consulta SQL está incompleta. Asegúrate de escribir la cláusula completa (por ejemplo: SELECT * FROM customers;).';
  }
  if (err.includes('no such table:')) {
    const tableMatch = err.match(/no such table:\s*(\S+)/);
    const tbl = tableMatch ? tableMatch[1] : '';
    return `La tabla '${tbl}' no existe en la base de datos. Recuerda que los nombres de tablas son en inglés: customers (clientes), orders (pedidos), products (productos), categories (categorías), order_items (ítems), payments (pagos), subscriptions (suscripciones).`;
  }
  if (err.includes('no such column:')) {
    const colMatch = err.match(/no such column:\s*(\S+)/);
    const col = colMatch ? colMatch[1] : '';
    return `La columna '${col}' no existe. Revisa el visor de tablas abajo para ver los nombres exactos de los campos.`;
  }
  if (err.includes('syntax error')) {
    const nearMatch = err.match(/near\s+"([^"]+)":\s*syntax error/);
    if (nearMatch) {
      return `Error de sintaxis cerca de "${nearMatch[1]}". Revisa si faltan comas, comillas o si una palabra reservada está incompleta.`;
    }
    return `Error de sintaxis en SQL: ${err}. Verifica la ortografía de las palabras clave como SELECT, FROM, WHERE.`;
  }
  return `Error de SQL: ${err}`;
}

export async function validateUserQuery(
  userQuery: string,
  expectedQuery: string,
  pedagogicalFeedback?: string
): Promise<ValidationResult> {
  const trimmed = userQuery.trim();
  if (!trimmed) {
    return {
      isValid: false,
      message: 'Por favor escribe una consulta SQL antes de ejecutar.'
    };
  }

  // 1. Execute User Query
  const actualResult = await executeQuery(trimmed);

  if (actualResult.error) {
    return {
      isValid: false,
      message: translateSqlError(actualResult.error),
      actualResult
    };
  }

  // 2. Execute Expected Query
  const expectedResult = await executeQuery(expectedQuery);

  if (expectedResult.error) {
    console.error('Error en consulta de referencia:', expectedResult.error);
    return {
      isValid: false,
      message: 'Error interno en la consulta de prueba de referencia. Por favor repórtalo.',
      actualResult,
      expectedResult
    };
  }

  // 3. Compare Row Counts
  if (actualResult.rowCount !== expectedResult.rowCount) {
    return {
      isValid: false,
      message: `Diferencia de filas: Tu consulta devolvió ${actualResult.rowCount} ${actualResult.rowCount === 1 ? 'fila' : 'filas'}, pero se esperaban ${expectedResult.rowCount}.`,
      actualResult,
      expectedResult,
      differences: {
        rowCountMismatch: true,
        details: `Se esperaban ${expectedResult.rowCount} filas y se recibieron ${actualResult.rowCount}. Revisa tus filtros (WHERE), tipos de JOIN o agrupaciones (GROUP BY).`
      }
    };
  }

  // 4. Compare Column Counts
  if (actualResult.columns.length !== expectedResult.columns.length) {
    return {
      isValid: false,
      message: `Diferencia en columnas: Se esperaban ${expectedResult.columns.length} columnas (${expectedResult.columns.join(', ')}), pero tu consulta devolvió ${actualResult.columns.length} (${actualResult.columns.join(', ')}).`,
      actualResult,
      expectedResult,
      differences: {
        columnMismatch: true,
        details: `Columnas esperadas: [${expectedResult.columns.join(', ')}] vs recibidas: [${actualResult.columns.join(', ')}]`
      }
    };
  }

  // 5. Compare Data Content (Order-aware or Set-aware based on ORDER BY presence)
  const isOrdered = expectedQuery.toUpperCase().includes('ORDER BY');

  if (isOrdered) {
    for (let r = 0; r < expectedResult.values.length; r++) {
      const expRow = expectedResult.values[r];
      const actRow = actualResult.values[r];

      for (let c = 0; c < expRow.length; c++) {
        const expVal = normalizeValue(expRow[c]);
        const actVal = normalizeValue(actRow[c]);

        if (expVal !== actVal) {
          return {
            isValid: false,
            message: `Diferencia en la fila ${r + 1}: se esperaba "${expRow[c]}" para la columna "${expectedResult.columns[c]}", pero se obtuvo "${actRow[c]}".`,
            actualResult,
            expectedResult,
            differences: {
              valueMismatch: true,
              details: `Divergencia de valores en fila ${r + 1}. Asegúrate de que el ordenamiento ORDER BY coincida con las instrucciones.`
            }
          };
        }
      }
    }
  } else {
    // Unordered comparison: check row set equality
    const stringifyRow = (row: (string | number | null | boolean)[]) =>
      row.map(normalizeValue).join('|||');

    const expectedSet = expectedResult.values.map(stringifyRow).sort();
    const actualSet = actualResult.values.map(stringifyRow).sort();

    for (let i = 0; i < expectedSet.length; i++) {
      if (expectedSet[i] !== actualSet[i]) {
        return {
          isValid: false,
          message: 'Los registros obtenidos no coinciden con los datos requeridos en el ejercicio.',
          actualResult,
          expectedResult,
          differences: {
            valueMismatch: true,
            details: 'Algunas filas difieren en sus valores calculados o filtrados.'
          }
        };
      }
    }
  }

  // Passed!
  return {
    isValid: true,
    message: '✓ ¡Análisis Correcto! Has superado el desafío con éxito.',
    pedagogicalFeedback: pedagogicalFeedback || '¡Excelente trabajo! Tu consulta se ejecutó de forma óptima y produjo el resultado analítico exacto.',
    actualResult,
    expectedResult
  };
}
