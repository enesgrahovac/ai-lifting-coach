export interface Set {
  id: string;
  reps: number;
  weight: number; // in lbs or kg
  notes: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Day {
  id: string;
  dayOfWeek: string; // "Monday", "Tuesday", etc.
  exercises: Exercise[];
}

export interface Week {
  id: string;
  weekNumber: number;
  startDate: string; // ISO date string
  days: Day[];
}

export interface WorkoutData {
  weeks: Week[];
  currentWeekId: string;
}

