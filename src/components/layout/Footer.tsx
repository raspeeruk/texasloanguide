import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

const FOOTER_LINKS = {
  "Loan Amounts": [
    { label: "$100 Loan", href: "/borrow/100-dollar-loan" },
    { label: "$300 Loan", href: "/borrow/300-dollar-loan" },
    { label: "$500 Loan", href: "/borrow/500-dollar-loan" },
    { label: "$750 Loan", href: "/borrow/750-dollar-loan" },
    { label: "$1,000 Loan", href: "/borrow/1000-dollar-loan" },
    { label: "$1,500 Loan", href: "/borrow/1500-dollar-loan" },
    { label: "All Amounts", href: "/borrow" },
  ],
  "Loan Types": [
    { label: "Payday Loans", href: "/loans/payday" },
    { label: "Bad Credit Loans", href: "/loans/bad-credit" },
    { label: "Same Day Loans", href: "/loans/same-day" },
    { label: "Emergency Loans", href: "/loans/emergency" },
    { label: "No Credit Check", href: "/loans/no-credit-check" },
    { label: "Installment Loans", href: "/loans/installment" },
  ],
  Resources: [
    { label: "Loan Calculator", href: "/calculator" },
    { label: "States", href: "/states" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Guides", href: "/guides" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Editorial Guidelines", href: "/editorial-guidelines" },
    { label: "Advertiser Disclosure", href: "/advertiser-disclosure" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="text-xs leading-relaxed text-gray-400">
            <p className="font-medium text-gray-500">Important Disclosures</p>
            <p className="mt-2">
              {siteConfig.name} is a {siteConfig.voice.companyDescriptor}, not a
              lender. We connect borrowers with lenders in our network and may
              receive compensation when you are matched with a lender. The
              operator of this website is not a lender, does not make credit
              decisions, and does not broker loans. Your lender will provide you
              with specific terms and rates upon approval.
            </p>
            <p className="mt-2">
              APR ranges and loan terms vary by lender and your individual
              financial situation. Representative example: A $500 loan with a
              12-month term at 199% APR would have monthly payments of
              approximately $72 and a total cost of $864. Actual rates may be
              higher or lower.
            </p>
            <p className="mt-2">
              Not all applicants will qualify. Approval and loan terms are at the
              sole discretion of the lender. Submitting a request does not
              guarantee you will receive a loan offer.
            </p>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
