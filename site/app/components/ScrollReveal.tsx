"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type ScrollRevealProps = { children: ReactNode; delay?: number; className?: string };

export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }
    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${className}`.trim()} data-component="ScrollReveal" data-reveal="true" style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
