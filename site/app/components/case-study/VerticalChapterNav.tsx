"use client";

import { useEffect, useState } from "react";

export type Chapter = { id: string; label: string };

export function VerticalChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const updateFromHash = () => {
      const id = window.location.hash.slice(1);
      if (chapters.some((chapter) => chapter.id === id)) setActiveId(id);
    };

    updateFromHash();
    const observer = new IntersectionObserver(
      (entries) => {
        const activeSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (activeSection) setActiveId(activeSection.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [chapters]);

  return (
    <nav className="vertical-chapter-nav" aria-label="Case study chapters" data-component="VerticalChapterNav">
      {chapters.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={activeId === id ? "location" : undefined}
          onClick={() => setActiveId(id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
