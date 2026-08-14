import { isValidElement, type ReactNode } from "react";
import { InsightCard } from "./InsightCard";
import { MetricCard } from "./MetricCard";

type InsightGridProps = {
  mode: "comparison" | "insights" | "outcomes";
  groups?: ReactNode[];
  children?: ReactNode;
};

export function InsightGrid({ mode, groups = [], children }: InsightGridProps) {
  if (mode === "insights" && groups.length === 5) return <div className="metrics-grid" data-component="InsightGrid">{groups.map((group, index) => {
    const label = isValidElement(group) ? String(group.props.children) : String(group);
    const [icon, ...words] = label.split(" ");
    return <MetricCard key={index} value={`${String(index + 1).padStart(2, "0")} ${icon}`} label={words.join(" ")} />;
  })}</div>;
  return <div className={`feedback-${mode}-grid`} data-component="InsightGrid">
    {groups.map((group, index) => <InsightCard key={index} variant={mode === "comparison" && index === 0 ? "highlighted" : "default"}>{group}</InsightCard>)}
    {children}
  </div>;
}
