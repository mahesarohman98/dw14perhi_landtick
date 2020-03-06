"use strict";
module.exports = (sequelize, DataTypes) => {
  const identity = sequelize.define(
    "identity",
    {
      tandaPengenal: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      trainId: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      noHp: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  identity.associate = function(models) {
    identity.belongsTo(models.train, {
      as: "myTrain",
      foreignKey: "trainId"
    });

    identity.belongsTo(models.user, {
      as: "pemesan",
      foreignKey: "userId"
    });
  };
  return identity;
};
