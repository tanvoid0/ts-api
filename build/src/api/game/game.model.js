"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    id: String,
    title: { type: String, required: true },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'game_comment' }],
    description: String,
    developers: [{ type: String, required: true }],
    genres: [String],
    image: String,
    platforms: [String],
    pc_requirements: {
        minimum: String,
        recommended: String,
    },
    rating: Number,
    released: Date,
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'game_review' }],
    screenshots: [String],
    series: {
        id: String,
        name: String,
        image: String,
    },
    videos: [{
            name: String,
            preview: String,
            data: {
                "480": String,
                "max": String,
            }
        }],
    website: String,
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
exports.GameModel = mongoose_1.model('game', GameSchema);
//# sourceMappingURL=game.model.js.map