const ventures = [
  {
    name: "Coming Soon",
    category: "Stealth",
    description:
      "Our portfolio of ventures is currently in development. We're building products across fintech, AI tooling, and developer infrastructure.",
    status: "In Development",
  },
];

export function Ventures() {
  return (
    <section id="ventures" className="relative py-32 lg:py-40">
      <div className="divider mb-32" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">
            Ventures
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            We build what we believe in.
          </h2>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            MHX isn&apos;t just a studio — it&apos;s a launchpad. We incubate
            our own products and invest in ideas at the intersection of
            technology and opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ventures.map((venture) => (
            <div
              key={venture.name}
              className="gradient-border rounded-2xl p-8 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium tracking-widest uppercase text-zinc-600">
                  {venture.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  {venture.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{venture.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {venture.description}
              </p>
            </div>
          ))}

          {/* Placeholder cards */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-white/5 p-8 flex items-center justify-center"
            >
              <span className="text-zinc-700 text-sm">More to come</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
