import {Document, model, Model, Schema} from "mongoose";

export interface IGameReview extends Document {
    location: {
        lat: number,
        lng: number,
    };
    rating: number;
    user: string;
    game: string;
    createdAt: Date,
    updatedAt: Date,
}

const GameReviewSchema: Schema = new Schema({
    location: {
        lat: Number,
        lng: Number,
    },
    rating: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    game: {type: Schema.Types.ObjectId, ref: 'game'},
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export const GameReviewModel: Model<IGameReview> = model<IGameReview>('game_review', GameReviewSchema);
