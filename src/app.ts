import express from "express";
import compression from 'compression';
import cors from 'cors';
import * as dotenv from "dotenv";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import * as pug from 'pug';

import db from "./config/db.config";
import {router as GameRouter} from './api/game/game.routes';
import {router as AuthRouter} from './api/auth/auth.routes';
import {router as ViewRouter} from './views/routes';
import AuthService from "./api/auth/auth.service";

dotenv.config();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        AuthService.config();
    }

    private routes(): void {
        this.app.get("/", (req, res) => {
            return res.json("Welcome");
        });

        // this.app.use('/views', ViewRouter);
        this.app.use('/api/game', GameRouter);
        this.app.use('/api/auth', AuthRouter);

        // this.app.use("*", (req, res, next) => {
        //     res.send("Make sure url is correct!!!");
        // });
    }

    public config(): void {
        const port = process.env.PORT || 3070;
        db.connect();

        // this.app.set('views', __dirname + '\\views');
        // this.app.set('view engine', 'jsx');
        // this.app.engine('jsx', require('express-react-views').createEngine({beautify: true}));

        this.app.set("port", port);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(session({
            secret: "secretcode",
            resave: true,
            saveUninitialized: true,
        }));
        this.app.use(cookieParser());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log(`API is running at http://localhost:${this.app.get('port')}`);
        });
    }
}

const app = new App();

export default app;