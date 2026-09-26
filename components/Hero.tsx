import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-4 sm:pb-6">
      {/* Outer Rounded Hero Card */}
      <div className="relative overflow-hidden bg-card-bg border border-card-border rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <span className="text-accent-lime font-bold text-xs uppercase tracking-[0.2em] mb-3">
              WORKOUT LIBRARY
            </span>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] leading-[1.04] font-bold uppercase tracking-tight text-white mb-4">
              TRAIN WITH INTENT. LOG <br className="hidden sm:inline" />
              EVERY SET.
            </h1>

            {/* Subtitle */}
            <p className="text-muted-text text-sm sm:text-base leading-relaxed max-w-xl mb-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button with Down Arrow Icon */}
            <Link
              href="#library"
              className="inline-flex items-center justify-center gap-2 bg-accent-lime hover:bg-accent-lime-hover active:scale-[0.98] text-black font-display font-bold text-sm tracking-wider uppercase px-7 py-3.5 rounded-lg transition-all shadow-md group"
            >
              <span>BROWSE WORKOUTS</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>

          {/* Right Column: Transparent Character Cutout Banner */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/5] flex items-center justify-center">
              <Image
                src="/assets/banner.png"
                alt="Gym Training Character"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
