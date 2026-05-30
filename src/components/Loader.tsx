import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2.5;
    const obj = { val: 0 };

    const countTween = gsap.to(obj, {
      val: 100,
      duration,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.floor(obj.val)),
    });

    const barTween = gsap.to(barRef.current, {
      width: "100%",
      duration,
      ease: "power2.inOut",
    });

    const exitTl = gsap.timeline({
      delay: duration + 0.3,
      onComplete: () => onComplete(),
    });

    exitTl
      .to(counterRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        ".loader-bar-wrap",
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      )
      .to(
        ".loader-label",
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });

    return () => {
      countTween.kill();
      barTween.kill();
      exitTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loaderGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loaderGrid)" />
        </svg>
      </div>

      <div className="absolute h-[400px] w-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />

      <div className="relative flex flex-col items-center gap-10">
        <div className="loader-label flex items-center gap-3">
          <span className="font-display text-xl font-black italic tracking-[-0.02em] text-text">
            Rayhan
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-text-muted">
            Sahaji
          </span>
        </div>

        <div ref={counterRef} className="relative">
          <span className="font-display text-[80px] font-black tracking-[-0.06em] text-text sm:text-[120px] md:text-[160px]">
            {String(count).padStart(3, "0")}
          </span>
          <span className="absolute right-0 top-2 font-mono text-xs text-accent/60">
            %
          </span>
        </div>

        <div className="loader-bar-wrap w-[200px] sm:w-[280px]">
          <div className="loader-label mb-3 h-px w-full overflow-hidden bg-border">
            <div
              ref={barRef}
              className="h-full bg-gradient-to-r from-accent/40 to-accent"
              style={{ width: "0%" }}
            />
          </div>
          <div className="loader-label flex justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
            <span>Loading</span>
            <span>Experience</span>
          </div>
        </div>
      </div>

      <div className="absolute left-8 top-8 h-8 w-8 border-l border-t border-border/30" />
      <div className="absolute right-8 top-8 h-8 w-8 border-r border-t border-border/30" />
      <div className="absolute bottom-8 left-8 h-8 w-8 border-b border-l border-border/30" />
      <div className="absolute bottom-8 right-8 h-8 w-8 border-b border-r border-border/30" />
    </div>
  );
}
