const chapters = [
  ["background", "Context"], ["goals-methods", "Approach"], ["survey-findings", "Survey"],
  ["interviews", "Interviews"], ["key-insights", "Insights"], ["future-state", "Future state"],
  ["ai-attitudes", "AI attitudes"], ["recommendations", "Recommendations"], ["outcomes", "Outcomes"],
];
export function ChapterNav() { return <nav className="chapter-nav" aria-label="Case study chapters">{chapters.map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>; }
