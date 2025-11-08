import { Benefits } from "@/components/benefits";
import { CodeExample } from "@/components/code-example";
import { CTA, CTAOrbit } from "@/components/cta";
import { DivideX } from "@/components/divide";
import { FAQs } from "@/components/faqs";
import { Hero } from "@/components/hero";
import { HeroImage } from "@/components/hero-image";
import { HowItWorks } from "@/components/how-it-works";
import { LogoCloud } from "@/components/logo-cloud";
import { Security } from "@/components/security";

import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags();

export default function Home() {
  return (
    <main>
      <DivideX />
      <Hero />
      <DivideX />
      <HeroImage />
      <DivideX />
      <HowItWorks />
      <DivideX />
      <CodeExample />
      <DivideX />
      <Benefits />
      <DivideX />
      <LogoCloud />
      <DivideX />
      <FAQs />
      <DivideX />
      <Security />
      <DivideX />
      <CTA />
      <DivideX />
    </main>
  );
}
