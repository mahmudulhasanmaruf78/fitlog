"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/api";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#12151c] border border-white/5 hover:border-white/15 rounded-2xl p-3.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Inset Image with rounded corners and uniform card padding */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/40 mb-3.5">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between px-1 pb-1">
        <div>
          {/* Solid Lime Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {workout.muscleGroups?.map((group) => (
              <span
                key={group}
                className="bg-accent-lime text-black font-display font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full leading-tight"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Exercise Name */}
          <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-accent-lime transition-colors leading-snug mb-1">
            {workout.name}
          </h3>

          {/* Equipment Subline */}
          <p className="text-xs text-muted-text mb-4 font-normal">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row: clock, flame, star with exact clean spacing */}
        <div className="flex items-center gap-4 text-xs text-muted-text pt-2">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-muted-text/80" />
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-muted-text/80" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-muted-text/80" />
            <span>{workout.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
