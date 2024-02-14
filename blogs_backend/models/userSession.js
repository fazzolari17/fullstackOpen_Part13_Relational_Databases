const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../util/db.js');

class UserSession extends Model {}

module.exports = UserSession.init(
  {
    sid: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user_session',
  }
);
