import express, {Request, Response} from "express";
import {UserModel, IUser} from "./user.model";
import passport from 'passport';
import AuthService from "./auth.service";
export const router = express.Router();

router.post('/register', AuthService.register);
router.post('/login', AuthService.login);


router.post('/authenticate', passport.authenticate("jwt", {session: false}), (req, res) => {
    return res.json("Successfully authenticated");
});


router.get('/users', async (req: Request, res: Response) => {
    try {
        const data = await UserModel.find();
        return res.json(data);
    } catch (e) {
        return res.status(400).json(e);

    }
})

router.delete('/:id', AuthService.remove);