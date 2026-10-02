---
name: turnstile-spin
description: "Set up Cloudflare Turnstile end-to-end in a project. Scan the codebase, create or integrate the widget via Cloudflare Turnstile, embed it where user requests need bot verification, wire canonical server-side siteverify in the existing backend, validate, and persist the skill."
metadata:
  author: cloudflare
  version: "1.0.0"
---

# Turnstile Spin Skill

Turns the prompt "set up Turnstile" into a working end-to-end integration: a widget, frontend snippets at every chosen insertion point, canonical server-side siteverify in the customer's existing backend, and a real validation pass before reporting success.

## Canonical Server-Side Siteverify (Next.js / Node)

```ts
const expectedAction = "guestbook";
const expectedHostnames = new Set(
  (
    process.env.TURNSTILE_HOSTNAMES ??
    (process.env.NODE_ENV === "production"
      ? "boyaghnia.web.id"
      : "localhost,127.0.0.1,boyaghnia.web.id")
  )
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean)
);

if (
  typeof token !== "string" ||
  token.length === 0 ||
  token.length > 2048 ||
  expectedHostnames.size === 0
) {
  return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
}

let result;
try {
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    signal: AbortSignal.timeout(10_000),
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET || "",
      response: token,
      remoteip: clientIp,
    }),
  });
  if (!r.ok) throw new Error(`siteverify ${r.status}`);
  result = await r.json();
} catch {
  return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
}

if (
  !result.success ||
  result.action !== expectedAction ||
  !expectedHostnames.has(result.hostname)
) {
  return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
}
```

## Explicit Rendering in React / Next.js

Single-page apps and AJAX forms must render explicitly, retain the widget ID, and call `window.turnstile.reset(widgetId)` after submission to allow re-submission.
