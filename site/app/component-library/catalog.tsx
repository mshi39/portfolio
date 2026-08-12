import type { ReactNode } from "react";
import { ActionLink } from "../components/ActionLink";
import { ContactCallout } from "../components/ContactCallout";
import { PortfolioFooter } from "../components/PortfolioFooter";
import { PortfolioHeader } from "../components/PortfolioHeader";
import { PortfolioHero } from "../components/PortfolioHero";
import { PortraitStage } from "../components/PortraitStage";
import { ProjectPreviewCard } from "../components/ProjectPreviewCard";
import { ScrollCue } from "../components/ScrollCue";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionIntro } from "../components/SectionIntro";
import { Tag } from "../components/Tag";
import { CaseStudyHero } from "../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../components/case-study/CaseStudyMedia";
import { CaseStudyMetadata } from "../components/case-study/CaseStudyMetadata";
import { CaseStudyQuote } from "../components/case-study/CaseStudyQuote";
import { CaseStudySection } from "../components/case-study/CaseStudySection";
import { VerticalChapterNav } from "../components/case-study/VerticalChapterNav";
import { ContentBlockRenderer } from "../components/case-study/ContentBlockRenderer";
import { InsightCard } from "../components/case-study/InsightCard";
import { InsightGrid } from "../components/case-study/InsightGrid";
import { RecommendationCard } from "../components/case-study/RecommendationCard";
import { RecommendationList } from "../components/case-study/RecommendationList";
import { SimpleContentList } from "../components/case-study/SimpleContentList";
import { WorkflowQuestion } from "../components/case-study/WorkflowQuestion";

export type CatalogCategory = "Foundations" | "Navigation & actions" | "Home" | "Case studies" | "Utility";

export type CatalogEntry = {
  name: string;
  description: string;
  category: CatalogCategory;
  preview: ReactNode;
};

export function BrandColorSwatch({ name, value }: { name: string; value: string }) {
  return <div className="component-library-swatch" data-component="BrandColorSwatch">
    <span className="component-library-swatch-color" style={{ background: value }} aria-hidden="true" />
    <strong>{name}</strong><code>{value}</code>
  </div>;
}

export function TypeSpecimen() {
  return <div className="component-library-type-specimen" data-component="TypeSpecimen">
    <p className="component-library-display-type">Research turns complexity into clarity.</p>
    <p>Product decisions stay legible, useful, and grounded in evidence.</p>
  </div>;
}

export function SurfaceTokenSample() {
  return <div className="component-library-surface-samples" data-component="SurfaceTokenSample">
    <span>Canvas</span><span>Pink surface</span><span>Purple accent</span>
  </div>;
}

const sampleProject = {
  title: "Research-led product concept",
  description: "A representative card showing how project context, imagery, and categories work together.",
  date: "Sample project",
  tags: ["Product Design", "Research"],
  image: "/portfolio/enterprise-search.png",
  href: "#case-studies",
  alt: "Abstract enterprise product interface preview",
};

const sampleChapters = [
  { id: "foundations", label: "Foundations" },
  { id: "home", label: "Home" },
  { id: "case-studies", label: "Case studies" },
];

