import { ContentIcon } from "./ContentIcon";

interface CalloutProps {
  type: "tip" | "warning" | "info" | "cost";
  title?: string;
  children: React.ReactNode;
}

const typeConfig = {
  tip: {
    container: "border-brand-accent bg-brand-lighter",
    title: "text-brand-dark",
    icon: "text-brand-accent",
    iconName: "check" as const,
    defaultTitle: "Tip",
  },
  warning: {
    container: "border-amber-500 bg-amber-50",
    title: "text-amber-800",
    icon: "text-amber-500",
    iconName: "warning" as const,
    defaultTitle: "Warning",
  },
  info: {
    container: "border-blue-500 bg-blue-50",
    title: "text-blue-800",
    icon: "text-blue-500",
    iconName: "info" as const,
    defaultTitle: "Good to Know",
  },
  cost: {
    container: "border-red-500 bg-red-50",
    title: "text-red-800",
    icon: "text-red-500",
    iconName: "dollar" as const,
    defaultTitle: "Cost Alert",
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = typeConfig[type];
  const displayTitle = title ?? config.defaultTitle;

  return (
    <div
      className={`my-6 rounded-lg border-l-4 p-5 ${config.container}`}
      role="note"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className={config.icon}>
          <ContentIcon name={config.iconName} size={20} />
        </span>
        <p className={`font-semibold ${config.title}`}>{displayTitle}</p>
      </div>
      <div className="text-sm leading-relaxed text-gray-700">{children}</div>
    </div>
  );
}
