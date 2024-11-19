"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const connection_1 = require("../utils/connection");
const errors_1 = require("../utils/errors");
// Get current user data
const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get the authenticated user ID from req.user
        const user = await connection_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                subscriptions: true
            }
        });
        if (!user) {
            return next(new errors_1.NotFoundError('User not found'));
        }
        res.status(200).json({ message: 'User data fetched successfully', data: user });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
