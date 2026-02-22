import Link from "next/link";

interface QuickApplyWidgetProps {
  amount?: string;
  state?: string;
}

export function QuickApplyWidget({ amount, state }: QuickApplyWidgetProps) {
  const params = new URLSearchParams();
  if (amount) params.set("amount", amount);
  if (state) params.set("state", state);
  const href = `/apply${params.toString() ? `?${params.toString()}` : ""}`;

  return (
    <div className="rounded-lg border border-brand-light bg-brand-lighter p-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        Ready to Apply?
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        Check your options in minutes. No impact on your credit score to get
        started.
      </p>
      <Link
        href={href}
        className="block w-full rounded-lg bg-brand px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        See My Options
      </Link>
      <p className="mt-3 text-center text-xs text-gray-400">
        Secure 256-bit SSL encryption
      </p>
    </div>
  );
}
