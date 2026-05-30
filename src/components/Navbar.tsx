import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScrollPosition } from "../hooks/useScrollPosition";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const scrollY = useScrollPosition();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  useEffect(() => {
    if (!navRef.current) return;

    if (isScrolled) {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(5,5,5,0.85)",
        borderBottomColor: "rgba(30,30,30,0.6)",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(5,5,5,0)",
        borderBottomColor: "rgba(30,30,30,0)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isScrolled]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          logoRef.current,
          { x: -15, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".nav-link",
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.2"
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent opacity-0"
        style={{
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
          <a
            ref={logoRef}
            href="#home"
            className="group relative overflow-hidden opacity-0"
          >
            <span className="font-display text-[22px] font-black italic tracking-[-0.02em] text-text transition-all duration-500 group-hover:text-accent">
              Rayhan
            </span>
            <span className="ml-2 font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-text-muted transition-all duration-500 group-hover:text-text-dim">
              Sahaji
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link group relative font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim opacity-0 transition-colors duration-300 hover:text-text"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              ref={ctaRef}
              href="#contact"
              className="rounded-full border border-accent/30 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent opacity-0 transition-all duration-300 hover:bg-accent hover:text-bg hover:border-accent"
            >
              Let's Talk
            </a>
          </div>

          <button
            onClick={toggleMenu}
            className="flex flex-col gap-[5px] lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1px] w-6 bg-text transition-all duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1px] w-6 bg-text transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1px] w-6 bg-text transition-all duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl font-light tracking-tight text-text transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 rounded-full border border-accent/30 px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
}
