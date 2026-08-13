import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyFigure } from "../../components/case-study/CaseStudyFigure";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudyQuote } from "../../components/case-study/CaseStudyQuote";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { MetricCard } from "../../components/case-study/MetricCard";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { RecommendationList } from "../../components/case-study/RecommendationList";

export const metadata: Metadata = { title: "Enterprise Search in the Age of Generative AI — Melissa Shi", description: "Research that clarified the enduring value and future direction of an internal enterprise search product." };
const asset = (name: string) => `/portfolio/enterprise-search-${name}.png`;

const enterpriseChapters = [
  { id: "background", label: "Context" },
  { id: "goals-methods", label: "Approach" },
  { id: "survey-findings", label: "Survey" },
  { id: "interviews", label: "Interviews" },
  { id: "key-insights", label: "Insights" },
  { id: "future-state", label: "Future state" },
  { id: "ai-attitudes", label: "AI attitudes" },
  { id: "recommendations", label: "Recommendations" },
  { id: "outcomes", label: "Outcomes" },
];

const enterpriseMetadata = [
  { label: "Role", value: "Lead UX Researcher" },
  { label: "Timeline", value: "Sep 2025 – Dec 2025" },
];

export default function EnterpriseSearchCaseStudy() {
  return <main className="case-study">
    <PortfolioHeader />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to selected work</Link>}
      eyebrow="Generative research · Enterprise AI"
      title="Research: Value of Internal Enterprise Search in the Age of Generative AI"
      deck="How research uncovered why employees were leaving a trusted internal search product—and reframed it as the data layer for a new AI ecosystem."
      overviewPanels={[
        { heading: "Background", content: <><p>Splunk had recently merged with Cisco and was undergoing a period of organizational and technological transition. As teams began aligning systems, tools, and workflows, generative AI was simultaneously becoming more prevalent and accessible across the company.</p><p>Within this shifting landscape, the Search Team sought to reassess the role and value of Concierge as Splunk’s internal enterprise search engine. Questions emerged around whether traditional enterprise search could remain competitive, how employee behaviors were evolving with the rise of AI tools, and what role Concierge should play in the future ecosystem.</p><p>I was tasked with leading research to evaluate these changes, understand emerging employee needs, and provide recommendations to inform the product’s long-term direction.</p></> },
        { heading: "Outcome", content: <ul><li>Identified key drivers behind declining retention and engagement</li><li>Delivered actionable insights that informed three product initiatives added to the backlog</li></ul> },
      ]}
      metadataItems={enterpriseMetadata}
      metadataClassName="enterprise-source-meta"
    />
    <VerticalChapterNav chapters={enterpriseChapters} />

    <CaseStudySection id="background" eyebrow="01 · Background" title="A trusted product at a turning point">
      <div className="prose"><p>After Splunk merged with Cisco, employees were navigating a major technology and organizational transition just as generative AI tools were changing how people found information. The Search Team needed to reassess Concierge, Splunk’s internal enterprise search engine, and understand whether it still held a meaningful place in this new landscape.</p><p>I led the research to identify the product’s unique and enduring value, explain declining retention and engagement, and translate the evidence into a concrete product direction. The core question was simple but consequential: <strong>What can Concierge uniquely provide when AI can answer almost anything?</strong></p></div>
      <CaseStudyMedia kind="image" src={asset("question-consolidation")} alt="Research questions consolidated into a central research objective" width={1180} height={467} caption="The team consolidated broad stakeholder questions into one decision-driving research objective." />
    </CaseStudySection>

    <CaseStudySection id="goals-methods" eyebrow="02 · Goals and methods" title="Measure the pattern, then understand the why" tone="pink">
      <div className="case-columns"><div><h3>Research goals</h3><ul><li>Define the value employees still received from Concierge.</li><li>Understand why awareness, engagement, and retention were declining.</li><li>Identify how search should coexist with Cisco’s emerging AI tools.</li><li>Prioritize opportunities the Search Team could act on.</li></ul></div><div><h3>Mixed-method approach</h3><p>A company-wide survey established usage, success, and tool preferences across the Splunk business entity. Follow-up interviews then explored real search behavior, frustrations, workarounds, and attitudes toward AI.</p><p>Interview volunteers were deliberately segmented by Concierge behavior so the study included active users, infrequent users, and detractors—not only product advocates.</p></div></div>
      <div className="participant-strip"><span><strong>2</strong> active users</span><span><strong>2</strong> infrequent users</span><span><strong>4</strong> detractors</span><span><strong>4</strong> business groups</span></div>
    </CaseStudySection>

    <CaseStudySection id="survey-findings" eyebrow="03 · Survey findings" title="The product was trusted—but rarely successful">
      <div className="metrics-grid"><MetricCard value="15%" label="used Concierge monthly"/><MetricCard value="30%" label="of users succeeded more than half the time"/><MetricCard value="87%" label="reported that success with other tools"/><MetricCard value="4.64/5" label="average use of Slack or Webex for search"/></div>
      <div className="prose"><p>The survey exposed a sharp gap between perceived value and everyday performance. Engineering showed the highest usage at 35%, yet only 45% reported success. Sales usage was 26% with 59% success, while Customer Experience had just 10% usage but 59% success. Employees most often searched for documents (47%) and IT support (39%).</p><p>Concierge mattered most when people were exploring unfamiliar topics (41%), needed internal-only data (40%), or wanted relevant source results (39%). But it had become a secondary destination: Slack and Webex averaged 4.64 ± .15 out of 5 in usage, compared with 3.15 ± .25 for external AI tools.</p></div>
      <div className="figure-grid"><CaseStudyFigure src={asset("survey-analysis-1")} alt="Chart showing Concierge use frequency" caption="Concierge use frequency across respondents."/><CaseStudyFigure src={asset("survey-analysis-2")} alt="Chart comparing Concierge success by role" caption="Usage and success varied substantially by business role."/><CaseStudyFigure src={asset("survey-analysis-3")} alt="Chart showing employee goals when using Concierge" caption="Employees valued Concierge for internal sources and unfamiliar topics."/></div>
    </CaseStudySection>

    <CaseStudySection id="interviews" eyebrow="04 · Interviews" title="Following real searches across a fragmented ecosystem" tone="pink">
      <div className="prose"><p>Interviews moved beyond stated preference into recent, concrete search episodes. Participants reconstructed where they started, which sources they trusted, what made them switch tools, and how they decided an answer was good enough.</p><p>The sample included active users from Sales and Customer Experience, infrequent users from Engineering, and four detractors. This range revealed not one universal journey, but a repeated pattern of bouncing between Slack, Webex, internal documentation, web search, AI assistants, and Concierge.</p></div>
      <CaseStudyQuote>The hard part isn’t finding an answer. It’s knowing whether the answer is current, internal, and safe to trust.</CaseStudyQuote>
    </CaseStudySection>

    <CaseStudySection id="key-insights" eyebrow="05 · Key insights" title="Concierge’s moat was trust, not the search box">
      <InsightGrid mode="insights" groups={[
        <><h4>Trusted internal retrieval</h4><p>Employees valued direct access to authoritative, permission-aware internal sources—especially when external AI could not see or verify them.</p></>,
        <><h4>Drivers of abandonment</h4><p>Missing sources, English-only results, inefficient workflows, low awareness, and displacement by Cisco AI made the product feel incomplete.</p></>,
        <><h4>Workflow fragmentation</h4><p>Search happened inside collaboration tools. Asking employees to leave Slack or Webex for a separate destination created avoidable friction.</p></>,
      ]} />
      <CaseStudyFigure src={asset("trusted-data")} alt="Research synthesis showing Concierge as a trusted internal data source" caption="The synthesis reframed Concierge’s primary value around trusted, retrievable internal data." />
    </CaseStudySection>

    <CaseStudySection id="future-state" eyebrow="06 · Desired future state" title="One search layer, available wherever work happens" tone="pink">
      <div className="case-columns"><div><h3>Unified and contextual</h3><p>Employees wanted a unified experience across sources, with results shaped by role, permissions, current task, and search history.</p></div><div><h3>Answers with evidence</h3><p>They wanted concise summaries without losing the direct source links needed to verify context and freshness.</p></div><div><h3>Multilingual by default</h3><p>A global workforce needed search that could understand and retrieve knowledge beyond English-only queries and content.</p></div><div><h3>Embedded, not separate</h3><p>The most useful future was not another destination. It was trusted retrieval inside Slack, Webex, and Cisco AI Assistant.</p></div></div>
    </CaseStudySection>

    <CaseStudySection id="ai-attitudes" eyebrow="07 · AI attitudes" title="Three mindsets shaped adoption">
      <div className="persona-grid"><CaseStudyFigure src={asset("ai-adversaries")} alt="Profile of employees who were adversarial toward AI" caption="Adversaries prioritized control, provenance, and reliability."/><CaseStudyFigure src={asset("ai-light-users")} alt="Profile of light AI users" caption="Light users adopted AI selectively for low-risk acceleration."/><CaseStudyFigure src={asset("ai-power-users")} alt="Profile of AI power users" caption="Power users expected synthesis, speed, and tool interoperability."/></div>
      <div className="prose"><p>These attitudes were not a simple maturity ladder. Each group expressed legitimate needs. Adversaries made the case for transparent sources; light users highlighted the need for low-friction, situational value; power users showed why internal retrieval had to become composable within AI workflows.</p></div>
    </CaseStudySection>

    <CaseStudySection id="recommendations" eyebrow="08 · Recommendations" title="Turn the findings into a new product position" tone="pink">
      <RecommendationList cards={[
        { segments: [<div className="feedback-blocks" key="slack-copy"><h4>Integrate Concierge into Slack and Webex</h4><p>Bring trusted retrieval into the collaboration spaces employees already use every day, reducing context switching and making internal search more discoverable.</p></div>, <CaseStudyMedia key="slack-media" kind="image" src={asset("slack-webex-integration")} alt="Concept for a Concierge app integrated in Slack" width={1185} height={720} caption="Concierge embedded in the flow of work." />] },
        { segments: [<div className="feedback-blocks" key="mcp-copy"><h4>Enable Integration with Cisco AI Assistant</h4><p>Expose Concierge’s indexed internal knowledge through MCP so Cisco AI Assistant can ground generated answers in permission-aware company data.</p></div>, <CaseStudyMedia key="mcp-media" kind="image" src={asset("mcp-integration")} alt="Diagram of Concierge integration through MCP" width={411} height={265} caption="MCP makes trusted internal retrieval available to AI experiences." />] },
        { segments: [<div className="feedback-blocks" key="positioning-copy"><h4>Reposition and Rebrand Concierge</h4><p>Shift the story from a standalone search engine to the trusted data layer that improves every internal AI and search experience.</p></div>, <CaseStudyMedia key="positioning-media" kind="image" src={asset("data-layer-positioning")} alt="Diagram positioning Concierge as a data layer" width={1018} height={870} caption="The new position: infrastructure for trusted enterprise answers." />] },
        { segments: [<div className="feedback-blocks" key="awareness-copy"><h4>Improve Targeted Awareness</h4><p>Focus education on high-value moments and segments—especially Customer Experience—rather than relying on broad, undifferentiated promotion.</p></div>] },
      ]} />
    </CaseStudySection>

    <CaseStudySection id="outcomes" eyebrow="09 · Outcomes" title="Research changed both the roadmap and the product’s role">
      <InsightGrid mode="outcomes" groups={[
        <><h4>Customer Experience</h4><p>Identified as a valuable segment with strong success but low awareness.</p></>,
        <><h4>Roadmap clarity</h4><p>Prioritized Slack indexing and Slack/Webex integration as near-term initiatives.</p></>,
        <><h4>Strategic repositioning</h4><p>Established Concierge as the critical data layer powering Cisco AI Assistant through MCP.</p></>,
        <><h4>2K+ users after release</h4><p>The MCP capability reached more than two thousand users following release.</p></>,
        <><h4>Introduced survey research practices</h4><p>Built a repeatable quantitative research approach for the team.</p></>,
      ]} />
      <div className="case-closing"><p className="eyebrow">The lasting lesson</p><h3>Generative AI did not eliminate the need for enterprise search. It made trustworthy retrieval more important.</h3><p>The research helped the team stop treating AI as a replacement threat and start treating Concierge as the evidence layer that makes internal AI useful, verifiable, and safe.</p></div>
    </CaseStudySection>
    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
