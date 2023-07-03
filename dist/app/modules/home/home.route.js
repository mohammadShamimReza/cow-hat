"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRouter = void 0;
const express_1 = __importDefault(require("express"));
const home_controllar_1 = require("./home.controllar");
const router = express_1.default.Router();
router.get('/', home_controllar_1.homeControllar.getHome);
exports.HomeRouter = router;
