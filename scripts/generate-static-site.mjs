import {
  TOOLS,
  CATEGORIES,
  ROLES,
  STATS,
  PRICING_LABEL,
  getCategory,
  getToolsByCategory,
  getToolsByRole,
} from "/tmp/tools.mjs";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

const BASE = "/halo";
const OUT = "docs";

function countByCategory() {
  const counts = {};
  for (const c of CATEGORIES) counts[c.id] = 0;
  for (const t of TOOLS) counts[t.category] += 1;
  return counts;
}

const counts = countByCategory();

function esc(s) {
  return String(s)
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
}

function badge(text, variant = "default") {
  const map = {
    default: "badge",
    flagship: "badge badge-flagship",
    accent: "badge badge-accent",
    outline: "badge badge-outline",
  };
  return `<span class="${map[variant] || "badge"}">${esc(text)}</span>`;
}

function toolCard(t) {
  const cat = getCategory(t.category);
  return `
  <a class="card tool-card" href="${BASE}/tools/${esc(t.slug)}/">
    <div class="card-top">
      <div>
        <div class="card-title-row">
          <h3>${esc(t.name)}</h3>
          ${t.status === "flagship" ? badge("Flagship", "flagship") : ""}
          ${t.status === "new" ? badge("New", "accent") : ""}
        </div>
        <p class="meta">${esc(cat.name)} · ${esc(PRICING_LABEL[t.pricing])}</p>
      </div>
      <span class="icon-box">↗</span>
    </div>
    <p class="desc">${esc(t.description)}</p>
    <div class="card-foot">
      ${t.hasApi ? badge("API", "outline") : ""}
      ${t.hasMcp ? badge("MCP", "outline") : ""}
    </div>
  </a>`;
}

function catCard(c) {
  const n = counts[c.id] || 0;
  return `
  <a class="card" href="${BASE}/categories/${esc(c.id)}/">
    <div class="card-title-row">
      <h3>${esc(c.name)}</h3>
      <span class="arrow">→</span>
    </div>
    <p class="desc">${esc(c.description)}</p>
    <p class="meta"><span class="green">${n}</span> tool${n === 1 ? "" : "s"} approved</p>
  </a>`;
}

function roleCard(r) {
  return `
  <a class="card" href="${BASE}/roles/${esc(r.id)}/">
    <p class="label">Stack</p>
    <div class="card-title-row">
      <h3>${esc(r.name)}</h3>
      <span class="icon-box">→</span>
    </div>
    <p class="meta">${esc(r.tagline)}</p>
    <p class="desc">${esc(r.description)}</p>
    <p class="meta border-top"><span class="green">${r.toolIds.length}</span> approved tools in this stack</p>
  </a>`;
}

