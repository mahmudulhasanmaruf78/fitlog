"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount: propPlan, savedCount: propSaved }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let contextPlan = 0;
  let contextSaved = 0;
  try {
    const workoutCtx = useWorkout();
    contextPlan = workoutCtx.planIds.length;
    contextSaved = workoutCtx.savedIds.length;
  } catch {
    // context not present
  }

  const planCount = propPlan !== undefined ? propPlan : contextPlan;
  const savedCount = propSaved !== undefined ? propSaved : contextSaved;

  const navLinks = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/workout");
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-bg/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo (Left) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                  active
                    ? "bg-[#1c230d] text-accent-lime font-semibold"
                    : "text-muted-text hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Badges (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Plan badge = Plan text + filled lime circle */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-normal transition-colors"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="inline-flex items-center justify-center bg-accent-lime text-black text-xs font-bold w-5 h-5 rounded-full">
              {planCount}
            </span>
          </Link>

          {/* Saved badge = Saved text + outline circle */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-normal transition-colors"
            title="View Saved Workouts"
          >
            <span>Saved</span>
            <span className="inline-flex items-center justify-center border border-white/30 text-white text-xs font-semibold w-5 h-5 rounded-full">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-white"
          >
            <span>Plan</span>
            <span className="bg-accent-lime text-black text-[11px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {planCount}
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-card-bg px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-[#1c230d] text-accent-lime font-semibold"
                      : "text-muted-text hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center gap-3">
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-lime text-black text-xs font-bold uppercase tracking-wider py-2 rounded-lg"
            >
              <span>Today&apos;s Plan</span>
              <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider py-2 rounded-lg"
            >
              <span>Saved</span>
              <span className="text-accent-lime font-bold">({savedCount})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
