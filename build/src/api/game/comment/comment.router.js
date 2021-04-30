"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const comment_controller_1 = __importDefault(require("./comment.controller"));
exports.router = express_1.default.Router();
exports.router.get('/', comment_controller_1.default.get);
exports.router.post('/', passport_1.default.authenticate('jwt', { session: false }), comment_controller_1.default.create);
exports.router.post('/approve/:id', passport_1.default.authenticate("jwt", { session: false }), comment_controller_1.default.approve);
exports.router.delete('/', comment_controller_1.default.deleteAll);
exports.router.delete('/:id', comment_controller_1.default.delete);
//# sourceMappingURL=comment.router.js.map