export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-bg text-[#ededed] flex flex-col items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-accent-lime font-semibold px-3 py-1 rounded-full border border-accent-lime/30 bg-accent-lime/10">
          WORKOUT LIBRARY
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">
          Train with intent. <br />
          <span className="text-accent-lime">Log every set.</span>
        </h1>
        <p className="text-muted-text text-sm md:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
      </div>
    </main>
  );
}
