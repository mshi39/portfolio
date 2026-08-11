import type { ReactNode } from "react";

type ContactCalloutProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  body: ReactNode;
  actions: ReactNode;
};

export function ContactCallout({ eyebrow, title, body, actions }: ContactCalloutProps) {
  return <section className="contact shell" data-component="ContactCallout" id="about-me" aria-labelledby="contact-title">
    <div className="contact-card"><span className="contact-sparkle" aria-hidden="true">✦</span><p className="eyebrow">{eyebrow}</p><h2 id="contact-title">{title}</h2><p>{body}</p><div className="contact-actions">{actions}</div></div>
  </section>;
}
