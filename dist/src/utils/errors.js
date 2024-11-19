"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.ValidationError = void 0;
class ValidationError extends Error {
    statusCode;
    constructor(message = 'Validation failed') {
        super(message);
        this.statusCode = 403;
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
    statusCode;
    constructor(message = 'Resource not found') {
        super(message);
        this.statusCode = 404;
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends Error {
    statusCode;
    constructor(message = 'Bad request') {
        super(message);
        this.statusCode = 400;
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends Error {
    statusCode;
    constructor(message = 'Unauthorized access') {
        super(message);
        this.statusCode = 401;
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    statusCode;
    constructor(message = 'Forbidden access') {
        super(message);
        this.statusCode = 403;
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends Error {
    statusCode;
    constructor(message = 'Internal server error') {
        super(message);
        this.statusCode = 500;
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
