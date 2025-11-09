import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/context/theme-provider";
import { getSEOTags } from "@/lib/seo";
import config from "@/config";

export const metadata: Metadata = {
  ...getSEOTags({
    title: "MCP-B | Model Context Protocol for the Browser",
    description: config.websiteDescription,
    keywords: [
      "Model Context Protocol",
      "MCP",
      "Browser",
      "AI Agents",
      "Web Standards",
      "AI-native browsers",
      "JavaScript protocol",
      "Agentic browsers",
    ],
  }),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/logos/logo-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logos/logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logos/logo-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/images/logos/logo-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-primary h-full bg-gray-50 [--pattern-fg:var(--color-charcoal-900)]/10 dark:bg-black dark:[--pattern-fg:var(--color-neutral-100)]/30">
        <ThemeProvider attribute="class" defaultTheme="system">
          {/* Background base layer */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 bg-white dark:bg-black"
          />
          {/* Decorative gradient blobs/splotches */}
          <div
            aria-hidden
            className="pointer-events-none fixed -top-48 left-1/4 h-[32rem] w-[32rem] bg-gradient-to-br from-[#1F5EFF]/20 to-[#4B7BFF]/15 rounded-full blur-3xl z-[1]"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed -bottom-48 right-1/3 h-[36rem] w-[36rem] bg-gradient-to-br from-[#4B7BFF]/15 to-[#1F5EFF]/20 rounded-full blur-3xl z-[1]"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed top-1/2 -left-32 h-[28rem] w-[28rem] bg-gradient-to-br from-[#1F5EFF]/15 to-[#1449CC]/10 rounded-full blur-3xl z-[1]"
          />
          {/* Global subtle background gradient overlay on top */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[2]"
            style={{
              background:
                'radial-gradient(1200px 800px at 15% 0%, hsl(var(--color-brand-hsl) / 0.10), transparent 60%), radial-gradient(900px 600px at 85% 100%, hsl(var(--color-brand-hsl) / 0.08), transparent 60%), radial-gradient(800px 500px at 50% 50%, hsl(var(--color-brand-hsl) / 0.04), transparent 70%)',
              filter: 'saturate(110%)',
            }}
          />
          <main className="relative z-10 h-full bg-transparent antialiased">
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
