import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionLink({ href, children, variant = "primary" }: Props) {
  const external = href.startsWith("http");

  return (
    <a className={`button button-${variant}`} data-component="ActionLink" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}
