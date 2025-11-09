import { Container } from "@/components/container";
import { DivideX } from "@/components/divide";
import { Heading } from "@/components/heading";
import { SubHeading } from "@/components/subheading";
import { getSEOTags } from "@/lib/seo";

const PRIVACY_LAST_UPDATED = "November 9, 2025";
const PRIVACY_CONTACT = "privacy@mcp-b.example.com";

export const metadata = getSEOTags({
  title: "Privacy Policy | MCP-B",
  description:
    "Learn how MCP-B handles data across the browser extension, transports, and hosted experiences.",
  canonicalUrlRelative: "/privacy-policy",
  keywords: [
    "MCP-B privacy policy",
    "browser model context protocol data handling",
    "WebMCP security",
  ],
});

export default function PrivacyPolicyPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading className="!text-left text-4xl lg:text-5xl">
            Privacy Policy
          </Heading>
          <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            Last updated: {PRIVACY_LAST_UPDATED}
          </p>
          <SubHeading
            as="p"
            className="mt-4 !text-left text-base md:text-lg lg:text-xl"
          >
            MCP-B (&quot;we,&quot; &quot;our,&quot; or &quot;the Service&quot;)
            is committed to protecting your privacy. This policy explains how
            our browser extension, transports, and hosted applications handle
            data.
          </SubHeading>
          <article className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
            <h2>Overview</h2>
            <p>
              MCP-B focuses on giving AI agents structured access to the tools
              you expose through your website. We minimize the data we process
              and provide transparency for anything we retain.
            </p>

            <h2>Data Collection and Usage</h2>

            <h3>What We Don&apos;t Collect</h3>
            <ul>
              <li>
                We do <strong>not</strong> collect any personal information
                without your explicit consent.
              </li>
              <li>We do not track your browsing activity.</li>
              <li>We never sell or share your data with third parties.</li>
            </ul>

            <h3>Browser Extension Data</h3>
            <p>The MCP-B browser extension stores the following data locally:</p>
            <ul>
              <li>User preferences and settings.</li>
              <li>AI provider configuration (API keys are encrypted).</li>
              <li>Chat history (stored locally, never transmitted).</li>
              <li>MCP server configurations.</li>
            </ul>

            <h3>Web Application Data</h3>
            <p>When using the MCP-B web application, we may store:</p>
            <ul>
              <li>Account information (such as your username).</li>
              <li>Todo items, MCP tools, or other content you create.</li>
              <li>Chat conversations and interaction logs with AI assistants.</li>
            </ul>

            <h2>Browser Extension Permissions</h2>
            <p>Our extension requires certain permissions to function:</p>
            <ul>
              <li>
                <strong>Host Permissions (&lt;all_urls&gt;)</strong>: Only
                invoked when you explicitly ask the AI to interact with a
                webpage.
              </li>
              <li>
                <strong>Storage</strong>: Saves your settings and chat history
                locally.
              </li>
              <li>
                <strong>Tabs &amp; Tab Groups</strong>: Allows the AI assistant
                to manage browser tabs when requested.
              </li>
              <li>
                <strong>Side Panel</strong>: Provides the chat interface for AI
                interactions.
              </li>
              <li>
                <strong>Web Navigation</strong>: Helps the AI understand page
                navigation context when it needs to follow links.
              </li>
              <li>
                <strong>Bookmarks</strong>: Accessed only when you ask the AI to
                search or manage bookmarks.
              </li>
              <li>
                <strong>Windows</strong>: Supports window management features
                when requested.
              </li>
              <li>
                <strong>History</strong>: Queried only when you explicitly ask
                the AI to look through browsing history.
              </li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>When you configure an AI provider (for example, OpenAI or Google):</p>
            <ul>
              <li>Your queries are sent directly to your chosen AI provider.</li>
              <li>
                We do not intercept or store API responses beyond the chat
                interface.
              </li>
              <li>
                Your usage is subject to the privacy policy of each AI provider.
              </li>
            </ul>

            <h2>Data Security</h2>
            <ul>
              <li>All sensitive data (including API keys) is encrypted.</li>
              <li>We use HTTPS for all data transmission.</li>
              <li>
                The browser extension runs entirely in your browser with minimal
                server communication.
              </li>
              <li>
                Web application data is stored securely in our database with
                encryption at rest.
              </li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and export your personal data.</li>
              <li>Request deletion of the data we store.</li>
              <li>Opt out of any data collection.</li>
              <li>Clear all stored data through the extension settings.</li>
            </ul>

            <h2>Data Retention</h2>
            <ul>
              <li>
                Browser extension data: Retained until you clear it or uninstall
                the extension.
              </li>
              <li>
                Web application data: Retained while your account is active.
              </li>
              <li>Deleted data is permanently removed within 30 days.</li>
            </ul>

            <h2>Children&apos;s Privacy</h2>
            <p>
              MCP-B is not intended for children under 13. We do not knowingly
              collect personal information from children under 13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. When we do,
              we will update the &quot;Last updated&quot; date at the top of
              this page and highlight the changes in our release notes.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this policy or our practices:</p>
            <ul>
              <li>
                Email:{" "}
                <a href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</a>
              </li>
              <li>
                GitHub:{" "}
                <a
                  href="https://github.com/WebMCP-org/mcp-b/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  Submit an issue
                </a>
              </li>
            </ul>

            <h2>Consent</h2>
            <p>
              By using MCP-B, you consent to this privacy policy and agree to
              its terms.
            </p>
          </article>
        </div>
      </Container>
      <DivideX />
    </main>
  );
}
