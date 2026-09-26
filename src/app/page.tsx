import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero / Banner Section */}
      <Hero />

      {/* Library Grid with API Integration */}
      <WorkoutLibrary />
    </div>
  );
}
