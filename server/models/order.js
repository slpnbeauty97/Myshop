// models/order.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const OrderModel = sequelize.define('Orders', {
  name: DataTypes.STRING,
  amount: DataTypes.INTEGER,
  phone: DataTypes.STRING
});

export default OrderModel;
