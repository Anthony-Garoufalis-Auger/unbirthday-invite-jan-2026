"use client";

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
        {/* Top illustration slot */}
        <div className="heroArt" aria-hidden="true">
          <IllustrationBackground src={src} alt="" />
          <div className="overlay">{children}</div>
        </div>
      </div>
    </main>
  );
}
