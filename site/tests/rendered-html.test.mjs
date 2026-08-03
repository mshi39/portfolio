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
    "thumbnail",
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
