import type { ReactNode } from "react";
import { RecommendationCard, type RecommendationCardItem } from "./RecommendationCard";

export function RecommendationList({ cards, children }: { cards?: RecommendationCardItem[]; children?: ReactNode }) {
  return <div className="recommendation-list" data-component="RecommendationList">{children ?? cards?.map((card, index) => (
    <RecommendationCard key={index} sequence={index + 1} {...card} />
  ))}</div>;
}
