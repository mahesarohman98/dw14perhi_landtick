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
          qty: 6,
          remainingQty: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Agro Ini",
          typeId: 1,
          dateStart: new Date(),
          startStation: "Stasiun Medan",
          startTime: new Date(),
          destinationStation: "Stasiun Kisaran",
          arrivalTime: new Date(),
          price: 10000,
          qty: 6,
          remainingQty: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Agro Cherry",
          typeId: 1,
          dateStart: new Date(),
          startStation: "Stasiun Batu Tulis",
          startTime: new Date(),
          destinationStation: "Stasiun Bekri",
          arrivalTime: new Date(),
          price: 10000,
          qty: 6,
          remainingQty: 3,
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
