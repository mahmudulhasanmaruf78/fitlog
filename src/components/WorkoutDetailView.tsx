"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CalendarPlus,
  Bookmark,
  Check,
  ArrowLeft,
} from "lucide-react";
import type { Workout } from "@/lib/api";
import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutDetailViewProps {
  workout: Workout;
}

export default function WorkoutDetailView({ workout }: WorkoutDetailViewProps) {
  const { isInPlan, togglePlan, isSaved, toggleSave } = useWorkout();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handlePlanClick = () => {
    togglePlan(workout.id);
    const msg = inPlan ? "Removed from today's plan" : "Added to today's plan!";
    showToast(msg);
  };

  const handleSaveClick = () => {
    toggleSave(workout.id);
    const msg = saved ? "Removed from saved workouts" : "Saved for later!";
    showToast(msg);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const specRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161b24] border border-accent-lime/40 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm animate-bounce">
          <Check className="w-4 h-4 text-accent-lime" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Workout Detail Container */}
      <div className="bg-[#10141d] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Big Rounded Image */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-inner">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Workout Info, Specs, Instructions, Actions */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white leading-tight mb-2.5">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="text-muted-text text-xs sm:text-sm leading-relaxed mb-4">
              {workout.description}
            </p>

            {/* Badges / Muscle Groups */}
            <div className="flex flex-wrap gap-2 mb-5">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="bg-accent-lime text-black font-bold text-[11px] sm:text-xs px-3.5 py-0.5 rounded-full capitalize"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Specifications Key-Value Table */}
            <div className="bg-[#151923] border border-white/5 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 mb-6">
              {specRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2 sm:py-2.5 border-b border-white/5 last:border-b-0 text-xs sm:text-sm"
                >
                  <span className="font-bold text-[10px] sm:text-xs tracking-wider uppercase text-muted-text/80">
                    {row.label}
                  </span>
                  <span className="font-medium text-white/90">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="mb-6">
                <h2 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">
                  INSTRUCTIONS
                </h2>
                <ol className="space-y-2 text-xs sm:text-sm text-muted-text leading-relaxed">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-muted-text/70 shrink-0 font-medium">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-6">
              {/* Primary: Add to today's plan */}
              <button
                type="button"
                onClick={handlePlanClick}
                className={`inline-flex items-center gap-2 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all active:scale-95 cursor-pointer shadow-md ${
                  inPlan
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-accent-lime hover:bg-accent-lime-hover text-black"
                }`}
              >
                {inPlan ? (
                  <>
                    <Check className="w-4 h-4 text-black stroke-[2.5]" />
                    <span>Added to plan</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4 text-black stroke-[2.2]" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              {/* Secondary: Save for later */}
              <button
                type="button"
                onClick={handleSaveClick}
                className={`inline-flex items-center gap-2 font-medium text-xs sm:text-sm px-5 py-3 rounded-xl transition-all active:scale-95 cursor-pointer border ${
                  saved
                    ? "bg-accent-lime/10 border-accent-lime/40 text-accent-lime"
                    : "bg-transparent hover:bg-white/5 border-white/15 hover:border-white/30 text-white"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    saved ? "fill-accent-lime text-accent-lime" : "text-white"
                  }`}
                />
                <span>{saved ? "Saved" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
