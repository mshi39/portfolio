export type FeedbackMediaKey =
  | "thumbnail"
  | "hero-video"
  | "desired-workflow"
  | "workshop-map"
  | "user-flow"
  | "product-models"
  | "prototype"
  | "lower-barrier"
  | "scheduling"
  | "ai-insight-video"
  | "source-verification"
  | "central-feedback"
  | "jira"
  | "presentation"
  | "customer-portal";

export type FeedbackContentBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string; variant?: "workflow-question" }
  | { type: "list"; items: string[] }
  | { type: "media"; key: FeedbackMediaKey };

export const feedbackContent: FeedbackContentBlock[] = [
  {
    "type": "heading",
    "level": 2,
    "text": "AI-Powered Customer Feedback Intelligence Platform"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Redefining an AI meeting concept into an end-to-end system that connects customer insights to product action"
  },
  {
    "type": "media",
    "key": "thumbnail"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Overview"
  },
  {
    "type": "paragraph",
    "text": "Voice of the Customer (VOC) enables product teams to collect and analyze feedback, but engagement remained low. Most high-value insights were captured informally through customer meetings and never centralized, leading to fragmented knowledge and significant manual effort to synthesize insights."
  },
  {
    "type": "paragraph",
    "text": "This project expanded VOC into an end-to-end feedback intelligence platform—capturing, analyzing, and operationalizing insights from live customer interactions through integration with Webex and an internal AI agent."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Projected Impact"
  },
  {
    "type": "list",
    "items": [
      "Save product managers more than 20 hours per testing program",
      "Increase captured customer feedback by approximately 3×",
      "Reduce manual work from meeting scheduling through insight communication",
      "Create a centralized source of truth for customer feedback",
      "Connect feedback directly to prioritization, Jira execution, and outcome tracking"
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "My Role"
  },
  {
    "type": "paragraph",
    "text": "Solo UX Designer"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Timeline"
  },
  {
    "type": "paragraph",
    "text": "April–May 2026"
  },
  {
    "type": "media",
    "key": "hero-video"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The Opportunity"
  },
  {
    "type": "paragraph",
    "text": "VOC helped product teams run formal customer-testing programs, but the average number of feedback tickets captured through each program remained low."
  },
  {
    "type": "paragraph",
    "text": "That did not necessarily mean teams lacked customer feedback. Instead, product managers frequently collected their most detailed and contextual feedback through direct customer conversations."
  },
  {
    "type": "paragraph",
    "text": "Those conversations allowed product managers to build relationships, ask follow-up questions, and uncover needs that structured feedback forms might miss. But the insights are not entered into a consistent system."
  },
  {
    "type": "paragraph",
    "text": "The product manager initially proposed a Webex integration that would make VOC a place to schedule, record, and summarize customer meetings. They turned to me for feature definition. But before defining the solution, I wanted to understand the complete workflow and determine whether meeting automation addressed the most important user problem."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "Mapping the Real Customer-Feedback Workflow"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The challenge"
  },
  {
    "type": "paragraph",
    "text": "The initial concept assumed that meeting scheduling and AI-generated summaries were the primary opportunities. Designing directly based on assumptions risked optimizing one step while leaving the broader feedback process fragmented. "
  },
  {
    "type": "paragraph",
    "text": "We did not yet have a shared understanding of:"
  },
  {
    "type": "list",
    "items": [
      "How product managers currently organized customer conversations",
      "Where the most significant friction occurred",
      "What happened to feedback after the meeting",
      "Which parts of the process should be automated",
      "Where human judgment remained essential"
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "My approach"
  },
  {
    "type": "paragraph",
    "text": "I facilitated a collaborative journey-mapping workshop with nine product managers."
  },
  {
    "type": "paragraph",
    "text": "Before the workshop, I created an initial journey based on previous VOC research. Rather than presenting it as a finished model, I used it as a hypothesis for participants to correct."
  },
  {
    "type": "paragraph",
    "text": "During the session, product managers:"
  },
  {
    "type": "list",
    "items": [
      "Modified the journey to reflect their actual process",
      "Identified breakdowns, dependencies, and workarounds",
      "Shared differences in how they scheduled and conducted sessions",
      "Described how they synthesized and communicated findings",
      "Explained how insights eventually became product work"
    ]
  },
  {
    "type": "media",
    "key": "workshop-map"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "What I uncovered"
  },
  {
    "type": "paragraph",
    "text": "The workshop surfaced 35 pain points, with five major areas of friction:"
  },
  {
    "type": "media",
    "key": "user-flow"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Legal requirements blocked adoption"
  },
  {
    "type": "paragraph",
    "text": "User agreements could prevent teams from using VOC, even when they wanted support with other parts of the workflow."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Scheduling required excessive coordination"
  },
  {
    "type": "paragraph",
    "text": "Product managers frequently exchanged multiple messages with customers before finding a workable time."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Insight extraction was highly manual"
  },
  {
    "type": "paragraph",
    "text": "Teams spent hours reviewing raw notes and transcripts to identify themes, pain points, and customer needs."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The same findings had to be repackaged repeatedly"
  },
  {
    "type": "paragraph",
    "text": "Product managers created different presentations and summaries for leadership, product teams, and other stakeholders."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Feedback was disconnected from execution"
  },
  {
    "type": "paragraph",
    "text": "Insights still had to be translated into prioritized, trackable work in Jira."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Outcome"
  },
  {
    "type": "paragraph",
    "text": "The research showed that the real problem was not simply:"
  },
  {
    "type": "paragraph",
    "text": "How might we summarize customer meetings with AI?"
  },
  {
    "type": "paragraph",
    "text": "It was:"
  },
  {
    "type": "quote",
    "text": "How might we create a continuous system that captures customer feedback, turns it into trustworthy intelligence, and connects it to product action?",
    "variant": "workflow-question"
  },
  {
    "type": "paragraph",
    "text": "I synthesized the findings with the product manager and translated them into 17 MVP requirements."
  },
  {
    "type": "paragraph",
    "text": "This established a user-driven foundation for the new capability rather than relying solely on the initial product concept."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "Defining the Right Product Architecture"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The challenge"
  },
  {
    "type": "paragraph",
    "text": "Once we understood the broader workflow, we needed to decide where the new capability should live and how tightly it should be connected to existing VOC testing programs."
  },
  {
    "type": "paragraph",
    "text": "I explored three product models."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Option 1: A program-aware but independent workflow inside VOC"
  },
  {
    "type": "paragraph",
    "text": "Users could create and analyze customer meetings without first creating a testing program, while still having the option to associate meetings with an existing program."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Option 2: A feature embedded within program creation"
  },
  {
    "type": "paragraph",
    "text": "Meeting scheduling and analysis would exist only as part of a formal VOC testing program."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Option 3: A standalone application"
  },
  {
    "type": "paragraph",
    "text": "The team could create a separate product focused exclusively on customer meetings and feedback intelligence."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Evaluating the Trade-Offs"
  },
  {
    "type": "media",
    "key": "product-models"
  },
  {
    "type": "paragraph",
    "text": "Embedding the capability within program creation offered strong data consistency, but it created a significant barrier to entry."
  },
  {
    "type": "paragraph",
    "text": "Research showed that product managers held many valuable customer conversations outside formal testing programs. Requiring a program would prevent them from using the capability for these interactions."
  },
  {
    "type": "paragraph",
    "text": "A standalone product offered flexibility but risked fragmenting the VOC ecosystem and creating another disconnected source of customer data."
  },
  {
    "type": "paragraph",
    "text": "The first option provided the best balance."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The Decision"
  },
  {
    "type": "paragraph",
    "text": "I recommended making meeting intelligence an independent workflow inside the VOC Admin portal. The product manager initially favored tying the feature directly to programs. I used workshop evidence, user workflows, and Engineering input to facilitate a change in direction."
  },
  {
    "type": "paragraph",
    "text": "In this model:"
  },
  {
    "type": "list",
    "items": [
      "Users can schedule and analyze meetings without creating a VOC program",
      "Meetings can optionally be linked to an active program",
      "Related customer interactions can still be viewed together",
      "The capability remains part of the broader VOC feedback ecosystem",
      "The architecture can expand to support additional feedback sources"
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Why It Mattered"
  },
  {
    "type": "paragraph",
    "text": "This decision lowered the barrier to adoption while preserving the ability to maintain connected customer and program data."
  },
  {
    "type": "paragraph",
    "text": "It also positioned VOC to evolve beyond a testing-program tool into a broader customer intelligence platform."
  },
  {
    "type": "heading",
    "level": 2,
    "text": "Validation Product Direction Through Design"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The Challenge"
  },
  {
    "type": "paragraph",
    "text": "After defining the initial requirements, I did not want to move directly into detailed design. "
  },
  {
    "type": "paragraph",
    "text": "Although users had described their problems, we still needed to validate whether the proposed capabilities delivered enough value and whether our interpretation of the workflow was correct. "
  },
  {
    "type": "paragraph",
    "text": "Because the project had a short timeline, I used an end-to-end concept prototype as a research tool to validate product direction and feature requirements."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "My Approach"
  },
  {
    "type": "paragraph",
    "text": "I sketched the primary workflow, translated it into a high-level interactive prototype using Figma Make, and conducted five usability and concept-validation sessions."
  },
  {
    "type": "paragraph",
    "text": "The research focused on four questions:"
  },
  {
    "type": "list",
    "items": [
      "Were we solving the right problems?",
      "Where did the proposed features fall short of expectations?",
      "Which parts of the experience created the most value?",
      "Could users understand and navigate the proposed workflow?"
    ]
  },
  {
    "type": "media",
    "key": "prototype"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "The Pivotal Finding"
  },
  {
    "type": "paragraph",
    "text": "Participants confirmed that meeting scheduling and AI analysis were useful—but they did not want another meeting tool with automated summaries."
  },
  {
    "type": "paragraph",
    "text": "The strongest expectations were:"
  },
  {
    "type": "list",
    "items": [
      "A single source of truth for feedback across channels",
      "A complete workflow from capture through execution",
      "AI-generated themes that could be traced back to evidence",
      "Human control over generated insights",
      "Support for real-world scheduling complexity",
      "Visibility into whether customer feedback ultimately influenced the product"
    ]
  },
  {
    "type": "paragraph",
    "text": "They expected VOC to become a customer feedback intelligence platform."
  },
  {
    "type": "paragraph",
    "text": "Users described the desired workflow as:"
  },
 
  {
    "type": "media",
    "key": "desired-workflow"
  },
  {
    "type": "quote",
    "text": "“AI could interpret it one way and I could interpret it the other way.”",
    "attribution": "– Splunk Product Manager"
  },
  {
    "type": "quote",
    "text": "“I really like the idea about insight center, we just wanna make sure that this is a single source of truth.”",
    "attribution": "– Splunk Product Manager"
  },
  {
    "type": "heading",
    "level": 2,
    "text": "Designing an End-to-End Feedback Intelligence Pipeline"
  },
  {
    "type": "paragraph",
    "text": "Based on validation findings, I refined the concept around six core value drivers."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Lower the Barrier to Capturing Feedback"
  },
  {
    "type": "paragraph",
    "text": "Users can access the meeting capability at any time without creating a formal testing program."
  },
  {
    "type": "paragraph",
    "text": "They can optionally associate a meeting or series of meetings with an active VOC program when that relationship is useful."
  },
  {
    "type": "paragraph",
    "text": "This supports both structured research initiatives and informal customer conversations."
  },
  {
    "type": "media",
    "key": "lower-barrier"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Handle Real-World Scheduling Complexity"
  },
  {
    "type": "paragraph",
    "text": "The initial concept needed to support more than a simple one-to-one booking flow."
  },
  {
    "type": "paragraph",
    "text": "I designed a flexible scheduling model that could support:"
  },
  {
    "type": "list",
    "items": [
      "Individual customer meetings",
      "Group sessions",
      "One-time or recurring meetings",
      "Automatically detected internal availability",
      "Customer self-scheduling",
      "Declining a proposed time",
      "Suggesting an alternative time"
    ]
  },
  {
    "type": "media",
    "key": "scheduling"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Automate Insight Extraction with AI"
  },
  {
    "type": "paragraph",
    "text": "The platform integrates with Webex to retrieve meeting transcripts and generate structured customer insights."
  },
  {
    "type": "paragraph",
    "text": "Instead of producing only a general summary, the AI extracts multiple types of signals, including:"
  },
  {
    "type": "list",
    "items": [
      "Pain points",
      "Value drivers",
      "Customer goals and needs",
      "Product requests",
      "Suggested improvements",
      "Customer characteristics",
      "Supporting quotations",
      "Recurring themes across conversations"
    ]
  },
  {
    "type": "media",
    "key": "ai-insight-video"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Keep Humans in Control"
  },
  {
    "type": "paragraph",
    "text": "Customer feedback is nuanced, and AI-generated interpretations can be incomplete or misleading."
  },
  {
    "type": "paragraph",
    "text": "Thus, the goal was not to replace human analysis. It was to accelerate it while preserving trust and accountability."
  },
  {
    "type": "paragraph",
    "text": "Users can:"
  },
  {
    "type": "list",
    "items": [
      "Edit generated insights",
      "Add missing insights",
      "Remove inaccurate interpretations",
      "Consolidate or separate themes",
      "Review the original transcripts for validation",
      "Trace every insight back to its source"
    ]
  },
  {
    "type": "media",
    "key": "source-verification"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Centralize Feedback Across Channels"
  },
  {
    "type": "paragraph",
    "text": "Research showed that customer feedback existed in more places than Webex meetings."
  },
  {
    "type": "paragraph",
    "text": "The architecture therefore needed to support additional inputs over time. As an interim solutions, I designed an file upload & analysis feature to allow manual consolidation of customer feedback. "
  },
  {
    "type": "paragraph",
    "text": "This establishes VOC as a single source of truth rather than another isolated repository."
  },
  {
    "type": "media",
    "key": "central-feedback"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Connect Insight to Execution"
  },
  {
    "type": "paragraph",
    "text": "Generating insights alone does not create product impact. I designed the workflow to help teams prioritize and act on what they learned. This closes the gap between customer feedback and product execution."
  },
  {
    "type": "paragraph",
    "text": "Users can:"
  },
  {
    "type": "list",
    "items": [
      "Assign priority to insights and themes",
      "Select findings that should become product work",
      "Generate Jira tickets using AI",
      "Track Jira progress from within VOC"
    ]
  },
  {
    "type": "media",
    "key": "jira"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Communicate Findings Efficiently"
  },
  {
    "type": "paragraph",
    "text": "Product managers frequently recreated the same findings for different audiences."
  },
  {
    "type": "paragraph",
    "text": "To reduce this repeated work, I designed an AI-assisted presentation workflow."
  },
  {
    "type": "paragraph",
    "text": "Users can:"
  },
  {
    "type": "list",
    "items": [
      "Select the insights and themes they want to communicate",
      "Adjust the prompt",
      "Generate a presentation draft"
    ]
  },
  {
    "type": "media",
    "key": "presentation"
  },
  {
    "type": "paragraph",
    "text": "Leadership can also access a high-level view of customer themes, priorities, and resulting product work without reviewing individual meetings."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Simple and Control for Customers "
  },
  {
    "type": "paragraph",
    "text": "Traditionally, aligning on meeting time with customers required back-and-forth email communication. To address this, I exposed Splunk team availability and allow customers to find what suits them."
  },
  {
    "type": "paragraph",
    "text": "Customers can:"
  },
  {
    "type": "list",
    "items": [
      "View meeting availability from the Splunk team",
      "Easily sign up for a meeting from available slots",
      "Have control over meeting time",
      "Reduce the need for back-and-forth alignment with Cisconians"
    ]
  },
  {
    "type": "media",
    "key": "customer-portal"
  },
  {
    "type": "heading",
    "level": 2,
    "text": "Building Trust into the AI Experience"
  },
  {
    "type": "paragraph",
    "text": "The research made it clear that AI automation would only be valuable if users trusted the output."
  },
  {
    "type": "paragraph",
    "text": "I incorporated several trust mechanisms into the concept that positioned AI as a collaborative layer within the workflow rather than an opaque decision-maker."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Source traceability"
  },
  {
    "type": "paragraph",
    "text": "Generated insights remain connected to the original transcript, notes, and supporting quotations."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Human approval"
  },
  {
    "type": "paragraph",
    "text": "AI output can be reviewed, edited, removed, or expanded before it influences product decisions."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Transparent aggregation"
  },
  {
    "type": "paragraph",
    "text": "Users can see which meetings and source materials contributed to a theme."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Adjustable output"
  },
  {
    "type": "paragraph",
    "text": "Generated Jira tickets and presentations remain editable rather than being treated as final deliverables."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Clear division of responsibility"
  },
  {
    "type": "paragraph",
    "text": "AI supports synthesis and content generation, while users retain authority over interpretation, prioritization, and execution."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Collaboration and Influence"
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Product Definition"
  },
  {
    "type": "paragraph",
    "text": "I helped the product manager move from a preliminary Webex integration concept to a broader customer intelligence strategy grounded in user research."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Feature Definition"
  },
  {
    "type": "paragraph",
    "text": "I translated 35 pain points into 17 requirements and organized them into a coherent end-to-end capability."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Strategic Alignment"
  },
  {
    "type": "paragraph",
    "text": "I evaluated three product architectures and used user evidence to influence the decision to make meeting intelligence independent of formal VOC programs."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "AI Experience Design"
  },
  {
    "type": "paragraph",
    "text": "I defined where automation could reduce manual work and where human review was necessary to preserve trust."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Rapid Validation"
  },
  {
    "type": "paragraph",
    "text": "I used an interactive concept prototype to validate the product direction before investing in detailed design and development."
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Projected Impact"
  },
  {
    "type": "paragraph",
    "text": "The proposed experience was designed to automate and streamline the journey from customer conversation to product action."
  },
  {
    "type": "paragraph",
    "text": "It was projected to:"
  },
  {
    "type": "list",
    "items": [
      "Save product managers more than 20 hours per product-testing program",
      "Increase captured customer feedback by approximately 3×",
      "Reduce manual scheduling, transcript review, synthesis, and reporting",
      "Preserve customer knowledge in a centralized system",
      "Accelerate the movement of customer insights into the product backlog",
      "Improve visibility into how feedback influences product outcomes"
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "What This Project Demonstrated"
  },
  {
    "type": "paragraph",
    "text": "By reframing the problem, defining the capability architecture, validating the concept, and designing human oversight into the AI workflow, I helped establish a direction for VOC to evolve from a testing-program platform into a customer feedback intelligence platform."
  },
  {
    "type": "paragraph",
    "text": "The project demonstrates my ability to:"
  },
  {
    "type": "list",
    "items": [
      "Reframe feature requests into broader product opportunities",
      "Translate qualitative research into product strategy and requirements",
      "Define AI capabilities around real user value rather than novelty",
      "Evaluate product architecture alternatives and communicate trade-offs",
      "Balance automation with human judgment and source transparency",
      "Use prototypes to validate strategy before investing in detailed execution"
    ]
  }
];
