import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { SectionHeading } from "@/components/seciton-heading";
import { SubHeading } from "@/components/subheading";
import { CoFounderRequirements } from "@/components/careers/requirements";

import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Looking for a Co-Founder - MCP-B",
  description:
    "I've built MCP-B myself so far, but I'm looking for someone smart and cool to help scale it. If you're into AI, dev tools, and building cool stuff, let's chat.",
});

export default function CareersPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center border-x pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-32">
            <Badge text="Co-Founder Search" />
            <SectionHeading className="mt-4 text-left">
              Looking for a <br />
              Co-Founder
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              MCP-B brings the Model Context Protocol to browsers, making it easy
              for web apps to work with AI agents. I've built it from scratch,
              and now I'm looking for a co-founder to help scale it.
            </SubHeading>
          </div>
          <CoFounderRequirements />
        </div>
      </Container>

      <CTA />
      <DivideX />
    </main>
  );
}
