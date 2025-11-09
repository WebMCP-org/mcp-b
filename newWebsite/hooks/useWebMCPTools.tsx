'use client';

import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';

/**
 * Reusable WebMCP tools that can be used across different pages
 */

/**
 * Theme control tool - allows AI agents to toggle dark/light mode
 */
export function useThemeTools() {
  useWebMCP({
    name: 'set_theme',
    description: 'Change the website theme (dark or light mode)',
    inputSchema: {
      theme: z.enum(['light', 'dark', 'system']).describe('The theme to apply'),
    },
    handler: async ({ theme }) => {
      // Get the theme from the data-theme attribute or use the theme context
      const htmlElement = document.documentElement;

      if (theme === 'system') {
        localStorage.removeItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', systemTheme);
        htmlElement.classList.toggle('dark', systemTheme === 'dark');
        return `Theme set to system preference (currently ${systemTheme})`;
      } else {
        localStorage.setItem('theme', theme);
        htmlElement.setAttribute('data-theme', theme);
        htmlElement.classList.toggle('dark', theme === 'dark');
        return `Theme changed to ${theme} mode`;
      }
    },
  });

  useWebMCP({
    name: 'get_theme',
    description: 'Get the current theme setting',
    inputSchema: {},
    handler: async () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme') ||
                          (htmlElement.classList.contains('dark') ? 'dark' : 'light');
      const storedTheme = localStorage.getItem('theme');

      return {
        currentTheme,
        storedPreference: storedTheme || 'system',
        isDark: htmlElement.classList.contains('dark'),
      };
    },
  });
}

/**
 * Navigation tools - for navigating between pages
 */
export function useNavigationTools() {
  useWebMCP({
    name: 'navigate_to',
    description: 'Navigate to a different page on the website',
    inputSchema: {
      page: z.enum([
        'home',
        'about',
        'pricing',
        'blog',
        'contact',
        'sign-up',
        'sign-in',
        'careers',
      ]).describe('The page to navigate to'),
    },
    handler: async ({ page }) => {
      const pageMap: Record<string, string> = {
        'home': '/',
        'about': '/about',
        'pricing': '/pricing',
        'blog': '/blog',
        'contact': '/contact',
        'sign-up': '/sign-up',
        'sign-in': '/sign-in',
        'careers': '/careers',
      };

      const url = pageMap[page];
      window.location.href = url;
      return `Navigating to ${page}`;
    },
  });

  useWebMCP({
    name: 'get_current_page',
    description: 'Get information about the current page',
    inputSchema: {},
    handler: async () => {
      return {
        url: window.location.href,
        pathname: window.location.pathname,
        title: document.title,
        referrer: document.referrer || 'direct',
      };
    },
  });
}

/**
 * Form interaction tools - for filling and submitting forms
 */
export function useContactFormTools() {
  useWebMCP({
    name: 'fill_contact_form',
    description: 'Fill out the contact form with provided information',
    inputSchema: {
      name: z.string().optional().describe('Name of the person'),
      email: z.string().email().optional().describe('Email address'),
      message: z.string().optional().describe('Message to send'),
    },
    handler: async ({ name, email, message }) => {
      const actions: string[] = [];

      if (name) {
        const nameInput = document.querySelector<HTMLInputElement>('input[name="name"], input[id="name"]');
        if (nameInput) {
          nameInput.value = name;
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
          actions.push('name filled');
        }
      }

      if (email) {
        const emailInput = document.querySelector<HTMLInputElement>('input[name="email"], input[id="email"], input[type="email"]');
        if (emailInput) {
          emailInput.value = email;
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
          actions.push('email filled');
        }
      }

      if (message) {
        const messageInput = document.querySelector<HTMLTextAreaElement>('textarea[name="message"], textarea[id="message"]');
        if (messageInput) {
          messageInput.value = message;
          messageInput.dispatchEvent(new Event('input', { bubbles: true }));
          actions.push('message filled');
        }
      }

      return actions.length > 0
        ? `Contact form fields updated: ${actions.join(', ')}`
        : 'No form fields found to fill';
    },
  });

  useWebMCP({
    name: 'get_form_fields',
    description: 'Get information about available form fields on the current page',
    inputSchema: {},
    handler: async () => {
      const forms = document.querySelectorAll('form');
      const formInfo: Array<{ formIndex: number; fields: Array<{ name: string; type: string; label?: string }> }> = [];

      forms.forEach((form, index) => {
        const inputs = form.querySelectorAll('input, textarea, select');
        const fields: Array<{ name: string; type: string; label?: string }> = [];

        inputs.forEach(input => {
          const name = input.getAttribute('name') || input.getAttribute('id') || 'unknown';
          const type = input.getAttribute('type') || input.tagName.toLowerCase();

          // Try to find associated label
          let label: string | undefined;
          const id = input.getAttribute('id');
          if (id) {
            const labelElement = document.querySelector(`label[for="${id}"]`);
            label = labelElement?.textContent?.trim();
          }

          fields.push({ name, type, label });
        });

        formInfo.push({ formIndex: index, fields });
      });

      return formInfo.length > 0
        ? { formsFound: forms.length, forms: formInfo }
        : 'No forms found on this page';
    },
  });
}

