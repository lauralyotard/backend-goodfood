import * as Sequelize from 'sequelize';
import db from '../util/database';

export const Payment = db.define('payments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    mode: {
        type: Sequelize.ENUM('PAYPAL', 'CREDIT_CARD'),
        notEmpty: true,
        notNull: true
    },
    amount: {
        type: Sequelize.FLOAT,
        notEmpty: true,
        notNull: true
    }
});