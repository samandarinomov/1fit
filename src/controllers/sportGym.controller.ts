import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/connection';
import { NotFoundError } from '../utils/errors';

export const linkSportGym = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sportId, gymId } = req.body;

    const sport = await prisma.sport.findUnique({ where: { id: sportId } });
    const gym = await prisma.gym.findUnique({ where: { id: gymId } });

    if (!sport) {
      return next(new NotFoundError('Sport not found'));
    }

    if (!gym) {
      return next(new NotFoundError('Gym not found'));
    }

    const sportGym = await prisma.sportGym.create({
      data: {
        sportId,
        gymId,
      },
    });

    res.status(201).json({ message: 'Sport and Gym linked successfully', data: sportGym });
  } catch (error) {
    next(error);
  }
};

export const getGymsForSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sportId } = req.params;

    const sport = await prisma.sport.findUnique({ where: { id: sportId }, include: { sportGyms: { include: { gym: true } } } });

    if (!sport) {
      return next(new NotFoundError('Sport not found'));
    }

    res.status(200).json({ message: 'Gyms for the sport fetched successfully', data: sport.sportGyms.map(sg => sg.gym) });
  } catch (error) {
    next(error);
  }
};
