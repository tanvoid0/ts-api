"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    reviewer: { type: String, required: true },
    developer: { type: String, required: true },
}, { timestamps: true });
exports.GameModel = mongoose_1.model('games', GameSchema);
//# sourceMappingURL=game.model.js.map