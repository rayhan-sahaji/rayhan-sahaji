import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

import HeroImg from "../assets/Hero.png";

const HEADLINE_FIRST = "Building";
const HEADLINE_SECOND = "Digital";
const HEADLINE_THIRD = "Architectures.";

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="heroGrid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
      </svg>

      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/[0.02] blur-[120px]" />
      <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/[0.015] blur-[100px]" />

      <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
          <span>01 — Frontend</span>
          <span>02 — Backend</span>
          <span>03 — Database</span>
          <span>04 — DevOps</span>
        </div>
      </div>
    </div>
  );
}

function FloatingTag({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-[10px] tracking-wider text-text-muted backdrop-blur-sm ${className}`}
    >
      {text}
    </span>
  );
}

function PhotoCard() {
  return (
    <div className="hero-photo relative mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-none">
      {/* Corner marks */}
      <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-accent/50" />
      <div className="absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-accent/50" />
      <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-accent/50" />
      <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-accent/50" />

      {/* Photo frame */}
      <div className="relative overflow-hidden rounded-sm border border-border bg-surface">
        <div className="aspect-[3/4] w-full">
          <img
            src={HeroImg}
            alt="Rayhan Sahaji"
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Floating label */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border bg-bg px-4 py-1.5 backdrop-blur-md">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted">
          Frontend & Full-Stack Developer
        </span>
      </div>

      {/* Status dot */}
      <div className="absolute -right-2 top-6 flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-text-muted">
          Available
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    spotlight.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY - window.scrollY}px, rgba(0,255,102,0.04), transparent 50%)`;
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      )
        .fromTo(
          line1Ref.current,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.4"
        )
        .fromTo(
          line2Ref.current,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.9"
        )
        .fromTo(
          line3Ref.current,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.9"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-tag",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(
          ".hero-photo",
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-about",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-side-text",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-32 pb-16 md:px-12 md:pt-28"
    >
      <GridBackground />

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Two column layout */}
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8">
            {/* Left - Text */}
            <div>
              <div className="hero-label mb-8 inline-flex items-center gap-3 rounded-full border border-border px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
                  Available for new projects
                </span>
              </div>

              <div className="space-y-1 md:space-y-2">
                <div ref={line1Ref} className="overflow-hidden">
                  <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] xl:text-[clamp(3rem,10vw,8.5rem)]">
                    {HEADLINE_FIRST}
                  </h1>
                </div>
                <div ref={line2Ref} className="overflow-hidden">
                  <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] text-stroke xl:text-[clamp(3rem,10vw,8.5rem)]">
                    {HEADLINE_SECOND}
                  </h1>
                </div>
                <div ref={line3Ref} className="overflow-hidden">
                  <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] xl:text-[clamp(3rem,10vw,8.5rem)]">
                    {HEADLINE_THIRD}
                  </h1>
                </div>
              </div>

              <div className="hero-desc mt-10 flex flex-col gap-6 md:mt-12 md:max-w-md md:flex-row md:items-start md:gap-10">
                <div className="h-px w-12 bg-border md:mt-2" />
                <p className="text-sm leading-relaxed text-text-dim md:text-base">
                  Full-stack developer crafting performant, scalable digital
                  products with modern architectures and meticulous attention to
                  detail.
                </p>
              </div>

              <div className="hero-ctas mt-10 flex flex-col gap-4 sm:flex-row md:mt-12">
                <a
                  href="#projects"
                  data-cursor-hover
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-bg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,102,0.2)]"
                >
                  View Work
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 13L13 1M13 1H5M13 1V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
                <a
                  href="#contact"
                  data-cursor-hover
                  className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-text-dim transition-all duration-300 hover:border-border-hover hover:text-text"
                >
                  Get in Touch
                </a>
              </div>

              <div className="hero-tag mt-10 flex flex-wrap gap-2 md:mt-12">
                <FloatingTag text="React" />
                <FloatingTag text="TypeScript" />
                <FloatingTag text="Next.js" />
                <FloatingTag text="Node.js" />
                <FloatingTag text="MongoDB" />
                <FloatingTag text="GSAP" />
              </div>
            </div>

            {/* Right - Photo */}
            <div className="hidden lg:block">
              <PhotoCard />
            </div>
          </div>

          {/* About */}
          <div id="about" className="hero-about mt-16 border-t border-border pt-10 md:mt-24">
            <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-16">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  About Me
                </span>
              </div>
              <div className="max-w-2xl space-y-5">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                  I'm <span className="text-accent">Rayhan Sahaji</span>, a
                  full-stack web developer passionate about building clean,
                  scalable, and high-performance digital experiences.
                </h3>
                <p className="text-base leading-relaxed text-text-dim md:text-lg">
                  I specialize in the React ecosystem and love working across
                  the entire stack — from pixel-perfect frontends to robust
                  backend APIs. With a focus on modern architectures and
                  developer experience, I build products that are not only
                  functional but a pleasure to use and maintain.
                </p>
                <p className="text-base leading-relaxed text-text-dim md:text-lg">
                  Every project is an opportunity to push boundaries and refine
                  my craft. Based in Chattogram, Bangladesh — available for
                  remote work worldwide.
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                      <span className="font-mono text-xs text-accent">3+</span>
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        Years
                      </span>
                      <span className="text-xs text-text-dim">Experience</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                      <span className="font-mono text-xs text-accent">20+</span>
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        Projects
                      </span>
                      <span className="text-xs text-text-dim">Delivered</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                      <span className="font-mono text-xs text-accent">15+</span>
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        Tech
                      </span>
                      <span className="text-xs text-text-dim">Stack</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-6 flex items-center gap-3 md:bottom-12 md:left-12">
        <div className="h-10 w-px bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
          Scroll
        </span>
      </div>

      <div className="hero-side-text absolute bottom-8 right-6 hidden flex-col items-end gap-2 md:bottom-12 md:right-12 lg:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
          Frontend & Full-Stack Developer
        </span>
        <div className="flex gap-4">
          <a
            href="#"
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="#"
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
