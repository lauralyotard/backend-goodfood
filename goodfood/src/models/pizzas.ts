import * as Sequelize from 'sequelize';
import db from '../util/database';

import { Ingredient } from './ingredients';
import { Order } from './orders';

export const Pizza = db.define('pizzas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true,
        unique: false
    },
    description: {
        type: Sequelize.STRING,
        notEmpty: false,
        notNull: false
    },
    base: {
        type: Sequelize.ENUM('BLANCHE', 'ROUGE'),
        notEmpty: true,
        notNull: true,
        unique: false
    },
    image: {
        type: Sequelize.STRING,
        notEmpty: false,
        notNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        notEmpty: true,
        notNull: true
    }
});

Pizza.Pizzas_Orders = db.define('pizzas_orders', {
    quantity: Sequelize.INTEGER
});

Pizza.belongsToMany(Order, { through: Pizza.Pizzas_Orders });
Pizza.Ingredients = Pizza.hasMany(Ingredient, { as: 'ingredients', foreignKey: 'pizzaId' });