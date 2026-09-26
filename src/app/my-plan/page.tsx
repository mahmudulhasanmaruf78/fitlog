"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWorkouts, type Workout } from "@/lib/api";
import { useWorkout } from "@/context/WorkoutContext";
import PlanCard from "@/components/PlanCard";
import { ChevronDown, Loader2 } from "lucide-react";

export default function MyPlanPage() {
  const { planIds, savedIds } = useWorkout();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">(
    "Duration",
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const rawPlanWorkouts = workouts.filter((w) => planIds.includes(w.id));
  const rawSavedWorkouts = workouts.filter((w) => savedIds.includes(w.id));

  const totalDuration = rawPlanWorkouts.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = rawPlanWorkouts.reduce(
    (acc, w) => acc + w.caloriesBurned,
    0,
  );

  // Sorting function
  const sortList = (list: Workout[]) => {
    return [...list].sort((a, b) => {
      if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "Rating") return b.rating - a.rating;
      return a.duration - b.duration; // default Duration
    });
  };

  const planWorkouts = sortList(rawPlanWorkouts);
  const savedWorkouts = sortList(rawSavedWorkouts);

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Subtitle */}
      <div className="mb-6 sm:mb-8 text-left">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2">
          MY PLAN
        </h1>
        <p className="text-muted-text text-sm sm:text-base font-normal">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Card (Single container with 3 columns) */}
      <div className="bg-[#10141d] border border-white/10 rounded-2xl p-6 sm:p-7 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5 gap-6 sm:gap-0">
          {/* Exercises */}
          <div className="sm:px-6 first:sm:pl-0">
            <span className="text-muted-text text-xs uppercase tracking-wider font-semibold block mb-2">
              Exercises
            </span>
            <span className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-accent-lime leading-none">
              {rawPlanWorkouts.length}
            </span>
          </div>

          {/* Minutes */}
          <div className="sm:px-6">
            <span className="text-muted-text text-xs uppercase tracking-wider font-semibold block mb-2">
              Minutes
            </span>
            <span className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-none">
              {totalDuration}
            </span>
          </div>

          {/* Calories */}
          <div className="sm:px-6">
            <span className="text-muted-text text-xs uppercase tracking-wider font-semibold block mb-2">
              Calories
            </span>
            <span className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-none">
              {totalCalories}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs & Sort By Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tabs: Today's Plan / Saved */}
        <div className="flex items-center bg-[#10141d] border border-white/10 rounded-xl p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`text-xs sm:text-sm font-medium px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#1e2433] text-white shadow-sm font-semibold"
                : "text-muted-text hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`text-xs sm:text-sm font-medium px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#1e2433] text-white shadow-sm font-semibold"
                : "text-muted-text hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-muted-text font-normal">Sort By</span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "Duration" | "Calories" | "Rating")
              }
              className="appearance-none bg-[#10141d] border border-white/10 hover:border-white/20 text-white text-xs font-semibold px-3 py-1.5 pr-7 rounded-xl focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Duration" className="bg-[#10141d] text-white">
                Duration
              </option>
              <option value="Calories" className="bg-[#10141d] text-white">
                Calories
              </option>
              <option value="Rating" className="bg-[#10141d] text-white">
                Rating
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-muted-text absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-3 text-accent-lime font-display text-sm tracking-wider uppercase py-16">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading workouts…</span>
        </div>
      )}

      {/* Today's Plan Tab Content */}
      {!loading && activeTab === "plan" && (
        <>
          {planWorkouts.length === 0 ? (
            /* Empty State matching screenshot */
            <div className="w-full border border-dashed border-white/10 rounded-2xl p-16 sm:p-24 text-center my-4 flex flex-col items-center justify-center">
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2">
                NOTHING HERE YET
              </h2>
              <p className="text-muted-text text-xs sm:text-sm mb-6 max-w-md mx-auto font-normal">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-accent-lime hover:bg-accent-lime-hover active:scale-95 text-black font-display font-bold text-xs uppercase px-7 py-2.5 rounded-full transition-all shadow-md"
              >
                <span>Go to workouts</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {planWorkouts.map((workout) => (
                <PlanCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Saved Tab Content */}
      {!loading && activeTab === "saved" && (
        <>
          {savedWorkouts.length === 0 ? (
            /* Empty State matching screenshot */
            <div className="w-full border border-dashed border-white/10 rounded-2xl p-16 sm:p-24 text-center my-4 flex flex-col items-center justify-center">
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2">
                NOTHING HERE YET
              </h2>
              <p className="text-muted-text text-xs sm:text-sm mb-6 max-w-md mx-auto font-normal">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-accent-lime hover:bg-accent-lime-hover active:scale-95 text-black font-display font-bold text-xs uppercase px-7 py-2.5 rounded-full transition-all shadow-md"
              >
                <span>Go to workouts</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedWorkouts.map((workout) => (
                <PlanCard key={workout.id} workout={workout} isSavedTab />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
