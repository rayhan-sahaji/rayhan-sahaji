import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = "75f8968a-2be7-4e60-842f-55c13d3c8448";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-info",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }
      );
    }
  }, [submitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          to: "rayhansahajirimon@gmail.com",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      console.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border py-4 font-mono text-sm text-text outline-none transition-all duration-500 placeholder:text-text-muted focus:border-accent";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="contact-header mb-16 md:mb-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Let's Start a<br />
            <span className="text-text-dim">Conversation</span>
          </h2>
        </div>

        {submitted ? (
          <div
            ref={successRef}
            className="mx-auto max-w-lg rounded-3xl border border-border bg-surface p-16 text-center"
          >
            <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">Message Sent</h3>
            <p className="text-sm text-text-dim">
              Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div className="contact-info space-y-10">
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
                  Email
                </h3>
                <a
                  href="mailto:rayhansahajirimon@gmail.com"
                  data-cursor-hover
                  className="text-lg text-text transition-colors hover:text-accent"
                >
                  rayhansahajirimon@gmail.com
                </a>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
                  Based In
                </h3>
                <p className="text-lg text-text">Chattogram, Bangladesh</p>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
                  Availability
                </h3>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <p className="text-lg text-text">Open to opportunities</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                {["GitHub", "LinkedIn", "Twitter"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    data-cursor-hover
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-dim transition-all duration-300 hover:border-accent/40 hover:text-accent"
                  >
                    <span className="font-mono text-[10px]">
                      {platform[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="contact-form space-y-2"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClasses}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={handleChange}
                className={inputClasses}
              />
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={sending}
                  data-cursor-hover
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-bg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,102,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          fill="currentColor"
                          className="opacity-75"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
