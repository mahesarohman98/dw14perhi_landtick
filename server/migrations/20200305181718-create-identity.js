"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("identities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tandaPengenal: {
        type: Sequelize.STRING
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      trainId: {
        type: Sequelize.INTEGER,
        references: {
          model: "trains",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      nama: {
        type: Sequelize.STRING
      },
      noHp: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("identities");
  }
};
