import { lazy, Suspense } from 'react';

// Lazy load the entire CodeBlock component
const CodeBlock = lazy(() => import('./CodeBlock'));

export const LazyCodeBlock = ({ code, language }: { code: string; language: string }) => {
  return (
    <Suspense fallback={
      <div className="bg-zinc-900 rounded-lg p-4 min-h-[100px] animate-pulse border border-zinc-800">
        <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-zinc-700 rounded w-1/2" />
      </div>
    }>
      <CodeBlock code={code} language={language} />
    </Suspense>
  );
};