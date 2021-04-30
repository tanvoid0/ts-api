"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameReviewModel = void 0;
const mongoose_1 = require("mongoose");
const GameReviewSchema = new mongoose_1.Schema({
    location: {
        lat: Number,
        lng: Number,
    },
    rating: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    game: { type: mongoose_1.Schema.Types.ObjectId, ref: 'game' },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
exports.GameReviewModel = mongoose_1.model('game_review', GameReviewSchema);
//# sourceMappingURL=review.model.js.map