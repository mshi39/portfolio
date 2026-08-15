import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudyQuote } from "../../components/case-study/CaseStudyQuote";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { ContentBlockRenderer } from "../../components/case-study/ContentBlockRenderer";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { MetricCard } from "../../components/case-study/MetricCard";
import { RecommendationList } from "../../components/case-study/RecommendationList";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { vocContent, type VocMediaKey } from "../../data/voc-admin-portal";

export const metadata: Metadata = { title: "Voice of the Customer Admin Portal Revamp — Melissa Shi", description: "Redesigning an enterprise customer-research platform around clearer product architecture and real-world workflows." };

const chapters = [
  { id: "overview", label: "Overview" }, { id: "challenge", label: "Challenge" }, { id: "scope", label: "Scope & approach" },
  { id: "architecture", label: "Architecture" }, { id: "guardrails", label: "Guardrails" }, { id: "visibility", label: "Customer visibility" },
  { id: "workflows", label: "Real workflows" }, { id: "scalability", label: "Scalability" }, { id: "collaboration", label: "Collaboration" }, { id: "results", label: "Results" },
];

const media = {
  ecosystem: ["image", "program-ecosystem.png", "Map of the VOC Admin program ecosystem", 4076, 2144, "The private-program workflow contained the capabilities needed to validate a reusable foundation."],
  "old-flow": ["image", "old-program-flow.png", "Old flow separating private programs from recruitment", 1243, 681, "The old model split one initiative across disconnected program records."],
  "option-1": ["image", "architecture-option-1.png", "Architecture option one with independent programs", 1635, 637, "Option 1: independent programs preserved fragmentation."],
  "option-2": ["image", "architecture-option-2.png", "Architecture option two with sibling components", 1637, 695, "Option 2: sibling components introduced excess flexibility."],
  "option-3": ["image", "architecture-option-3.png", "Architecture option three with required recruitment", 1640, 625, "Option 3: required recruitment prevented phased testing."],
  "option-4": ["image", "architecture-option-4.png", "Architecture option four with optional recruitment", 1632, 622, "Option 4: optional recruitment connected the work without forcing a rigid sequence."],
  "new-flow": ["image", "new-program-flow.png", "New connected private-program and recruitment flow", 1243, 504, "The selected architecture treats recruitment as an optional capability within a private program."],
  "old-setup": ["image", "old-all-at-once-setup.png", "Old Admin portal showing all setup options", 1920, 911, "The old experience exposed nearly every option at once."],
  "decision-tree": ["image", "program-type-decision-tree.png", "Decision tree for choosing a testing program type", 1499, 591, "Program type became the organizing logic for the workflow."],
  preview: ["image", "customer-preview.png", "Customer portal preview beside program fields", 2983, 997, "A visual preview connects internal configuration with the customer-facing outcome."],
  "old-sectional": ["image", "old-sectional-setup.png", "Old setup navigation grouped by internal content type", 1440, 913, "The previous setup reflected internal content categories rather than the customer journey."],
  "old-stepper": ["image", "old-locked-stepper.png", "Old gated program-creation stepper", 1440, 913, "The initial gated stepper blocked users who were still waiting on dependencies."],
  "workflow-video": ["video", "expectations-walkthrough.mp4", "", 0, 0, "The revised flow sets expectations and supports nonlinear work."],
  preparation: ["image", "preparation-guidance.png", "Preparation guidance shown before program setup", 1440, 913, "Upfront guidance makes materials and dependencies visible."],
  "section-intro": ["image", "section-introduction.png", "Contextual introduction for a program setup section", 1440, 913, "Section introductions explain purpose, requirements, and customer impact."],
  "flexible-nav": ["image", "flexible-navigation.png", "Flexible navigation across program sections", 1440, 913, "Users can work in the order that matches their available information."],
  draft: ["image", "save-draft.png", "Save draft control in program creation", 1440, 913, "Draft states let teams begin earlier without losing work."],
  "ui-constraints": ["image", "old-ui-constraints.png", "Modal and tab constraints in the old Admin portal", 1956, 1082, "The old interaction model constrained both users and future product growth."],
  "scalable-video": ["video", "scalable-design.mp4", "", 0, 0, "The dedicated full-page workflow creates room for the platform to evolve."],
  stepper: ["image", "guided-stepper.png", "Vertical guided stepper for program creation", 324, 941, "The guided stepper clarifies progress through the broader workflow."],
  patterns: ["image", "consistent-patterns.png", "Consistent save, continue, review, and launch patterns", 4698, 2097, "Standardized actions make the system predictable and extensible."],
} as const;

function renderMedia(key: VocMediaKey, index: number) {
  const [kind, file, alt, width, height, caption] = media[key];
  return kind === "video"
    ? <CaseStudyMedia key={`${key}-${index}`} kind="video" src={`/portfolio/voc-admin/${file}`} caption={caption} />
    : <CaseStudyMedia key={`${key}-${index}`} kind="image" src={`/portfolio/voc-admin/${file}`} alt={alt} width={width} height={height} caption={caption} />;
}

