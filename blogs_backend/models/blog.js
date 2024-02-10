const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db.js');
const User = require('./user.js');

class Blog extends Model {}

module.exports = Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
);
