import { ActionLink } from "./components/ActionLink";
import { ContactCallout } from "./components/ContactCallout";
import { PortfolioFooter } from "./components/PortfolioFooter";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { PortfolioHero } from "./components/PortfolioHero";
import { PortraitStage } from "./components/PortraitStage";
import { ProjectPreviewCard } from "./components/ProjectPreviewCard";
import { ScrollCue } from "./components/ScrollCue";
import { ScrollReveal } from "./components/ScrollReveal";
import { SectionIntro } from "./components/SectionIntro";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main>
      <PortfolioHeader />
      <PortfolioHero
        eyebrow="Product designer · Design strategist"
        title={<>Hi there, I&apos;m <span className="name-highlight">Melissa Shi</span></>}
        lede={<><strong>AI-powered enterprise SaaS products</strong> are my passion. As a UX designer, I transform complex workflows into research-based, scalable, high-impact digital solutions.</>}
        note="Collaborative. Innovative. Reliable. Impactful."
        actions={<><ActionLink href="https://drive.google.com/file/d/1MeOyIEgyo-7H6YKICb3Wx_NCdbPeXLrx/view?usp=sharing">View résumé</ActionLink><ActionLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">LinkedIn</ActionLink><ActionLink href="https://medium.com/@shineew16" variant="secondary">Medium</ActionLink></>}
        portrait={<PortraitStage src="/portfolio/melissa-hero.png" alt="Melissa Shi smiling" ariaLabel="Portrait of Melissa Shi" width={1086} height={1448} priority />}
        scrollCue={<ScrollCue href="#selected-work">Explore my work</ScrollCue>}
      />
      <section className="work-section" id="selected-work" aria-labelledby="work-title">
        <div className="shell">
          <ScrollReveal><SectionIntro id="work-title" eyebrow="Selected work" title="Turning complex systems into experiences that click." description="A selection of product design and research work across AI, enterprise platforms, and service experiences." /></ScrollReveal>
          <div className="project-grid">{projects.map((project, index) => <ScrollReveal key={project.title} delay={(index % 2) * 90}><ProjectPreviewCard project={project} index={index} /></ScrollReveal>)}</div>
          <ScrollReveal className="more-work"><a className="project-link" href="https://shineew16.wixsite.com/melissashi" target="_blank" rel="noreferrer">View more graduate school projects <span aria-hidden="true">↗</span></a></ScrollReveal>
        </div>
      </section>
      <ContactCallout eyebrow={<>There&apos;s more to the story</>} title="Curious about how I think and create?" body="Get to know the designer behind the work—or come say hello on LinkedIn." actions={<><ActionLink href="/about">About me</ActionLink><ActionLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">Let&apos;s connect</ActionLink></>} />
      <PortfolioFooter />
    </main>
  );
}
