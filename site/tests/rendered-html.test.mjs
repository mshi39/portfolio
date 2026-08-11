import assert from "node:assert/strict";
import test from "node:test";

async function readPng(fileUrl) {
  const { readFile } = await import("node:fs/promises");
  const { inflateSync } = await import("node:zlib");
  const bytes = await readFile(fileUrl);
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "expected a PNG signature");

  let offset = 8;
  let width;
  let height;
  let bitDepth;
  let colorType;
  let interlace;
  const data = [];
  while (offset < bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const type = bytes.subarray(offset + 4, offset + 8).toString("ascii");
    const chunk = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = chunk.readUInt32BE(0);
      height = chunk.readUInt32BE(4);
      bitDepth = chunk[8];
      colorType = chunk[9];
      interlace = chunk[12];
    }
    if (type === "IDAT") data.push(chunk);
    offset += length + 12;
  }

  assert.equal(bitDepth, 8, "transparent workflow validation expects an 8-bit PNG");
  assert.equal(interlace, 0, "transparent workflow validation expects a non-interlaced PNG");
  assert.ok(colorType === 4 || colorType === 6, "workflow PNG must use an alpha-capable color type");
  const channels = colorType === 4 ? 2 : 4;
  const stride = width * channels;
  const decoded = inflateSync(Buffer.concat(data));
  const pixels = Buffer.alloc(stride * height);
  let source = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = decoded[source++];
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const prior = y === 0 ? null : pixels.subarray((y - 1) * stride, y * stride);
    for (let x = 0; x < stride; x += 1) {
      const raw = decoded[source++];
      const left = x < channels ? 0 : row[x - channels];
      const above = prior?.[x] ?? 0;
      const upperLeft = x < channels ? 0 : prior?.[x - channels] ?? 0;
      const paeth = () => {
        const prediction = left + above - upperLeft;
        const leftDistance = Math.abs(prediction - left);
        const aboveDistance = Math.abs(prediction - above);
        const upperLeftDistance = Math.abs(prediction - upperLeft);
        return leftDistance <= aboveDistance && leftDistance <= upperLeftDistance ? left : aboveDistance <= upperLeftDistance ? above : upperLeft;
      };
      row[x] = (raw + (filter === 1 ? left : filter === 2 ? above : filter === 3 ? Math.floor((left + above) / 2) : filter === 4 ? paeth() : 0)) & 255;
    }
  }
  return { width, height, channels, pixels };
}

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
  assert.match(css, /\.feedback-chapter-nav a\[aria-current="location"\]\{[^}]*color:\s*var\(--purple-dark\)[^}]*\}/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)\{[\s\S]*?\.feedback-chapter-nav\{[^}]*display:\s*none[^}]*\}/);
});

test("feedback articles use h4 headings while the standalone Outcome remains h3", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const articles = [...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  assert.ok(articles.length > 0, "expected feedback article elements");
  let headingCount = 0;
  for (const article of articles) {
    const headings = [...article.matchAll(/<h([1-6])[^>]*>([^<]+)<\/h\1>/g)];
    headingCount += headings.length;
    assert.doesNotMatch(article, /<h3[ >]/);
    for (const [, level, text] of headings) assert.equal(level, "4", `expected ${text} to be an h4 inside its article`);
  }
  assert.ok(headingCount > 0, "expected feedback articles with headings");

  const workflowSection = html.match(/<section id="workflow-research"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(workflowSection, /<h3>Outcome<\/h3>/);
  assert.doesNotMatch(workflowSection.match(/<article\b[\s\S]*?<\/article>/g)?.join("") ?? "", /<h3>Outcome<\/h3>/);
});

test("feedback article h4 headings use the approved ink and size", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const feedbackGrids = ["comparison", "insights", "outcomes", "pipeline"];
  const articleH4Rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const articleH4Rule = articleH4Rules.find(([, selector]) =>
    selector.includes(".feedback-case-study article h4")
    || feedbackGrids.every((grid) => selector.includes(`.feedback-${grid}-grid article h4`)),
  )?.[2] ?? "";
  assert.ok(articleH4Rule, "expected a Feedback-scoped h4 rule that covers every article grid");
  assert.match(articleH4Rule, /color:\s*#17121d/);
  assert.match(articleH4Rule, /font-size:\s*20px/);
});

test("concept-validation quotes own their cite attribution without external speaker paragraphs", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const section = html.match(/<section id="concept-validation"[\s\S]*?<\/section>/)?.[0] ?? "";
  const quotes = [...section.matchAll(/<blockquote class="case-quote">([\s\S]*?)<\/blockquote>/g)];
  assert.equal(quotes.length, 2);
  for (const [, quote] of quotes) {
    assert.match(quote, /<footer><cite>â€“ Splunk Product Manager<\/cite><\/footer>/);
  }
  assert.equal((section.match(/Splunk Product Manager/g) ?? []).length, 2, "speaker attribution must appear only inside the two blockquotes");
  assert.doesNotMatch(section, /<\/blockquote>\s*<p>\s*â€“ Splunk Product Manager\s*<\/p>/);
});

