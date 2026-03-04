export function Contact() {
  return (
    <section id="contact" className="relative py-32 lg:py-40">
      <div className="divider mb-32" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">
            Let&apos;s Talk
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Ready to build
            <br />
            something exceptional?
          </h2>
          <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Whether you have a project in mind or just want to explore what&apos;s
            possible — we&apos;d love to hear from you.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@mhx.dev"
              className="px-8 py-3.5 rounded-full bg-white text-zinc-925 font-medium text-sm hover:bg-zinc-200 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              hello@mhx.dev
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
