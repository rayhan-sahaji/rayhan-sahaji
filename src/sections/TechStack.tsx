import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeItem, { type TechItem } from "../components/MarqueeItem";

gsap.registerPlugin(ScrollTrigger);

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l1.5 16L12 22l6.5-2L20 4H4z" />
    <path d="M8 8h8l-.5 5H9l.2 3" />
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 15c0 1.5 1 2 2 2s2-.5 2-2V9h3" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9c2-2 4-2 6 0s4 2 6 0" />
    <path d="M6 15c2-2 4-2 6 0s4 2 6 0" />
  </svg>
);

const TsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 11h8" />
    <path d="M12 11v7" />
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 15V9l7 6" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
    <path d="M12 22V12" />
    <path d="M21 7l-9 5" />
    <path d="M3 7l9 5" />
  </svg>
);

const ExpressIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z" />
    <path d="M9 9l3 3-3 3" />
    <path d="M14 15h3" />
  </svg>
);

const ROW_1: TechItem[] = [
  { name: "HTML5", icon: <HtmlIcon /> },
  { name: "CSS3", icon: <CssIcon /> },
  { name: "JavaScript ES6", icon: <JsIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "Tailwind CSS", icon: <TailwindIcon /> },
  { name: "TypeScript", icon: <TsIcon /> },
  { name: "Next.js", icon: <NextjsIcon /> },
  { name: "Node.js", icon: <NodeIcon /> },
  { name: "Express.js", icon: <ExpressIcon /> },
];

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 6 6 10 6 14a6 6 0 1012 0c0-4-2-8-6-12z" />
  </svg>
);

const MongooseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V6l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const HeroUiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <line x1="12" y1="22" x2="12" y2="15.5" />
    <polyline points="22 8.5 12 15.5 2 8.5" />
  </svg>
);

const ShadcnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const FramerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h14v6H5z" />
    <path d="M5 9h7l7 6H5z" />
    <path d="M5 15l7 6V15z" />
  </svg>
);

const GsapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12a4 4 0 018 0" />
    <path d="M8 12a4 4 0 008 0" />
  </svg>
);

const AuthIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

const OauthIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ClerkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const ROW_2: TechItem[] = [
  { name: "MongoDB", icon: <MongoIcon /> },
  { name: "Mongoose", icon: <MongooseIcon /> },
  { name: "Hero UI", icon: <HeroUiIcon /> },
  { name: "ShadCN", icon: <ShadcnIcon /> },
  { name: "Framer Motion", icon: <FramerIcon /> },
  { name: "GSAP", icon: <GsapIcon /> },
  { name: "Better Auth", icon: <AuthIcon /> },
  { name: "OAuth", icon: <OauthIcon /> },
  { name: "Clerk", icon: <ClerkIcon /> },
];

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "15+", label: "Technologies" },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stack-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="stack-header mb-16 md:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Capabilities
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Tech Stack &<br />
            <span className="text-text-dim">Core Technologies</span>
          </h2>
        </div>

        <div className="stats-grid mb-16 grid grid-cols-3 gap-6 md:mb-24 md:max-w-lg">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="mb-1 font-display text-3xl font-bold tracking-tight text-accent md:text-4xl">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <MarqueeItem items={ROW_1} speed={30} direction="left" />
          <MarqueeItem items={ROW_2} speed={24} direction="right" />
        </div>

        <div className="mt-16 flex items-center gap-4 md:mt-24">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-muted">
            Always learning
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
}
