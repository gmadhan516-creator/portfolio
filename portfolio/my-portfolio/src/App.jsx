"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import emailjs from "emailjs-com";
import {
  ArrowUpRight,
  Sparkles,
  Star,
  Zap,
  Circle,
  Plus,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <main className="selection:bg-black selection:text-[#ccff00]">
      <GlobalStyles />
      <div className="noise"></div>
      <Navbar />
      <Hero />
      <Marquee />
      <Manifesto />
      <ChaosServices />
      <StickyWorks />
      <RawStats />
      <ClientChaos />
      <ChaosForm />
      <Footer />
    </main>
  );
}

export function GlobalStyles() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Permanent+Marker&display=swap');

        :root {
          --c-bg: #fffbf0;
          --c-ink: #101010;
          --c-lime: #ccff00;
          --c-purple: #b084ff;
          --c-orange: #ff5e00;
        }

        body {
          background-color: var(--c-bg);
          color: var(--c-ink);
          font-family: 'Space Grotesk', sans-serif;
          overflow-x: hidden;
        }

        .font-marker {
          font-family: 'Permanent Marker', cursive;
        }

        .noise {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .wobble-border {
          position: relative;
        }
        .wobble-border::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: transparent;
          border: 3px solid var(--c-ink);
          z-index: -1;
          filter: url(#rough-edges);
          transition: all 0.3s ease;
        }
        .wobble-fill::before {
          background: var(--c-lime);
        }

        .text-outline {
          -webkit-text-stroke: 2px var(--c-ink);
          color: transparent;
        }

        .stroke-white {
          -webkit-text-stroke-color: white;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="rough-edges">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </svg>
    </>
  );
}

export function BrutalButton({ children, color = "bg-[#ccff00]", className = "", ...props }) {
  return (
    <button className={`relative group inline-block ${className}`} {...props}>
      <div
        className={`absolute inset-0 translate-x-2 translate-y-2 border-2 border-black bg-black transition-transform group-hover:translate-x-3 group-hover:translate-y-3`}
      ></div>
      <div
        className={`relative px-8 py-4 border-2 border-black ${color} font-bold uppercase tracking-widest text-sm z-10 hover:-translate-y-1 hover:-translate-x-1 transition-transform`}
      >
        {children}
      </div>
    </button>
  );
}

