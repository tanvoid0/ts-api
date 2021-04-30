"use strict";
/**
 * Require modules
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const game_controller_1 = require("./game.controller");
/**
 * Router definition
 */
exports.router = express_1.default.Router();
/**
 * Controller Definition
 */
const gameController = new game_controller_1.GameController();
// GET Items
exports.router.get('/', gameController.get);
exports.router.post('/', gameController.create);
//# sourceMappingURL=game.routes.js.map