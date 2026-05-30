import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  codeUrl: string;
}

const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack marketplace with real-time inventory, Stripe integration, and an admin dashboard for analytics.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Collaborative Task Board",
    description:
      "Real-time Kanban board with drag-and-drop, team workspaces, and WebSocket-powered live updates.",
    tags: ["React", "Node.js", "Socket.io", "ShadCN"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "AI Content Generator",
    description:
      "SaaS tool leveraging OpenAI APIs to generate blog posts, social copy, and marketing emails.",
    tags: ["Next.js", "OpenAI", "Clerk", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Real-Time Chat App",
    description:
      "End-to-end encrypted messaging with read receipts, file sharing, and group channels.",
    tags: ["React", "Socket.io", "MongoDB", "Better Auth"],
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=600&fit=crop",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Interactive data visualization dashboard with live metrics, charts, and CSV export.",
    tags: ["React", "D3.js", "Tailwind", "Express"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Social Media Scheduler",
    description:
      "Cross-platform content scheduler with calendar view, queue management, and analytics.",
    tags: ["Next.js", "OAuth", "Clerk", "Tailwind"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    liveUrl: "#",
    codeUrl: "#",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".project-item",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (project: Project, index: number) => {
    setSelected(project);
    setSelectedIndex(index);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="projects-header mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Featured<br />
              <span className="text-text-dim">Projects</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-text-dim">
            A curated selection of projects that showcase my approach to
            building scalable, user-centric digital experiences.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <div key={project.title} className="project-item">
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                index={i}
                onClick={() => handleCardClick(project, i)}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
        description={selected?.description ?? ""}
        tags={selected?.tags ?? []}
        image={selected?.image}
        index={selectedIndex}
        liveUrl={selected?.liveUrl}
        codeUrl={selected?.codeUrl}
      />
    </section>
  );
}
