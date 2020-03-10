"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orders",
      [
        {
          trainId: 1,
          userId: 2,
          qty: 1,
          status: "Approved",
          totalPrice: 10000,
          attachment: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          trainId: 1,
          userId: 3,
          qty: 2,
          status: "Approved",
          totalPrice: 20000,
          attachment: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  }
};
