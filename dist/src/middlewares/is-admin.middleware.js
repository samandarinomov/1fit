"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const errors_1 = require("../utils/errors");
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
        return next();
    }
    else {
        return next(new errors_1.ForbiddenError('Access denied, admin only'));
    }
};
exports.isAdmin = isAdmin;
