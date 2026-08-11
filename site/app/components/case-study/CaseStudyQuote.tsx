import type { ReactNode } from "react";

export function CaseStudyQuote({ children, attribution, variant = "default" }: { children: ReactNode; attribution?: ReactNode; variant?: "default" | "workflow-question" }) {
  const className = `case-quote${variant === "workflow-question" ? " feedback-workflow-question" : ""}`;
  return <blockquote className={className} data-component="CaseStudyQuote">
    {children}
    {attribution && <footer><cite>{attribution}</cite></footer>}
  </blockquote>;
}
