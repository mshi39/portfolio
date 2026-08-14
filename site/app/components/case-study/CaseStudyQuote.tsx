import type { ReactNode } from "react";

export function CaseStudyQuote({ children, attribution, className = "" }: { children: ReactNode; attribution?: ReactNode; className?: string }) {
  return <blockquote className={`case-quote${className ? ` ${className}` : ""}`} data-component="CaseStudyQuote">
    {children}
    {attribution && <footer><cite>{attribution}</cite></footer>}
  </blockquote>;
}
