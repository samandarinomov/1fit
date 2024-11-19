import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/connection';
import { NotFoundError } from '../utils/errors';

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id; 

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: true
      }
    });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json({ message: 'User data fetched successfully', data: user });
  } catch (error) {
    next(error);
  }
};
