"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.UserModel = mongoose_1.model('user', UserSchema);
//# sourceMappingURL=user.model.js.map