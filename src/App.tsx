import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import BackToTop from "./components/BackToTop";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-text">
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <div className="grain" />
      <Cursor />
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            © {new Date().getFullYear()} Rayhan Sahaji
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Crafted with precision
          </span>
        </div>
      </footer>
    </div>
  );
}
