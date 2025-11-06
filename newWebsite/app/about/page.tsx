import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { Heading } from "@/components/heading";
import { InformationBlock } from "@/components/information-block";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { SectionHeading } from "@/components/seciton-heading";
import { SubHeading } from "@/components/subheading";
import { Testimonials } from "@/components/testimonials";
import { careers } from "@/constants/careers";
import { founders } from "@/constants/founders";
import { LinkedInIcon } from "@/icons/general";

import { getSEOTags } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export const metadata = getSEOTags({
  title: "About Us - MCP-B | Browser Model Context Protocol",
  description:
    "MCP-B brings the Model Context Protocol to browsers, enabling websites to expose tools and context to AI agents through a W3C-standard navigator.modelContext API. Open-source implementation for building AI-accessible web applications.",
});

export default function AboutPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-10 pb-10 md:px-8 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="About MCP-B" />
            <Heading className="mt-4 text-left">
              Making Websites AI-Accessible Through Open Standards
            </Heading>
            <SubHeading className="mt-6 mr-auto text-left">
              MCP-B (Browser Model Context Protocol) is an{" "}
              <a
                href="https://github.com/MiguelsPizza/WebMCP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                open-source implementation
              </a>{" "}
              that brings the Model Context Protocol to browsers. We enable websites
              to expose tools and context to AI agents through a W3C-standard API,
              making web applications directly accessible to AI without automation
              or screen scraping.
              <br /> <br />
              Instead of AI agents navigating websites like humans—clicking buttons
              and reading screens—MCP-B lets websites expose structured function calls
              that agents can invoke directly. This provides deterministic, reliable,
              and permission-based interactions between AI and the web.
              <br /> <br />
              Today, MCP-B powers AI integrations for web applications, browser
              extensions, and local AI assistants like Claude Desktop. Whether you're
              building AI copilots, automation tools, or intelligent web apps, MCP-B
              provides the protocol layer for seamless AI-web integration.
            </SubHeading>
          </div>
          <div className="border-divide rounded-3xl border p-2">
            <Image
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              width={1000}
              height={1000}
              className="h-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="mt-20 flex w-full flex-col items-center lg:flex-row">
          <h2 className="mb-4 min-w-40 text-center font-mono text-sm tracking-tight text-neutral-500 uppercase lg:mb-0 lg:text-left dark:text-neutral-400">
            Integration Support
          </h2>
          <div className="grid w-full grid-cols-2 items-center gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                React 18+
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                React Hooks
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                TypeScript
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Full Type Safety
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Chrome
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Extension APIs
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Claude
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Desktop & Code
              </p>
            </div>
          </div>
        </div>
      </Container>
      {/* <Testimonials /> */}
      <Container className="border-divide border-x border-t p-4 py-20 md:px-8 md:py-40">
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="How It Works" />
            <SectionHeading className="mt-4 text-left">
              A Better Approach to Browser AI
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto text-left">
              MCP-B provides three core capabilities that transform how AI agents
              interact with web applications:
              <br /> <br />
              <strong>
                1.{" "}
                <a
                  href="https://docs.mcp-b.ai/concepts/tool-registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Tool Registration
                </a>{" "}
                via navigator.modelContext
              </strong>
              <br />
              Websites register JavaScript functions as AI-accessible tools using
              the{" "}
              <a
                href="https://docs.mcp-b.ai/concepts/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                W3C Web Model Context API
              </a>
              . These tools appear in an agent&apos;s context, ready to be called
              with structured parameters.
              <br /> <br />
              <strong>
                2.{" "}
                <a
                  href="https://docs.mcp-b.ai/concepts/transports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Multiple Transport Layers
                </a>
              </strong>
              <br />
              MCP-B supports TabServerTransport for browser tabs, IframeTransport
              for embedded apps, and ExtensionServerTransport for Chrome extensions.
              This enables AI communication across different browser contexts.
              <br /> <br />
              <strong>
                3.{" "}
                <a
                  href="https://docs.mcp-b.ai/native-host-setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Native Desktop Integration
                </a>
              </strong>
              <br />
              The{" "}
              <a
                href="https://docs.mcp-b.ai/extension"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                MCP-B browser extension
              </a>{" "}
              bridges web tools to local AI clients like Claude Desktop and Claude
              Code through HTTP-based MCP protocol, enabling desktop AI assistants
              to interact with browser-based tools.
            </SubHeading>
            <div className="divide-divide mt-8 grid grid-cols-3 gap-6">
              <MetricBlock value="62+" label="Extension APIs" />
              <MetricBlock value="6+" label="NPM Packages" />
              <MetricBlock value="100%" label="Open Source" />
            </div>
          </div>
          <InformationBlock />
        </div>
      </Container>
      {/* <DivideX />
      <Container className="border-divide flex flex-col items-center border-x py-16">
        <Badge text="Core Architecture" />
        <SectionHeading className="mt-4">
          Built on Open Standards
        </SectionHeading>
        <SubHeading className="mx-auto mt-6 max-w-lg px-4">
          MCP-B is built on the Model Context Protocol and W3C Web Model Context
          API specifications, ensuring compatibility, extensibility, and
          long-term standardization
        </SubHeading>
        <div className="mt-12 grid w-full grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {founders.map((founder) => (
            <div
              className="group relative h-60 overflow-hidden rounded-2xl md:h-100"
              key={founder.name + founder.title}
            >
              <Image
                src={founder.src}
                alt={founder.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-top"
              />
              <ProgressiveBlur
                className="pointer-events-none absolute bottom-0 left-0 hidden h-[30%] w-full transition-all duration-200 group-hover:block"
                blurIntensity={2}
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-black/80 px-4 py-2">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-neutral-300">{founder.title}</p>
                </div>
                <a
                  href={founder.url}
                  target="_blank"
                  className="cursor-pointer"
                >
                  <LinkedInIcon className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <DivideX /> */}
      <Container className="border-divide flex flex-col items-center border-x border-b pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-20">
            <Badge text="Ecosystem" />
            <SectionHeading className="mt-4 text-left">
              Comprehensive NPM <br />
              Package Ecosystem
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              MCP-B provides a complete suite of npm packages for every use case—from
              React hooks to Chrome extension APIs. Each package is TypeScript-native
              with comprehensive documentation and examples.
            </SubHeading>
            <h2 className="mt-8 text-left font-mono text-sm tracking-tight text-neutral-500 uppercase dark:text-neutral-400">
              Core Packages
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://www.npmjs.com/package/@mcp-b/global"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-brand dark:border-neutral-800 dark:hover:border-brand"
              >
                <code className="text-sm font-mono text-brand">@mcp-b/global</code>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  W3C Web Model Context API polyfill →
                </p>
              </a>
              <a
                href="https://www.npmjs.com/package/@mcp-b/react-webmcp"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-brand dark:border-neutral-800 dark:hover:border-brand"
              >
                <code className="text-sm font-mono text-brand">
                  @mcp-b/react-webmcp
                </code>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  React hooks with automatic lifecycle management →
                </p>
              </a>
              <a
                href="https://www.npmjs.com/package/@mcp-b/transports"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-brand dark:border-neutral-800 dark:hover:border-brand"
              >
                <code className="text-sm font-mono text-brand">@mcp-b/transports</code>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Browser transport implementations →
                </p>
              </a>
              <a
                href="https://www.npmjs.com/package/@mcp-b/extension-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-brand dark:border-neutral-800 dark:hover:border-brand"
              >
                <code className="text-sm font-mono text-brand">
                  @mcp-b/extension-tools
                </code>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  62+ Chrome Extension API wrappers →
                </p>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-20">
            <Badge text="Use Cases" />
            <SectionHeading className="mt-4 text-left">
              What You Can Build <br />
              with MCP-B
            </SectionHeading>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  <a
                    href="https://docs.mcp-b.ai/ai-frameworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    AI Copilots in Web Apps →
                  </a>
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Integrate Assistant-UI or AG-UI with your React app and expose
                  application-specific tools for intelligent assistance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  <a
                    href="https://docs.mcp-b.ai/advanced"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    Browser Automation →
                  </a>
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Build Chrome extensions that AI agents can control, enabling
                  sophisticated browser automation through function calls.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  <a
                    href="https://docs.mcp-b.ai/native-host-setup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    Desktop AI Integration →
                  </a>
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Connect your web tools to Claude Desktop and Claude Code through
                  the MCP-B extension&apos;s native host bridge.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  <a
                    href="https://docs.mcp-b.ai/concepts/mcp-ui-integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    Multi-Tab Communication →
                  </a>
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Coordinate AI workflows across multiple browser tabs with
                  TabServerTransport for complex orchestration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <DivideX />
      <Container className="border-divide border-x p-4 py-20 md:px-8 md:py-40">
        <div className="flex flex-col items-center">
          <Badge text="Resources" />
          <SectionHeading className="mt-4 text-center">
            Explore the Ecosystem
          </SectionHeading>
          <SubHeading className="mx-auto mt-6 max-w-2xl px-4 text-center">
            Dive deeper into MCP-B with our comprehensive resources, from
            technical specifications to working examples
          </SubHeading>
          <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://github.com/MiguelsPizza/WebMCP"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-neutral-200 p-6 transition-all hover:border-brand hover:shadow-lg dark:border-neutral-800 dark:hover:border-brand"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10">
                <svg
                  className="h-6 w-6 text-brand"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand dark:text-neutral-100">
                Explainer Repository →
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Deep dive into the technical specifications, architecture
                decisions, and design philosophy behind MCP-B
              </p>
            </a>
            <a
              href="https://github.com/WebMCP-org/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-neutral-200 p-6 transition-all hover:border-brand hover:shadow-lg dark:border-neutral-800 dark:hover:border-brand"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10">
                <svg
                  className="h-6 w-6 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand dark:text-neutral-100">
                Examples Repository →
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Production-ready code examples for React, vanilla JS, Chrome
                extensions, and MCP-UI integrations
              </p>
            </a>
            <a
              href="https://docs.mcp-b.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-neutral-200 p-6 transition-all hover:border-brand hover:shadow-lg dark:border-neutral-800 dark:hover:border-brand"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10">
                <svg
                  className="h-6 w-6 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand dark:text-neutral-100">
                Documentation →
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Complete guides, API references, tutorials, and best practices
                for building with MCP-B
              </p>
            </a>
          </div>
        </div>
      </Container>
      <CTA />
      <DivideX />
    </main>
  );
}

const MetricBlock = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h3 className="text-charcoal-700 text-3xl font-medium dark:text-neutral-100">
        {value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-neutral-400">{label}</p>
    </div>
  );
};
