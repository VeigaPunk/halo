import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const NAV = [
  { to: "/tools", label: "Tools" },
  { to: "/categories", label: "Categories" },
  { to: "/roles", label: "Roles" },
  { to: "/standard", label: "Standard" },
] as const;

export function SiteHeader({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-[var(--grok-banner-h,0px)] z-40 border-b border-border bg-bg-elevated/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 shrink-0 focus-visible:outline-none"
        >
          <span className="relative flex size-6 items-center justify-center border border-border-strong bg-black">
            <span className="halo-dot !size-1.5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-[0.12em] text-green uppercase">
              Halo
            </span>
            <span className="text-[10px] tracking-[0.14em] text-fg-muted uppercase">
              Horizon
            </span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-[var(--radius-sm)] px-3 py-1.5 text-xs tracking-wide transition-colors",
                  active
                    ? "bg-bg-panel text-green border border-border-strong"
                    : "text-fg-muted hover:text-green border border-transparent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              "hidden sm:flex h-8 items-center gap-2 rounded-[var(--radius-sm)] border border-border-strong",
              "bg-black px-3 text-xs text-fg-muted hover:border-green hover:text-green",
              "transition-colors min-w-[180px]",
            )}
          >
            <Search className="size-3.5 shrink-0" strokeWidth={1.75} />
            <span className="flex-1 text-left">Search tools…</span>
            <kbd className="rounded-[var(--radius-xs)] border border-border bg-bg-panel px-1.5 py-0.5 text-[10px] text-fg-faint">
              /
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden size-9"
            onClick={onOpenSearch}
            aria-label="Search"
          >
            <Search className="size-4" strokeWidth={1.75} />
          </Button>

          <div className="hidden sm:block">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-[var(--radius-sm)] bg-bg-panel" />
            ) : user ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <SignedOut>
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Sign in</Link>
                </Button>
              </SignedOut>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-9"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="size-4" strokeWidth={1.75} />
            ) : (
              <Menu className="size-4" strokeWidth={1.75} />
            )}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg-panel md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-[var(--radius-sm)] px-3 py-3 text-sm text-fg-muted hover:bg-bg-hover hover:text-green"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              {isPending ? null : user ? (
                <div className="flex items-center justify-between px-3">
                  <span className="text-xs text-fg-muted">Account</span>
                  <UserButton />
                </div>
              ) : (
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/login">Sign in</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
