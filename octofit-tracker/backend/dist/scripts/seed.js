"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const database_1 = require("../database");
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.LeaderboardEntry.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
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
    const teams = await team_1.Team.insertMany([
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
    const activities = await activity_1.Activity.insertMany([
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
    const leaderboard = await leaderboard_1.LeaderboardEntry.insertMany([
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
    const workouts = await workout_1.Workout.insertMany([
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
    await (0, database_1.disconnectFromDatabase)();
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
