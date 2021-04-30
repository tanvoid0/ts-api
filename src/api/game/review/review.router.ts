import express from "express";
import passport from 'passport';
import GameReviewController from "./review.controller";

export const router = express.Router();

router.get('/', GameReviewController.get);

router.get('/location/:id', GameReviewController.viewLocation);

router.get('/:id', GameReviewController.getByGameId);

router.post('/', passport.authenticate('jwt', {session: false}), GameReviewController.create);

router.delete('/:id', GameReviewController.delete);

router.get('/*', (req, res) => {
    res.json("No such path");
});
