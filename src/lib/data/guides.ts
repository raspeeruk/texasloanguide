import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface GuideAuthor {
  name: string;
  slug: string;
  credentials: string;
}

export interface GuideFrontmatter {
  title: string;
  description: string;
  slug: string;
  published: boolean;
  publishedDate: string;
  updatedDate: string;
  author: GuideAuthor;
  reviewer: GuideAuthor;
  readingTime: string;
  category: string;
  tags: string[];
  faqs: { question: string; answer: string }[];
}

export interface Guide {
  frontmatter: GuideFrontmatter;
  content: string;
}

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

function getGuideFiles(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllGuides(): Guide[] {
  return getGuideFiles().map((file) => {
    const filePath = path.join(GUIDES_DIR, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);
    return {
      frontmatter: data as GuideFrontmatter,
      content,
    };
  });
}

export function isGuidePublished(frontmatter: GuideFrontmatter): boolean {
  if (!frontmatter.published) return false;
  const today = new Date().toISOString().slice(0, 10);
  return frontmatter.publishedDate <= today;
}

export function getPublishedGuides(): Guide[] {
  return getAllGuides()
    .filter((g) => isGuidePublished(g.frontmatter))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedDate).getTime() -
        new Date(a.frontmatter.updatedDate).getTime()
    );
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.frontmatter.slug === slug);
}

export function getPublishedGuideSlugs(): string[] {
  return getPublishedGuides().map((g) => g.frontmatter.slug);
}
