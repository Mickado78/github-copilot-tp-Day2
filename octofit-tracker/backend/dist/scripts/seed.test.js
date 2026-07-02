"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const seed_1 = require("./seed");
(0, node_test_1.default)('seedDatabase inserts sample records for each collection', async () => {
    const result = await (0, seed_1.seedDatabase)();
    strict_1.default.equal(result.users, 2);
    strict_1.default.equal(result.teams, 2);
    strict_1.default.equal(result.activities, 3);
    strict_1.default.equal(result.leaderboard, 2);
    strict_1.default.equal(result.workouts, 2);
});
