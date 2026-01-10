"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ILLUSTRATION_FOR_PATH } from "@/lib/illustrations";
import { IllustrationBackground } from "@/components/IllustrationBackground";

export function PageShell({
  children,
  illustrationSrc,
}: {
  children: ReactNode;
  illustrationSrc?: string;
}) {
  const pathname = usePathname() || "/";
  const src = illustrationSrc || ILLUSTRATION_FOR_PATH[pathname] || ILLUSTRATION_FOR_PATH["/"];

  return (
    <main className="shell">
      <div className="stage">
        {/* Top illustration slot */}
        <div className="heroArt" data-page={pathname} aria-hidden="true">
          <IllustrationBackground src={src} alt="" />
          <div className="overlay" data-page={pathname}>{children}</div>
        </div>
      </div>
    </main>
  );
}
