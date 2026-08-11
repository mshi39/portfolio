type SectionIntroProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionIntro({ id, eyebrow, title, description }: SectionIntroProps) {
  return <header className="section-heading" data-component="SectionIntro"><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</header>;
}
