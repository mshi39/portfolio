import { RecommendationCard, type RecommendationCardItem } from "./RecommendationCard";

export function RecommendationList({ cards }: { cards: RecommendationCardItem[] }) {
  return <div className="feedback-pipeline-grid" data-component="RecommendationList">{cards.map((card, index) => (
    <RecommendationCard key={index} sequence={index + 1} {...card} />
  ))}</div>;
}
