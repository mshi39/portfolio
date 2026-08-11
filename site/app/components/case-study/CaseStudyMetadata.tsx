import type { ReactNode } from "react";

export type CaseStudyMetadataItem = {
  label: ReactNode;
  value: ReactNode;
};

export function CaseStudyMetadata({ items, className = "" }: { items: CaseStudyMetadataItem[]; className?: string }) {
  return <div className={`case-meta ${className}`.trim()} data-component="CaseStudyMetadata">{items.map((item, index) => (
    <div key={index}><span>{item.label}</span><strong>{item.value}</strong></div>
  ))}</div>;
}
