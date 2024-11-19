import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/connection';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const createGym = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, address } = req.body;

    const existingGym = await prisma.gym.findUnique({ where: { name } });
    if (existingGym) {
      return next(new BadRequestError('Gym already exists'));
    }

    const gym = await prisma.gym.create({
      data: { name, address },
    });

    res.status(201).json({ message: 'Gym created successfully', data: gym });
  } catch (error) {
    next(error);
  }
};

export const getAllGyms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.query;
  
      const gyms = await prisma.gym.findMany({
        where: {
          name: {
            contains: name as string,
            mode: 'insensitive', 
          },
        },
      });
  
      res.status(200).json({ message: 'Gyms fetched successfully', data: gyms });
    } catch (error) {
      next(error);
    }
  };

export const getGymById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const gym = await prisma.gym.findUnique({ where: { id } });

    if (!gym) {
      return next(new NotFoundError('Gym not found'));
    }

    res.status(200).json({ message: 'Gym fetched successfully', data: gym });
  } catch (error) {
    next(error);
  }
};

export const updateGym = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const gym = await prisma.gym.update({
      where: { id },
      data: { name, address },
    });

    res.status(200).json({ message: 'Gym updated successfully', data: gym });
  } catch (error) {
    next(error);
  }
};

// Delete a gym by ID
export const deleteGym = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const gym = await prisma.gym.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Gym deleted successfully', data: gym });
  } catch (error) {
    next(error);
  }
};
