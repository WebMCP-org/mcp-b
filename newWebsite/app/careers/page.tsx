import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { SectionHeading } from "@/components/seciton-heading";
import { SubHeading } from "@/components/subheading";
import { CoFounderRequirements } from "@/components/careers/requirements";
import { CoFounderResponsibilities } from "@/components/careers/responsibilities";
import { WhyJoinCoFounder } from "@/components/careers/why-join";

import { getSEOTags } from "@/lib/seo";
import Link from "next/link";

export const metadata = getSEOTags({
  title: "Looking for a Co-Founder - MCP-B",
  description:
    "Join us in building the future of browser-based Model Context Protocol. We're looking for a technical co-founder to help shape the future of how web applications interact with AI agents.",
});

export default function CareersPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center border-x pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-32">
            <Badge text="Co-Founder Opportunity" />
            <SectionHeading className="mt-4 text-left">
              Looking for a <br />
              Technical Co-Founder
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              Join us in building MCP-B, an open-source implementation bringing
              the Model Context Protocol to browsers. We're enabling web apps to
              expose tools and context to AI agents, and we need a co-founder to
              help shape this vision.
            </SubHeading>
            <Button as={Link} href="/contact" className="mt-4">
              Get in Touch
            </Button>
          </div>
          <CoFounderRequirements />
        </div>
      </Container>
      <Container className="border-divide flex flex-col items-center border-x pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-32">
            <Badge text="The Role" />
            <SectionHeading className="mt-4 text-left">
              Co-Founder <br />
              Responsibilities
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              As a co-founder, you'll wear many hats and shape every aspect of
              MCP-B's development, from technical architecture to community
              engagement.
            </SubHeading>
          </div>
          <CoFounderResponsibilities />
        </div>
      </Container>
      <Container className="border-divide flex flex-col items-center border-x pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-32">
            <Badge text="Why Join" />
            <SectionHeading className="mt-4 text-left">
              Why Join MCP-B <br />
              as a Co-Founder?
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              Build something meaningful at the intersection of web technology
              and AI, with complete ownership and the opportunity to shape the
              future of developer tools.
            </SubHeading>
          </div>
          <WhyJoinCoFounder />
        </div>
      </Container>

      <CTA />
      <DivideX />
    </main>
  );
}
