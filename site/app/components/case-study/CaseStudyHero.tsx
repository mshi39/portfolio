import type { ReactNode } from "react";
import { CaseStudyMetadata, type CaseStudyMetadataItem } from "./CaseStudyMetadata";

type CaseStudyHeroProps = {
  backLink: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  deck: ReactNode;
  overview: ReactNode;
  metadataItems: CaseStudyMetadataItem[];
  metadataClassName?: string;
  mediaSlots?: ReactNode;
  className?: string;
};

export function CaseStudyHero({
  backLink,
  eyebrow,
  title,
  deck,
  overview,
  metadataItems,
  metadataClassName,
  mediaSlots,
  className = "case-hero case-shell",
}: CaseStudyHeroProps) {
  return <header className={className} data-component="CaseStudyHero">
    {backLink}
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <p className="case-deck">{deck}</p>
    {overview}
    <CaseStudyMetadata items={metadataItems} className={metadataClassName} />
    {mediaSlots}
  </header>;
}
