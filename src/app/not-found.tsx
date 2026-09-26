import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh]">
      <div className="max-w-md w-full text-center bg-[#10141d] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center mx-auto mb-6 text-accent-lime">
          <Dumbbell className="w-8 h-8" />
        </div>

        {/* 404 & Heading */}
        <span className="text-accent-lime font-display font-extrabold text-sm tracking-[0.2em] uppercase block mb-2">
          404 ERROR
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3">
          PAGE NOT FOUND
        </h1>

        {/* Subtitle */}
        <p className="text-muted-text text-sm leading-relaxed mb-8">
          Looks like you wandered off the workout floor. The routine or page you are looking for does not exist or has been relocated.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-accent-lime hover:bg-accent-lime-hover text-black font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>BACK TO WORKOUTS</span>
        </Link>
      </div>
    </div>
  );
}
