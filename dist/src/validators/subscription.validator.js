"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSubscriptionSchema = joi_1.default.object({
    gymId: joi_1.default.string().uuid().required(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.date().optional(),
});
