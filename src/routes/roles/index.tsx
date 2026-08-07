import { createFileRoute } from "@tanstack/react-router";
import { ROLES } from "@/data/tools";
import { RoleCard } from "@/components/directory/role-card";

export const Route = createFileRoute("/roles/")({
  component: RolesPage,
  head: () => ({
    meta: [{ title: "Role stacks — Halo" }],
  }),
});

function RolesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="label-meta mb-2">Personas</p>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">
          Tools by role
        </h1>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed">
          Curated stacks for the people who run go-to-market. Each stack is a
          shortlist — not a dumping ground — of tools that fit how that role
          actually works.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
