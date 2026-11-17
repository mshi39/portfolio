import { ActionLink } from "./components/ActionLink";
import { ContactCallout } from "./components/ContactCallout";
import { PortfolioFooter } from "./components/PortfolioFooter";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { PortfolioHero } from "./components/PortfolioHero";
import { PortraitStage } from "./components/PortraitStage";
import { ScrollCue } from "./components/ScrollCue";
import { WorkSelection } from "./components/WorkSelection";

export default function Home() {
  return (
    <main>
      <PortfolioHeader />
      <PortfolioHero
        eyebrow="Product designer · Design strategist"
        title={<>Hi there, I&apos;m <span className="name-highlight">Melissa Shi</span></>}
        lede={<><strong>AI-powered enterprise SaaS products</strong> are my passion. As a UX designer, I transform complex workflows into research-based, scalable, high-impact digital solutions.</>}
        note="Collaborative. Innovative. Reliable. Impactful."
        actions={<><ActionLink href="https://drive.google.com/file/d/1jpwHy6RFQeSLDYWaqkUoXuedW34rSur7/view?usp=sharing">View résumé</ActionLink><ActionLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">LinkedIn</ActionLink><ActionLink href="https://medium.com/@shineew16" variant="secondary">Medium</ActionLink></>}
        portrait={<PortraitStage src="/portfolio/melissa-hero.png" alt="Melissa Shi smiling" ariaLabel="Portrait of Melissa Shi" width={1086} height={1448} priority />}
        scrollCue={<ScrollCue href="#selected-work">Explore my work</ScrollCue>}
      />
      <WorkSelection />
      <ContactCallout eyebrow={<>There&apos;s more to the story</>} title="Curious about how I think and create?" body="Get to know the designer behind the work—or come say hello on LinkedIn." actions={<><ActionLink href="/about">About me</ActionLink><ActionLink href="https://www.linkedin.com/in/melissaxshi/" variant="secondary">Let&apos;s connect</ActionLink></>} />
      <PortfolioFooter />
    </main>
  );
}
