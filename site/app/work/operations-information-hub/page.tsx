import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudyQuote } from "../../components/case-study/CaseStudyQuote";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { InsightCard } from "../../components/case-study/InsightCard";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { MetricCard } from "../../components/case-study/MetricCard";
import { RecommendationCard } from "../../components/case-study/RecommendationCard";
import { RecommendationList } from "../../components/case-study/RecommendationList";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { WorkflowQuestion } from "../../components/case-study/WorkflowQuestion";

export const metadata: Metadata = {
  title: "Operations Information Hub | Melissa Shi",
  description: "Designing a centralized operations hub around field operators' mental models and end-to-end workflows.",
};

const chapters = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "build-belief", label: "Build belief" },
  { id: "operator-model", label: "Operator model" },
  { id: "expand-scope", label: "Expand scope" },
  { id: "results", label: "Results" },
];

const media = {
  hero: ["hero.jpg", "Operations Information Hub interface showing operational data organized around field work", 2535, 1394, "The Operations Information Hub brought field data and daily actions into one operator-centered workspace."],
  storyboards: ["vision-storyboards.jpg", "Storyboards showing how a centralized hub could support an operator's workday", 1430, 814, "Storyboards made the future experience concrete before the product existed."],
  concept: ["first-hub-concept.png", "Early concept for the centralized operations information hub", 879, 511, "An early concept made the central-hub vision tangible for business stakeholders."],
  synthesis: ["interview-synthesis.jpg", "Designers grouping operator interview findings during qualitative synthesis", 1430, 983, "We synthesized seven interviews into workflow problems, data needs, and a tool-criticality view."],
  day: ["operator-day-in-the-life.jpg", "Operator day-in-the-life map connecting daily activities with supporting tools", 1430, 806, "The day-in-the-life map exposed how routine work crossed many disconnected tools."],
  prototype: ["first-end-to-end-prototype.jpg", "Screens from the first end-to-end Operations Information Hub prototype", 1380, 787, "The first end-to-end prototype translated research findings into a shared product direction."],
  iaOne: ["information-architecture-round-one.jpg", "Three information architecture approaches tested with operators", 1430, 545, "Round one compared task-based, data-based, and entity-based ways to organize operational information."],
  iaTwo: ["information-architecture-round-two.jpg", "Two pad-centered information architecture approaches tested with operators", 1430, 641, "Round two tested pad-centered structures after the first study revealed how operators locate information."],
  integrations: ["source-tool-integration-options.jpg", "Four options for reaching source-tool data from the hub", 1430, 489, "The team compared replacement, embedded, virtual-window, and external-tool approaches."],
  responsePrototype: ["task-response-prototype.jpg", "Prototype for completing a task through a source tool virtual window", 1430, 876, "Testing a read-only hub showed that launching another tool preserved the very interruption users wanted removed."],
  responseOptions: ["task-response-options.png", "Three approaches for responding to operational tasks in the hub", 1273, 431, "Task response explorations tested placement, grouping, and how much context operators needed."],
  finalTask: ["final-task-design.jpg", "Final task page organized by task type with an in-context response panel", 1423, 427, "The final task design grouped work by response type and preserved screen space for the task list."],
  firstTrend: ["first-well-test-trend.jpg", "First concept for digitizing historical well-test results", 1430, 787, "A speculative trend view demonstrated the value of bringing paper-based tracking into the release."],
  finalTrend: ["final-well-test-trend.jpg", "Refined well-test trend with test types, selectable data, table view, and status shading", 1430, 787, "The refined design combined trend recognition with precise values and accessible status cues."],
} as const;

type MediaKey = keyof typeof media;

function renderMedia(key: MediaKey) {
  const [file, alt, width, height, caption] = media[key];
  return <CaseStudyMedia kind="image" src={`/portfolio/operations-hub/${file}`} alt={alt} width={width} height={height} caption={caption} />;
}

