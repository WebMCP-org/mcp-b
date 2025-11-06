export const CoFounderResponsibilities = () => {
  const responsibilities = [
    {
      title: "Technical Leadership",
      description:
        "Lead the technical architecture and development of MCP-B. Make key decisions about the technology stack, implementation patterns, and developer experience. Contribute directly to the codebase and establish engineering best practices.",
    },
    {
      title: "Product Vision",
      description:
        "Help shape the product roadmap and prioritize features. Work closely with the open-source community to understand developer needs and build tools that solve real problems in the AI ecosystem.",
    },
    {
      title: "Community Building",
      description:
        "Foster a thriving open-source community around MCP-B. Engage with contributors, review pull requests, write documentation, and help developers integrate MCP-B into their projects.",
    },
  ];

  return (
    <div className="mt-12 w-full max-w-4xl space-y-8 px-4 md:px-8">
      {responsibilities.map((item) => (
        <div
          key={item.title}
          className="rounded-lg bg-gray-50 p-6 dark:bg-neutral-800"
        >
          <h3 className="text-brand mb-4 text-xl font-semibold">
            {item.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};
