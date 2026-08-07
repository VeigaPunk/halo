export type Pricing = "free" | "freemium" | "paid" | "open-source";

export type CategoryId =
  | "prospecting"
  | "outreach"
  | "crm"
  | "marketing"
  | "content"
  | "design"
  | "social"
  | "analytics"
  | "scraping"
  | "ai"
  | "developer"
  | "automation"
  | "learning"
  | "communities";

export type RoleId =
  | "gtm-engineer"
  | "sdr-bdr"
  | "content-marketer"
  | "revops"
  | "demand-gen"
  | "founder";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  short: string;
}

export interface Role {
  id: RoleId;
  name: string;
  tagline: string;
  description: string;
  toolIds: string[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: CategoryId;
  pricing: Pricing;
  bestFor: string;
  features: string[];
  hasApi: boolean;
  hasMcp: boolean;
  url: string;
  status: "approved" | "flagship" | "new";
  yearBuilt: number;
  operatorNote: string;
  roles: RoleId[];
}

export const CATEGORIES: Category[] = [
  {
    id: "prospecting",
    name: "Prospecting & Lead Data",
    short: "Prospecting",
    description: "Signals, enrichment, and account intelligence that actually convert.",
  },
  {
    id: "outreach",
    name: "Outreach & Sequences",
    short: "Outreach",
    description: "Deliverability-first sequences and multi-channel outbound.",
  },
  {
    id: "crm",
    name: "CRM & Deal Management",
    short: "CRM",
    description: "Pipeline hygiene, forecasting, and deal execution without the bloat.",
  },
  {
    id: "marketing",
    name: "Marketing & Growth",
    short: "Marketing",
    description: "Paid, organic, and lifecycle systems that feed real pipeline.",
  },
  {
    id: "content",
    name: "Content Creation",
    short: "Content",
    description: "Research-to-publish workflows built for GTM operators.",
  },
  {
    id: "design",
    name: "Design & Media",
    short: "Design",
    description: "Asset systems for decks, ads, and product narrative.",
  },
  {
    id: "social",
    name: "Social Media",
    short: "Social",
    description: "Distribution, listening, and founder-led social at scale.",
  },
  {
    id: "analytics",
    name: "Analytics & Data",
    short: "Analytics",
    description: "Attribution, revenue truth, and operator-grade reporting.",
  },
  {
    id: "scraping",
    name: "Scraping & Extraction",
    short: "Extraction",
    description: "Structured web data for AI builders and GTM systems.",
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    short: "AI",
    description: "Models and agents that earn a seat on the production stack.",
  },
  {
    id: "developer",
    name: "Developer Tools",
    short: "DevTools",
    description: "Infrastructure and primitives for GTM engineering.",
  },
  {
    id: "automation",
    name: "Workflow Automation",
    short: "Automation",
    description: "Orchestration that survives real ops load.",
  },
  {
    id: "learning",
    name: "Learning & Resources",
    short: "Learning",
    description: "Playbooks, docs, and systems thinking for GTM teams.",
  },
  {
    id: "communities",
    name: "Communities & Networks",
    short: "Community",
    description: "Operator rooms where signal still beats noise.",
  },
];

export const ROLES: Role[] = [
  {
    id: "gtm-engineer",
    name: "GTM Engineer",
    tagline: "Pipelines, integrations, agentic ops",
    description:
      "You wire data, build enrichment graphs, and keep revenue systems coherent. Stack favors APIs, automation, and observability.",
    toolIds: [
      "signalforge",
      "prism-enrich",
      "extractum",
      "relay-graph",
      "ledgerline",
      "agent-forge",
    ],
  },
  {
    id: "sdr-bdr",
    name: "SDR / BDR",
    tagline: "Meetings from intent and sequences",
    description:
      "You live in the top of funnel. Stack prioritizes clean signals, deliverable sequences, and ruthless prioritization.",
    toolIds: ["signalforge", "sequence-loom", "dispatch", "prism-enrich", "orbit-desk"],
  },
  {
    id: "content-marketer",
    name: "Content Marketer",
    tagline: "Organic growth through narrative",
    description:
      "You turn product truth into distribution. Stack covers research, drafting, design systems, and social cadence.",
    toolIds: ["copywright", "orbit-desk", "halo-frames", "foundry-notes", "ledgerline"],
  },
  {
    id: "revops",
    name: "RevOps Leader",
    tagline: "Hygiene, forecast, consistency",
    description:
      "You own the revenue machine. Stack focuses on CRM truth, forecasting, and automated data integrity.",
    toolIds: ["pipeline-lattice", "ledgerline", "briefcase-os", "relay-graph", "prism-enrich"],
  },
  {
    id: "demand-gen",
    name: "Demand Gen",
    tagline: "Paid and programmatic pipeline",
    description:
      "You buy attention and convert it. Stack mixes creative systems, attribution, and experiment velocity.",
    toolIds: ["halo-frames", "ledgerline", "orbit-desk", "copywright", "signalforge"],
  },
  {
    id: "founder",
    name: "Founder (0–1)",
    tagline: "Lean stack that ships revenue",
    description:
      "You wear every hat. Stack is minimal, high-leverage, and free of enterprise theater.",
    toolIds: [
      "sequence-loom",
      "pipeline-lattice",
      "copywright",
      "foundry-notes",
      "agent-forge",
    ],
  },
];

export const TOOLS: Tool[] = [
  {
    id: "signalforge",
    name: "Signalforge",
    slug: "signalforge",
    tagline: "Intent signals without the noise tax",
    description:
      "Real-time buying signals scored against your ICP. Built for operators who hate false positives more than empty pipelines.",
    longDescription:
      "Signalforge is the intent layer I wish existed when every 'intent' vendor shipped vanity scores. It fuses first-party product events, public web signals, and hiring/tech-change fingerprints into a single ranked stream. No black-box composite scores — every signal is explainable, filterable, and exportable via API or MCP. Built in production for teams that only want accounts that can actually close this quarter.",
    category: "prospecting",
    pricing: "paid",
    bestFor: "GTM engineers and SDRs prioritizing high-intent accounts",
    features: [
      "Explainable signal scoring",
      "ICP-weighted ranking",
      "Webhook + MCP streaming",
      "Negative-signal suppression",
      "Account graph view",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/signalforge",
    status: "flagship",
    yearBuilt: 2024,
    operatorNote:
      "This is the tool I open every Monday. If a signal can't explain itself, it doesn't ship.",
    roles: ["gtm-engineer", "sdr-bdr", "demand-gen"],
  },
  {
    id: "prism-enrich",
    name: "Prism Enrich",
    slug: "prism-enrich",
    tagline: "Enrichment orchestration that doesn't rot",
    description:
      "Waterfall enrichment with source provenance, cost caps, and dedupe that actually works under volume.",
    longDescription:
      "Prism Enrich runs multi-provider enrichment as a deterministic graph. Every field carries source, timestamp, and confidence. Cost budgets stop runaway waterfall spend. Built because Clay-style workflows are powerful but I needed something I could own end-to-end for regulated GTM stacks.",
    category: "prospecting",
    pricing: "freemium",
    bestFor: "RevOps and GTM engineers running enrichment pipelines",
    features: [
      "Provider waterfall graphs",
      "Field-level provenance",
      "Budget guards",
      "CRM write-back",
      "CSV + API modes",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/prism-enrich",
    status: "approved",
    yearBuilt: 2023,
    operatorNote: "If enrichment isn't auditable, it's a liability. Prism makes it auditable.",
    roles: ["gtm-engineer", "revops", "sdr-bdr"],
  },
  {
    id: "sequence-loom",
    name: "Sequence Loom",
    slug: "sequence-loom",
    tagline: "Deliverability-first cold outreach",
    description:
      "Sequences engineered for inbox placement, not vanity open rates. Multi-channel with human-safe pacing.",
    longDescription:
      "Sequence Loom treats deliverability as a first-class system: domain health, cadence physics, and content variation are wired into every step. Built after watching good SDRs get burned by tools that optimized for 'sends' instead of replies that turn into meetings.",
    category: "outreach",
    pricing: "paid",
    bestFor: "SDR teams that live or die by reply quality",
    features: [
      "Inbox placement monitoring",
      "Human-safe pacing",
      "Variant trees",
      "LinkedIn + email dual channel",
      "CRM stage sync",
    ],
    hasApi: true,
    hasMcp: false,
    url: "https://example.com/sequence-loom",
    status: "flagship",
    yearBuilt: 2023,
    operatorNote: "I refuse to ship a sequence tool that can't show domain reputation in real time.",
    roles: ["sdr-bdr", "founder"],
  },
  {
    id: "dispatch",
    name: "Dispatch",
    slug: "dispatch",
    tagline: "Outbound send infrastructure",
    description:
      "The transport layer under Sequence Loom — warm pools, rotation, and bounce intelligence.",
    longDescription:
      "Dispatch is the low-level send fabric: mailbox pools, smart rotation, and bounce classification that feeds back into sequence health. Separated from Sequence Loom so engineering teams can build their own orchestration on top.",
    category: "outreach",
    pricing: "paid",
    bestFor: "GTM engineers building custom outbound systems",
    features: [
      "Mailbox pool management",
      "Bounce taxonomy",
      "Reputation scoring",
      "Send APIs",
      "Audit logs",
    ],
    hasApi: true,
    hasMcp: false,
    url: "https://example.com/dispatch",
    status: "approved",
    yearBuilt: 2024,
    operatorNote: "Infrastructure, not theater. If you need pretty sequences, use Loom. If you need pipes, use Dispatch.",
    roles: ["gtm-engineer", "sdr-bdr"],
  },
  {
    id: "pipeline-lattice",
    name: "Pipeline Lattice",
    slug: "pipeline-lattice",
    tagline: "CRM without enterprise gravity",
    description:
      "A deal system built for stage discipline, forecast honesty, and integrations that don't break every sprint.",
    longDescription:
      "Pipeline Lattice is a CRM designed around revenue truth: rigid stages, activity-backed probability, and an integration surface that GTM engineers can actually trust. No Salesforce cosplay — just the minimum structure that keeps deals honest.",
    category: "crm",
    pricing: "freemium",
    bestFor: "Founders and RevOps who want CRM without bloat",
    features: [
      "Activity-backed forecasts",
      "Stage enforcement",
      "Custom objects (light)",
      "Native enrichment hooks",
      "Clean REST + webhooks",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/pipeline-lattice",
    status: "flagship",
    yearBuilt: 2022,
    operatorNote: "I built this after one too many 'we need Salesforce when we're three people' debates.",
    roles: ["revops", "founder", "gtm-engineer"],
  },
  {
    id: "briefcase-os",
    name: "Briefcase OS",
    slug: "briefcase-os",
    tagline: "RevOps command surface",
    description:
      "A single pane for hygiene scores, forecast rollups, and operator runbooks.",
    longDescription:
      "Briefcase OS sits above your CRM as the RevOps cockpit: data quality scores, forecast integrity, playbook execution, and weekly operator rituals. Built so RevOps leaders stop living in twelve tabs.",
    category: "crm",
    pricing: "paid",
    bestFor: "RevOps leaders running multi-team revenue machines",
    features: [
      "Hygiene scorecards",
      "Forecast integrity checks",
      "Runbook automation",
      "Team ritual templates",
      "Board-ready exports",
    ],
    hasApi: true,
    hasMcp: false,
    url: "https://example.com/briefcase-os",
    status: "approved",
    yearBuilt: 2024,
    operatorNote: "RevOps is a product. This is the UI I wanted for that product.",
    roles: ["revops"],
  },
  {
    id: "copywright",
    name: "Copywright",
    slug: "copywright",
    tagline: "GTM copy with source of truth",
    description:
      "Research → brief → draft → brand voice. Content systems for teams who ship weekly, not quarterly.",
    longDescription:
      "Copywright is a content OS for GTM: ICP research packs, message architecture, and draft generation that stays grounded in your product facts. Not a chatbot with a marketing skin — a production system with review gates.",
    category: "content",
    pricing: "freemium",
    bestFor: "Content marketers and founder-led teams",
    features: [
      "ICP research packs",
      "Message architecture",
      "Brand voice locks",
      "Review workflows",
      "Export to CMS / social",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/copywright",
    status: "flagship",
    yearBuilt: 2023,
    operatorNote: "AI copy is only useful if it can't invent features. Copywright is hard-locked to your product truth.",
    roles: ["content-marketer", "founder", "demand-gen"],
  },
  {
    id: "halo-frames",
    name: "Halo Frames",
    slug: "halo-frames",
    tagline: "Design systems for GTM media",
    description:
      "Templates, motion primitives, and brand kits for decks, ads, and launch assets.",
    longDescription:
      "Halo Frames is the design system behind every deck and ad I ship. Componentized layouts, motion presets, and export pipelines so demand gen doesn't wait on design for every experiment.",
    category: "design",
    pricing: "paid",
    bestFor: "Demand gen and content teams shipping creative weekly",
    features: [
      "Brand-locked templates",
      "Motion presets",
      "Ad size matrix",
      "Deck systems",
      "Figma + code export",
    ],
    hasApi: false,
    hasMcp: false,
    url: "https://example.com/halo-frames",
    status: "approved",
    yearBuilt: 2024,
    operatorNote: "Creative velocity dies without a system. Frames is that system.",
    roles: ["demand-gen", "content-marketer"],
  },
  {
    id: "orbit-desk",
    name: "Orbit Desk",
    slug: "orbit-desk",
    tagline: "Founder-led social that scales",
    description:
      "Scheduling, listening, and repurposing for teams who treat social as pipeline, not vanity.",
    longDescription:
      "Orbit Desk is social ops for operators: calendar, listening queues, and repurpose pipelines from long-form into multi-channel posts. Built for teams who measure social in meetings, not likes.",
    category: "social",
    pricing: "freemium",
    bestFor: "Founder-led brands and content teams",
    features: [
      "Multi-account calendar",
      "Listening queues",
      "Repurpose chains",
      "UTM discipline",
      "Engagement SLAs",
    ],
    hasApi: true,
    hasMcp: false,
    url: "https://example.com/orbit-desk",
    status: "approved",
    yearBuilt: 2023,
    operatorNote: "If social doesn't touch pipeline, delete it. Orbit exists so it does.",
    roles: ["content-marketer", "sdr-bdr", "demand-gen"],
  },
  {
    id: "ledgerline",
    name: "Ledgerline",
    slug: "ledgerline",
    tagline: "Revenue analytics without the drama",
    description:
      "Attribution, cohort truth, and operator dashboards that refuse vanity metrics.",
    longDescription:
      "Ledgerline is the analytics layer I trust: multi-touch that you can audit, cohort views that match finance, and dashboards that default to pipeline and cash. Built because 'marketing dashboards' kept lying to me.",
    category: "analytics",
    pricing: "paid",
    bestFor: "RevOps, demand gen, and founders who need truth",
    features: [
      "Auditable multi-touch",
      "Cohort + retention",
      "Pipeline waterfall",
      "Finance reconciliation",
      "SQL + visual dual mode",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/ledgerline",
    status: "flagship",
    yearBuilt: 2022,
    operatorNote: "If the number can't be traced to a source system, it doesn't appear on a board slide.",
    roles: ["revops", "demand-gen", "content-marketer", "gtm-engineer"],
  },
  {
    id: "extractum",
    name: "Extractum",
    slug: "extractum",
    tagline: "Web extraction for GTM builders",
    description:
      "Structured scrapers, change detection, and clean datasets for enrichment and research.",
    longDescription:
      "Extractum turns messy web surfaces into typed datasets. Change detection, proxy discipline, and schema validation so GTM engineers stop babysitting brittle scrapers.",
    category: "scraping",
    pricing: "open-source",
    bestFor: "GTM engineers and AI builders who need clean web data",
    features: [
      "Schema-validated extracts",
      "Change detection",
      "Proxy rotation",
      "Cron + webhook",
      "Self-host ready",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/extractum",
    status: "approved",
    yearBuilt: 2023,
    operatorNote: "Open-sourced because brittle scraping shouldn't be a competitive moat — reliable data should.",
    roles: ["gtm-engineer"],
  },
  {
    id: "agent-forge",
    name: "Agent Forge",
    slug: "agent-forge",
    tagline: "Production agents for GTM work",
    description:
      "Spec-driven agents with tool use, evals, and human gates. Not a chat toy — an ops worker.",
    longDescription:
      "Agent Forge is how I ship GTM agents that don't freestyle into liability. Specs, tool permissions, eval harnesses, and human-in-the-loop gates. Built for research, enrichment, and ops tasks that need reliability more than demos.",
    category: "ai",
    pricing: "open-source",
    bestFor: "GTM engineers and technical founders automating ops",
    features: [
      "Spec-driven agents",
      "Tool permissioning",
      "Eval harness",
      "Human gates",
      "MCP native",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/agent-forge",
    status: "flagship",
    yearBuilt: 2025,
    operatorNote: "Agents without evals are just expensive random. Forge forces the evals.",
    roles: ["gtm-engineer", "founder"],
  },
  {
    id: "relay-graph",
    name: "Relay Graph",
    slug: "relay-graph",
    tagline: "Workflow automation that holds under load",
    description:
      "Event-driven orchestration with retries, observability, and versioned graphs.",
    longDescription:
      "Relay Graph is the automation spine for every GTM system I run. Event triggers, typed nodes, retries with dead-letter queues, and full run history. Built because Zapier-style glue collapses the moment volume gets real.",
    category: "automation",
    pricing: "freemium",
    bestFor: "GTM engineers and RevOps automating multi-step systems",
    features: [
      "Versioned workflow graphs",
      "Dead-letter queues",
      "Observability traces",
      "Secrets vault",
      "Self-host option",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/relay-graph",
    status: "approved",
    yearBuilt: 2023,
    operatorNote: "If you can't see a failed run and replay it, you don't have automation — you have hope.",
    roles: ["gtm-engineer", "revops"],
  },
  {
    id: "foundry-notes",
    name: "Foundry Notes",
    slug: "foundry-notes",
    tagline: "Playbooks that stay current",
    description:
      "Living GTM playbooks with version history, ownership, and links into the tools that execute them.",
    longDescription:
      "Foundry Notes is where playbooks stop rotting in Notion. Versioned SOPs, owner accountability, and deep links into Sequence Loom, Pipeline Lattice, and Relay Graph so process and execution stay one system.",
    category: "learning",
    pricing: "free",
    bestFor: "Teams that treat process as product",
    features: [
      "Versioned playbooks",
      "Owner + review cycles",
      "Tool deep-links",
      "Onboarding paths",
      "Export / public docs",
    ],
    hasApi: false,
    hasMcp: false,
    url: "https://example.com/foundry-notes",
    status: "approved",
    yearBuilt: 2022,
    operatorNote: "A playbook without an owner is fiction. Foundry forces the owner.",
    roles: ["content-marketer", "founder", "revops"],
  },
  {
    id: "quorum-room",
    name: "Quorum Room",
    slug: "quorum-room",
    tagline: "Operator community, low noise",
    description:
      "Invite-only rooms for GTM operators. Signal over theater. Structured AMAs and stack reviews.",
    longDescription:
      "Quorum Room is the community I wish every directory pointed at: invite-only, curated topics, stack reviews with receipts. Not another Slack full of vendors pitching.",
    category: "communities",
    pricing: "paid",
    bestFor: "Operators who want peer signal without vendor spam",
    features: [
      "Invite-only rooms",
      "Stack review format",
      "AMA archives",
      "No vendor cold DMs",
      "Seasonal cohorts",
    ],
    hasApi: false,
    hasMcp: false,
    url: "https://example.com/quorum-room",
    status: "new",
    yearBuilt: 2025,
    operatorNote: "Community is a product. Quorum has a product bar, not a growth bar.",
    roles: ["founder", "revops", "gtm-engineer"],
  },
  {
    id: "dev-spine",
    name: "Dev Spine",
    slug: "dev-spine",
    tagline: "GTM developer primitives",
    description:
      "Typed SDKs, webhook receivers, and secret rotation for the rest of the Halo stack.",
    longDescription:
      "Dev Spine is the shared infrastructure layer: auth helpers, webhook verification, schema packs, and secret rotation used by every other tool in this directory. Open where it helps; opinionated where it must be.",
    category: "developer",
    pricing: "open-source",
    bestFor: "Engineers integrating the Halo stack",
    features: [
      "Typed SDKs",
      "Webhook verification",
      "Schema packs",
      "Secret rotation",
      "CLI toolkit",
    ],
    hasApi: true,
    hasMcp: true,
    url: "https://example.com/dev-spine",
    status: "approved",
    yearBuilt: 2024,
    operatorNote: "Every tool in this directory speaks Spine. That's the point.",
    roles: ["gtm-engineer"],
  },
  {
    id: "growth-vector",
    name: "Growth Vector",
    slug: "growth-vector",
    tagline: "Experiment system for demand gen",
    description:
      "Hypothesis → launch → read → kill. Experiment OS with creative and channel matrices.",
    longDescription:
      "Growth Vector is how demand gen stops random acts of marketing. Structured experiments, creative matrices, and kill criteria tied to Ledgerline metrics.",
    category: "marketing",
    pricing: "paid",
    bestFor: "Demand gen teams running paid + lifecycle experiments",
    features: [
      "Hypothesis templates",
      "Creative matrices",
      "Kill criteria",
      "Ledgerline sync",
      "Weekly review ritual",
    ],
    hasApi: true,
    hasMcp: false,
    url: "https://example.com/growth-vector",
    status: "new",
    yearBuilt: 2025,
    operatorNote: "If you can't kill an experiment, you don't have a system — you have a hope chest.",
    roles: ["demand-gen", "content-marketer"],
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}

export function getRole(id: RoleId): Role {
  return ROLES.find((r) => r.id === id)!;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: CategoryId): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getToolsByRole(roleId: RoleId): Tool[] {
  const role = getRole(roleId);
  return role.toolIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));
}

export function countByCategory(): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const c of CATEGORIES) counts[c.id] = 0;
  for (const t of TOOLS) counts[t.category] += 1;
  return counts;
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return TOOLS;
  return TOOLS.filter((t) => {
    const hay = [
      t.name,
      t.tagline,
      t.description,
      t.bestFor,
      t.operatorNote,
      getCategory(t.category).name,
      ...t.features,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export const STATS = {
  tools: TOOLS.length,
  categories: CATEGORIES.length,
  roles: ROLES.length,
  flagship: TOOLS.filter((t) => t.status === "flagship").length,
  independence: "100%",
};

export const PRICING_LABEL: Record<Pricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "Open source",
};
