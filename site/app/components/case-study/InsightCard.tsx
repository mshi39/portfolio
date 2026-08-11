import type { ReactNode } from "react";

export function InsightCard({ children }: { children: ReactNode }) {
  return <article data-component="InsightCard">{children}</article>;
}
