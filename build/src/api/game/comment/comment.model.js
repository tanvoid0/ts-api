"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCommentModel = void 0;
const mongoose_1 = require("mongoose");
const GameCommentSchema = new mongoose_1.Schema({
    comment: { type: String, required: true },
    approve: { type: Boolean, default: false },
    approved_by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    game: { type: mongoose_1.Schema.Types.ObjectId, ref: 'game' },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
exports.GameCommentModel = mongoose_1.model('game_comment', GameCommentSchema);
//# sourceMappingURL=comment.model.js.map