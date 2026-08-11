import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { response, html: await response.text() };
}

test("server-renders Melissa's My Work page", async () => {
  const { response, html } = await render();
  assert.equal(response.status, 200);
  assert.match(html, /Melissa Shi/);
  assert.match(html, /Selected work/);
  assert.equal((html.match(/aria-label="View case study:/g) ?? []).length, 7);
  assert.match(html, /Product designer .* Design strategist/i);
});

test("home page uses final brand assets", async () => {
  const { html } = await render();
  assert.match(html, /portfolio-logo\.png/);
  assert.match(html, /melissa-hero\.png/);
});

test("enterprise search card uses final metadata and local route", async () => {
  const { html } = await render();
  assert.match(html, /Research: Value of Internal Enterprise Search in the Age of Generative AI/);
  assert.match(html, /September 2025 .* December 2025/);
  assert.match(html, /href="\/work\/enterprise-search-generative-ai"/);
});


test("feedback intelligence card links to the local case study", async () => {
  const { html } = await render("/");
  assert.match(html, /AI-Powered Customer Feedback Intelligence Platform/);
  assert.match(html, /April.*May 2026/);
  assert.match(html, /href="\/work\/ai-powered-feedback-intelligence-platform"/);
});

test("server-renders the dedicated About Me page", async () => {
  const { response, html } = await render("/about");
  assert.equal(response.status, 200);
  assert.match(html, /About Melissa/i);
  assert.match(html, /melissa-hero\.png/);
});

test("server-renders the complete enterprise search case study", async () => {
  const { response, html } = await render("/work/enterprise-search-generative-ai");
  assert.equal(response.status, 200);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  for (const anchor of ["background", "goals-methods", "survey-findings", "interviews", "key-insights", "future-state", "ai-attitudes", "recommendations", "outcomes"]) {
    assert.match(html, new RegExp(`id="${anchor}"`));
    assert.match(html, new RegExp(`href="#${anchor}"`));
  }
  for (const recommendation of ["Integrate Concierge into Slack and Webex", "Enable Integration with Cisco AI Assistant", "Reposition and Rebrand Concierge", "Improve Targeted Awareness"]) {
    assert.match(html, new RegExp(recommendation));
  }
});



test("shared case-study media renders semantic image markup", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  assert.match(
    html,
    /<figure class="case-media case-media-image">[\s\S]*?<img[^>]+enterprise-search-question-consolidation[^>]*>[\s\S]*?<figcaption>/,
  );
});
test("renders the complete feedback intelligence case study", async () => {
  const { response, html } = await render("/work/ai-powered-feedback-intelligence-platform");
  assert.equal(response.status, 200);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  for (const id of ["opportunity", "workflow-research", "product-architecture", "concept-validation", "feedback-pipeline", "trust-in-ai", "collaboration", "projected-impact", "demonstrated-skills"]) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }

  for (const phrase of [
    "Redefining an AI meeting concept into an end-to-end system that connects customer insights to product action",
    "Solo UX Designer",
    "35 pain points",
    "17 MVP requirements",
    "more than 20 hours per product-testing program",
    "approximately 3×",
    "How might we create a continuous system that captures customer feedback, turns it into trustworthy intelligence, and connects it to product action?",
    "AI supports synthesis and content generation, while users retain authority over interpretation, prioritization, and execution.",
  ]) {
    assert.match(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("case study renders all required local research figures", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  for (const figure of ["question-consolidation", "survey-analysis-1", "survey-analysis-2", "survey-analysis-3", "trusted-data", "ai-adversaries", "ai-light-users", "ai-power-users", "slack-webex-integration", "mcp-integration", "data-layer-positioning"]) {
    assert.match(html, new RegExp(`/portfolio/enterprise-search-${figure}\\.`));
  }
});


test("feedback intelligence case study renders all local media placements", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const placements = [
    "hero-insights",
    "workshop-map",
    "user-flow",
    "product-models",
    "prototype",
    "lower-barrier",
    "scheduling",
    "hero-insights",
    "source-verification",
    "central-feedback",
    "jira",
    "presentation",
    "customer-portal",
  ];

  for (const placement of placements) {
    assert.match(html, new RegExp(`/portfolio/feedback-intelligence-${placement}\\.`));
  }
  assert.equal((html.match(/\/portfolio\/feedback-intelligence-hero-insights\./g) ?? []).length, 2);

  const videos = html.match(/<video\b[^>]*>/gi) ?? [];
  assert.ok(videos.length > 0, "expected feedback intelligence media to include videos");
  for (const video of videos) {
    assert.match(video, /\bautoplay(?:\s|=|>)/i);
    assert.match(video, /\bloop(?:\s|=|>)/i);
    assert.match(video, /\bmuted(?:\s|=|>)/i);
    assert.match(video, /\bcontrols(?:\s|=|>)/i);
    assert.match(video, /\bplaysinline(?:\s|=|>)/i);
    assert.match(video, /\bpreload="metadata"/i);
  }
});

test("case study preserves key metrics and outcomes", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  for (const value of ["15%", "30%", "87%", "Customer Experience", "Slack indexing", "Slack/Webex integration", "2K+ users after release", "Introduced survey research practices"]) {
    assert.match(html, new RegExp(value.replace("+", "\\+"), "i"));
  }
});

test("feedback intelligence hero preserves source order without invented metadata", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const heroStart = html.indexOf('<header class="case-hero');
  const heroEnd = html.indexOf('class="chapter-nav"', heroStart);
  assert.ok(heroStart >= 0, "expected the visible case-study hero");
  const hero = html.slice(heroStart, heroEnd);
  const ordered = [
    "AI-Powered Customer Feedback Intelligence Platform",
    "Redefining an AI meeting concept into an end-to-end system that connects customer insights to product action",
    ">Overview<",
    ">Projected Impact<",
    ">My Role<",
    "Solo UX Designer",
    ">Timeline<",
    "April–May 2026",
    "feedback-intelligence-hero-insights",
  ];
  let cursor = -1;
  for (const value of ordered) {
    const next = hero.indexOf(value, cursor + 1);
    assert.ok(next > cursor, `expected ${value} after the prior hero content`);
    cursor = next;
  }
  assert.doesNotMatch(hero, />Project type</);
  assert.doesNotMatch(hero, />Context</);
});
test("case-study media and grid items can shrink below intrinsic media width", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const rule = (selector) => css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\{([^}]*)\\}`))?.[1] ?? "";
  for (const selector of [".case-media", ".case-media-frame", ".feedback-blocks"]) {
    assert.match(rule(selector), /min-width:\s*0/, `${selector} must allow intrinsic content to shrink`);
    assert.match(rule(selector), /max-width:\s*100%/, `${selector} must stay within its containing block`);
  }
  for (const selector of [".feedback-comparison-grid article", ".feedback-insights-grid article", ".feedback-outcomes-grid article", ".feedback-pipeline-grid article"]) {
    assert.match(rule(selector), /min-width:\s*0/, `${selector} must not impose an intrinsic grid minimum`);
  }
});
test("feedback intelligence images render their real intrinsic dimensions", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  for (const [name, width, height] of [
    ["workshop-map", 2871, 1381],
    ["user-flow", 3615, 443],
    ["product-models", 1721, 641],
  ]) {
    const image = html.match(new RegExp(`<img[^>]+feedback-intelligence-${name}[^>]*>`))?.[0] ?? "";
    assert.match(image, new RegExp(`width="${width}"`), `${name} must render its intrinsic width`);
    assert.match(image, new RegExp(`height="${height}"`), `${name} must render its intrinsic height`);
  }
});

test("feedback hero removes its thumbnail while retaining the hero video", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const heroStart = html.indexOf('<header class="case-hero');
  const heroEnd = html.indexOf('class="chapter-nav', heroStart);
  const hero = html.slice(heroStart, heroEnd);
  assert.ok(heroStart >= 0 && heroEnd > heroStart, "expected the visible case-study hero and chapter navigation");
  assert.doesNotMatch(hero, /feedback-intelligence-thumbnail/);
  assert.match(hero, /<video[^>]+feedback-intelligence-hero-insights[^>]*>/);
});

test("feedback intelligence uses the fixed desktop chapter rail and hides it on mobile", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const { readFile } = await import("node:fs/promises");
  const chapterNavSource = await readFile(new URL("../app/components/case-study/ChapterNav.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");

  assert.match(html, /<nav class="chapter-nav feedback-chapter-nav" aria-label="Case study chapters">/);
  assert.equal((html.match(/<nav class="chapter-nav feedback-chapter-nav"[\s\S]*?<\/nav>/)?.[0].match(/href="#/g) ?? []).length, 9);
  assert.match(html, /<a[^>]+href="#opportunity"[^>]+aria-current="location"/);
  assert.match(chapterNavSource, /["']use client["']/);
  assert.match(chapterNavSource, /IntersectionObserver/);
  assert.match(chapterNavSource, /aria-current=\{[^}]*\?\s*["']location["']/);
  const railRule = css.match(/\.feedback-chapter-nav\{([^}]*)\}/)?.[1] ?? "";
  assert.match(railRule, /position:\s*fixed/);
  assert.match(railRule, /left:\s*[^;]+/);
  assert.match(railRule, /top:\s*50%/);
  assert.match(railRule, /transform:\s*translateY\(-50%\)/);
  assert.match(railRule, /flex-direction:\s*column/);
  assert.match(css, /\.feedback-chapter-nav a\[aria-current="location"\]\{[^}]*color:\s*var\(--purple[^}]*\}/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)\{[\s\S]*?\.feedback-chapter-nav\{[^}]*display:\s*none[^}]*\}/);
});

test("feedback rail reserves a reading gutter across intermediate desktop widths", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const gutterRule = css.match(/@media\s*\(min-width:\s*901px\)\s*and\s*\(max-width:\s*1439px\)\{[\s\S]*?\.feedback-case-study \.case-shell\{([^}]*)\}/)?.[1] ?? "";

  assert.match(gutterRule, /width:\s*min\(1040px,calc\(100%\s*-\s*224px\)\)/);
  assert.match(gutterRule, /margin-left:\s*208px/);
  assert.match(gutterRule, /margin-right:\s*16px/);
  assert.match(gutterRule, /box-sizing:\s*border-box/);
  const railRight = 24 + 160;
  for (const viewport of [901, 1200, 1439]) {
    const shellLeft = 208;
    const shellWidth = Math.min(1040, viewport - 224);
    assert.ok(shellLeft > railRight, `expected a rail gap at ${viewport}px`);
    assert.ok(shellWidth >= 677, `expected a readable shell width at ${viewport}px`);
    assert.ok(shellLeft + shellWidth <= viewport, `expected the shell to stay in bounds at ${viewport}px`);
  }
});

test("enterprise search keeps the default horizontal sticky chapter navigation", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const defaultNavRule = css.match(/\.chapter-nav\{([^}]*)\}/)?.[1] ?? "";

  assert.match(html, /<nav class="chapter-nav" aria-label="Case study chapters">/);
  assert.doesNotMatch(html, /feedback-chapter-nav/);
  assert.match(defaultNavRule, /position:\s*sticky/);
  assert.match(defaultNavRule, /display:\s*flex/);
  assert.doesNotMatch(defaultNavRule, /flex-direction:\s*column/);
});

test("feedback section headings are unnumbered", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const sectionHeadings = [...html.matchAll(/<section[^>]*class="[^"]*case-section[^"]*"[\s\S]*?<h2>([^<]+)<\/h2>/g)].map((match) => match[1]);
  assert.equal(sectionHeadings.length, 9, "expected every feedback chapter to render an h2");
  for (const heading of sectionHeadings) assert.doesNotMatch(heading.trim(), /^\d+\.\s/);
});

test("workflow research keeps Outcome outside insight cards and preserves its revised narrative order", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const section = html.match(/<section id="workflow-research"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(section, /<h3>Outcome<\/h3>/);
  const insightArticles = section.match(/<article\b[^>]*>[\s\S]*?<\/article>/g) ?? [];
  for (const article of insightArticles) assert.doesNotMatch(article, /<h3>Outcome<\/h3>/);

  const ordered = [
    "<h3>Outcome</h3>",
    "The research showed that the real problem was not simply:",
    "How might we summarize customer meetings with AI?",
    "It was:",
    '<blockquote class="case-quote feedback-workflow-question">How might we create a continuous system that captures customer feedback, turns it into trustworthy intelligence, and connects it to product action?</blockquote>',
    "I synthesized the findings with the product manager and translated them into 17 MVP requirements.",
    "This established a user-driven foundation for the new capability rather than relying solely on the initial product concept.",
  ];
  let cursor = -1;
  for (const value of ordered) {
    const next = section.indexOf(value, cursor + 1);
    assert.ok(next > cursor, `expected ${value} after the prior workflow-research content`);
    cursor = next;
  }
});

test("concept validation uses semantic quotes and the local desired-workflow illustration", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const section = html.match(/<section id="concept-validation"[\s\S]*?<\/section>/)?.[0] ?? "";
  const quotes = [...section.matchAll(/<blockquote class="case-quote">([^<]+)<\/blockquote>/g)].map((match) => match[1]);
  assert.deepEqual(quotes, [
    "“AI could interpret it one way and I could interpret it the other way.”",
    "“I really like the idea about insight center, we just wanna make sure that this is a single source of truth.”",
  ]);
  assert.equal((section.match(/AI could interpret/g) ?? []).length, 1);
  assert.doesNotMatch(section, /truth\.[“"]AI/);
  assert.match(section, /<img[^>]+src="\/portfolio\/feedback-intelligence-desired-workflow\.png"[^>]+alt="[^"]+"[^>]+width="\d+"[^>]+height="\d+"[^>]*>/);
  assert.match(section, /<figcaption>[^<]*desired feedback workflow[^<]*<\/figcaption>/i);
});

test("trust copy replaces the duplicated collaborative-layer sentence", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  assert.match(html, /I incorporated several trust mechanisms into the concept that positioned AI as a collaborative layer within the workflow rather than an opaque decision-maker\./);
  assert.doesNotMatch(html, /These decisions positioned AI as a collaborative layer within the workflow rather than an opaque decision-maker\./);
});

test("end-to-end capabilities and final lists use their requested presentation classes", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const pipeline = html.match(/<section id="feedback-pipeline"[\s\S]*?<\/section>/)?.[0] ?? "";
  const cards = [...pipeline.matchAll(/<article class="recommendation-card">([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  assert.equal(cards.length, 7);
  assert.deepEqual(cards.map((card) => card.match(/<h3>([^<]+)<\/h3>/)?.[1]), [
    "Lower the Barrier to Capturing Feedback",
    "Handle Real-World Scheduling Complexity",
    "Automate Insight Extraction with AI",
    "Keep Humans in Control",
    "Centralize Feedback Across Channels",
    "Connect Insight to Execution",
    "Communicate Findings Efficiently",
  ]);
  assert.match(css, /\.feedback-pipeline-grid\{[^}]*display:\s*grid[^}]*\}/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)\{[\s\S]*?\.feedback-pipeline-grid\{[^}]*grid-template-columns:\s*1fr[^}]*\}/);
  for (const sectionId of ["projected-impact", "demonstrated-skills"]) {
    const section = html.match(new RegExp(`<section id="${sectionId}"[\\s\\S]*?<\\/section>`))?.[0] ?? "";
    assert.match(section, /<ul class="simple-list">/);
  }
  const simpleListRule = css.match(/\.simple-list\{([^}]*)\}/)?.[1] ?? "";
  const simpleListItemRule = css.match(/\.simple-list li\{([^}]*)\}/)?.[1] ?? "";
  assert.match(simpleListRule, /display:\s*block/);
  assert.match(simpleListRule, /list-style(?:-type)?:\s*(?:disc|initial)/);
  assert.match(simpleListItemRule, /background:\s*(?:none|transparent)/);
  assert.match(simpleListItemRule, /border:\s*0/);
  assert.match(simpleListItemRule, /border-radius:\s*0/);
});

test("end-to-end capability cards preserve media and prose source order", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const section = html.match(/<section id="feedback-pipeline"[\s\S]*?<\/section>/)?.[0] ?? "";
  const communicateCard = [...section.matchAll(/<article class="recommendation-card">([\s\S]*?)<\/article>/g)]
    .find((match) => match[1].includes("<h3>Communicate Findings Efficiently</h3>"))?.[1] ?? "";
  const ordered = [
    "To reduce this repeated work, I designed an AI-assisted presentation workflow.",
    "feedback-intelligence-presentation.mp4",
    "Leadership can also access a high-level view of customer themes, priorities, and resulting product work without reviewing individual meetings.",
  ];
  let cursor = -1;
  for (const value of ordered) {
    const next = communicateCard.indexOf(value, cursor + 1);
    assert.ok(next > cursor, `expected ${value} after the prior communicate-card content`);
    cursor = next;
  }
});

test("case-study captions and h3 headings have the approved spacing and accent color", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const captionRule = css.match(/\.case-media figcaption\{([^}]*)\}/)?.[1] ?? "";
  const marginValues = captionRule.match(/margin:\s*([^;]+);/)?.[1].trim().split(/\s+/) ?? [];
  const marginBottom = marginValues.length === 1
    ? marginValues[0]
    : marginValues.length === 2
      ? marginValues[0]
      : marginValues[2];
  assert.ok(
    /margin-bottom:\s*12px/.test(captionRule)
      || marginBottom === "12px",
    "case-media figcaptions must have a 12px bottom margin",
  );
  assert.match(css, /\.case-section h3\{[^}]*color:\s*var\(--purple\)[^}]*\}/);
});
