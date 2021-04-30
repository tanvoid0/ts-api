import {GameModel} from "../game.model";
import GameService from "../game.service";
import {GameReviewModel, IGameReview} from "./review.model";

class GameReviewService {
    static async get() {
        return GameReviewModel.find();
    }
    static async getByGameId(id) {
        return GameReviewModel.findById(id);
        // return GameReviewService.avg_rating();
    }

    static async create(body, user) {
        let data: IGameReview;
        try {
            const {location, rating, game} = body;
            const review = await GameReviewModel.findOne({user: user.id, game});
            if (!review) {
                console.log("Review not found!");
                const newReview = new GameReviewModel({location, rating, user, game});
                data = await newReview.save();
            } else {
                data = await GameReviewModel.findByIdAndUpdate(review._id, {location, rating});
            }
            // return data;
            if (data) {
                const fetchedGame = await GameService.get_one(game);
                if (fetchedGame) {
                    if (!review) {
                        fetchedGame.reviews.push(data._id);
                    }
                    const finalGame = await fetchedGame.save()
                        .then(async () => {
                            const rating = await GameReviewService.avg_rating(game);
                            if(rating !== null) fetchedGame.rating = rating;
                            else fetchedGame.rating = 0;
                            // GameReviewModel.aggregate([
                            //     {$match: {_id: {$in: game.reviews}}},
                            //     {$group: {_id: game._id, rating: {$avg: '$rating'}}}
                            // ])
                            return fetchedGame.save();
                        });

                    return {
                        'avgRating': finalGame.rating,
                        'location': data.location,
                        'rating': data.rating,
                        'user': user,
                        'game': data.game,
                        'createdAt': data.createdAt,
                        'updatedAt': data.updatedAt,
                    }
                    // return fetchedGame;
                }
            } else throw "Couldn't find or create review";
        } catch (e) {
            throw e;
        }
    }

    static async avg_rating(id) {
        try{
            const data = await GameModel.findOne({_id: id})
                .then(game => {
                    return GameReviewModel.aggregate([
                        {$match: {_id: {$in: game.reviews}}},
                        {$group: {_id: game._id, average: {$avg: '$rating'}}}
                    ]);
                });
            if(!data[0]) return null;
            return data[0].average;
        } catch(e) {
            console.log(e);
            return null;
        }
        //     .aggregate([{
        //     $group: {
        //         _id: null,
        //         rating: {
        //             $avg: "$rating"
        //         }
        //     }
        // }]);
        // return data[0].rating;
    }

    static async delete(id) {
        try {
            const review = await GameReviewModel.findOne(id);
            if (review) {
                GameModel.findById(review.game)
                    .then(game => {
                        const reviews = game.reviews.filter((r) => r !== id);
                        GameModel.findOneAndUpdate({_id: game._id}, {reviews});
                    });
            }
            return "Removed successfully";
        } catch (e) {
            throw e;
        }
    }
}

export default GameReviewService;