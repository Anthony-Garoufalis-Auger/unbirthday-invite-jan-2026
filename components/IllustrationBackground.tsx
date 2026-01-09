"use client";

/**
 * IllustrationBackground (layout-safe)
 * - Renders the illustration as a normal block-level image.
 * - This makes the image define the layout width/height so content can’t “spill past” it.
 * - No absolute positioning, no z-index tricks, no click-blocking overlays.
 */

export function IllustrationBackground({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return <img className="illustration" src={src} alt={alt} />;
}

