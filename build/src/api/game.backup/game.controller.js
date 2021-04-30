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
exports.GameController = void 0;
const api_logger_1 = require("../../logger/api.logger");
class GameController {
    constructor() {
        this.gameService = new GameService();
        this.logger = new api_logger_1.APILogger();
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Controller: getGames`, null);
            return yield this.gameService.get();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('Controller: createGame', data);
            return yield this.gameService.create(data);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Controller: updateGame", data);
            return yield this.gameService.update(data);
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('Controller: delete Game', data);
            return yield this.gameService.delete(data);
        });
    }
}
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map