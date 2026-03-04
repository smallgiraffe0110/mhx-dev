"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const rect = glowRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.setProperty("--glow-x", `${x}%`);
      glowRef.current.style.setProperty("--glow-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={glowRef}
      className="relative min-h-screen flex items-center justify-center glow grid-pattern overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Technology Studio
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] animate-fade-up delay-100">
          Engineering
          <br />
          <span className="bg-gradient-to-r from-accent via-purple-300 to-accent bg-clip-text text-transparent">
            the Future
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
          We design, build, and scale premium digital products and ventures.
          From concept to launch — crafted with precision.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full bg-white text-zinc-925 font-medium text-sm hover:bg-zinc-200 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-white/10 text-sm font-medium text-zinc-300 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up delay-600">
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
