import Link from "next/link";

export function PortfolioNavToggle({ current = "work", surface = "pink" }: { current?: "work" | "about"; surface?: "pink" | "white" }) {
  return <nav className={`portfolio-nav-toggle portfolio-nav-toggle-${surface}`} data-component="PortfolioNavToggle" aria-label="Primary navigation">
    <Link className={`nav-link ${current === "work" ? "active" : ""}`} href="/#selected-work" aria-current={current === "work" ? "page" : undefined}>My Work</Link>
    <Link className={`nav-link ${current === "about" ? "active" : ""}`} href="/about" aria-current={current === "about" ? "page" : undefined}>About Me</Link>
  </nav>;
}
