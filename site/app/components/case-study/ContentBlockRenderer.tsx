import { Fragment, type ReactNode } from "react";
import { CaseStudyQuote } from "./CaseStudyQuote";

export type ContentBlock<TMediaKey> =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string; variant?: "workflow-question" }
  | { type: "list"; items: string[] }
  | { type: "media"; key: TMediaKey };

type ContentBlockRendererProps<TMediaKey> = {
  blocks: ContentBlock<TMediaKey>[];
  renderMedia: (key: TMediaKey, index: number) => ReactNode;
  className?: string;
  listClassName?: string;
  renderList?: (items: string[], index: number) => ReactNode;
  articleHeadings?: boolean;
};

export function ContentBlockRenderer<TMediaKey>({
  blocks,
  renderMedia,
  className = "",
  listClassName,
  renderList,
  articleHeadings = false,
}: ContentBlockRendererProps<TMediaKey>) {
  return <div className={`feedback-blocks ${className}`.trim()} data-component="ContentBlockRenderer">{blocks.map((block, index) => {
    if (block.type === "media") return <Fragment key={index}>{renderMedia(block.key, index)}</Fragment>;
    if (block.type === "list") return <Fragment key={index}>{renderList ? renderList(block.items, index) : <ul className={listClassName}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}</Fragment>;
    if (block.type === "quote") return <CaseStudyQuote attribution={block.attribution} variant={block.variant} key={index}>{block.text}</CaseStudyQuote>;
    if (block.type === "heading") return block.level === 2
      ? <h2 key={index}>{block.text}</h2>
      : articleHeadings ? <h4 key={index}>{block.text}</h4> : <h3 key={index}>{block.text}</h3>;
    return <p key={index}>{block.text}</p>;
  })}</div>;
}
