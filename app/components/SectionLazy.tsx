"use client";

import { useVisibility } from "../hooks/useTheme";

/**
 * SectionLazy — Defers rendering of non-critical sections until they're
 * near the viewport. Uses IntersectionObserver with a generous rootMargin
 * so content appears before the user scrolls to it (no visual delay).
 *
 * Props:
 *  - children: the section content (may be null during loading)
 *  - placeholder: optional placeholder height (default: "200px")
 *  - rootMargin: how early to trigger (default: "200px 0px")
 *  - className: optional wrapper class
 *  - as: wrapper element type (default: div)
 */
export default function SectionLazy({
  children,
  placeholder = "200px",
  rootMargin = "200px 0px",
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  placeholder?: string;
  rootMargin?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const [ref, isVisible] = useVisibility(0, rootMargin);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          aria-hidden
          style={{ minHeight: placeholder }}
          className="w-full"
        />
      )}
    </Tag>
  );
}
