import type { Metadata } from "next";
import { catalog, type CatalogCategory } from "./catalog";
import "./component-library.css";

export const metadata: Metadata = {
  title: "Production component library — Melissa Shi",
  description: "An unlinked gallery of the production components used across Melissa Shi’s portfolio.",
};

const categories: Array<{ name: CatalogCategory; id: string }> = [
  { name: "Foundations", id: "foundations" },
  { name: "Navigation & actions", id: "navigation-actions" },
  { name: "Home", id: "home" },
  { name: "Case studies", id: "case-studies" },
  { name: "Utility", id: "utility" },
];

export default function ComponentLibraryPage() {
  return <main className="component-library-page">
    <header className="component-library-intro">
      <p className="eyebrow">Internal reference</p>
      <h1>Production component library</h1>
      <p>This unlinked gallery documents the exact components used across the portfolio and shows them with neutral sample content.</p>
    </header>

    <nav className="component-library-category-nav" aria-label="Component categories">
      {categories.map(({ name, id }) => <a href={`#${id}`} key={id}>{name}</a>)}
    </nav>

    {categories.map(({ name: category, id }) => <section className="component-library-category" id={id} aria-labelledby={`${id}-title`} key={id}>
      <div className="component-library-category-heading">
        <p className="eyebrow">Category</p>
        <h2 id={`${id}-title`}>{category}</h2>
      </div>
      <div className="component-library-grid">
        {catalog.filter((entry) => entry.category === category).map((entry) => <article className="component-library-entry" data-component-name={entry.name} data-component-description={entry.description} key={entry.name}>
          <header className="component-library-entry-heading">
            <h3>{entry.name}</h3>
            <p>{entry.description}</p>
          </header>
          <div className="component-library-preview" aria-label={`Preview of ${entry.name}`}>
            {entry.preview}
          </div>
        </article>)}
      </div>
    </section>)}
  </main>;
}
