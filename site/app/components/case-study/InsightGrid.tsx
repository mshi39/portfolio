import type { ReactNode } from "react";
import { InsightCard } from "./InsightCard";

type InsightGridProps = {
  mode: "comparison" | "insights" | "outcomes";
  groups?: ReactNode[];
  children?: ReactNode;
};

export function InsightGrid({ mode, groups = [], children }: InsightGridProps) {
  return <div className={`feedback-${mode}-grid`} data-component="InsightGrid">
    {groups.map((group, index) => <InsightCard key={index}>{group}</InsightCard>)}
    {children}
  </div>;
}
