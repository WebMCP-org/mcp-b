/**
 * Shared types for assistant-ui tool handling
 */

/**
 * Tool call status from @assistant-ui/react
 * Represents the current state of a tool execution
 *
 * This type is compatible with the ToolCallMessagePart status from assistant-ui
 */
export type ToolCallStatus =
  | {
      readonly type: 'running';
    }
  | {
      readonly type: 'complete';
    }
  | {
      readonly type: 'incomplete';
      readonly reason: 'error' | 'cancelled' | 'other' | 'length' | 'content-filter';
      readonly error?: unknown;
    }
  | {
      readonly type: 'requires-action';
      readonly reason: string;
    };
