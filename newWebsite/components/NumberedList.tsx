import { ReactNode } from 'react'

interface NumberedListItem {
  content: ReactNode
}

interface NumberedListProps {
  items: NumberedListItem[]
  className?: string
  variant?: 'dark' | 'light'
}

/**
 * A styled numbered list component for step-by-step explanations
 * Features:
 * - Two variants: dark (zinc) and light (purple gradient)
 * - Circular numbered badges
 * - Responsive spacing and text sizes
 * - Support for inline code elements
 */
export function NumberedList({ items, className = '', variant = 'dark' }: NumberedListProps) {
  const isDark = variant === 'dark'

  const containerClasses = isDark
    ? 'bg-zinc-900 border border-zinc-800'
    : 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20'

  const badgeClasses = isDark
    ? 'w-5 h-5 sm:w-6 sm:h-6 bg-zinc-700 text-zinc-400 font-mono text-xs'
    : 'w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white font-semibold text-sm'

  const textClasses = isDark
    ? 'text-zinc-300 pt-0.5 text-sm sm:text-base'
    : 'text-foreground text-sm sm:text-base'

  const gapClasses = isDark
    ? 'gap-3 sm:gap-4'
    : 'gap-2 sm:gap-3'

  return (
    <div className={`${containerClasses} rounded-xl p-4 sm:p-8 my-6 sm:my-8 not-prose ${className}`}>
      <ol className="space-y-3 sm:space-y-4 list-none ml-0 pl-0 text-left">
        {items.map((item, index) => (
          <li key={index} className={`grid grid-cols-[auto_1fr] ${gapClasses} items-start text-left`}>
            <span className={`${badgeClasses} rounded-full flex items-center justify-center flex-shrink-0`}>
              {index + 1}
            </span>
            <div className={`${textClasses} text-left`}>
              {item.content}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/**
 * Helper component for inline code within NumberedList items
 */
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono bg-zinc-800 text-amber-400 px-1 sm:px-1.5 py-0.5 rounded-md text-xs sm:text-sm break-all whitespace-pre-wrap">
      {children}
    </code>
  )
}
