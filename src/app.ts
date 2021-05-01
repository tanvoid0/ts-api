import express, {Request, Response} from "express";
import dotenv from 'dotenv';

import db from "./config/db.config";

class App {
    public app: express.Application;
    private port: string|number;

    constructor() {
        this.port = process.env.PORT || 5000
        this.app = express();
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
    }

    private middleware(): void {

    }

    private routes(): void {
        this.app.use("*",(req: Request, res: Response) =>{
            res.send(`<h1>Welcome to your simple server! Awesome right ${process.env.ENV_TEST}</h1>`);
        });
    }

    public start(): void {
        this.app.listen(this.port,() => console.log(`hosting @${this.port}`));
    }
}

const app = new App();

export default app;