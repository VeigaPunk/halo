import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ROLES, getToolsByRole, type RoleId } from "@/data/tools";
import { ToolCard } from "@/components/directory/tool-card";

export const Route = createFileRoute("/roles/$slug")({
  loader: ({ params }) => {
    const role = ROLES.find((r) => r.id === params.slug);
    if (!role) throw notFound();
    return {
      role,
      tools: getToolsByRole(role.id as RoleId),
    };
  },
  component: RolePage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.role.name} stack — Halo`
          : "Role stack — Halo",
      },
    ],
  }),
});

function RolePage() {
  const { role, tools } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/roles"
        className="inline-flex items-center gap-1.5 text-xs text-fg-subtle hover:text-fg transition-colors"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.75} />
        All role stacks
      </Link>

      <div className="mt-6 max-w-2xl">
        <p className="label-meta mb-2">Role stack</p>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">
          {role.name}
        </h1>
        <p className="mt-1 text-sm text-fg-subtle">{role.tagline}</p>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed">
          {role.description}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
