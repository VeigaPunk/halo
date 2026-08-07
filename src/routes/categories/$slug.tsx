import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  CATEGORIES,
  getToolsByCategory,
  type CategoryId,
} from "@/data/tools";
import { ToolCard } from "@/components/directory/tool-card";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.id === params.slug);
    if (!cat) throw notFound();
    return {
      category: cat,
      tools: getToolsByCategory(cat.id as CategoryId),
    };
  },
  component: CategoryPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.category.name} — Halo`
          : "Category — Halo",
      },
    ],
  }),
});

function CategoryPage() {
  const { category, tools } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/categories"
        className="inline-flex items-center gap-1.5 text-xs text-fg-subtle hover:text-fg transition-colors"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.75} />
        All categories
      </Link>

      <div className="mt-6 max-w-2xl">
        <p className="label-meta mb-2">Category</p>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">
          {category.name}
        </h1>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed">
          {category.description}
        </p>
        <p className="mt-2 text-xs tabular text-fg-subtle">
          {tools.length} approved {tools.length === 1 ? "tool" : "tools"}
        </p>
      </div>

      {tools.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-xl)] border border-dashed border-border-strong px-6 py-16 text-center">
          <p className="text-sm text-fg-muted">
            No tools approved in this category yet. Empty is honest.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
