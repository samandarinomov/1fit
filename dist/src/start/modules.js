"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
const routes_1 = __importDefault(require("../routes"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const passport_1 = __importDefault(require("passport"));
const modules = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport_1.default.initialize());
    app.use('/api', routes_1.default);
    app.use(error_handler_middleware_1.default);
};
exports.modules = modules;
