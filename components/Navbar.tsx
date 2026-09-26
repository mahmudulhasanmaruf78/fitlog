"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Workout", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/workout");
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-dark-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo (Left) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-accent-lime transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-card-bg/60 border border-card-border/80 px-3 py-1.5 rounded-full">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                  active
                    ? "bg-accent-lime text-black font-semibold shadow-sm"
                    : "text-muted-text hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Badges (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Plan badge = filled pill with accent background (#ccff00) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-accent-lime text-black text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full hover:bg-accent-lime-hover transition-colors shadow-sm"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="inline-flex items-center justify-center bg-black text-white text-[11px] font-bold w-5 h-5 rounded-full">
              {planCount}
            </span>
          </Link>

          {/* Saved badge = pill with outline/border only */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-card-border bg-card-bg/80 text-white text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full hover:border-white/40 hover:bg-card-hover transition-colors"
            title="View Saved Workouts"
          >
            <span className="text-muted-text">Saved</span>
            <span className="inline-flex items-center justify-center bg-white/10 text-accent-lime text-[11px] font-bold px-1.5 py-0.5 min-w-[20px] rounded-full">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile compact plan counter badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-accent-lime text-black text-xs font-bold px-2.5 py-1 rounded-full"
          >
            <span>Plan</span>
            <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {planCount}
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-text hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-card-border bg-card-bg/95 px-4 pt-3 pb-5 space-y-3 backdrop-blur-lg animate-in slide-in-from-top duration-200">
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
                      ? "bg-accent-lime text-black font-semibold"
                      : "text-muted-text hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-card-border flex items-center gap-3">
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
              className="flex-1 flex items-center justify-center gap-2 border border-card-border text-white text-xs font-semibold uppercase tracking-wider py-2 rounded-lg hover:bg-white/5"
            >
              <span className="text-muted-text">Saved</span>
              <span className="text-accent-lime font-bold">({savedCount})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
