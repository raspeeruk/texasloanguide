import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Apply for a Loan",
  description:
    `Apply for a personal loan through ${SITE_NAME}. Compare offers from multiple lenders in our network. Bad credit considered.`,
  path: "/apply",
  noIndex: true,
});

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Apply", href: "/apply" }]} />

      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Apply for a Loan
      </h1>
      <p className="mb-8 text-gray-600">
        Complete the form below to check your loan options. You&apos;ll receive
        offers from lenders in our network based on your information.
      </p>

      {/* Phonexa embedded form placeholder */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <p className="text-lg font-medium text-gray-500">
          Phonexa Form Embed
        </p>
        <p className="mt-2 text-sm text-gray-400">
          The Phonexa form will be embedded here via their JavaScript widget.
          Replace this placeholder with the Phonexa embed code.
        </p>
        {/*
          To integrate Phonexa:
          1. Get the embed script from your Phonexa Publisher Product
          2. Replace this div with: <div id="phonexa-form"></div>
          3. Add the Phonexa script tag to load the form

          Example:
          <Script src="https://your-phonexa-form-url.js" strategy="lazyOnload" />
        */}
      </div>

      <div className="mt-8 text-xs text-gray-400">
        <p>
          By submitting this form, you agree to our{" "}
          <a href="/terms-of-service" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
          . You consent to being contacted by lenders or their representatives
          regarding your inquiry.
        </p>
      </div>
    </div>
  );
}