/**
 * Scroll and viewport tools
 */
export function useScrollTools() {
  useWebMCP({
    name: 'scroll_to_top',
    description: 'Scroll to the top of the page',
    inputSchema: {},
    handler: async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return 'Scrolled to top';
    },
  });

  useWebMCP({
    name: 'scroll_to_bottom',
    description: 'Scroll to the bottom of the page',
    inputSchema: {},
    handler: async () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return 'Scrolled to bottom';
    },
  });

  useWebMCP({
    name: 'get_scroll_info',
    description: 'Get information about the current scroll position and page dimensions',
    inputSchema: {},
    handler: async () => {
      return {
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        pageHeight: document.body.scrollHeight,
        pageWidth: document.body.scrollWidth,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        scrollPercentage: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
      };
    },
  });
}

/**
 * Analytics and tracking tools (for demonstration)
 */
export function useAnalyticsTools() {
  useWebMCP({
    name: 'track_event',
    description: 'Track a custom analytics event',
    inputSchema: {
      eventName: z.string().describe('Name of the event to track'),
      properties: z.record(z.string(), z.unknown()).optional().describe('Additional properties for the event'),
    },
    handler: async ({ eventName, properties }) => {
      // This is a placeholder - integrate with your actual analytics service
      console.log('Analytics Event:', eventName, properties);

      // You could integrate with services like:
      // - Google Analytics
      // - Mixpanel
      // - PostHog
      // - Plausible

      return {
        tracked: true,
        eventName,
        timestamp: new Date().toISOString(),
        properties,
      };
    },
  });
}

/**
 * Local storage tools - for managing user preferences
 */
export function useStorageTools() {
  useWebMCP({
    name: 'set_preference',
    description: 'Save a user preference to local storage',
    inputSchema: {
      key: z.string().describe('The preference key'),
      value: z.string().describe('The preference value'),
    },
    handler: async ({ key, value }) => {
      try {
        localStorage.setItem(`webmcp_${key}`, value);
        return `Preference "${key}" saved`;
      } catch (error) {
        return `Failed to save preference: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    },
  });

  useWebMCP({
    name: 'get_preference',
    description: 'Retrieve a user preference from local storage',
    inputSchema: {
      key: z.string().describe('The preference key to retrieve'),
    },
    handler: async ({ key }) => {
      const value = localStorage.getItem(`webmcp_${key}`);
      return value !== null
        ? { key, value, found: true }
        : { key, found: false, message: 'Preference not found' };
    },
  });

  useWebMCP({
    name: 'list_preferences',
    description: 'List all stored WebMCP preferences',
    inputSchema: {},
    handler: async () => {
      const preferences: Record<string, string> = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('webmcp_')) {
          const cleanKey = key.replace('webmcp_', '');
          const value = localStorage.getItem(key);
          if (value) {
            preferences[cleanKey] = value;
          }
        }
      }

      return Object.keys(preferences).length > 0
        ? { preferences }
        : 'No preferences stored';
    },
  });
}
