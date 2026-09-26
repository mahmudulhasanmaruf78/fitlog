"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WorkoutContextType {
  planIds: number[];
  savedIds: number[];
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  togglePlan: (id: number) => void;
  toggleSave: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlanIds(JSON.parse(storedPlan));
      if (storedSaved) setSavedIds(JSON.parse(storedSaved));
    } catch {
      // ignore JSON parse error
    }
    setMounted(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(planIds));
    } catch {
      // ignore
    }
  }, [planIds, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds, mounted]);

  const addToPlan = (id: number) => {
    setPlanIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromPlan = (id: number) => {
    setPlanIds((prev) => prev.filter((item) => item !== id));
  };

  const togglePlan = (id: number) => {
    setPlanIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInPlan = (id: number) => planIds.includes(id);
  const isSaved = (id: number) => savedIds.includes(id);

  return (
    <WorkoutContext.Provider
      value={{
        planIds,
        savedIds,
        addToPlan,
        removeFromPlan,
        togglePlan,
        toggleSave,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
