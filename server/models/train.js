"use strict";
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define(
    "train",
    {
      name: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      dateStart: DataTypes.DATEONLY,
      startStation: DataTypes.STRING,
      startTime: DataTypes.TIME,
      destinationStation: DataTypes.STRING,
      arrivalTime: DataTypes.TIME,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      remainingQty: DataTypes.INTEGER
    },
    {}
  );
  train.associate = function(models) {
    train.belongsTo(models.type, { foreignKey: "typeId", as: "type" });

    train.belongsToMany(models.user, {
      through: models.order,
      as: "train",
      foreignKey: "trainId"
    });

    train.hasMany(models.identity, {
      as: "myTrain"
    });
  };
  return train;
};
