import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero / Banner Section */}
      <Hero />

      {/* Target Library Section Placeholder for smooth scroll anchor */}
      <section
        id="library"
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      >
        <div className="flex flex-col items-center justify-center text-center py-12 border border-dashed border-card-border rounded-2xl bg-card-bg/20">
          <span className="text-xs uppercase tracking-widest text-accent-lime font-bold mb-2">
            LIBRARY ANCHOR TARGET
          </span>
          <h2 className="text-2xl font-display font-bold uppercase text-white mb-2">
            The Library
          </h2>
          <p className="text-muted-text text-sm max-w-md">
            Twelve lifts covering every major muscle group will be rendered here.
          </p>
        </div>
      </section>
    </div>
  );
}
