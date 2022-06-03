import * as Sequelize from 'sequelize';
import db from '../util/database';

export const Ingredient = db.define('ingredients', {
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