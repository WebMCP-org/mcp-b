import { useFormContext } from 'react-hook-form';
import type { ZodProvider } from '@autoform/zod';
import { Input } from '../input';
import { Label } from '../label';
import { Checkbox } from '../checkbox';
import { Textarea } from '../textarea';
import type { z } from 'zod';

interface AutoFormContentProps {
  schema: ZodProvider<any>;
}

export function AutoFormContent({ schema }: AutoFormContentProps) {
  const { register } = useFormContext();

  // Get the Zod schema from the provider
  const zodSchema = schema.getSchema();

  if (!zodSchema || zodSchema._def.typeName !== 'ZodObject') {
    return null;
  }

  const shape = (zodSchema as z.ZodObject<any>).shape;
  const fields = Object.keys(shape);

  return (
    <div className="space-y-3">
      {fields.map((fieldName) => {
        const fieldSchema = shape[fieldName];
        const fieldType = fieldSchema._def.typeName;

        // Check if field is optional
        const isOptional = fieldSchema.isOptional();

        return (
          <div key={fieldName} className="space-y-1.5">
            <Label htmlFor={fieldName} className="text-xs">
              {humanizeFieldName(fieldName)}
              {!isOptional && <span className="text-destructive ml-0.5">*</span>}
            </Label>

            {fieldType === 'ZodBoolean' ? (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={fieldName}
                  {...register(fieldName)}
                />
              </div>
            ) : fieldType === 'ZodString' && fieldSchema._def.checks?.some((c: any) => c.kind === 'min' && c.value > 100) ? (
              <Textarea
                id={fieldName}
                {...register(fieldName)}
                className="text-xs"
              />
            ) : (
              <Input
                id={fieldName}
                type={fieldType === 'ZodNumber' ? 'number' : 'text'}
                {...register(fieldName, {
                  valueAsNumber: fieldType === 'ZodNumber',
                })}
                className="text-xs"
              />
            )}

            {fieldSchema.description && (
              <p className="text-[10px] text-muted-foreground/70">
                {fieldSchema.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function humanizeFieldName(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}
