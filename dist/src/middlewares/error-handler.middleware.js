"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../utils/errors");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let type = 'InternalServerError';
    if (err instanceof errors_1.ValidationError ||
        err instanceof errors_1.NotFoundError ||
        err instanceof errors_1.BadRequestError ||
        err instanceof errors_1.UnauthorizedError ||
        err instanceof errors_1.ForbiddenError ||
        err instanceof errors_1.InternalServerError) {
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
exports.default = errorHandler;
