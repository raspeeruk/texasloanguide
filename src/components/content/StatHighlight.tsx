import { ContentIcon, type IconName } from "./ContentIcon";

interface StatHighlightProps {
  value: string;
  label: string;
  icon?: IconName;
  variant?: "green" | "red" | "gray";
}

const variantStyles = {
  green: {
    container: "border-brand-accent bg-brand-lighter",
    value: "text-brand-dark",
    icon: "text-brand-accent",
  },
  red: {
    container: "border-red-500 bg-red-50",
    value: "text-red-800",
    icon: "text-red-500",
  },
  gray: {
    container: "border-gray-400 bg-gray-50",
    value: "text-gray-800",
    icon: "text-gray-400",
  },
};

export function StatHighlight({
  value,
  label,
  icon,
  variant = "green",
}: StatHighlightProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`my-8 flex items-start gap-4 rounded-lg border-l-4 p-5 ${styles.container}`}
      role="figure"
      aria-label={`${value} — ${label}`}
    >
      {icon && (
        <div className={`mt-1 flex-shrink-0 ${styles.icon}`}>
          <ContentIcon name={icon} size={28} />
        </div>
      )}
      <div>
        <p className={`text-3xl font-bold ${styles.value}`}>{value}</p>
        <p className="mt-1 text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
