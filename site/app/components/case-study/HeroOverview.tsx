import type { ReactNode } from "react";

export type HeroOverviewPanel = {
  heading: string;
  content: ReactNode;
};

export function HeroOverview({ panels }: { panels: HeroOverviewPanel[] }) {
  return <div className="feedback-hero-overview" data-component="HeroOverview">
    {panels.map((panel, index) => <div key={`${panel.heading}-${index}`}>
      <h2>{panel.heading}</h2>
      {panel.content}
    </div>)}
  </div>;
}
