"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      roles: DataTypes.ENUM("Admin", "User"),
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female"),
      phone: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.belongsToMany(models.train, {
      through: models.order,
      as: "customer",
      foreignKey: "userId"
    });
  };
  return user;
};
