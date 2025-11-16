import { WorkoutData, Week, Day, Exercise, Set } from '../types/workout';

const STORAGE_KEY = 'lifting-coach-workouts';

// Default mock data for MVP testing
export const createDefaultWeek = (weekNumber: number): Week => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Start on Monday

  return {
    id: `week-${weekNumber}`,
    weekNumber,
    startDate: startDate.toISOString().split('T')[0],
    days: [
      {
        id: 'monday',
        dayOfWeek: 'Monday',
        exercises: [
          {
            id: 'bench-press',
            name: 'Bench Press',
            sets: [
              { id: '1', reps: 10, weight: 135, notes: '', completed: false },
              { id: '2', reps: 10, weight: 135, notes: '', completed: false },
              { id: '3', reps: 7, weight: 135, notes: '', completed: false },
              { id: '4', reps: 6, weight: 125, notes: '', completed: false },
            ],
          },
          {
            id: 'db-shoulder-press',
            name: 'DB Shoulder Press',
            sets: [
              { id: '1', reps: 10, weight: 30, notes: '', completed: false },
              { id: '2', reps: 10, weight: 30, notes: '', completed: false },
              { id: '3', reps: 10, weight: 30, notes: '', completed: false },
              { id: '4', reps: 10, weight: 30, notes: '', completed: false },
            ],
          },
          {
            id: 'lateral-db-raise',
            name: 'Lateral DB Raise',
            sets: [
              { id: '1', reps: 12, weight: 10, notes: '', completed: false },
              { id: '2', reps: 12, weight: 10, notes: '', completed: false },
              { id: '3', reps: 12, weight: 10, notes: '', completed: false },
              { id: '4', reps: 12, weight: 10, notes: '', completed: false },
            ],
          },
        ],
      },
      {
        id: 'wednesday',
        dayOfWeek: 'Wednesday',
        exercises: [
          {
            id: 'squats',
            name: 'Squats',
            sets: [
              { id: '1', reps: 5, weight: 225, notes: '', completed: false },
              { id: '2', reps: 5, weight: 225, notes: '', completed: false },
              { id: '3', reps: 5, weight: 225, notes: '', completed: false },
            ],
          },
          {
            id: 'leg-press',
            name: 'Leg Press',
            sets: [
              { id: '1', reps: 10, weight: 405, notes: '', completed: false },
              { id: '2', reps: 10, weight: 405, notes: '', completed: false },
            ],
          },
        ],
      },
      {
        id: 'friday',
        dayOfWeek: 'Friday',
        exercises: [
          {
            id: 'deadlifts',
            name: 'Deadlifts',
            sets: [
              { id: '1', reps: 3, weight: 315, notes: '', completed: false },
              { id: '2', reps: 3, weight: 315, notes: '', completed: false },
              { id: '3', reps: 5, weight: 275, notes: '', completed: false },
            ],
          },
          {
            id: 'rows',
            name: 'Barbell Rows',
            sets: [
              { id: '1', reps: 5, weight: 225, notes: '', completed: false },
              { id: '2', reps: 5, weight: 225, notes: '', completed: false },
              { id: '3', reps: 5, weight: 225, notes: '', completed: false },
            ],
          },
        ],
      },
    ],
  };
};

export const getDefaultWorkoutData = (): WorkoutData => {
  return {
    weeks: [createDefaultWeek(1)],
    currentWeekId: 'week-1',
  };
};

export const loadWorkoutData = (): WorkoutData => {
  if (typeof window === 'undefined') {
    return getDefaultWorkoutData();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored workout data:', e);
      return getDefaultWorkoutData();
    }
  }
  return getDefaultWorkoutData();
};

export const saveWorkoutData = (data: WorkoutData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const updateSet = (
  data: WorkoutData,
  weekId: string,
  dayId: string,
  exerciseId: string,
  setId: string,
  updates: Partial<Set>
): WorkoutData => {
  const newData = JSON.parse(JSON.stringify(data)); // Deep clone
  const week = newData.weeks.find((w: Week) => w.id === weekId);
  if (!week) return data;

  const day = week.days.find((d: Day) => d.id === dayId);
  if (!day) return data;

  const exercise = day.exercises.find((e: Exercise) => e.id === exerciseId);
  if (!exercise) return data;

  const set = exercise.sets.find((s: Set) => s.id === setId);
  if (!set) return data;

  Object.assign(set, updates);
  return newData;
};

export const addExerciseToDay = (
  data: WorkoutData,
  weekId: string,
  dayId: string,
  exerciseName: string
): WorkoutData => {
  const newData = JSON.parse(JSON.stringify(data));
  const week = newData.weeks.find((w: Week) => w.id === weekId);
  if (!week) return data;

  const day = week.days.find((d: Day) => d.id === dayId);
  if (!day) return data;

  const newExercise: Exercise = {
    id: `${exerciseName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    name: exerciseName,
    sets: [
      { id: '1', reps: 8, weight: 0, notes: '', completed: false },
    ],
  };

  day.exercises.push(newExercise);
  return newData;
};

export const addSetToExercise = (
  data: WorkoutData,
  weekId: string,
  dayId: string,
  exerciseId: string
): WorkoutData => {
  const newData = JSON.parse(JSON.stringify(data));
  const week = newData.weeks.find((w: Week) => w.id === weekId);
  if (!week) return data;

  const day = week.days.find((d: Day) => d.id === dayId);
  if (!day) return data;

  const exercise = day.exercises.find((e: Exercise) => e.id === exerciseId);
  if (!exercise) return data;

  const newSetId = (Math.max(...exercise.sets.map(s => parseInt(s.id, 10) || 0)) + 1).toString();
  exercise.sets.push({
    id: newSetId,
    reps: 8,
    weight: 0,
    notes: '',
    completed: false,
  });

  return newData;
};

export const removeSet = (
  data: WorkoutData,
  weekId: string,
  dayId: string,
  exerciseId: string,
  setId: string
): WorkoutData => {
  const newData = JSON.parse(JSON.stringify(data));
  const week = newData.weeks.find((w: Week) => w.id === weekId);
  if (!week) return data;

  const day = week.days.find((d: Day) => d.id === dayId);
  if (!day) return data;

  const exercise = day.exercises.find((e: Exercise) => e.id === exerciseId);
  if (!exercise) return data;

  exercise.sets = exercise.sets.filter((s: Set) => s.id !== setId);
  return newData;
};

export const removeExercise = (
  data: WorkoutData,
  weekId: string,
  dayId: string,
  exerciseId: string
): WorkoutData => {
  const newData = JSON.parse(JSON.stringify(data));
  const week = newData.weeks.find((w: Week) => w.id === weekId);
  if (!week) return data;

  const day = week.days.find((d: Day) => d.id === dayId);
  if (!day) return data;

  day.exercises = day.exercises.filter((e: Exercise) => e.id !== exerciseId);
  return newData;
};

