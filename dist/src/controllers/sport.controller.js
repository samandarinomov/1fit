"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSport = exports.updateSport = exports.getSportById = exports.getAllSports = exports.createSport = void 0;
const connection_1 = require("../utils/connection");
const errors_1 = require("../utils/errors");
const createSport = async (req, res, next) => {
    try {
        const { name } = req.body;
        const existingSport = await connection_1.prisma.sport.findUnique({ where: { name } });
        if (existingSport) {
            return next(new errors_1.BadRequestError('Sport already exists'));
        }
        const sport = await connection_1.prisma.sport.create({
            data: { name },
        });
        res.status(201).json({ message: 'Sport created successfully', data: sport });
    }
    catch (error) {
        next(error);
    }
};
exports.createSport = createSport;
// Get all sports
const getAllSports = async (req, res, next) => {
    try {
        const { name } = req.query; // Get query parameter `name`
        const sports = await connection_1.prisma.sport.findMany({
            where: {
                name: {
                    contains: name, // Search sports with names containing the query parameter
                    mode: 'insensitive', // Case insensitive search
                },
            },
        });
        res.status(200).json({ message: 'Sports fetched successfully', data: sports });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllSports = getAllSports;
// Get a single sport by ID
const getSportById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sport = await connection_1.prisma.sport.findUnique({ where: { id } });
        if (!sport) {
            return next(new errors_1.NotFoundError('Sport not found'));
        }
        res.status(200).json({ message: 'Sport fetched successfully', data: sport });
    }
    catch (error) {
        next(error);
    }
};
exports.getSportById = getSportById;
// Update a sport by ID
const updateSport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const sport = await connection_1.prisma.sport.update({
            where: { id },
            data: { name },
        });
        res.status(200).json({ message: 'Sport updated successfully', data: sport });
    }
    catch (error) {
        next(error);
    }
};
exports.updateSport = updateSport;
const deleteSport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sport = await connection_1.prisma.sport.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Sport deleted successfully', data: sport });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSport = deleteSport;
