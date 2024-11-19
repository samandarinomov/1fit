import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';
import { User } from '@prisma/client';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user && user.isAdmin) {
    return next();
  } else {
    return next(new ForbiddenError('Access denied, admin only'));
  }
};
