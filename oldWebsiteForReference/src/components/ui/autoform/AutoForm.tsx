import { FormProvider, useForm } from 'react-hook-form';
import type { ZodProvider } from '@autoform/zod';
import { AutoFormContent } from './AutoFormContent';
import type { ReactNode } from 'react';

interface AutoFormProps {
  schema: ZodProvider<any>;
  defaultValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  children?: ReactNode;
}

export function AutoForm({ schema, defaultValues, onSubmit, children }: AutoFormProps) {
  const form = useForm({
    defaultValues: defaultValues || {},
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data as Record<string, unknown>);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <AutoFormContent schema={schema} />
        {children}
      </form>
    </FormProvider>
  );
}
