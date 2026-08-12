import type { ReactNode } from "react";
import { InsightCard } from "./InsightCard";

type InsightGridProps = {
  mode: "comparison" | "insights" | "outcomes";
  groups?: ReactNode[];
  children?: ReactNode;
};

export function InsightGrid({ mode, groups = [], children }: InsightGridProps) {
  return <div className={`feedback-${mode}-grid`} data-component="InsightGrid">
    {groups.map((group, index) => <InsightCard key={index} variant={mode === "comparison" && index === 0 ? "highlighted" : "default"}>{group}</InsightCard>)}
    {children}
  </div>;
}
