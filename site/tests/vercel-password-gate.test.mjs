import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL;

test("Vercel serves the password gate before protected case studies", { skip: !baseUrl }, async () => {
  const paths = [
    "/work/sales-assessment-platform-ai-integration",
    "/work/ai-powered-feedback-intelligence-platform",
    "/work/enterprise-search-generative-ai",
    "/work/voice-of-the-customer-admin-portal-revamp",
  ];
  for (const path of paths) {
    const locked = await fetch(`${baseUrl}${path}`);
    assert.equal(locked.status, 401, path);
    assert.match(await locked.text(), /Enter password to view this case study/);
  }

  const path = paths[0];
  const unlocked = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    body: new URLSearchParams({ password: "mxs@cc355" }),
    redirect: "manual",
  });
  assert.equal(unlocked.status, 303);
  assert.match(unlocked.headers.get("set-cookie") ?? "", /^portfolio_access=[^;]+; Path=\/; HttpOnly; Secure; SameSite=Lax$/);
});
