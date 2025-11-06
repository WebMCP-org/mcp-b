export const WhyJoinCoFounder = () => {
  const reasons = [
    {
      title: "Impact & Ownership",
      items: [
        "Complete ownership over your work and technical decisions",
        "Equal equity stake and decision-making power",
        "Build something meaningful in the AI ecosystem",
        "See direct impact on the company and community",
      ],
    },
    {
      title: "Culture & Values",
      items: [
        "High-paced environment with startup velocity",
        "Absolute integrity in all decisions and interactions",
        "People-first culture focused on growth and well-being",
        "Vision-driven approach to reimagining the future",
      ],
    },
    {
      title: "Opportunity & Growth",
      items: [
        "Shape the future of browser-based AI interactions",
        "Work at the intersection of web tech and AI",
        "Build open-source tools used by developers worldwide",
        "Join a generational shift in how apps interact with AI",
      ],
    },
  ];

  return (
    <div className="divide-divide border-divide flex flex-col items-start justify-center divide-y">
      {reasons.map((section) => (
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
