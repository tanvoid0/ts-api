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
const game_controller_1 = __importDefault(require("./game.controller"));
const passport_1 = __importDefault(require("passport"));
const comment_router_1 = require("./comment/comment.router");
const review_router_1 = require("./review/review.router");
/**
 * Router definition
 */
exports.router = express_1.default.Router();
// GET reviews
exports.router.use('/review', review_router_1.router);
exports.router.use('/comment', comment_router_1.router);
// local games
exports.router.get('/', game_controller_1.default.get);
exports.router.get('/search/:query', game_controller_1.default.search);
// api games
exports.router.get('/rawg', game_controller_1.default.get_all_games_from_api);
exports.router.get('/rawg/genres', game_controller_1.default.get_rawg_genres);
exports.router.get('/rawg/search/:query', game_controller_1.default.get_rawg_search);
exports.router.get('/rawg/:id', game_controller_1.default.get_game_from_api);
exports.router.post('/rawg', game_controller_1.default.rawg_create_games);
exports.router.get('/:id', game_controller_1.default.get_one);
// GET game
// Create Game
exports.router.post('/:id', passport_1.default.authenticate("jwt", { session: false }), game_controller_1.default.create);
// Update Game
exports.router.put('/', game_controller_1.default.update);
// Delete Game
exports.router.delete('/:id', game_controller_1.default.delete);
exports.router.get('/*', (req, res) => {
    res.json("No such path");
});
// Create Review
//# sourceMappingURL=game.routes.js.map