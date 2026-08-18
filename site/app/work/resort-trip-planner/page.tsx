import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "../../components/ActionLink";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { MetricCard } from "../../components/case-study/MetricCard";
import { RecommendationCard } from "../../components/case-study/RecommendationCard";
import { RecommendationList } from "../../components/case-study/RecommendationList";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { WorkflowQuestion } from "../../components/case-study/WorkflowQuestion";

export const metadata: Metadata = {
  title: "Nemacolin Woodlands Resort Trip Planner | Melissa Shi",
  description: "Designing a personalized trip planner that turns resort discovery into confident booking decisions.",
};

const chapters = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "motivations", label: "Guest motivations" },
  { id: "journey", label: "Reservation journey" },
  { id: "flexibility", label: "Flexible planning" },
  { id: "guidance", label: "Guided control" },
  { id: "personalization", label: "Personalization" },
  { id: "results", label: "Results" },
];

const media = {
  hero: ["hero.jpg", "Nemacolin Trip Planner shown on two mobile screens", 2433, 1343, "The final experience guides guests from trip goals to tailored recommendations, itinerary building, and booking."],
  motivations: ["motivation-value-planning.png", "Diagram connecting guest motivation to perceived value and planning behavior", 769, 242, "Research showed that motivation shaped what guests valued and how they planned more strongly than demographics alone."],
  classifier: ["booking-classifier-tree.png", "Decision tree using guest and trip variables to classify hotel preference", 1422, 691, "Reservation data identified party composition, season, timing, and stay type as useful signals for hotel preference."],
  concepts: ["initial-concepts.png", "Three early concepts: interactive room, recommender, and gift giving", 3974, 977, "Three broad concepts tested whether value should be communicated through exploration, recommendation, or social gifting."],
  conceptResults: ["concept-validation-results.png", "Concept validation rankings across prospective guest types", 3324, 1244, "Speed dating showed stronger interest in tailored recommendations and itinerary building than isolated novelty features."],
  buildFlow: ["build-itinerary-flow.png", "First concept flow prompting guests to build an itinerary during booking", 16416, 4372, "Flow 1 let guests choose recommendations and build an itinerary as they moved toward booking."],
  prebuiltFlow: ["prebuilt-itinerary-flow.png", "Alternative concept flow presenting a prebuilt recommended itinerary", 11466, 7209, "Flow 2 generated a complete itinerary first, reducing effort but also reducing perceived control."],
  flexibleFlow: ["flexible-itinerary-flow.jpg", "Second-iteration flow with detailed recommendations and editable itinerary", 1342, 534, "The selected direction added richer detail, day-based planning, and easier itinerary editing."],
  navigation: ["guided-navigation.png", "Step-by-step planner navigation across quiz, recommendation, itinerary, and booking", 4237, 1897, "A persistent four-step model clarified what the planner did and what guests should do next."],
  finalScreens: ["final-responsive-experience.jpg", "Final Resort Trip Planner across mobile, tablet, and desktop", 2968, 1670, "The final design translated the guided workflow across mobile, tablet, and desktop."],
  quiz: ["quiz-flow.gif", "Animated trip-preference quiz flow", 310, 618, "The quiz captures party, dates, and trip style with a short sequence of focused questions."],
  recommendations: ["recommendation-flow.gif", "Animated tailored recommendation flow", 310, 618, "Recommendations explain relevant stays, experiences, and dining options without hiding alternatives."],
  itinerary: ["itinerary-flow.gif", "Animated itinerary editing flow", 310, 618, "Guests can review, save, and adjust recommendations by day."],
  booking: ["booking-flow.gif", "Animated booking flow", 310, 618, "The planner carries selected experiences into one booking path."],
  principles: ["ten-design-principles.png", "Ten design principles mapped to Resort Trip Planner screens", 1241, 6316, "Ten principles connected white-glove service, conversion, transparency, flexibility, scarcity, and brand expression."],
  logic: ["final-recommendation-logic.png", "Final recommendation logic connecting quiz answers to stays, experiences, and dining", 5240, 3672, "The final logic combined known reservation signals with stated trip style to filter relevant options."],
  perception: ["brand-perception-outcome.png", "Guest perception words before and after using the trip planner", 1628, 1003, "After using the planner, participants described Nemacolin as more modern, efficient, organized, helpful, and inviting."],
} as const;

type MediaKey = keyof typeof media;

function renderMedia(key: MediaKey) {
  const [file, alt, width, height, caption] = media[key];
  return <CaseStudyMedia kind="image" src={`/portfolio/resort-trip-planner/${file}`} alt={alt} width={width} height={height} caption={caption} />;
}

