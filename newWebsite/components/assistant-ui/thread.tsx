'use client';

import { ThreadPrimitive, ComposerPrimitive, MessagePrimitive } from '@assistant-ui/react';

function UserMessage() {
  return (
    <div className="mb-4 flex justify-end">
      <div className="max-w-[80%] rounded-lg bg-blue-600 px-4 py-2 text-white">
        <MessagePrimitive.Content />
      </div>
    </div>
  );
}

function AssistantMessage() {
  return (
    <div className="mb-4 flex justify-start">
      <div className="max-w-[80%] rounded-lg bg-gray-200 px-4 py-2 text-gray-900 dark:bg-gray-700 dark:text-white">
        <MessagePrimitive.Content />
      </div>
    </div>
  );
}

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex h-full flex-col">
      <ThreadPrimitive.Viewport className="flex h-full flex-col overflow-y-auto px-4 pt-8">
        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />

        <div className="sticky bottom-0 mt-4 flex w-full flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
          <ComposerPrimitive.Root className="w-full max-w-2xl">
            <ComposerPrimitive.Input
              placeholder="Type a message..."
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </ComposerPrimitive.Root>
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
}
