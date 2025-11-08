"use client";
import Link from "next/link";
import { motion } from "motion/react";

const techLinks: Record<string, string> = {
  TypeScript: "https://www.typescriptlang.org/",
  React: "https://react.dev/",
  Cloudflare: "https://www.cloudflare.com/",
  ElectricSQL: "https://electric-sql.com/",
  Postgres: "https://www.postgresql.org/",
  Drizzle: "https://orm.drizzle.team/",
  tRPC: "https://trpc.io/",
  "TanStack Router": "https://tanstack.com/router",
};

const TechLink = ({ text }: { text: string }) => {
  // Find all tech terms in the text and create segments
  const segments: Array<{ text: string; link?: string }> = [];
  let remainingText = text;

  const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);

  while (remainingText.length > 0) {
    let foundMatch = false;

    for (const tech of sortedTechs) {
      const index = remainingText.indexOf(tech);

      if (index === 0) {
        segments.push({ text: tech, link: techLinks[tech] });
        remainingText = remainingText.slice(tech.length);
        foundMatch = true;
        break;
      } else if (index > 0) {
        segments.push({ text: remainingText.slice(0, index) });
        segments.push({ text: tech, link: techLinks[tech] });
        remainingText = remainingText.slice(index + tech.length);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      segments.push({ text: remainingText });
      break;
    }
  }

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export const CoFounderRequirements = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-start justify-center px-4 py-6 md:px-8"
    >
      <motion.p
        variants={itemVariants}
        className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base"
      >
        I've built MCP-B (and pretty much everything else) myself so far. It's been a fun ride,
        but I'm looking for someone smart and cool to help take this to the next level.
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="mb-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 sm:text-base"
      >
        Ideal co-founder:
      </motion.p>

      <motion.ul
        variants={containerVariants}
        className="mb-6 space-y-2 text-neutral-600 dark:text-neutral-400"
      >
        <motion.li variants={itemVariants} className="flex items-start gap-2">
          <span className="text-brand mt-1 shrink-0 text-sm sm:text-base">•</span>
          <span className="text-sm leading-relaxed sm:text-base">
            <TechLink text="Strong technical chops (web dev, TypeScript, React)" />
          </span>
        </motion.li>
        <motion.li variants={itemVariants} className="flex items-start gap-2">
          <span className="text-brand mt-1 shrink-0 text-sm sm:text-base">•</span>
          <span className="text-sm leading-relaxed sm:text-base">Genuinely excited about AI and developer tools</span>
        </motion.li>
        <motion.li variants={itemVariants} className="flex items-start gap-2">
          <span className="text-brand mt-1 shrink-0 text-sm sm:text-base">•</span>
          <span className="text-sm leading-relaxed sm:text-base">Good at shipping stuff and scaling things</span>
        </motion.li>
        <motion.li variants={itemVariants} className="flex items-start gap-2">
          <span className="text-brand mt-1 shrink-0 text-sm sm:text-base">•</span>
          <span className="text-sm leading-relaxed sm:text-base">
            <TechLink text="Fullstack Cloudflare knowledge is a big plus" />
          </span>
        </motion.li>
        <motion.li variants={itemVariants} className="flex items-start gap-2">
          <span className="text-brand mt-1 shrink-0 text-sm sm:text-base">•</span>
          <span className="text-sm leading-relaxed sm:text-base">Chill to work with</span>
        </motion.li>
      </motion.ul>

      <motion.p
        variants={itemVariants}
        className="mb-4 break-words text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base"
      >
        <span className="font-medium">The Stack:</span>{" "}
        <TechLink text="TypeScript monorepo running on Cloudflare. ElectricSQL for sync, Postgres with Drizzle, tRPC for the API, and a browser extension built with TanStack Router + React." />
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base"
      >
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
