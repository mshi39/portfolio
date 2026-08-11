import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "../../components/ButtonLink";
import { SiteHeader } from "../../components/SiteHeader";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { ChapterNav } from "../../components/case-study/ChapterNav";
import { feedbackContent, type FeedbackContentBlock, type FeedbackMediaKey } from "../../data/feedback-intelligence";

export const metadata: Metadata = {
  title: "AI-Powered Customer Feedback Intelligence Platform — Melissa Shi",
  description: "Redefining an AI meeting concept into an end-to-end system that connects customer insights to product action",
};

const chapters = [
  { id: "opportunity", label: "The Opportunity" },
  { id: "workflow-research", label: "Workflow research" },
  { id: "product-architecture", label: "Product architecture" },
  { id: "concept-validation", label: "Concept validation" },
  { id: "feedback-pipeline", label: "Feedback pipeline" },
  { id: "trust-in-ai", label: "Trust in AI" },
  { id: "collaboration", label: "Collaboration" },
  { id: "projected-impact", label: "Projected impact" },
  { id: "demonstrated-skills", label: "Demonstrated skills" },
];

type FeedbackImageMedia = { kind: "image"; src: string; alt: string; caption: string; width: number; height: number };
type FeedbackVideoMedia = { kind: "video"; src: string; caption: string };
const media: Record<FeedbackMediaKey, FeedbackImageMedia | FeedbackVideoMedia> = {
  thumbnail: { kind: "image", src: "/portfolio/feedback-intelligence-thumbnail.png", alt: "AI-powered customer feedback intelligence platform interface", width: 653, height: 453, caption: "AI-Powered Customer Feedback Intelligence Platform" },
  "hero-video": { kind: "video", src: "/portfolio/feedback-intelligence-hero-insights.mp4", caption: "AI-powered insight generation experience" },
  "workshop-map": { kind: "image", src: "/portfolio/feedback-intelligence-workshop-map.png", alt: "Collaborative Miro journey-mapping workshop board", width: 2871, height: 1381, caption: "Workshop Miro board used to map the customer-feedback workflow" },
  "user-flow": { kind: "image", src: "/portfolio/feedback-intelligence-user-flow.jpg", alt: "Full customer-feedback workflow map", width: 3615, height: 443, caption: "Full user-flow map showing the end-to-end customer-feedback journey" },
  "product-models": { kind: "image", src: "/portfolio/feedback-intelligence-product-models.png", alt: "Comparison of three product architecture approaches", width: 1721, height: 641, caption: "Product-model comparison and trade-offs" },
  prototype: { kind: "video", src: "/portfolio/feedback-intelligence-prototype.mp4", caption: "End-to-end concept prototype used for validation" },
  "lower-barrier": { kind: "video", src: "/portfolio/feedback-intelligence-lower-barrier.mp4", caption: "Lower-barrier meeting intelligence workflow" },
  scheduling: { kind: "video", src: "/portfolio/feedback-intelligence-scheduling.mp4", caption: "Flexible scheduling experience" },
  "ai-insight-video": { kind: "video", src: "/portfolio/feedback-intelligence-hero-insights%2Emp4", caption: "AI-generated insight experience" },
  "source-verification": { kind: "video", src: "/portfolio/feedback-intelligence-source-verification.mp4", caption: "Source-verification interaction" },
  "central-feedback": { kind: "video", src: "/portfolio/feedback-intelligence-central-feedback.mp4", caption: "Centralized feedback across channels" },
  jira: { kind: "video", src: "/portfolio/feedback-intelligence-jira.mp4", caption: "Insight-to-Jira workflow" },
  presentation: { kind: "video", src: "/portfolio/feedback-intelligence-presentation.mp4", caption: "AI-assisted presentation-generation flow" },
  "customer-portal": { kind: "video", src: "/portfolio/feedback-intelligence-customer-portal.mp4", caption: "Customer portal scheduling experience" },
};

const indexOf = (text: string, after = -1) => feedbackContent.findIndex((block, index) => index > after && block.type === "heading" && block.text === text);
const chapterStarts = {
  opportunity: indexOf("The Opportunity"),
  workflow: indexOf("1. Mapping the Real Customer-Feedback Workflow"),
  architecture: indexOf("2. Defining the Right Product Architecture"),
  validation: indexOf("3. Validation Product Direction Through Design"),
  pipeline: indexOf("4. Designing an End-to-End Feedback Intelligence Pipeline"),
  trust: indexOf("5. Building Trust into the AI Experience"),
  collaboration: indexOf("Collaboration and Influence"),
  impact: indexOf("Projected Impact", indexOf("Collaboration and Influence")),
  skills: indexOf("What This Project Demonstrated"),
};

