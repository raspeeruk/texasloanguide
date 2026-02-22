"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-lg border border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="pr-4 font-medium text-gray-900">
              {faq.question}
            </span>
            <span
              className="flex-shrink-0 text-gray-400 transition-transform"
              style={{
                transform:
                  openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {openIndex === index && (
            <div className="border-t border-gray-200 px-5 py-4 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
