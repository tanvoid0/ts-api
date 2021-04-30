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
const game_model_1 = require("../game.model");
const game_service_1 = __importDefault(require("../game.service"));
const comment_model_1 = require("./comment.model");
class GameCommentService {
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield comment_model_1.GameCommentModel.find();
        });
    }
    static create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                const { comment, game } = body;
                const newComment = new comment_model_1.GameCommentModel({ comment, user: user._id, game });
                data = yield newComment.save();
                if (data) {
                    const fetchedGame = yield game_service_1.default.get_one(game);
                    if (fetchedGame) {
                        fetchedGame.comments.push(data._id);
                        yield fetchedGame.save();
                        return {
                            'approve': data.approve,
                            '_id': data._id,
                            'comment': data.comment,
                            'user': user,
                            'game': data.game,
                            'createdAt': data.createdAt,
                            'updatedAt': data.updatedAt,
                        };
                    }
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_model_1.GameCommentModel.findOne(id);
                if (comment) {
                    game_model_1.GameModel.findById(comment.game)
                        .then(game => {
                        const comments = game.comments.filter((r) => r !== id);
                        game_model_1.GameModel.findOneAndUpdate({ _id: game._id }, { comments });
                    });
                }
                return "Removed successfully";
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = GameCommentService;
//# sourceMappingURL=comment.service.js.map