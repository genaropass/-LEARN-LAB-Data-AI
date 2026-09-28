export interface QueryResult {
  columns: string[];
  values: (string | number | null | boolean)[][];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  pedagogicalFeedback?: string;
  actualResult?: QueryResult;
  expectedResult?: QueryResult;
  differences?: {
    columnMismatch?: boolean;
    rowCountMismatch?: boolean;
    valueMismatch?: boolean;
    orderMismatch?: boolean;
    details?: string;
  };
}

export interface ColumnSchema {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  foreignTable?: string;
  foreignColumn?: string;
  description?: string;
}

export interface TableSchema {
  name: string;
  description: string;
  columns: ColumnSchema[];
  sampleRows?: Record<string, string | number | null | boolean>[];
}
