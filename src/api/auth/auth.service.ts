import passport from "passport";
import dotenv from 'dotenv';
import {ExtractJwt, Strategy} from "passport-jwt";
import {UserModel, IUser} from './user.model';
import {NativeError} from "mongoose";
import {NextFunction} from "express";

dotenv.config();

const secret_key = process.env.JWT_TOKEN;
const expiresIn: any = process.env.JWT_EXPIRES_IN ? process.env.JWT_EXPIRES_IN : 604800;

export default class AuthService {
    public config () {
        passport.use(new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_TOKEN
            }, (jwt_payload, done) => {
                UserModel.findById(jwt_payload._id)
                    .then((user) => {
                        if (user) return done(null, user);
                        return done(null, false);
                    })
                    .catch((error) => {
                        throw error;
                    })
            }
        ));

        passport.serializeUser<any, any>((req, user, done) => {
            done(undefined, user);
        });

        passport.deserializeUser((_id: string, done) => {
            UserModel.findById(_id, (err: NativeError, user:IUser) => done(err, user));
            // UserModel.findOne({_id}, (err, user: IUser) => {
            //     const userInfo = {
            //         email: user.email,
            //         password: user.password,
            //         name: user.name,
            //         isAdmin: user.isAdmin,
            //         avatar: user.avatar,
            //         _id: user._id,
            //         iat: new Date().getTime(),
            //         exp: new Date().setDate(new Date().getDate() + 1)
            //     };
            //     cb(err, userInfo);
            // });
        });
        console.log("Passport initialized!");

    }

    static async register(req: Request, res: Response) {
        // const {name, email, password, password2} = req.body;
        // const user = req.body;
        // return res.json({...user});
        // try {
        //     let {errors, isValid} = await AuthValidator.register({name, email, password, password2});
        //     if (!isValid) throw errors;
        //
        //     const avatar = gravatar.url(email, {
        //         s: "200",
        //         r: "pg",
        //         d: "mm",
        //     });
        //     const hashedPassword = await bcrypt.hash(password, 12);
        //     const newUser = new UserModel({
        //         name: name,
        //         email: email,
        //         password: hashedPassword,
        //         avatar: avatar,
        //     });
        //     newUser.token = await AuthService.get_token(newUser);
        //     const today = new Date();
        //     const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        //     newUser.expiresIn = nextweek;
        //     await newUser.save();
        //     return res.json(newUser);
        // } catch (e) {
        //     console.log(e);
        //     return res.status(400).json(e);
        // }
    }

    static async login(req: Request, res: Response) {
        // try {
        //     const {email, password} = req.body;
        //     const {errors, isValid} = AuthValidator.login({email, password});
        //     if (!isValid) throw errors;
        //     const user = await UserModel.findOne({email});
        //     if (!user) throw {email: "Email does not exist!"};
        //
        //     const doMatch = await bcrypt.compare(password, user.password);
        //     if (!doMatch) throw {password: "Invalid password!"};
        //     user.token = await AuthService.get_token(user);
        //     const today = new Date();
        //     const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        //     user.expiresIn = nextweek;
        //     return res.json(user);
        //     //
        //     // user.expiresIn = Date.parse(String(new Date().setDate(new Date().getDate() + 7)));
        //     return res.json(user);
        // } catch (e) {
        //     console.log(e);
        //     return res.status(400).json(e);
        // }
    }

    static async remove(req: Request, res: Response) {
        // try {
        //     const {id} = req.params;
        //     const data = await UserModel.deleteOne({_id: id});
        //     return res.json(`User delete ${data.deletedCount > 0 ? 'Successful' : 'Unsuccessful'}`);
        // } catch (e) {
        //     return res.json(`User couldn't be removed! ${e}`);
        // }
    }

}

