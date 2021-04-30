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
const game_service_1 = __importDefault(require("./game.service"));
class GameController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.get();
            console.log(`Controller: getGames`);
            return res.json(data);
        });
    }
    static get_one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.get_one(req.params.id);
            return res.json(data);
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.search(req.params.query);
            return res.json(data);
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield game_service_1.default.create(req.params.id);
                console.log('Controller: createGame');
                return res.json(data);
            }
            catch (e) {
                console.log(e);
                if (e.message === "Request failed with status code 404")
                    return res.status(400).json("Game does not exist");
                return res.status(409).json(e);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log("Controller: updateGame", data);
            return yield game_service_1.default.update(data);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Controller: delete Game', req.params.id);
                const data = yield game_service_1.default.delete(req.params.id);
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static get_all_games_from_api(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if(re.page)
                // console.log(typeof req.query.page);
                const data = yield game_service_1.default.get_all_games_from_api(req.query.page ? req.query.page : 1);
                return res.json(data);
            }
            catch (e) {
                console.log(e);
                res.status(400).json(e.message);
            }
        });
    }
    static get_game_from_api(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.api_get_game(req.params.id);
            console.log(`Controller: get_game_from_api`);
            return res.json(data);
        });
    }
    static get_rawg_genres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.api_get_genres();
            const genres = data.map(genre => genre.name);
            return res.json(genres);
        });
    }
    static get_rawg_search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.api_search_game(req.params.query);
            return res.json(data);
        });
    }
    static rawg_create_games(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_service_1.default.get_all_games_from_api(req.body.id);
            let games = [];
            for (const game of data) {
                games = [...games, yield game_service_1.default.create(game.id)];
            }
            return res.json(games);
        });
    }
}
exports.default = GameController;
//# sourceMappingURL=game.controller.js.map