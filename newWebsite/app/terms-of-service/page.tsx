import Link from "next/link";

import { Container } from "@/components/container";
import { DivideX } from "@/components/divide";
import { Heading } from "@/components/heading";
import { SubHeading } from "@/components/subheading";
import { getSEOTags } from "@/lib/seo";

const TERMS_LAST_UPDATED = "January 15, 2025";
const LEGAL_CONTACT = "legal@mcp-b.example.com";

export const metadata = getSEOTags({
  title: "Terms of Service | MCP-B",
  description:
    "Understand the rules that govern your use of MCP-B, the browser-based Model Context Protocol implementation.",
  canonicalUrlRelative: "/terms-of-service",
  keywords: [
    "MCP-B terms of service",
    "WebMCP legal terms",
    "browser model context protocol agreement",
  ],
});

export default function TermsOfServicePage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading className="!text-left text-4xl lg:text-5xl">
            Terms of Service
          </Heading>
          <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            Last updated: {TERMS_LAST_UPDATED}
          </p>
          <SubHeading
            as="p"
            className="mt-4 !text-left text-base md:text-lg lg:text-xl"
          >
            These Terms of Service (&quot;Terms&quot;) govern your use of MCP-B,
            the WebMCP bridge maintained by Kukumis Inc. (&quot;MCP-B,&quot;
            &quot;we,&quot; or &quot;us&quot;). By accessing our websites, open
            source packages, browser extension, or hosted services
            (collectively, the &quot;Services&quot;), you agree to these Terms.
          </SubHeading>

          <article className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
            <h2>1. Acceptance of Terms</h2>
            <p>
              You must be able to form a binding contract to use the Services.
              If you are accessing MCP-B on behalf of an organization, you
              represent that you have authority to bind that organization to
              these Terms.
            </p>

            <h2>2. Eligibility &amp; Accounts</h2>
            <p>
              Certain features (such as private transports or hosted hubs) may
              require an account. You are responsible for safeguarding your
              credentials and for all activity that occurs under your account.
            </p>

            <h2>3. Scope of the Services</h2>
            <p>The Services include:</p>
            <ul>
              <li>The mcp-b.ai website, documentation, and support resources.</li>
              <li>
                The MCP-B browser extension, transports, SDKs, and reference
                applications.
              </li>
              <li>Hosted MCP hubs or preview environments we make available.</li>
            </ul>
            <p>
              Some components are open source and provided under their own
              licenses. These Terms govern your relationship with MCP-B but do
              not override any open-source license obligations.
            </p>

            <h2>4. User Responsibilities</h2>
            <ul>
              <li>
                Only expose tools and data that you are authorized to share with
                AI agents.
              </li>
              <li>
                Comply with all applicable laws when ingesting or exporting data
                through MCP-B.
              </li>
              <li>
                Do not misuse authentication flows, impersonate others, or
                circumvent security controls.
              </li>
            </ul>

            <h2>5. AI Providers &amp; Third Parties</h2>
            <p>
              MCP-B brokers connections between your browser and AI providers
              (for example, Anthropic or OpenAI). You are solely responsible for
              complying with each provider&apos;s terms, privacy policy, and
              rate limits. MCP-B does not control or accept liability for third
              party services.
            </p>

            <h2>6. Intellectual Property &amp; Open Source</h2>
            <p>
              We retain all rights, title, and interest in the Services and the
              MCP-B marks. Open-source repositories remain covered by their
              respective licenses, and contributions you submit are governed by
              the applicable contribution guidelines. You retain ownership of
              your content but grant us a license to host and display it as
              needed to operate the Services.
            </p>

            <h2>7. Beta Features &amp; Feedback</h2>
            <p>
              MCP-B frequently ships experimental transports, Chrome extension
              updates, and desktop bridges. These beta features may change,
              break, or be discontinued without notice. If you provide feedback,
              you grant us permission to use it without restriction.
            </p>

            <h2>8. Prohibited Conduct</h2>
            <p>When using MCP-B you agree not to:</p>
            <ul>
              <li>Reverse engineer or probe the Services for vulnerabilities.</li>
              <li>Use MCP-B to distribute malware or launch credential attacks.</li>
              <li>Attempt to access data you do not own or have permission to use.</li>
              <li>
                Misrepresent MCP-B as an official W3C standard or endorsement.
              </li>
            </ul>

            <h2>9. Warranties &amp; Disclaimers</h2>
            <p>
              MCP-B is provided on an &quot;as is&quot; and &quot;as available&quot;
              basis. We disclaim all warranties, whether express or implied,
              including merchantability, fitness for a particular purpose, and
              non-infringement. Your use of the Services is at your own risk.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, MCP-B and Kukumis Inc.
              will not be liable for indirect, incidental, special,
              consequential, or exemplary damages, or for lost profits, data, or
              goodwill. Our aggregate liability will not exceed the amount you
              paid (if any) for the Services in the 12 months preceding the
              claim.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold MCP-B, Kukumis Inc., and our
              affiliates harmless from any claims, damages, or expenses arising
              from your use of the Services, your content, or your violation of
              these Terms.
            </p>

            <h2>12. Termination &amp; Suspension</h2>
            <p>
              We may suspend or terminate access to the Services at any time for
              any reason, including violation of these Terms. You may stop using
              MCP-B at any time. Sections that by their nature should survive
              termination (for example, intellectual property, disclaimers, and
              limitations of liability) will remain in effect.
            </p>

            <h2>13. Changes to These Terms</h2>
            <p>
              We may update these Terms periodically. When we do, we will revise
              the &quot;Last updated&quot; date and provide notice via release
              notes or email if the changes are material. Continued use of MCP-B
              after changes take effect constitutes acceptance of the updated
              Terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California,
              USA, without regard to conflict of laws principles. Any disputes
              will be handled in state or federal courts located in San
              Francisco County, California.
            </p>

            <h2>15. Contact</h2>
            <p>
              Questions about these Terms can be directed to{" "}
              <a href={`mailto:${LEGAL_CONTACT}`}>{LEGAL_CONTACT}</a>. For
              privacy-specific inquiries, please review our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
          </article>
        </div>
      </Container>
      <DivideX />
    </main>
  );
}
