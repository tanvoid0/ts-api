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
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = require("./user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gravatar_1 = __importDefault(require("gravatar"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_validator_1 = __importDefault(require("./auth.validator"));
const moment = require('moment');
dotenv_1.default.config();
const secret_key = process.env.JWT_TOKEN;
const expiresIn = parseInt(process.env.JWT_EXPIRES_IN);
class AuthService {
    static get_token(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({
                email: user.email,
                password: user.password,
                name: user.name,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
                _id: user._id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            }, secret_key);
        });
    }
    static config() {
        passport_1.default.use(new passport_jwt_1.Strategy({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_TOKEN
        }, (jwt_payload, done) => {
            user_model_1.UserModel.findById(jwt_payload._id)
                .then((user) => {
                if (user)
                    return done(null, user);
                return done(null, false);
            })
                .catch((error) => {
                throw error;
            });
        }));
        passport_1.default.serializeUser((user, cb) => {
            cb(null, user._id);
        });
        passport_1.default.deserializeUser((_id, cb) => {
            user_model_1.UserModel.findOne({ _id }, (err, user) => {
                const userInfo = {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    avatar: user.avatar,
                    _id: user._id,
                    iat: new Date().getTime(),
                    exp: new Date().setDate(new Date().getDate() + 1)
                };
                cb(err, userInfo);
            });
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, password2 } = req.body;
            try {
                let { errors, isValid } = yield auth_validator_1.default.register({ name, email, password, password2 });
                if (!isValid)
                    throw errors;
                const avatar = gravatar_1.default.url(email, {
                    s: "200",
                    r: "pg",
                    d: "mm",
                });
                const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
                const newUser = new user_model_1.UserModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    avatar: avatar,
                });
                newUser.token = yield AuthService.get_token(newUser);
                const today = new Date();
                const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
                newUser.expiresIn = nextweek;
                yield newUser.save();
                return res.json(newUser);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json(e);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { errors, isValid } = auth_validator_1.default.login({ email, password });
                if (!isValid)
                    throw errors;
                const user = yield user_model_1.UserModel.findOne({ email });
                if (!user)
                    throw { email: "Email does not exist!" };
                const doMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!doMatch)
                    throw { password: "Invalid password!" };
                user.token = yield AuthService.get_token(user);
                const today = new Date();
                const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
                user.expiresIn = nextweek;
                return res.json(user);
                //
                // user.expiresIn = Date.parse(String(new Date().setDate(new Date().getDate() + 7)));
                return res.json(user);
            }
            catch (e) {
                console.log(e);
                return res.status(400).json(e);
            }
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield user_model_1.UserModel.deleteOne({ _id: id });
                return res.json(`User delete ${data.deletedCount > 0 ? 'Successful' : 'Unsuccessful'}`);
            }
            catch (e) {
                return res.json(`User couldn't be removed! ${e}`);
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map