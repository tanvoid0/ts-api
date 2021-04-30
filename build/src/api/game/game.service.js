"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const game_model_1 = require("./game.model");
const axios_1 = __importDefault(require("axios"));
const gameConfig = __importStar(require("./game.config"));
const ObjectId = require('mongoose').Types.ObjectId;
class GameService {
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_model_1.GameModel.find({}).populate({
                path: 'comments',
                populate: [{
                        path: 'user',
                        model: 'user',
                    }]
            }).populate({
                path: 'reviews',
                populate: [{
                        path: 'user',
                        model: 'user',
                    }]
            });
            return data;
        });
    }
    static search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield game_model_1.GameModel.find({ title: {
                    "$regex": query, "$options": "i"
                } }).populate({
                path: 'comments',
                populate: [{
                        path: 'user',
                        model: 'user',
                    }]
            }).populate({
                path: 'reviews',
                populate: [{
                        path: 'user',
                        model: 'user',
                    }]
            });
            return data;
        });
    }
    static get_one(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return game_model_1.GameModel.findById(_id)
                .populate("reviews")
                .populate({
                path: 'comments',
                populate: [{
                        path: 'user',
                        mode: 'user',
                    }]
            });
        });
    }
    static rawg_api_data_reformat(api_game, rq = false) {
        let requirements = null;
        if (rq) {
            if (api_game.platforms !== null) {
                requirements = api_game.platforms.find((platform) => platform.platform.name == "PC");
            }
            if (requirements !== null && requirements.requirements !== null) {
                requirements = requirements.requirements;
            }
        }
        let screenshots = null;
        if (api_game.screenshots) {
            screenshots = api_game.screenshots.map((screenshot) => screenshot.image);
        }
        else if (api_game.short_screenshots) {
            screenshots = api_game.short_screenshots.map((screenshot) => screenshot.image);
        }
        return {
            id: api_game.id,
            title: api_game.name,
            description: api_game.description == null ? null : api_game.description.replace(/<p>|<\/p>|<br \/>/gi, (matched) => {
                return '';
            }),
            developers: api_game.developers == null ? null : api_game.developers.map((developer) => developer.name),
            genres: api_game.genres == null ? null : api_game.genres.map((genre) => genre.name),
            image: api_game.background_image == null ? null : api_game.background_image,
            platforms: api_game.parent_platforms == null ? null : api_game.parent_platforms.map((platform) => platform.platform.name),
            pc_requirements: rq ? requirements : null,
            released: api_game.released == null ? null : api_game.released,
            screenshots: screenshots,
            series: api_game.series == null ? null : api_game.series.map((s) => {
                return {
                    id: s.id,
                    name: s.name,
                    image: s.background_image,
                };
            }),
            videos: api_game.videos == null ? null : api_game.videos.map((video) => {
                return {
                    name: video.name,
                    preview: video.preview,
                    data: video.data,
                };
            }),
            website: api_game.website == null ? null : api_game.website,
        };
    }
    static create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                let game = yield game_model_1.GameModel.findOne({ id });
                if (game)
                    throw "Game already added";
                const api_game = yield this.api_get_game(id);
                const newGame = new game_model_1.GameModel(GameService.rawg_api_data_reformat(api_game, true));
                data = yield newGame.save();
            }
            catch (e) {
                throw e;
            }
            return data;
        });
    }
    static update(game) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield game_model_1.GameModel.updateOne(game);
            }
            catch (err) {
                console.error("Error::" + err);
            }
            return data;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (ObjectId(id)) {
                    data = yield game_model_1.GameModel.findByIdAndDelete(id);
                }
                else {
                    data = yield game_model_1.GameModel.deleteOne({ id });
                }
            }
            catch (err) {
                console.error("Error::" + err);
                throw err;
            }
            return "Deleted Successfully";
        });
    }
    static api_get_game(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [game, video, series, screenshots] = yield Promise.all([
                axios_1.default.get(`${gameConfig.RAWG_URL}/games/${id}?key=${gameConfig.RAWG_API}`),
                axios_1.default.get(`${gameConfig.RAWG_URL}/games/${id}/movies?key=${gameConfig.RAWG_API}`),
                axios_1.default.get(`${gameConfig.RAWG_URL}/games/${id}/game-series?key=${gameConfig.RAWG_API}`),
                axios_1.default.get(`${gameConfig.RAWG_URL}/games/${id}/screenshots?key=${gameConfig.RAWG_API}`)
            ]);
            game.data['videos'] = video.data.results;
            game.data['screenshots'] = screenshots.data.results;
            game.data['series'] = series.data.results;
            return game.data;
        });
    }
    static get_all_games_from_api(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${gameConfig.RAWG_URL}/games?key=${gameConfig.RAWG_API}`;
            const { data } = yield axios_1.default.get(url, {
                params: {
                    page
                },
            });
            return data.results.map((game) => GameService.rawg_api_data_reformat(game));
            // return data.results;
        });
    }
    static api_get_games(query = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${gameConfig.RAWG_URL}/games?key=${gameConfig.RAWG_API}`;
            const { data } = yield axios_1.default.get(url, {
                params: query,
            });
            return data.results;
        });
    }
    static api_search_game(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(`${gameConfig.RAWG_URL}/games?key=${gameConfig.RAWG_API}`, {
                params: {
                    search: query,
                }
            });
            return data.results;
        });
    }
    static api_get_genres() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(`${gameConfig.RAWG_URL}/genres?key=${gameConfig.RAWG_API}`);
            return data.results;
        });
    }
}
exports.default = GameService;
//# sourceMappingURL=game.service.js.map