function mediaBlock(key: FeedbackMediaKey, index: number) {
  const item = media[key];
  return <CaseStudyMedia key={`${key}-${index}`} {...item} />;
}

function BasicBlocks({ blocks, className = "" }: { blocks: FeedbackContentBlock[]; className?: string }) {
  return <div className={`feedback-blocks ${className}`.trim()}>{blocks.map((block, index) => {
    if (block.type === "media") return mediaBlock(block.key, index);
    if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    if (block.type === "heading") return block.level === 2
      ? <h2 key={index}>{block.text}</h2>
      : <h3 key={index}>{block.text}</h3>;
    return <p key={index}>{block.text}</p>;
  })}</div>;
}

function GroupedBlocks({ blocks, mode }: { blocks: FeedbackContentBlock[]; mode: "comparison" | "insights" | "pipeline" | "outcomes" }) {
  const introduction: FeedbackContentBlock[] = [];
  const groups: FeedbackContentBlock[][] = [];
  let current: FeedbackContentBlock[] | null = null;
  for (const block of blocks) {
    const startsGroup = block.type === "heading" && block.level === 3 && (
      mode === "pipeline" || mode === "outcomes" ||
      (mode === "comparison" && block.text.startsWith("Option ")) ||
      (mode === "insights" && ["Legal requirements blocked adoption", "Scheduling required excessive coordination", "Insight extraction was highly manual", "The same findings had to be repackaged repeatedly", "Feedback was disconnected from execution"].includes(block.text))
    );
    if (startsGroup) {
      current = [block];
      groups.push(current);
    } else if (current) current.push(block);
    else introduction.push(block);
  }
  return <>
    <BasicBlocks blocks={introduction} />
    <div className={`feedback-${mode}-grid`}>{groups.map((group, index) => <article key={index}><BasicBlocks blocks={group} /></article>)}</div>
  </>;
}

function chapterSlice(start: number, end: number) {
  return feedbackContent.slice(start + 1, end);
}

function secondHeadingIndex(text: string, after: number) {
  return feedbackContent.findIndex((block, index) => index > after && block.type === "heading" && block.text === text);
}

