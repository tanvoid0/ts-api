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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("./user.model");
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = __importDefault(require("./auth.service"));
exports.router = express_1.default.Router();
exports.router.post('/register', auth_service_1.default.register);
exports.router.post('/login', auth_service_1.default.login);
exports.router.post('/authenticate', passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    return res.json("Successfully authenticated");
});
exports.router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_model_1.UserModel.find();
        return res.json(data);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}));
exports.router.delete('/:id', auth_service_1.default.remove);
//# sourceMappingURL=auth.routes.js.map