import { Fragment, type ReactNode } from "react";

export type RecommendationCardItem = {
  segments: ReactNode[];
  customerCard?: boolean;
};

export function RecommendationCard({ sequence, segments, customerCard = false }: RecommendationCardItem & { sequence: number }) {
  const className = `recommendation-card${customerCard ? " feedback-customer-card" : ""}`;
  return <article className={className} data-component="RecommendationCard">
    <span>{String(sequence).padStart(2, "0")}</span>
    {segments.map((segment, index) => <Fragment key={index}>{segment}</Fragment>)}
  </article>;
}
