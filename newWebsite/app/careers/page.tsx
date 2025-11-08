import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { SectionHeading } from "@/components/seciton-heading";
import { SubHeading } from "@/components/subheading";
import { CoFounderRequirements } from "@/components/careers/requirements";
import { JobListings } from "@/components/careers/job-listings";

import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Careers - MCP-B",
  description:
    "Join MCP-B and help build the future of AI workflows. Explore open positions in engineering, design, and internships.",
});

export default function CareersPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center border-x pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-32">
            <Badge text="We're Hiring" />
            <SectionHeading className="mt-4 text-left">
              Join Us in Building <br />
              the Future of AI
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              MCP-B brings the Model Context Protocol to browsers, making it easy
              for web apps to work with AI agents. Join our team and help shape
              the future of AI-powered workflows.
            </SubHeading>
          </div>
          <CoFounderRequirements />
        </div>
      </Container>

      {/* Job Listings Section */}
      <JobListings />

      <CTA />
      <DivideX />
    </main>
  );
}
