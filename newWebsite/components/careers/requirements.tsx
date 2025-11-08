"use client";
import Link from "next/link";
import { motion, type Variants } from "motion/react";

// Tech stack links mapping
const TECH_LINKS: Record<string, string> = {
  TypeScript: "https://www.typescriptlang.org/",
  React: "https://react.dev/",
  Cloudflare: "https://www.cloudflare.com/",
  ElectricSQL: "https://electric-sql.com/",
  Postgres: "https://www.postgresql.org/",
  Drizzle: "https://orm.drizzle.team/",
  tRPC: "https://trpc.io/",
  "TanStack Router": "https://tanstack.com/router",
};

type TextSegment = { text: string; link?: string };

// Parse text and convert tech terms into clickable links
function parseTechLinks(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let remaining = text;
  const techs = Object.keys(TECH_LINKS).sort((a, b) => b.length - a.length);

  while (remaining) {
    const match = techs.find((tech) => remaining.indexOf(tech) === 0);

    if (match) {
      segments.push({ text: match, link: TECH_LINKS[match] });
      remaining = remaining.slice(match.length);
    } else {
      // Find the next tech term or use remaining text
      let nextIndex = Infinity;
      for (const tech of techs) {
        const index = remaining.indexOf(tech);
        if (index > 0) nextIndex = Math.min(nextIndex, index);
      }

      const chunk = nextIndex === Infinity ? remaining : remaining.slice(0, nextIndex);
      segments.push({ text: chunk });
      remaining = remaining.slice(chunk.length);
    }
  }

  return segments;
}

const TechLink = ({ text }: { text: string }) => {
  const segments = parseTechLinks(text);

  return (
    <>
      {segments.map((segment, i) =>
        segment.link ? (
          <Link
            key={i}
            href={segment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            {segment.text}
          </Link>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  );
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

// Reusable list item component
const RequirementItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li variants={itemVariants} className="flex items-start gap-2">
    <span className="text-brand mt-1 shrink-0 text-sm sm:text-base">•</span>
    <span className="text-sm leading-relaxed sm:text-base">{children}</span>
  </motion.li>
);

const textClassName = "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base";

export const CoFounderRequirements = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-start justify-center px-4 py-6 md:px-8"
    >
      <motion.p variants={itemVariants} className={`mb-4 ${textClassName}`}>
        I've built MCP-B (and pretty much everything else) myself so far. It's been a fun ride,
        but I'm looking for someone smart and cool to help take this to the next level.
      </motion.p>

      <motion.p variants={itemVariants} className={`mb-3 font-medium ${textClassName}`}>
        Ideal co-founder:
      </motion.p>

      <motion.ul variants={containerVariants} className="mb-6 space-y-2 text-neutral-600 dark:text-neutral-400">
        <RequirementItem>
          <TechLink text="Strong technical chops (web dev, TypeScript, React)" />
        </RequirementItem>
        <RequirementItem>Genuinely excited about AI and developer tools</RequirementItem>
        <RequirementItem>Good at shipping stuff and scaling things</RequirementItem>
        <RequirementItem>
          <TechLink text="Fullstack Cloudflare knowledge is a big plus" />
        </RequirementItem>
        <RequirementItem>Chill to work with</RequirementItem>
      </motion.ul>

      <motion.p variants={itemVariants} className={`mb-4 break-words ${textClassName}`}>
        <span className="font-medium">The Stack:</span>{" "}
        <TechLink text="TypeScript monorepo running on Cloudflare. ElectricSQL for sync, Postgres with Drizzle, tRPC for the API, and a browser extension built with TanStack Router + React." />
      </motion.p>

      <motion.p variants={itemVariants} className={textClassName}>
        Interested? Hit me up on{" "}
        <Link
          href="https://www.linkedin.com/in/alex-nahas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline hover:no-underline"
        >
          LinkedIn
        </Link>{" "}
        or{" "}
        <Link
          href="https://discord.gg/PGFzevDNqq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline hover:no-underline"
        >
          Discord
        </Link>
        .
      </motion.p>
    </motion.div>
  );
};
