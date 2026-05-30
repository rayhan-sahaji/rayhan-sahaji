import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      gsap.set(dotRef.current, { x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      gsap.set(ringRef.current, { x: pos.current.x, y: pos.current.y });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[data-cursor-hover]")
      ) {
        gsap.to(ringRef.current, {
          scale: 2.5,
          borderColor: "rgba(0,255,102,0.5)",
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[data-cursor-hover]")
      ) {
        gsap.to(ringRef.current, {
          scale: 1,
          borderColor: "rgba(255,255,255,0.2)",
          duration: 0.3,
        });
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, [isVisible]);

  if (window.matchMedia("(max-width: 768px)").matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
