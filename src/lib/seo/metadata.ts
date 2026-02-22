import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site.config";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  /** Set to "article" for guides/blog posts */
  type?: "website" | "article";
  /** ISO date string for article publish date */
  publishedTime?: string;
  /** ISO date string for article last modified */
  modifiedTime?: string;
  /** Author name for article pages */
  authorName?: string;
}

export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authorName,
}: CreateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          title: `${title} | ${SITE_NAME}`,
          description,
          url,
          siteName: SITE_NAME,
          type: "article",
          ...(publishedTime && { publishedTime }),
          ...(modifiedTime && { modifiedTime }),
          ...(authorName && { authors: [authorName] }),
        }
      : {
          title: `${title} | ${SITE_NAME}`,
          description,
          url,
          siteName: SITE_NAME,
          type: "website",
        };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION };
