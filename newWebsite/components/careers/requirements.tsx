import Link from "next/link";

export const CoFounderRequirements = () => {
  return (
    <div className="flex flex-col items-start justify-center px-4 py-6 md:px-8">
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
        I've built MCP-B (and pretty much everything else) myself so far. It's been a fun ride,
        but I'm looking for someone smart and cool to help take this to the next level.
      </p>
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
        Ideal co-founder:
      </p>
      <ul className="mb-6 space-y-2 text-neutral-600 dark:text-neutral-400">
        <li className="flex items-start gap-2">
          <span className="text-brand mt-1">•</span>
          <span>Strong technical chops (web dev, TypeScript, React)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand mt-1">•</span>
          <span>Genuinely excited about AI and developer tools</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand mt-1">•</span>
          <span>Good at shipping stuff and scaling things</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand mt-1">•</span>
          <span>Chill to work with</span>
        </li>
      </ul>
      <p className="text-neutral-600 dark:text-neutral-400">
        Hit me up on{" "}
        <Link
          href="https://www.linkedin.com/in/alex-nahas/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline hover:no-underline"
        >
          LinkedIn
        </Link>{" "}
        if you're interested.
      </p>
    </div>
  );
};
