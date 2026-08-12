import type { ReactNode } from "react";
import { CaseStudyMetadata, type CaseStudyMetadataItem } from "./CaseStudyMetadata";
import { HeroOverview, type HeroOverviewPanel } from "./HeroOverview";

type CaseStudyHeroProps = {
  backLink: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  deck: ReactNode;
  overviewPanels?: HeroOverviewPanel[];
  metadataItems: CaseStudyMetadataItem[];
  metadataClassName?: string;
  mediaSlots?: ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2";
};

export function CaseStudyHero({
  backLink,
  eyebrow,
  title,
  deck,
  overviewPanels,
  metadataItems,
  metadataClassName,
  mediaSlots,
  className = "case-hero case-shell",
  headingLevel = "h1",
}: CaseStudyHeroProps) {
  const Heading = headingLevel;
  return <header className={className} data-component="CaseStudyHero">
    {backLink}
    <p className="eyebrow">{eyebrow}</p>
    <Heading>{title}</Heading>
    <p className="case-deck">{deck}</p>
    {overviewPanels?.length ? <HeroOverview panels={overviewPanels} /> : null}
    <CaseStudyMetadata items={metadataItems} className={metadataClassName} />
    {mediaSlots}
  </header>;
}
