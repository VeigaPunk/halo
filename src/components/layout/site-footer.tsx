import { Link } from "@tanstack/react-router";
import { STATS } from "@/data/tools";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-elevated">
      <div className="horizon-line" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="halo-dot" />
              <span className="text-sm font-semibold tracking-[0.12em] uppercase text-green">
                Halo
              </span>
            </div>
            <p className="max-w-xs text-sm text-fg-body leading-relaxed">
              Operator-approved GTM directory. Green console. Horizon Halo
              design language. Only tools that clear the bar.
            </p>
            <p className="text-xs text-fg-muted tabular">
              {STATS.tools} tools · {STATS.categories} categories ·{" "}
              {STATS.independence} independent
            </p>
          </div>

          <div>
            <p className="label-meta mb-3">Directory</p>
            <ul className="space-y-2 text-sm text-fg-body">
              <li>
                <Link to="/tools" className="hover:text-green transition-colors text-fg-body">
                  All tools
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-green transition-colors text-fg-body"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/roles" className="hover:text-green transition-colors text-fg-body">
                  Stacks by role
                </Link>
              </li>
              <li>
                <Link
                  to="/standard"
                  className="hover:text-green transition-colors text-fg-body"
                >
                  Curation standard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-meta mb-3">Account</p>
            <ul className="space-y-2 text-sm text-fg-body">
              <li>
                <Link to="/login" className="hover:text-green transition-colors text-fg-body">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-meta mb-3">Design language</p>
            <p className="text-sm text-fg-body leading-relaxed">
              Horizon Halo — green console, JetBrains Mono NL, flat surfaces,
              peripheral confidence glow. From the comma design lineage.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} Halo · Horizon Halo · JetBrains Mono NL
          </p>
          <p className="text-xs text-fg-faint">
            Prototype · operator-curated only
          </p>
        </div>
      </div>
    </footer>
  );
}
