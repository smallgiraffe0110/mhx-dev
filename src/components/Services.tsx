"use client";

const services = [
  {
    number: "01",
    title: "Product Engineering",
    description:
      "Full-stack development of web and mobile applications built for scale. We architect robust systems using modern frameworks and cloud-native infrastructure.",
    tags: ["Next.js", "React Native", "Node.js", "AWS"],
  },
  {
    number: "02",
    title: "Design & Experience",
    description:
      "Pixel-perfect interfaces and intuitive user experiences that set brands apart. We blend aesthetics with function to create products people love.",
    tags: ["UI/UX", "Design Systems", "Prototyping", "Brand"],
  },
  {
    number: "03",
    title: "AI & Automation",
    description:
      "Intelligent systems that drive efficiency and unlock new capabilities. From LLM integrations to custom ML pipelines — we make AI work for your business.",
    tags: ["LLMs", "ML Ops", "Data Pipelines", "Agents"],
  },
  {
    number: "04",
    title: "Venture Building",
    description:
      "We don't just build for clients — we build our own. MHX incubates and launches high-potential digital ventures from zero to market.",
    tags: ["Strategy", "MVP", "Growth", "Launch"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            End-to-end capabilities.
            <br />
            <span className="text-zinc-500">Zero compromise.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.number}
              className="gradient-border rounded-2xl p-8 lg:p-10 transition-all duration-500 group"
            >
              <span className="text-accent/60 text-sm font-mono">
                {service.number}
              </span>
              <h3 className="text-2xl font-semibold mt-3 mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-500 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
