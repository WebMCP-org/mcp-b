export const CoFounderRequirements = () => {
  const requirements = [
    {
      title: "What We're Looking For",
      items: [
        "Strong technical background in web development and browser technologies",
        "Passionate about AI, developer tools, and open-source",
        "Experience with TypeScript, React, and modern web APIs",
      ],
    },
    {
      title: "What You'll Get",
      items: [
        "Equal equity stake and decision-making power",
        "Build something meaningful in the AI ecosystem",
        "Shape the future of browser-based AI interactions",
      ],
    },
  ];

  return (
    <div className="divide-divide border-divide flex flex-col items-start justify-center divide-y">
      {requirements.map((section) => (
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
