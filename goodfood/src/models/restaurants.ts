import * as Sequelize from 'sequelize';
import db from '../util/database';
import { Addresse } from './addresses';
import { Pizza } from './pizzas';

export const Restaurant = db.define('restaurants', {
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
    }
});

Restaurant.Addresse = Restaurant.hasOne(Addresse, { as: 'address', foreignKey: 'restaurantId' });
Restaurant.Pizzas = Restaurant.hasMany(Pizza, { as: 'pizzas', foreignKey: 'restaurantId' });