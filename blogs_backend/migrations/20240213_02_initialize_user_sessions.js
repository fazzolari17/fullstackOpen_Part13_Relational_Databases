const { DataTypes, Sequelize } = require('sequelize');
const { INTEGER, BOOLEAN, TEXT } = DataTypes;

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('user_sessions', {
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
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: 'users', key: 'id' },
      // },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('user_sessions');
  },
};