export function DrawSVG({ path, className }) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: pathRef.current, start: "top 80%" },
      },
    );
  }, []);

  return (
    <svg viewBox="0 0 200 100" className={`absolute pointer-events-none overflow-visible ${className}`}>
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

export function Navbar() {
  const scrollToContactForm = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToPunks = () => {
    const punksEl = document.getElementById("about");
    if (punksEl) {
      punksEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToWork = () => {
    const workEl = document.getElementById("work");
    if (workEl) {
      workEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-black">
      <div className="font-bold text-3xl tracking-tighter flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-sm animate-spin-slow"></div>
        RAW_STUDIO.
      </div>
      <div className="hidden md:flex gap-8 font-mono uppercase text-sm font-bold bg-white/90 px-6 py-3 border-2 border-black rounded-full shadow-[4px_4px_0px_black]">
        <a
          href="#work"
          className="hover:text-[#b084ff]"
          onClick={(e) => {
            e.preventDefault();
            scrollToWork();
          }}
        >
          Work
        </a>
        <a
          href="#about"
          className="hover:text-[#ff5e00]"
          onClick={(e) => {
            e.preventDefault();
            scrollToPunks();
          }}
        >
          Agency
        </a>
        <a
          href="#contact"
          className="hover:text-[#ccff00]"
          onClick={(e) => {
            e.preventDefault();
            scrollToContactForm();
          }}
        >
          Contact
        </a>
      </div>
      <BrutalButton color="bg-white" onClick={scrollToContactForm}>
        Let's Talk
      </BrutalButton>
    </nav>
  );
}

export function Hero() {
  const container = useRef(null);

  useLayoutEffect(() => {
    let onMouseMove;
    const ctx = gsap.context(() => {
      onMouseMove = (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        gsap.to(".parallax-layer", { x: x * 50, y: y * 50, duration: 1 });
        gsap.to(".parallax-layer-rev", { x: x * -40, y: y * -40, duration: 1 });
      };
      window.addEventListener("mousemove", onMouseMove);

      const tl = gsap.timeline();
      tl.from(".hero-char", {
        y: 200,
        rotate: 10,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
      }).from(
        ".hero-tag",
        {
          scale: 0,
          rotation: -180,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5",
      );
    }, container);
    return () => {
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, []);

  const scrollToContactForm = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="parallax-layer-rev absolute top-20 left-10 md:left-32 z-10">
        <div className="bg-[#b084ff] border-2 border-black p-4 rotate-[-6deg] shadow-[4px_4px_0px_black]">
          <Sparkles size={32} />
        </div>
      </div>
      <div className="parallax-layer absolute bottom-32 right-10 md:right-32 z-10">
        <div className="bg-[#ccff00] border-2 border-black rounded-full p-4 rotate-[12deg] shadow-[4px_4px_0px_black]">
          <Zap size={32} />
        </div>
      </div>

      <div className="relative z-20 text-center">
        <div className="hero-tag inline-block mb-6 bg-black text-white px-4 py-1 font-mono text-xs uppercase rotate-2">
          Warning: High Voltage Design
        </div>

        <h1 className="text-[3rem] md:text-[8rem] leading-[0.9] font-bold uppercase tracking-tighter">
          <div className="overflow-hidden relative">
            <span className="text-outline absolute top-0 left-0 w-full z-0 translate-x-1 translate-y-1 opacity-50">
              MADHAN.DEV
            </span>
            {"MADHAN.DEV".split("").map((c, i) => (
              <span key={i} className="hero-char inline-block text-[#ff5e00]">
                {c}
              </span>
            ))}
            <DrawSVG path="M10,50 C30,90 170,90 190,50 C170,10 30,10 10,50" className="w-[120%] -left-[10%] -top-2 text-black" />
          </div>
        </h1>

        <p className="max-w-xl mx-auto mt-8 font-mono text-lg md:text-xl relative">
          <span className="font-marker text-2xl text-[#b084ff] absolute -left-8 -top-6 -rotate-12">v2.0</span>
          We break grids, ignore safety margins, and ship award-winning code. Strictly for the bold.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
          <BrutalButton onClick={scrollToContactForm}>Start Project</BrutalButton>
        </div>
      </div>
    </section>
  );
}

export function StickyWorks() {
  const container = useRef(null);
  const wrapper = useRef(null);
  const projects = [
    { name: "E-COMMERCE", cat: "COMMERCE", img: "bg-[#ff5e00]" },
    { name: "FRONT END WEBS", cat: "FRONTEND", img: "bg-[#b084ff]" },
  ];

  useLayoutEffect(() => {
    if (!container.current || !wrapper.current) return;
    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!wrapper.current) return 0;
        return wrapper.current.scrollWidth - window.innerWidth;
      };

      gsap.to(wrapper.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="overflow-hidden bg-black text-[#fffbf0] py-20 h-screen">
      <div ref={wrapper} className="flex h-full items-center pl-12 md:pl-32">
        <div className="w-[80vw] md:w-[40vw] shrink-0 pr-20">
          <h2 className="text-8xl font-black uppercase mb-8 leading-none">
            Selected <br />
            <span className="text-outline stroke-white text-transparent">Works</span>
          </h2>
          <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center animate-spin-slow">
            <Star fill="white" />
          </div>
        </div>

        {projects.map((p, i) => (
          <div key={i} className="project-card w-[85vw] md:w-[60vw] h-[70vh] shrink-0 mr-12 md:mr-32 relative group">
            <div className="absolute inset-0 bg-white border-2 border-white translate-x-4 translate-y-4 rounded-xl"></div>
            <div
              className={`relative h-full ${p.img} border-2 border-white rounded-xl p-8 flex flex-col justify-between transition-transform group-hover:-translate-y-2`}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono bg-black text-white px-3 py-1 text-xl">(0{i + 1})</span>
                <ArrowUpRight className="w-12 h-12 bg-white text-black rounded-full p-2 border-2 border-black transition-transform group-hover:rotate-45" />
              </div>

              <div>
                <h3 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter mb-4">{p.name}</h3>
                <div className="flex gap-4">
                  {["Strategy", "Design", p.cat].map((tag) => (
                    <span
                      key={tag}
                      className="border border-black px-4 py-1 rounded-full text-black font-bold uppercase text-xs md:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ChaosServices() {
  const services = [
    { title: "Strategy", desc: "We find the soul of your brand and turn it into noise.", color: "bg-[#ccff00]" },
    { title: "Visuals", desc: "Design that hits like a brick. No templates, no mercy.", color: "bg-[#b084ff]" },
    { title: "Code", desc: "Next-gen stack that moves at the speed of light.", color: "bg-[#ff5e00]" },
  ];

  return (
    <section id="work" className="py-32 px-6 container mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span className="font-marker text-4xl text-[#ff5e00] -rotate-12">WHAT I DO_</span>
        <div className="h-2 bg-black flex-1 -rotate-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className={`p-12 border-4 border-black ${s.color} shadow-[12px_12px_0px_black] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300 relative group overflow-hidden`}
          >
            <div className="absolute top-4 right-4 text-black/20 group-hover:text-black transition-colors">
              <Plus size={48} strokeWidth={3} />
            </div>
            <h3 className="text-5xl font-black uppercase mb-6 leading-tight">{s.title}</h3>
            <p className="font-mono text-lg font-bold uppercase leading-relaxed">{s.desc}</p>
            <div className="mt-8">
              <DrawSVG path="M0,0 Q50,20 100,0" className="w-32 h-8 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RawStats() {
  const stats = [
    { val: "0", label: "AWARDS WON", note: "NOT ENOUGH" },
    { val: "0", label: "CLIENT MESSES", note: "CLEANED" },
    { val: "100", label: "CAFFEINE %", note: "LEVELS" },
  ];

  return (
    <section className="py-32 px-6 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {stats.map((s, i) => (
          <div key={i} className="relative group flex flex-col items-center">
            <div className="text-[12rem] md:text-[15rem] font-black leading-none relative">
              {s.val}
              <div className="absolute top-1/2 left-0 w-full h-8 bg-[#ccff00] -z-10 -rotate-3 group-hover:rotate-3 transition-transform duration-500" />
            </div>
            <div className="font-mono text-xl font-bold uppercase tracking-widest mt-4">{s.label}</div>
            <div className="font-marker text-[#ff5e00] text-2xl rotate-[-12deg] absolute top-0 -right-4 group-hover:scale-110 transition-transform">
              ({s.note})
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ClientChaos() {
  return (
    <section className="py-32 bg-[#fffbf0] border-y-4 border-black overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 font-mono text-[8px] opacity-20 uppercase leading-none">
        {Array(20).fill("CLIENT_LOGS.EXE ").join("")}
      </div>
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-wrap justify-center gap-20 opacity-30 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-3 ${
                i % 2 === 0 ? "rotate-2" : "-rotate-3"
              }`}
            >
              <div className="w-10 h-10 bg-black rounded-xs"></div>
              CLIENT_0{i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="absolute -left-10 top-20 text-[#ccff00]">
        <DrawSVG path="M0,0 Q50,50 10,100" className="w-32 h-32 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square bg-[#b084ff] border-2 border-black shadow-[8px_8px_0px_black] rotate-2 overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-9xl font-black opacity-20 group-hover:scale-150 transition-transform duration-700">
              ?
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 bg-[#ff5e00] text-white p-6 rounded-full border-2 border-black rotate-12 font-marker text-xl shadow-[4px_4px_0px_black]">
            NO BULLSHIT
          </div>
        </div>

        <div>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8">
            I&apos;m an frontend-developer
          </h2>
          <p className="font-mono text-lg leading-relaxed mb-8">
            I don&apos;t design for scrolling.
            <br />
            I design for impact.
            <br />
            Front-end that grips attention and won&apos;t let go.
          </p>
          <ul className="space-y-4 font-bold text-xl uppercase">
            {["Structure matters.", "Feeling decides."].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <Circle className="w-4 h-4 fill-black" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  return (
    <div className="py-12 bg-[#ccff00] border-y-2 border-black overflow-hidden -rotate-1 my-12">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="text-6xl md:text-8xl font-black uppercase flex items-center gap-8">
            <span>Brutal</span>
            <span className="text-outline stroke-black text-transparent">Design</span>
            <Star fill="black" className="w-12 h-12 animate-spin-slow" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative pt-32 pb-12 px-6 border-t-2 border-black bg-[#101010] text-[#fffbf0]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-8 rotate-6">
          <div className="bg-white text-black px-6 py-2 font-marker text-xl border-2 border-black shadow-[4px_4px_0px_#ccff00]">
            Say Hello!
          </div>
        </div>

        <a
          href="https://madhan.dev"
          className="text-[5vw] font-black uppercase leading-none hover:text-[#ccff00] transition-colors duration-300"
        >
          madhann4205@gmail.com
        </a>

        <div className="w-full flex flex-col md:flex-row justify-between items-end mt-20 border-t border-gray-800 pt-8 font-mono text-sm uppercase">
          <div className="text-left">
            <p>Made with ❤️ + ☕️</p>
            <p>React.js</p>
          </div>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:underline decoration-[#ff5e00]">
              Instagram
            </a>
            <a href="#" className="hover:underline decoration-[#b084ff]">
              Twitter
            </a>
            <a href="#" className="hover:underline decoration-[#ccff00]">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 border-l-2 border-b-2 border-white opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-r-2 border-t-2 border-white opacity-20"></div>
    </footer>
  );
}

export function ChaosForm() {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  useLayoutEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".chaos-form-block", {
        y: 120,
        rotate: 2,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 75%" },
      });

      gsap.from(".chaos-form-field", {
        x: -40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: formRef.current, start: "top 70%" },
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const templateParams = {
      from_name: formData.get("from_name"),
      reply_to: formData.get("reply_to"),
      project_type: formData.get("project_type"),
      message: formData.get("message"),
      to_email: "gmadhan516@gmail.com",
    };

    try {
      setIsSending(true);
      await emailjs.send(
        "service_yevlx3g",
        "template_xdx0wu8",
        templateParams,
        "Qste2Abs4MBZ_L9-4",
      );
      formEl.reset();
      window.alert("Message sent successfully.");
    } catch (error) {
      window.alert("Failed to send message. Please check EmailJS template fields and try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section ref={formRef} id="contact" className="py-32 px-6 bg-[#101010] text-[#fffbf0] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10 text-center">
          <span className="inline-block bg-[#ccff00] text-black border-2 border-black px-4 py-1 font-mono text-xs uppercase rotate-[-3deg] shadow-[4px_4px_0px_black]">
            NEW PROJECT INTAKE
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-8">
            LET&apos;S MAKE IT <span className="text-[#ff5e00]">LOUD</span>
          </h2>
        </div>

        <div className="chaos-form-block bg-[#fffbf0] text-black border-4 border-black p-6 md:p-10 shadow-[14px_14px_0px_#ccff00] rotate-[-1deg]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="chaos-form-field flex flex-col gap-2">
              <span className="font-mono text-xs uppercase font-bold tracking-wider">Name</span>
              <input
                name="from_name"
                type="text"
                placeholder="Your Name"
                required
                className="bg-white border-2 border-black px-4 py-3 font-bold uppercase tracking-wide outline-none focus:bg-[#ccff00] transition-colors"
              />
            </label>

            <label className="chaos-form-field flex flex-col gap-2">
              <span className="font-mono text-xs uppercase font-bold tracking-wider">Email</span>
              <input
                name="reply_to"
                type="email"
                placeholder="you@brand.com"
                required
                className="bg-white border-2 border-black px-4 py-3 font-bold outline-none focus:bg-[#b084ff] transition-colors"
              />
            </label>

            <label className="chaos-form-field flex flex-col gap-2 md:col-span-2">
              <span className="font-mono text-xs uppercase font-bold tracking-wider">Project Type</span>
              <select
                name="project_type"
                className="bg-white border-2 border-black px-4 py-3 font-bold uppercase outline-none focus:bg-[#ff5e00] focus:text-white transition-colors"
              >
                <option>Brand Site</option>
                <option>E-commerce</option>
                <option>Interactive / WebGL</option>
                <option>Motion Identity</option>
              </select>
            </label>

            <label className="chaos-form-field flex flex-col gap-2 md:col-span-2">
              <span className="font-mono text-xs uppercase font-bold tracking-wider">Your Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us what chaos you want to launch..."
                required
                className="bg-white border-2 border-black px-4 py-3 font-mono font-bold outline-none resize-none focus:bg-[#ccff00] transition-colors"
              />
            </label>

            <div className="chaos-form-field md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-6 mt-2">
              <p className="font-marker text-2xl text-[#ff5e00] rotate-[-3deg]">No fluff. Just impact.</p>
              <BrutalButton color="bg-[#ccff00]" type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Submit Brief"}
              </BrutalButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
