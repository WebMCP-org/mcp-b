/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="@mdx-js/react" />

/**
 * Type declarations for MDX files
 * Allows TypeScript to recognize .mdx files as valid modules
 */
declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  
  /**
   * Default export from MDX files is a React component
   * that accepts MDX props (including custom components)
   */
  export default function MDXContent(props: MDXProps): JSX.Element
}
