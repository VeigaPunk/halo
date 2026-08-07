import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { ArrowRight, Search, Wrench } from "lucide-react";
import { CATEGORIES, searchTools, type Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

export function CommandSearch({
  open,
  onOpenChange,
  onClose,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => searchTools(query).slice(0, 12), [query]);

  if (!open) return null;

  const go = (path: string) => {
    onOpenChange(false);
    void navigate({ to: path });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:pt-[15vh]">
      <button
        type="button"
        className="absolute inset-0 bg-bg/80"
        aria-label="Close search"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg overflow-hidden rounded-[var(--radius-lg)]",
          "border border-border-strong bg-bg-panel shadow-[var(--shadow-device)]",
          "animate-rise",
        )}
      >
        <Command shouldFilter={false} label="Search tools" className="font-mono">
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 text-green shrink-0" strokeWidth={1.75} />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search approved tools…"
              className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-fg-faint outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline rounded-[var(--radius-xs)] border border-border bg-black px-1.5 py-0.5 text-[10px] text-fg-faint">
              esc
            </kbd>
          </div>
          <Command.List className="max-h-[min(360px,50vh)] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-fg-muted">
              No tools match. Halo only lists approved entries.
            </Command.Empty>

            {results.length > 0 && (
              <Command.Group
                heading="Tools"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-fg-muted"
              >
                {results.map((tool: Tool) => {
                  const cat = CATEGORIES.find((c) => c.id === tool.category)!;
                  return (
                    <Command.Item
                      key={tool.id}
                      value={tool.slug}
                      onSelect={() => go(`/tools/${tool.slug}`)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5",
                        "text-sm text-fg-body data-[selected=true]:bg-bg-callout data-[selected=true]:text-fg data-[selected=true]:border data-[selected=true]:border-border-strong",
                      )}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border-strong bg-black">
                        <Wrench className="size-3.5 text-green" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-fg">
                          {tool.name}
                        </span>
                        <span className="block truncate text-xs text-fg-muted">
                          {cat.short} · {tool.tagline}
                        </span>
                      </span>
                      <ArrowRight className="size-3.5 shrink-0 text-fg-faint" />
                    </Command.Item>
                  );
                })}
              </Command.Group>
            )}

            <Command.Group
              heading="Navigate"
              className="mt-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-fg-muted"
            >
              {[
                { label: "All tools", path: "/tools" },
                { label: "Categories", path: "/categories" },
                { label: "Stacks by role", path: "/roles" },
                { label: "Curation standard", path: "/standard" },
              ].map((item) => (
                <Command.Item
                  key={item.path}
                  value={item.path}
                  onSelect={() => go(item.path)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-[var(--radius-sm)] px-3 py-2.5",
                    "text-sm text-fg-body data-[selected=true]:bg-bg-callout data-[selected=true]:text-fg",
                  )}
                >
                  {item.label}
                  <ArrowRight className="size-3.5 text-fg-faint" />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