export default function FeedbackIntelligenceCaseStudy() {
  const heroThumbnail = feedbackContent.find((block) => block.type === "media" && block.key === "thumbnail");
  const heroVideo = feedbackContent.find((block) => block.type === "media" && block.key === "hero-video");
  const heroOverview = feedbackContent.slice(indexOf("Overview") + 1, indexOf("Projected Impact"));
  const heroImpactStart = indexOf("Projected Impact");
  const heroRoleStart = indexOf("My Role");
  const heroTimelineStart = indexOf("Timeline");
  const heroImpact = feedbackContent.slice(heroImpactStart + 1, heroRoleStart);
  const heroRoleHeading = feedbackContent[heroRoleStart];
  const heroRoleValue = feedbackContent[heroRoleStart + 1];
  const heroTimelineHeading = feedbackContent[heroTimelineStart];
  const heroTimelineValue = feedbackContent[heroTimelineStart + 1];
  const impactStart = secondHeadingIndex("Projected Impact", chapterStarts.collaboration);

  const workflowBlocks = chapterSlice(chapterStarts.workflow, chapterStarts.architecture);
  const painStart = workflowBlocks.findIndex((block) => block.type === "heading" && block.text === "Legal requirements blocked adoption");
  const workflowLead = workflowBlocks.slice(0, painStart);
  const workflowInsights = workflowBlocks.slice(painStart);
  const architectureBlocks = chapterSlice(chapterStarts.architecture, chapterStarts.validation);
  const optionsStart = architectureBlocks.findIndex((block) => block.type === "heading" && block.text.startsWith("Option 1:"));
  const optionsEnd = architectureBlocks.findIndex((block) => block.type === "heading" && block.text === "Evaluating the Trade-Offs");

  return <main className="case-study feedback-case-study">
    <SiteHeader />
    <header className="case-hero case-shell feedback-hero">
      <Link className="case-back" href="/#selected-work">← Back to selected work</Link>
      <p className="eyebrow">AI product design · Feedback intelligence</p>
      <h1>{feedbackContent[0].type === "heading" ? feedbackContent[0].text : ""}</h1>
      <p className="case-deck">{feedbackContent[1].type === "heading" ? feedbackContent[1].text : ""}</p>
      <div className="feedback-hero-overview"><div><h2>Overview</h2><BasicBlocks blocks={heroOverview} /></div><div><h2>Projected Impact</h2><BasicBlocks blocks={heroImpact} /></div></div>
      <div className="case-meta feedback-source-meta">
        <div><span>{heroRoleHeading.type === "heading" ? heroRoleHeading.text : ""}</span><strong>{heroRoleValue.type === "paragraph" ? heroRoleValue.text : ""}</strong></div>
        <div><span>{heroTimelineHeading.type === "heading" ? heroTimelineHeading.text : ""}</span><strong>{heroTimelineValue.type === "paragraph" ? heroTimelineValue.text : ""}</strong></div>
      </div>
      {heroThumbnail?.type === "media" && mediaBlock(heroThumbnail.key, 0)}
      {heroVideo?.type === "media" && mediaBlock(heroVideo.key, 1)}
    </header>
    <ChapterNav chapters={chapters} variant="feedback-rail" />

    <CaseStudySection id="opportunity" eyebrow="01 · Opportunity" title="The Opportunity">
      <BasicBlocks blocks={chapterSlice(chapterStarts.opportunity, chapterStarts.workflow)} />
    </CaseStudySection>

    <CaseStudySection id="workflow-research" eyebrow="02 · Workflow research" title="1. Mapping the Real Customer-Feedback Workflow" tone="pink">
      <BasicBlocks blocks={workflowLead} />
      <GroupedBlocks blocks={workflowInsights} mode="insights" />
    </CaseStudySection>

    <CaseStudySection id="product-architecture" eyebrow="03 · Product architecture" title="2. Defining the Right Product Architecture">
      <BasicBlocks blocks={architectureBlocks.slice(0, optionsStart)} />
      <GroupedBlocks blocks={architectureBlocks.slice(optionsStart, optionsEnd)} mode="comparison" />
      <BasicBlocks blocks={architectureBlocks.slice(optionsEnd)} />
    </CaseStudySection>

    <CaseStudySection id="concept-validation" eyebrow="04 · Concept validation" title="3. Validation Product Direction Through Design" tone="pink">
      <BasicBlocks blocks={chapterSlice(chapterStarts.validation, chapterStarts.pipeline)} />
    </CaseStudySection>

    <CaseStudySection id="feedback-pipeline" eyebrow="05 · End-to-end system" title="4. Designing an End-to-End Feedback Intelligence Pipeline">
      <GroupedBlocks blocks={chapterSlice(chapterStarts.pipeline, chapterStarts.trust)} mode="pipeline" />
    </CaseStudySection>

    <CaseStudySection id="trust-in-ai" eyebrow="06 · Trust in AI" title="5. Building Trust into the AI Experience" tone="pink">
      <GroupedBlocks blocks={chapterSlice(chapterStarts.trust, chapterStarts.collaboration)} mode="outcomes" />
    </CaseStudySection>

    <CaseStudySection id="collaboration" eyebrow="07 · Collaboration" title="Collaboration and Influence">
      <GroupedBlocks blocks={chapterSlice(chapterStarts.collaboration, impactStart)} mode="outcomes" />
    </CaseStudySection>

    <CaseStudySection id="projected-impact" eyebrow="08 · Projected impact" title="Projected Impact" tone="pink">
      <BasicBlocks blocks={chapterSlice(impactStart, chapterStarts.skills)} className="feedback-impact" />
    </CaseStudySection>

    <CaseStudySection id="demonstrated-skills" eyebrow="09 · Reflection" title="What This Project Demonstrated">
      <BasicBlocks blocks={feedbackContent.slice(chapterStarts.skills + 1)} className="feedback-skills" />
    </CaseStudySection>

    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ButtonLink href="/#selected-work">Back to selected work</ButtonLink></section>
    <footer className="footer shell"><p>Designed with curiosity and a little purple magic.</p><p>© {new Date().getFullYear()} Melissa Shi</p></footer>
  </main>;
}
