"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { highlightTechTerms } from "@/lib/tech-links";

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  shortDescription: string;
  requirements: string[];
  delay?: number;
}

export const JobCard = ({
  title,
  department,
  location,
  type,
  shortDescription,
  requirements,
  delay = 0,
}: JobCardProps) => {
  return (
    <motion.div
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="border-divide group relative h-full overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg dark:bg-neutral-900"
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.05), transparent 70%)",
        }}
      />

      <div className="flex flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-brand rounded-full border border-current px-2 py-0.5 text-xs font-medium">
              {department}
            </span>
            <span className="rounded-full border border-neutral-300 px-2 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
              {type}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {location}
          </p>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">
          {shortDescription}
        </p>

        {/* Requirements with tech links */}
        <div className="mb-4 flex-1">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-white">
            Requirements:
          </h4>
          <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
            {requirements.slice(0, 3).map((req, index) => {
              const segments = highlightTechTerms(req);
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.1 + index * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-brand mt-1">•</span>
                  <span>
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
                  </span>
                </motion.li>
              );
            })}
            {requirements.length > 3 && (
              <li className="text-xs italic text-neutral-500">
                +{requirements.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto"
        >
          <button className="text-brand group/btn flex w-full items-center justify-center rounded-md border border-current px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950">
            Learn More
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="ml-2"
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
