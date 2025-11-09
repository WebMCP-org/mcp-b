'use client';

import { useWebMCP } from '@mcp-b/react-webmcp';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { AgenticIntelligence } from "@/components/agentic-intelligence";
import { Benefits } from "@/components/benefits";
import { CTA } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { FAQs } from "@/components/faqs";
import { Hero } from "@/components/hero";
import { HeroImage } from "@/components/hero-image";
import { HowItWorks } from "@/components/how-it-works";
import { LogoCloud } from "@/components/logo-cloud";
import { Security } from "@/components/security";
import { UseCases } from "@/components/use-cases";
import { useThemeTools, useScrollTools, useStorageTools } from "@/hooks/useWebMCPTools";

export default function EmbedPage() {
  const [heroHighlight, setHeroHighlight] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [customMessage, setCustomMessage] = useState<string>('');

  // Parent-child ready protocol
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'parent_ready') {
        console.log('[Embed] Parent is ready');
      }
    };
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'iframe_ready' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Register reusable tools
  useThemeTools();
  useScrollTools();
  useStorageTools();

  // Tool: Scroll to a specific section
  useWebMCP({
    name: 'scroll_to_section',
    description: 'Scroll the landing page to a specific section. Available sections: hero, features, how-it-works, use-cases, benefits, security, faqs, cta',
    inputSchema: {
      section: z.enum(['hero', 'features', 'how-it-works', 'use-cases', 'benefits', 'security', 'faqs', 'cta'])
        .describe('The section to scroll to') as any,
    },
    handler: async ({ section }) => {
      setCurrentSection(section);

      // Scroll logic based on section
      const sectionMap: Record<string, string> = {
        'hero': 'top',
        'features': 'logo-cloud',
        'how-it-works': 'how-it-works',
        'use-cases': 'use-cases',
        'benefits': 'benefits',
        'security': 'security',
        'faqs': 'faqs',
        'cta': 'cta',
      };

      const elementId = sectionMap[section];
      if (elementId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      return `Scrolled to ${section} section`;
    },
  });

  // Tool: Highlight the hero section
  useWebMCP({
    name: 'highlight_hero',
    description: 'Toggle highlighting of the hero section to draw attention to it',
    inputSchema: {
      enabled: z.boolean().describe('Whether to enable or disable highlighting') as any,
    },
    handler: async ({ enabled }) => {
      setHeroHighlight(enabled);
      return enabled ? 'Hero section highlighted' : 'Hero highlighting removed';
    },
  });

  // Tool: Show custom message overlay
  useWebMCP({
    name: 'show_message',
    description: 'Display a custom message overlay on the landing page',
    inputSchema: {
      message: z.string().describe('The message to display') as any,
    },
    handler: async ({ message }) => {
      setCustomMessage(message);
      setTimeout(() => setCustomMessage(''), 5000); // Auto-hide after 5s
      return `Message displayed: ${message}`;
    },
  });

  // Tool: Get current page state
  useWebMCP({
    name: 'get_page_state',
    description: 'Get information about the current state of the landing page',
    inputSchema: {},
    handler: async () => {
      return `Current section: ${currentSection}, Hero highlighted: ${heroHighlight}, Custom message: ${customMessage || 'none'}`;
    },
  });

  // Tool: Get page content by section
  useWebMCP({
    name: 'get_section_content',
    description: 'Get the text content from a specific section of the page',
    inputSchema: {
      section: z.enum(['hero', 'features', 'how-it-works', 'use-cases', 'benefits', 'security', 'faqs', 'cta'])
        .describe('The section to get content from'),
    },
    handler: async ({ section }) => {
      const sectionMap: Record<string, string> = {
        'hero': 'hero',
        'features': 'logo-cloud',
        'how-it-works': 'how-it-works',
        'use-cases': 'use-cases',
        'benefits': 'benefits',
        'security': 'security',
        'faqs': 'faqs',
        'cta': 'cta',
      };

      const elementId = sectionMap[section];
      const element = document.getElementById(elementId);

      if (!element) {
        return `Section ${section} not found`;
      }

      // Extract text content, clean up whitespace
      const textContent = element.innerText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');

      return `Content from ${section} section:\n\n${textContent}`;
    },
  });

  // Tool: Search page content
  useWebMCP({
    name: 'search_page',
    description: 'Search for specific text content anywhere on the landing page',
    inputSchema: {
      query: z.string().describe('The text to search for'),
    },
    handler: async ({ query }) => {
      const bodyText = document.body.innerText.toLowerCase();
      const queryLower = query.toLowerCase();

      if (bodyText.includes(queryLower)) {
        // Find the section containing the query
        const sections = ['hero', 'how-it-works', 'use-cases', 'benefits', 'security', 'faqs', 'cta'];
        const foundSections: string[] = [];

        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element && element.innerText.toLowerCase().includes(queryLower)) {
            foundSections.push(section);
          }
        });

        return foundSections.length > 0
          ? `Found "${query}" in sections: ${foundSections.join(', ')}`
          : `Found "${query}" on the page`;
      }

      return `"${query}" not found on the page`;
    },
  });

  // Tool: Get FAQ answers
  useWebMCP({
    name: 'get_faq_answer',
    description: 'Search for and retrieve answers from the FAQ section',
    inputSchema: {
      question: z.string().describe('The question or topic to search for in FAQs'),
    },
    handler: async ({ question }) => {
      const faqSection = document.getElementById('faqs');
      if (!faqSection) {
        return 'FAQ section not found';
      }

      const faqText = faqSection.innerText.toLowerCase();
      const queryLower = question.toLowerCase();

      if (faqText.includes(queryLower)) {
        // Get all FAQ items (this is a simple implementation)
        const faqContent = faqSection.innerText;
        return `FAQ content related to "${question}":\n\n${faqContent.substring(0, 500)}...`;
      }

      return `No FAQ found matching "${question}". Try asking about WebMCP features, security, or implementation.`;
    },
  });

  // Tool: Get all available sections
  useWebMCP({
    name: 'list_sections',
    description: 'Get a list of all available sections on the landing page',
    inputSchema: {},
    handler: async () => {
      const sections = [
        { id: 'hero', name: 'Hero', description: 'Main landing section with headline' },
        { id: 'features', name: 'Features', description: 'Key features and integrations' },
        { id: 'how-it-works', name: 'How It Works', description: 'Explanation of WebMCP functionality' },
        { id: 'use-cases', name: 'Use Cases', description: 'Real-world applications' },
        { id: 'benefits', name: 'Benefits', description: 'Advantages of using WebMCP' },
        { id: 'security', name: 'Security', description: 'Security features and considerations' },
        { id: 'faqs', name: 'FAQs', description: 'Frequently asked questions' },
        { id: 'cta', name: 'Call to Action', description: 'Get started section' },
      ];

      return sections.map(s => `${s.id}: ${s.name} - ${s.description}`).join('\n');
    },
  });

  // Tool: Get page metadata
  useWebMCP({
    name: 'get_page_info',
    description: 'Get metadata and general information about the current page',
    inputSchema: {},
    handler: async () => {
      return {
        title: document.title,
        url: window.location.href,
        currentSection,
        heroHighlighted: heroHighlight,
        hasCustomMessage: !!customMessage,
        pageHeight: document.body.scrollHeight,
        viewportHeight: window.innerHeight,
        scrollPosition: window.scrollY,
      };
    },
  });

  return (
    <main className="relative">
      {/* Custom message overlay */}
      {customMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-top">
          {customMessage}
        </div>
      )}

      <DivideX />
      <div id="hero" className={heroHighlight ? 'ring-4 ring-blue-500 rounded-lg transition-all' : ''}>
        <Hero />
      </div>
      <DivideX />
      <HeroImage />
      <DivideX />
      <div id="logo-cloud">
        <LogoCloud />
      </div>
      <DivideX />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <DivideX />
      <AgenticIntelligence />
      <DivideX />
      <div id="use-cases">
        <UseCases />
      </div>
      <DivideX />
      <div id="benefits">
        <Benefits />
      </div>
      <DivideX />
      <div id="security">
        <Security />
      </div>
      <DivideX />
      <div id="faqs">
        <FAQs />
      </div>
      <DivideX />
      <div id="cta">
        <CTA />
      </div>
      <DivideX />
    </main>
  );
}
