import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Chrome,
  Code2,
  ExternalLink,
  Eye,
  FileCode,
  GitBranch,
  Globe,
  Lock,
  Network,
  PlayCircle,
  Shield,
  Sparkles,
  Users,
  Workflow,
  Zap,
  Bot,
  ShoppingCart,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MP4 from '../assets/Landing page video.mp4';
import WEBM from '../assets/Landing page video.webm';
import { LazyCodeBlock as CodeBlock } from '../components/CodeBlockLazy';
import { ShaderBackground } from '../components/ShaderBackground';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const Route = createFileRoute('/')({
  meta: () => [
    { title: 'MCP-B — Browser Model Context Protocol' },
    {
      name: 'description',
      content:
        'Bring the Model Context Protocol (MCP) to the browser, enabling web apps to safely expose tools and context to AI agents using the Model Context Protocol.',
    },
    {
      name: 'keywords',
      content: 'MCP, Model Context Protocol, Browser, AI, Automation, Chrome Extension, Web APIs',
    },
    { name: 'robots', content: 'index,follow' },
    { name: 'theme-color', content: '#2563eb' }, /* blue-600 */
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'MCP-B — Browser Model Context Protocol' },
    {
      property: 'og:description',
      content:
        'Bring the Model Context Protocol (MCP) to the browser, enabling web apps to safely expose tools and context to AI agents.',
    },
    { property: 'og:image', content: '/images/logos/logo-512.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'MCP-B — Browser Model Context Protocol' },
    {
      name: 'twitter:description',
      content:
        'Bring the Model Context Protocol (MCP) to the browser, enabling web apps to safely expose tools and context to AI agents.',
    },
    { name: 'twitter:image', content: '/images/logos/logo-512.png' },
  ],
  component: IndexRoute,
});

// CodeBlock component is now lazy loaded from components/CodeBlockLazy

