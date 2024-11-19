import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/connection";
import { BadRequestError, NotFoundError, ForbiddenError } from "../utils/errors";

export const getUserSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: { gym: true },
    });

    res.status(200).json({ message: "User subscriptions fetched successfully", data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;  

    const { gymId, startDate, endDate } = req.body;

    const existingGym = await prisma.gym.findUnique({ where: { id: gymId } });
    if (!existingGym) {
      return next(new NotFoundError("Gym not found"));
    }

    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId, gymId, status: "ACTIVE" },
    });
    if (existingSubscription) {
      return next(new BadRequestError("Active subscription already exists for this gym"));
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        gymId,
        startDate,
        endDate,
        status: "ACTIVE",
      },
    });

    res.status(201).json({ message: "Subscription created successfully", data: subscription });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id; 

    const { id } = req.params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return next(new NotFoundError("Subscription not found"));
    }

    if (subscription.userId !== userId) {
      return next(new ForbiddenError("You are not allowed to cancel this subscription"));
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: { status: "CANCELED", endDate: new Date() },
    });

    res.status(200).json({ message: "Subscription canceled successfully", data: updatedSubscription });
  } catch (error) {
    next(error);
  }
};
