"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
var database_1 = require("./config/database");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return database_1.connectToDatabase; } });
Object.defineProperty(exports, "disconnectFromDatabase", { enumerable: true, get: function () { return database_1.disconnectFromDatabase; } });
