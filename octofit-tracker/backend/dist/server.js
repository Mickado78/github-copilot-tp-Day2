"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
exports.getApiBaseUrl = getApiBaseUrl;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const database_1 = require("./database");
const port = Number(process.env.PORT) || 8000;
const databaseReady = (0, database_1.connectToDatabase)().catch((error) => {
    console.error('MongoDB connection error:', error);
    throw error;
});
async function runDatabaseOperation(operation) {
    await databaseReady;
    return operation();
}
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
}
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok' });
    });
    app.get('/api/config', (_req, res) => {
        res.json({ apiBaseUrl: getApiBaseUrl() });
    });
    app.get('/api/users/', async (_req, res) => {
        try {
            const users = await runDatabaseOperation(() => user_1.User.find({}));
            res.json(users);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/teams/', async (_req, res) => {
        try {
            const teams = await runDatabaseOperation(() => team_1.Team.find({}));
            res.json(teams);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/activities/', async (_req, res) => {
        try {
            const activities = await runDatabaseOperation(() => activity_1.Activity.find({}));
            res.json(activities);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/leaderboard/', async (_req, res) => {
        try {
            const leaderboard = await runDatabaseOperation(() => leaderboard_1.LeaderboardEntry.find({}).sort({ rank: 1 }));
            res.json(leaderboard);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/workouts/', async (_req, res) => {
        try {
            const workouts = await runDatabaseOperation(() => workout_1.Workout.find({}));
            res.json(workouts);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/users/:id', async (req, res) => {
        try {
            const user = await runDatabaseOperation(() => user_1.User.findById(req.params.id));
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/teams/:id', async (req, res) => {
        try {
            const team = await runDatabaseOperation(() => team_1.Team.findById(req.params.id));
            if (!team) {
                res.status(404).json({ error: 'Team not found' });
                return;
            }
            res.json(team);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/activities/:id', async (req, res) => {
        try {
            const activity = await runDatabaseOperation(() => activity_1.Activity.findById(req.params.id));
            if (!activity) {
                res.status(404).json({ error: 'Activity not found' });
                return;
            }
            res.json(activity);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/leaderboard/:id', async (req, res) => {
        try {
            const entry = await runDatabaseOperation(() => leaderboard_1.LeaderboardEntry.findById(req.params.id));
            if (!entry) {
                res.status(404).json({ error: 'Leaderboard entry not found' });
                return;
            }
            res.json(entry);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.get('/api/workouts/:id', async (req, res) => {
        try {
            const workout = await runDatabaseOperation(() => workout_1.Workout.findById(req.params.id));
            if (!workout) {
                res.status(404).json({ error: 'Workout not found' });
                return;
            }
            res.json(workout);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database unavailable' });
        }
    });
    app.use((_req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    app.use((error, _req, res, _next) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });
    return app;
}
function startServer() {
    const app = createApp();
    databaseReady
        .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
        });
    })
        .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
}
if (require.main === module) {
    startServer();
}
