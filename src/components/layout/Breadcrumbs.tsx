import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1">
              <span aria-hidden="true">/</span>
              {index === items.length - 1 ? (
                <span className="text-gray-900">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-brand">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
