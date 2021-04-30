import {Request, Response} from 'express';
import GameReviewService from "./comment.service";
import GameService from "../game.service";
import {Types, ObjectId} from "mongoose";
import GameCommentService from "./comment.service";
import {GameCommentModel} from "./comment.model";
import {GameModel} from "../game.model";

class GameCommentController {
    static async create(req: Request, res: Response) {
        try {
            const data = await GameCommentService.create(req.body, req.user);
            return res.json(data);
        } catch(e){
            return res.status(400).json(e);
        }
    }

    static async get(req, res) {
        try {
            const data = await GameCommentModel.find();
            return res.json(data);
        } catch (e){
            res.status(400).json(e);
        }
    }

    static async delete(req, res) {
        let data = {};
        try {
            const {id} = req.params;
            const {game} = await GameCommentModel.findByIdAndDelete(id);
            const {comments} = await GameModel.findById(game);
            const commentsOperator = comments.includes(id) ? '$pull': '$addToSet';
            const updateGame = await GameModel.findByIdAndUpdate(
                game,
                {[commentsOperator]: {reviews: id}},
                {new: true}
            );
            return res.json("Removed successfully!");
        } catch(e){
            return res.status(400).json(e);
        }
    }

    static async approve(req, res) {
        try{
            if(!req.user.isAdmin){
                throw "You must be an admin to approve the comment!";
            }
            GameCommentModel.findByIdAndUpdate(req.params.id, {
                approve: true,
                approved_by: req.user._id,
            }, {new: true}).then((data) =>{
                return res.json(data);
            });
        }catch(e){
            return res.status(400).json(e);
        }
    }

    static async deleteAll(req, res) {
        try{
            if(!req.user.isAdmin){
                throw "Administration privileges required!";
            }
            const data = await GameCommentModel.deleteMany({});
            return res.json(data);
        }catch(e){
            return res.status(400).json(e);
        }
    }
}

export default GameCommentController;