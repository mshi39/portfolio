import type { ReactNode } from "react";

type PortfolioHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  note: ReactNode;
  actions: ReactNode;
  portrait: ReactNode;
  scrollCue: ReactNode;
};

export function PortfolioHero({ eyebrow, title, lede, note, actions, portrait, scrollCue }: PortfolioHeroProps) {
  return (
    <section className="hero shell" data-component="PortfolioHero" aria-labelledby="intro-title">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="intro-title">{title}</h1>
        <p className="hero-lede">{lede}</p>
        <p className="hero-note">{note}</p>
        <div className="hero-actions" aria-label="Professional profiles">{actions}</div>
        {scrollCue}
      </div>
      {portrait}
    </section>
  );
}
