import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ban, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/standard")({
  component: StandardPage,
  head: () => ({
    meta: [{ title: "Curation standard — Halo" }],
  }),
});

const MUST = [
  "I have built it, or run it in production long enough to trust the failure modes.",
  "It solves a real GTM job with measurable impact on pipeline, efficiency, or truth.",
  "It has a clear owner surface — docs, API, or ops path — not just a landing page.",
  "It can be explained in plain language without vendor mythology.",
  "It survives a week of real use without constant babysitting.",
];

const WONT = [
  "Paid placement, affiliate, or sponsored listing of any kind.",
  "Tools I have only seen in a demo or launch thread.",
  "Category fillers to look comprehensive.",
  "Tools that optimize vanity metrics over revenue outcomes.",
  "Anything I would not put on a stack for my own team.",
];

function StandardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="label-meta mb-2 text-green">Editorial</p>
      <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        The Halo standard
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-fg-body sm:text-base">
        Halo is not a marketplace and not a complete atlas of every GTM tool.
        It is a shortlist of systems I have created and proven — the ones I
        know are good for sure. This page is the bar.
      </p>

      <div className="horizon-line my-10" />

      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-green">
          <Check className="size-5" strokeWidth={1.75} />
          Must be true
        </h2>
        <ul className="mt-5 space-y-3">
          {MUST.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[var(--radius-md)] border border-border bg-bg-elevated px-4 py-3 text-sm text-fg-body leading-relaxed"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green shadow-[0_0_6px_var(--color-green)]" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-fg">
          <Ban className="size-5 text-red" strokeWidth={1.75} />
          Will not ship
        </h2>
        <ul className="mt-5 space-y-3">
          {WONT.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[var(--radius-md)] border border-border bg-bg-elevated px-4 py-3 text-sm text-fg-body leading-relaxed"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 hh-callout rounded-r-[var(--radius-lg)] border border-border border-l-0 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-fg">Independence</h2>
        <p className="mt-3 text-sm text-fg-body leading-relaxed">
          Halo is 100% independent. There are no advertising relationships on
          listings. Operator notes are first-person assessments, not press
          releases. If a tool falls below the standard, it is removed — even if
          it was flagship last quarter.
        </p>
        <p className="mt-3 text-sm text-fg-body leading-relaxed">
          This prototype ships with a seed set of operator-built tools so you
          can feel the information architecture. Replace entries with your own
          proven systems when ready.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/tools">
              Browse tools
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
