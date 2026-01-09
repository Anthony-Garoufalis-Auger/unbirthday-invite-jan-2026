"use client";

/**
 * PageShell (overlay mode)
 * - Constrains width to illustration width.
 * - Renders the illustration as the base layer.
 * - Overlays a content area on top, anchored to the lower half.
 */

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ILLUSTRATION_FOR_PATH } from "@/lib/illustrations";
import { IllustrationBackground } from "@/components/IllustrationBackground";

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const src = ILLUSTRATION_FOR_PATH[pathname] || ILLUSTRATION_FOR_PATH["/"];

  return (
    <main className="shell">
      <div className="stage">
        {/* Base illustration (non-interactive) */}
        <IllustrationBackground src={src} alt="" />

        {/* Overlayed content (interactive) */}
        <div className="overlay">{children}</div>
      </div>
    </main>
  );
}

