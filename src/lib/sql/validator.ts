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

export async function validateUserQuery(
  userQuery: string,
  expectedQuery: string,
  pedagogicalFeedback?: string
): Promise<ValidationResult> {
  const trimmed = userQuery.trim();
  if (!trimmed) {
    return {
      isValid: false,
      message: 'Please write an SQL query before submitting.'
    };
  }

  // 1. Execute User Query
  const actualResult = await executeQuery(trimmed);

  if (actualResult.error) {
    return {
      isValid: false,
      message: `SQL Error: ${actualResult.error}`,
      actualResult
    };
  }

  // 2. Execute Expected Query
  const expectedResult = await executeQuery(expectedQuery);

  if (expectedResult.error) {
    console.error('Benchmark query error:', expectedResult.error);
    return {
      isValid: false,
      message: 'Internal benchmark error validating query. Please report this.',
      actualResult,
      expectedResult
    };
  }

  // 3. Compare Row Counts
  if (actualResult.rowCount !== expectedResult.rowCount) {
    return {
      isValid: false,
      message: `Row count mismatch: Your query returned ${actualResult.rowCount} ${actualResult.rowCount === 1 ? 'row' : 'rows'}, but ${expectedResult.rowCount} were expected.`,
      actualResult,
      expectedResult,
      differences: {
        rowCountMismatch: true,
        details: `Expected ${expectedResult.rowCount} rows, received ${actualResult.rowCount}. Review your filter (WHERE), join type, or aggregation (GROUP BY).`
      }
    };
  }

  // 4. Compare Column Counts
  if (actualResult.columns.length !== expectedResult.columns.length) {
    return {
      isValid: false,
      message: `Column count mismatch: Expected ${expectedResult.columns.length} columns (${expectedResult.columns.join(', ')}), but your query returned ${actualResult.columns.length} columns (${actualResult.columns.join(', ')}).`,
      actualResult,
      expectedResult,
      differences: {
        columnMismatch: true,
        details: `Columns expected: [${expectedResult.columns.join(', ')}] vs received: [${actualResult.columns.join(', ')}]`
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
            message: `Result mismatch at row ${r + 1}: expected value "${expRow[c]}" for column "${expectedResult.columns[c]}", but received "${actRow[c]}".`,
            actualResult,
            expectedResult,
            differences: {
              valueMismatch: true,
              details: `Row ${r + 1} value divergence. Ensure calculations and sorting order strictly match requirements.`
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
          message: 'The rows returned do not match the expected dataset analysis.',
          actualResult,
          expectedResult,
          differences: {
            valueMismatch: true,
            details: 'Some row records differ in their filtered values or groupings.'
          }
        };
      }
    }
  }

  // Passed!
  return {
    isValid: true,
    message: '✓ Correct Analysis! Benchmark test passed.',
    pedagogicalFeedback: pedagogicalFeedback || 'Excellent work. Your query executed efficiently and produced the exact analytical result.',
    actualResult,
    expectedResult
  };
}