export default function VoiceOfCustomerAdminPortalPage() {
  return <main className="case-study feedback-case-study">
    <PortfolioHeader current="work" />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to work</Link>}
      eyebrow="Enterprise SaaS · Product design · User research"
      title="Voice of the Customer Admin Portal Revamp"
      deck="Transforming a fragmented internal tool into a scalable self-service platform through a redesigned Admin experience and clearer system architecture."
      overviewPanels={[
        { heading: "Overview", content: <><p>The VOC platform enables product teams to launch and manage customer testing programs, but its Admin portal had become difficult to use and impossible to scale.</p><p>I led the foundational redesign of its information architecture, program model, and end-to-end creation experience.</p></> },
        { heading: "Impact", content: <ul><li>24% increase in program creation</li><li>User satisfaction rose from 2.9 to 4.4</li><li>77.1 SUS at handoff</li><li>84.2 SUS after visual refinement</li></ul> },
      ]}
      metadataItems={[{ label: "My role", value: "Lead Designer and Researcher" }, { label: "Team member", value: "Senior UX Designer — final visual refinement" }, { label: "Timeline", value: "August–December 2024" }]}
      metadataClassName="sales-source-meta"
      mediaSlots={<CaseStudyMedia kind="video" src="/portfolio/voc-admin/full-create-flow.mp4" caption="The redesigned end-to-end program creation flow" />}
    />
    <VerticalChapterNav chapters={chapters} />
    <CaseStudySection id="overview" eyebrow="01 · Overview" title="A scalable foundation for customer research"><div className="metrics-grid"><MetricCard value="24%" label="increase in program creation" /><MetricCard value="52%" label="increase in user satisfaction" /><MetricCard value="77.1" label="SUS score at handoff" /><MetricCard value="84.2" label="SUS after final visual refinement" /></div><p className="case-deck">The work established greater self-service and aligned the platform with how product teams actually plan and run customer research.</p></CaseStudySection>
    <CaseStudySection id="challenge" eyebrow="02 · Challenge" title="The interface was only the visible symptom" tone="pink"><ContentBlockRenderer blocks={vocContent.challenge} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="scope" eyebrow="03 · Scope & approach" title="Focus on the most complex workflow"><ContentBlockRenderer blocks={vocContent.scope} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="architecture" eyebrow="04 · Design decision" title="Redefining the program architecture" tone="pink"><ContentBlockRenderer blocks={vocContent.architecture} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="guardrails" eyebrow="05 · Design decision" title="Defining program types and building guardrails"><ContentBlockRenderer blocks={vocContent.guardrails} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="visibility" eyebrow="06 · Design decision" title="Making the customer experience visible" tone="pink"><ContentBlockRenderer blocks={vocContent.visibility} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="workflows" eyebrow="07 · Design decision" title="Supporting real-world workflows"><ContentBlockRenderer blocks={vocContent.workflows} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="scalability" eyebrow="08 · Design decision" title="Designing a scalable experience" tone="pink"><ContentBlockRenderer blocks={vocContent.scalability} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="collaboration" eyebrow="09 · Collaboration" title="Turning research into shared product direction"><InsightGrid mode="outcomes" groups={[
      <><h4>Product strategy</h4><p>Partnered with the product manager to focus the MVP on the most strategically valuable workflow.</p></>,
      <><h4>Cross-functional alignment</h4><p>Aligned stakeholders around terminology, recruitment structure, and platform principles.</p></>,
      <><h4>Technical influence</h4><p>Used workflow evidence to help make the case for database support for draft programs.</p></>,
      <><h4>Iterative validation</h4><p>Produced eight major iterations, ran seven usability tests, and incorporated more than ten stakeholder reviews.</p></>,
    ]} /></CaseStudySection>
    <CaseStudySection id="results" eyebrow="10 · Results" title="From disconnected features to a coherent product system" tone="pink"><RecommendationList cards={[
      ["Adoption", "Program creation increased by 24%, from 25 to 31 programs over six months."],
      ["Satisfaction", "User satisfaction increased by 52%, from 2.9 to 4.4."],
      ["Usability", "The foundational design achieved a 77.1 SUS score; the later visually refined experience reached 84.2."],
    ].map(([title, description]) => ({ segments: [<div className="feedback-blocks" key={title}><h4>{title}</h4><p>{description}</p></div>] }))} /><CaseStudyQuote attribution="Splunk Product Manager">{"This visual snapshot is awesome. It's really helpful for the person doing it to envision it."}</CaseStudyQuote><CaseStudyQuote attribution="VOC stakeholder">Improved the feedback and bug-reporting experience with a clearer, more usable UI.</CaseStudyQuote><div className="case-closing"><p className="eyebrow">What this project demonstrated</p><h3>Modernizing an enterprise product often means going deeper than interface design.</h3><p>By redefining the program model, terminology, information architecture, and technical capabilities, I helped turn disconnected features into a coherent and scalable product system.</p><ul><li>Translate ambiguous organizational processes into clear product models</li><li>Define features around user needs and operational constraints</li><li>Design scalable information architectures and workflow frameworks</li><li>Evaluate system-level alternatives and communicate trade-offs</li><li>Use research to change product and technical direction</li><li>Align Product, Engineering, Design, and domain experts</li><li>Connect experience improvements to adoption and long-term growth</li></ul></div></CaseStudySection>
    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
