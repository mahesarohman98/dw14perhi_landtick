"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "identities",
      [
        {
          tandaPengenal: "311750330039700001",
          orderId: 1,
          userId: 2,
          trainId: 1,
          nama: "Anto",
          noHp: "082164250000",
          email: "Anto@mail.com"
        },
        {
          tandaPengenal: "311750550341556345",
          orderId: 1,
          userId: 2,
          trainId: 1,
          nama: "Dwi",
          noHp: "082164250000",
          email: "Dwi0@mail.com"
        },
        {
          tandaPengenal: "131754`40039700001",
          orderId: 2,
          userId: 3,
          trainId: 1,
          nama: "ratno",
          noHp: "082164250000",
          email: "ratno@mail.com"
        },
        {
          tandaPengenal: "5155353310495103033",
          orderId: 2,
          userId: 3,
          trainId: 1,
          nama: "Wicaksono",
          noHp: "082164250000",
          email: "Wicaksono@mail.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("identities", null, {});
  }
};
