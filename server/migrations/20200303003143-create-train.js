"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("trains", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "types",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      dateStart: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        get: function() {
          return moment.utc(this.getDataValue("regDate")).format("YYYY-MM-DD");
        }
      },
      startStation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startTime: {
        allowNull: false,
        type: Sequelize.TIME,
        get: function() {
          return moment.utc(this.getDataValue("regDate")).format("HH-MM-DD");
        }
      },
      destinationStation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      arrivalTime: {
        allowNull: false,
        type: Sequelize.TIME,
        get: function() {
          return moment.utc(this.getDataValue("regDate")).format("HH-MM-DD");
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      remainingQty: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("trains");
  }
};
