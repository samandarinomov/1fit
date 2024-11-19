"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gymUpdateSchema = exports.gymSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.gymSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2),
    address: joi_1.default.string().required().min(5),
});
exports.gymUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2),
    address: joi_1.default.string().min(5),
});
