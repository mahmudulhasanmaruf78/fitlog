import { getWorkoutById, getWorkouts } from "@/lib/api";
import WorkoutDetailView from "@/components/WorkoutDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const workouts = await getWorkouts();
  return workouts.map((workout) => ({
    id: workout.id.toString(),
  }));
}

export async function generateMetadata({ params }: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  if (!workout) {
    return { title: "Workout Not Found — FitLog" };
  }
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailView workout={workout} />;
}
