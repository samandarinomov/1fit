"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.login = exports.register = void 0;
const connection_1 = require("../utils/connection");
const errors_1 = require("../utils/errors");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generateToken = (userId, isAdmin) => {
    return jsonwebtoken_1.default.sign({ id: userId, isAdmin }, config_1.config.jwt.secret, {
        expiresIn: config_1.config.jwt.expiration,
    });
};
const register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;
        const existingEmail = await connection_1.prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return next(new errors_1.BadRequestError('Email already exists'));
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 12);
        const user = await connection_1.prisma.user.create({
            data: { fullname, email, password: hashedPassword }
        });
        const token = generateToken(user.id, user.isAdmin);
        res.status(201).json({ message: "Success", data: { user, token } });
    }
    catch (error) {
        return next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await connection_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return next(new errors_1.UnauthorizedError('Invalid email or password'));
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isPasswordValid) {
            return next(new errors_1.UnauthorizedError('Invalid email or password'));
        }
        const token = generateToken(user.id, user.isAdmin);
        res.status(200).json({ message: "Login successful", data: { user, token } });
    }
    catch (error) {
        return next(error);
    }
};
exports.login = login;
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await connection_1.prisma.user.findUnique({ where: { email } });
        if (!admin || !admin.isAdmin) {
            return next(new errors_1.UnauthorizedError('Unauthorized access'));
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, admin.password);
        if (!isPasswordValid) {
            return next(new errors_1.UnauthorizedError('Invalid email or password'));
        }
        const token = generateToken(admin.id, admin.isAdmin);
        res.status(200).json({ message: "Admin login successful", data: { admin, token } });
    }
    catch (error) {
        return next(error);
    }
};
exports.adminLogin = adminLogin;
