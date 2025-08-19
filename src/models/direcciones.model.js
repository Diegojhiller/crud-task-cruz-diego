import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Address = sequelize.define('Address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Address;