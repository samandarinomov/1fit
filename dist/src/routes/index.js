"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const sport_route_1 = __importDefault(require("./sport.route"));
const gym_route_1 = __importDefault(require("./gym.route"));
const sportGym_route_1 = __importDefault(require("./sportGym.route"));
const subscription_route_1 = __importDefault(require("./subscription.route"));
const user_route_1 = __importDefault(require("./user.route"));
exports.default = [auth_route_1.default, sport_route_1.default, gym_route_1.default, sportGym_route_1.default, subscription_route_1.default, user_route_1.default];
