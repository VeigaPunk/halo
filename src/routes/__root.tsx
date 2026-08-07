import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { CreatedWithGrokBanner } from "@/components/created-with-grok-banner";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";

const APP_NAME = "Halo — Operator-Approved GTM Tools";
const APP_DESCRIPTION =
  "The curated GTM directory. Only tools the operator has built and proven. Horizon Halo design language.";

const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host
  ? `https://og.grok.me/v1/card.png?host=${encodeURIComponent(host)}&title=${encodeURIComponent("Halo")}&subtitle=${encodeURIComponent("Operator-approved GTM tools")}`
  : undefined;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { name: "theme-color", content: "#07080b" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:title", content: APP_NAME },
            { property: "og:description", content: APP_DESCRIPTION },
          ]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <CreatedWithGrokBanner />
        <AuthProvider>
          <SiteShell>
            <Outlet />
          </SiteShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <span className="halo-dot mb-4" />
      <p className="label-meta mb-2">404</p>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">
        Not on the stack
      </h1>
      <p className="mt-3 text-sm text-fg-muted leading-relaxed">
        This page is not part of Halo. It may never have been approved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Return home</Link>
      </Button>
    </div>
  );
}
