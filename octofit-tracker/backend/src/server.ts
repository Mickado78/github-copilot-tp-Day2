import express, { type Request, type Response, type NextFunction } from 'express';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';
import { connectToDatabase } from './database';

const port = Number(process.env.PORT) || 8000;
const databaseReady = connectToDatabase().catch((error: Error) => {
  console.error('MongoDB connection error:', error);
  throw error;
});

async function runDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
  await databaseReady;
  return operation();
}

function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
}

function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/config', (_req: Request, res: Response) => {
    res.json({ apiBaseUrl: getApiBaseUrl() });
  });

  app.get('/api/users/', async (_req: Request, res: Response) => {
    try {
      const users = await runDatabaseOperation(() => User.find({}));
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/teams/', async (_req: Request, res: Response) => {
    try {
      const teams = await runDatabaseOperation(() => Team.find({}));
      res.json(teams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/activities/', async (_req: Request, res: Response) => {
    try {
      const activities = await runDatabaseOperation(() => Activity.find({}));
      res.json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
    try {
      const leaderboard = await runDatabaseOperation(() => LeaderboardEntry.find({}).sort({ rank: 1 }));
      res.json(leaderboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/workouts/', async (_req: Request, res: Response) => {
    try {
      const workouts = await runDatabaseOperation(() => Workout.find({}));
      res.json(workouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const user = await runDatabaseOperation(() => User.findById(req.params.id));
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/teams/:id', async (req: Request, res: Response) => {
    try {
      const team = await runDatabaseOperation(() => Team.findById(req.params.id));
      if (!team) {
        res.status(404).json({ error: 'Team not found' });
        return;
      }
      res.json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/activities/:id', async (req: Request, res: Response) => {
    try {
      const activity = await runDatabaseOperation(() => Activity.findById(req.params.id));
      if (!activity) {
        res.status(404).json({ error: 'Activity not found' });
        return;
      }
      res.json(activity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/leaderboard/:id', async (req: Request, res: Response) => {
    try {
      const entry = await runDatabaseOperation(() => LeaderboardEntry.findById(req.params.id));
      if (!entry) {
        res.status(404).json({ error: 'Leaderboard entry not found' });
        return;
      }
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.get('/api/workouts/:id', async (req: Request, res: Response) => {
    try {
      const workout = await runDatabaseOperation(() => Workout.findById(req.params.id));
      if (!workout) {
        res.status(404).json({ error: 'Workout not found' });
        return;
      }
      res.json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database unavailable' });
    }
  });

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
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
    .catch((error: Error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
}

if (require.main === module) {
  startServer();
}

export { createApp, getApiBaseUrl, startServer };
