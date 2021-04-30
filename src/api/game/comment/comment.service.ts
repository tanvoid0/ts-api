import {GameModel} from "../game.model";
import axios from 'axios';
import GameService from "../game.service";
import {GameCommentModel, IGameComment} from "./comment.model";

class GameCommentService {
    static async get() {
        const data = await GameCommentModel.find();
    }
    static async create(body, user) {
        let data: IGameComment;
        try{
            const {comment, game} = body;
            const newComment = new GameCommentModel({comment, user: user._id, game});
            data = await newComment.save();
            if (data) {
                const fetchedGame = await GameService.get_one(game);
                if (fetchedGame) {
                    fetchedGame.comments.push(data._id);
                    await fetchedGame.save();
                    return {
                        'approve': data.approve,
                        '_id': data._id,
                        'comment': data.comment,
                        'user': user,
                        'game': data.game,
                        'createdAt': data.createdAt,
                        'updatedAt': data.updatedAt,
                    }
                }
            }
        } catch (e) {
            throw e;
        }
    }

    static async delete(id) {
        try{
            const comment = await GameCommentModel.findOne(id);
            if(comment){
                GameModel.findById(comment.game)
                    .then(game => {
                        const comments = game.comments.filter((r) => r !== id);
                        GameModel.findOneAndUpdate({_id: game._id}, {comments});
                    });
            }
            return "Removed successfully";
        } catch(e){
            throw e;
        }
    }
}

export default GameCommentService;