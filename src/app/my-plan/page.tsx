"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWorkouts, type Workout } from "@/lib/api";
import { useWorkout } from "@/context/WorkoutContext";
import {
  Calendar,
  Bookmark,
  Clock,
  Flame,
  Star,
  Check,
  X,
  Eye,
  Loader2,
  Dumbbell,
} from "lucide-react";

export default function MyPlanPage() {
  const {
    planIds,
    savedIds,
    removeFromPlan,
    toggleSave,
    toggleDone,
    isDone,
  } = useWorkout();

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2">
            MY PLAN
          </h1>
          <p className="text-muted-text text-sm sm:text-base font-normal">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Tabs: Today's Plan / Saved */}
        <div className="flex items-center bg-[#121620] border border-white/10 rounded-xl p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "plan"
                ? "bg-accent-lime text-black shadow-sm"
                : "text-muted-text hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today&apos;s Plan ({planIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-accent-lime text-black shadow-sm"
                : "text-muted-text hover:text-white"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Row (3 stat cards) */}
      {activeTab === "plan" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Exercises */}
          <div className="bg-[#10141d] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <span className="text-muted-text text-xs uppercase tracking-wider font-semibold mb-2">
              Exercises
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-white">
                {planWorkouts.length}
              </span>
              <span className="text-xs text-muted-text">/ 5 lifts max</span>
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-[#10141d] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <span className="text-muted-text text-xs uppercase tracking-wider font-semibold mb-2">
              Minutes
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-accent-lime">
                {totalDuration}
              </span>
              <span className="text-xs text-muted-text">min total</span>
            </div>
          </div>

          {/* Calories */}
          <div className="bg-[#10141d] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <span className="text-muted-text text-xs uppercase tracking-wider font-semibold mb-2">
              Calories
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-white">
                {totalCalories}
              </span>
              <span className="text-xs text-muted-text">kcal est.</span>
            </div>
          </div>
        </div>
      )}

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
            /* Empty State */
            <div className="bg-[#10141d] border border-dashed border-white/15 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto my-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-accent-lime">
                <Dumbbell className="w-8 h-8" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                NOTHING HERE YET
              </h2>
              <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-accent-lime hover:bg-accent-lime-hover active:scale-95 text-black font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <span>Go to workouts</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {planWorkouts.map((workout) => {
                const done = isDone(workout.id);
                return (
                  <div
                    key={workout.id}
                    className={`group flex flex-col bg-[#12151c] border rounded-2xl p-4 transition-all duration-200 relative ${
                      done
                        ? "border-accent-lime/40 bg-[#141b14]"
                        : "border-white/5 hover:border-white/15"
                    }`}
                  >
                    {/* Remove (X) Button */}
                    <button
                      type="button"
                      onClick={() => removeFromPlan(workout.id)}
                      title="Remove from plan"
                      className="absolute top-6 right-6 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-red-500/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/40 mb-3.5">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      {done && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-accent-lime text-black font-display font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            COMPLETED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Muscle Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {workout.muscleGroups?.map((group) => (
                            <span
                              key={group}
                              className="bg-accent-lime text-black font-display font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                            >
                              {group}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3
                          className={`font-display text-lg font-bold uppercase tracking-wide mb-1 ${
                            done ? "line-through text-white/60" : "text-white"
                          }`}
                        >
                          {workout.name}
                        </h3>

                        {/* Equipment */}
                        <p className="text-xs text-muted-text mb-3">
                          {workout.equipment}
                        </p>
                      </div>

                      <div>
                        {/* Stats Row */}
                        <div className="flex items-center gap-4 text-xs text-muted-text py-2 border-t border-white/5 mb-3.5">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-muted-text/80" />
                            <span>{workout.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-muted-text/80" />
                            <span>{workout.caloriesBurned} kcal</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-muted-text/80" />
                            <span>{workout.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        {/* Action Buttons: View Details & Mark as Done */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/workout/${workout.id}`}
                            className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs py-2 px-3 rounded-lg transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => toggleDone(workout.id)}
                            className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg transition-all active:scale-95 cursor-pointer ${
                              done
                                ? "bg-accent-lime text-black hover:bg-accent-lime-hover"
                                : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{done ? "Done" : "Mark as Done"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Saved Tab Content */}
      {!loading && activeTab === "saved" && (
        <>
          {savedWorkouts.length === 0 ? (
            /* Empty State */
            <div className="bg-[#10141d] border border-dashed border-white/15 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto my-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white">
                <Bookmark className="w-8 h-8" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                NOTHING HERE YET
              </h2>
              <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-accent-lime hover:bg-accent-lime-hover active:scale-95 text-black font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <span>Go to workouts</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {savedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="group flex flex-col bg-[#12151c] border border-white/5 hover:border-white/15 rounded-2xl p-4 transition-all duration-200 relative"
                >
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => toggleSave(workout.id)}
                    title="Remove from saved"
                    className="absolute top-6 right-6 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-red-500/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/40 mb-3.5">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {workout.muscleGroups?.map((group) => (
                          <span
                            key={group}
                            className="bg-accent-lime text-black font-display font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                          >
                            {group}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white mb-1">
                        {workout.name}
                      </h3>

                      {/* Equipment */}
                      <p className="text-xs text-muted-text mb-3">
                        {workout.equipment}
                      </p>
                    </div>

                    <div>
                      {/* Stats Row */}
                      <div className="flex items-center gap-4 text-xs text-muted-text py-2 border-t border-white/5 mb-3.5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted-text/80" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-muted-text/80" />
                          <span>{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-muted-text/80" />
                          <span>{workout.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Link
                        href={`/workout/${workout.id}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-accent-lime hover:bg-accent-lime-hover active:scale-95 text-black font-semibold text-xs py-2 px-3 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
