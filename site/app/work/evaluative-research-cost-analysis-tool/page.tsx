import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { InsightCard } from "../../components/case-study/InsightCard";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { MetricCard } from "../../components/case-study/MetricCard";
import { RecommendationCard } from "../../components/case-study/RecommendationCard";
import { RecommendationList } from "../../components/case-study/RecommendationList";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { WorkflowQuestion } from "../../components/case-study/WorkflowQuestion";

export const metadata: Metadata = {
  title: "Evaluative Research on Cost Analysis Tool | Melissa Shi",
  description: "How targeted evaluative research reset product direction two months before release.",
};

const chapters = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "diagnose-alignment", label: "Diagnose alignment" },
  { id: "earn-research", label: "Earn research" },
  { id: "focus-study", label: "Focus the study" },
  { id: "product-direction", label: "Product direction" },
  { id: "results", label: "Results" },
];

const media = {
  hero: ["hero.png", "Cost Analysis Tool research case study overview", 3840, 2112, "Evaluative research created a shared view of user needs and a clearer product direction before release."],
  stakeholderAccess: ["stakeholder-access-model.png", "Stakeholder assumptions about Cost Analysis Tool user groups and access levels", 3840, 2112, "Stakeholder interviews exposed assumptions about who needed the tool and what each group should be able to access."],
  heuristicLog: ["heuristic-findings-log.png", "Heuristic evaluation findings organized by page, issue type, access level, and recommendation", 3840, 2112, "A structured heuristic review surfaced immediate usability risks and made the case for direct user research."],
  sus: ["sus-scale.png", "System Usability Scale from worst imaginable to best imaginable", 3520, 1322, "The System Usability Scale added a consistent benchmark alongside observed task performance and qualitative feedback."],
  backlog: ["prioritized-research-backlog.png", "Research findings prioritized by UX ranking, business priority, and technical feasibility", 3840, 2112, "Findings from multiple research sources became one backlog ranked across user impact, business priority, and feasibility."],
  userAccess: ["validated-user-access-model.png", "User-validated Cost Analysis Tool user groups and access levels", 3840, 2112, "User research refined the original access model and revealed a restricted user level that stakeholder interviews had missed."],
  workflows: ["current-and-future-workflows.png", "Current business process, current Cost Analysis Tool impact, and possible future workflow", 4726, 4500, "Workflow mapping showed where the current tool added value and where requested improvements could remove more manual work."],
} as const;

type MediaKey = keyof typeof media;

function renderMedia(key: MediaKey) {
  const [file, alt, width, height, caption] = media[key];
  return <CaseStudyMedia kind="image" src={`/portfolio/cost-analysis/${file}`} alt={alt} width={width} height={height} caption={caption} />;
}

