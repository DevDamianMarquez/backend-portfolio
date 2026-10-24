"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the address is still selectable on screen.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-line px-3.5 py-2 text-sm transition hover:border-accent"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
