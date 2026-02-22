import { ContentIcon, type IconName } from "./ContentIcon";

interface Stat {
  value: string;
  label: string;
  icon?: IconName;
}

interface StatsGridProps {
  title?: string;
  stats: Stat[];
  variant?: "green" | "gray";
}

const smColsMap: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function StatsGrid({ title, stats = [], variant = "gray" }: StatsGridProps) {
  const isGreen = variant === "green";
  if (!stats || stats.length === 0) return null;
  const gridCols = smColsMap[Math.min(stats.length, 4)] ?? "grid-cols-2";

  return (
    <div
      className={`my-8 overflow-hidden rounded-xl border ${isGreen ? "border-brand-light bg-brand-lighter" : "border-gray-200 bg-white"}`}
      role="region"
      aria-label={title ?? "Key statistics"}
    >
      {title && (
        <div
          className={`border-b px-6 pt-4 pb-3 ${isGreen ? "border-brand-light" : "border-gray-200"}`}
        >
          <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            {title}
          </p>
        </div>
      )}
      <div className={`grid ${gridCols}`}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-5 ${
              i > 0
                ? `border-l ${isGreen ? "border-brand-light" : "border-gray-100"}`
                : ""
            } ${
              stats.length > 2 && i >= 2
                ? `border-t ${isGreen ? "border-brand-light" : "border-gray-100"}`
                : ""
            }`}
          >
            {stat.icon && (
              <div
                className={`mb-2 ${isGreen ? "text-brand-accent" : "text-gray-400"}`}
              >
                <ContentIcon name={stat.icon} size={20} />
              </div>
            )}
            <p
              className={`text-2xl font-bold ${isGreen ? "text-brand-dark" : "text-gray-900"}`}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
