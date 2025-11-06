import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { ScalesContainer } from "@/components/scales-container";
import { SectionHeading } from "@/components/seciton-heading";
import { SubHeading } from "@/components/subheading";
import {
  BoltIcon,
  CloudCheckIcon,
  HeartHandsIcon,
  ShieldSplitIcon,
  SparklesIcon,
  TelescopeIcon,
} from "@/icons/card-icons";

import { getSEOTags } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata = getSEOTags({
  title: "Looking for a Co-Founder - MCP-B",
  description:
    "Join us in building the future of browser-based Model Context Protocol. We're looking for a technical co-founder to help shape the future of how web applications interact with AI agents.",
});

export default function CareersPage() {
  const images = [
    {
      src: "/team/1.png",
      className: "lg:col-span-2 col-span-1",
    },
    {
      src: "/team/2.png",
      className: "lg:col-span-2 col-span-1",
    },
    {
      src: "/team/3.png",
      className: "lg:col-span-4 col-span-1",
    },
    {
      src: "/team/4.png",
      className: "lg:col-span-3 col-span-1",
    },
    {
      src: "/team/5.png",
      className: "lg:col-span-3 col-span-1",
    },
    {
      src: "/team/6.png",
      className: "lg:col-span-2 col-span-1",
    },
  ];

  const why = [
    {
      title: "Complete Ownership",
      description:
        "You will own your work and be able to see the impact of your work on the company.",
      icon: <CloudCheckIcon className="text-brand size-6" />,
    },
    {
      title: "High-Paced Environment",
      description:
        "Move fast and ship quality. We operate at startup velocity with enterprise precision.",
      icon: <BoltIcon className="text-brand size-6" />,
    },
    {
      title: "Absolute Integrity",
      description:
        "We do what we say. Transparency and honesty guide every decision and interaction.",
      icon: <ShieldSplitIcon className="text-brand size-6" />,
    },
    {
      title: "People-First Culture",
      description:
        "Your growth, well-being, and success are fundamental to our mission.",
      icon: <HeartHandsIcon className="text-brand size-6" />,
    },
    {
      title: "Meaningful Impact",
      description:
        "Build technology that transforms how millions of teams work. Your code matters.",
      icon: <SparklesIcon className="text-brand size-6" />,
    },
    {
      title: "Vision Driven",
      description:
        "Join us in reimagining the future of work through autonomous AI systems.",
      icon: <TelescopeIcon className="text-brand size-4" />,
    },
  ];
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center border-x pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-32">
            <Badge text="Co-Founder Opportunity" />
            <SectionHeading className="mt-4 text-left">
              Looking for a <br />
              Technical Co-Founder
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              Join us in building MCP-B, an open-source implementation bringing
              the Model Context Protocol to browsers. We're enabling web apps to
              expose tools and context to AI agents, and we need a co-founder to
              help shape this vision.
            </SubHeading>
            <Button className="mt-4">Get in Touch</Button>
          </div>
          <div className="divide-divide border-divide flex flex-col items-start justify-center divide-y">
            <div className="block px-4 py-6 md:px-8">
              <h3 className="text-brand mb-3 font-medium text-lg">
                What We're Looking For
              </h3>
              <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1">•</span>
                  <span>Strong technical background in web development and browser technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1">•</span>
                  <span>Passionate about AI, developer tools, and open-source</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1">•</span>
                  <span>Experience with TypeScript, React, and modern web APIs</span>
                </li>
              </ul>
            </div>
            <div className="block px-4 py-6 md:px-8">
              <h3 className="text-brand mb-3 font-medium text-lg">
                What You'll Get
              </h3>
              <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1">•</span>
                  <span>Equal equity stake and decision-making power</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1">•</span>
                  <span>Build something meaningful in the AI ecosystem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1">•</span>
                  <span>Shape the future of browser-based AI interactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <Container className="border-divide border-x border-b px-4 pb-20 md:px-8">
        <div className="flex w-full flex-col items-center py-10 md:py-20 lg:flex-row">
          <h2 className="mb-4 min-w-40 text-center font-mono text-sm tracking-tight text-neutral-500 uppercase lg:mb-0 lg:text-left dark:text-neutral-400">
            As featured in
          </h2>
          <div className="flex w-full items-center justify-center lg:justify-start">
            <Image
              src="/logos/the-new-stack.png"
              alt="The New Stack"
              width={180}
              height={180}
              className="h-8 w-auto object-contain dark:invert dark:filter"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
          {images.map((image) => (
            <ScalesContainer
              className={cn("h-80 w-full", image.className)}
              key={image.src + "careers"}
            >
              <Image
                src={image.src}
                alt="Team"
                width={400}
                height={400}
                className={cn(
                  "h-80 w-full rounded-2xl object-cover object-top",
                  image.className,
                )}
              />
            </ScalesContainer>
          ))}
        </div>
      </Container>
      <Container className="border-divide flex flex-col items-center border-x border-b py-16 pb-20">
        <Badge text="The Role" />
        <SectionHeading className="mt-4 px-4 text-center">
          Co-Founder Responsibilities
        </SectionHeading>
        <div className="mt-12 w-full max-w-4xl space-y-8 px-4 md:px-8">
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-neutral-800">
            <h3 className="text-brand mb-4 text-xl font-semibold">Technical Leadership</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Lead the technical architecture and development of MCP-B. Make key decisions
              about the technology stack, implementation patterns, and developer experience.
              Contribute directly to the codebase and establish engineering best practices.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-neutral-800">
            <h3 className="text-brand mb-4 text-xl font-semibold">Product Vision</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Help shape the product roadmap and prioritize features. Work closely with the
              open-source community to understand developer needs and build tools that solve
              real problems in the AI ecosystem.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-neutral-800">
            <h3 className="text-brand mb-4 text-xl font-semibold">Community Building</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Foster a thriving open-source community around MCP-B. Engage with contributors,
              review pull requests, write documentation, and help developers integrate MCP-B
              into their projects.
            </p>
          </div>
        </div>
      </Container>
      <Container className="border-divide flex flex-col items-center border-x border-b py-16 pb-20">
        <Badge text="Why Join" />
        <SectionHeading className="mt-4 px-4 text-center">
          Why Join MCP-B as a Co-Founder?
        </SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {why.map((useCase, index) => (
            <div
              key={useCase.title}
              className="relative z-10 rounded-lg bg-gray-50 p-4 transition duration-200 md:p-5 dark:bg-neutral-800"
            >
              <div className="flex items-center gap-2">{useCase.icon}</div>
              <h3 className="mt-4 mb-2 text-lg font-medium">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <CTA />
      <DivideX />
    </main>
  );
}
