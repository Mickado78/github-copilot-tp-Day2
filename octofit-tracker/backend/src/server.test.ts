import assert from 'node:assert/strict';
import test from 'node:test';
import { createApp } from './server';

test('GET /api/users/ returns an empty list', async () => {
  const app = createApp();
  const server = app.listen(0);

  try {
    const address = server.address();
    assert.ok(address && typeof address === 'object');

    const response = await fetch(`http://127.0.0.1:${address.port}/api/users/`);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.deepEqual(data, []);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
});

test('GET /api/config returns a Codespaces-aware API URL', async () => {
  process.env.CODESPACE_NAME = 'demo-space';
  const app = createApp();
  const server = app.listen(0);

  try {
    const address = server.address();
    assert.ok(address && typeof address === 'object');

    const response = await fetch(`http://127.0.0.1:${address.port}/api/config`);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.equal(data.apiBaseUrl, 'https://demo-space-8000.app.github.dev');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
});
