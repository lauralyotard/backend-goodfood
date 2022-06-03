import { NextFunction, Request, Response } from "express";
import { addHeadersToResponse } from "./server-helpers";
import sequelize from './util/database';
import { Pizza } from './models/pizzas';
import { Restaurant } from "./models/restaurants";

export async function getAllPizzas(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findOne({ where: { id }, include: [{ model: Pizza, as: 'pizzas' }] });
        return res.status(200).json({
            count: restaurant.pizzas ? restaurant.pizzas.length : 0,
            data: restaurant.pizzas
        });
    }
    catch (ex) {
        throw ex;
    }
}