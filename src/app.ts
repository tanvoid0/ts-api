
import express, {Request, Response} from "express";
// require('dotenv').config();
import dotenv from 'dotenv';


class App {
    public app: express.Application;
    private port: string|number;

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.middleware();
        this.routes();
        this.port = process.env.PORT || 5000
    }

    private config(): void{
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