export const catalog: CatalogEntry[] = [
  {
    name: "BrandColorSwatch",
    description: "Use when documenting the core brand palette and its token values.",
    category: "Foundations",
    preview: <div className="component-library-inline-grid"><BrandColorSwatch name="Purple" value="var(--purple)" /><BrandColorSwatch name="Purple dark" value="var(--purple-dark)" /></div>,
  },
  {
    name: "TypeSpecimen",
    description: "Use when comparing the portfolio display and body typography.",
    category: "Foundations",
    preview: <TypeSpecimen />,
  },
  {
    name: "SurfaceTokenSample",
    description: "Use when checking neutral, soft, and accent surface relationships.",
    category: "Foundations",
    preview: <SurfaceTokenSample />,
  },
  {
    name: "Tag",
    description: "Use when labeling a project with concise disciplines or themes.",
    category: "Foundations",
    preview: <div className="tag-list"><Tag>AI Product Design</Tag><Tag>User Research</Tag></div>,
  },
  {
    name: "PortfolioHeader",
    description: "Use when providing the persistent portfolio identity and primary navigation.",
    category: "Navigation & actions",
    preview: <PortfolioHeader />,
  },
  {
    name: "ActionLink",
    description: "Use when a prominent primary or secondary action navigates to another destination.",
    category: "Navigation & actions",
    preview: <div className="component-library-actions"><ActionLink href="#home">Primary action</ActionLink><ActionLink href="#case-studies" variant="secondary">Secondary action</ActionLink></div>,
  },
  {
    name: "VerticalChapterNav",
    description: "Use when readers need direct access to long-form case-study chapters.",
    category: "Navigation & actions",
    preview: <div className="component-library-nav-containment"><VerticalChapterNav chapters={sampleChapters} /></div>,
  },
  {
    name: "ScrollCue",
    description: "Use when introducing an in-page destination below a hero.",
    category: "Navigation & actions",
    preview: <ScrollCue href="#home">Explore the page</ScrollCue>,
  },
  {
    name: "PortfolioHero",
    description: "Use when opening the portfolio with positioning, actions, portrait, and a scroll cue.",
    category: "Home",
    preview: <PortfolioHero headingLevel="h2" eyebrow="Product designer · Design strategist" title="Research-led design for complex products" lede="Clear systems begin with clear decisions." note="Collaborative. Practical. Curious." actions={<ActionLink href="#case-studies">See case studies</ActionLink>} portrait={<PortraitStage src="/portfolio/melissa-hero.png" alt="Melissa Shi smiling" width={1086} height={1448} />} scrollCue={<ScrollCue href="#utility">Explore utility components</ScrollCue>} />,
  },
  {
    name: "PortraitStage",
    description: "Use when presenting a portrait with the portfolio’s expressive framing.",
    category: "Home",
    preview: <PortraitStage src="/portfolio/melissa-hero.png" alt="Melissa Shi smiling" width={1086} height={1448} />,
  },
  {
    name: "SectionIntro",
    description: "Use when a home-page section needs an eyebrow, title, and optional context.",
    category: "Home",
    preview: <SectionIntro eyebrow="Selected work" title="Thoughtful systems, clearly explained." description="A short introduction establishes the purpose of the section." />,
  },
  {
    name: "ProjectPreviewCard",
    description: "Use when previewing a portfolio project with metadata, categories, and imagery.",
    category: "Home",
    preview: <ProjectPreviewCard project={sampleProject} index={0} />,
  },
  {
    name: "ContactCallout",
    description: "Use when closing a page with an inviting next step.",
    category: "Home",
    preview: <ContactCallout eyebrow="Continue the conversation" title="Want to compare notes?" body="Explore another page or get in touch." actions={<ActionLink href="#navigation-actions">Review actions</ActionLink>} />,
  },
  {
    name: "PortfolioFooter",
    description: "Use when ending a portfolio page with a concise signature and copyright.",
    category: "Home",
    preview: <PortfolioFooter />,
  },
  {
    name: "CaseStudyHero",
    description: "Use when opening a case study with context, summary, metadata, and optional media.",
    category: "Case studies",
    preview: <CaseStudyHero headingLevel="h2" backLink={<a className="case-back" href="#home">← Back to Home components</a>} eyebrow="Product strategy · Research" title="A clear case-study opening" deck="A concise deck frames the work before readers explore the details." overview={<p>Representative, non-project-specific overview content.</p>} metadataItems={[{ label: "Role", value: "Product designer" }, { label: "Timeline", value: "Six weeks" }]} />,
  },
  {
    name: "CaseStudyMetadata",
    description: "Use when summarizing key case-study facts in a scannable group.",
    category: "Case studies",
    preview: <CaseStudyMetadata items={[{ label: "Role", value: "Lead designer" }, { label: "Methods", value: "Research and prototyping" }]} />,
  },
  {
    name: "CaseStudySection",
    description: "Use when structuring a titled chapter within a case study.",
    category: "Case studies",
    preview: <CaseStudySection id="sample-case-section" eyebrow="01 · Context" title="A focused case-study chapter"><p>Chapter content stays inside the production section structure.</p></CaseStudySection>,
  },
  {
    name: "CaseStudyMedia",
    description: "Use when presenting captioned case-study imagery or video with consistent controls.",
    category: "Case studies",
    preview: <div className="component-library-media-grid"><CaseStudyMedia kind="image" src="/portfolio/enterprise-search.png" alt="Abstract enterprise interface sample" width={900} height={620} caption="A semantic image and caption." /><CaseStudyMedia kind="video" src="/portfolio/feedback-intelligence-hero-insights.mp4" caption="A controlled local video preview." /></div>,
  },
  {
    name: "CaseStudyQuote",
    description: "Use when highlighting a sourced insight or the related workflow-question variant.",
    category: "Case studies",
    preview: <div className="component-library-stack"><CaseStudyQuote attribution="Research participant">“The clear structure helped me understand what to do next.”</CaseStudyQuote><CaseStudyQuote variant="workflow-question">How might we make a complex workflow easier to understand?</CaseStudyQuote></div>,
  },
  {
    name: "WorkflowQuestion",
    description: "Use when elevating the defining how-might-we question in a feedback workflow narrative.",
    category: "Case studies",
    preview: <WorkflowQuestion>How might we connect trustworthy insight to meaningful product action?</WorkflowQuestion>,
  },
  {
    name: "ContentBlockRenderer",
    description: "Use when rendering ordered case-study prose, headings, lists, quotes, and media blocks.",
    category: "Case studies",
    preview: <ContentBlockRenderer blocks={[{ type: "heading", level: 3, text: "A structured narrative" }, { type: "paragraph", text: "Content blocks preserve their source order." }, { type: "list", items: ["Evidence", "Decision", "Outcome"] }]} renderMedia={() => null} />,
  },
  {
    name: "InsightCard",
    description: "Use when grouping one focused research insight inside a semantic article.",
    category: "Case studies",
    preview: <InsightCard><h4>Workflow friction</h4><p>Repeated handoffs made the process harder to follow.</p></InsightCard>,
  },
  {
    name: "InsightGrid",
    description: "Use when comparing a set of related insights, outcomes, or concepts.",
    category: "Case studies",
    preview: <InsightGrid mode="insights" groups={[<><h4>Signal one</h4><p>Representative supporting detail.</p></>, <><h4>Signal two</h4><p>Representative supporting detail.</p></>]} />,
  },
  {
    name: "RecommendationCard",
    description: "Use when explaining one sequenced recommendation with supporting content.",
    category: "Case studies",
    preview: <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="connect"><h4>Connect insight to action</h4><p>Carry evidence into the tools where decisions happen.</p></div>]} />,
  },
  {
    name: "RecommendationList",
    description: "Use when presenting an ordered set of case-study recommendations.",
    category: "Case studies",
    preview: <RecommendationList cards={[{ segments: [<div className="feedback-blocks" key="clarify"><h4>Clarify the next step</h4><p>Give each recommendation an actionable outcome.</p></div>] }, { segments: [<div className="feedback-blocks" key="preserve"><h4>Preserve context</h4><p>Keep supporting evidence close to the decision.</p></div>] }]} />,
  },
  {
    name: "SimpleContentList",
    description: "Use when straightforward case-study outcomes or skills need a semantic list.",
    category: "Case studies",
    preview: <SimpleContentList items={["Research synthesis", "Product strategy", "Interaction design"]} />,
  },
  {
    name: "ScrollReveal",
    description: "Use when content should enter gently while respecting reduced-motion preferences.",
    category: "Utility",
    preview: <ScrollReveal><p className="component-library-reveal-sample">Content remains readable before and after enhancement.</p></ScrollReveal>,
  },
];
