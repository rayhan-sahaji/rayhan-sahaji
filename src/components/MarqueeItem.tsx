import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface MarqueeItemProps {
  items: TechItem[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export default function MarqueeItem({
  items,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
}: MarqueeItemProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: direction === "left" ? -totalWidth : totalWidth,
        duration: totalWidth / speed,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, [direction, speed]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.1, duration: 0.8, ease: "power3.out" });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power3.out" });
    }
  };

  const content = items.map((item) => (
    <div
      key={item.name}
      className="mx-3 flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-border bg-surface/50 px-6 py-2.5 transition-all duration-500 hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(0,255,102,0.06)] md:mx-5 md:px-8 md:py-3"
    >
      <span className="flex h-5 w-5 items-center justify-center text-accent/70 transition-colors duration-300 hover:text-accent [&>svg]:h-4 [&>svg]:w-4 md:[&>svg]:h-5 md:[&>svg]:w-5">
        {item.icon}
      </span>
      <span className="font-mono text-xs tracking-wider text-text-dim transition-colors duration-300 hover:text-accent md:text-sm">
        {item.name}
      </span>
    </div>
  ));

  return (
    <div
      className="overflow-hidden py-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex w-max items-center">
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
      </div>
    </div>
  );
}
