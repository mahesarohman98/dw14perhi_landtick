"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "types",
      [
        {
          id: 1,
          name: "Ekonomi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Bussiness",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Executive",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("types", null, {});
  }
};
