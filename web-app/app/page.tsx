'use client';

import { useState, useEffect } from 'react';
import { WorkoutData, Week, Day, Set } from './types/workout';
import { WeekNavigation } from './components/WeekNavigation';
import { DayView } from './components/DayView';
import {
  loadWorkoutData,
  saveWorkoutData,
  updateSet,
  addExerciseToDay,
  addSetToExercise,
  removeSet,
  removeExercise,
} from './utils/storage';

export default function Home() {
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  // Load data on mount
  useEffect(() => {
    const data = loadWorkoutData();
    setWorkoutData(data);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (workoutData) {
      saveWorkoutData(workoutData);
    }
  }, [workoutData]);

  if (!workoutData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  const currentWeek = workoutData.weeks.find(
    (w) => w.id === workoutData.currentWeekId
  );

  if (!currentWeek) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Error: Week not found</div>
      </div>
    );
  }

  const currentDay = currentWeek.days[currentDayIndex];

  const handleWeekChange = (weekId: string) => {
    setWorkoutData((prev) =>
      prev ? { ...prev, currentWeekId: weekId } : prev
    );
  };

  const handleSetUpdate = (
    exerciseId: string,
    setId: string,
    updates: Partial<Set>
  ) => {
    setWorkoutData((prev) =>
      prev
        ? updateSet(prev, currentWeek.id, currentDay.id, exerciseId, setId, updates)
        : prev
    );
  };

  const handleAddSet = (exerciseId: string) => {
    setWorkoutData((prev) =>
      prev ? addSetToExercise(prev, currentWeek.id, currentDay.id, exerciseId) : prev
    );
  };

  const handleRemoveSet = (exerciseId: string, setId: string) => {
    setWorkoutData((prev) =>
      prev
        ? removeSet(prev, currentWeek.id, currentDay.id, exerciseId, setId)
        : prev
    );
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setWorkoutData((prev) =>
      prev
        ? removeExercise(prev, currentWeek.id, currentDay.id, exerciseId)
        : prev
    );
  };

  const handleAddExercise = (exerciseName: string) => {
    setWorkoutData((prev) =>
      prev
        ? addExerciseToDay(prev, currentWeek.id, currentDay.id, exerciseName)
        : prev
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <WeekNavigation
        weeks={workoutData.weeks}
        currentWeekId={workoutData.currentWeekId}
        onWeekChange={handleWeekChange}
      />

      <main className="max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-8 sm:px-6">
        {/* Day Navigation Tabs */}
        <div className="mb-6 md:mb-8 flex gap-2 overflow-x-auto pb-3 md:pb-4">
          {currentWeek.days.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setCurrentDayIndex(index)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 text-sm md:text-base min-h-10 ${
                currentDayIndex === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
              }`}
            >
              {day.dayOfWeek}
            </button>
          ))}
        </div>

        {/* Day Content */}
        <DayView
          day={currentDay}
          weekId={currentWeek.id}
          onSetUpdate={handleSetUpdate}
          onAddSet={handleAddSet}
          onRemoveSet={handleRemoveSet}
          onRemoveExercise={handleRemoveExercise}
          onAddExercise={handleAddExercise}
        />
      </main>
    </div>
  );
}
