import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    `Get in touch with ${SITE_NAME}. Questions about our service, feedback, or press inquiries.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">Contact Us</h1>

      <div className="space-y-6 text-gray-600">
        <p>
          Have questions about {siteConfig.name}? We&apos;re here to help. You can reach
          us through the following channels:
        </p>

        <div className="rounded-lg border border-gray-200 p-6">
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-gray-900">Email</dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.emails.support}`}
                  className="text-brand underline"
                >
                  {siteConfig.emails.support}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Response Time</dt>
              <dd>We aim to respond within 1-2 business days.</dd>
            </div>
          </dl>
        </div>

        <h2 className="text-xl font-bold text-gray-900">Common Questions</h2>
        <p>
          Before reaching out, you may find the answer to your question in our{" "}
          <Link href="/guides" className="text-brand underline">
            guides section
          </Link>{" "}
          or on the FAQ section of any loan page.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          Important: We Are Not a Lender
        </h2>
        <p>
          {siteConfig.name} is a comparison service, not a lender. If you have
          questions about an existing loan, payment, or account, please contact
          your lender directly. We cannot access, modify, or provide information
          about individual loan accounts.
        </p>
      </div>
    </div>
  );
}
