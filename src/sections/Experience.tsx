import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  current?: boolean;
}

const EXPERIENCE: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Full-Stack Developer",
    company: "Freelance / Contract",
    location: "Remote",
    description:
      "Building scalable web applications for clients across e-commerce, SaaS, and fintech. Leading end-to-end development from architecture to deployment.",
    highlights: [
      "Delivered 10+ production applications",
      "Reduced load times by 60% through optimization",
      "Implemented real-time features with WebSockets",
    ],
    current: true,
  },
  {
    period: "2023 — 2024",
    role: "Frontend Developer",
    company: "Tech Startup",
    location: "Bangalore, India",
    description:
      "Developed and maintained the core React application serving 50K+ users. Built component libraries and improved CI/CD pipelines.",
    highlights: [
      "Built reusable component library with 40+ components",
      "Improved test coverage from 30% to 85%",
      "Mentored 2 junior developers",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Junior Developer",
    company: "Digital Agency",
    location: "Bangalore, India",
    description:
      "Contributed to client projects ranging from corporate websites to interactive web applications. Gained deep experience in modern JavaScript frameworks.",
    highlights: [
      "Developed 15+ responsive client websites",
      "Integrated third-party APIs and payment gateways",
      "Achieved 95+ Lighthouse scores on all projects",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Web Development Intern",
    company: "Learning & open-source",
    location: "Remote",
    description:
      "Started the journey with self-learning and open-source contributions. Built foundational skills in HTML, CSS, JavaScript, and React.",
    highlights: [
      "Completed 200+ hours of structured learning",
      "Contributed to 3 open-source projects",
      "Built 5+ personal projects to solidify skills",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".exp-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-timeline",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".exp-timeline",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="exp-header mb-16 md:mb-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Journey
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Work<br />
            <span className="text-text-dim">Experience</span>
          </h2>
        </div>

        <div className="exp-timeline relative">
          <div className="absolute left-[19px] top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px">
            <div className="timeline-line h-full w-full bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />
          </div>

          <div className="space-y-12">
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.period}
                className={`exp-item relative flex flex-col gap-6 md:flex-row md:items-start ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`absolute left-[15px] top-1 h-[9px] w-[9px] rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2 ${
                    item.current ? "animate-pulse shadow-[0_0_12px_rgba(0,255,102,0.4)]" : ""
                  }`}
                />

                <div
                  className={`pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:text-left"
                  }`}
                >
                  <span className="mb-2 inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] tracking-wider text-text-muted">
                    {item.period}
                  </span>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">
                    {item.role}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-accent">
                      {item.company}
                    </span>
                    <span className="text-text-muted">·</span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {item.location}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-dim">
                    {item.description}
                  </p>
                  <ul
                    className={`mt-4 space-y-1.5 ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-text-dim"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
