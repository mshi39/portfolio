import Image from "next/image";
import { ButtonLink } from "../components/ButtonLink";
import { SiteHeader } from "../components/SiteHeader";

const strengths = [
  ["Systems thinker", "I bring structure to complex workflows and connect research insight to scalable product direction."],
  ["Collaborative partner", "I make space for shared understanding across design, product, engineering, and business teams."],
  ["AI design strategist", "I shape human-centered AI experiences that support confident decisions instead of adding complexity."],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader current="about" />
      <section className="about-hero shell" aria-labelledby="about-title">
        <div className="about-copy"><p className="eyebrow">About Melissa</p><h1 id="about-title">Designing clarity into complex work.</h1><p className="about-lede">I&apos;m Melissa Shi, a product designer and design strategist focused on AI-powered enterprise SaaS. I combine research, systems thinking, and close collaboration to turn complicated workflows into scalable experiences that feel clear and useful.</p><div className="hero-actions"><ButtonLink href="/#selected-work">See my work</ButtonLink><ButtonLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">LinkedIn</ButtonLink></div></div>
        <div className="about-portrait"><Image unoptimized src="/portfolio/melissa-hero.png" alt="Melissa Shi smiling" width={1086} height={1448} priority /><span aria-hidden="true">Design Strategist</span></div>
      </section>
      <section className="strengths-section"><div className="shell"><p className="eyebrow">How I show up</p><h2>Thoughtful strategy, grounded in people.</h2><div className="strength-grid">{strengths.map(([title, description], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
      <section className="contact shell"><div className="contact-card"><p className="eyebrow">Let&apos;s connect</p><h2>Interested in working together?</h2><p>Explore my projects or reach out through LinkedIn to start a conversation.</p><div className="contact-actions"><ButtonLink href="/#selected-work">My Work</ButtonLink><ButtonLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">Say hello</ButtonLink></div></div></section>
      <footer className="footer shell"><p>Designed with curiosity and a little purple magic.</p><p>© {new Date().getFullYear()} Melissa Shi</p></footer>
    </main>
  );
}
