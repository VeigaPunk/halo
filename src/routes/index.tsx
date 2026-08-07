import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import {
  CATEGORIES,
  ROLES,
  TOOLS,
  countByCategory,
} from "@/data/tools";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/directory/tool-card";
import { CategoryCard } from "@/components/directory/category-card";
import { RoleCard } from "@/components/directory/role-card";
import { SectionHeading } from "@/components/directory/section-heading";
import { StatStrip } from "@/components/directory/stat-strip";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const counts = countByCategory();
  const flagship = TOOLS.filter((t) => t.status === "flagship");
  const recent = TOOLS.filter((t) => t.status === "new" || t.yearBuilt >= 2025);
  const categoriesWithTools = CATEGORIES.filter((c) => counts[c.id] > 0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Peripheral Horizon Halo edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(var(--color-green), transparent) top / 100% 10px no-repeat, linear-gradient(transparent, var(--color-green)) bottom / 100% 10px no-repeat",
            opacity: 0.12,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 64px color-mix(in srgb, var(--color-green) 10%, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="animate-rise mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 hh-chip text-fg-body">
              <span className="halo-dot !size-1.5" />
              <span>100% independent · operator-approved only</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              <span className="block">Every tool that earned</span>
              <span className="shimmer-text">a seat on the stack</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-fg-body sm:text-base">
              Halo is a curated GTM directory — not a catalog of everything.
              Only tools I have built and proven in real pipeline. Same
              essence as a full GTM atlas; zero filler.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/tools">
                  Browse approved tools
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/roles">Build your stack by role</Link>
              </Button>
            </div>
          </div>

          <div className="animate-rise stagger-2 mt-14">
            <StatStrip />
          </div>
        </div>
        <div className="horizon-line" />
      </section>

      {/* Standard callout */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Built or battle-tested",
                body: "Every listing is something I created or ran in production long enough to trust.",
              },
              {
                icon: CheckCircle2,
                title: "No paid placements",
                body: "Zero affiliate links. Zero sponsored tiles. Curation is the product.",
              },
              {
                icon: FileText,
                title: "Operator notes",
                body: "Each tool carries a plain-language note on why it earned approval — not marketing copy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="surface-panel rounded-[var(--radius-lg)] p-5"
              >
                <item.icon
                  className="size-5 text-green"
                  strokeWidth={1.5}
                />
                <h3 className="mt-3 text-sm font-semibold text-fg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-body">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Browse"
            title="By category"
            description="Fourteen GTM surfaces. Only categories with approved tools are active — empty noise stays out."
            href="/categories"
            linkLabel="All categories"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithTools.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                count={counts[cat.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Personas"
            title="Tools by role"
            description="Curated stacks for the people who actually run go-to-market — not generic buyer personas."
            href="/roles"
            linkLabel="All role stacks"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      </section>

      {/* Flagship / Editor's picks */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Operator picks"
            title="Flagship tools"
            description="The highest bar in Halo. These are the systems I would rebuild from zero if the rest of the stack burned down."
            href="/tools"
            linkLabel="View all tools"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {flagship.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Recently added */}
      {recent.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <SectionHeading
              eyebrow="Fresh"
              title="Recently approved"
              description="New entries that cleared the curation standard this cycle."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border-strong bg-bg-panel px-6 py-12 text-center sm:px-12 hh-edge-halo">
            <div className="relative">
              <p className="label-meta mb-3 text-green">The standard</p>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Not everything deserves a listing
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-fg-body leading-relaxed">
                Halo rejects more tools than it accepts. Read the curation
                standard to understand the bar — then explore the stacks that
                made it.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/standard">
                    Read the standard
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/tools">Explore tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
