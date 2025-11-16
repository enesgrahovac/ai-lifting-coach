'use client';

import { Week } from '../types/workout';

interface WeekNavigationProps {
  weeks: Week[];
  currentWeekId: string;
  onWeekChange: (weekId: string) => void;
}

export function WeekNavigation({
  weeks,
  currentWeekId,
  onWeekChange,
}: WeekNavigationProps) {
  const currentWeek = weeks.find((w) => w.id === currentWeekId);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
              Week {currentWeek?.weekNumber}
            </h1>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Starting {currentWeek ? new Date(currentWeek.startDate).toLocaleDateString() : ''}
            </p>
          </div>
          <div className="flex gap-2">
            {weeks.map((week) => (
              <button
                key={week.id}
                onClick={() => onWeekChange(week.id)}
                className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base min-h-10 ${
                  week.id === currentWeekId
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                W{week.weekNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