// Lazy Video Component with Intersection Observer
const LazyVideo = ({
  src,
  srcWebM,
  poster,
  className,
}: {
  src: string;
  srcWebM?: string;
  poster: string;
  className: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Set loading to false if video is already in view and loaded
    if (isInView && videoRef.current?.readyState === 4) {
      setIsLoading(false);
    }
  }, [isInView]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted/20`}>
        <div className="text-center p-8">
          <PlayCircle className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />
          <p className="text-sm text-muted-foreground">Unable to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse z-10">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-muted/30 mb-2">
              <PlayCircle className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground">Loading video...</p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay={isInView}
        muted
        loop
        playsInline
        className={`${className} ${isLoading && isInView ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        poster={poster}
        preload={isInView ? 'auto' : 'none'}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onError={handleError}
      >
        {isInView && (
          <>
            {srcWebM && <source src={srcWebM} type="video/webm" />}
            <source src={src} type="video/mp4" />
          </>
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Simple right-column preview that echoes the reference site's
// dark mock with a live-capture feel
function CaptureMock() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/20 to-transparent blur-xl" />

      <div className="relative rounded-xl border border-white/10 bg-zinc-900/60 p-4">
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-300/80">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            Live capture
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-zinc-400">Secure MCP channel</span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 rounded-lg border border-white/10 bg-zinc-950/40 p-4">
          {Array.from({ length: 24 }).map((_, i) => {
            const highlight = i === 2 || i === 9 || i === 15;
            const pulse = i === 13;
            return (
              <div
                key={i}
                className={
                  'aspect-[4/3] rounded-md border bg-zinc-800/60 ' +
                  (highlight ? 'border-primary/50' : 'border-white/10')
                }
              >
                {pulse && <div className="m-auto h-full w-full animate-pulse text-center" />}
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute -bottom-3 left-6 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-200 shadow-xl backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Component selected
          </div>
        </div>
      </div>
    </div>
  );
}

// Alternative hero visual tailored to MCP‑B: shows a tool schema,
// a secure channel, and a tool call result using the user's session.
function ToolCallMock() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/20 to-transparent blur-xl" />

      <div className="relative rounded-xl border border-white/10 bg-zinc-900/60 p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-300/80">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            Tab • store.example.com
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-zinc-400">Secure MCP channel</span>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-3 rounded-lg border border-white/10 bg-zinc-950/40 p-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Action */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wide text-zinc-400">Action</div>
            <div className="rounded-md border border-white/10 bg-black/50 p-3 text-[11px] text-primary-foreground/90">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
              </div>
              <ul className="space-y-1 text-zinc-200/90">
                <li>• Product: “Trail Shoes”</li>
                <li>• Quantity: 1</li>
                <li>• Size: 10</li>
              </ul>
            </div>
          </div>

          {/* Connector */}
          <div className="hidden items-center lg:flex">
            <div className="mx-2 flex flex-col items-center text-primary">
              <Zap className="h-5 w-5" />
              <span className="mt-1 text-[10px]">MCP‑B</span>
            </div>
          </div>

          {/* Result */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wide text-zinc-400">Call result</div>
            <div className="rounded-md border border-primary/20 bg-black/50 p-3 text-[11px] text-primary-foreground/90">
              <div className="mb-1 text-primary">Added to cart ✓</div>
              <div className="text-zinc-200/90">Trail Shoes • Qty 1 • Size 10</div>
              <div className="mt-2 text-zinc-400 text-[10px]">Runs with your logged‑in session</div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="pointer-events-none absolute -bottom-3 left-6 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-200 shadow-xl backdrop-blur">
          Executes with the user's session
        </div>
      </div>
    </div>
  );
}

function BridgeSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15),_transparent_60%)]" />
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Why MCP‑B?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            The bridge between your app
            <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">and</span>
            AI assistants
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Your Website / Tools */}
          <Card className="bg-zinc-950/40 border-white/10">
            <CardHeader className="pb-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                <Globe className="h-3.5 w-3.5" /> Your Website
              </div>
              <CardTitle className="text-base text-muted-foreground">Expose context and tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-primary/20 bg-black/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/15 p-2 text-primary">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">addToCart</div>
                    <div className="text-xs text-muted-foreground">Add a product to the user’s active cart</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md border border-white/10 bg-white/5 p-2">
                    <div className="text-muted-foreground">product</div>
                    <div className="font-medium">Trail Shoes</div>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-2">
                    <div className="text-muted-foreground">size</div>
                    <div className="font-medium">10</div>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-2">
                    <div className="text-muted-foreground">quantity</div>
                    <div className="font-medium">1</div>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-2">
                    <div className="text-muted-foreground">notes</div>
                    <div className="font-medium">—</div>
                  </div>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                  <Shield className="h-3.5 w-3.5" /> Uses browser session (no API keys)
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">Define what the assistant can see and do.</p>
            </CardContent>
          </Card>

          {/* Connector */}
          <div className="hidden justify-center lg:flex">
            <div className="rounded-2xl border border-primary/30 bg-primary/10 px-6 py-8 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div className="font-semibold text-primary">MCP‑B</div>
              <div className="text-xs text-primary/80">Perfect bridge</div>
            </div>
          </div>

          {/* Implementation */}
          <Card className="bg-zinc-950/40 border-primary/20">
            <CardHeader className="pb-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
                <Code2 className="h-3.5 w-3.5" /> AI Assistants
              </div>
              <CardTitle className="text-base text-muted-foreground">Secure tool calls, structured output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-primary/20 bg-black/50 p-4 text-sm text-primary/90">
                <pre className="overflow-x-auto text-xs sm:text-sm">
{`// Example MCP tool call
await mcp.callTool({ name: 'createInvoice', arguments: { items } })
// Runs with the user's session, not new auth`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 shadow-sm">
            Works across any site or framework
            <span className="mx-2">→</span>
            <span className="text-primary font-medium">Up and running in minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowDiagramSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <Badge className="mb-3 border-primary/20 bg-primary/10 text-primary">
            <Workflow className="mr-2 h-3 w-3" /> How it flows
          </Badge>
          <h3 className="text-2xl font-semibold sm:text-3xl">From request to result — securely</h3>
        </div>

        <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {/* Assistant */}
          <Card className="bg-zinc-950/40 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-md bg-primary/20 p-2 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">AI Assistant</div>
                <div className="text-xs text-muted-foreground">“Add to cart”</div>
              </div>
            </CardContent>
          </Card>

          <ArrowRight className="hidden lg:block h-5 w-5 text-primary/80 justify-self-center" />

          {/* MCP‑B */}
          <Card className="bg-zinc-950/40 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-md bg-primary/20 p-2 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">MCP‑B</div>
                <div className="text-xs text-muted-foreground">Routes tool call</div>
              </div>
            </CardContent>
          </Card>

          <ArrowRight className="hidden lg:block h-5 w-5 text-primary/80 justify-self-center" />

          {/* Tab */}
          <Card className="bg-zinc-950/40 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-md bg-primary/20 p-2 text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Your Website (tab)</div>
                <div className="text-xs text-muted-foreground">Executes with session</div>
              </div>
            </CardContent>
          </Card>

          <ArrowRight className="hidden lg:block h-5 w-5 text-primary/80 justify-self-center" />

          {/* APIs */}
          <Card className="bg-zinc-950/40 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-md bg-primary/20 p-2 text-primary">
                <Network className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Your APIs</div>
                <div className="text-xs text-muted-foreground">No new auth needed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">End‑to‑end over a secure channel • No API keys • Pixel‑accurate actions</p>
      </div>
    </section>
  )
}

