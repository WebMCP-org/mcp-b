/**
 * Represents a JSON-serializable value
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Represents a JSON object
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * Represents a JSON array
 */
export type JsonArray = JsonValue[];

/**
 * Represents an input schema for MCP tools
 */
export interface InputSchema {
  type: 'object';
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
  [key: string]: unknown;
}

/**
 * Represents a JSON Schema property
 */
export interface JsonSchemaProperty {
  type?: string | string[];
  description?: string;
  default?: unknown;
  enum?: unknown[];
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
  [key: string]: unknown;
}
