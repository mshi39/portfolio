import type { ReactNode } from "react";

export function InterimDesignCard({ sequence, title, children, media }: { sequence: number; title: string; children: ReactNode; media: ReactNode }) {
  return <article className="recommendation-card interim-design-card" data-component="InterimDesignCard"><span>{String(sequence).padStart(2, "0")}</span><div className="feedback-blocks"><h4>{title}</h4>{children}</div>{media}</article>;
}
