"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, Eye } from "lucide-react";
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
      className={`group flex flex-col bg-[#12151c] border rounded-2xl p-4 transition-all duration-200 relative ${
        done
          ? "border-accent-lime/40 bg-[#141b14]"
          : "border-white/5 hover:border-white/15"
      }`}
    >
      {/* Remove (X) Button */}
      <button
        type="button"
        onClick={handleRemove}
        title={isSavedTab ? "Remove from saved" : "Remove from plan"}
        className="absolute top-6 right-6 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-red-500/90 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Thumbnail */}
      <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden bg-black/40 mb-3.5">
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
              <Check className="w-3.5 h-3.5 stroke-3" />
              COMPLETED
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category Badges */}
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
          <p className="text-xs text-muted-text mb-3">{workout.equipment}</p>
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

          {/* Action Buttons: View Details, Mark as Done, Remove X */}
          {isSavedTab ? (
            <Link
              href={`/workout/${workout.id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-accent-lime hover:bg-accent-lime-hover active:scale-95 text-black font-semibold text-xs py-2 px-3 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </Link>
          ) : (
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
                onClick={handleToggleDone}
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
          )}
        </div>
      </div>
    </div>
  );
}
