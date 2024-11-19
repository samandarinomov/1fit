import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/connection";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "../config";

const generateToken = (userId: string, isAdmin: boolean) => {
    return jwt.sign({ id: userId, isAdmin }, config.jwt.secret, {
        expiresIn: config.jwt.expiration,
    });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullname, email, password } = req.body;

        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return next(new BadRequestError('Email already exists'));
        }

        const hashedPassword = await hash(password, 12);
        const user = await prisma.user.create({
            data: { fullname, email, password: hashedPassword }
        });

        const token = generateToken(user.id, user.isAdmin);

        res.status(201).json({ message: "Success", data: { user, token } });
    } catch (error) {
        return next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return next(new UnauthorizedError('Invalid email or password'));
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return next(new UnauthorizedError('Invalid email or password'));
        }

        const token = generateToken(user.id, user.isAdmin);


        res.status(200).json({ message: "Login successful", data: { user, token } });
    } catch (error) {
        return next(error);
    }
};

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const admin = await prisma.user.findUnique({ where: { email } });
        if (!admin || !admin.isAdmin) {
            return next(new UnauthorizedError('Unauthorized access'));
        }

        const isPasswordValid = await compare(password, admin.password);
        if (!isPasswordValid) {
            return next(new UnauthorizedError('Invalid email or password'));
        }

        const token = generateToken(admin.id, admin.isAdmin);

        res.status(200).json({ message: "Admin login successful", data: { admin, token } });
    } catch (error) {
        return next(error);
    }
};
