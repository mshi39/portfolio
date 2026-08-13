import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { ContentBlockRenderer } from "../../components/case-study/ContentBlockRenderer";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { salesContent, type SalesMediaKey } from "../../data/sales-assessment-platform";

export const metadata: Metadata = { title: "Sales Assessment Platform AI Integration — Melissa Shi", description: "Reimagining an internal sales platform from AI-assisted automation to AI-guided collaboration." };

const chapters = [
  { id: "introduction", label: "Introduction" }, { id: "collaboration-model", label: "AI collaboration" },
  { id: "platform-expansion", label: "Platform expansion" }, { id: "product-vision", label: "Product vision" },
  { id: "outcome", label: "Outcome" }, { id: "reflection", label: "Reflection" },
];

const media = {
  thumbnail: { kind: "image", src: "/portfolio/sales-assessment-thumbnail.png", alt: "Sales Assessment Platform interface preview", width: 653, height: 453, caption: "Sales Assessment Platform AI Integration" },
  "hero-video": { kind: "video", src: "/portfolio/sales-assessment-hero.mp4", caption: "Sales Assessment Platform prototype" },
  "current-workflow": { kind: "image", src: "/portfolio/sales-assessment-current-workflow.png", alt: "Current waterfall workflow from customer information to PowerPoint", width: 1023, height: 137, caption: "The original workflow made AI an optional generation step." },
  "iteration-one": { kind: "video", src: "/portfolio/sales-assessment-iteration-one.mp4", caption: "First vision prototype presented to stakeholders" },
  "lead-with-ai": { kind: "image", src: "/portfolio/sales-assessment-lead-with-ai.png", alt: "Sales assessment workflow led by AI chat", width: 3835, height: 1970, caption: "AI leads the assessment where conversation creates value." },
  "human-review": { kind: "image", src: "/portfolio/sales-assessment-human-review.png", alt: "Editable AI recommendations before final output", width: 3835, height: 1967, caption: "Human review keeps sales representatives in control." },
  "design-system": { kind: "image", src: "/portfolio/sales-assessment-design-system.png", alt: "Cisco IT design system comparison", width: 949, height: 997, caption: "The concept was grounded in the Cisco IT design system." },
  "customer-context": { kind: "image", src: "/portfolio/sales-assessment-customer-context.png", alt: "Reusable customer context experience", width: 3792, height: 1967, caption: "Customer context is collected once and reused across assessments." },
  "gong-integration": { kind: "image", src: "/portfolio/sales-assessment-gong-integration.png", alt: "Native Gong meeting intelligence integration", width: 3827, height: 1965, caption: "Gong conversations add richer customer context." },
  "ai-copilot": { kind: "image", src: "/portfolio/sales-assessment-ai-copilot.png", alt: "AI co-pilot at a strategic decision point", width: 3805, height: 1967, caption: "AI appears when sales representatives need decision support." },
  "ai-clarification": { kind: "image", src: "/portfolio/sales-assessment-ai-clarification.png", alt: "AI clarification and conflict detection", width: 3835, height: 1970, caption: "AI asks for clarification instead of confidently producing weak output." },
  "web-output": { kind: "image", src: "/portfolio/sales-assessment-web-output.png", alt: "Web-based assessment output", width: 3832, height: 1967, caption: "A branded web experience becomes the assessment output." },
  "opportunity-link": { kind: "image", src: "/portfolio/sales-assessment-opportunity-link.png", alt: "Assessment linked to a sales opportunity", width: 3790, height: 1962, caption: "Assessments stay connected to the relevant sales opportunity." },
  "business-case-result": { kind: "image", src: "/portfolio/sales-assessment-business-case-result.png", alt: "Business case results alongside configuration", width: 3800, height: 1972, caption: "Users can see how configuration affects annual value in real time." },
  "iteration-three": { kind: "video", src: "/portfolio/sales-assessment-iteration-three.mp4", caption: "Third prototype exploring the long-term platform vision" },
  "account-context": { kind: "image", src: "/portfolio/sales-assessment-account-context.png", alt: "Layered account and assessment context", width: 3832, height: 1965, caption: "Customer context is separated into reusable account and assessment layers." },
  "web-delivery": { kind: "image", src: "/portfolio/sales-assessment-web-delivery.png", alt: "Branded customer website delivery", width: 1912, height: 905, caption: "The website becomes the living assessment delivery destination." },
  onboarding: { kind: "image", src: "/portfolio/sales-assessment-onboarding.png", alt: "Onboarding experience for building quality AI inputs", width: 3830, height: 1965, caption: "Onboarding enables stronger customer context and AI outputs." },
  "final-workflow": { kind: "image", src: "/portfolio/sales-assessment-final-workflow.png", alt: "Final end-to-end sales assessment workflow", width: 375, height: 515, caption: "The final platform vision connects context, collaboration, review, delivery, and engagement." },
} as const;

function renderMedia(key: SalesMediaKey, index: number) { return <CaseStudyMedia key={`${key}-${index}`} {...media[key]} />; }

export default function SalesAssessmentPlatformCaseStudy() {
  return <main className="case-study sales-assessment-case-study">
    <PortfolioHeader />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to selected work</Link>}
      eyebrow="AI product design · Sales enablement"
      title="Sales Assessment Platform AI Integration"
      deck="Reimagining an internal sales platform from AI-assisted automation to AI-guided collaboration"
      overviewPanels={[{ heading: "Goal", content: <p>Help transform a legacy sales assessment platform into an AI-powered experience that accelerates assessment creation while keeping sales representatives in control.</p> }, { heading: "Outcome", content: <ul><li>Reframed the product vision from AI as an optional feature to AI as an integrated workflow partner.</li><li>Influenced AI interaction patterns across multiple assessment workflows.</li><li>Earned stakeholder buy-in through high-fidelity prototypes and expanded my role into an AI design consultant.</li></ul> }]}
      metadataItems={[{ label: "Role", value: "Design Consultant (UX Strategy, AI Interaction Design, Prototyping)" }, { label: "Timeline", value: "40 hours over 3 weeks" }, { label: "Client", value: "3 Business Value Advisors" }]}
      metadataClassName="sales-source-meta"
      mediaSlots={<>{renderMedia("thumbnail", 0)}{renderMedia("hero-video", 1)}</>}
    />
    <VerticalChapterNav chapters={chapters} />
    <CaseStudySection id="introduction" eyebrow="01 · Introduction" title="Turning AI from a feature into a collaborator"><ContentBlockRenderer blocks={salesContent.introduction} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="collaboration-model" eyebrow="02 · AI collaboration model" title="Selling a new vision" tone="pink"><ContentBlockRenderer blocks={salesContent.collaboration} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="platform-expansion" eyebrow="03 · Platform expansion" title="Expanding AI across the platform"><ContentBlockRenderer blocks={salesContent.expansion} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="product-vision" eyebrow="04 · Long-term vision" title="Defining the long-term product vision" tone="pink"><ContentBlockRenderer blocks={salesContent.vision} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="outcome" eyebrow="05 · Outcome" title="From vision to adoption"><ContentBlockRenderer blocks={salesContent.outcome} renderMedia={renderMedia} /></CaseStudySection>
    <CaseStudySection id="reflection" eyebrow="06 · Reflection" title="Designing an AI collaboration platform" tone="pink"><ContentBlockRenderer blocks={salesContent.reflection} renderMedia={renderMedia} /></CaseStudySection>
    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
