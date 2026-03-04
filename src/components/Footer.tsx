export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              MHX<span className="text-accent">.</span>
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-zinc-600">
            <a
              href="#services"
              className="hover:text-zinc-400 transition-colors"
            >
              Services
            </a>
            <a
              href="#approach"
              className="hover:text-zinc-400 transition-colors"
            >
              Approach
            </a>
            <a
              href="#ventures"
              className="hover:text-zinc-400 transition-colors"
            >
              Ventures
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-400 transition-colors"
            >
              Contact
            </a>
          </div>

          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} MHX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