function IndexRoute() {
  return (
    <div className="min-h-screen">
      {/* Site Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/logos/logo-32.png"
              alt="MCP-B Logo"
              className="h-8 w-auto object-contain"
            />
            <Link to="/" aria-label="MCP‑B homepage" className="font-semibold tracking-tight">
              MCP‑B
            </Link>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/assistant"
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Demo
            </Link>
            <Link
              to="/blogs"
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Blogs
            </Link>
            <Link
              to="https://docs.mcp-b.ai"
              className="hidden sm:inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Docs
            </Link>
            <a
              href="https://discord.gg/PGFzevDNqq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Discord
            </a>
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              asChild
            >
              <a
                href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Extension"
              >
                <span className="flex items-center">
                  <Chrome className="mr-2 h-4 w-4" /> Get Extension
                </span>
              </a>
            </Button>
          </nav>
        </div>
      </header>
      {/* Hero Section (redesigned) */}
      <ShaderBackground>
        <section className="relative overflow-hidden px-4 py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          <div className="container relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              {/* Left: Copy & CTAs */}
              <div className="text-left lg:pr-4">
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 shadow-sm backdrop-blur">
                    <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                    Introducing MCP‑B
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fadeInUp">
                  Model Context Protocol
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-primary">
                    for the Browser
                  </span>
                </h1>

                <p className="mb-4 max-w-2xl text-lg text-white/85 sm:text-xl animate-fadeInUp" style={{animationDelay:'120ms'}}>
                  Today’s AI automation is like using a robot to read your screen and click buttons. MCP‑B lets assistants call your site’s real functions instead.
                </p>
                <p className="mb-8 max-w-2xl text-base text-white/70 animate-fadeInUp" style={{animationDelay:'180ms'}}>
                  Add ~50 lines of code and your website becomes AI‑ready with zero configuration.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    <a
                      href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Chrome className="mr-2 h-4 w-4" /> Add to Chrome
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <Link to="/assistant">
                      Try the live demo <Zap className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <p className="mt-4 text-sm text-white/60">No API keys or OAuth — uses your logged‑in session.</p>
              </div>

              {/* Right: Tool-call preview (more MCP‑B relevant) */}
              <div className="relative">
                <ToolCallMock />
              </div>
            </div>
          </div>
        </section>
      </ShaderBackground>

      {/* Bridge Section (new) */}
      <BridgeSection />

      {/* Flow Diagram Section */}
      <FlowDiagramSection />

      {/* Demo Video Section */}
      <section className="px-4 py-20 relative overflow-hidden border-t">
        <div className="absolute -top-48 left-1/3 h-[32rem] w-[32rem] bg-gradient-to-br from-primary/20 to-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 right-1/3 h-[36rem] w-[36rem] bg-gradient-to-br from-blue-600/15 to-primary/20 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-5xl relative">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground border-0 shadow">
              <PlayCircle className="mr-1 h-3 w-3 text-primary-foreground animate-pulse" />
              Live Demo
            </Badge>
            <h2 className="animate-fadeInUp mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground via-blue-600/80 to-foreground bg-clip-text text-transparent">
              See MCP-B in Action
            </h2>
            <p
              className="animate-fadeInUp text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ animationDelay: '100ms' }}
            >
              Watch how the MCP-B AI assistant seamlessly interacts with an MCP-B enabled website —
              no API keys, no OAuth, just pure productivity.
            </p>
          </div>

          <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group shadow-2xl">
              <div className="aspect-video relative bg-gradient-to-br from-muted/30 to-muted/50 overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-600/20 animate-gradient-shift" />
                </div>

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Video with performance optimizations */}
                <LazyVideo
                  src={MP4}
                  srcWebM={WEBM}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23020817;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%231e293b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23020817;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23g)'/%3E%3C/svg%3E"
                />

                {/* Corner badges */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                    <PlayCircle className="h-3 w-3 mr-1" />
                    Demo
                  </Badge>
                </div>
              </div>

              {/* Video caption bar */}
              <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm border-t border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Live Recording
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      2 min demo
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      <span>Real-time AI automation</span>
                    </div>
                    <button
                      className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                      onClick={() => window.open(MP4, '_blank')}
                      aria-label="Open in new tab"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Open in new tab</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Key highlights below video */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <div className="text-center group"> 
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary/10 to-blue-600/10 mb-2 group-hover:scale-110 transition-transform">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Instant Execution</p>
              <p className="text-xs text-muted-foreground mt-1">Tasks complete in milliseconds</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary/10 to-blue-600/10 mb-2 group-hover:scale-110 transition-transform">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Secure by Default</p>
              <p className="text-xs text-muted-foreground mt-1">Uses existing browser auth</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary/10 to-blue-600/10 mb-2 group-hover:scale-110 transition-transform">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Zero Config</p>
              <p className="text-xs text-muted-foreground mt-1">Works out of the box</p>
            </div>
          </div>
        </div>
      </section>
      {/* Sentry test button removed for production readiness */}

      {/* Revolutionary Architecture Section */}
      <section className="border-t bg-gradient-to-b from-muted/20 to-transparent px-4 py-20 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[32rem] w-[32rem] bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[32rem] w-[32rem] bg-gradient-to-br from-blue-600/15 to-primary/15 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-orange-800 text-white border-0 shadow">
              <Sparkles className="mr-1 h-3 w-3 text-white" />
              Browser‑Native MCP
            </Badge>
            <h2 className="animate-fadeInUp mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground via-destructive/60 to-foreground bg-clip-text text-transparent">
              Why MCP-B Changes Everything
            </h2>
            <p
              className="animate-fadeInUp text-lg text-muted-foreground max-w-3xl mx-auto"
              style={{ animationDelay: '100ms' }}
            >
              While other solutions take 10-20 seconds per action and cost $4-5 per task, MCP-B
              delivers instant results with zero configuration. The future of browser automation is
              here.
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            {/* The Core Innovation */}
            <Card className="animate-fadeInUp overflow-hidden border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <div className="p-8">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-blue-600 text-white border-0">
                  <Zap className="mr-1 h-3 w-3" />
                  The Breakthrough
                </Badge>
            <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Browser-Native MCP Servers
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Instead of running MCP servers as separate processes or cloud services, we embed
                  them directly into web pages. The MCP server becomes part of your web application.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">The Challenge</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        Remote MCPs need complex OAuth 2.1
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        Local MCPs require API keys everywhere
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        White-collar work happens in browsers
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Our Solution</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        Run MCP servers inside web pages
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        Use existing browser authentication
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        Bridge to any MCP client via extension
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">The Result</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">→</span>
                        Authentication just works
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">→</span>
                        No API keys or OAuth flows
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">→</span>
                        Works with any website
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Problems Solved */}
            <div className="grid gap-8 lg:grid-cols-2">
              <Card
                className="animate-fadeInUp border-primary/20 bg-gradient-to-br from-primary/5 via-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: '200ms' }}
              >
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    10,000x Performance Improvement
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>Traditional browser automation performance:</p>
                    <ul className="space-y-2 text-sm ml-4">
                      <li>• 10-20 seconds per task</li>
                      <li>• $4-5 in API costs per simple action</li>
                      <li>• Multiple model calls for UI parsing</li>
                      <li>• Brittle, unreliable execution</li>
                    </ul>
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20">
                      <p className="text-sm font-medium text-primary">
                        MCP-B executes the same tasks in milliseconds with direct API calls.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                className="animate-fadeInUp border-primary/20 bg-gradient-to-br from-primary/5 via-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: '300ms' }}
              >
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Authentication That Actually Works
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>Why MCP-B solves auth elegantly:</p>
                    <ul className="space-y-2 text-sm ml-4">
                      <li>• Uses your existing browser sessions</li>
                      <li>• No OAuth 2.1 implementation needed</li>
                      <li>• No API keys to manage or distribute</li>
                      <li>• Respects existing permission models</li>
                    </ul>
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20">
                      <p className="text-sm font-medium text-primary">
                        Your existing APIs work out of the box — the browser handles everything.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Technical Architecture Visualization */}
          <div className="space-y-8">
            {/* High-Level Architecture Diagram */}
            <Card
              className="animate-fadeInUp overflow-hidden border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm"
              style={{ animationDelay: '400ms' }}
            >
              <div className="p-8">
                <h3 className="mb-6 text-xl font-semibold text-center">
                  How MCP-B Works: From Web Page to AI Assistant
                </h3>

                {/* Architecture Diagram */}
                <div className="space-y-6">
                  <div className="grid gap-4 lg:grid-cols-3">
                    {/* Web Pages with MCP Servers */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground text-center">
                        1. Tab MCP Servers
                      </h4>
                      <Card className="p-4 border-primary/20 bg-gradient-to-br from-primary/5 to-blue-600/5">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-5 w-5 text-primary" />
                            <span className="font-medium">Your Web Apps</span>
                          </div>
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="p-2 rounded bg-background/60 border border-primary/10">
                              <p className="font-medium text-primary mb-1">Tab MCP Server</p>
                              <p>• TypeScript, in-memory transport</p>
                              <p>• Wraps your authenticated APIs</p>
                              <p>• Uses existing cookies/JWT</p>
                            </div>
                            <div className="flex items-center gap-1 justify-center text-primary">
                              <ArrowRight className="h-3 w-3" />
                              <span className="text-xs">fetch/XHR</span>
                              <ArrowRight className="h-3 w-3" />
                            </div>
                            <div className="p-2 rounded bg-background/60 border border-muted">
                              <p className="font-medium mb-1">Your Existing APIs</p>
                              <p>• No changes needed</p>
                              <p>• Same auth as UI</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* MCP-B Extension */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground text-center">
                        2. MCP-B Extension
                      </h4>
                      <Card className="p-4 border-primary bg-gradient-to-br from-primary/10 to-blue-600/10">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Chrome className="h-5 w-5 text-primary" />
                            <span className="font-medium">Chrome Extension</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 rounded bg-background/80 border border-primary/20">
                              <p className="text-xs font-medium text-primary mb-1">
                                Content Scripts
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Connect to tab servers via postMessage
                              </p>
                            </div>
                            <div className="p-2 rounded bg-background/80 border border-primary/20">
                              <p className="text-xs font-medium text-primary mb-1">
                                MCP Hub (Service Worker)
                              </p>
                              <p className="text-xs text-muted-foreground">
                                • Aggregates all tab tools
                              </p>
                              <p className="text-xs text-muted-foreground">• Routes tool calls</p>
                              <p className="text-xs text-muted-foreground">• Manages connections</p>
                            </div>
                            <div className="p-2 rounded bg-background/80 border border-primary/20">
                              <p className="text-xs font-medium text-primary mb-1">
                                Built-in Chat UI
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Side panel AI assistant
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* MCP Clients */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground text-center">
                        3. MCP Clients
                      </h4>
                      <Card className="p-4 border-primary/20 bg-gradient-to-br from-blue-600/10 to-primary/10">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Network className="h-5 w-5 text-primary" />
                            <span className="font-medium">AI Assistants</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 rounded bg-background/60 border border-primary/10">
                              <p className="text-xs font-medium text-primary mb-1">
                                Native Bridge
                              </p>
                              <p className="text-xs text-muted-foreground">
                                • Native messaging tunnel
                              </p>
                              <p className="text-xs text-muted-foreground">• Proxy server option</p>
                            </div>
                            <div className="text-center py-1">
                              <ArrowRight className="h-3 w-3 text-primary mx-auto rotate-90" />
                            </div>
                            <div className="space-y-1">
                              <div className="p-1.5 rounded bg-background/60 border border-muted text-xs">
                                <span className="font-medium">Claude Desktop</span>
                              </div>
                              <div className="p-1.5 rounded bg-background/60 border border-muted text-xs">
                                <span className="font-medium">Cursor IDE</span>
                              </div>
                              <div className="p-1.5 rounded bg-background/60 border border-muted text-xs">
                                <span className="font-medium">Cline / Others</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Data Flow */}
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 border border-muted">
                    <p className="text-xs text-center text-muted-foreground">
                      <span className="font-medium">Complete flow:</span> AI requests tool →
                      Extension routes to tab → Tab MCP executes using your auth → Results flow back
                      to AI
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-blue-600/10 backdrop-blur-sm border border-primary/20">
                  <p className="text-sm text-center font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    MCP servers run in web pages, extension bridges to AI clients, transport layers
                    handle the plumbing
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Simple for Everyone */}
      <section className="border-t bg-gradient-to-b from-muted/20 to-transparent px-4 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[24rem] w-[24rem] bg-gradient-to-br from-primary/25 to-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] bg-gradient-to-br from-blue-600/20 to-primary/25 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="mb-12 text-center">
            <h2 className="animate-fadeInUp mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Incredibly Simple Setup
            </h2>
            <p
              className="animate-fadeInUp text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ animationDelay: '100ms' }}
            >
              No OAuth flows, no API keys, no complex configuration. Just ~50 lines of code and your
              website becomes AI-ready in minutes, not days.
            </p>
          </div>

          {/* For Developers Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary text-primary-foreground border-0 shadow">
                <Code2 className="mr-1 h-3 w-3 text-primary-foreground" />
                For Developers
              </Badge>
              <h3 className="text-2xl font-semibold">Add MCP to Your Website in Minutes</h3>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 text-sm font-medium text-primary">
                    1
                  </div>
                  <h4 className="text-lg font-medium">Install the package</h4>
                </div>
                <div className="ml-11">
                  <CodeBlock
                    language="bash"
                    code="npm install @mcp-b/transports @modelcontextprotocol/sdk"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 text-sm font-medium text-primary">
                    2
                  </div>
                  <h4 className="text-lg font-medium">Create your MCP server</h4>
                </div>
                <div className="ml-11">
                  <CodeBlock
                    language="typescript"
                    code={`import { TabServerTransport } from '@mcp-b/transports';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'invoice-system',
  version: '1.0.0'
});

server.tool('createInvoice', 'Create a new invoice', {
  customerEmail: z.string().email(),
  items: z.array(z.object({
    description: z.string(),
    amount: z.number()
  }))
}, async ({ customerEmail, items }) => {
  // This is just a normal fetch to your existing API
  const response = await yourPreAuthorizedApiClient('/api/invoices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerEmail, items })
  });

  if (!response.ok) {
    throw new Error(\`Failed to create invoice: \${response.statusText}\`);
  }
  // You get full control over what the model get's to know about the response
  return { content: [{ type: 'text', text: JSON.stringify(await response.json())  }] };
});

const transport = new TabServerTransport();
// This server is now callable by the mcp-b chrome extension
await server.connect(transport);`}
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 text-sm font-medium text-primary">
                    3
                  </div>
                  <h4 className="text-lg font-medium">That's it! 🎉</h4>
                </div>
                <div className="ml-11">
                  <p className="text-muted-foreground">
                    Your MCP server automatically uses your existing authentication. When users with
                    the MCP-B extension visit your site, their AI assistants can now interact with
                    your APIs using their active session.
                  </p>
                </div>
              </div>

              {/* Key Points */}
              <div className="grid gap-4 sm:grid-cols-3 mt-8">
                <Card className="p-4 border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">No API Keys</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Uses browser's existing authentication
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Type-Safe</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Full TypeScript support with Zod validation
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Secure by Default</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Respects your existing permissions
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* For Users Section */}
          <div className="border-t pt-12">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary text-primary-foreground border-0 shadow">
                <Users className="mr-1 h-3 w-3 text-white" />
                For Users
              </Badge>
              <h3 className="text-2xl font-semibold">Even Simpler for End Users</h3>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6 border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-blue-600/20 text-lg font-medium text-primary">
                      1
                    </div>
                    <h4 className="text-lg font-medium">Install Extension</h4>
                  </div>
                  <p className="text-muted-foreground">
                    <a
                      href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:opacity-90 underline"
                    >
                      One-click install from Chrome Web Store
                    </a>
                    . No configuration needed.
                  </p>
                </Card>

                <Card className="p-6 border-primary/20 bg-gradient-to-br from-background/50 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-blue-600/20 text-lg font-medium text-primary">
                      2
                    </div>
                    <h4 className="text-lg font-medium">Start Using AI</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Visit any MCP-enabled website. Your AI assistant automatically gains access.
                  </p>
                </Card>
              </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-primary/10 backdrop-blur-sm border border-primary/20 text-center">
                  <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                  No API keys to manage. No OAuth to configure. It just works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MCP-B is Better */}
      <section className="px-4 py-20 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative">
          <div className="mb-12 text-center">
            <h2 className="animate-in-fadeInUp mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground via-primary/60 to-foreground bg-clip-text text-transparent">
              Better for AI, Better for Users
            </h2>
            <p
              className="animate-in-fadeInUp text-lg text-muted-foreground"
              style={{ animationDelay: '100ms' }}
            >
              See how MCP-B compares to existing approaches
            </p>
          </div>

          {/* Comparison Diagram */}
          <div className="mb-12">
            <Card
              className="animate-in-fadeInUp overflow-hidden border-primary/20 bg-gradient-to-br from-background/40 to-transparent backdrop-blur-sm"
              style={{ animationDelay: '200ms' }}
            >
              <div className="p-8">
                <h3 className="mb-6 text-xl font-semibold text-center">
                  How MCP-B Compares to Existing Approaches
                </h3>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Traditional Browser Automation */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className="mb-3 border-orange-600/20 text-orange-600 bg-orange-600/5"
                      >
                        Traditional Approach
                      </Badge>
                      <h4 className="font-semibold mb-2">Browser Automation</h4>
                    </div>

                    <div className="space-y-3">
                      <Card className="p-3 border-destructive/20 bg-gradient-to-br from-orange-600/10 to-orange-600/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-4 w-4 text-destructive" />
                          <span className="text-sm font-medium">Screen Scraping</span>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>• AI analyzes screenshots</p>
                          <p>• Clicks visual elements</p>
                          <p>• Breaks with UI changes</p>
                        </div>
                      </Card>

                      <div className="text-center py-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto rotate-90" />
                      </div>

                      <Card className="p-3 border-destructive/20 bg-destructive/5">
                        <p className="text-xs text-center font-medium text-orange-600">
                          Result: Brittle & Slow
                        </p>
                      </Card>
                    </div>
                  </div>

                  {/* Traditional MCP */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className="mb-3 border-orange-600/20 text-orange-600 bg-orange-600/5"
                      >
                        Current State
                      </Badge>
                      <h4 className="font-semibold mb-2">Traditional MCP</h4>
                    </div>

                    <div className="space-y-3">
                      <Card className="p-3 border-orange-600/20 bg-gradient-to-br from-orange-600/10 to-orange-600/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">API Keys Required</span>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>• Separate auth per service</p>
                          <p>• Complex credential mgmt</p>
                          <p>• Technical setup needed</p>
                        </div>
                      </Card>

                      <div className="text-center py-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto rotate-90" />
                      </div>

                      <Card className="p-3 border-orange-600/20 bg-orange-600/5">
                        <p className="text-xs text-center font-medium text-orange-600">
                          Result: High Barrier
                        </p>
                      </Card>
                    </div>
                  </div>

                  {/* MCP-B Solution */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge className="mb-3 bg-gradient-to-r from-primary to-blue-600 text-white border-0">
                        The Future
                      </Badge>
                      <h4 className="font-semibold mb-2">MCP-B Bridge</h4>
                    </div>

                    <div className="space-y-3">
                      <Card className="p-3 border-primary/20 bg-gradient-to-br from-primary/10 to-blue-600/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Direct API Access</span>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>• Uses browser sessions</p>
                          <p>• Structured data access</p>
                          <p>• Zero configuration</p>
                        </div>
                      </Card>

                      <div className="text-center py-2">
                        <ArrowRight className="h-5 w-5 text-primary mx-auto rotate-90" />
                      </div>

                      <Card className="p-3 border-primary/20 bg-gradient-to-br from-primary/10 to-blue-600/10">
                        <p className="text-xs text-center font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                          Result: Works Instantly
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Traditional Browser Automation */}
            <Card
              className="animate-in-fadeInUp relative overflow-hidden border-destructive/20 bg-gradient-to-b from-destructive/5 via-background/30 to-transparent backdrop-blur-sm hover:border-destructive/30 transition-all duration-300 group"
              style={{ animationDelay: '200ms' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform" />
              <div className="p-6 relative">
                <Badge
                  variant="outline"
                  className="mb-4 border-orange-600/20 text-orange-600 bg-orange-600/5 backdrop-blur-sm"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Traditional Browser Automation
                </Badge>
                <h3 className="mb-4 text-xl font-semibold">Visual Parsing = Poor Performance</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-destructive mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✗
                    </span>
                    <span>AI must parse screenshots and visual elements</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-destructive mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✗
                    </span>
                    <span>Breaks when UI changes</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-destructive mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✗
                    </span>
                    <span>Slow and error-prone</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-destructive mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✗
                    </span>
                    <span>Requires complex selectors and wait logic</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* MCP-B Approach */}
            <Card
              className="animate-in-fadeInUp relative overflow-hidden border-primary/20 bg-gradient-to-b from-primary/5 via-background/30 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
              style={{ animationDelay: '300ms' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform" />
              <div className="p-6 relative">
                <Badge className="mb-4 bg-gradient-to-r from-primary to-blue-600 text-white border-0">
                  <FileCode className="mr-1 h-3 w-3" />
                  MCP-B Structured Access
                </Badge>
                <h3 className="mb-4 text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Direct API Access = Reliability
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-primary mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>Direct access to structured data and APIs</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-primary mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>UI changes don't affect functionality</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-primary mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>Fast and accurate execution</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <span className="text-primary mt-0.5 group-hover/item:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>Clean, semantic tool definitions</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-gradient-to-b from-muted/20 to-transparent px-4 py-20 relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-[30rem] w-[30rem] bg-gradient-to-br from-primary/20 to-blue-600/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-[30rem] w-[30rem] bg-gradient-to-br from-blue-600/15 to-primary/20 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="mb-12 text-center">
            <h2 className="animate-fadeInUp mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Built for Real-World Use
            </h2>
            <p
              className="animate-fadeInUp text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ animationDelay: '100ms' }}
            >
              MCP-B solves the fundamental problems that have prevented AI from working with web
              applications
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="animate-fadeInUp group relative overflow-hidden border-muted bg-gradient-to-br from-background/30 to-transparent backdrop-blur-sm p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:scale-105"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 blur-2xl transition-all group-hover:scale-150 group-hover:from-primary/20 group-hover:to-blue-600/20" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-blue-600/20 text-primary transition-all group-hover:from-primary/30 group-hover:to-blue-600/30 group-hover:scale-110">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Extension Section */}
      <section
        id="extension"
        className="border-t bg-gradient-to-b from-muted/20 to-transparent px-4 py-20 relative overflow-hidden"
      >
        <div className="absolute top-1/4 -left-48 h-[36rem] w-[36rem] bg-gradient-to-br from-primary/25 to-blue-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -right-48 h-[32rem] w-[32rem] bg-gradient-to-br from-blue-600/15 to-primary/25 rounded-full blur-3xl animate-float-delayed" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="mb-12 text-center">
            <h2 className="animate-fadeInUp mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground via-blue-600/80 to-foreground bg-clip-text text-transparent">
              MCP-B Browser Extension
            </h2>
            <p
              className="animate-fadeInUp text-lg text-muted-foreground"
              style={{ animationDelay: '100ms' }}
            >
              AI-powered browser assistant with Model Context Protocol integration
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                <div className="p-8">
                <Badge className="mb-4 bg-gradient-to-r from-primary to-blue-600 text-white border-0">
                    <Chrome className="mr-1 h-3 w-3" />
                    Now Available
                  </Badge>
                  <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    One Extension, Unlimited Possibilities
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Transform your browser into an AI-powered workspace. The MCP-B extension brings
                    the full power of Model Context Protocol directly to your browser.
                  </p>
                  <div className="space-y-4">
                    <Button size="lg" className="w-full group gap-2" asChild>
                      <a
                        href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Chrome className="h-5 w-5" />
                        Install from Chrome Web Store
                        <ExternalLink className="h-4 w-4 ml-1 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full group gap-2" asChild>
                      <a
                        href="https://github.com/MiguelsPizza/WebMCP"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Source on GitHub
                        <ExternalLink className="h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="animate-fadeInUp space-y-6" style={{ animationDelay: '300ms' }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-primary/20 p-6 bg-gradient-to-br from-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Network className="w-5 h-5 text-primary" />
                      MCP Hub for Extensions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                      Acts as an MCP of MCPs — other AI extensions can connect to MCP-B to access
                      all browser tabs' tools.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 p-6 bg-gradient-to-br from-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="w-5 h-5 text-primary" />
                      Browser Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                      Let AI manage tabs, bookmarks, and interact with web pages through MCP.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 p-6 bg-gradient-to-br from-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      Privacy First
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                      All processing happens locally. Your data never leaves your device without
                      permission.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 p-6 bg-gradient-to-br from-background/40 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="w-5 h-5 text-primary" />
                      Cross-Browser
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                      Works with Chrome, Edge, and Firefox. One extension for all browsers.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-primary/10 to-blue-600/10 backdrop-blur-sm p-6 border border-primary/20">
                <h4 className="font-semibold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Getting Started
                </h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">1.</span>
                    <span>Install from Chrome Web Store</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">2.</span>
                    <span>Click extension icon to open side panel</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">3.</span>
                    <span>Configure your AI provider</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">4.</span>
                    <span>Start automating your workflows</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By using the MCP-B Browser Extension, you agree to our{' '}
              <Link to="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-48 -left-32 h-[36rem] w-[36rem] bg-gradient-to-br from-primary/15 to-blue-600/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-48 -right-32 h-[40rem] w-[40rem] bg-gradient-to-br from-blue-600/10 to-primary/15 rounded-full blur-3xl animate-float-delayed" />

        <div className="container mx-auto max-w-4xl relative">
          <Card className="animate-in-fadeInUp overflow-hidden border-primary/20 bg-gradient-to-br from-background/30 via-background/10 to-transparent backdrop-blur-sm p-8 text-center sm:p-12 hover:border-primary/30 transition-all duration-300">
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground via-primary/60 to-foreground bg-clip-text text-transparent animate-gradient-x">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                The future of AI assistance isn't in complex OAuth flows or managed infrastructure.
                It's in the browser you already have open.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Get Extension */}
                <Button
                  size="lg"
                  className="group w-full relative overflow-hidden bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  asChild
                >
                  <a
                    href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get Browser Extension"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Chrome className="mr-2 h-4 w-4" />
                      Get Browser Extension
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </Button>

                {/* View on GitHub */}
                <Button
                  size="lg"
                  className="group w-full relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a
                    href="https://github.com/MiguelsPizza/WebMCP"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <GitBranch className="mr-2 h-4 w-4" />
                      View on GitHub
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </Button>

                {/* Join Discord */}
                <Button
                  size="lg"
                  className="group w-full relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  asChild
                >
                  <a
                    href="https://discord.gg/PGFzevDNqq"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join Our Discord"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Users className="mr-2 h-4 w-4" />
                      Join Our Discord
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </Button>

                {/* Integration Help */}
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background/30 to-transparent backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/40"
                  asChild
                >
                  <a href="mailto:alex@mcp-b.ai?subject=MCP-B%20Integration">
                    <span className="relative z-10 flex items-center justify-center">
                      Get Integration Help
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 group">
                  <div className="p-1 rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 group-hover:from-primary/20 group-hover:to-blue-600/20 transition-all">
                    <Award className="h-4 w-4" />
                  </div>
                  <a
                    href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary underline decoration-dotted underline-offset-2"
                  >
                    GNU GPLv3 licensed
                  </a>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-1 rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 group-hover:from-primary/20 group-hover:to-blue-600/20 transition-all">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>Community Driven</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-1 rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 group-hover:from-primary/20 group-hover:to-blue-600/20 transition-all">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span>Cross-Browser</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t bg-background/80">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} MCP‑B.{' '}
              <a
                href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary"
              >
                GNU GPLv3 licensed
              </a>
            </p>
            <div className="flex items-center gap-3 text-xs">
              <Link to="/privacy" className="hover:text-primary">
                Privacy
              </Link>
              <span className="text-muted-foreground/60">•</span>
              <a
                href="https://github.com/MiguelsPizza/WebMCP"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <span className="text-muted-foreground/60">•</span>
              <a
                href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Extension"
              >
                Extension
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Performance',
    description:
      'Direct API calls in milliseconds vs 10-20 seconds for screen scraping automation.',
  },
  {
    icon: FileCode,
    title: 'Zero Configuration',
    description:
      'Add ~50 lines of code to your website. No OAuth flows, no API keys, no complex setup.',
  },
  {
    icon: Workflow,
    title: 'Cross-Application Workflows',
    description:
      "AI seamlessly works across multiple sites using each site's existing permissions.",
  },
  {
    icon: Network,
    title: 'Extensible Platform',
    description: 'Acts as an MCP hub that other AI extensions can connect to and extend.',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description:
      'MCP server is part of your app, running your code, respecting your access controls.',
  },
  {
    icon: Lock,
    title: 'Authentication Just Works',
    description: 'Uses existing browser sessions. No OAuth 2.1 complexity, no API keys to manage.',
  },
];
