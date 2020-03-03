"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      trainId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      status: DataTypes.ENUM("Pending", "Approved", "Cancel"),
      totalPrice: DataTypes.INTEGER
    },
    {}
  );
  order.associate = function(models) {
    order.belongsTo(models.train, { as: "ticket", foreignKey: "trainId" });
    order.belongsTo(models.user, { as: "customer", foreignKey: "userId" });
  };
  return order;
};
