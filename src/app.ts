import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import compression from "compression";

import db from "./config/db.config";
import AuthService from "./api/auth/auth.service";
import session from "express-session";

class App {
    public app: express.Application;
    private port: string|number;
    private auth: AuthService;

    constructor() {
        this.port = process.env.PORT || 5000
        this.app = express();
        this.auth = new AuthService();
        this.config();
        this.middleware();
        this.routes();
    }

    private config(): void{
        dotenv.config();

        db.connect();
        this.app.set("port", this.port);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(session({
            secret: process.env.JWT_TOKEN || "secretcode",
            resave: true,
            saveUninitialized: true,
        }))
        this.auth.config();
    }

    private middleware(): void {

    }

    private routes(): void {
        this.app.use("*",(req: Request, res: Response) =>{
            res.send(`<h1>v 1.0.5 Env: ${process.env.ENV_TEST}</h1>`);
        });
    }

    public start(): void {
        this.app.listen(this.port,() => console.log(`hosting @${this.port}`));
    }
}

const app = new App();

export default app;