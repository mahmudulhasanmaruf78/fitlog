"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import type { Workout } from "@/lib/api";
import { useWorkout } from "@/context/WorkoutContext";

interface PlanCardProps {
  workout: Workout;
  isSavedTab?: boolean;
}

export default function PlanCard({
  workout,
  isSavedTab = false,
}: PlanCardProps) {
  const { removeFromPlan, toggleSave, toggleDone, isDone } = useWorkout();
  const done = !isSavedTab && isDone(workout.id);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSavedTab) {
      toggleSave(workout.id);
    } else {
      removeFromPlan(workout.id);
    }
  };

  const handleToggleDone = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleDone(workout.id);
  };

  return (
    <div
      className={`w-full flex flex-col sm:flex-row sm:items-center justify-between bg-[#10141d] border rounded-2xl p-4 gap-4 transition-all duration-200 ${
        done
          ? "border-accent-lime/40 bg-[#121815]"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Left: Image & Information */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
        {/* Thumbnail Image */}
        <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-black/40 shrink-0">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover"
          />
          {done && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-accent-lime text-black font-display font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Check className="w-3 h-3 stroke-3" />
                DONE
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center min-w-0 py-0.5">
          <h3
            className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide truncate ${
              done ? "line-through text-white/50" : "text-white"
            }`}
          >
            {workout.name}
          </h3>

          <p className="text-xs text-muted-text mb-2.5">{workout.equipment}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs text-muted-text">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-lime" />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-accent-lime" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-accent-lime" />
              <span>{workout.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Action Buttons Row */}
      <div className="flex items-center gap-2.5 sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 justify-end">
        {/* View Details Button */}
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl sm:rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium transition-colors active:scale-95"
        >
          View Details
        </Link>

        {/* Mark as Done Button (Plan Tab only) */}
        {!isSavedTab && (
          <button
            type="button"
            onClick={handleToggleDone}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
              done
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-accent-lime hover:bg-accent-lime-hover text-black"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{done ? "Done" : "Mark as Done"}</span>
          </button>
        )}

        {/* Remove (X) Button */}
        <button
          type="button"
          onClick={handleRemove}
          title={isSavedTab ? "Remove from saved" : "Remove from plan"}
          className="text-muted-text hover:text-white p-1.5 transition-colors cursor-pointer ml-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
