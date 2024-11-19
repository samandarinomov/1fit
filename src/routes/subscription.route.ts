import { Router } from "express";
import {
  getUserSubscriptions,
  createSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller";
import { validate } from "../middlewares/validation.middleware";
import { createSubscriptionSchema } from "../validators/subscription.validator";
import { isAuth } from "../middlewares/is-auth.middleware";

const router = Router();

router.get("/subscriptions", isAuth, getUserSubscriptions);
router.post("/subscriptions", isAuth, validate(createSubscriptionSchema), createSubscription);
router.delete("/subscriptions/:id", isAuth, cancelSubscription);

export default router;
