import {Request, Response} from "express";
import GameService from "./game.service";
import {GameModel} from "./game.model";
import {IUser} from "../auth/user.model";

class GameController {
    static async get(req: Request, res: Response) {
        const data = await GameService.get();
        console.log(`Controller: getGames`, );
        return res.json(data);
    }

    static async get_one(req: Request, res: Response) {
        const data = await GameService.get_one(req.params.id);
        return res.json(data);
    }

    static async search(req: Request, res: Response) {
        const data = await GameService.search(req.params.query);
        return res.json(data);
    }

    static async create(req: Request, res: Response) {
       try{
           if(req.user['isAdmin']){
               const data = await GameService.create(req.params.id, );
               console.log('Controller: createGame');
               return res.json(data);
           }
           else return res.status(401).json("User is not an admin");

       } catch(e){
           console.log(e);
           if(e.message === "Request failed with status code 404")
               return res.status(400).json("Game does not exist");
            return res.status(409).json(e);
       }
    }

    static async update(req: Request, res: Response){
        const data = req.body;
        console.log("Controller: updateGame", data);
        return await GameService.update(data);
    }

    static async delete(req: Request, res: Response) {
        try{
            console.log('Controller: delete Game', req.params.id);
            const data = await GameService.delete(req.params.id);
            return res.json(data);
        } catch (e){
            return res.status(400).json(e);
        }
    }

    static async get_all_games_from_api(req: Request, res: Response) {
        try{
            // if(re.page)
            // console.log(typeof req.query.page);
            const data = await GameService.get_all_games_from_api(req.query.page ? req.query.page : 1);

            return res.json(data);
        } catch(e){
            console.log(e);
            res.status(400).json(e.message);
        }
    }

    static async get_game_from_api(req: Request, res: Response) {
        const data = await GameService.api_get_game(req.params.id);
        console.log(`Controller: get_game_from_api`);
        return res.json(data);
    }

    static async get_rawg_genres(req: Request, res: Response) {
        const data = await GameService.api_get_genres();
        const genres = data.map(genre => genre.name)

        return res.json(genres);
    }

    static async get_rawg_search(req: Request, res: Response) {
        const data =await GameService.api_search_game(req.params.query);
        return res.json(data);
    }

    static async rawg_create_games(req: Request, res: Response) {
        const data = await GameService.get_all_games_from_api(req.body.id);
        let games = [];
        for (const game of data) {
          games = [...games, await GameService.create(game.id)];
        }
        return res.json(games);
    }

}

export default GameController;