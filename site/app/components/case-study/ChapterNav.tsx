export type Chapter = { id: string; label: string };

export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  return (
    <nav className="chapter-nav" aria-label="Case study chapters">
      {chapters.map(({ id, label }) => (
        <a key={id} href={`#${id}`}>{label}</a>
      ))}
    </nav>
  );
}