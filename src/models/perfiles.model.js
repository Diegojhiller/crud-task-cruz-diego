import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Profile;
