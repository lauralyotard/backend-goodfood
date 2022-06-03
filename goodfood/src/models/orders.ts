import * as Sequelize from 'sequelize';
import db from '../util/database';
import { Payment } from './payments';
import { Pizza } from './pizzas';
import { User } from './users';

const status = ["VALIDE", "PREPARATION", "PRETE", "RECU"];

export const Order = db.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.ENUM(...status),
        allowNull: false
    }
});

Order.Payment = Order.hasOne(Payment, { as: 'payment', foreignKey: 'orderId' });