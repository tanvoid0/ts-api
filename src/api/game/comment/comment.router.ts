import express from "express";
import passport from 'passport';
import GameCommentController from "./comment.controller";

export const router = express.Router();

router.get('/', GameCommentController.get);


router.post('/', passport.authenticate('jwt', {session: false}), GameCommentController.create);
router.post('/approve/:id', passport.authenticate("jwt", {session: false}), GameCommentController.approve);


router.delete('/', GameCommentController.deleteAll);
router.delete('/:id', GameCommentController.delete);