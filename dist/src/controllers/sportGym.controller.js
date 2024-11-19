"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGymsForSport = exports.linkSportGym = void 0;
const connection_1 = require("../utils/connection");
const errors_1 = require("../utils/errors");
const linkSportGym = async (req, res, next) => {
    try {
        const { sportId, gymId } = req.body;
        const sport = await connection_1.prisma.sport.findUnique({ where: { id: sportId } });
        const gym = await connection_1.prisma.gym.findUnique({ where: { id: gymId } });
        if (!sport) {
            return next(new errors_1.NotFoundError('Sport not found'));
        }
        if (!gym) {
            return next(new errors_1.NotFoundError('Gym not found'));
        }
        const sportGym = await connection_1.prisma.sportGym.create({
            data: {
                sportId,
                gymId,
            },
        });
        res.status(201).json({ message: 'Sport and Gym linked successfully', data: sportGym });
    }
    catch (error) {
        next(error);
    }
};
exports.linkSportGym = linkSportGym;
const getGymsForSport = async (req, res, next) => {
    try {
        const { sportId } = req.params;
        const sport = await connection_1.prisma.sport.findUnique({ where: { id: sportId }, include: { sportGyms: { include: { gym: true } } } });
        if (!sport) {
            return next(new errors_1.NotFoundError('Sport not found'));
        }
        res.status(200).json({ message: 'Gyms for the sport fetched successfully', data: sport.sportGyms.map(sg => sg.gym) });
    }
    catch (error) {
        next(error);
    }
};
exports.getGymsForSport = getGymsForSport;
