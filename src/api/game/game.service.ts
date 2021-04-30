import {GameModel} from "./game.model";
import axios from 'axios';
import * as gameConfig from './game.config';
const ObjectId = require('mongoose').Types.ObjectId;

class GameService {
    static async get() {
        const data = await GameModel.find({}).populate({
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
    }
    static async search(query) {
        const data = await GameModel.find({title: {
            "$regex": query, "$options": "i"
            }}).populate({
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
    }

    static async get_one(_id: String) {
        return GameModel.findById(_id)
            .populate("reviews")
            .populate({
                path: 'comments',
                populate: [{
                    path: 'user',
                    mode: 'user',
                }]
            });
    }

    static rawg_api_data_reformat(api_game, rq=false) {
        let requirements = null;
        if(rq){
            if(api_game.platforms !== null){
                requirements=api_game.platforms.find((platform) => platform.platform.name == "PC");
            }
            if(requirements !== null && requirements.requirements!==null) {
                requirements = requirements.requirements;
            }
        }
        let screenshots = null;
        if(api_game.screenshots){
            screenshots = api_game.screenshots.map((screenshot) => screenshot.image);
        } else if(api_game.short_screenshots){
            screenshots = api_game.short_screenshots.map((screenshot) => screenshot.image);
        }

        return {
            id: api_game.id,
            title: api_game.name,
            description: api_game.description == null ? null : api_game.description.replace(/<p>|<\/p>|<br \/>/gi , (matched) => {
                return ''
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
                }
            }),
            videos: api_game.videos == null ? null : api_game.videos.map((video) => {
                return {
                    name: video.name,
                    preview: video.preview,
                    data: video.data,
                }
            }),
            website: api_game.website == null ? null : api_game.website,
        }
    }

    static async create(id) {
        let data = {};
        try{
            let game = await GameModel.findOne({id});
            if (game) throw "Game already added";
            const api_game = await this.api_get_game(id);

            const newGame = new GameModel(GameService.rawg_api_data_reformat(api_game, true));
            data = await newGame.save();
        } catch(e) {
            throw e;
        }
        return data;
    }

    static async update(game) {
        let data = {};
        try {
            data = await GameModel.updateOne(game);
        } catch (err) {
            console.error("Error::" + err);
        }
        return data;
    }

    static async delete(id) {
        let data: any = {};
        try {
            if(ObjectId(id)){
                data = await GameModel.findByIdAndDelete(id);
            } else{
                data = await GameModel.deleteOne({id});
            }
        } catch (err) {
            console.error("Error::" + err);
            throw err;
        }
        return "Deleted Successfully";
    }

    static async api_get_game(id) {
        const [game, video, series, screenshots] = await Promise.all([
            axios.get(`${gameConfig.RAWG_URL}/games/${id}?key=${gameConfig.RAWG_API}`),
            axios.get(`${gameConfig.RAWG_URL}/games/${id}/movies?key=${gameConfig.RAWG_API}`),
            axios.get(`${gameConfig.RAWG_URL}/games/${id}/game-series?key=${gameConfig.RAWG_API}`),
            axios.get(`${gameConfig.RAWG_URL}/games/${id}/screenshots?key=${gameConfig.RAWG_API}`)
        ]);
        game.data['videos'] = video.data.results;
        game.data['screenshots'] = screenshots.data.results;
        game.data['series'] = series.data.results;
        return game.data;
    }

    static async get_all_games_from_api(page ) {
        const url = `${gameConfig.RAWG_URL}/games?key=${gameConfig.RAWG_API}`;
        const {data} = await axios.get(url, {
            params: {
                page
            },
        });
        return data.results.map((game) => GameService.rawg_api_data_reformat(game));
        // return data.results;
    }

    static async api_get_games(query = null) {
        const url = `${gameConfig.RAWG_URL}/games?key=${gameConfig.RAWG_API}`;
        const {data} = await axios.get(url, {
            params: query,
        })
        return data.results;
    }

    static async api_search_game(query) {
        const {data} = await axios.get(`${gameConfig.RAWG_URL}/games?key=${gameConfig.RAWG_API}`, {
            params: {
                search: query,
            }
        });
        return data.results;
    }

    static async api_get_genres() {
        const {data} = await axios.get(`${gameConfig.RAWG_URL}/genres?key=${gameConfig.RAWG_API}`);
        return data.results;
    }
}

export default GameService;