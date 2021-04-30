import {model, Schema, Model, Document} from "mongoose";

interface IVideo {
    name: String,
    preview: String,
    data: {
        "480": String,
        "max": String,
    }
}

interface ISeries {
    id: string;
    name: string;
    background_image: string;
}

export interface IGame extends Document {
    id: string;
    title: string;
    comments: string[];
    description: string;
    developers: string[];
    genres: string[];
    image: string;

    platforms: string[];
    pc_requirements: {
        minimum: string,
        recommended: string,
    },
    rating: Number;
    released: string;
    reviews: string[];
    screenshots: string[];
    series: ISeries;
    videos: IVideo[];
    website: string;
}

const GameSchema: Schema = new Schema({
    id: String,
    title: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'game_comment'}],
    description: String,
    developers: [{type: String, required: true}],
    genres: [String],
    image: String,
    platforms: [String],
    pc_requirements: {
        minimum: String,
        recommended: String,
    },
    rating: Number,
    released: Date,
    reviews: [{type: Schema.Types.ObjectId, ref: 'game_review'}],
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

export const GameModel: Model<IGame> = model<IGame>('game', GameSchema);
