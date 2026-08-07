import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { CommandSearch } from "@/components/directory/command-search";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || t?.isContentEditable) return;
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] flex-col horizon-field">
      <SiteHeader onOpenSearch={openSearch} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} onClose={closeSearch} />
    </div>
  );
}
