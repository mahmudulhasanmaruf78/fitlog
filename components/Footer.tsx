import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-card-border bg-card-bg/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand logo + FITLOG */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-accent-lime transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright text */}
        <p className="text-xs sm:text-sm text-muted-text text-center sm:text-right">
          &copy; {new Date().getFullYear()} FitLog &mdash; Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
