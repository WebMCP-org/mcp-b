export const CoFounderResponsibilities = () => {
  const responsibilities = [
    {
      title: "Technical Leadership",
      items: [
        "Lead the technical architecture and development of MCP-B",
        "Make key decisions about technology stack and implementation patterns",
        "Contribute directly to the codebase and establish best practices",
        "Guide developer experience and API design decisions",
      ],
    },
    {
      title: "Product Vision",
      items: [
        "Help shape the product roadmap and prioritize features",
        "Work closely with the open-source community",
        "Understand developer needs and build tools that solve real problems",
        "Define the future of browser-based AI interactions",
      ],
    },
    {
      title: "Community Building",
      items: [
        "Foster a thriving open-source community around MCP-B",
        "Engage with contributors and review pull requests",
        "Write documentation and create learning resources",
        "Help developers integrate MCP-B into their projects",
      ],
    },
  ];

  return (
    <div className="divide-divide border-divide flex flex-col items-start justify-center divide-y">
      {responsibilities.map((section) => (
        <div key={section.title} className="block px-4 py-6 md:px-8">
          <h3 className="text-brand mb-3 font-medium text-lg">
            {section.title}
          </h3>
          <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
            {section.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-brand mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
