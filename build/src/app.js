"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const db_config_1 = __importDefault(require("./config/db.config"));
const game_routes_1 = require("./api/game/game.routes");
const auth_routes_1 = require("./api/auth/auth.routes");
const auth_service_1 = __importDefault(require("./api/auth/auth.service"));
dotenv.config();
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
        auth_service_1.default.config();
    }
    routes() {
        this.app.get("/", (req, res) => {
            return res.json("Welcome");
        });
        // this.app.use('/views', ViewRouter);
        this.app.use('/api/game', game_routes_1.router);
        this.app.use('/api/auth', auth_routes_1.router);
        // this.app.use("*", (req, res, next) => {
        //     res.send("Make sure url is correct!!!");
        // });
    }
    config() {
        const port = process.env.PORT || 3070;
        db_config_1.default.connect();
        // this.app.set('views', __dirname + '\\views');
        // this.app.set('view engine', 'jsx');
        // this.app.engine('jsx', require('express-react-views').createEngine({beautify: true}));
        this.app.set("port", port);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_session_1.default({
            secret: "secretcode",
            resave: true,
            saveUninitialized: true,
        }));
        this.app.use(cookie_parser_1.default());
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`API is running at http://localhost:${this.app.get('port')}`);
        });
    }
}
const app = new App();
exports.default = app;
//# sourceMappingURL=app.js.map