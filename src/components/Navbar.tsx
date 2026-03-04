"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-925/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight">
              MHX
              <span className="text-accent">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10 text-sm text-zinc-400">
            <a
              href="#services"
              className="hover:text-white transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="#approach"
              className="hover:text-white transition-colors duration-300"
            >
              Approach
            </a>
            <a
              href="#ventures"
              className="hover:text-white transition-colors duration-300"
            >
              Ventures
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-white text-zinc-925 hover:bg-zinc-200 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
