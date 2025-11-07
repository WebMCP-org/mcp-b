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

  // Tool: Scroll to a specific section
  useWebMCP({
    name: 'scroll_to_section',
    description: 'Scroll the landing page to a specific section. Available sections: hero, features, how-it-works, use-cases, benefits, security, faqs, cta',
    inputSchema: {
      section: z.enum(['hero', 'features', 'how-it-works', 'use-cases', 'benefits', 'security', 'faqs', 'cta'])
        .describe('The section to scroll to'),
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
      enabled: z.boolean().describe('Whether to enable or disable highlighting'),
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
      message: z.string().describe('The message to display'),
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
