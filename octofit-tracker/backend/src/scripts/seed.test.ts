import assert from 'node:assert/strict';
import test from 'node:test';
import { seedDatabase } from './seed';

test('seedDatabase inserts sample records for each collection', async () => {
  const result = await seedDatabase();

  assert.equal(result.users, 2);
  assert.equal(result.teams, 2);
  assert.equal(result.activities, 3);
  assert.equal(result.leaderboard, 2);
  assert.equal(result.workouts, 2);
});
