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
const review_model_1 = require("./review.model");
class GameReviewService {
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            return review_model_1.GameReviewModel.find();
        });
    }
    static getByGameId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return review_model_1.GameReviewModel.findById(id);
            // return GameReviewService.avg_rating();
        });
    }
    static create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                const { location, rating, game } = body;
                const review = yield review_model_1.GameReviewModel.findOne({ user: user.id, game });
                if (!review) {
                    console.log("Review not found!");
                    const newReview = new review_model_1.GameReviewModel({ location, rating, user, game });
                    data = yield newReview.save();
                }
                else {
                    data = yield review_model_1.GameReviewModel.findByIdAndUpdate(review._id, { location, rating });
                }
                // return data;
                if (data) {
                    const fetchedGame = yield game_service_1.default.get_one(game);
                    if (fetchedGame) {
                        if (!review) {
                            fetchedGame.reviews.push(data._id);
                        }
                        const finalGame = yield fetchedGame.save()
                            .then(() => __awaiter(this, void 0, void 0, function* () {
                            const rating = yield GameReviewService.avg_rating(game);
                            if (rating !== null)
                                fetchedGame.rating = rating;
                            else
                                fetchedGame.rating = 0;
                            // GameReviewModel.aggregate([
                            //     {$match: {_id: {$in: game.reviews}}},
                            //     {$group: {_id: game._id, rating: {$avg: '$rating'}}}
                            // ])
                            return fetchedGame.save();
                        }));
                        return {
                            'avgRating': finalGame.rating,
                            'location': data.location,
                            'rating': data.rating,
                            'user': user,
                            'game': data.game,
                            'createdAt': data.createdAt,
                            'updatedAt': data.updatedAt,
                        };
                        // return fetchedGame;
                    }
                }
                else
                    throw "Couldn't find or create review";
            }
            catch (e) {
                throw e;
            }
        });
    }
    static avg_rating(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield game_model_1.GameModel.findOne({ _id: id })
                    .then(game => {
                    return review_model_1.GameReviewModel.aggregate([
                        { $match: { _id: { $in: game.reviews } } },
                        { $group: { _id: game._id, average: { $avg: '$rating' } } }
                    ]);
                });
                if (!data[0])
                    return null;
                return data[0].average;
            }
            catch (e) {
                console.log(e);
                return null;
            }
            //     .aggregate([{
            //     $group: {
            //         _id: null,
            //         rating: {
            //             $avg: "$rating"
            //         }
            //     }
            // }]);
            // return data[0].rating;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield review_model_1.GameReviewModel.findOne(id);
                if (review) {
                    game_model_1.GameModel.findById(review.game)
                        .then(game => {
                        const reviews = game.reviews.filter((r) => r !== id);
                        game_model_1.GameModel.findOneAndUpdate({ _id: game._id }, { reviews });
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
exports.default = GameReviewService;
//# sourceMappingURL=review.service.js.map