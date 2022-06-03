import * as Sequelize from 'sequelize';
import db from '../util/database';

import { Restaurant } from './restaurants';

export const Addresse = db.define('addresses', {
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
    line1: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true,
        unique: false
    },
    cityName: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true,
        unique: false
    },
    cityZipCode: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true,
        unique: false
    },
    country: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true,
        unique: false
    }
});