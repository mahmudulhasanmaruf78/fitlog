"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WorkoutContextType {
  planIds: number[];
  savedIds: number[];
  completedIds: number[];
  addToPlan: (id: number) => { success: boolean; message: string };
  removeFromPlan: (id: number) => void;
  togglePlan: (id: number) => { success: boolean; message: string };
  toggleSave: (id: number) => { success: boolean; message: string };
  toggleDone: (id: number) => { isDone: boolean; message: string };
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      const storedCompleted = localStorage.getItem("fitlog_completed");
      if (storedPlan) setPlanIds(JSON.parse(storedPlan));
      if (storedSaved) setSavedIds(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
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

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("fitlog_completed", JSON.stringify(completedIds));
    } catch {
      // ignore
    }
  }, [completedIds, mounted]);

  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    setToastTimer(timer);
  };

  const addToPlan = (id: number) => {
    if (planIds.includes(id)) {
      const msg = "Already in today's plan";
      showToast(msg);
      return { success: false, message: msg };
    }
    if (planIds.length >= 5) {
      const msg = "Plan is full (5 lifts max). Complete some lifts first!";
      showToast(msg);
      return { success: false, message: msg };
    }
    setPlanIds((prev) => [...prev, id]);
    const msg = "Added to today's plan";
    showToast(msg);
    return { success: true, message: msg };
  };

  const removeFromPlan = (id: number) => {
    setPlanIds((prev) => prev.filter((item) => item !== id));
    setCompletedIds((prev) => prev.filter((item) => item !== id));
    showToast("Removed from today's plan");
  };

  const togglePlan = (id: number) => {
    if (planIds.includes(id)) {
      removeFromPlan(id);
      return { success: true, message: "Removed from today's plan" };
    } else {
      return addToPlan(id);
    }
  };

  const toggleSave = (id: number) => {
    const isCurrentlySaved = savedIds.includes(id);
    if (isCurrentlySaved) {
      setSavedIds((prev) => prev.filter((item) => item !== id));
      const msg = "Removed from saved workouts";
      showToast(msg);
      return { success: true, message: msg };
    } else {
      setSavedIds((prev) => [...prev, id]);
      const msg = "Added to saved workouts";
      showToast(msg);
      return { success: true, message: msg };
    }
  };

  const toggleDone = (id: number) => {
    const isAlreadyDone = completedIds.includes(id);
    if (isAlreadyDone) {
      setCompletedIds((prev) => prev.filter((item) => item !== id));
      showToast("Marked as incomplete");
      return { isDone: false, message: "Marked as incomplete" };
    } else {
      setCompletedIds((prev) => [...prev, id]);
      showToast("Workout marked as done! Great work! 🎉");
      return { isDone: true, message: "Workout marked as done!" };
    }
  };

  const isInPlan = (id: number) => planIds.includes(id);
  const isSaved = (id: number) => savedIds.includes(id);
  const isDone = (id: number) => completedIds.includes(id);

  return (
    <WorkoutContext.Provider
      value={{
        planIds,
        savedIds,
        completedIds,
        addToPlan,
        removeFromPlan,
        togglePlan,
        toggleSave,
        toggleDone,
        isInPlan,
        isSaved,
        isDone,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161b24] border border-accent-lime/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm animate-bounce font-medium">
          <div className="w-2 h-2 rounded-full bg-accent-lime" />
          <span>{toastMessage}</span>
        </div>
      )}
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
