"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const connection_1 = require("./connection");
const config_1 = require("../config");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.config.jwt.secret,
};
passport_1.default.use(new passport_jwt_1.Strategy(options, async (jwtPayload, done) => {
    try {
        const user = await connection_1.prisma.user.findUnique({ where: { id: jwtPayload.id } });
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false);
    }
}));
