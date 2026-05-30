import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useScrollPosition } from "../hooks/useScrollPosition";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollPosition();
  const docHeight = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    docHeight.current = document.documentElement.scrollHeight - window.innerHeight;
  }, []);

  useEffect(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (!barRef.current || !dotRef.current || docHeight.current <= 0) {
          ticking.current = false;
          return;
        }
        const progress = Math.min(scrollY / docHeight.current, 1);
        gsap.set(barRef.current, { scaleY: progress });
        gsap.set(dotRef.current, { top: `${progress * 100}%` });
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [scrollY]);

  useEffect(() => {
    const onResize = () => {
      docHeight.current = document.documentElement.scrollHeight - window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fixed right-3 top-0 z-50 hidden h-screen w-[3px] md:block">
      <div className="mx-auto h-full w-full bg-border/30">
        <div
          ref={barRef}
          className="w-full origin-top bg-gradient-to-b from-accent/40 to-accent"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
      </div>
      <div
        ref={dotRef}
        className="absolute -left-[3px] top-0 h-[9px] w-[9px] rounded-full border-2 border-accent bg-bg shadow-[0_0_10px_rgba(0,255,102,0.4)]"
        style={{ transform: "translateY(-50%)" }}
      />
    </div>
  );
}
