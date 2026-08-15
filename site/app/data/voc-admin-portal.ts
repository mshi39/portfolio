import type { ContentBlock } from "../components/case-study/ContentBlockRenderer";

export type VocMediaKey =
  | "ecosystem" | "old-flow" | "option-1" | "option-2" | "option-3" | "option-4" | "new-flow"
  | "old-setup" | "decision-tree" | "preview" | "old-sectional" | "old-stepper" | "workflow-video"
  | "preparation" | "section-intro" | "flexible-nav" | "draft" | "ui-constraints" | "scalable-video"
  | "stepper" | "patterns";

type Block = ContentBlock<VocMediaKey>;

export const vocContent: Record<string, Block[]> = {
  challenge: [
    { type: "paragraph", text: "The VOC platform includes an Admin portal used by more than 2,000 internal users to create and manage testing programs, and a Customer portal used by more than 12,000 external users to discover programs and submit feedback." },
    { type: "paragraph", text: "Years of feature additions had left the Admin portal with confusing terminology, disconnected workflows, limited guidance, and an architecture that could no longer support the product's growth." },
    { type: "heading", level: 3, text: "Conflicting product definitions" },
    { type: "paragraph", text: "Terms such as “public program” and “private program” meant different things in the platform than they did within Splunk's product organization, creating confusion and SME dependency." },
    { type: "heading", level: 3, text: "A black-box creation experience" },
    { type: "paragraph", text: "Program owners entered content without knowing how it would appear to customers, leading to hesitation and increased support needs." },
    { type: "heading", level: 3, text: "Workflows that ignored real dependencies" },
    { type: "paragraph", text: "Creating a program required materials from Legal, Engineering, and other teams, yet users could not save incomplete programs or see upcoming requirements." },
    { type: "heading", level: 3, text: "Limited interface scalability" },
    { type: "paragraph", text: "Modal-heavy patterns constrained complex forms, navigation, and future capabilities. This required more than a visual refresh: the product model, information architecture, technical capabilities, and interactions all needed reconsideration." },
  ],
  scope: [
    { type: "paragraph", text: "Redesigning every workflow across both portals at once would have delayed delivery. I partnered with the product manager to focus the MVP on the Admin portal's private-program workflow." },
    { type: "paragraph", text: "Private programs contained nearly every major capability required by the other program types, making them the strongest test of a reusable foundation." },
    { type: "media", key: "ecosystem" },
    { type: "heading", level: 3, text: "My approach" },
    { type: "paragraph", text: "I treated the work as a product-definition and systems-design challenge rather than a page-by-page redesign." },
    { type: "list", items: ["Audited the portal and mapped its workflows", "Interviewed program owners and subject-matter experts", "Studied Splunk's product lifecycle and customer-testing processes", "Partnered with Engineering on system and database constraints", "Explored multiple program models and information architectures", "Produced eight major design iterations", "Conducted seven usability tests and more than ten stakeholder reviews", "Completed three rounds of engineering feasibility review"] },
  ],
  architecture: [
    { type: "paragraph", text: "The existing system used “public program” for both a customer-facing test and a participant-recruitment mechanism. Private programs could still need public recruitment, forcing owners to manage two disconnected records for one initiative." },
    { type: "media", key: "old-flow" },
    { type: "heading", level: 3, text: "Exploring four system models" },
    { type: "paragraph", text: "I compared four relationships between public programs, private programs, and recruitment." },
    { type: "media", key: "option-1" }, { type: "media", key: "option-2" }, { type: "media", key: "option-3" }, { type: "media", key: "option-4" },
    { type: "heading", level: 3, text: "The decision" },
    { type: "paragraph", text: "I recommended making recruitment an optional part of a private program. This preserved phased testing while connecting recruitment and testing as one initiative." },
    { type: "list", items: ["Aligned public and private definitions with product-team terminology", "Made recruitment an optional capability within a private program", "Unified recruitment and testing progress", "Removed an unnecessary SME approval dependency", "Created a clearer foundation for future program types"] },
    { type: "media", key: "new-flow" },
    { type: "heading", level: 3, text: "Why it mattered" },
    { type: "paragraph", text: "The new structure aligned the system with users' mental models, reduced the records they managed, removed unnecessary SME dependency, and established a clearer foundation for future program types." },
  ],
  guardrails: [
    { type: "paragraph", text: "The old portal presented nearly every setup option at once. Users had to know which fields applied to their situation, so a technically self-service product still depended on institutional knowledge." },
    { type: "media", key: "old-setup" },
    { type: "heading", level: 3, text: "The solution" },
    { type: "paragraph", text: "I defined a program-type framework around the user's testing objective. The selected type determines the content required, the steps shown, available recruitment and feedback capabilities, and how the program appears to customers." },
    { type: "media", key: "decision-tree" },
    { type: "paragraph", text: "Progressive disclosure reduced guesswork, prevented invalid configurations, and created reusable rules for future program types." },
    { type: "heading", level: 3, text: "Why it mattered" },
    { type: "list", items: ["Reduced guesswork and cognitive load", "Prevented invalid or inappropriate configurations", "Explained why information was requested", "Created reusable rules for additional program types", "Enabled more confident self-service"] },
  ],
  visibility: [
    { type: "paragraph", text: "Program owners were responsible for a high-quality customer experience, but the Admin portal offered no preview of the final Customer portal page before publication." },
    { type: "heading", level: 3, text: "Connect input to customer experience" },
    { type: "paragraph", text: "I introduced a visual reference showing how Admin inputs translated to the Customer portal. A real-time preview was not feasible for the MVP, but the final design gave users clear context throughout creation." },
    { type: "media", key: "preview" },
    { type: "heading", level: 3, text: "Mirror the customer journey" },
    { type: "paragraph", text: "I reorganized setup around the order customers encounter information instead of internal content types, helping owners make customer-centered decisions while creating the experience." },
    { type: "media", key: "old-sectional" },
    { type: "heading", level: 3, text: "Why it mattered" },
    { type: "paragraph", text: "Connecting configuration to customer outcomes increased confidence, encouraged stronger customer-facing content, and reduced dependence on the VOC team for verification." },
    { type: "quote", text: "This is great! Even though it's not reflecting real-time, it gives me a good idea what shows and how it shows up… this is a great feature.", attribution: "Splunk Product Manager" },
  ],
  workflows: [
    { type: "paragraph", text: "My initial design used a gated stepper, but testing showed that program owners rarely had every Legal, Engineering, and content dependency ready when they began." },
    { type: "media", key: "old-stepper" },
    { type: "paragraph", text: "I changed the workflow strategy to support progress without sacrificing launch quality." },
    { type: "media", key: "workflow-video" },
    { type: "heading", level: 3, text: "Set expectations before work begins" },
    { type: "paragraph", text: "Upfront guidance summarizes the materials and dependencies users should prepare." }, { type: "media", key: "preparation" },
    { type: "heading", level: 3, text: "Provide contextual education" },
    { type: "paragraph", text: "Each major section explains its purpose, requirements, and effect on customers." }, { type: "media", key: "section-intro" },
    { type: "heading", level: 3, text: "Allow flexible navigation" },
    { type: "paragraph", text: "Users can work in the order their information becomes available; required fields are enforced at launch rather than every navigation point." }, { type: "media", key: "flexible-nav" },
    { type: "heading", level: 3, text: "Enable draft saving" },
    { type: "paragraph", text: "Research evidence helped secure agreement to restructure the database so unfinished programs could be saved." }, { type: "media", key: "draft" },
    { type: "heading", level: 3, text: "Why it mattered" },
    { type: "paragraph", text: "The final workflow accommodated external dependencies, let teams start earlier, reduced lost work and re-entry, made requirements visible, and preserved quality controls at launch." },
  ],
  scalability: [
    { type: "paragraph", text: "Modal windows and horizontal tabs restricted complex forms, consumed space, interrupted work, and became more crowded with every new capability." },
    { type: "media", key: "ui-constraints" },
    { type: "heading", level: 3, text: "A dedicated, full-page creation workflow" },
    { type: "paragraph", text: "The new layout created room for guidance, forms, tables, previews, and future sections while establishing predictable saving, reviewing, and launching patterns." },
    { type: "media", key: "scalable-video" },
    { type: "heading", level: 3, text: "Guided progress with flexible navigation" },
    { type: "paragraph", text: "A stepper clarified overall progress while collapsible vertical navigation supported additional and nested content without shrinking the workspace." },
    { type: "media", key: "stepper" },
    { type: "heading", level: 3, text: "Standardized interaction patterns" },
    { type: "paragraph", text: "Consistent actions for saving, continuing, reviewing, and launching made the system more predictable and easier to extend." },
    { type: "media", key: "patterns" },
    { type: "heading", level: 3, text: "Why it mattered" },
    { type: "paragraph", text: "The interaction model supported more complex content, scalable navigation, lower learning effort, fewer unintended exits, and reusable patterns for future VOC capabilities." },
  ],
};