test("desired workflow PNG preserves dimensions and transparent outer corners", async () => {
  const png = await readPng(new URL("../public/portfolio/feedback-intelligence-desired-workflow.png", import.meta.url));
  assert.equal(png.width, 1693);
  assert.equal(png.height, 929);
  const alphaOffset = png.channels - 1;
  for (const [x, y] of [[0, 0], [png.width - 1, 0], [0, png.height - 1], [png.width - 1, png.height - 1]]) {
    assert.equal(png.pixels[(y * png.width + x) * png.channels + alphaOffset], 0, `expected transparent corner at ${x},${y}`);
  }
  assert.ok(png.pixels.some((value, index) => index % png.channels === alphaOffset && value > 0), "expected the workflow artwork to retain visible pixels");
});

test("feedback chapter navigation is a connected rail with locally thickened interaction segments", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const railRule = css.match(/\.feedback-chapter-nav\{([^}]*)\}/)?.[1] ?? "";
  assert.match(railRule, /background:\s*transparent/);
  assert.match(railRule, /border:\s*0/);
  assert.match(railRule, /border-radius:\s*0/);
  assert.match(railRule, /box-shadow:\s*none/);
  assert.match(railRule, /backdrop-filter:\s*none/);
  assert.match(css, /\.feedback-chapter-nav::before\{[^}]*position:\s*absolute[^}]*top:\s*0[^}]*bottom:\s*0[^}]*width:\s*\d+(?:\.\d+)?px[^}]*background:\s*(?!transparent|none)[^;}]+[^}]*\}/);
  const baseSegment = css.match(/\.feedback-chapter-nav a::before\{[^}]*position:\s*absolute[^}]*width:\s*(\d+(?:\.\d+)?)(px)[^}]*background:\s*(?!transparent|none)[^;}]+[^}]*\}/);
  assert.ok(baseSegment, "expected every navigation link to have a visible local rail segment");
  for (const selector of [".feedback-chapter-nav a:hover::before", ".feedback-chapter-nav a:focus-visible::before", '.feedback-chapter-nav a[aria-current="location"]::before']) {
    const interactionSegment = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\{[^}]*width:\\s*(\\d+(?:\\.\\d+)?)(px)[^}]*\\}`));
    assert.ok(interactionSegment, `expected ${selector} to define a local rail segment width`);
    assert.equal(interactionSegment[2], baseSegment[2]);
    assert.ok(Number(interactionSegment[1]) > Number(baseSegment[1]), `expected ${selector} to thicken the local rail segment`);
  }
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
  const quotes = [...section.matchAll(/<blockquote class="case-quote">([\s\S]*?)<\/blockquote>/g)].map((match) => match[1]);
  assert.deepEqual(quotes.map((quote) => quote.match(/^([^<]+)/)?.[1]), [
    "“AI could interpret it one way and I could interpret it the other way.”",
    "“I really like the idea about insight center, we just wanna make sure that this is a single source of truth.”",
  ]);
  for (const quote of quotes) assert.match(quote, /<footer><cite>â€“ Splunk Product Manager<\/cite><\/footer>$/);
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
  assert.deepEqual(cards.map((card) => card.match(/<h4>([^<]+)<\/h4>/)?.[1]), [
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
    .find((match) => match[1].includes("<h4>Communicate Findings Efficiently</h4>"))?.[1] ?? "";
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

test("enterprise closing heading keeps white contrast on the purple closing panel", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const closingRule = css.match(/\.case-closing\{([^}]*)\}/)?.[1] ?? "";
  const closingHeadingRule = [...css.matchAll(/\.case-closing h3\{([^}]*)\}/g)].at(-1)?.[1] ?? "";

  assert.match(closingRule, /background:\s*var\(--purple\)/);
  assert.match(closingHeadingRule, /color:\s*#fff/);
});
