'use client';

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from '@assistant-ui/react';
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
} from 'lucide-react';
import { type FC } from 'react';

import { MarkdownText } from '@/components/assistant-ui/markdown-text';
import { TooltipIconButton } from '@/components/assistant-ui/tooltip-icon-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="relative h-full w-full overflow-hidden bg-background text-foreground"
      style={{
        ['--thread-max-width' as string]: '48rem',
      }}
    >
      <ThreadPrimitive.Viewport
        className="flex h-full flex-1 flex-col items-center overflow-y-auto scroll-smooth px-3 pb-44 pt-6 sm:px-6 sm:pt-8 md:px-8 md:pt-10"
      >
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            EditComposer,
            AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-8 flex-grow" />
        </ThreadPrimitive.If>
      </ThreadPrimitive.Viewport>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center px-3 pb-4 pt-6 sm:px-6 sm:pt-8">
        <div className="pointer-events-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-3">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </div>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="secondary"
        className="self-end size-11 rounded-full border border-border/60 bg-background/80 shadow-sm backdrop-blur transition-transform disabled:invisible"
      >
        <ArrowDownIcon className="size-4" />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex w-full max-w-[var(--thread-max-width)] flex-col items-center gap-4 pb-6 pt-8 text-center sm:gap-6 sm:pb-8 sm:pt-12 md:gap-8 md:pt-16">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
            Control the landing page
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Try asking to scroll to a section, highlight the hero, or get the page state
          </p>
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 flex w-full flex-col gap-1.5 rounded-xl border border-border/60 bg-background shadow-xl backdrop-blur-sm transition-all ease-in-out sm:gap-2 sm:rounded-2xl">
      <div className="flex items-end gap-1.5 px-3 pt-3 pb-2 sm:gap-2 sm:px-4 sm:pt-4 sm:pb-3">
        <ComposerPrimitive.Input
          rows={1}
          autoFocus
          placeholder="Type your message..."
          className="placeholder:text-muted-foreground max-h-48 min-h-9 flex-1 resize-none border-none bg-transparent py-2 text-base leading-relaxed outline-none disabled:cursor-not-allowed sm:min-h-10 sm:py-2.5"
          enterKeyHint="send"
        />
        <ComposerAction />
      </div>
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="my-2 size-11 p-2.5 transition-opacity ease-in"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="my-2 size-11 p-2.5 transition-opacity ease-in"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid w-full max-w-[var(--thread-max-width)] auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-1.5 py-2.5 sm:gap-y-2 sm:py-4 [&:where(>*)]:col-start-2">
      <UserActionBar />

      <div className="col-start-2 row-start-2">
        <div className="bg-muted text-foreground max-w-[calc(var(--thread-max-width)*0.8)] rounded-2xl px-3 py-2 text-sm sm:rounded-3xl sm:px-5 sm:py-2.5 sm:text-base">
          <MessagePrimitive.Content />
        </div>
      </div>

      <BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="col-start-1 row-start-2 mt-2.5 mr-3 flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className="bg-muted my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl">
      <ComposerPrimitive.Input
        className="text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none"
        enterKeyHint="send"
      />

      <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
        <ComposerPrimitive.Cancel asChild>
          <Button variant="ghost">Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative grid w-full max-w-[var(--thread-max-width)] grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] py-2.5 sm:py-4">
      <div className="text-foreground col-span-2 col-start-2 row-start-1 my-1 max-w-[calc(var(--thread-max-width)*0.8)] text-sm leading-6 sm:my-1.5 sm:text-base sm:leading-7">
        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        <MessageError />
      </div>

      <AssistantActionBar />

      <BranchPicker className="col-start-2 row-start-2 mr-2 -ml-2" />
    </MessagePrimitive.Root>
  );
};

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="border-destructive bg-destructive/10 dark:bg-destructive/5 text-destructive mt-2 rounded-md border p-3 text-sm dark:text-red-200">
        <ErrorPrimitive.Message className="line-clamp-2" />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="text-muted-foreground data-[floating]:bg-background col-start-3 row-start-2 -ml-1 flex gap-1 data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({ className, ...rest }) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn('text-muted-foreground inline-flex items-center text-xs', className)}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <title>Stop</title>
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  );
};
