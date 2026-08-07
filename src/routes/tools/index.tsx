import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  PRICING_LABEL,
  TOOLS,
  type CategoryId,
  type Pricing,
  type Tool,
} from "@/data/tools";
import { ToolCard } from "@/components/directory/tool-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export const Route = createFileRoute("/tools/")({
  component: ToolsPage,
  head: () => ({
    meta: [{ title: "Tools — Halo" }],
  }),
});

type FilterState = {
  q: string;
  category: CategoryId | "all";
  pricing: Pricing | "all";
  api: boolean;
  mcp: boolean;
  flagship: boolean;
};

const initial: FilterState = {
  q: "",
  category: "all",
  pricing: "all",
  api: false,
  mcp: false,
  flagship: false,
};

function ToolsPage() {
  const [filters, setFilters] = useState<FilterState>(initial);

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => match(t, filters)).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [filters]);

  const activeCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.pricing !== "all" ? 1 : 0) +
    (filters.api ? 1 : 0) +
    (filters.mcp ? 1 : 0) +
    (filters.flagship ? 1 : 0) +
    (filters.q.trim() ? 1 : 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="label-meta mb-2 text-green">Directory</p>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">
          Approved tools
        </h1>
        <p className="mt-3 text-sm text-fg-body leading-relaxed">
          Every entry cleared the Halo standard. Filter by category, pricing,
          or capability — or search by name.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 space-y-5 rounded-[var(--radius-lg)] border border-border-strong bg-bg-panel p-4 sm:p-5 lg:w-64">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-fg-faint" />
            <Input
              value={filters.q}
              onChange={(e) =>
                setFilters((f) => ({ ...f, q: e.target.value }))
              }
              placeholder="Filter…"
              className="pl-9"
              aria-label="Filter tools"
            />
          </div>

          <FilterGroup label="Category">
            <FilterChip
              active={filters.category === "all"}
              onClick={() => setFilters((f) => ({ ...f, category: "all" }))}
            >
              All
            </FilterChip>
            {CATEGORIES.filter((c) =>
              TOOLS.some((t) => t.category === c.id),
            ).map((c) => (
              <FilterChip
                key={c.id}
                active={filters.category === c.id}
                onClick={() =>
                  setFilters((f) => ({ ...f, category: c.id }))
                }
              >
                {c.short}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Pricing">
            <FilterChip
              active={filters.pricing === "all"}
              onClick={() => setFilters((f) => ({ ...f, pricing: "all" }))}
            >
              All
            </FilterChip>
            {(Object.keys(PRICING_LABEL) as Pricing[]).map((p) => (
              <FilterChip
                key={p}
                active={filters.pricing === p}
                onClick={() => setFilters((f) => ({ ...f, pricing: p }))}
              >
                {PRICING_LABEL[p]}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Capabilities">
            <FilterChip
              active={filters.api}
              onClick={() => setFilters((f) => ({ ...f, api: !f.api }))}
            >
              Has API
            </FilterChip>
            <FilterChip
              active={filters.mcp}
              onClick={() => setFilters((f) => ({ ...f, mcp: !f.mcp }))}
            >
              Has MCP
            </FilterChip>
            <FilterChip
              active={filters.flagship}
              onClick={() =>
                setFilters((f) => ({ ...f, flagship: !f.flagship }))
              }
            >
              Flagship only
            </FilterChip>
          </FilterGroup>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(initial)}
              className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-border-strong bg-black py-2 text-xs text-fg-muted hover:text-green hover:border-green transition-colors"
            >
              <X className="size-3" />
              Clear filters
            </button>
          )}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs tabular text-fg-muted">
              <span className="text-green">{filtered.length}</span> of{" "}
              {TOOLS.length} tools
            </p>
            <Link
              to="/standard"
              className="text-xs text-fg-muted hover:text-green transition-colors"
            >
              How tools get approved →
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-border-strong px-6 py-16 text-center">
              <p className="text-sm text-fg-muted">
                No tools match these filters.
              </p>
              <button
                type="button"
                onClick={() => setFilters(initial)}
                className="mt-3 text-xs text-green hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function match(tool: Tool, f: FilterState): boolean {
  if (f.category !== "all" && tool.category !== f.category) return false;
  if (f.pricing !== "all" && tool.pricing !== f.pricing) return false;
  if (f.api && !tool.hasApi) return false;
  if (f.mcp && !tool.hasMcp) return false;
  if (f.flagship && tool.status !== "flagship") return false;
  const q = f.q.trim().toLowerCase();
  if (!q) return true;
  const hay = `${tool.name} ${tool.tagline} ${tool.description} ${tool.bestFor}`.toLowerCase();
  return hay.includes(q);
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label-meta mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-sm)] border px-2.5 py-1 text-[11px] transition-colors uppercase tracking-wide",
        active
          ? "border-green bg-green text-accent-fg font-bold"
          : "border-border-strong bg-black text-fg-muted hover:border-green hover:text-green",
      )}
    >
      {children}
    </button>
  );
}
