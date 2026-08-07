import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/tools";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  count,
  className,
}: {
  category: Category;
  count: number;
  className?: string;
}) {
  return (
    <Link
      to="/categories/$slug"
      params={{ slug: category.id }}
      className={cn(
        "group surface-card flex flex-col rounded-[var(--radius-lg)] p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-fg group-hover:text-green transition-colors">
          {category.name}
        </h3>
        <ArrowRight className="size-3.5 shrink-0 text-fg-faint transition-transform group-hover:translate-x-0.5 group-hover:text-green" />
      </div>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-fg-body">
        {category.description}
      </p>
      <p className="mt-3 text-xs tabular text-fg-muted">
        <span className="text-green">{count}</span>{" "}
        {count === 1 ? "tool" : "tools"} approved
      </p>
    </Link>
  );
}
