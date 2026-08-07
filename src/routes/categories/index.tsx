import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, countByCategory } from "@/data/tools";
import { CategoryCard } from "@/components/directory/category-card";

export const Route = createFileRoute("/categories/")({
  component: CategoriesPage,
  head: () => ({
    meta: [{ title: "Categories — Halo" }],
  }),
});

function CategoriesPage() {
  const counts = countByCategory();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="label-meta mb-2">Browse</p>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">
          Categories
        </h1>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed">
          Fourteen GTM surfaces. Halo only lists categories that contain
          operator-approved tools — empty shelves stay empty.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            count={counts[cat.id]}
          />
        ))}
      </div>
    </div>
  );
}
