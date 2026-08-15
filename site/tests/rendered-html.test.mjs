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

test("home composes production-backed library components", async () => {
  const { html } = await render("/");

  for (const name of [
    "PortfolioHero",
    "PortraitStage",
    "SectionIntro",
    "ProjectPreviewCard",
    "ContactCallout",
    "PortfolioFooter",
    "ScrollReveal",
  ]) {
    assert.match(html, new RegExp(`data-component="${name}"`), `expected ${name} to render on Home`);
  }

  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, "Home must have exactly one h1");
  const portrait = html.match(/<img[^>]+melissa-hero\.png[^>]*>/)?.[0] ?? "";
  assert.match(portrait, /width="1086"/);
  assert.match(portrait, /height="1448"/);
  for (const href of [
    "https://drive.google.com/file/d/1MeOyIEgyo-7H6YKICb3Wx_NCdbPeXLrx/view?usp=sharing",
    "https://www.linkedin.com/in/melissaxshi/",
    "https://medium.com/@shineew16",
  ]) assert.ok(html.includes(`href="${href}"`), `expected professional link: ${href}`);
  assert.match(html, /href="#selected-work"/);
  assert.equal((html.match(/aria-label="View case study:/g) ?? []).length, 7, "Home must keep every project preview");
  assert.match(html, /Curious about how I think and create\?/);
  assert.match(html, /Get to know the designer behind the work/);
  assert.match(html, /Designed with curiosity and a little purple magic\./);
});

test("home preserves the complete contact and footer copy contracts", async () => {
  const { html } = await render("/");
  const contact = html.match(/<section[^>]+data-component="ContactCallout"[\s\S]*?<\/section>/)?.[0] ?? "";
  const footer = html.match(/<footer[^>]+data-component="PortfolioFooter"[\s\S]*?<\/footer>/)?.[0] ?? "";

  assert.match(contact, /<p class="eyebrow">There&#x27;s more to the story<\/p>/);
  assert.match(contact, /<p>Get to know the designer behind the work\u2014or come say hello on LinkedIn\.<\/p>/);
  assert.deepEqual(
    [...contact.matchAll(/<a\b([^>]*)>([^<]+)<span aria-hidden="true">[^<]+<\/span><\/a>/g)].map(([, attributes, text]) => ({
      href: attributes.match(/\bhref="([^"]+)"/)?.[1] ?? "",
      text,
    })),
    [
      { href: "/about", text: "About me" },
      { href: "https://www.linkedin.com/in/melissaxshi/", text: "Let&#x27;s connect" },
    ],
  );
  assert.deepEqual(
    [...footer.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(([, text]) => text.replaceAll("<!-- -->", "")),
    ["Designed with curiosity and a little purple magic.", `\u00a9 ${new Date().getFullYear()} Melissa Shi`],
  );
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

test("VOC Admin Portal card links to its complete local case study", async () => {
  const { html: home } = await render("/");
  assert.match(home, /Voice of the Customer Admin Portal Revamp/);
  assert.match(home, /href="\/work\/voice-of-the-customer-admin-portal-revamp"/);

  const { response, html } = await render("/work/voice-of-the-customer-admin-portal-revamp");
  assert.equal(response.status, 200);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  for (const id of ["overview", "challenge", "scope", "architecture", "guardrails", "visibility", "workflows", "scalability", "collaboration", "results"]) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
  for (const phrase of ["24%", "2.9 to 4.4", "77.1", "84.2", "Lead Designer and Researcher"]) {
    assert.match(html, new RegExp(phrase.replace(".", "\\.")));
  }
  for (const phrase of ["Overview", "Impact", "more than 2,000 internal users", "Why it mattered", "What this project demonstrated"]) {
    assert.match(html, new RegExp(phrase, "i"));
  }
  for (const file of ["program-ecosystem.png", "old-program-flow.png", "architecture-option-1.png", "architecture-option-2.png", "architecture-option-3.png", "architecture-option-4.png", "new-program-flow.png", "old-all-at-once-setup.png", "program-type-decision-tree.png", "customer-preview.png", "old-sectional-setup.png", "old-locked-stepper.png", "expectations-walkthrough.mp4", "preparation-guidance.png", "section-introduction.png", "flexible-navigation.png", "save-draft.png", "old-ui-constraints.png", "scalable-design.mp4", "guided-stepper.png", "consistent-patterns.png"]) {
    assert.match(html, new RegExp(`/portfolio/voc-admin/${file.replace(".", "\\.")}`));
  }
  for (const video of html.match(/<video\b[^>]*>/gi) ?? []) {
    assert.match(video, /\bcontrols(?:\s|=|>)/i);
    assert.match(video, /\bplaysinline(?:\s|=|>)/i);
    assert.match(video, /\bpreload="metadata"/i);
  }
});

test("VOC case study uses the approved reusable content-card patterns", async () => {
  const { html } = await render("/work/voice-of-the-customer-admin-portal-revamp");
  const section = (id, nextId) => html.slice(html.indexOf(`<section id="${id}"`), nextId ? html.indexOf(`<section id="${nextId}"`) : html.length);
  const count = (markup, component) => (markup.match(new RegExp(`data-component="${component}"`, "g")) ?? []).length;

  assert.equal(count(section("challenge", "scope"), "InsightCard"), 4);
  assert.equal(count(section("challenge", "scope"), "WorkflowQuestion"), 1);
  assert.match(section("scope", "architecture"), /Design Principles/);
  assert.equal(count(section("architecture", "guardrails"), "InterimDesignCard"), 4);
  assert.equal(count(section("visibility", "workflows"), "RecommendationCard"), 2);
  assert.equal(count(section("workflows", "scalability"), "RecommendationCard"), 4);
  assert.equal(count(section("scalability", "collaboration"), "RecommendationCard"), 3);
  assert.equal(count(section("results"), "MetricCard"), 3);
  assert.match(section("results"), /“This visual snapshot is awesome/);
  assert.match(section("results"), /“Improved the feedback and bug-reporting experience/);
});

test("server-renders the dedicated About Me page", async () => {
  const { response, html } = await render("/about");
  assert.equal(response.status, 200);
  assert.match(html, /About Melissa/i);
  assert.match(html, /melissa-hero\.png/);
});

test("production shared chrome has stable component-library names", async () => {
  const { html: home } = await render("/");
  const { html: about } = await render("/about");

  assert.match(home, /<header[^>]+data-component="PortfolioHeader"/);
  assert.match(home, /<a(?=[^>]*class="brand")(?=[^>]*href="\/")(?=[^>]*aria-label="Melissa Shi home")[^>]*>.*?Melissa Shi/);
  assert.match(home, /<a[^>]+href="\/#selected-work"[^>]*>My Work<\/a>/);
  assert.match(home, /<a[^>]+href="\/about"[^>]*>About Me<\/a>/);
  assert.match(home, /<a[^>]+class="button button-primary"[^>]+data-component="ActionLink"/);
  assert.match(home, /<a[^>]+class="button button-secondary"[^>]+data-component="ActionLink"/);
  assert.match(about, /<footer[^>]+data-component="PortfolioFooter"/);
  assert.match(about, /Designed with curiosity and a little purple magic\./);
  assert.match(about, /©\s*(?:<!-- -->)?\s*\d{4}\s*(?:<!-- -->)?\s*Melissa Shi/);
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
    /<figure class="case-media case-media-image"[^>]*>[\s\S]*?<img[^>]+enterprise-search-question-consolidation[^>]*>[\s\S]*?<figcaption>/,
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
  const heroEnd = html.indexOf('class="vertical-chapter-nav"', heroStart);
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

test("feedback case study composes production-backed library components", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");

  for (const name of [
    "CaseStudyHero",
    "CaseStudyMetadata",
    "VerticalChapterNav",
    "ContentBlockRenderer",
    "InsightCard",
    "InsightGrid",
    "RecommendationCard",
    "RecommendationList",
    "CaseStudyQuote",
    "SimpleContentList",
    "PortfolioFooter",
  ]) {
    assert.match(html, new RegExp(`data-component="${name}"`), `expected ${name} to render on Feedback`);
  }

  const count = (name) => (html.match(new RegExp(`data-component="${name}"`, "g")) ?? []).length;
  assert.equal(count("CaseStudyHero"), 1);
  assert.equal(count("CaseStudyMetadata"), 1);
  assert.equal(count("VerticalChapterNav"), 1);
  assert.equal(count("SimpleContentList"), 2);
  assert.equal(count("CaseStudyQuote"), 3, "expected two validation quotes plus the workflow question");
  assert.equal(count("RecommendationCard"), 8, "expected seven primary recommendations plus the customer card");
  const cardClasses = [...html.matchAll(/<article class="([^"]+)" data-component="RecommendationCard">/g)].map((match) => match[1]);
  assert.equal(cardClasses.filter((className) => className === "recommendation-card").length, 7);
  assert.equal(cardClasses.filter((className) => className === "recommendation-card feedback-customer-card").length, 1);
});

test("self-contained case study cards match production", async () => {
  const { readFile } = await import("node:fs/promises");
  const [{ html: gallery }, { html: feedback }, css, galleryCss] = await Promise.all([
    render("/component-library"),
    render("/work/ai-powered-feedback-intelligence-platform"),
    readFile(new URL("../app/case-study.css", import.meta.url), "utf8"),
    readFile(new URL("../app/component-library/component-library.css", import.meta.url), "utf8"),
  ]);
  const escapeSelector = (selector) => selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rule = (selector) => css.match(new RegExp(`(?:^|})\\s*${escapeSelector(selector)}\\{([^}]*)\\}`))?.[1] ?? "";
  const mediaRule = (query, selector) => {
    const starts = [...css.matchAll(new RegExp(`@media\\s*\\(${query}\\)\\{`, "g"))];
    for (const start of starts) {
      let depth = 1;
      let cursor = start.index + start[0].length;
      while (depth > 0 && cursor < css.length) {
        if (css[cursor] === "{") depth += 1;
        if (css[cursor] === "}") depth -= 1;
        cursor += 1;
      }
      const body = css.slice(start.index + start[0].length, cursor - 1);
      const declaration = body.match(new RegExp(`(?:^|})\\s*${escapeSelector(selector)}\\{([^}]*)\\}`))?.[1];
      if (declaration) return declaration;
    }
    return "";
  };
  const assertDeclarations = (selector, declarations) => {
    const body = rule(selector);
    assert.ok(body, `expected a standalone ${selector} rule`);
    for (const declaration of declarations) assert.match(body, declaration, `expected ${selector} to own ${declaration}`);
  };

  const insightPreview = gallery.match(/<article[^>]+data-component-name="InsightCard"[\s\S]*?<\/article>/)?.[0] ?? "";
  const recommendationPreview = gallery.match(/<article[^>]+data-component-name="RecommendationCard"[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.match(insightPreview, /<article class="insight-card" data-component="InsightCard">/);
  assert.match(recommendationPreview, /<article class="recommendation-card" data-component="RecommendationCard">/);
  assert.doesNotMatch(recommendationPreview, /<figure\b|<img\b|<video\b/, "standalone RecommendationCard preview must stay text-only");
  assert.match(feedback, /<div class="feedback-comparison-grid" data-component="InsightGrid"><article class="insight-card insight-card-highlighted" data-component="InsightCard">/);
  const insightGridStarts = [...feedback.matchAll(/<div class="feedback-(?:comparison|insights|outcomes)-grid" data-component="InsightGrid">/g)];
  const comparisonStart = insightGridStarts.find((match) => match[0].includes("feedback-comparison-grid"))?.index ?? -1;
  const comparisonEnd = insightGridStarts.find((match) => (match.index ?? -1) > comparisonStart)?.index ?? feedback.length;
  const comparisonGrid = comparisonStart >= 0 ? feedback.slice(comparisonStart, comparisonEnd) : "";
  const insightCardClasses = [...comparisonGrid.matchAll(/<article class="(insight-card(?: insight-card-highlighted)?)" data-component="InsightCard">/g)]
    .map((match) => match[1]);
  assert.ok(insightCardClasses.length > 1, "expected multiple comparison insight cards");
  assert.equal(insightCardClasses[0], "insight-card insight-card-highlighted", "the first comparison card must be highlighted");
  assert.deepEqual(insightCardClasses.slice(1), Array(insightCardClasses.length - 1).fill("insight-card"), "no later comparison card may be highlighted");
  assert.equal((feedback.match(/data-component="RecommendationCard"/g) ?? []).length, 8);
  assert.match(feedback, /<article class="recommendation-card" data-component="RecommendationCard">/);
  assert.match(feedback, /<article class="recommendation-card feedback-customer-card" data-component="RecommendationCard">/);

  assertDeclarations(".insight-card", [
    /min-width:\s*0/,
    /padding:\s*26px/,
    /background:\s*#fff/,
    /border:\s*1px solid var\(--line\)/,
    /border-radius:\s*26px/,
    /box-shadow:\s*var\(--shadow\)/,
  ]);
  assertDeclarations(".insight-card-highlighted", [
    /background:\s*var\(--pink\)/,
    /border:\s*2px solid var\(--purple\)/,
  ]);
  assertDeclarations(".insight-card h4", [
    /margin:\s*0 0 12px/,
    /color:\s*#17121d/,
    /font-family:\s*"Fredoka",sans-serif/,
    /font-size:\s*20px/,
    /line-height:\s*1\.35/,
  ]);
  assertDeclarations(".insight-card p", [
    /max-width:\s*790px/,
    /margin:\s*0 0 22px/,
    /color:\s*var\(--muted\)/,
    /font-size:\s*1rem/,
    /line-height:\s*1\.78/,
  ]);

  assertDeclarations(".recommendation-card", [
    /display:\s*grid/,
    /min-width:\s*0/,
    /grid-template-columns:\s*48px minmax\(0,\.75fr\) minmax\(0,1\.25fr\)/,
    /gap:\s*20px/,
    /align-items:\s*start/,
    /padding:\s*28px/,
    /background:\s*#fff/,
    /border:\s*1px solid var\(--line\)/,
    /border-radius:\s*30px/,
    /box-shadow:\s*var\(--shadow\)/,
  ]);
  assertDeclarations(".recommendation-card>span", [/color:\s*var\(--purple-dark\)/, /font-weight:\s*900/]);
  assertDeclarations(".recommendation-card>.feedback-blocks", [/grid-column:\s*2/]);
  assertDeclarations(".recommendation-card>.case-media", [/grid-column:\s*3/, /margin:\s*0/]);
  assertDeclarations(".recommendation-card>.case-media~.feedback-blocks", [/grid-column:\s*2\/-1/]);
  assertDeclarations(".recommendation-card h4", [
    /margin:\s*0 0 12px/,
    /color:\s*#17121d/,
    /font-family:\s*"Fredoka",sans-serif/,
    /font-size:\s*20px/,
    /line-height:\s*1\.35/,
  ]);
  assertDeclarations(".recommendation-card p", [
    /max-width:\s*790px/,
    /margin:\s*0 0 22px/,
    /color:\s*var\(--muted\)/,
    /font-size:\s*1\.08rem/,
    /line-height:\s*1\.78/,
  ]);

  assert.match(rule(".feedback-comparison-grid"), /grid-template-columns:\s*repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(rule(".feedback-insights-grid"), /grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(rule(".feedback-outcomes-grid"), /grid-template-columns:\s*repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(rule(".feedback-pipeline-grid"), /grid-template-columns:\s*1fr/);
  assert.match(rule(".feedback-pipeline-grid"), /gap:\s*30px/);
  assert.match(mediaRule("max-width:\\s*900px", ".recommendation-card"), /grid-template-columns:\s*40px 1fr/);
  assert.match(mediaRule("max-width:\\s*900px", ".recommendation-card>.case-media"), /grid-column:\s*2/);
  assert.match(mediaRule("max-width:\\s*600px", ".insight-card"), /padding:\s*22px/);
  assert.match(mediaRule("max-width:\\s*600px", ".recommendation-card"), /padding:\s*24px/);
  assert.match(mediaRule("max-width:\\s*600px", ".recommendation-card>.case-media"), /grid-column:\s*1\/-1/);

  const ancestralCardSelectors = [...css.matchAll(/([^{}]+)\{[^{}]*\}/g)]
    .map((match) => match[1].trim())
    .filter((selector) => selector.includes(".feedback-case-study") && /\.(?:insight|recommendation)-card\b/.test(selector));
  assert.deepEqual(ancestralCardSelectors, [], "core card rules must not require Feedback page ancestry");
  assert.doesNotMatch(galleryCss, /\.component-library[^{}]*\.(?:insight|recommendation)-card\b/, "gallery wrappers must not restyle production cards");
});

test("case-study media and grid items can shrink below intrinsic media width", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const rule = (selector) => css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\{([^}]*)\\}`))?.[1] ?? "";
  for (const selector of [".case-media", ".case-media-frame", ".feedback-blocks"]) {
    assert.match(rule(selector), /min-width:\s*0/, `${selector} must allow intrinsic content to shrink`);
    assert.match(rule(selector), /max-width:\s*100%/, `${selector} must stay within its containing block`);
  }
  for (const selector of [".insight-card", ".recommendation-card"]) {
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
  const heroEnd = html.indexOf('class="vertical-chapter-nav', heroStart);
  const hero = html.slice(heroStart, heroEnd);
  assert.ok(heroStart >= 0 && heroEnd > heroStart, "expected the visible case-study hero and chapter navigation");
  assert.doesNotMatch(hero, /feedback-intelligence-thumbnail/);
  assert.match(hero, /<video[^>]+feedback-intelligence-hero-insights[^>]*>/);
});

test("both case studies render one fixed vertical chapter navigation with their own chapters", async () => {
  const { readFile } = await import("node:fs/promises");
  const chapterNavSource = await readFile(new URL("../app/components/case-study/VerticalChapterNav.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");

  const routeChapters = [
    ["/work/ai-powered-feedback-intelligence-platform", ["opportunity", "workflow-research", "product-architecture", "concept-validation", "feedback-pipeline", "trust-in-ai", "collaboration", "projected-impact", "demonstrated-skills"]],
    ["/work/enterprise-search-generative-ai", ["background", "goals-methods", "survey-findings", "interviews", "key-insights", "future-state", "ai-attitudes", "recommendations", "outcomes"]],
  ];
  for (const [route, expectedChapters] of routeChapters) {
    const { html } = await render(route);
    const navs = html.match(/<nav class="vertical-chapter-nav" aria-label="Case study chapters" data-component="VerticalChapterNav">[\s\S]*?<\/nav>/g) ?? [];
    assert.equal(navs.length, 1, `expected exactly one VerticalChapterNav on ${route}`);
    const links = [...navs[0].matchAll(/<a[^>]+href="#([^"]+)"[^>]*>/g)].map((match) => match[1]);
    assert.deepEqual(links, expectedChapters, `expected ${route} chapter links in source order`);
    assert.match(navs[0], new RegExp(`<a[^>]+href="#${expectedChapters[0]}"[^>]+aria-current="location"`));
    assert.equal((navs[0].match(/aria-current="location"/g) ?? []).length, 1);
    assert.doesNotMatch(navs[0], /data-component="(?:ChapterRail|ChapterNav)"|class="(?:chapter-nav|feedback-chapter-nav)"/);
  }
  assert.match(chapterNavSource, /["']use client["']/);
  assert.match(chapterNavSource, /IntersectionObserver/);
  assert.match(chapterNavSource, /aria-current=\{[^}]*\?\s*["']location["']/);
  const railRule = css.match(/\.vertical-chapter-nav\{([^}]*)\}/)?.[1] ?? "";
  assert.match(railRule, /position:\s*fixed/);
  assert.match(railRule, /left:\s*[^;]+/);
  assert.match(railRule, /top:\s*50%/);
  assert.match(railRule, /transform:\s*translateY\(-50%\)/);
  assert.match(railRule, /flex-direction:\s*column/);
  assert.match(css, /\.vertical-chapter-nav a\[aria-current="location"\]\{[^}]*color:\s*var\(--purple-dark\)[^}]*\}/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)\{[\s\S]*?\.vertical-chapter-nav\{[^}]*display:\s*none[^}]*\}/);
});

test("retired chapter navigation module and export names are absent", async () => {
  const { access } = await import("node:fs/promises");
  await assert.rejects(
    access(new URL("../app/components/case-study/ChapterNav.tsx", import.meta.url)),
    (error) => error?.code === "ENOENT",
  );

  const { tsImport } = await import("tsx/esm/api");
  const navigationModule = await tsImport("../app/components/case-study/VerticalChapterNav.tsx", import.meta.url);
  assert.deepEqual(Object.keys(navigationModule).sort(), ["VerticalChapterNav"]);
  assert.equal("ChapterRail" in navigationModule, false);
  assert.equal("ChapterNav" in navigationModule, false);
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

test("case-study card h4 headings use the approved production typography", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  for (const selector of [".insight-card h4", ".recommendation-card h4"]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const cardH4Rule = css.match(new RegExp(`(?:^|})\\s*${escaped}\\{([^}]*)\\}`))?.[1] ?? "";
    assert.ok(cardH4Rule, `expected ${selector} to own its typography`);
    assert.match(cardH4Rule, /color:\s*#17121d/);
    assert.match(cardH4Rule, /font-family:\s*"Fredoka",sans-serif/);
    assert.match(cardH4Rule, /font-size:\s*20px/);
    assert.match(cardH4Rule, /line-height:\s*1\.35/);
  }
});

test("concept-validation quotes own their cite attribution without external speaker paragraphs", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const section = html.match(/<section id="concept-validation"[\s\S]*?<\/section>/)?.[0] ?? "";
  const quotes = [...section.matchAll(/<blockquote class="case-quote"[^>]*>([\s\S]*?)<\/blockquote>/g)];
  assert.equal(quotes.length, 2);
  for (const [, quote] of quotes) {
    assert.match(quote, /<footer><cite>– Splunk Product Manager<\/cite><\/footer>/);
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

test("vertical chapter navigation is a connected rail with locally thickened interaction segments", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const railRule = css.match(/\.vertical-chapter-nav\{([^}]*)\}/)?.[1] ?? "";
  assert.match(railRule, /background:\s*transparent/);
  assert.match(railRule, /border:\s*0/);
  assert.match(railRule, /border-radius:\s*0/);
  assert.match(railRule, /box-shadow:\s*none/);
  assert.match(railRule, /backdrop-filter:\s*none/);
  assert.match(css, /\.vertical-chapter-nav::before\{[^}]*position:\s*absolute[^}]*top:\s*0[^}]*bottom:\s*0[^}]*width:\s*\d+(?:\.\d+)?px[^}]*background:\s*(?!transparent|none)[^;}]+[^}]*\}/);
  const baseSegment = css.match(/\.vertical-chapter-nav a::before\{[^}]*position:\s*absolute[^}]*width:\s*(\d+(?:\.\d+)?)(px)[^}]*background:\s*(?!transparent|none)[^;}]+[^}]*\}/);
  assert.ok(baseSegment, "expected every navigation link to have a visible local rail segment");
  for (const selector of [".vertical-chapter-nav a:hover::before", ".vertical-chapter-nav a:focus-visible::before", '.vertical-chapter-nav a[aria-current="location"]::before']) {
    const interactionSegment = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\{[^}]*width:\\s*(\\d+(?:\\.\\d+)?)(px)[^}]*\\}`));
    assert.ok(interactionSegment, `expected ${selector} to define a local rail segment width`);
    assert.equal(interactionSegment[2], baseSegment[2]);
    assert.ok(Number(interactionSegment[1]) > Number(baseSegment[1]), `expected ${selector} to thicken the local rail segment`);
  }
});

test("both case studies reserve a reading gutter beside the vertical navigation", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const gutterRule = css.match(/@media\s*\(min-width:\s*901px\)\s*and\s*\(max-width:\s*1439px\)\{[\s\S]*?\.case-study \.case-shell\{([^}]*)\}/)?.[1] ?? "";

  assert.match(gutterRule, /width:\s*min\(1040px,calc\(100%\s*-\s*224px\)\)/);
  assert.match(gutterRule, /margin-left:\s*208px/);
  assert.match(gutterRule, /margin-right:\s*16px/);
  assert.match(gutterRule, /box-sizing:\s*border-box/);
  const railRight = 24 + 160;
  for (const viewport of [901, 1200, 1600]) {
    const shellLeft = viewport >= 1440 ? (viewport - 1040) / 2 : 208;
    const shellWidth = viewport >= 1440 ? 1040 : Math.min(1040, viewport - 224);
    assert.ok(shellLeft > railRight, `expected a rail gap at ${viewport}px`);
    assert.ok(shellWidth >= 677, `expected a readable shell width at ${viewport}px`);
    assert.ok(shellLeft + shellWidth <= viewport, `expected the shell to stay in bounds at ${viewport}px`);
  }
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
    '<blockquote class="case-quote feedback-workflow-question" data-component="CaseStudyQuote">How might we create a continuous system that captures customer feedback, turns it into trustworthy intelligence, and connects it to product action?</blockquote>',
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
  const quotes = [...section.matchAll(/<blockquote class="case-quote"[^>]*>([\s\S]*?)<\/blockquote>/g)].map((match) => match[1]);
  assert.deepEqual(quotes.map((quote) => quote.match(/^([^<]+)/)?.[1]), [
    "“AI could interpret it one way and I could interpret it the other way.”",
    "“I really like the idea about insight center, we just wanna make sure that this is a single source of truth.”",
  ]);
  for (const quote of quotes) assert.match(quote, /<footer><cite>– Splunk Product Manager<\/cite><\/footer>$/);
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
  const cards = [...pipeline.matchAll(/<article class="recommendation-card"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
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
    assert.match(section, /<ul class="simple-list"[^>]*>/);
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
  const communicateCard = [...section.matchAll(/<article class="recommendation-card"[^>]*>([\s\S]*?)<\/article>/g)]
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

test("ContentBlockRenderer forwards heading IDs to each rendered heading level", async () => {
  const previousNoDeprecation = process.noDeprecation;
  process.noDeprecation = true;
  try {
    const [{ createElement }, { renderToStaticMarkup }, { tsImport }] = await Promise.all([
      import("react"),
      import("react-dom/server"),
      import("tsx/esm/api"),
    ]);
    const { ContentBlockRenderer } = await tsImport(
      "../app/components/case-study/ContentBlockRenderer.tsx",
      import.meta.url,
    );
    const renderHeadings = (articleHeadings) => renderToStaticMarkup(createElement(ContentBlockRenderer, {
      articleHeadings,
      blocks: [
        { type: "heading", level: 2, id: "section-heading", text: "Section heading" },
        { type: "heading", level: 3, id: "detail-heading", text: "Detail heading" },
      ],
      renderMedia: () => null,
    }));

    assert.match(renderHeadings(false), /<h2 id="section-heading">Section heading<\/h2>/);
    assert.match(renderHeadings(false), /<h3 id="detail-heading">Detail heading<\/h3>/);
    assert.match(renderHeadings(true), /<h4 id="detail-heading">Detail heading<\/h4>/);
  } finally {
    process.noDeprecation = previousNoDeprecation;
  }
});

test("workflow question, quotes, and media frames use approved styling", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");

  assert.match(css, /\.feedback-workflow-question\{[^}]*background:\s*var\(--purple-dark\)/s);
  assert.match(css, /\.case-quote\{[^}]*font-style:\s*italic/s);
  assert.match(css, /\.case-media-frame\{[^}]*padding:\s*0(?:px)?(?:;|})/s);
});

test("component library documents each production component once", async () => {
  const { response, html } = await render("/component-library");
  assert.equal(response.status, 200);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, "component library must have exactly one h1");

  const categories = ["foundations", "navigation-actions", "home", "case-studies", "utility"];
  for (const id of categories) {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"`), `expected ${id} category section`);
    assert.match(html, new RegExp(`<a[^>]+href="#${id}"`), `expected ${id} category link`);
  }

  const requiredNames = [
    "PortfolioHeader",
    "ActionLink",
    "VerticalChapterNav",
    "ScrollCue",
    "PortfolioHero",
    "PortraitStage",
    "SectionIntro",
    "ProjectPreviewCard",
    "ContactCallout",
    "PortfolioFooter",
    "ScrollReveal",
    "CaseStudyHero",
    "CaseStudyMetadata",
    "CaseStudySection",
    "CaseStudyMedia",
    "CaseStudyQuote",
    "WorkflowQuestion",
    "ContentBlockRenderer",
    "InsightCard",
    "InsightGrid",
    "RecommendationCard",
    "RecommendationList",
    "SimpleContentList",
    "Tag",
  ];
  const names = [...html.matchAll(/data-component-name="([^"]+)"/g)].map((match) => match[1]);
  const descriptions = [...html.matchAll(/data-component-description="(Use when [^"]+)"/g)].map((match) => match[1]);
  assert.ok(names.length >= 27, `expected at least 27 catalog entries, received ${names.length}`);
  assert.equal(new Set(names).size, names.length, "component catalog names must be unique");
  assert.equal(descriptions.length, names.length, "every catalog entry needs one Use when description");
  for (const name of requiredNames) assert.equal(names.filter((candidate) => candidate === name).length, 1, `expected ${name} exactly once`);
});

test("component library renders production identities and semantic previews", async () => {
  const { html } = await render("/component-library");
  const productionNames = [
    "PortfolioHeader", "ActionLink", "VerticalChapterNav", "ScrollCue", "PortfolioHero", "PortraitStage",
    "SectionIntro", "ProjectPreviewCard", "ContactCallout", "PortfolioFooter", "ScrollReveal",
    "CaseStudyHero", "CaseStudyMetadata", "CaseStudySection", "CaseStudyMedia", "CaseStudyQuote",
    "WorkflowQuestion", "ContentBlockRenderer", "InsightCard", "InsightGrid", "RecommendationCard",
    "RecommendationList", "SimpleContentList", "Tag",
  ];
  for (const name of productionNames) {
    const article = html.match(new RegExp(`<article[^>]+data-component-name="${name}"[\\s\\S]*?<\\/article>`))?.[0] ?? "";
    assert.match(article, new RegExp(`data-component="${name}"`), `expected ${name} production identity in its preview`);
  }

  assert.match(html, /<nav[^>]+aria-label="Component categories"[\s\S]*?Foundations[\s\S]*?Navigation &amp; actions[\s\S]*?Home[\s\S]*?Case studies[\s\S]*?Utility[\s\S]*?<\/nav>/);
  const mediaArticle = html.match(/<article[^>]+data-component-name="CaseStudyMedia"[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.match(mediaArticle, /<figure[^>]*>[\s\S]*?<figcaption>[^<]+<\/figcaption>[\s\S]*?<\/figure>/);
  assert.match(mediaArticle, /<img[^>]+alt="[^"]+"[^>]*>/);
  const video = mediaArticle.match(/<video\b[^>]*>/i)?.[0] ?? "";
  for (const attribute of ["autoplay", "loop", "muted", "controls", "playsinline"]) assert.match(video, new RegExp(`\\b${attribute}(?:\\s|=|>)`, "i"));
  assert.match(video, /\bpreload="metadata"/i);
  assert.match(mediaArticle, /Your browser does not support this video\./);
  assert.match(html, /<blockquote[^>]+data-component="CaseStudyQuote"[\s\S]*?<footer><cite>[^<]+<\/cite><\/footer>[\s\S]*?<\/blockquote>/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, "gallery previews must not add an h1");
});

test("Feedback CaseStudyHero renders canonical HeroOverview panels in content order", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  const heroStart = html.indexOf('<header class="case-hero case-shell feedback-hero" data-component="CaseStudyHero">');
  const heroEnd = html.indexOf('class="vertical-chapter-nav"', heroStart);
  const hero = html.slice(heroStart, heroEnd);

  assert.ok(heroStart >= 0, "expected Feedback to render CaseStudyHero");
  assert.equal((hero.match(/data-component="HeroOverview"/g) ?? []).length, 1, "Feedback must render exactly one HeroOverview");
  assert.match(hero, /<div class="feedback-hero-overview" data-component="HeroOverview">/);

  const overviewStart = hero.indexOf('<div class="feedback-hero-overview" data-component="HeroOverview">');
  const overviewEnd = hero.indexOf('<div class="case-meta', overviewStart);
  const overview = hero.slice(overviewStart, overviewEnd);
  const orderedContent = [
    "<h2>Overview</h2>",
    "Voice of the Customer (VOC) enables product teams to collect and analyze feedback",
    "This project expanded VOC into an end-to-end feedback intelligence platform",
    "<h2>Projected Impact</h2>",
    "Save product managers more than 20 hours per testing program",
    "Increase captured customer feedback by approximately 3×",
    "Connect feedback directly to prioritization, Jira execution, and outcome tracking",
  ];
  let cursor = -1;
  for (const value of orderedContent) {
    const next = overview.indexOf(value, cursor + 1);
    assert.ok(next > cursor, `expected ${value} after the prior HeroOverview content`);
    cursor = next;
  }
  assert.equal((overview.match(/<h2>/g) ?? []).length, 2, "HeroOverview must contain exactly two ordered panels");
});

test("gallery documents HeroOverview and MetricCard production identities", async () => {
  const [{ html: gallery }, { html: feedback }, { html: enterprise }] = await Promise.all([
    render("/component-library"),
    render("/work/ai-powered-feedback-intelligence-platform"),
    render("/work/enterprise-search-generative-ai"),
  ]);
  const names = [...gallery.matchAll(/data-component-name="([^"]+)"/g)].map((match) => match[1]);
  for (const name of ["HeroOverview", "MetricCard"]) {
    assert.equal(names.filter((candidate) => candidate === name).length, 1, `expected one unique ${name} catalog entry`);
  }

  const heroOverviewEntry = gallery.match(/<article[^>]+data-component-name="HeroOverview"[\s\S]*?<\/article>/)?.[0] ?? "";
  const caseStudyHeroEntry = gallery.match(/<article[^>]+data-component-name="CaseStudyHero"[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.match(heroOverviewEntry, /<div class="feedback-hero-overview" data-component="HeroOverview">/);
  assert.match(caseStudyHeroEntry, /<div class="feedback-hero-overview" data-component="HeroOverview">/);
  assert.match(feedback, /<div class="feedback-hero-overview" data-component="HeroOverview">/);

  const metricCardEntry = gallery.match(/<article[^>]+data-component-name="MetricCard"[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.match(metricCardEntry, /<article class="metric-card" data-component="MetricCard">/);
  assert.equal((enterprise.match(/<article class="metric-card" data-component="MetricCard">/g) ?? []).length, 4);
});

test("gallery CaseStudyHero containment preserves HeroOverview heading styles", async () => {
  const { readFile } = await import("node:fs/promises");
  const [{ html }, galleryCss, caseStudyCss] = await Promise.all([
    render("/component-library"),
    readFile(new URL("../app/component-library/component-library.css", import.meta.url), "utf8"),
    readFile(new URL("../app/case-study.css", import.meta.url), "utf8"),
  ]);
  const caseStudyHeroEntry = html.match(/<article[^>]+data-component-name="CaseStudyHero"[\s\S]*?<\/article>/)?.[0] ?? "";
  const productionPanelRule = caseStudyCss.match(/\.feedback-hero-overview h2\{([^}]*)\}/)?.[1] ?? "";

  assert.match(caseStudyHeroEntry, /<header class="case-hero case-shell" data-component="CaseStudyHero">[\s\S]*?<h2>A clear case-study opening<\/h2>[\s\S]*?<div class="feedback-hero-overview" data-component="HeroOverview">[\s\S]*?<h2>Overview<\/h2>/);
  assert.match(galleryCss, /\.component-library-page \.component-library-preview \.case-hero>h2\s*\{/);
  assert.doesNotMatch(galleryCss, /\.component-library-page \.component-library-preview \.case-hero\s+h2\s*\{/, "gallery title containment must not match nested HeroOverview headings");
  assert.match(productionPanelRule, /margin:\s*0 0 16px/);
  assert.match(productionPanelRule, /font-size:\s*1\.8rem/);
});

test("HeroOverview renders repeated headings in order with unique keys", async () => {
  const previousNoDeprecation = process.noDeprecation;
  process.noDeprecation = true;
  try {
    const [{ createElement }, { renderToStaticMarkup }, { tsImport }] = await Promise.all([
      import("react"),
      import("react-dom/server"),
      import("tsx/esm/api"),
    ]);
    const { HeroOverview } = await tsImport(
      "../app/components/case-study/HeroOverview.tsx",
      import.meta.url,
    );
    const panels = [
      { heading: "Overview", content: createElement("p", null, "First panel") },
      { heading: "Overview", content: createElement("p", null, "Second panel") },
    ];
    const rendered = HeroOverview({ panels });
    const panelElements = rendered.props.children;
    const html = renderToStaticMarkup(createElement(HeroOverview, { panels }));

    assert.match(html, /<h2>Overview<\/h2><p>First panel<\/p>[\s\S]*?<h2>Overview<\/h2><p>Second panel<\/p>/);
    assert.equal(new Set(panelElements.map((panel) => panel.key)).size, 2, "repeated headings must still receive unique React keys");
  } finally {
    process.noDeprecation = previousNoDeprecation;
  }
});

const typographySpecimens = [
  { name: "Portfolio display h1", element: "h4", className: "typography-portfolio-display", selector: ".hero h1", source: ".hero h1", declarations: [/font-family:\s*"Fredoka",sans-serif/, /font-size:\s*clamp\(3\.8rem,6\.6vw,6rem\)/, /line-height:\s*\.98/] },
  { name: "Case-study h1", element: "h4", className: "typography-case-study-display", selector: ".case-hero h1", source: ".case-hero h1", declarations: [/font-family:\s*"Fredoka",sans-serif/, /font-size:\s*clamp\(3\.5rem,7vw,6\.8rem\)/, /line-height:\s*\.96/] },
  { name: "Section h2", element: "h4", className: "typography-section-heading", selector: ".case-section h2", source: ".case-section h2", declarations: [/font-family:\s*"Fredoka",sans-serif/, /font-size:\s*clamp\(2\.7rem,5vw,4\.7rem\)/, /line-height:\s*1\.02/] },
  { name: "Content h3", element: "h4", className: "typography-content-heading", selector: ".case-section h3", source: ".case-section h3", declarations: [/color:\s*var\(--purple\)/, /font-family:\s*"Fredoka",sans-serif/, /font-size:\s*1\.55rem/] },
  { name: "Article/card h4", element: "h4", className: "typography-card-heading", selector: ".insight-card h4", source: ".insight-card h4", declarations: [/color:\s*#17121d/, /font-family:\s*"Fredoka",sans-serif/, /font-size:\s*20px/, /line-height:\s*1\.35/] },
  { name: "Eyebrow", element: "p", className: "typography-eyebrow", selector: ".eyebrow", source: ".eyebrow", declarations: [/color:\s*var\(--purple-dark\)/, /font-size:\s*\.78rem/, /font-weight:\s*800/, /letter-spacing:\s*\.13em/, /text-transform:\s*uppercase/] },
  { name: "Body", element: "p", className: "typography-body", selector: "body", source: "body", declarations: [/color:\s*var\(--ink\)/, /font-family:\s*"Nunito Sans","Segoe UI",sans-serif/, /font-size:\s*1rem/, /font-weight:\s*400/, /line-height:\s*normal/] },
  { name: "Muted body", element: "p", className: "typography-muted-body", selector: ".prose p", source: ".prose p", declarations: [/color:\s*var\(--muted\)/, /font-family:\s*"Nunito Sans","Segoe UI",sans-serif/, /font-size:\s*1\.13rem/, /font-weight:\s*400/, /line-height:\s*1\.78/] },
];

test("typography foundations render semantic production-class specimens", async () => {
  const { html } = await render("/component-library");
  const typeSpecimenEntry = html.match(/<article[^>]+data-component-name="TypeSpecimen"[\s\S]*?<\/article>/)?.[0] ?? "";
  const renderedSpecimens = [...typeSpecimenEntry.matchAll(/<section[^>]+data-typography-specimen="([^"]+)"[\s\S]*?<\/div><(h[1-6]|p) class="([^"]+)">[^<]+<\/\2><\/section>/g)]
    .map(([, name, element, className]) => ({ name, element, className }));
  const typographyPreview = typeSpecimenEntry.match(/<div class="component-library-preview"[^>]*>([\s\S]*)<\/div>\s*<\/article>/)?.[1] ?? "";

  assert.deepEqual(renderedSpecimens, typographySpecimens.map(({ name, element, className }) => ({ name, element, className })));
  for (const { name, source } of typographySpecimens) {
    const specimen = typeSpecimenEntry.match(new RegExp(`<section[^>]+data-typography-specimen="${name}"[\\s\\S]*?<\\/section>`))?.[0] ?? "";
    assert.match(specimen, new RegExp(`<strong[^>]*>${name}<\\/strong>`));
    assert.match(specimen, /<p class="component-library-typography-use">Use: (?:<!-- -->)?[^<]+<\/p>/);
    assert.match(specimen, new RegExp(`<code class="component-library-typography-source">Style: (?:<!-- -->)?${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/code>`));
  }
  assert.doesNotMatch(typeSpecimenEntry, /component-library-type-/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, "typography specimens must not add another page-level h1");
  assert.doesNotMatch(typographyPreview, /<h[23]\b/, "foundation specimen previews must not skip below their gallery entry h3 heading");
});

test("typography foundations are owned by production CSS", async () => {
  const { readFile } = await import("node:fs/promises");
  const [productionCss, galleryCss] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/component-library/component-library.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(galleryCss, /\.component-library-type-/);
  for (const { className, selector, declarations } of typographySpecimens) {
    assert.doesNotMatch(galleryCss, new RegExp(`\\.${className}\\b`), `${className} must not be defined by gallery CSS`);
    const productionRule = [...productionCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(([, selectors]) => {
      const selectorList = selectors.split(",").map((value) => value.trim());
      return selectorList.includes(selector) && selectorList.includes(`.${className}`);
    })?.[2] ?? "";
    assert.ok(productionRule, `${className} must share a production CSS rule with ${selector}`);
    for (const declaration of declarations) assert.match(productionRule, declaration, `${className} must own ${declaration}`);
  }
});

test("component library keeps contained navigation interactive and sticky", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/component-library/component-library.css", import.meta.url), "utf8");
  const pageRule = [...css.matchAll(/\.component-library-page\s*\{([^}]*)\}/g)].map((match) => match[1]).join(";");
  const headerRule = [...css.matchAll(/\.component-library-page \.component-library-preview \.site-header\s*\{([^}]*)\}/g)].map((match) => match[1]).join(";");

  assert.match(pageRule, /overflow-x:\s*clip/, "page containment must not create a sticky-nav scroll container");
  assert.match(headerRule, /pointer-events:\s*auto/, "contained header must remain interactive after its production scroll state changes");
});

test("component library contains the production vertical navigation without restyling it", async () => {
  const { html } = await render("/component-library");
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/component-library/component-library.css", import.meta.url), "utf8");
  const article = html.match(/<article[^>]+data-component-name="VerticalChapterNav"[\s\S]*?<\/article>/)?.[0] ?? "";
  const containmentRule = css.match(/\.component-library-nav-containment\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(article, /class="component-library-nav-containment"/);
  assert.match(article, /<nav class="vertical-chapter-nav"[^>]+data-component="VerticalChapterNav">/);
  assert.match(containmentRule, /contain:\s*layout paint/);
  assert.doesNotMatch(css, /\.vertical-chapter-nav/);
});

test("component library remains unlinked from public portfolio routes", async () => {
  for (const route of ["/", "/about", "/work/enterprise-search-generative-ai", "/work/ai-powered-feedback-intelligence-platform"]) {
    const { html } = await render(route);
    assert.doesNotMatch(html, /href="\/component-library"/, `expected ${route} to keep the gallery unlinked`);
  }
});

test("enterprise search composes global case-study components", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  for (const name of ["CaseStudyHero", "CaseStudyMetadata", "CaseStudyQuote", "InsightGrid", "RecommendationList"]) {
    assert.match(html, new RegExp(`data-component="${name}"`));
  }
});

test("enterprise hero presents its background and outcome in the shared overview", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  const hero = html.match(/<header class="case-hero case-shell" data-component="CaseStudyHero">[\s\S]*?<\/header>/)?.[0] ?? "";

  assert.match(hero, /<div class="feedback-hero-overview" data-component="HeroOverview">/);
  assert.match(hero, /<h2>Background<\/h2>/);
  assert.match(hero, /<h2>Outcome<\/h2>/);
  assert.match(hero, /Identified key drivers behind declining retention and engagement/);
  assert.match(hero, /<div class="case-meta enterprise-source-meta" data-component="CaseStudyMetadata">/);
});

test("HeroOverview paragraphs use the shared feedback case-study copy style", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const rule = css.match(/\.feedback-hero-overview p\{([^}]*)\}/)?.[1] ?? "";

  for (const declaration of [/max-width:\s*790px/, /margin:\s*0 0 22px/, /color:\s*var\(--muted\)/, /font-size:\s*1\.08rem/, /line-height:\s*1\.78/]) {
    assert.match(rule, declaration);
  }
});

test("HeroOverview lists use the shared case-study list style", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const rule = css.match(/\.feedback-hero-overview ul\{([^}]*)\}/)?.[1] ?? "";

  for (const declaration of [/max-width:\s*790px/, /margin:\s*20px 0 32px/, /padding-left:\s*24px/]) assert.match(rule, declaration);
  const itemRule = css.match(/\.feedback-hero-overview li\{([^}]*)\}/)?.[1] ?? "";
  for (const declaration of [/margin:\s*10px 0/, /color:\s*var\(--muted\)/, /line-height:\s*1\.65/]) assert.match(itemRule, declaration);
});

test("enterprise goals and methods uses the narrative renderer and survey comparison table", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  const section = html.match(/<section id="goals-methods"[\s\S]*?<\/section>/)?.[0] ?? "";

  assert.match(section, /data-component="ContentBlockRenderer"/);
  assert.match(section, /<h3>Research goals<\/h3>/);
  assert.match(section, /<h3>Mixed-method approach<\/h3>/);
  assert.match(section, /A company-wide survey established usage, success, and tool preferences across the Splunk business entity\./);
  assert.match(section, /<table class="research-methods-table">/);
  for (const text of ["Survey", "Interviews", "Large-scale quantitative study", "1:1 qualitative deep dives", "Identified patterns and behaviors", "Explained underlying motivations", "Surfaced top use cases and value drivers", "Added context to survey findings"]) assert.match(section, new RegExp(text));
  assert.match(section, /class="participant-strip"/);

  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  assert.ok([...css.matchAll(/\.case-closing\{([^}]*)\}/g)].some(([, rule]) => /background:var\(--purple-dark\)/.test(rule)));
});

test("enterprise methods table is rounded and the interview prompt uses WorkflowQuestion", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  const interviews = html.match(/<section id="interviews"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(interviews, /data-component="WorkflowQuestion"/);
  assert.match(interviews, /class="case-quote feedback-workflow-question" data-component="CaseStudyQuote"/);

  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  const tableRule = css.match(/\.research-methods-table\{([^}]*)\}/)?.[1] ?? "";
  assert.match(tableRule, /border-radius:\s*28px/);
  assert.match(tableRule, /overflow:\s*hidden/);
  assert.match(tableRule, /border:\s*1px solid var\(--line\)/);
});

test("enterprise persona cards use shared case-study media", async () => {
  const { html } = await render("/work/enterprise-search-generative-ai");
  const section = html.match(/<section id="ai-attitudes"[\s\S]*?<\/section>/)?.[0] ?? "";

  assert.equal((section.match(/class="case-media case-media-image" data-component="CaseStudyMedia"/g) ?? []).length, 3);
  assert.doesNotMatch(section, /class="case-figure"/);
  assert.match(section, /enterprise-search-ai-adversaries\.png"[^>]*width="326"[^>]*height="408"/);
  assert.match(section, /enterprise-search-ai-light-users\.png"[^>]*width="326"[^>]*height="409"/);
  assert.match(section, /enterprise-search-ai-power-users\.png"[^>]*width="327"[^>]*height="409"/);

  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  assert.match(css, /\.persona-grid \.case-media\{margin-top:0\}/);
});

test("sales assessment case study renders its source narrative and locally hosted media", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  for (const text of ["The platform contained AI—but it wasn't truly designed around AI.", "How can AI actively collaborate with sales representatives throughout the assessment process?", "AI output quality starts before generation.", "Reframed SVP from AI-assisted automation to AI-guided collaboration."]) assert.match(html, new RegExp(text));
  assert.equal((html.match(/class="case-media case-media-/g) ?? []).length, 19);
  assert.ok((html.match(/sales-assessment-hero\.mp4/g) ?? []).length >= 2);
  assert.match(html, /\/portfolio\/sales-assessment-hero\.mp4/);
  assert.doesNotMatch(html, /drive\.google\.com/);
});

test("sales assessment composes its refined reusable card patterns", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.doesNotMatch(html, /sales-assessment-thumbnail\.png/);
  assert.match(html, /data-component="WorkflowQuestion"[\s\S]*?The platform contained AI/);
  assert.match(html, /data-component="ComparisonTable"/);
  assert.equal((html.match(/data-component="InsightCard"/g) ?? []).length, 6);
  assert.equal((html.match(/data-component="InterimDesignCard"/g) ?? []).length, 3);
  assert.ok((html.match(/data-component="RecommendationCard"/g) ?? []).length >= 7);

  const { html: library } = await render("/component-library");
  assert.match(library, /data-component-name="ComparisonTable"/);
  assert.match(library, /data-component-name="InterimDesignCard"/);
});

test("sales assessment orders design details and preserves refined quote treatments", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.ok((html.match(/data-component="RecommendationList"/g) ?? []).length >= 4);
  assert.match(html, /<footer><cite>- Business Value Advisor<\/cite><\/footer>/);
  assert.match(html, /<strong>Generate a deck<\/strong>/);
  assert.match(html, /<strong>Create a living customer-facing assessment experience<\/strong>/);
  assert.match(html, /data-component="WorkflowQuestion"[\s\S]*?AI output quality starts before generation/);
  assert.match(html, /class="sales-final-vision"/);
  const ciscoCard = html.match(/<h4>Cisco Design System<\/h4>[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.match(ciscoCard, /<p>I redesigned the experience using the Cisco IT Design System\.<\/p><ul><li>familiar internal experiences<\/li><li>development consistency<\/li><li>reduced implementation effort<\/li><li>enterprise credibility<\/li><\/ul>/);
  assert.equal((html.match(/<li>familiar internal experiences<\/li>/g) ?? []).length, 1);
});

test("sales principles use metric cards and quote footers have shared typography", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  const introduction = html.match(/<section id="introduction"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.equal((introduction.match(/data-component="MetricCard"/g) ?? []).length, 5);

  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/case-study.css", import.meta.url), "utf8");
  assert.match(css, /\.case-quote footer\{margin-top:16px;font-family:Arial,sans-serif;font-size:1rem;line-height:1\.5\}/);
  assert.match(css, /\.sales-final-vision\{display:grid/);
  assert.match(css, /\.sales-assessment-case-study #introduction \.metrics-grid\{grid-template-columns:repeat\(3,1fr\)\}/);
});

test("sales design-principle metric cards pair each number with its icon", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  const introduction = html.match(/<section id="introduction"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(introduction, /<strong>01 🤝<\/strong>/);
  assert.match(introduction, /<strong>03 ✏️<\/strong>/);
  assert.match(introduction, /AI outputs should always remain editable/);
});

test("sales quotes and final product vision use their approved shared identities", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.equal((html.match(/data-component="WorkflowQuestion"/g) ?? []).length, 5);
  assert.match(html, /<blockquote class="case-quote" data-component="CaseStudyQuote">“Working with you has been so great[\s\S]*?<footer><cite>- Business Value Advisor<\/cite><\/footer>/);
  const testimony = html.match(/<h3>Testimony<\/h3>[\s\S]*?<\/blockquote>/)?.[0] ?? "";
  assert.doesNotMatch(testimony, /data-component="WorkflowQuestion"/);

  const vision = html.match(/<section id="product-vision"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(vision, /Through discussion with stakeholders, we concluded that not all customer context belongs at the same level\.[\s\S]*?<li><strong>Account Context:<\/strong> Context includes information fundamental to all assessments/);
  assert.match(vision, /This direction creates several advantages:[\s\S]*?<li>engagement tracking can help sales representatives understand what customers reviewed<\/li>/);
  assert.match(vision, /I designed a step-by-step product tour to teach users how to generate quality inputs\. The tour would:[\s\S]*?<li>expose new capabilities that users might otherwise miss<\/li>[\s\S]*?The better the onboarding, the better the inputs\. The better the inputs, the better the AI outputs\./);
  const headingIndex = vision.indexOf("<h3>Final Product Vision</h3>");
  const layoutIndex = vision.indexOf('<div class="sales-final-vision">');
  assert.ok(headingIndex >= 0 && layoutIndex > headingIndex);
  const layout = vision.slice(layoutIndex);
  assert.doesNotMatch(layout, /<h3>Final Product Vision<\/h3>/);
  assert.ok(layout.indexOf("sales-assessment-final-workflow.png") < layout.indexOf("Rather than replacing sales representatives"));
  const copy = layout.slice(layout.indexOf('<div class="sales-final-vision-copy">'));
  assert.match(copy, /Rather than replacing sales representatives[\s\S]*?The platform vision evolved from a tool that generates sales artifacts/);

  const { html: library } = await render("/component-library");
  assert.match(library, /data-component-name="CaseStudyQuote"[\s\S]*?class="case-quote"/);
  assert.match(library, /data-component-name="WorkflowQuestion"[\s\S]*?feedback-workflow-question/);
  const quoteCatalog = library.slice(library.indexOf('data-component-name="CaseStudyQuote"'), library.indexOf('data-component-name="WorkflowQuestion"'));
  assert.doesNotMatch(quoteCatalog, /feedback-workflow-question/);
});
