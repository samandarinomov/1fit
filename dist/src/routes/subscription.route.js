"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../controllers/subscription.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const subscription_validator_1 = require("../validators/subscription.validator");
const is_auth_middleware_1 = require("../middlewares/is-auth.middleware");
const router = (0, express_1.Router)();
router.get("/subscriptions", is_auth_middleware_1.isAuth, subscription_controller_1.getUserSubscriptions);
router.post("/subscriptions", is_auth_middleware_1.isAuth, (0, validation_middleware_1.validate)(subscription_validator_1.createSubscriptionSchema), subscription_controller_1.createSubscription);
router.delete("/subscriptions/:id", is_auth_middleware_1.isAuth, subscription_controller_1.cancelSubscription);
exports.default = router;
