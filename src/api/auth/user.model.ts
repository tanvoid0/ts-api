import {model, Schema, Model, Document} from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
    avatar: string;
    token: string,
    expiresIn: Date,
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    name: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: String,
    token: String,
    expiresIn: Date,
}, {timestamps: true});

export const UserModel: Model<IUser> = model<IUser>('user', UserSchema);