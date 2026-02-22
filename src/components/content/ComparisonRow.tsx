interface ComparisonStat {
  label: string;
  value: string;
}

interface ComparisonOption {
  title: string;
  stats: ComparisonStat[];
  recommended?: boolean;
  variant?: "green" | "red" | "gray";
}

interface ComparisonRowProps {
  title?: string;
  options: [ComparisonOption, ComparisonOption];
}

const optionStyles = {
  green: {
    border: "border-brand-light",
    bg: "bg-brand-lighter",
    title: "text-brand-dark",
  },
  red: {
    border: "border-red-200",
    bg: "bg-red-50",
    title: "text-red-800",
  },
  gray: {
    border: "border-gray-200",
    bg: "bg-white",
    title: "text-gray-900",
  },
};

export function ComparisonRow({ title, options }: ComparisonRowProps) {
  if (!options) return null;
  return (
    <div className="my-8" role="region" aria-label={title ?? "Comparison"}>
      {title && (
        <p className="mb-4 text-lg font-semibold text-gray-900">{title}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option, i) => {
          const style = optionStyles[option.variant ?? "gray"];
          return (
            <div
              key={i}
              className={`relative rounded-lg border-2 p-5 ${style.border} ${style.bg}`}
            >
              {option.recommended && (
                <span className="absolute -top-3 left-4 rounded-full bg-brand px-3 py-0.5 text-xs font-medium text-white">
                  Better Option
                </span>
              )}
              <p className={`mb-4 text-lg font-bold ${style.title}`}>
                {option.title}
              </p>
              <div className="space-y-3">
                {option.stats.map((stat, j) => (
                  <div
                    key={j}
                    className="flex items-baseline justify-between gap-2 border-b border-gray-200/60 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-xs text-gray-500">{stat.label}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
