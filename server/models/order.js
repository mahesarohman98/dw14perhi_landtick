"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      trainId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      status: DataTypes.ENUM("Pending", "Approved", "Cancel"),
      totalPrice: DataTypes.INTEGER,
      attachment: DataTypes.STRING
    },
    {}
  );
  order.associate = function(models) {
    order.belongsTo(models.train, { as: "ticket", foreignKey: "trainId" });
    order.belongsTo(models.user, { as: "customer", foreignKey: "userId" });

    // order.hasMany(models.identity, {
    //   as: "transaksi"
    // });
    // order.belongsToMany(models.identity, {
    //   through: models.identity,
    //   as: "transaksi",
    //   foreignKey: "orderId"
    // });
  };
  return order;
};
