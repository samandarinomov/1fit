import { Application } from "express";
import routes from "../routes";
import errorHandler from "../middlewares/error-handler.middleware";
import passport from "passport";

export const modules = (app: Application, express: typeof import('express')) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(passport.initialize());

    app.use('/api', routes);

    app.use(errorHandler);
}