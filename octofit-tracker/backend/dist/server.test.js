"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const server_1 = require("./server");
(0, node_test_1.default)('GET /api/users/ returns an empty list', async () => {
    const app = (0, server_1.createApp)();
    const server = app.listen(0);
    try {
        const address = server.address();
        strict_1.default.ok(address && typeof address === 'object');
        const response = await fetch(`http://127.0.0.1:${address.port}/api/users/`);
        strict_1.default.equal(response.status, 200);
        const data = await response.json();
        strict_1.default.deepEqual(data, []);
    }
    finally {
        await new Promise((resolve, reject) => {
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
(0, node_test_1.default)('GET /api/config returns a Codespaces-aware API URL', async () => {
    process.env.CODESPACE_NAME = 'demo-space';
    const app = (0, server_1.createApp)();
    const server = app.listen(0);
    try {
        const address = server.address();
        strict_1.default.ok(address && typeof address === 'object');
        const response = await fetch(`http://127.0.0.1:${address.port}/api/config`);
        strict_1.default.equal(response.status, 200);
        const data = await response.json();
        strict_1.default.equal(data.apiBaseUrl, 'https://demo-space-8000.app.github.dev');
    }
    finally {
        await new Promise((resolve, reject) => {
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
