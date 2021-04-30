"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() {
        this.db_options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            poolSize: 50,
            useCreateIndex: true,
            useFindAndModify: false,
        };
        if (process.env.NODE_ENV === "production") {
            this.uri = process.env.DB_STRING_PROD;
        }
        else {
            this.uri = process.env.DB_STRING;
        }
    }
    connect() {
        if (this.database) {
            return;
        }
        mongoose.connect(this.uri, this.db_options).then(result => {
            console.log("Connected to database");
        }).catch(error => {
            console.log("Error connecting to mongodb", error);
        });
        this.database = mongoose.connection;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.database) {
                return;
            }
            yield mongoose.disconnect();
        });
    }
}
const db = new Database();
exports.default = db;
//# sourceMappingURL=db.config.js.map