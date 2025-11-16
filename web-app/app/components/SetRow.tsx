'use client';

import { Set } from '../types/workout';
import { useState } from 'react';

interface SetRowProps {
  setNumber: number;
  set: Set;
  onUpdate: (updates: Partial<Set>) => void;
  onRemove: () => void;
}

export function SetRow({ setNumber, set, onUpdate, onRemove }: SetRowProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
      {/* Set Number */}
      <div className="flex-shrink-0 w-8 text-center font-semibold text-zinc-600 dark:text-zinc-400">
        {setNumber}
      </div>

      {/* Mobile Row: Weight & Reps */}
      <div className="flex gap-3 flex-1">
        {/* Weight Input */}
        <div className="flex items-center gap-2 flex-1 md:flex-initial">
          <input
            type="number"
            value={set.weight}
            onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) || 0 })}
            placeholder="0"
            className="w-full md:w-24 px-3 py-2 border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-center text-sm md:text-base"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">lbs</span>
        </div>

        {/* Rep Input */}
        <div className="flex items-center gap-2 flex-1 md:flex-initial">
          <input
            type="number"
            value={set.reps}
            onChange={(e) => onUpdate({ reps: parseInt(e.target.value, 10) || 0 })}
            placeholder="0"
            className="w-full md:w-20 px-3 py-2 border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-center text-sm md:text-base"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">reps</span>
        </div>
      </div>

      {/* Notes - Full width on mobile */}
      <div className="w-full md:w-auto md:flex-1 relative">
        {!isEditingNotes ? (
          <button
            onClick={() => setIsEditingNotes(true)}
            className="w-full text-left px-3 py-2 border border-dashed border-zinc-300 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors truncate md:min-h-10"
          >
            {set.notes || 'Notes...'}
          </button>
        ) : (
          <input
            type="text"
            value={set.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            onBlur={() => setIsEditingNotes(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditingNotes(false);
            }}
            placeholder="Add notes..."
            autoFocus
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-sm"
          />
        )}
      </div>

      {/* Action Buttons - Full width on mobile, inline on desktop */}
      <div className="flex gap-2 w-full md:w-auto">
        {/* Completed Toggle */}
        <button
          onClick={() => onUpdate({ completed: !set.completed })}
          className={`flex-1 md:flex-initial px-4 py-2 rounded-lg font-medium transition-colors min-h-10 text-sm md:text-base ${
            set.completed
              ? 'bg-green-600 text-white'
              : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
          }`}
        >
          {set.completed ? '✓ Done' : 'Mark'}
        </button>

        {/* Delete Button - TODO: Re-enable with confirmation dialog */}
        {/* <button
          onClick={onRemove}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-950 min-h-10 text-sm md:text-base"
          title="Delete set"
        >
          Remove
        </button> */}
      </div>
    </div>
  );
}

