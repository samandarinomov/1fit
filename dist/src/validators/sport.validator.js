"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportUpdateSchema = exports.sportSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.sportSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2),
});
exports.sportUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2),
});