function shell({ title, description, body, active }) {
  const nav = [
    { href: `${BASE}/tools/`, id: "tools", label: "Tools" },
    { href: `${BASE}/categories/`, id: "categories", label: "Categories" },
    { href: `${BASE}/roles/`, id: "roles", label: "Roles" },
    { href: `${BASE}/standard/`, id: "standard", label: "Standard" },
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="theme-color" content="#050605" />
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml" />
<link rel="stylesheet" href="${BASE}/assets/site.css" />
</head>
<body>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${BASE}/">
      <span class="halo-dot"></span>
      <span class="brand-text">
        <span class="brand-name">Halo</span>
        <span class="brand-sub">Horizon</span>
      </span>
    </a>
    <nav class="nav">
      ${nav
        .map(
          (n) =>
            `<a href="${n.href}" class="${active === n.id ? "active" : ""}">${n.label}</a>`,
        )
        .join("")}
    </nav>
  </div>
</header>
<main>${body}</main>
<footer class="site-footer">
  <div class="horizon-line"></div>
  <div class="wrap footer-grid">
    <div>
      <div class="brand footer-brand"><span class="halo-dot"></span><span class="brand-name">Halo</span></div>
      <p class="desc">Operator-approved GTM directory. Horizon Halo design language. Only tools that clear the bar.</p>
      <p class="meta">${STATS.tools} tools · ${STATS.categories} categories · ${STATS.independence} independent</p>
    </div>
    <div>
      <p class="label">Directory</p>
      <ul class="footer-links">
        <li><a href="${BASE}/tools/">All tools</a></li>
        <li><a href="${BASE}/categories/">Categories</a></li>
        <li><a href="${BASE}/roles/">Stacks by role</a></li>
        <li><a href="${BASE}/standard/">Curation standard</a></li>
      </ul>
    </div>
    <div>
      <p class="label">Design language</p>
      <p class="desc">Horizon Halo — green console, JetBrains Mono NL, flat surfaces, peripheral confidence glow.</p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${new Date().getFullYear()} Halo · VeigaPunk · Horizon Halo · JetBrains Mono NL</p>
    <p>Prototype · operator-curated only</p>
  </div>
</footer>
</body>
</html>`;
}

const flagship = TOOLS.filter((t) => t.status === "flagship");
const recent = TOOLS.filter((t) => t.status === "new" || t.yearBuilt >= 2025);
const catsWith = CATEGORIES.filter((c) => counts[c.id] > 0);

const homeBody = `
<section class="hero">
  <div class="wrap hero-inner">
    <div class="chip"><span class="halo-dot sm"></span>100% independent · operator-approved only</div>
    <h1>Every tool that earned<br /><span class="green-glow">a seat on the stack</span></h1>
    <p class="lead">Halo is a curated GTM directory — not a catalog of everything. Only tools I have built and proven in real pipeline. Same essence as a full GTM atlas; zero filler.</p>
    <div class="hero-actions">
      <a class="btn primary" href="${BASE}/tools/">Browse approved tools →</a>
      <a class="btn outline" href="${BASE}/roles/">Build your stack by role</a>
    </div>
    <div class="stats">
      ${[
        ["Approved tools", STATS.tools],
        ["Categories", STATS.categories],
        ["Role stacks", STATS.roles],
        ["Flagship", STATS.flagship],
        ["Independence", STATS.independence],
      ]
        .map(
          ([l, v]) =>
            `<div class="stat"><div class="stat-val">${esc(String(v))}</div><div class="stat-label">${esc(l)}</div></div>`,
        )
        .join("")}
    </div>
  </div>
  <div class="horizon-line"></div>
</section>

<section class="section">
  <div class="wrap grid-3">
    ${[
      [
        "Built or battle-tested",
        "Every listing is something I created or ran in production long enough to trust.",
      ],
      [
        "No paid placements",
        "Zero affiliate links. Zero sponsored tiles. Curation is the product.",
      ],
      [
        "Operator notes",
        "Each tool carries a plain-language note on why it earned approval — not marketing copy.",
      ],
    ]
      .map(
        ([t, b]) =>
          `<div class="panel"><h3>${esc(t)}</h3><p class="desc">${esc(b)}</p></div>`,
      )
      .join("")}
  </div>
</section>

<section class="section border-top">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label green">Browse</p>
        <h2>By category</h2>
        <p class="desc">Fourteen GTM surfaces. Only categories with approved tools are active.</p>
      </div>
      <a class="text-link" href="${BASE}/categories/">All categories →</a>
    </div>
    <div class="grid-3 mt">${catsWith.map(catCard).join("")}</div>
  </div>
</section>

<section class="section border-top">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label green">Personas</p>
        <h2>Tools by role</h2>
        <p class="desc">Curated stacks for the people who actually run go-to-market.</p>
      </div>
      <a class="text-link" href="${BASE}/roles/">All role stacks →</a>
    </div>
    <div class="grid-3 mt">${ROLES.map(roleCard).join("")}</div>
  </div>
</section>

<section class="section border-top">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label green">Operator picks</p>
        <h2>Flagship tools</h2>
        <p class="desc">The highest bar in Halo. Systems I would rebuild from zero.</p>
      </div>
      <a class="text-link" href="${BASE}/tools/">View all tools →</a>
    </div>
    <div class="grid-2 mt">${flagship.map(toolCard).join("")}</div>
  </div>
</section>

${
  recent.length
    ? `
<section class="section border-top">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="label green">Fresh</p>
        <h2>Recently approved</h2>
      </div>
    </div>
    <div class="grid-3 mt">${recent.map(toolCard).join("")}</div>
  </div>
</section>`
    : ""
}

<section class="section">
  <div class="wrap">
    <div class="cta panel edge-halo">
      <p class="label green">The standard</p>
      <h2>Not everything deserves a listing</h2>
      <p class="desc">Halo rejects more tools than it accepts. Read the curation standard to understand the bar.</p>
      <div class="hero-actions center">
        <a class="btn primary" href="${BASE}/standard/">Read the standard →</a>
        <a class="btn ghost" href="${BASE}/tools/">Explore tools</a>
      </div>
    </div>
  </div>
</section>
`;

ensure(OUT);
writeFileSync(
  join(OUT, "index.html"),
  shell({
    title: "Halo — Operator-Approved GTM Tools",
    description:
      "Curated GTM directory. Horizon Halo design language. Only operator-approved tools.",
    body: homeBody,
    active: "home",
  }),
);

const toolsIndexBody = `
<section class="section">
  <div class="wrap">
    <p class="label green">Directory</p>
    <h1>Approved tools</h1>
    <p class="lead narrow">Every entry cleared the Halo standard. Filter by category, pricing, or capability.</p>
    <div class="tools-layout mt">
      <aside class="filters panel" id="filters">
        <input type="search" id="q" class="input" placeholder="Filter…" aria-label="Filter tools" />
        <div class="filter-group">
          <p class="label">Category</p>
          <div class="chips" data-filter="category">
            <button type="button" class="chip-btn active" data-value="all">All</button>
            ${CATEGORIES.filter((c) => counts[c.id] > 0)
              .map(
                (c) =>
                  `<button type="button" class="chip-btn" data-value="${esc(c.id)}">${esc(c.short)}</button>`,
              )
              .join("")}
          </div>
        </div>
        <div class="filter-group">
          <p class="label">Pricing</p>
          <div class="chips" data-filter="pricing">
            <button type="button" class="chip-btn active" data-value="all">All</button>
            ${Object.entries(PRICING_LABEL)
              .map(
                ([k, v]) =>
                  `<button type="button" class="chip-btn" data-value="${esc(k)}">${esc(v)}</button>`,
              )
              .join("")}
          </div>
        </div>
        <div class="filter-group">
          <p class="label">Capabilities</p>
          <div class="chips" data-filter="caps">
            <button type="button" class="chip-btn" data-value="api">Has API</button>
            <button type="button" class="chip-btn" data-value="mcp">Has MCP</button>
            <button type="button" class="chip-btn" data-value="flagship">Flagship only</button>
          </div>
        </div>
      </aside>
      <div>
        <p class="meta" id="count"></p>
        <div class="grid-2" id="tool-grid">
          ${TOOLS.map((t) => {
            return `<div class="tool-item" data-name="${esc(t.name.toLowerCase())}" data-tagline="${esc(t.tagline.toLowerCase())}" data-desc="${esc(t.description.toLowerCase())}" data-category="${esc(t.category)}" data-pricing="${esc(t.pricing)}" data-api="${t.hasApi}" data-mcp="${t.hasMcp}" data-flagship="${t.status === "flagship"}">${toolCard(t)}</div>`;
          }).join("")}
        </div>
      </div>
    </div>
  </div>
</section>
<script src="${BASE}/assets/filter.js"></script>
`;

ensure(join(OUT, "tools"));
writeFileSync(
  join(OUT, "tools/index.html"),
  shell({
    title: "Tools — Halo",
    description: "All operator-approved GTM tools in Halo.",
    body: toolsIndexBody,
    active: "tools",
  }),
);

for (const t of TOOLS) {
  const cat = getCategory(t.category);
  const related = getToolsByCategory(t.category)
    .filter((x) => x.id !== t.id)
    .slice(0, 3);
  const roles = ROLES.filter((r) => t.roles.includes(r.id));
  const body = `
  <section class="section">
    <div class="wrap detail-layout">
      <div>
        <a class="text-link back" href="${BASE}/tools/">← All tools</a>
        <div class="badges mt-sm">
          ${t.status === "flagship" ? badge("Flagship", "flagship") : ""}
          ${t.status === "new" ? badge("New", "accent") : ""}
          ${badge(PRICING_LABEL[t.pricing], "outline")}
          ${badge(cat.name)}
        </div>
        <h1 class="mt-sm">${esc(t.name)}</h1>
        <p class="lead">${esc(t.tagline)}</p>
        <div class="badges">
          ${t.hasApi ? badge("Has API", "outline") : ""}
          ${t.hasMcp ? badge("Has MCP", "outline") : ""}
          ${badge("Built " + t.yearBuilt)}
        </div>
        <h2 class="h-green mt">Overview</h2>
        <p class="desc">${esc(t.longDescription)}</p>
        <h2 class="h-green mt">Features</h2>
        <ul class="feature-list">
          ${t.features.map((f) => `<li><span class="dot"></span>${esc(f)}</li>`).join("")}
        </ul>
        <blockquote class="callout mt">
          <p class="label green">Operator note</p>
          <p>${esc(t.operatorNote)}</p>
        </blockquote>
        ${
          related.length
            ? `
        <h2 class="h-green mt">Related in ${esc(cat.short)}</h2>
        <div class="grid-2 mt-sm">${related.map(toolCard).join("")}</div>`
            : ""
        }
      </div>
      <aside class="panel sticky-side">
        <p class="label">Best for</p>
        <p class="desc">${esc(t.bestFor)}</p>
        <div class="horizon-line my"></div>
        <p class="label">Category</p>
        <p><a href="${BASE}/categories/${esc(cat.id)}/">${esc(cat.name)}</a></p>
        <p class="label mt-sm">Pricing</p>
        <p class="desc">${esc(PRICING_LABEL[t.pricing])}</p>
        <p class="label mt-sm">Appears in stacks</p>
        <div class="badges">
          ${roles
            .map(
              (r) =>
                `<a class="badge badge-outline" href="${BASE}/roles/${esc(r.id)}/">${esc(r.name)}</a>`,
            )
            .join("")}
        </div>
        <a class="btn primary block mt" href="${esc(t.url)}" target="_blank" rel="noreferrer">Visit site ↗</a>
        <p class="meta center">External link · prototype demo URL</p>
      </aside>
    </div>
  </section>`;
  ensure(join(OUT, "tools", t.slug));
  writeFileSync(
    join(OUT, "tools", t.slug, "index.html"),
    shell({
      title: `${t.name} — Halo`,
      description: t.tagline,
      body,
      active: "tools",
    }),
  );
}

ensure(join(OUT, "categories"));
writeFileSync(
  join(OUT, "categories/index.html"),
  shell({
    title: "Categories — Halo",
    description: "Browse Halo tools by GTM category.",
    body: `
  <section class="section">
    <div class="wrap">
      <p class="label green">Browse</p>
      <h1>Categories</h1>
      <p class="lead narrow">Fourteen GTM surfaces. Empty shelves stay empty.</p>
      <div class="grid-3 mt">${CATEGORIES.map(catCard).join("")}</div>
    </div>
  </section>`,
    active: "categories",
  }),
);

for (const c of CATEGORIES) {
  const tools = getToolsByCategory(c.id);
  ensure(join(OUT, "categories", c.id));
  writeFileSync(
    join(OUT, "categories", c.id, "index.html"),
    shell({
      title: `${c.name} — Halo`,
      description: c.description,
      body: `
    <section class="section">
      <div class="wrap">
        <a class="text-link back" href="${BASE}/categories/">← All categories</a>
        <p class="label green mt-sm">Category</p>
        <h1>${esc(c.name)}</h1>
        <p class="lead narrow">${esc(c.description)}</p>
        <p class="meta"><span class="green">${tools.length}</span> approved tool${tools.length === 1 ? "" : "s"}</p>
        ${
          tools.length === 0
            ? `<div class="empty">No tools approved in this category yet. Empty is honest.</div>`
            : `<div class="grid-2 mt">${tools.map(toolCard).join("")}</div>`
        }
      </div>
    </section>`,
      active: "categories",
    }),
  );
}

ensure(join(OUT, "roles"));
writeFileSync(
  join(OUT, "roles/index.html"),
  shell({
    title: "Role stacks — Halo",
    description: "Curated GTM tool stacks by role.",
    body: `
  <section class="section">
    <div class="wrap">
      <p class="label green">Personas</p>
      <h1>Tools by role</h1>
      <p class="lead narrow">Curated stacks for the people who run go-to-market.</p>
      <div class="grid-3 mt">${ROLES.map(roleCard).join("")}</div>
    </div>
  </section>`,
    active: "roles",
  }),
);

for (const r of ROLES) {
  const tools = getToolsByRole(r.id);
  ensure(join(OUT, "roles", r.id));
  writeFileSync(
    join(OUT, "roles", r.id, "index.html"),
    shell({
      title: `${r.name} stack — Halo`,
      description: r.description,
      body: `
    <section class="section">
      <div class="wrap">
        <a class="text-link back" href="${BASE}/roles/">← All role stacks</a>
        <p class="label green mt-sm">Role stack</p>
        <h1>${esc(r.name)}</h1>
        <p class="meta">${esc(r.tagline)}</p>
        <p class="lead narrow">${esc(r.description)}</p>
        <div class="grid-2 mt">${tools.map(toolCard).join("")}</div>
      </div>
    </section>`,
      active: "roles",
    }),
  );
}

const MUST = [
  "I have built it, or run it in production long enough to trust the failure modes.",
  "It solves a real GTM job with measurable impact on pipeline, efficiency, or truth.",
  "It has a clear owner surface — docs, API, or ops path — not just a landing page.",
  "It can be explained in plain language without vendor mythology.",
  "It survives a week of real use without constant babysitting.",
];
const WONT = [
  "Paid placement, affiliate, or sponsored listing of any kind.",
  "Tools I have only seen in a demo or launch thread.",
  "Category fillers to look comprehensive.",
  "Tools that optimize vanity metrics over revenue outcomes.",
  "Anything I would not put on a stack for my own team.",
];

ensure(join(OUT, "standard"));
writeFileSync(
  join(OUT, "standard/index.html"),
  shell({
    title: "Curation standard — Halo",
    description: "The Halo operator standard for approved GTM tools.",
    body: `
  <section class="section">
    <div class="wrap narrow-page">
      <p class="label green">Editorial</p>
      <h1>The Halo standard</h1>
      <p class="lead">Halo is not a marketplace and not a complete atlas of every GTM tool. It is a shortlist of systems I have created and proven — the ones I know are good for sure.</p>
      <div class="horizon-line my"></div>
      <h2 class="h-green">Must be true</h2>
      <ul class="rule-list">
        ${MUST.map((i) => `<li><span class="dot"></span>${esc(i)}</li>`).join("")}
      </ul>
      <h2 class="mt">Will not ship</h2>
      <ul class="rule-list">
        ${WONT.map((i) => `<li><span class="dot red"></span>${esc(i)}</li>`).join("")}
      </ul>
      <div class="callout mt">
        <h2>Independence</h2>
        <p class="desc">Halo is 100% independent. No advertising relationships on listings. Operator notes are first-person assessments. If a tool falls below the standard, it is removed.</p>
        <div class="hero-actions mt-sm">
          <a class="btn primary" href="${BASE}/tools/">Browse tools →</a>
          <a class="btn outline" href="${BASE}/">Back home</a>
        </div>
      </div>
    </div>
  </section>`,
    active: "standard",
  }),
);

writeFileSync(join(OUT, "favicon.svg"), readFileSync("public/favicon.svg", "utf8"));
writeFileSync(join(OUT, ".nojekyll"), "");
writeFileSync(
  join(OUT, "404.html"),
  shell({
    title: "Not on the stack — Halo",
    description: "Page not found.",
    body: `<section class="section center-page"><div class="wrap"><span class="halo-dot"></span><p class="label">404</p><h1>Not on the stack</h1><p class="desc">This page is not part of Halo.</p><a class="btn primary mt" href="${BASE}/">Return home</a></div></section>`,
    active: "",
  }),
);

console.log(
  "OK docs/ — tools",
  TOOLS.length,
  "categories",
  CATEGORIES.length,
  "roles",
  ROLES.length,
);
