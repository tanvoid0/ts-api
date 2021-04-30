"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const review_controller_1 = __importDefault(require("./review.controller"));
exports.router = express_1.default.Router();
exports.router.get('/', review_controller_1.default.get);
exports.router.get('/location/:id', review_controller_1.default.viewLocation);
exports.router.get('/:id', review_controller_1.default.getByGameId);
exports.router.post('/', passport_1.default.authenticate('jwt', { session: false }), review_controller_1.default.create);
exports.router.delete('/:id', review_controller_1.default.delete);
exports.router.get('/*', (req, res) => {
    res.json("No such path");
});
//# sourceMappingURL=review.router.js.map