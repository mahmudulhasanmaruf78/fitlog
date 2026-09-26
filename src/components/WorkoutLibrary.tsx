"use client";

import { useEffect, useState } from "react";
import { getWorkouts, type Workout } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import { Loader2, AlertCircle, RefreshCw, ChevronDown } from "lucide-react";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">("Duration");

  const fetchLibraryData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to connect to the workout server. Please check your network connection.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return a.duration - b.duration;
  });

  return (
    <section
      id="library"
      className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 scroll-mt-20"
    >
      {/* Header with Title and Sort By Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="text-left">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white mb-1.5">
            THE LIBRARY
          </h2>
          <p className="text-muted-text text-sm sm:text-base font-normal">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort By Dropdown with Chevron (Challenge C1) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-muted-text font-medium uppercase tracking-wider">
            Sort By:
          </span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "Duration" | "Calories" | "Rating")}
              className="appearance-none bg-[#121620] border border-white/10 hover:border-white/20 text-white text-xs font-semibold px-3.5 py-2 pr-8 rounded-xl focus:outline-none focus:border-accent-lime transition-colors cursor-pointer"
            >
              <option value="Duration" className="bg-[#121620] text-white">Duration</option>
              <option value="Calories" className="bg-[#121620] text-white">Calories</option>
              <option value="Rating" className="bg-[#121620] text-white">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-muted-text absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-accent-lime font-display text-sm tracking-wider uppercase py-1">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading workouts…</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#12151c] border border-white/5 rounded-2xl p-3.5 animate-pulse flex flex-col h-[350px]"
              >
                <div className="w-full aspect-[16/10] rounded-xl bg-white/5 mb-3.5" />
                <div className="flex-1 flex flex-col justify-between px-1">
                  <div className="space-y-2.5">
                    <div className="flex gap-1.5">
                      <div className="w-12 h-4 rounded-full bg-white/10" />
                      <div className="w-14 h-4 rounded-full bg-white/10" />
                    </div>
                    <div className="w-3/4 h-6 rounded bg-white/10" />
                    <div className="w-1/2 h-3.5 rounded bg-white/5" />
                  </div>
                  <div className="flex gap-4 pt-3 border-t border-white/5">
                    <div className="w-14 h-3.5 rounded bg-white/5" />
                    <div className="w-16 h-3.5 rounded bg-white/5" />
                    <div className="w-10 h-3.5 rounded bg-white/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-[#1b1214] border border-red-500/20 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-white font-display text-lg font-bold uppercase tracking-wider mb-2">
            Error Loading Workouts
          </h3>
          <p className="text-muted-text text-sm mb-6 leading-relaxed">
            {error}
          </p>
          <button
            onClick={fetchLibraryData}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Grid: 3 columns on large, 2 cols on tablet, 1 on mobile */}
      {!loading && !error && sortedWorkouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
