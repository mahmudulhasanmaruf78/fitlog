"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWorkouts, type Workout } from "@/lib/api";
import { useWorkout } from "@/context/WorkoutContext";
import WorkoutCard from "@/components/WorkoutCard";
import { Dumbbell, Bookmark, Calendar, ArrowLeft, Trash2 } from "lucide-react";

export default function MyPlanPage() {
  const { planIds, savedIds, removeFromPlan, toggleSave } = useWorkout();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

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

  const planWorkouts = workouts.filter((w) => planIds.includes(w.id));
  const savedWorkouts = workouts.filter((w) => savedIds.includes(w.id));

  const totalDuration = planWorkouts.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = planWorkouts.reduce((acc, w) => acc + w.caloriesBurned, 0);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-text hover:text-white transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 text-accent-lime transition-transform group-hover:-translate-x-1" />
        <span>Back to Workouts</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-1.5">
            YOUR TRAINING LOG
          </h1>
          <p className="text-muted-text text-sm">
            Manage your daily routine and bookmarked lifts.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-[#121620] border border-white/10 rounded-xl p-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              activeTab === "plan"
                ? "bg-accent-lime text-black"
                : "text-muted-text hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today&apos;s Plan ({planIds.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              activeTab === "saved"
                ? "bg-accent-lime text-black"
                : "text-muted-text hover:text-white"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Stats Summary for Plan */}
      {activeTab === "plan" && planWorkouts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#121620] border border-white/5 rounded-2xl p-4">
            <span className="text-muted-text text-[11px] uppercase tracking-wider block mb-1">
              Exercises
            </span>
            <span className="font-display text-2xl font-bold text-white">
              {planWorkouts.length} Lifts
            </span>
          </div>
          <div className="bg-[#121620] border border-white/5 rounded-2xl p-4">
            <span className="text-muted-text text-[11px] uppercase tracking-wider block mb-1">
              Est. Time
            </span>
            <span className="font-display text-2xl font-bold text-accent-lime">
              {totalDuration} Min
            </span>
          </div>
          <div className="bg-[#121620] border border-white/5 rounded-2xl p-4 col-span-2 sm:col-span-1">
            <span className="text-muted-text text-[11px] uppercase tracking-wider block mb-1">
              Est. Burn
            </span>
            <span className="font-display text-2xl font-bold text-white">
              {totalCalories} kcal
            </span>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-muted-text text-sm py-12 text-center animate-pulse">
          Loading your training log…
        </div>
      )}

      {/* Content */}
      {!loading && activeTab === "plan" && (
        <>
          {planWorkouts.length === 0 ? (
            <div className="bg-[#10141d] border border-dashed border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-accent-lime">
                <Dumbbell className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2">
                No Workouts in Today&apos;s Plan
              </h3>
              <p className="text-muted-text text-sm mb-6">
                Explore the library, pick an exercise, and click &quot;Add to today&apos;s plan&quot;.
              </p>
              <Link
                href="/#library"
                className="inline-flex items-center gap-2 bg-accent-lime text-black font-semibold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-accent-lime-hover transition-colors"
              >
                Browse Library
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {planWorkouts.map((workout) => (
                <div key={workout.id} className="relative group/item">
                  <WorkoutCard workout={workout} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromPlan(workout.id);
                    }}
                    title="Remove from plan"
                    className="absolute top-5 right-5 z-20 bg-black/70 hover:bg-red-500/90 text-white/80 hover:text-white p-2 rounded-xl backdrop-blur-sm transition-colors border border-white/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!loading && activeTab === "saved" && (
        <>
          {savedWorkouts.length === 0 ? (
            <div className="bg-[#10141d] border border-dashed border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-white">
                <Bookmark className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2">
                No Saved Workouts
              </h3>
              <p className="text-muted-text text-sm mb-6">
                Bookmark lifts to quickly find them later when planning your sessions.
              </p>
              <Link
                href="/#library"
                className="inline-flex items-center gap-2 bg-accent-lime text-black font-semibold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-accent-lime-hover transition-colors"
              >
                Browse Library
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {savedWorkouts.map((workout) => (
                <div key={workout.id} className="relative group/item">
                  <WorkoutCard workout={workout} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSave(workout.id);
                    }}
                    title="Remove from saved"
                    className="absolute top-5 right-5 z-20 bg-black/70 hover:bg-red-500/90 text-white/80 hover:text-white p-2 rounded-xl backdrop-blur-sm transition-colors border border-white/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
