import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';
import { connectToDatabase, disconnectFromDatabase } from '../database';

export async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Patel',
      email: 'ava@example.com',
      fitnessGoal: 'Build endurance',
      experienceLevel: 'Intermediate',
    },
    {
      name: 'Liam Chen',
      email: 'liam@example.com',
      fitnessGoal: 'Strength training',
      experienceLevel: 'Advanced',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'River Runners',
      members: [users[0].id, users[1].id],
      goal: 'Complete 5K weekly',
    },
    {
      name: 'Peak Performers',
      members: [users[0].id],
      goal: 'Increase squat PR',
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0].id,
      type: 'Run',
      durationMinutes: 35,
      caloriesBurned: 320,
      date: new Date('2026-07-01'),
    },
    {
      userId: users[1].id,
      type: 'Strength',
      durationMinutes: 50,
      caloriesBurned: 410,
      date: new Date('2026-07-02'),
    },
    {
      userId: users[0].id,
      type: 'Cycling',
      durationMinutes: 45,
      caloriesBurned: 390,
      date: new Date('2026-07-03'),
    },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    {
      userId: users[0].id,
      name: users[0].name,
      score: 980,
      rank: 1,
    },
    {
      userId: users[1].id,
      name: users[1].name,
      score: 915,
      rank: 2,
    },
  ]);

  const workouts = await Workout.insertMany([
    {
      name: 'Tempo Run',
      focus: 'Cardio',
      durationMinutes: 30,
      difficulty: 'Intermediate',
    },
    {
      name: 'Upper Body Strength',
      focus: 'Strength',
      durationMinutes: 40,
      difficulty: 'Advanced',
    },
  ]);

  await disconnectFromDatabase();

  return {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
    workouts: workouts.length,
  };
}

if (require.main === module) {
  seedDatabase()
    .then((result) => console.log('Seed complete', result))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
