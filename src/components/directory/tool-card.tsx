import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Plug } from "lucide-react";
import {
  CATEGORIES,
  PRICING_LABEL,
  type Tool,
} from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ToolCard({
  tool,
  className,
  featured,
}: {
  tool: Tool;
  className?: string;
  featured?: boolean;
}) {
  const cat = CATEGORIES.find((c) => c.id === tool.category)!;

  return (
    <Link
      to="/tools/$slug"
      params={{ slug: tool.slug }}
      className={cn(
        "group surface-card flex flex-col rounded-[var(--radius-lg)] p-5",
        featured && "sm:col-span-2 lg:col-span-1",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-fg group-hover:text-green transition-colors">
              {tool.name}
            </h3>
            {tool.status === "flagship" && (
              <Badge variant="flagship">Flagship</Badge>
            )}
            {tool.status === "new" && <Badge variant="accent">New</Badge>}
          </div>
          <p className="mt-1 text-xs text-fg-muted">
            {cat.name}
            <span className="mx-1.5 text-fg-faint">·</span>
            {PRICING_LABEL[tool.pricing]}
          </p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border-strong text-fg-muted transition-colors group-hover:border-green group-hover:text-green">
          <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-body">
        {tool.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        {tool.hasApi && (
          <Badge variant="outline">
            <Plug className="size-3" strokeWidth={1.75} />
            API
          </Badge>
        )}
        {tool.hasMcp && (
          <Badge variant="outline">
            <Code2 className="size-3" strokeWidth={1.75} />
            MCP
          </Badge>
        )}
        <span className="ml-auto text-[11px] text-fg-faint truncate max-w-[50%]">
          Best for {tool.bestFor.split(" ").slice(0, 4).join(" ")}…
        </span>
      </div>
    </Link>
  );
}
