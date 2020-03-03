"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trains",
      [
        {
          id: 1,
          name: "Agro Willis",
          typeId: 1,
          dateStart: new Date(),
          startStation: "Stasiun Manggarai",
          startTime: new Date(),
          destinationStation: "Stasiun Surabaya Pasarturi",
          arrivalTime: new Date(),
          price: 10000,
          qty: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trains", null, {});
  }
};
