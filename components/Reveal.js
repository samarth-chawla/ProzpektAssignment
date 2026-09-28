"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight scroll reveal: single IntersectionObserver, no scroll
// listeners, fires immediately on entry (no scroll delay). Animates only
// opacity + transform so it stays on the compositor thread.
export default function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const ref = useRef(null);
  // Always start hidden on both server and client (no hydration mismatch),
  // then reveal on entry. The no-IntersectionObserver fallback runs async.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
