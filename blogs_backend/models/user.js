const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db.js');

class User extends Model {}

module.exports = User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    // updatedAt: 'updateTimestamp',
    modelName: 'user',
  }
);
