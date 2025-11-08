'use client';

import { Layout, MessageSquare } from 'lucide-react';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type MobileView = 'iframe' | 'chat';

interface MobileViewToggleProps {
  view: MobileView;
  onViewChange: (view: MobileView) => void;
  className?: string;
}

/**
 * Toggle button for switching between iframe and chat views on mobile
 */
export const MobileViewToggle: FC<MobileViewToggleProps> = ({ view, onViewChange, className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 p-1 bg-muted rounded-lg border border-border',
        className
      )}
    >
      <Button
        variant={view === 'iframe' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('iframe')}
        className={cn(
          'flex items-center gap-2 flex-1',
          view === 'iframe' ? 'bg-background shadow-sm' : ''
        )}
      >
        <Layout className="h-4 w-4" />
        <span className="text-sm">Preview</span>
      </Button>
      <Button
        variant={view === 'chat' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('chat')}
        className={cn(
          'flex items-center gap-2 flex-1',
          view === 'chat' ? 'bg-background shadow-sm' : ''
        )}
      >
        <MessageSquare className="h-4 w-4" />
        <span className="text-sm">Chat</span>
      </Button>
    </div>
  );
};
