import type { ReactNode } from "react";

export function InsightCard({ children, variant = "default" }: {
  children: ReactNode;
  variant?: "default" | "highlighted";
}) {
  const className = `insight-card${variant === "highlighted" ? " insight-card-highlighted" : ""}`;
  return <article className={className} data-component="InsightCard">{children}</article>;
}
