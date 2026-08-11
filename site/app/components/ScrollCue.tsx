import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export function ScrollCue({ href, children }: Props) {
  return <a className="scroll-cue" data-component="ScrollCue" href={href}>{children} <span aria-hidden="true">↓</span></a>;
}
