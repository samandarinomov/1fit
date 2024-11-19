"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGym = exports.updateGym = exports.getGymById = exports.getAllGyms = exports.createGym = void 0;
const connection_1 = require("../utils/connection");
const errors_1 = require("../utils/errors");
// Create a new gym
const createGym = async (req, res, next) => {
    try {
        const { name, address } = req.body;
        const existingGym = await connection_1.prisma.gym.findUnique({ where: { name } });
        if (existingGym) {
            return next(new errors_1.BadRequestError('Gym already exists'));
        }
        const gym = await connection_1.prisma.gym.create({
            data: { name, address },
        });
        res.status(201).json({ message: 'Gym created successfully', data: gym });
    }
    catch (error) {
        next(error);
    }
};
exports.createGym = createGym;
// Get all gyms
const getAllGyms = async (req, res, next) => {
    try {
        const { name } = req.query; // Get query parameter `name`
        const gyms = await connection_1.prisma.gym.findMany({
            where: {
                name: {
                    contains: name, // Search gyms with names containing the query parameter
                    mode: 'insensitive', // Case insensitive search
                },
            },
        });
        res.status(200).json({ message: 'Gyms fetched successfully', data: gyms });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllGyms = getAllGyms;
// Get a single gym by ID
const getGymById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const gym = await connection_1.prisma.gym.findUnique({ where: { id } });
        if (!gym) {
            return next(new errors_1.NotFoundError('Gym not found'));
        }
        res.status(200).json({ message: 'Gym fetched successfully', data: gym });
    }
    catch (error) {
        next(error);
    }
};
exports.getGymById = getGymById;
// Update a gym by ID
const updateGym = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;
        const gym = await connection_1.prisma.gym.update({
            where: { id },
            data: { name, address },
        });
        res.status(200).json({ message: 'Gym updated successfully', data: gym });
    }
    catch (error) {
        next(error);
    }
};
exports.updateGym = updateGym;
// Delete a gym by ID
const deleteGym = async (req, res, next) => {
    try {
        const { id } = req.params;
        const gym = await connection_1.prisma.gym.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Gym deleted successfully', data: gym });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteGym = deleteGym;
