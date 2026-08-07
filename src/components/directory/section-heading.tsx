import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl space-y-2">
        {eyebrow && <p className="label-meta text-green">{eyebrow}</p>}
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-fg-body leading-relaxed">{description}</p>
        )}
      </div>
      {href && linkLabel && (
        <a
          href={href}
          className="inline-flex items-center gap-1.5 text-xs text-green hover:underline shrink-0"
        >
          {linkLabel}
          <ArrowRight className="size-3.5" strokeWidth={1.75} />
        </a>
      )}
    </div>
  );
}
