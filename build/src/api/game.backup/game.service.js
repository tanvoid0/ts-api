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
exports.GameService = void 0;
const game_repository_1 = require("./game.repository");
class GameService {
    constructor() {
        this.gameRepository = new game_repository_1.GameRepository();
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.gameRepository.get();
        });
    }
    create(game) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.gameRepository.create(game);
        });
    }
    update(game) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.gameRepository.update(game);
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.gameRepository.delete(_id);
        });
    }
}
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map