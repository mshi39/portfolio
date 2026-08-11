import type { ReactNode } from "react";

type PortfolioHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  note: ReactNode;
  actions: ReactNode;
  portrait: ReactNode;
  scrollCue: ReactNode;
  headingLevel?: "h1" | "h2";
};

export function PortfolioHero({ eyebrow, title, lede, note, actions, portrait, scrollCue, headingLevel = "h1" }: PortfolioHeroProps) {
  const Heading = headingLevel;
  return (
    <section className="hero shell" data-component="PortfolioHero" aria-labelledby="intro-title">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <Heading id="intro-title">{title}</Heading>
        <p className="hero-lede">{lede}</p>
        <p className="hero-note">{note}</p>
        <div className="hero-actions" aria-label="Professional profiles">{actions}</div>
        {scrollCue}
      </div>
      {portrait}
    </section>
  );
}
