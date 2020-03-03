const models = require("../../../models");
const Order = models.order;
const Ticket = models.train;
const User = models.user;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.findOrder = async (trainId, userId) => {
  try {
    const order = await Order.findOne({
      where: { trainId, userId },
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "gender", "phone", "address"]
        }
      ]
    });
    return order;
  } catch (err) {
    console.log(err);
  }
};

exports.isQuantityPossible = async (id, data) => {
  try {
    const { trainId, qty } = data;
    // const Op = Sequelize.Op;
    // where: { [Op.and]: [{ trainId, status: "Approved" }] },
    const quantity = await Order.findAll({
      where: {
        trainId,
        [Op.or]: [{ status: "Approved" }, { status: "Pending" }]
      },
      include: [
        {
          model: Ticket,
          as: "ticket",
          attributes: ["id", "qty", "price"]
        }
      ],
      attributes: [
        "Order.qty",
        [Sequelize.fn("sum", Sequelize.col("Order.qty")), "totalQty"]
      ]
    });
    const myquantity = quantity[0].dataValues.ticket.qty;
    const totalQuantity = quantity[0].dataValues.totalQty;
    if (myquantity - totalQuantity - qty >= 0) {
      console.log(quantity[0].dataValues.ticket.price);

      return quantity[0].dataValues.ticket.price;
    } else {
      return false;
    }
    return quantity;
  } catch (err) {
    console.log(err);
  }
};

exports.createOrder = async (id, data, price) => {
  const { trainId, qty } = data;
  const totalPrice = price * qty;
  console.log(price);

  const order = await Order.create({
    trainId,
    userId: id,
    qty,
    status: "Pending",
    totalPrice,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return order;
};

exports.findTodayOrder = async (dateStart, userId) => {
  const data = await Order.findAll({
    where: { status: "Approved", userId },
    include: [
      {
        model: Ticket,
        as: "ticket",
        attributes: ["id", "qty", "price", "dateStart"],
        where: { dateStart }
      },
      {
        model: User,
        as: "customer",
        attributes: ["id", "name", "gender", "phone", "address"]
      }
    ]
  });
  return data;
};
