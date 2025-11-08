export const techLinks: Record<string, string> = {
  // Languages
  TypeScript: "https://www.typescriptlang.org/",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  Python: "https://www.python.org/",
  Go: "https://go.dev/",

  // Frontend Frameworks & Libraries
  React: "https://react.dev/",
  "Next.js": "https://nextjs.org/",

  // Design Tools
  Figma: "https://www.figma.com/",
  Sketch: "https://www.sketch.com/",

  // Backend & Runtime
  "Node.js": "https://nodejs.org/",

  // ML/AI Frameworks
  TensorFlow: "https://www.tensorflow.org/",
  PyTorch: "https://pytorch.org/",

  // Cloud Platforms
  Cloudflare: "https://www.cloudflare.com/",
  AWS: "https://aws.amazon.com/",
  GCP: "https://cloud.google.com/",
  Azure: "https://azure.microsoft.com/",
};

/**
 * Converts a text string into an array of segments, where tech terms are linked
 * and other text remains plain
 */
export function highlightTechTerms(text: string): Array<{
  text: string;
  link?: string;
}> {
  const segments: Array<{ text: string; link?: string }> = [];
  let remainingText = text;

  // Sort tech terms by length (longest first) to match longer terms before shorter ones
  const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);

  while (remainingText.length > 0) {
    let foundMatch = false;

    for (const tech of sortedTechs) {
      const index = remainingText.indexOf(tech);

      if (index === 0) {
        // Tech term is at the start
        segments.push({
          text: tech,
          link: techLinks[tech],
        });
        remainingText = remainingText.slice(tech.length);
        foundMatch = true;
        break;
      } else if (index > 0) {
        // Tech term found later in the string
        // Add the text before it first
        segments.push({
          text: remainingText.slice(0, index),
        });
        segments.push({
          text: tech,
          link: techLinks[tech],
        });
        remainingText = remainingText.slice(index + tech.length);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      // No tech terms found, add remaining text
      segments.push({
        text: remainingText,
      });
      break;
    }
  }

  return segments;
}
