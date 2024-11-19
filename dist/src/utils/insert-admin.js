"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const bcryptjs_1 = require("bcryptjs");
const insertAdmin = async () => {
    const findAdmin = await connection_1.prisma.user.findUnique({ where: { email: "admin@gmail.com" } });
    if (findAdmin) {
        console.log({
            message: 'Admin user already exists',
            admin: {
                email: "admin@gmail.com",
                password: "55555"
            }
        });
        return;
    }
    const hashedPassword = await (0, bcryptjs_1.hash)('55555', 12);
    const admin = await connection_1.prisma.user.create({
        data: {
            fullname: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            isAdmin: true
        }
    });
    console.log({
        message: 'Admin user created successfully',
        admin: {
            email: "admin@gmail.com",
            password: "55555"
        }
    });
};
insertAdmin();
