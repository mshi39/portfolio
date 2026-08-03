import Image from "next/image";

export function CaseStudyFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="case-figure"><div><Image unoptimized src={src} alt={alt} width={1500} height={900} /></div><figcaption>{caption}</figcaption></figure>;
}
