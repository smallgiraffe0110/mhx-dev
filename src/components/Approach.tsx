const steps = [
  {
    phase: "Discovery",
    title: "Understand the Problem",
    description:
      "We start by deeply understanding your domain, users, and objectives. No assumptions — just rigorous research and strategic clarity.",
  },
  {
    phase: "Design",
    title: "Architect the Solution",
    description:
      "From system architecture to interface design, we map every detail. Our blueprints balance elegance with engineering reality.",
  },
  {
    phase: "Build",
    title: "Execute with Precision",
    description:
      "Agile sprints, continuous delivery, obsessive code quality. We ship fast without cutting corners.",
  },
  {
    phase: "Scale",
    title: "Grow & Evolve",
    description:
      "Launch is just the beginning. We optimize, iterate, and scale — ensuring your product thrives in production.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="relative py-32 lg:py-40">
      <div className="divider mb-32" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Methodical by design.
            <br />
            <span className="text-zinc-500">Relentless in execution.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.phase} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-accent/30 transition-colors duration-500">
                <span className="text-accent font-semibold text-sm">
                  0{i + 1}
                </span>
              </div>
              <p className="text-accent/60 text-xs font-medium tracking-widest uppercase mb-2">
                {step.phase}
              </p>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