export default function ResortTripPlannerPage() {
  return <main className="case-study feedback-case-study">
    <PortfolioHeader current="work" />
    <CaseStudyHero
      backLink={<Link className="case-back" href="/#selected-work">← Back to work</Link>}
      eyebrow="Consumer travel · Product design · Mixed-method research"
      title="Nemacolin Woodlands Resort Trip Planner"
      deck="Turning more than 80 resort activities into a guided, personalized path from discovery to booking."
      overviewPanels={[
        { heading: "Problem", content: <p>Nemacolin offered exceptional service and more than 80 activities, but prospective guests struggled to understand its unique value and did not reserve enough of the experience before arrival.</p> },
        { heading: "Solution", content: <p>A responsive trip planner uses guest goals and trip context to recommend stays, activities, and dining while preserving control through an editable itinerary.</p> },
      ]}
      metadataItems={[
        { label: "My role", value: "Lead Researcher and Designer" },
        { label: "Team", value: "Project manager, lead developer, two product designers" },
        { label: "Client", value: "Nemacolin Woodlands Resort" },
        { label: "Timeline", value: "Jan–Jul 2019" },
      ]}
      mediaSlots={renderMedia("hero")}
    />
    <VerticalChapterNav chapters={chapters} />

    <CaseStudySection id="overview" eyebrow="Impact snapshot" title="Five rounds of evidence moved the product from novelty to conversion">
      <div className="metrics-grid">
        <MetricCard value="25" label="testing participants across five iterations" />
        <MetricCard value="92%" label="likely to reserve ahead after using the planner" />
        <MetricCard value="42%" label="likely to book earlier than they typically would" />
        <MetricCard value="80+" label="resort activities organized into a guided experience" />
      </div>
      <p className="case-deck">The final direction was not a single idea taken to high fidelity. Each research round resolved a different product question: who to design for, where personalization added value, how much structure guests needed, and what would actually encourage action.</p>
    </CaseStudySection>

    <CaseStudySection id="context" eyebrow="Research foundation" title="The visible conversion problem started before booking" tone="pink">
      <p className="case-deck">Interviews with past guests, a mystery booking exercise, market analysis, reservation-data analysis, and onsite contextual inquiry showed that guests arrived without enough planning. Staff could not reliably promote the resort&apos;s full activity portfolio, and missing reservations could diminish the experience before a guest reached the property.</p>
      <InsightGrid mode="insights" groups={[
        <><h4>Activities were the differentiator</h4><p>Nemacolin&apos;s breadth of experiences was its strongest advantage, but that value was difficult to communicate.</p></>,
        <><h4>Pre-arrival action mattered</h4><p>Reservations were essential to accessing the best experience, yet guests often delayed planning until arrival.</p></>,
        <><h4>Mobile was the planning surface</h4><p>Research participants commonly used phones for trip discovery and planning, supporting a mobile-first direction.</p></>,
      ]} />
    </CaseStudySection>

    <CaseStudySection id="motivations" eyebrow="Decision 1" title="Target motivations instead of demographics">
      <p>Reservation data initially pointed to a target segment of upper-middle-income adults ages 35 to 45, often traveling with children. Contextual inquiry revealed a more useful segmentation variable: why people were taking the trip.</p>
      <WorkflowQuestion>What if recommendation logic began with the value a guest wanted from the trip, not only who the guest appeared to be?</WorkflowQuestion>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Connect motivation to perceived value</h4><p>Across couples, families, and friend groups, motivation changed what guests noticed, trusted, and prioritized. I reframed the experience around active, adventurous, cultural, relaxing, romantic, and family-oriented goals.</p></div>, renderMedia("motivations")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Use behavioral data as supporting evidence</h4><p>Historical reservation, CRM, call-center, and feedback data identified eight useful booking signals. The model reached 43% hotel-classification accuracy, useful for narrowing options but not strong enough to replace stated preference.</p></div>, renderMedia("classifier")]} />
      </RecommendationList>
      <p>The resulting strategy combined explicit trip goals with contextual signals instead of treating demographic similarity as personalization.</p>
    </CaseStudySection>

    <CaseStudySection id="journey" eyebrow="Decision 2" title="Support the full reservation journey" tone="pink">
      <p>The first concepts explored an interactive room, a recommender, and gift giving. I designed speed-dating research with prospective guests and resort staff to validate the underlying needs before the team committed to a solution.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Test needs before polishing features</h4><p>Storyboards made each value proposition easy to compare without investing in detailed interface work.</p></div>, renderMedia("concepts"), renderMedia("conceptResults")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Expand from recommendation to completion</h4><p>Concept validation showed that a useful solution needed to connect resort discovery, option comparison, itinerary planning, and payment. A recommendation-only feature would have stopped before the hardest decisions.</p></div>]} />
      </RecommendationList>
    </CaseStudySection>

    <CaseStudySection id="flexibility" eyebrow="Decision 3" title="Choose flexible planning over a prebuilt answer">
      <p>We tested two ways to encourage reservations: let guests build an itinerary while booking, or present a ready-made itinerary. I planned guerrilla, in-person, and remote sessions to compare the mental models despite recruiting constraints.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Compare complete workflows</h4><p>The first flow offered more control; the second reduced effort. Testing showed that guests valued flexibility, richer option details, and clarity about which days recommendations applied to.</p></div>, renderMedia("buildFlow"), renderMedia("prebuiltFlow")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Carry the strongest parts forward</h4><p>I recommended the build-your-own direction, then added detailed stay and experience information, easier itinerary management, and a day-based view.</p></div>, renderMedia("flexibleFlow")]} />
      </RecommendationList>
    </CaseStudySection>

    <CaseStudySection id="guidance" eyebrow="Decision 4" title="Add structure without removing control" tone="pink">
      <p>Iteration two exposed a different problem: flexibility alone left guests unsure what the planner was for and how to move from interest to booking. I reframed navigation around a visible four-step journey.</p>
      <InsightGrid mode="outcomes" groups={[
        <><h4>Quiz</h4><p>Capture party, dates, and trip style with a focused sequence.</p></>,
        <><h4>Recommendations</h4><p>Explain relevant options while keeping alternatives visible.</p></>,
        <><h4>Itinerary</h4><p>Organize choices by day and preserve editing flexibility.</p></>,
        <><h4>Booking</h4><p>Carry selected stays, activities, and dining into one completion path.</p></>,
      ]} />
      {renderMedia("navigation")}
      <p>Later tests confirmed that participants understood the workflow and could move through it smoothly. Those sessions also revealed secondary cases such as returning to a saved itinerary, handling availability conflicts, and booking a room without activities.</p>
    </CaseStudySection>

    <CaseStudySection id="personalization" eyebrow="Decision 5" title="Use personalization without overstating the model">
      <p>The final recommendation logic filtered a large catalog using party composition, travel timing, stated trip style, and historical patterns. Because first-time guests had no prior behavior, the underlying model classified likely hotel preference rather than operating as a true recommender system.</p>
      <RecommendationList>
        <RecommendationCard sequence={1} segments={[<div className="feedback-blocks" key="copy"><h4>Keep the algorithm legible</h4><p>The quiz collected only signals that changed results, while recommendations retained visible context such as dates, party, trip style, and price.</p></div>, renderMedia("logic")]} />
        <RecommendationCard sequence={2} segments={[<div className="feedback-blocks" key="copy"><h4>Use persuasion with guardrails</h4><p>Ten design principles balanced conversion goals with guest needs: transparency, flexibility, clear expectations, scannable choices, relevant scarcity, and a modern expression of white-glove service.</p></div>, renderMedia("principles")]} />
      </RecommendationList>
    </CaseStudySection>

    <CaseStudySection id="results" eyebrow="Final experience and results" title="A guided planner that made a complex resort feel easier to choose" tone="pink">
      {renderMedia("finalScreens")}
      <div className="figure-grid">
        {renderMedia("quiz")}
        {renderMedia("recommendations")}
        {renderMedia("itinerary")}
        {renderMedia("booking")}
      </div>
      <InsightGrid mode="outcomes" groups={[
        <><h4>Conversion intent</h4><p>All 25 participants said they were likely to book a stay if price were not a constraint.</p></>,
        <><h4>Earlier reservations</h4><p>Ninety-two percent were likely to reserve ahead, and 42% said they would book earlier than usual.</p></>,
        <><h4>Brand perception</h4><p>Participants described the experience as modern, professional, efficient, organized, helpful, clean, inviting, and easy.</p></>,
      ]} />
      {renderMedia("perception")}
      <p className="case-deck">My biggest takeaway was that personalization is a product strategy, not an algorithm alone. The strongest outcome came from combining behavioral evidence with stated intent, then giving guests enough structure to act without taking away their control.</p>
    </CaseStudySection>

    <section className="case-next case-shell"><p className="eyebrow">Keep exploring</p><h2>See more work where research shapes product strategy.</h2><ActionLink href="/#selected-work">Back to selected work</ActionLink></section>
    <PortfolioFooter />
  </main>;
}
