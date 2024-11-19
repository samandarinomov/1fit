import { Request, Response, NextFunction } from 'express';
import { ValidationError, NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '../utils/errors';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let type = 'InternalServerError';

    if (err instanceof ValidationError ||
        err instanceof NotFoundError ||
        err instanceof BadRequestError ||
        err instanceof UnauthorizedError ||
        err instanceof ForbiddenError ||
        err instanceof InternalServerError) {
        statusCode = err.statusCode;
        type = err.name;
        message = err.message;
    }

    res.status(statusCode).json({
        status: statusCode,
        type,
        message,
    });
};

export default errorHandler;
