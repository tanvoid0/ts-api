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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRepository = void 0;
const game_model_1 = require("./game.model");
const api_logger_1 = require("../../logger/api.logger");
class GameRepository {
    constructor() {
        this.logger = new api_logger_1.APILogger();
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_model_1.GameModel.find({});
            console.log("games:::", data);
            return data;
        });
    }
    create(game) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield game_model_1.GameModel.create(game);
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
    update(game) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield game_model_1.GameModel.updateOne(game);
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield game_model_1.GameModel.deleteOne({ _id: _id });
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return { status: `${(data.deletedCount > 0)}` };
        });
    }
}
exports.GameRepository = GameRepository;
//# sourceMappingURL=game.repository.js.map