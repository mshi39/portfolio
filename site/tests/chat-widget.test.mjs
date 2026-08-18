import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return response.text();
}

test("shared layout loads one existing Vercel chat widget on every page", async () => {
  for (const route of ["/", "/about", "/work/resort-trip-planner"]) {
    const html = await render(route);

    assert.equal((html.match(/portfolio-ai-chat-widget/g) ?? []).length, 1, `${route} must load one chat widget`);
    assert.match(html, /portfolio-ai-chat-melissa\.vercel\.app\/widget\.js\?v=2/);
    assert.match(html, /data-api-base[^\n]+portfolio-ai-chat-melissa\.vercel\.app/);
    assert.doesNotMatch(html, /<iframe[^>]+portfolio-ai-chat-melissa/);
    assert.doesNotMatch(html, /data-component="PortfolioChatLauncher"/);
  }
});
