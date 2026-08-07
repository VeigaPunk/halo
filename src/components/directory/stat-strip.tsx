import { STATS } from "@/data/tools";
import { cn } from "@/lib/utils";

const items = [
  { label: "Approved tools", value: String(STATS.tools) },
  { label: "Categories", value: String(STATS.categories) },
  { label: "Role stacks", value: String(STATS.roles) },
  { label: "Flagship", value: String(STATS.flagship) },
  { label: "Independence", value: STATS.independence },
];

export function StatStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-border-strong sm:grid-cols-5",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 bg-bg-panel px-4 py-4 sm:px-5 sm:py-5"
        >
          <span className="text-xl sm:text-2xl font-semibold tabular text-green tracking-tight">
            {item.value}
          </span>
          <span className="text-[0.62rem] tracking-[0.08em] text-fg-muted uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
