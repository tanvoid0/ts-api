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
const review_service_1 = __importDefault(require("./review.service"));
const game_model_1 = require("../game.model");
const review_model_1 = require("./review.model");
class GameReviewController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // return res.json(req.body);
                const data = yield review_service_1.default.create(req.body, req.user);
                return res.json(data);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json(e);
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield review_service_1.default.get();
                return res.json(data);
            }
            catch (e) {
                res.status(400).json(e);
            }
        });
    }
    static getByGameId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield review_service_1.default.getByGameId(req.params.id);
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                const { id } = req.params;
                const { game } = yield review_model_1.GameReviewModel.findByIdAndDelete(id);
                const { reviews } = yield game_model_1.GameModel.findById(game);
                const reviewsOperator = reviews.includes(id) ? '$pull' : '$addToSet';
                const updateGame = yield game_model_1.GameModel.findByIdAndUpdate(game, { [reviewsOperator]: { reviews: id } }, { new: true });
                return res.json("Removed successfully!");
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static viewLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.sendFile(__dirname + "..../../src/views/index.js");
        });
    }
}
exports.default = GameReviewController;
//# sourceMappingURL=review.controller.js.map