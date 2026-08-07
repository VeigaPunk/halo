import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign in — Halo" }],
  }),
});

function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-[var(--radius-2xl)] border border-border-strong bg-bg-elevated p-8 shadow-[var(--shadow-halo)]">
        <div className="mb-6 flex items-center gap-2">
          <span className="halo-dot" />
          <span className="text-sm font-semibold tracking-[0.14em] uppercase">
            Halo
          </span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-fg">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-fg-muted leading-relaxed">
          Operator access for the Halo directory. Public browsing needs no
          account.
        </p>

        <div className="mt-8 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                size="lg"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-fg-subtle">Sign-in is disabled.</p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-fg-faint">
          <Link to="/" className="hover:text-fg-muted transition-colors">
            ← Back to directory
          </Link>
        </p>
      </div>
    </div>
  );
}
