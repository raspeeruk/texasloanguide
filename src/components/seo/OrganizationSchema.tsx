import { JsonLd } from "./JsonLd";
import { siteConfig } from "@/lib/site.config";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/${siteConfig.domain.replace(/\./g, "-")}-logo.png`,
    description: `${siteConfig.name} is a ${siteConfig.voice.companyDescriptor} that connects borrowers with lenders. Compare personal loans, payday loans, and more.`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteConfig.url}/contact`,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter].filter(
      Boolean
    ),
  };

  return <JsonLd data={data} />;
}