export default function OperationsInformationHubPage() {
  return <main className="case-study feedback-case-study">
    <PortfolioHeader current="work" />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to work</Link>}
      eyebrow="Enterprise operations · UX design · User research"
      title="Operations Information Hub"
      deck="Bringing more than 30 fragmented field tools into one operator-centered workflow."
      overviewPanels={[
        { heading: "Problem", content: <p>Operators moved between siloed tools and manually transferred data to complete daily surveillance and optimization work.</p> },
        { heading: "Solution", content: <p>A tablet-first hub organized information around operator responsibilities and connected data with the actions needed to complete the work.</p> },
      ]}
      metadataItems={[
        { label: "My role", value: "UX Design Lead" },
        { label: "Team", value: "Senior UX Designer, Senior Service Designer, UX Designer" },
        { label: "Employer", value: "ExxonMobil Information Technology" },
        { label: "Timeline", value: "May 2021–Dec 2022" },
      ]}
      mediaSlots={renderMedia("hero")}
    />
    <VerticalChapterNav chapters={chapters} />

    <CaseStudySection id="overview" eyebrow="Impact snapshot" title="From a fragmented toolset to one operational foundation">
      <div className="metrics-grid">
        <MetricCard value="10+" label="out of 30+ tools centralized in the MVP" />
        <MetricCard value="4" label="applications replaced or targeted for replacement" />
        <MetricCard value="~30 min" label="training needed compare to weeks for other tools" />
      </div>
      <p className="case-deck">The MVP reduced the effort required to find operational data and was markedly easier to learn than earlier tools, which operators said often took weeks to become comfortable using.</p>
    </CaseStudySection>

    <CaseStudySection id="context" eyebrow="Design context" title="The visible problem was too many tools" tone="pink">
      <p className="case-deck">A single workflow could span several applications. Data stayed isolated, operators transferred it manually, and unreliable field connectivity made already slow software harder to use.</p>
      <InsightGrid mode="outcomes">
        <InsightCard><h3>Duplicated capabilities</h3><p>Several tools served the same purpose, increasing the number of systems operators had to remember.</p></InsightCard>
        <InsightCard><h3>Disconnected data</h3><p>Multi-step workflows crossed tools that did not share information, forcing manual transfer.</p></InsightCard>
        <InsightCard><h3>Field constraints</h3><p>Spotty site connectivity limited the usefulness of tools designed without the field environment in mind.</p></InsightCard>
        <InsightCard><h3>Poor software experience</h3><p>Slow loading, short login sessions, and tedious processes took time from surveillance and optimization.</p></InsightCard>
      </InsightGrid>
      {renderMedia("day")}
    </CaseStudySection>

    <CaseStudySection id="build-belief" eyebrow="Pivotal decision" title="Build stakeholder belief through research-backed visioning">
      <p>Operations leaders doubted whether the project could deliver a useful product. My manager and I needed to make the opportunity credible while proving that the design team understood the work.</p>
      <WorkflowQuestion>How could design make an abstract platform vision tangible before development began?</WorkflowQuestion>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Paint the future before defining the interface</h4><p>I developed storyboards around operators&apos; day-to-day work. I created the illustrations used in the first framing session to align the project team around a shared outcome.</p></div>, renderMedia("storyboards")]} />
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Make the future tangible</h4><p>I created low-fi mockup of a central operations information hub based on existing knowledge, making the idea tangible and easier to grasp for business stakeholders to win their buy-in.</p></div>, renderMedia("concept")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Ground the vision in seven operator interviews</h4><p>I led the interview and and data analysis of operators and uncovered 4 pain points and challenges that futher complicated the problem. All resonated strongly with business stakeholders.</p><ul><li>Unnecessary tool & workflow complications</li><li>Data isolation in multi-step-multi-tool workflows</li><li>Unstable technical infrastructure caused spotted internect connection</li><li>Tramatizing past software experiences</li></ul></div>, renderMedia("synthesis")]} />
        <RecommendationCard sequence={3} segments={[<div className="feedback-blocks" key="copy"><h4>Turn findings into an end-to-end experience</h4><p>Collaborated with colleague to craft initial mockups based on research findings which not only validated requirements, but also bridged the communication gap between business and IT teams by providing a concrete way to discuss the same workflow.</p></div>, renderMedia("prototype")]} />
      </RecommendationList>
      <CaseStudyQuote attribution="- Operations stakeholder">“I haven&apos;t been this happy since my first child was born. I have been dreaming of this for the last 10 years.”</CaseStudyQuote>
      <p>The prototype turned skepticism into active support and created the trust needed for continued research and design work.</p>
    </CaseStudySection>

    <CaseStudySection id="operator-model" eyebrow="Pivotal decision" title="Design around the operator, not the source systems" tone="pink">
      <p>Centralizing information was not enough. The hub needed to reflect how operators thought about the field and let them complete work without recreating the same tool switching in a new shell.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Test how operators locate information</h4><p>Our first concepts organized data by task, type, or hybrid. Second concepts tested whether operators had a data centric or entity centric mindset. Testing revealed that:</p><ul><li> Operators had a run (a collection of pads) centric mindset, and</li><li>Desired the ability to see critical data in context more than discoverability</li></ul></div>, renderMedia("iaOne"), renderMedia("iaTwo")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Redefine what a single pane of glass meant</h4><p>Product team wanted a read-only experience initially, requiring operators to open source tools for actions. Through testing we learned that this was the same interruption they already faced. We used that evidence to advocate for write-back wherever APIs made it possible.</p></div>, renderMedia("integrations"), renderMedia("responsePrototype")]} />
        <RecommendationCard sequence={3} segments={[<div className="feedback-blocks" key="copy"><h4>Unify action items and terminology</h4><p>Instead of preserving each source system&apos;s terminology, I worked with SME to standardize the language and explored a common task model for operators to go through their tasks effectively.</p></div>, renderMedia("responseOptions")]} />
        <RecommendationCard sequence={4} segments={[<div className="feedback-blocks" key="copy"><h4>Design for context, consistency, and efficiency</h4><p>We defined the foundational architecture of the tool as removing source-based separation and present all tasks and data as a united front. The final task page design</p><ul><li>Organizes tasks by type, and</li><li>Uses slide out panel to maximize real-estate and preserve context</li></ul></div>, renderMedia("finalTask")]} />
      </RecommendationList>
      <p>The resulting architecture supported both pad and run views, kept critical data together in context, and moved the product from passive aggregation toward workflow completion.</p>
    </CaseStudySection>

    <CaseStudySection id="expand-scope" eyebrow="Pivotal decision" title="Expand the right scope through field observation">
      <p>A two-week contextual inquiry into well operation revealed an inefficiency that had become invisible through habit: operators recorded digital test results again on paper because historical results were not available to them.</p>
      <InsightGrid mode="outcomes">
        <InsightCard><h3>Redundant workd</h3><p>Well teset results need to be recorded digitally, yet operators had to record them first on paper because digital devices are forbidden on pads.</p></InsightCard>
        <InsightCard><h3>Error-prone</h3><p>Results could be missed, entered on the wrong day, or associated with the wrong test.</p></InsightCard>
        <InsightCard><h3>Hard to interpret</h3><p>A paper table made historical trends difficult to recognize when assessing test quality.</p></InsightCard>
      </InsightGrid>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Use design to make an unplanned opportunity visible</h4><p>I proposed expanding MVP scope to add digitizing well test record book so operators could easily visualize well performance, reducing repetition and enabling better decisions.</p><p>I aligned product team and business stakeholders on the proposed solution, and successfully expanded MVP scope so the solution would be truly transformative for the business and the operators.</p></div>, renderMedia("firstTrend")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Refine the concept with operators and stakeholders</h4><ul><li>Differentiated test types with color-blind-friendly colors</li><li>Added selectable production data for easy show/hide</li><li>Included a table view for on-the-go scannability</li><li>Differentiated acceptance status for easy identification of undesired test results</li><li>Povided tooltips for precise values</li></ul></div>, renderMedia("finalTrend")]} />
      </RecommendationList>
      <p>The evidence moved well-test history visualization into the release-one roadmap. Operators valued having historical results available in context and being able to spot problematic wells more easily, lowering the risk of making wrong test acceptance decisions.</p>
    </CaseStudySection>

    <CaseStudySection id="results" eyebrow="Results and reflection" title="Design changed both the product and the team's confidence" tone="pink">
      <InsightGrid mode="outcomes">
        <InsightCard><h3>Stakeholder confidence</h3><p>Research-backed prototypes re-established business confidence and sustained support for the work.</p></InsightCard>
        <InsightCard><h3>Operator-centered architecture</h3><p>Navigation followed pad- and run-centric thinking instead of mirroring source systems.</p></InsightCard>
        <InsightCard><h3>End-to-end workflows</h3><p>User evidence influenced support for write-back when source APIs allowed it.</p></InsightCard>
        <InsightCard><h3>Lower learning burden</h3><p>Most operators reported needing only about a 30-minute walkthrough for learning the Hub.</p></InsightCard>
        <InsightCard><h3>Higher-value MVP</h3><p>Field observation brought historical well-test visualization into the release-one roadmap.</p></InsightCard>
      </InsightGrid>
      <p className="case-deck">My biggest takeaway was that stated requirements captured only part of the opportunity. The pivotal moves came from making the future concrete, testing the product model early, and observing the work closely enough to notice the problems users had stopped mentioning.</p>
    </CaseStudySection>

    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
