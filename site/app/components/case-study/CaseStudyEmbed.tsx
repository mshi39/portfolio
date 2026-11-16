type CaseStudyEmbedProps = {
  src: string;
  title: string;
  height: number;
  caption: string;
  actionHref: string;
  actionLabel: string;
};

export function CaseStudyEmbed({ src, title, height, caption, actionHref, actionLabel }: CaseStudyEmbedProps) {
  return <figure className="case-media case-media-embed" data-component="CaseStudyEmbed">
    <div className="case-media-frame">
      <iframe src={src} title={title} width="100%" height={height} loading="lazy" allow="clipboard-write" />
    </div>
    <figcaption>{caption}</figcaption>
    <a className="case-embed-action" href={actionHref} target="_blank" rel="noopener noreferrer">{actionLabel}</a>
  </figure>;
}
