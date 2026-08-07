import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Role } from "@/data/tools";
import { cn } from "@/lib/utils";

export function RoleCard({ role, className }: { role: Role; className?: string }) {
  return (
    <Link
      to="/roles/$slug"
      params={{ slug: role.id }}
      className={cn(
        "group surface-card flex flex-col rounded-[var(--radius-lg)] p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-meta mb-1">Stack</p>
          <h3 className="text-base font-semibold text-fg group-hover:text-green transition-colors">
            {role.name}
          </h3>
          <p className="mt-1 text-xs text-fg-muted">{role.tagline}</p>
        </div>
        <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-border-strong text-fg-muted group-hover:border-green group-hover:text-green transition-colors">
          <ArrowRight className="size-3.5" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fg-body">{role.description}</p>
      <p className="mt-4 text-xs tabular text-fg-muted border-t border-border pt-4">
        <span className="text-green">{role.toolIds.length}</span> approved tools in this stack
      </p>
    </Link>
  );
}
