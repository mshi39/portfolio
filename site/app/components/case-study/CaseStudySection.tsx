import type { ReactNode } from "react";
import { RecommendationList } from "./RecommendationList";
export function CaseStudySection({ id, eyebrow, title, children, tone = "white" }: { id: string; eyebrow: string; title: string; children: ReactNode; tone?: "white" | "pink" }) {
  const content = ["collaboration-model", "platform-expansion", "product-vision"].includes(id) ? <RecommendationList>{children}</RecommendationList> : children;
  return <section id={id} className={`case-section case-${tone}`} data-component="CaseStudySection"><div className="case-shell"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{content}</div></section>;
}
