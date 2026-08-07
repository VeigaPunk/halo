import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Plug,
  Quote,
} from "lucide-react";
import {
  CATEGORIES,
  PRICING_LABEL,
  ROLES,
  getToolBySlug,
  getToolsByCategory,
} from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/directory/tool-card";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getToolBySlug(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  component: ToolDetailPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.tool.name} — Halo`
          : "Tool — Halo",
      },
    ],
  }),
});

function ToolDetailPage() {
  const { tool } = Route.useLoaderData();
  const cat = CATEGORIES.find((c) => c.id === tool.category)!;
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);
  const roles = ROLES.filter((r) => tool.roles.includes(r.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/tools"
        className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-green transition-colors"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.75} />
        All tools
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {tool.status === "flagship" && (
              <Badge variant="flagship">Flagship</Badge>
            )}
            {tool.status === "new" && <Badge variant="accent">New</Badge>}
            <Badge variant="outline">{PRICING_LABEL[tool.pricing]}</Badge>
            <Badge variant="default">{cat.name}</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-2 text-base text-fg-body">{tool.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tool.hasApi && (
              <Badge variant="outline">
                <Plug className="size-3" strokeWidth={1.75} />
                Has API
              </Badge>
            )}
            {tool.hasMcp && (
              <Badge variant="outline">
                <Code2 className="size-3" strokeWidth={1.75} />
                Has MCP
              </Badge>
            )}
            <Badge variant="default">Built {tool.yearBuilt}</Badge>
          </div>

          <div className="mt-10 space-y-4">
            <h2 className="text-sm font-semibold text-green tracking-wide uppercase">
              Overview
            </h2>
            <p className="text-sm leading-relaxed text-fg-body">
              {tool.longDescription}
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold text-green mb-4 uppercase tracking-wide">
              Features
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {tool.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 rounded-[var(--radius-sm)] border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg-body"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green shadow-[0_0_6px_var(--color-green)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="mt-10 relative overflow-hidden hh-callout rounded-r-[var(--radius-lg)] border border-border border-l-0 p-6">
            <Quote
              className="absolute right-4 top-4 size-8 text-border-strong"
              strokeWidth={1}
            />
            <p className="label-meta mb-2 text-green">Operator note</p>
            <p className="relative text-sm leading-relaxed text-fg">
              {tool.operatorNote}
            </p>
          </blockquote>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-sm font-semibold text-green mb-4 uppercase tracking-wide">
                Related in {cat.short}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-lg)] border border-border-strong bg-bg-panel p-5 space-y-4">
            <div>
              <p className="label-meta mb-1">Best for</p>
              <p className="text-sm text-fg-body leading-relaxed">
                {tool.bestFor}
              </p>
            </div>
            <div className="horizon-line" />
            <div>
              <p className="label-meta mb-1">Category</p>
              <Link
                to="/categories/$slug"
                params={{ slug: cat.id }}
                className="text-sm text-green hover:underline"
              >
                {cat.name}
              </Link>
            </div>
            <div>
              <p className="label-meta mb-1">Pricing</p>
              <p className="text-sm text-fg-body">
                {PRICING_LABEL[tool.pricing]}
              </p>
            </div>
            <div>
              <p className="label-meta mb-2">Appears in stacks</p>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((r) => (
                  <Link
                    key={r.id}
                    to="/roles/$slug"
                    params={{ slug: r.id }}
                  >
                    <Badge variant="outline" className="hover:border-green">
                      {r.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            <Button asChild className="w-full" size="lg">
              <a href={tool.url} target="_blank" rel="noreferrer">
                Visit site
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </Button>
            <p className="text-[11px] text-fg-faint text-center">
              External link · prototype demo URL
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
