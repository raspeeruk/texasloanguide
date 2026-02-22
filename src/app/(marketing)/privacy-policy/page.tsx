import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `${SITE_NAME} privacy policy. Learn how we collect, use, and protect your personal information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: February 2026</p>

      <div className="space-y-6 text-gray-600">
        <p>
          This Privacy Policy describes how {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares your personal information when you use our website and services.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
        <p>We collect information that you provide directly to us when you use our loan comparison service, including:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Name and contact information</li>
          <li>Financial information such as income and employment details</li>
          <li>The loan amount and purpose you are seeking</li>
          <li>Your state of residence</li>
        </ul>
        <p>We also collect technical information automatically, including your IP address, browser type, and pages visited.</p>

        <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Connect you with lenders in our network who may offer you loan products</li>
          <li>Improve our website and services</li>
          <li>Communicate with you about our services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Information Sharing</h2>
        <p>
          When you submit a loan inquiry through our platform, your information is shared with lenders in our network for the purpose of providing you with loan offers. We do not sell your personal information to third parties for marketing purposes without your explicit consent.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Data Security</h2>
        <p>
          We use industry-standard security measures, including 256-bit SSL encryption, to protect your personal information during transmission and storage.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
        <p>
          Depending on your state of residence, you may have rights regarding your personal information, including the right to access, correct, or delete your data. California residents have additional rights under the CCPA. Contact us at{" "}
          <a href={`mailto:${siteConfig.emails.privacy}`} className="text-brand underline">{siteConfig.emails.privacy}</a> to exercise your rights.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Contact</h2>
        <p>
          For privacy-related questions, contact us at{" "}
          <a href={`mailto:${siteConfig.emails.privacy}`} className="text-brand underline">{siteConfig.emails.privacy}</a>.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Related Policies</h2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <Link href="/terms-of-service" className="text-brand underline">Terms of Service</Link>
          </li>
          <li>
            <Link href="/advertiser-disclosure" className="text-brand underline">Advertiser Disclosure</Link> &mdash; how we earn revenue and how it affects our site
          </li>
          <li>
            <Link href="/contact" className="text-brand underline">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
