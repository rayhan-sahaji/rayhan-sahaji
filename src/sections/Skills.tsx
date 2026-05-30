import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools";
}

const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 96, category: "frontend" },
  { name: "HTML5 / CSS3", level: 98, category: "frontend" },
  { name: "JavaScript ES6+", level: 94, category: "frontend" },
  { name: "GSAP / Framer Motion", level: 88, category: "frontend" },
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express.js", level: 88, category: "backend" },
  { name: "MongoDB / Mongoose", level: 87, category: "backend" },
  { name: "REST APIs / GraphQL", level: 85, category: "backend" },
  { name: "Git / GitHub", level: 92, category: "tools" },
  { name: "Docker", level: 78, category: "tools" },
  { name: "Figma / Design Systems", level: 82, category: "tools" },
  { name: "Clerk / Better Auth", level: 80, category: "tools" },
];

const CATEGORIES = [
  {
    key: "frontend" as const,
    label: "Frontend",
    description: "UI frameworks, styling, and client-side architecture",
  },
  {
    key: "backend" as const,
    label: "Backend",
    description: "Server runtime, APIs, and database management",
  },
  {
    key: "tools" as const,
    label: "Tools & DevOps",
    description: "Version control, deployment, and design tooling",
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${skill.level}%`,
          duration: 1.4,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [skill.level, delay]);

  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-text transition-colors duration-300 group-hover:text-accent">
          {skill.name}
        </span>
        <span className="font-mono text-[10px] text-text-muted">
          {skill.level}%
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface-3">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".skill-category",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="skills-header mb-16 md:mb-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Expertise
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Skills &<br />
            <span className="text-text-dim">Proficiency</span>
          </h2>
        </div>

        <div className="skills-grid grid gap-12 md:grid-cols-3 md:gap-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="skill-category space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {cat.label}
                </h3>
                <p className="font-mono text-[10px] leading-relaxed text-text-muted">
                  {cat.description}
                </p>
              </div>
              <div className="space-y-5">
                {SKILLS.filter((s) => s.category === cat.key).map(
                  (skill, i) => (
                    <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
