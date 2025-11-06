import { z } from 'zod';

export interface JsonSchemaProperty {
  type?: string | string[];
  description?: string;
  default?: unknown;
  enum?: unknown[];
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  [key: string]: unknown;
}

/**
 * Convert a JSON Schema property to a Zod schema
 */
export function jsonSchemaToZod(
  property: JsonSchemaProperty,
  isRequired: boolean
): z.ZodTypeAny {
  const types = Array.isArray(property.type) ? property.type : [property.type];
  const primaryType = types[0] || 'string';

  let schema: z.ZodTypeAny;

  switch (primaryType) {
    case 'string':
      schema = z.string();
      if (property.minLength !== undefined) {
        schema = (schema as z.ZodString).min(property.minLength);
      }
      if (property.maxLength !== undefined) {
        schema = (schema as z.ZodString).max(property.maxLength);
      }
      if (property.pattern) {
        schema = (schema as z.ZodString).regex(new RegExp(property.pattern));
      }
      if (property.enum) {
        schema = z.enum(property.enum as [string, ...string[]]);
      }
      break;

    case 'number':
    case 'integer':
      schema = primaryType === 'integer' ? z.number().int() : z.number();
      if (property.minimum !== undefined) {
        schema = (schema as z.ZodNumber).min(property.minimum);
      }
      if (property.maximum !== undefined) {
        schema = (schema as z.ZodNumber).max(property.maximum);
      }
      break;

    case 'boolean':
      schema = z.boolean();
      break;

    case 'array':
      if (property.items) {
        const itemSchema = jsonSchemaToZod(property.items, true);
        schema = z.array(itemSchema);
      } else {
        schema = z.array(z.unknown());
      }
      break;

    case 'object':
      if (property.properties) {
        const shapeEntries: [string, z.ZodTypeAny][] = [];
        const requiredFields = property.required || [];

        for (const [key, prop] of Object.entries(property.properties)) {
          const isFieldRequired = requiredFields.includes(key);
          shapeEntries.push([key, jsonSchemaToZod(prop, isFieldRequired)]);
        }

        schema = z.object(Object.fromEntries(shapeEntries) as z.ZodRawShape);
      } else {
        schema = z.record(z.string(), z.unknown());
      }
      break;

    default:
      schema = z.unknown();
  }

  // Add description if available
  if (property.description) {
    schema = schema.describe(property.description);
  }

  // Handle default values
  if (property.default !== undefined) {
    schema = schema.default(property.default);
  }

  // Make optional if not required
  if (!isRequired) {
    schema = schema.optional();
  }

  return schema;
}
