'use client';

import { Day, Set } from '../types/workout';
import { ExerciseCard } from './ExerciseCard';
import { useState } from 'react';

interface DayViewProps {
  day: Day;
  weekId: string;
  onSetUpdate: (exerciseId: string, setId: string, updates: Partial<Set>) => void;
  onAddSet: (exerciseId: string) => void;
  onRemoveSet: (exerciseId: string, setId: string) => void;
  onRemoveExercise: (exerciseId: string) => void;
  onAddExercise: (exerciseName: string) => void;
}

export function DayView({
  day,
  weekId,
  onSetUpdate,
  onAddSet,
  onRemoveSet,
  onRemoveExercise,
  onAddExercise,
}: DayViewProps) {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const completedExercises = day.exercises.filter((ex) =>
    ex.sets.every((s) => s.completed)
  ).length;

  const handleAddExercise = () => {
    if (newExerciseName.trim()) {
      onAddExercise(newExerciseName);
      setNewExerciseName('');
      setShowAddExercise(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Day Header */}
      <div className="border-b-2 border-zinc-200 dark:border-zinc-800 pb-3 md:pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
          {day.dayOfWeek}
        </h2>
        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {completedExercises}/{day.exercises.length} exercises completed
        </p>
      </div>

      {/* Exercises */}
      <div className="space-y-3 md:space-y-4">
        {day.exercises.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
            No exercises for this day yet
          </div>
        ) : (
          day.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              weekId={weekId}
              dayId={day.id}
              onSetUpdate={(setId, updates) =>
                onSetUpdate(exercise.id, setId, updates)
              }
              onAddSet={() => onAddSet(exercise.id)}
              onRemoveSet={(setId) => onRemoveSet(exercise.id, setId)}
              onRemoveExercise={() => onRemoveExercise(exercise.id)}
            />
          ))
        )}
      </div>

      {/* Add Exercise Section */}
      {showAddExercise ? (
        <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-3 md:p-4 bg-blue-50 dark:bg-blue-950">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddExercise();
                if (e.key === 'Escape') {
                  setShowAddExercise(false);
                  setNewExerciseName('');
                }
              }}
              placeholder="Enter exercise name..."
              autoFocus
              className="flex-1 px-3 md:px-4 py-2 md:py-2 border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white text-sm md:text-base"
            />
            <button
              onClick={handleAddExercise}
              className="px-6 py-2 md:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base min-h-10"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddExercise(false);
                setNewExerciseName('');
              }}
              className="px-4 py-2 md:py-2 bg-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-300 transition-colors dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 text-sm md:text-base min-h-10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddExercise(true)}
          className="w-full py-3 md:py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-600 dark:text-zinc-400 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm md:text-base min-h-10"
        >
          + Add Exercise
        </button>
      )}
    </div>
  );
}

