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
  const cookie = unlocked.headers.get("set-cookie") ?? "";
  assert.match(cookie, new RegExp(`^portfolio_access=[^;]+; Path=${path}; HttpOnly; Secure; SameSite=Lax$`));
  assert.doesNotMatch(cookie, /Max-Age|Expires/i);

  const stillLocked = await fetch(`${baseUrl}${paths[1]}`, { headers: { cookie: cookie.split(";", 1)[0] } });
  assert.equal(stillLocked.status, 401, "one case study cookie must not unlock another");

  const legacyCookie = "portfolio_access=2938fd14a53ef324b5d6a88b5d906558b6106f911816d9c56a0ccd12f5bd5dc6";
  const accessible = await fetch(`${baseUrl}${path}`, { headers: { cookie: `${cookie.split(";", 1)[0]}; ${legacyCookie}` } });
  assert.equal(accessible.status, 200, "an old site-wide cookie must not override valid case study access");
});
