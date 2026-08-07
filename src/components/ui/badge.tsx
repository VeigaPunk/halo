import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-2 py-0.5 text-[0.7rem] font-medium tracking-wide font-mono whitespace-nowrap uppercase",
  {
    variants: {
      variant: {
        default: "border-border-strong bg-bg-panel text-fg-muted",
        accent: "border-green bg-black text-green",
        success: "border-green bg-green text-accent-fg font-bold",
        warn: "border-amber bg-[color-mix(in_srgb,var(--color-amber)_12%,transparent)] text-amber",
        flagship:
          "border-green bg-green text-accent-fg font-bold",
        outline: "border-border-strong bg-black text-fg-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
