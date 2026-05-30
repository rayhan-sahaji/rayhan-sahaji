import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  index?: number;
  liveUrl?: string;
  codeUrl?: string;
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  tags,
  image,
  index = 0,
  liveUrl = "#",
  codeUrl = "#",
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { clipPath: "inset(10% 10% 10% 10% round 24px)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = () => {
    if (!overlayRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        clipPath: "inset(10% 10% 10% 10% round 24px)",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: onClose,
      });
    });

    return () => ctx.revert();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-xl md:p-8"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface"
      >
        <div className="flex items-center justify-between border-b border-border px-8 py-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
              Project {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <button
            onClick={handleClose}
            data-cursor-hover
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-dim transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            ✕
          </button>
        </div>

        <div className="p-8 md:p-10">
          <div className="mb-8 h-48 overflow-hidden rounded-2xl border border-border bg-surface-2 md:h-64">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
                  Preview
                </span>
              </div>
            )}
          </div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-text-dim md:text-base">
            {description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-accent/15 bg-accent/5 px-3 py-1.5 font-mono text-[10px] tracking-wider text-accent/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-bg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,102,0.2)]"
            >
              Live Demo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3.5 font-mono text-xs uppercase tracking-widest text-text-dim transition-all duration-300 hover:border-border-hover hover:text-text"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
