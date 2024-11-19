"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const process_1 = require("process");
exports.config = {
    port: Number(process_1.env.PORT),
    jwt: {
        secret: process_1.env.JWT_SECRET,
        expiration: process_1.env.JWT_EXPIRATION,
    },
};
