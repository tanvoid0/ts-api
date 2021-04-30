import {Request, Response} from 'express';
import GameReviewService from "./review.service";
import {GameModel} from "../game.model";
import GameService from "../game.service";
import {Types, ObjectId} from "mongoose";
import {GameReviewModel} from "./review.model";

class GameReviewController {
    static async create(req: Request, res: Response) {
        try {
            // return res.json(req.body);
            const data = await GameReviewService.create(req.body, req.user);
            return res.json(data);
        } catch(e){
            console.log(e);
            return res.status(400).json(e);
        }
    }
    static async get(req: Request, res: Response) {
        try {
            const data = await GameReviewService.get();
            return res.json(data);
        } catch (e){
            res.status(400).json(e);
        }
    }
    static async getByGameId(req: Request, res: Response) {
        try{
            const data = await GameReviewService.getByGameId(req.params.id);
            return res.json(data);
        }catch(e){
            return res.status(400).json(e);
        }
    }

    static async delete(req: Request, res: Response) {
        let data = {};
        try {
            const {id} = req.params;
            const {game} = await GameReviewModel.findByIdAndDelete(id);
            const {reviews} = await GameModel.findById(game);
            const reviewsOperator = reviews.includes(id) ? '$pull': '$addToSet';
            const updateGame = await GameModel.findByIdAndUpdate(
                game,
                {[reviewsOperator]: {reviews: id}},
                {new: true}
            );
            return res.json("Removed successfully!");
        } catch(e){
            return res.status(400).json(e);
        }
    }

    static async viewLocation(req:Request, res: Response) {
        return res.sendFile(__dirname+"..../../src/views/index.js");
    }
    // static async getLocation(req: Request, res: Response){
    //     let data = {};
    //     try{
    //         const {id} = req.params;
    //         const locations = await GameReviewModel.find({game: id});
    //     }
    // }
}

export default GameReviewController;