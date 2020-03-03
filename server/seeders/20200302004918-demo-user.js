"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "123456";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(myPlaintextPassword, salt);
      return queryInterface.bulkInsert(
        "users",
        [
          {
            id: "1",
            roles: "Admin",
            email: "mahesa@mail.com",
            password: hash,
            name: "mahesa rohman",
            gender: "Male",
            phone: "082164250000",
            address: "permata bintaro",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "2",
            roles: "User",
            email: "johndoe@mail.com",
            password: hash,
            name: "john doe",
            gender: "Male",
            phone: "082164250000",
            address: "permata bintaro",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "3",
            roles: "User",
            email: "janedoe@mail.com",
            password: hash,
            name: "jane doe",
            gender: "Female",
            phone: "082164250000",
            address: "permata bintaro",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "4",
            roles: "User",
            email: "superman@mail.com",
            password: hash,
            name: "superman doe",
            gender: "Male",
            phone: "082164250000",
            address: "permata bintaro",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    } catch (err) {
      console.log(err);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
