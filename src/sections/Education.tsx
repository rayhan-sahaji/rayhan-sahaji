import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  highlights: string[];
}

const EDUCATION: EducationItem[] = [
  {
    period: "2023 — Present",
    degree: "B.Sc. in Computer Science",
    institution: "University of Chittagong",
    location: "Chattogram, Bangladesh",
    description:
      "Pursuing a degree in Computer Science with a focus on software engineering, algorithms, and modern web technologies.",
    highlights: [
      "Specializing in Software Engineering",
      "Active member of the Coding Club",
      "Participated in multiple hackathons",
    ],
  },
  {
    period: "2020 — 2022",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Chattogram College",
    location: "Chattogram, Bangladesh",
    description:
      "Completed higher secondary education with a focus on Science group, building the foundation in mathematics and analytical thinking.",
    highlights: [
      "Achieved GPA 5.00 out of 5.00",
      "Science Group — Physics, Chemistry, Math",
      "Won inter-college programming contest",
    ],
  },
  {
    period: "2018 — 2020",
    degree: "Secondary School Certificate (SSC)",
    institution: "Chittagong Collegiate School",
    location: "Chattogram, Bangladesh",
    description:
      "Completed secondary education with distinction in science and mathematics, sparking the initial interest in technology.",
    highlights: [
      "Achieved GPA 5.00 out of 5.00",
      "Science Group",
      "First exposure to programming",
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".edu-item",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-timeline",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".edu-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".edu-timeline",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="edu-header mb-16 md:mb-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Education
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Academic<br />
            <span className="text-text-dim">Background</span>
          </h2>
        </div>

        <div className="edu-timeline relative">
          <div className="absolute right-[19px] top-0 h-full w-px bg-border md:right-1/2 md:translate-x-px">
            <div className="edu-line h-full w-full bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />
          </div>

          <div className="space-y-12">
            {EDUCATION.map((item, i) => (
              <div
                key={item.period}
                className={`edu-item relative flex flex-col gap-6 md:flex-row md:items-start ${
                  i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="absolute right-[15px] top-1 h-[9px] w-[9px] rounded-full border-2 border-accent bg-bg md:right-1/2 md:translate-x-1/2" />

                <div
                  className={`pr-12 md:w-1/2 md:pr-0 ${
                    i % 2 === 0
                      ? "md:pl-16 md:text-left"
                      : "md:pr-16 md:text-right"
                  }`}
                >
                  <span className="mb-2 inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] tracking-wider text-text-muted">
                    {item.period}
                  </span>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">
                    {item.degree}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 md:justify-start">
                    <span className="text-sm font-medium text-accent">
                      {item.institution}
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
                        className={`flex items-start gap-2 text-xs text-text-dim ${
                          i % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
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
