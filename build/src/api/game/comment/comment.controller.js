"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_service_1 = __importDefault(require("./comment.service"));
const comment_model_1 = require("./comment.model");
const game_model_1 = require("../game.model");
class GameCommentController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield comment_service_1.default.create(req.body, req.user);
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield comment_model_1.GameCommentModel.find();
                return res.json(data);
            }
            catch (e) {
                res.status(400).json(e);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                const { id } = req.params;
                const { game } = yield comment_model_1.GameCommentModel.findByIdAndDelete(id);
                const { comments } = yield game_model_1.GameModel.findById(game);
                const commentsOperator = comments.includes(id) ? '$pull' : '$addToSet';
                const updateGame = yield game_model_1.GameModel.findByIdAndUpdate(game, { [commentsOperator]: { reviews: id } }, { new: true });
                return res.json("Removed successfully!");
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static approve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user.isAdmin) {
                    throw "You must be an admin to approve the comment!";
                }
                comment_model_1.GameCommentModel.findByIdAndUpdate(req.params.id, {
                    approve: true,
                    approved_by: req.user._id,
                }, { new: true }).then((data) => {
                    return res.json(data);
                });
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user.isAdmin) {
                    throw "Administration privileges required!";
                }
                const data = yield comment_model_1.GameCommentModel.deleteMany({});
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
}
exports.default = GameCommentController;
//# sourceMappingURL=comment.controller.js.map