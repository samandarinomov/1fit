"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const is_auth_middleware_1 = require("../middlewares/is-auth.middleware");
const router = (0, express_1.Router)();
// Get current user data
router.get('/user/me', is_auth_middleware_1.isAuth, user_controller_1.getMe);
exports.default = router;
