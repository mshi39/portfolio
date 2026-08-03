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
  }
  for (const recommendation of ["Integrate Concierge into Slack and Webex", "Enable Integration with Cisco AI Assistant", "Reposition and Rebrand Concierge", "Improve Targeted Awareness"]) {
    assert.match(html, new RegExp(recommendation));
  }
});

test("case study renders all required local research figures", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  for (const figure of ["question-consolidation", "survey-analysis-1", "survey-analysis-2", "survey-analysis-3", "trusted-data", "ai-adversaries", "ai-light-users", "ai-power-users", "slack-webex-integration", "mcp-integration", "data-layer-positioning"]) {
    assert.match(html, new RegExp(`/portfolio/enterprise-search-${figure}\\.`));
  }
});

test("case study preserves key metrics and outcomes", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  for (const value of ["15%", "30%", "87%", "Customer Experience", "Slack indexing", "Slack/Webex integration", "2K+ users after release", "Introduced survey research practices"]) {
    assert.match(html, new RegExp(value.replace("+", "\\+"), "i"));
  }
});
