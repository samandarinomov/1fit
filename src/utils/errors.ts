export class ValidationError extends Error {
    public readonly statusCode: number;

    constructor(message: string = 'Validation failed') {
        super(message);
        this.statusCode = 403;
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends Error {
    public readonly statusCode: number;

    constructor(message: string = 'Resource not found') {
        super(message);
        this.statusCode = 404;
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends Error {
    public readonly statusCode: number;

    constructor(message: string = 'Bad request') {
        super(message);
        this.statusCode = 400;
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends Error {
    public readonly statusCode: number;

    constructor(message: string = 'Unauthorized access') {
        super(message);
        this.statusCode = 401;
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends Error {
    public readonly statusCode: number;

    constructor(message: string = 'Forbidden access') {
        super(message);
        this.statusCode = 403;
        this.name = 'ForbiddenError';
    }
}

export class InternalServerError extends Error {
    public readonly statusCode: number;

    constructor(message: string = 'Internal server error') {
        super(message);
        this.statusCode = 500;
        this.name = 'InternalServerError';
    }
}
