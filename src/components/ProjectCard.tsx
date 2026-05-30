import { useRef } from "react";
import gsap from "gsap";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
  image?: string;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  description,
  tags,
  index,
  image,
  onClick,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: -8, duration: 0.5, ease: "power3.out" });
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.6, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: "power3.out" });
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      className="group cursor-pointer"
    >
      <div className="relative mb-5 overflow-hidden rounded-2xl border border-border bg-surface">
        <div
          ref={imageRef}
          className="relative h-[280px] overflow-hidden bg-surface-2 md:h-[320px]"
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            View Project
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="space-y-2.5 px-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-text transition-colors duration-300 group-hover:text-accent md:text-xl">
            {title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] text-text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-text-dim line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[10px] tracking-wider text-text-muted transition-colors duration-300 group-hover:text-text-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
