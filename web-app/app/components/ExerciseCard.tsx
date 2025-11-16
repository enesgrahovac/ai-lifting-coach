'use client';

import { Exercise, Set } from '../types/workout';
import { SetRow } from './SetRow';
import { useState } from 'react';

interface ExerciseCardProps {
  exercise: Exercise;
  weekId: string;
  dayId: string;
  onSetUpdate: (setId: string, updates: Partial<Set>) => void;
  onAddSet: () => void;
  onRemoveSet: (setId: string) => void;
  onRemoveExercise: () => void;
}

export function ExerciseCard({
  exercise,
  weekId,
  dayId,
  onSetUpdate,
  onAddSet,
  onRemoveSet,
  onRemoveExercise,
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const completedCount = exercise.sets.filter((s) => s.completed).length;

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
      {/* Header */}
      <div
        className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-b border-zinc-200 dark:border-zinc-700 cursor-pointer hover:opacity-90 transition-opacity flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <span className={`text-xl md:text-2xl transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base md:text-lg text-zinc-900 dark:text-white break-words">
              {exercise.name}
            </h3>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
              {completedCount}/{exercise.sets.length} sets completed
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveExercise();
          }}
          className="px-3 py-1 md:px-3 md:py-1 text-red-600 hover:bg-red-50 rounded transition-colors dark:text-red-400 dark:hover:bg-red-950 text-sm md:text-base whitespace-nowrap"
          title="Delete exercise"
        >
          Remove
        </button>
      </div>

      {/* Sets */}
      {isExpanded && (
        <div className="px-4 md:px-6 py-3 md:py-4 space-y-3">
          {exercise.sets.map((set, index) => (
            <SetRow
              key={set.id}
              setNumber={index + 1}
              set={set}
              onUpdate={(updates) => onSetUpdate(set.id, updates)}
              onRemove={() => onRemoveSet(set.id)}
            />
          ))}

          {/* Add Set Button */}
          <button
            onClick={onAddSet}
            className="w-full mt-4 py-2 md:py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-950 text-sm md:text-base min-h-10"
          >
            + Add Set
          </button>
        </div>
      )}
    </div>
  );
}

