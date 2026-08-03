type Props = { eyebrow: string; title: string; description?: string };
export function SectionHeading({ eyebrow, title, description }: Props) { return <header className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="work-title">{title}</h2>{description && <p>{description}</p>}</header>; }
