import {Document, model, Model, Schema} from "mongoose";

export interface IGameComment extends Document {
    comment: string;
    approve: boolean;
    approved_by: string;
    user: string;
    game: string;
    createdAt: Date;
    updatedAt: Date;
}
const GameCommentSchema: Schema = new Schema({
    comment: {type: String ,required: true},
    approve: {type: Boolean, default: false},
    approved_by: {type: Schema.Types.ObjectId, ref: 'user'},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    game: {type: Schema.Types.ObjectId, ref: 'game'},
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

export const GameCommentModel: Model<IGameComment> = model<IGameComment>('game_comment', GameCommentSchema);