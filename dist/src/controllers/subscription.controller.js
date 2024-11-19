"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSubscription = exports.createSubscription = exports.getUserSubscriptions = void 0;
const connection_1 = require("../utils/connection");
const errors_1 = require("../utils/errors");
const getUserSubscriptions = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const subscriptions = await connection_1.prisma.subscription.findMany({
            where: { userId },
            include: { gym: true },
        });
        res.status(200).json({ message: "User subscriptions fetched successfully", data: subscriptions });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserSubscriptions = getUserSubscriptions;
const createSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { gymId, startDate, endDate } = req.body;
        const existingGym = await connection_1.prisma.gym.findUnique({ where: { id: gymId } });
        if (!existingGym) {
            return next(new errors_1.NotFoundError("Gym not found"));
        }
        const existingSubscription = await connection_1.prisma.subscription.findFirst({
            where: { userId, gymId, status: "ACTIVE" },
        });
        if (existingSubscription) {
            return next(new errors_1.BadRequestError("Active subscription already exists for this gym"));
        }
        const subscription = await connection_1.prisma.subscription.create({
            data: {
                userId,
                gymId,
                startDate,
                endDate,
                status: "ACTIVE",
            },
        });
        res.status(201).json({ message: "Subscription created successfully", data: subscription });
    }
    catch (error) {
        next(error);
    }
};
exports.createSubscription = createSubscription;
const cancelSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const subscription = await connection_1.prisma.subscription.findUnique({
            where: { id },
        });
        if (!subscription) {
            return next(new errors_1.NotFoundError("Subscription not found"));
        }
        if (subscription.userId !== userId) {
            return next(new errors_1.ForbiddenError("You are not allowed to cancel this subscription"));
        }
        const updatedSubscription = await connection_1.prisma.subscription.update({
            where: { id },
            data: { status: "CANCELED", endDate: new Date() },
        });
        res.status(200).json({ message: "Subscription canceled successfully", data: updatedSubscription });
    }
    catch (error) {
        next(error);
    }
};
exports.cancelSubscription = cancelSubscription;