export default function CostAnalysisResearchPage() {
  return <main className="case-study feedback-case-study">
    <PortfolioHeader current="work" />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to work</Link>}
      eyebrow="Enterprise research · Evaluative research · Product strategy"
      title="Evaluative Research on Cost Analysis Tool"
      deck="Resetting product direction two months before release through targeted research and actionable evidence."
      overviewPanels={[
        { heading: "Problem", content: <p>After product-owner and subject-matter-expert turnover, the team was approaching release without a shared understanding of users, value, or success.</p> },
        { heading: "Response", content: <p>I sequenced stakeholder interviews, heuristic evaluation, usability testing, and workflow analysis to identify risks and turn evidence into product decisions.</p> },
      ]}
      metadataItems={[
        { label: "My role", value: "UX Designer and sole UX partner" },
        { label: "Company", value: "ExxonMobil" },
        { label: "Timeline", value: "Jan–Mar 2023" },
        { label: "Focus", value: "Research strategy, usability testing, product direction" },
      ]}
      mediaSlots={renderMedia("hero")}
    />
    <VerticalChapterNav chapters={chapters} />

    <CaseStudySection id="overview" eyebrow="Impact snapshot" title="Research turned release uncertainty into an actionable direction">
      <div className="metrics-grid">
        <MetricCard value="2 months" label="before the planned release when the evaluation began" />
        <MetricCard value="6" label="stakeholders interviewed to surface alignment gaps" />
        <MetricCard value="7" label="participants selected across core roles and expertise" />
        <MetricCard value="4" label="research objectives tied directly to product decisions" />
      </div>
      <p className="case-deck">The work answered long-running questions about the tool&apos;s value, reopened communication with primary users, and gave the team a prioritized backlog for continued development.</p>
    </CaseStudySection>

    <CaseStudySection id="context" eyebrow="Design context" title="A usability request revealed a product alignment problem" tone="pink">
      <p className="case-deck">The Cost Analysis Tool helped a production site see where value was eroding and where costs could be reduced. Development started in 2021, but ownership changes left the team without a reliable view of the intended users, their work, or the product&apos;s definition of success.</p>
      <InsightGrid mode="outcomes">
        <InsightCard><h3>Unclear audience</h3><p>Different stakeholders named different primary users and access needs.</p></InsightCard>
        <InsightCard><h3>Unclear value</h3><p>The team could not consistently explain how users would apply the tool in cost decisions.</p></InsightCard>
        <InsightCard><h3>Unclear readiness</h3><p>A planned release date existed, but shared success criteria and workflow evidence did not.</p></InsightCard>
      </InsightGrid>
      <WorkflowQuestion>Before evaluating screens, did the team agree on the problem the product needed to solve?</WorkflowQuestion>
    </CaseStudySection>

    <CaseStudySection id="diagnose-alignment" eyebrow="Decision 1" title="Diagnose alignment before usability">
      <p>A conventional usability test would have measured an interface against unstable assumptions. I began with six stakeholder interviews to establish where the product vision diverged.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Test the product story first</h4><p>I asked the product owner and subject-matter experts to describe the goal, users, development stage, success criteria, and expected access. Comparing the answers exposed a stark vision gap.</p></div>, renderMedia("stakeholderAccess")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Convert disagreement into research questions</h4><p>The gaps became four decision-focused objectives: evaluate MVP usability, assess whether value drivers were sufficient, understand usefulness in real work, and determine appropriate access.</p></div>]} />
      </RecommendationList>
      <p>This reframed the assignment from validating a nearly finished interface to determining whether the product was ready to deliver the intended value.</p>
    </CaseStudySection>

    <CaseStudySection id="earn-research" eyebrow="Decision 2" title="Earn room for deeper research" tone="pink">
      <p>The team initially wanted a fast expert review. I used that constraint as a first step, not the final answer.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Start with a heuristic evaluation</h4><p>The review identified immediate interaction issues while helping me learn the product well enough to design realistic tasks. A structured findings log made the risks visible and traceable.</p></div>, renderMedia("heuristicLog")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Use early evidence to expand the study</h4><p>The findings demonstrated what expert review could reveal and what it could not. That distinction built credibility and helped secure access to users for formal usability testing.</p></div>]} />
      </RecommendationList>
    </CaseStudySection>

    <CaseStudySection id="focus-study" eyebrow="Decision 3" title="Focus limited research where it could change decisions">
      <p>Eight business teams used the underlying process, but the schedule could not support interviewing every group. I selected participants for decision coverage rather than broad representation alone.</p>
      <InsightGrid mode="outcomes">
        <InsightCard><h3>Role coverage</h3><p>Two Role A and four Role B participants represented the people expected to interpret and act on cost information.</p></InsightCard>
        <InsightCard><h3>Fresh perspective</h3><p>One new subject-matter expert challenged inherited assumptions and added domain context.</p></InsightCard>
        <InsightCard><h3>Mixed evidence</h3><p>Task performance exposed breakdowns, SUS provided a benchmark, and follow-up interviews clarified value and workflow needs.</p></InsightCard>
      </InsightGrid>
      {renderMedia("sus")}
      <p>The combination was deliberate: observation showed what people could do, the scale made usability comparable, and interviews explained why the tool did or did not fit their work.</p>
    </CaseStudySection>

    <CaseStudySection id="product-direction" eyebrow="Decision 4" title="Turn findings into product direction" tone="pink">
      <p>The study produced more than an issue list. I connected interface problems, missing capabilities, access needs, user characteristics, and workflows so the team could decide what to build next.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Prioritize across three lenses</h4><p>I combined heuristic and usability findings in one backlog, then ranked them by user impact, business priority, and technical feasibility. This separated urgent usability fixes from feature enhancements and new capabilities.</p></div>, renderMedia("backlog")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Replace assumed access with observed needs</h4><p>Testing validated parts of the stakeholder model and revealed a restricted user level for people who needed selected data and editing rights without full access.</p></div>, renderMedia("userAccess")]} />
        <RecommendationCard sequence={3} segments={[<div className="feedback-blocks" key="copy"><h4>Show where the product changed the work</h4><p>I mapped the current business process, the tool&apos;s present contribution, and a future workflow if user requests were met. The comparison made value gaps and automation opportunities concrete.</p></div>, renderMedia("workflows")]} />
      </RecommendationList>
    </CaseStudySection>

    <CaseStudySection id="results" eyebrow="Results and reflection" title="The team left with evidence it could act on">
      <InsightGrid mode="outcomes">
        <InsightCard><h3>Prioritized development</h3><p>The team received an actionable backlog, and several recommendations were underway within two months.</p></InsightCard>
        <InsightCard><h3>Continued investment</h3><p>Evidence about usefulness and future value supported the case for continued product development and funding.</p></InsightCard>
        <InsightCard><h3>Shared product model</h3><p>User profiles, access needs, and current and future workflows gave the team a common basis for decisions.</p></InsightCard>
        <InsightCard><h3>Reopened communication</h3><p>The study reconnected the project team with primary users and created a repeatable way to collect and prioritize feedback.</p></InsightCard>
      </InsightGrid>
      <p className="case-deck">My main takeaway was that rigor is not the number of methods used. It is choosing each method for the uncertainty it resolves, then connecting the evidence to a decision the team can make.</p>
    </CaseStudySection>

    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
