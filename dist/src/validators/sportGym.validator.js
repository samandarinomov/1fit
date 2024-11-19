"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkSportGymSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.linkSportGymSchema = joi_1.default.object({
    sportId: joi_1.default.string().uuid().required(),
    gymId: joi_1.default.string().uuid().required(),
});
