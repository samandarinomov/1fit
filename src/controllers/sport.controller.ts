import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/connection';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const createSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const existingSport = await prisma.sport.findUnique({ where: { name } });
    if (existingSport) {
      return next(new BadRequestError('Sport already exists'));
    }

    const sport = await prisma.sport.create({
      data: { name },
    });

    res.status(201).json({ message: 'Sport created successfully', data: sport });
  } catch (error) {
    next(error);
  }
};

export const getAllSports = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.query; 
  
      const sports = await prisma.sport.findMany({
        where: {
          name: {
            contains: name as string, 
            mode: 'insensitive', 
          },
        },
      });
  
      res.status(200).json({ message: 'Sports fetched successfully', data: sports });
    } catch (error) {
      next(error);
    }
  };

export const getSportById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const sport = await prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      return next(new NotFoundError('Sport not found'));
    }

    res.status(200).json({ message: 'Sport fetched successfully', data: sport });
  } catch (error) {
    next(error);
  }
};

export const updateSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const sport = await prisma.sport.update({
      where: { id },
      data: { name },
    });

    res.status(200).json({ message: 'Sport updated successfully', data: sport });
  } catch (error) {
    next(error);
  }
};

export const deleteSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const sport = await prisma.sport.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Sport deleted successfully', data: sport });
  } catch (error) {
    next(error);
  }
};
