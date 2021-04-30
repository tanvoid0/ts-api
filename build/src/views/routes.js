"use strict";
/**
 * Require modules
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
/**
 * Router definition
 */
exports.router = express_1.default.Router();
// GET reviews
exports.router.get('/', (req, res) => {
    return "Hello";
    // res.render('index', {name: 'john'});
});
//# sourceMappingURL=routes.js.map