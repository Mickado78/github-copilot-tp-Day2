import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
