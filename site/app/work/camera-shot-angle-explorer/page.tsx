import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyEmbed } from "../../components/case-study/CaseStudyEmbed";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { WorkflowQuestion } from "../../components/case-study/WorkflowQuestion";

export const metadata: Metadata = {
  title: "Camera Shot Angle Explorer — Melissa Shi",
  description: "From imagining a shot to confidently directing it.",
};

const chapters = [
  { id: "problem", label: "The problem" },
  { id: "solution", label: "My solution" },
  { id: "v1-decisions", label: "V1 decisions" },
  { id: "v1-refinements", label: "Refining V1" },
  { id: "v2-production", label: "V2" },
  { id: "ai-collaboration", label: "How I used AI" },
  { id: "outcome", label: "Outcome" },
];

export default function CameraShotAngleExplorerCaseStudy() {
  return <main className="case-study feedback-case-study camera-shot-case-study">
    <PortfolioHeader />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to selected work</Link>}
      eyebrow="Self-initiated product · AI-native product design"
      title="Camera Shot Angle Explorer"
      deck="From imagining a shot to confidently directing it."
      overviewPanels={[
        { heading: "Project", content: <p>A self-initiated product inspired by my experience creating AI short dramas.</p> },
        { heading: "My role", content: <p>AI-native product design—from problem definition and interaction design to AI-assisted implementation and refinement.</p> },
      ]}
      metadataItems={[{ label: "Project type", value: "Self-initiated product" }, { label: "Focus", value: "AI-native product design" }]}
    />
    <VerticalChapterNav chapters={chapters} />

    <CaseStudySection id="problem" eyebrow="01 · The problem" title="The problem">
      <div className="prose">
        <p>While creating AI short dramas, I could picture the shot I wanted but struggled to describe it using cinematography terminology. Static references showed finished compositions without explaining how camera placement and orientation produced them.</p>
        <p>This gap between creative intent and actionable instructions led to guesswork and potentially costly rounds of AI video generation.</p>
      </div>
    </CaseStudySection>

    <CaseStudySection id="solution" eyebrow="02 · My solution" title="My solution" tone="pink">
      <div className="prose">
        <p>I designed an interactive 3D workspace where creators can position a camera around a subject, immediately see the resulting composition, and translate that setup into a reusable shot prompt.</p>
      </div>
      <WorkflowQuestion>The experience connects <strong>spatial exploration → visual feedback → terminology → generation instructions</strong>.</WorkflowQuestion>
      <CaseStudyEmbed
        src="https://camera-shot-angle-explorer.vercel.app/"
        title="Camera Shot Angle Explorer interactive demo"
        height={760}
        caption="Camera Shot Angle Explorer interactive demo"
        actionHref="https://camera-shot-angle-explorer.vercel.app/"
        actionLabel="Explore the live product ↗"
      />
    </CaseStudySection>

    <CaseStudySection id="v1-decisions" eyebrow="03 · Key product decisions in V1" title="Key product decisions in V1">
      <div className="camera-shot-table-labels"><p>User pain point</p><p>My solution and design reasoning</p></div>
      <InsightGrid mode="insights" groups={[
        <><h4>“I don’t know what changing the camera will do.”</h4><p><strong>Live preview and automatic shot labels</strong> connect each adjustment to its visual result, helping users learn through experimentation.</p></>,
        <><h4>“Moving the camera and turning it feel like the same thing.”</h4><p><strong>Independent position and rotation controls</strong> distinguish where the camera is from where it points. Users can adjust orbit and distance while preserving orientation, or change yaw, pitch, and roll while preserving location.</p></>,
        <><h4>“I lost the subject while experimenting.”</h4><p><strong>Look at Subject</strong> re-aims the camera toward the subject’s eyes while preserving location and roll, giving beginners a simple recovery action.</p></>,
        <><h4>“I can see the composition, but can’t describe it accurately.”</h4><p><strong>AI Shot Prompt</strong> translates the camera setup into a copyable instruction, combining framing, camera level, viewpoint, lens, aspect ratio, and composition. The goal is clearer generation instructions, fewer wasted attempts, and lower credit or token consumption.</p></>,
      ]} />
      <div className="prose"><p>I chose subject-centered orbit controls to make the camera–subject relationship easier to understand. I also fixed the lens at 50mm to keep the initial learning experience focused on position, orientation, and framing.</p><p>The preview updates continuously, while prompts update through an explicit <strong>Refresh</strong> action. Users can experiment freely before capturing the setup they want to reuse.</p></div>
    </CaseStudySection>

    <CaseStudySection id="v1-refinements" eyebrow="04 · Refining V1" title="Refining V1">
      <div className="prose"><p>I evaluated the working experience and refined both its interaction details and the accuracy of its feedback.</p></div>
      <div className="camera-shot-table-labels"><p>Refinement</p><p>Problem identified and improvement</p></div>
      <InsightGrid mode="insights" groups={[
        <><h4>Continuous camera-level classification</h4><p>The initial output covered only a few heights, such as eye, shoulder, and knee level. Gaps between them frequently returned “Unclassified,” making valid camera positions appear unsupported. I expanded the labels—including chest level—and defined continuous classification boundaries from ground to eye level. This made the feedback more useful and consistent throughout exploration.</p></>,
        <><h4>Consistent color coding</h4><p>Aligned camera handles and related controls to help users connect spatial manipulation with interface inputs. Labels and active-state highlighting provide guidance alongside color.</p></>,
        <><h4>Clearer information pop-ups</h4><p>Refined contextual guidance to explain controls without overwhelming the workspace.</p></>,
        <><h4>More deliberate shortcuts</h4><p>Refined mode-specific axis shortcuts, visible hints, and toggle-to-release behavior. Shortcuts remain inactive while typing or dragging to prevent accidental changes.</p></>,
        <><h4>Independent recovery controls</h4><p>Separate position and rotation resets let users recover one setting without losing the other.</p></>,
        <><h4>Better continuity and feedback</h4><p>Saved camera settings support returning users, while an outdated-prompt indicator makes it clear when the displayed prompt needs refreshing.</p></>,
      ]} />
    </CaseStudySection>

    <CaseStudySection id="v2-production" eyebrow="05 · V2: Connecting exploration to production" title="V2: Connecting exploration to production" tone="pink">
      <div className="camera-shot-table-labels"><p>User pain point</p><p>My solution and design reasoning</p></div>
      <InsightGrid mode="insights" groups={[
        <><h4>“The text prompt alone doesn’t fully communicate the composition I want.”</h4><p><strong>Export Image</strong> captures the current preview as a clean PNG without interface overlays. Users can pair this visual reference with the shot prompt in compatible AI generation tools. I added this to communicate spatial relationships and framing more explicitly, with the goal of improving generation accuracy and reducing wasted attempts.</p></>,
        <><h4>“Unfamiliar English camera terms make it harder to learn and write prompts.”</h4><p><strong>English and Simplified Chinese support</strong> translates the interface and generated prompts while remembering the user’s preference. I extended language support across both learning and output so users can understand the controls and prepare instructions in their preferred language.</p></>,
      ]} />
    </CaseStudySection>

    <CaseStudySection id="ai-collaboration" eyebrow="06 · How I used AI" title="How I used AI">
      <div className="prose"><p>AI served as my technical collaborator throughout the process. I began with a product idea, explored its feasibility through dialogue with AI, and investigated how the 3D interactions could work. These conversations helped turn my intended experience into a feasible technical direction.</p></div>
      <div className="case-columns">
        <div><h3>Identify the opportunity</h3><p><strong>My contribution:</strong> Recognized the gap between visual intent, cinematography knowledge, and AI video instructions through my own production experience.</p><p><strong>AI assistance:</strong> Helped explore possible approaches and clarify technical constraints.</p></div>
        <div><h3>Define the experience</h3><p><strong>My contribution:</strong> Established the connection between camera manipulation, live preview, terminology, and reusable prompts.</p><p><strong>AI assistance:</strong> Explored how to implement the 3D scene, camera behavior, and synchronized preview.</p></div>
        <div><h3>Make product decisions</h3><p><strong>My contribution:</strong> Chose the initial scope, subject-centered controls, independent transforms, fixed lens, and recovery actions.</p><p><strong>AI assistance:</strong> Translated those decisions into technical approaches and implementation code.</p></div>
        <div><h3>Evaluate and refine</h3><p><strong>My contribution:</strong> Identified confusing interactions and classification gaps; directed improvements to labels, guidance, consistency, and shortcuts.</p><p><strong>AI assistance:</strong> Helped diagnose implementation issues, revise classification logic, and implement refinements.</p></div>
        <div><h3>Set quality expectations</h3><p><strong>My contribution:</strong> Assessed whether the behavior matched the intended learning experience and defined what needed validation.</p><p><strong>AI assistance:</strong> Supported debugging and automated checks of camera behavior and interface interactions.</p></div>
      </div>
      <div className="prose"><p>My role was to own the problem, product direction, and experience quality while using AI to bridge technical knowledge gaps and build a working product.</p><p>The product’s shot prompts are assembled from structured camera settings; generating them does not require an AI model call.</p></div>
    </CaseStudySection>

    <CaseStudySection id="outcome" eyebrow="07 · Outcome" title="Outcome" tone="pink">
      <div className="case-closing"><p>I turned a personal production challenge into a working browser-based tool that connects learning cinematography with preparing AI video instructions.</p><p>The next validation step is to test whether the preview, structured prompt, and exported reference help creators achieve their intended composition with fewer generation attempts.</p></div>
    </CaseStudySection>
    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
