import Image from "next/image";
import { ButtonLink } from "./components/ButtonLink";
import { ProjectCard } from "./components/ProjectCard";
import { Reveal } from "./components/Reveal";
import { SectionHeading } from "./components/SectionHeading";
import { SiteHeader } from "./components/SiteHeader";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero shell" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">Product designer · Design strategist</p>
          <h1 id="intro-title">Hi there, I&apos;m <span className="name-highlight">Melissa Shi</span></h1>
          <p className="hero-lede"><strong>AI-powered enterprise SaaS products</strong> are my passion. As a UX designer, I transform complex workflows into research-based, scalable, high-impact digital solutions.</p>
          <p className="hero-note">Collaborative. Innovative. Reliable. Impactful.</p>
          <div className="hero-actions" aria-label="Professional profiles">
            <ButtonLink href="https://drive.google.com/file/d/1MeOyIEgyo-7H6YKICb3Wx_NCdbPeXLrx/view?usp=sharing">View résumé</ButtonLink>
            <ButtonLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">LinkedIn</ButtonLink>
            <ButtonLink href="https://medium.com/@shineew16" variant="secondary">Medium</ButtonLink>
          </div>
          <a className="scroll-cue" href="#selected-work">Explore my work <span aria-hidden="true">↓</span></a>
        </div>
        <div className="portrait-stage" aria-label="Portrait of Melissa Shi">
          <span className="shape shape-star" aria-hidden="true">✦</span><span className="shape shape-dot" aria-hidden="true" /><span className="shape shape-ring" aria-hidden="true" />
          <Image unoptimized src="/portfolio/melissa-hero.png" alt="Melissa Shi smiling" width={1086} height={1448} priority className="portrait" />
        </div>
      </section>
      <section className="work-section" id="selected-work" aria-labelledby="work-title">
        <div className="shell">
          <Reveal><SectionHeading eyebrow="Selected work" title="Turning complex systems into experiences that click." description="A selection of product design and research work across AI, enterprise platforms, and service experiences." /></Reveal>
          <div className="project-grid">{projects.map((project, index) => <Reveal key={project.title} delay={(index % 2) * 90}><ProjectCard project={project} index={index} /></Reveal>)}</div>
          <Reveal className="more-work"><ButtonLink href="https://shineew16.wixsite.com/melissashi" variant="secondary">View more graduate school projects</ButtonLink></Reveal>
        </div>
      </section>
      <section className="contact shell" id="about-me" aria-labelledby="contact-title">
        <div className="contact-card"><span className="contact-sparkle" aria-hidden="true">✦</span><p className="eyebrow">There&apos;s more to the story</p><h2 id="contact-title">Curious about how I think and create?</h2><p>Get to know the designer behind the work—or come say hello on LinkedIn.</p><div className="contact-actions"><ButtonLink href="/about">About me</ButtonLink><ButtonLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">Let&apos;s connect</ButtonLink></div></div>
      </section>
      <footer className="footer shell"><p>Designed with curiosity and a little purple magic.</p><p>© {new Date().getFullYear()} Melissa Shi</p></footer>
    </main>
  );
}
