import Link from "next/link";

interface AuthorBylineProps {
  name: string;
  slug: string;
  credentials: string;
  reviewDate: string;
}

export function AuthorByline({
  name,
  slug,
  credentials,
  reviewDate,
}: AuthorBylineProps) {
  return (
    <div className="mt-8 flex items-center gap-4 border-t border-gray-200 pt-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <p className="font-medium text-gray-900">
          Reviewed by{" "}
          <Link href={`/authors/${slug}`} className="text-brand underline">
            {name}
          </Link>
          <span className="text-gray-500">, {credentials}</span>
        </p>
        <p className="text-sm text-gray-500">
          Last updated:{" "}
          <time dateTime={reviewDate}>
            {new Date(reviewDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </p>
      </div>
    </div>
  );
}
