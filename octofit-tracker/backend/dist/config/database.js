"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function connectToDatabase() {
    return mongoose_1.default.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
    });
}
async function disconnectFromDatabase() {
    await mongoose_1.default.disconnect();
}
