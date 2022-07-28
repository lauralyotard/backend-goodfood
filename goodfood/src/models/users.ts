import * as Sequelize from 'sequelize';
import db from '../util/database';
import { Addresse } from './addresses';
import { Order } from './orders';
const crypto = require("crypto");

const groups = ["SUPERADMIN", "ADMIN", "CUSTOMER"];

export const User = db.define('users', {
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
  lastname: {
    type: Sequelize.STRING,
    notEmpty: true,
    notNull: true,
    unique: false
  },
  phone: {
    type: Sequelize.STRING,
    notEmpty: true,
    notNull: true,
    unique: false
  },
  email: {
    type: Sequelize.STRING,
    set: function (val: string) {
      this.setDataValue('email', val.toLowerCase());
    },
    isEmail: true,
    notEmpty: true,
    notNull: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    notEmpty: true,
    notNull: true,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  group: {
    type: Sequelize.ENUM(...groups),
    notEmpty: true,
    notNull: true
  }
});

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}
User.encryptPassword = function (plainText: string, salt: string) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = (user: any) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

User.prototype.verifyPassword = function (enteredPassword: string) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
}

User.hasMany(Order);
User.Addresse = User.hasOne(Addresse);
