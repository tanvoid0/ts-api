/**
 * Require modules
 */

import express from "express";
import GameController from "./game.controller";
import passport from 'passport';
import {router as CommentRouter} from './comment/comment.router';
import {router as ReviewRouter} from './review/review.router';

/**
 * Router definition
 */
export const router = express.Router();

// GET reviews
router.use('/review', ReviewRouter);
router.use('/comment', CommentRouter)



// local games
router.get('/', GameController.get);

router.get('/search/:query', GameController.search);

// api games
router.get('/rawg', GameController.get_all_games_from_api);

router.get('/rawg/genres', GameController.get_rawg_genres);

router.get('/rawg/search/:query', GameController.get_rawg_search);

router.get('/rawg/:id', GameController.get_game_from_api);

router.post('/rawg', GameController.rawg_create_games);


router.get('/:id', GameController.get_one);

// GET game




// Create Game
router.post('/:id', passport.authenticate("jwt", {session: false}), GameController.create);

// Update Game
router.put('/', GameController.update);

// Delete Game
router.delete('/:id', GameController.delete);

router.get('/*', (req, res) => {
    res.json("No such path");
});



// Create Review
