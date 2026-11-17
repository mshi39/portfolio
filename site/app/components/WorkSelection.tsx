"use client";

import { useState } from "react";
import { personalAiProjects, projects } from "../data/projects";
import { ProjectPreviewCard } from "./ProjectPreviewCard";
import { ScrollReveal } from "./ScrollReveal";
import { WorkCategoryToggle } from "./WorkCategoryToggle";

export function WorkSelection() {
  const [active, setActive] = useState<"professional" | "personal">("professional");
  const professional = active === "professional";
  return <section className="work-section" id="selected-work" aria-labelledby="work-title" data-component="WorkSelection">
    <div className="shell">
      <ScrollReveal><header className="section-heading"><WorkCategoryToggle active={active} onChange={setActive} /><h2 id="work-title"><span hidden={!professional}>Turning complex systems into experiences that click.</span><span hidden={professional}>Exploring AI Native Product Design</span></h2><p><span hidden={!professional}>A selection of product design and research work across AI, enterprise platforms, and service experiences.</span><span hidden={professional}>A selection of personal projects exploring the boundaries of AI.</span></p></header></ScrollReveal>
      <div hidden={!professional} aria-hidden={!professional}>
        <div className="project-grid">{projects.map((project, index) => <ScrollReveal key={project.title} delay={(index % 2) * 90}><ProjectPreviewCard project={project} index={index} /></ScrollReveal>)}</div>
        <ScrollReveal className="more-work"><a className="project-link" href="https://shineew16.wixsite.com/melissashi" target="_blank" rel="noreferrer">View more graduate school projects <span aria-hidden="true">↗</span></a></ScrollReveal>
      </div>
      <div hidden={professional} aria-hidden={professional}>
        <div className="project-grid">{personalAiProjects.map((project, index) => <ScrollReveal key={project.title} delay={(index % 2) * 90}><ProjectPreviewCard project={project} index={index} /></ScrollReveal>)}</div>
      </div>
    </div>
  </section>;
}
