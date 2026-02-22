import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function AffiliateDisclosure() {
  return (
    <div className="mt-8 rounded-lg bg-gray-50 p-4 text-xs text-gray-500">
      <p className="mb-1 font-medium text-gray-600">Advertiser Disclosure</p>
      <p>
        {siteConfig.name} is a {siteConfig.voice.companyDescriptor}. We may
        receive compensation when you are connected with a lender through our
        platform. This compensation may affect how and where lenders appear on
        our site but does not affect our editorial content or ratings.{" "}
        <Link href="/advertiser-disclosure" className="text-brand underline">
          Full disclosure
        </Link>
      </p>
    </div>
  );
}
