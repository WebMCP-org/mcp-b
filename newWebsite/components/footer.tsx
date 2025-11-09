import Link from "next/link";
import { Button } from "./button";
import { Container } from "./container";
import { Logo } from "./logo";
import { SubHeading } from "./subheading";
import { SendIcon } from "@/icons/bento-icons";
import { ContactHoverButton } from "./contact-button";

const highlightItems = [
  {
    label: "Spec status",
    value: "WebMCP incubation at the W3C Web ML Community Group",
  },
  {
    label: "What we ship",
    value: "Browser-native MCP bridge, transports & tooling",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/WebMCP-org/mcp-b",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/package/@mcp-b/transports",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
      </svg>
    ),
  },
  {
    label: "Chrome Extension",
    href: "https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" y1="8" x2="12" y2="8" />
        <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
        <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const product = [
    {
      title: "Playground",
      href: "/playground",
    },
    {
      title: "Chrome Extension",
      href: "https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Examples",
      href: "https://github.com/WebMCP-org/examples",
    },
    {
      title: "NPM Packages",
      href: "https://www.npmjs.com/package/@mcp-b/transports",
    },
  ];

  const resources = [
    {
      title: "Documentation",
      href: "https://docs.mcp-b.ai/introduction",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Changelog",
      href: "https://docs.mcp-b.ai/changelog",
    },
    {
      title: "Glossary",
      href: "https://docs.mcp-b.ai/concepts/glossary",
    },
  ];

  const company = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Careers",
      href: "/careers",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "GitHub",
      href: "https://github.com/WebMCP-org/mcp-b",
    },
  ];

  const legal = [
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      title: "Terms of Service",
      href: "/terms-of-service",
    },
    {
      title: "Cookie Policy",
      href: "/cookie-policy",
    },
  ];

  const navigationGroups = [
    { title: "Build with MCP-B", items: product },
    { title: "Resources", items: resources },
    { title: "Company", items: company },
    { title: "Legal", items: legal },
  ];

  return (
    <footer className="border-t border-divide/80 bg-white/60 dark:bg-black/40">
      <Container className="px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <SubHeading
              as="p"
              className="mt-4 max-w-xl !text-left text-base leading-relaxed text-gray-600 dark:text-gray-300"
            >
              MCP-B is the open-source bridge between navigator.modelContext and
              Anthropic&apos;s Model Context Protocol—built in the open with the
              W3C Web Machine Learning Community Group so AI agents can call
              your tools instead of scraping your UI.
            </SubHeading>
            <dl className="mt-6 grid grid-cols-1 gap-4 text-sm text-gray-500 sm:grid-cols-2">
              {highlightItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-divide/80 p-4 dark:border-white/10"
                >
                  <dt className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-base font-medium text-gray-900 dark:text-gray-100">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                as={Link}
                href="https://docs.mcp-b.ai/introduction"
                className="px-5"
              >
                Read the docs
              </Button>
              <Button
                as={Link}
                href="https://github.com/WebMCP-org/mcp-b"
                variant="secondary"
                className="px-5"
                target="_blank"
                rel="noreferrer"
              >
                Star on GitHub
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-2">
              {navigationGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-tight text-gray-600 dark:text-gray-300">
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      href={item.href}
                      key={item.title}
                      className="text-footer-link text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-tight text-gray-600 dark:text-gray-300">
              Weekly change notes
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Short summaries about new transports, desktop bridges, and
              real-world WebMCP launches. No spam, ever.
            </p>
            <div className="mt-4 flex w-full items-center rounded-2xl border border-gray-300 bg-gray-200/70 p-1 dark:border-neutral-700 dark:bg-neutral-900/60">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              />
              <Button
                className="my-0 flex size-9 shrink-0 items-center justify-center rounded-xl px-0 py-0 text-center"
                aria-label="Join the newsletter"
                type="button"
              >
                <SendIcon />
              </Button>
            </div>
            <SubHeading
              as="p"
              className="mt-4 !text-left text-sm text-gray-600 dark:text-gray-400"
            >
              Get product deep dives, W3C meeting notes, and behind-the-scenes
              updates from the MCP-B team.
            </SubHeading>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-6 border-t border-divide/70 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-footer-link text-sm">
            © 2025 Kukumis Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ContactHoverButton className="order-last w-full justify-center md:order-none md:w-auto" />
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-footer-link transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                aria-label={item.label}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="sr-only">{item.label}</span>
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
