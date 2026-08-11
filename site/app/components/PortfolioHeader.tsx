"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function PortfolioHeader({ current = "work" }: { current?: "work" | "about" }) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const focused = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      const delta = nextY - lastY.current;
      if (nextY < 24 || focused.current) setVisible(true);
      else if (Math.abs(delta) >= 8) setVisible(delta < 0);
      lastY.current = nextY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header shell ${visible ? "header-visible" : "header-hidden"}`} data-component="PortfolioHeader" onFocus={() => { focused.current = true; setVisible(true); }} onBlur={() => { focused.current = false; }}>
      <Link className="brand" href="/" aria-label="Melissa Shi home"><Image unoptimized src="/portfolio/portfolio-logo.png" alt="" width={52} height={52} /><span>Melissa Shi</span></Link>
      <nav aria-label="Primary navigation">
        <Link className={`nav-link ${current === "work" ? "active" : ""}`} href="/#selected-work" aria-current={current === "work" ? "page" : undefined}>My Work</Link>
        <Link className={`nav-link ${current === "about" ? "active" : ""}`} href="/about" aria-current={current === "about" ? "page" : undefined}>About Me</Link>
      </nav>
    </header>
  );
}
