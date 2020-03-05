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

exports.findOrderId = async id => {
  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "gender", "phone", "address"]
        },
        {
          model: Ticket,
          as: "ticket",
          attributes: ["id", "qty", "price"]
        }
      ]
    });
    return order;
  } catch (err) {
    console.log(err);
  }
};

exports.findAllOrder = async () => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "gender", "phone", "address"]
        },
        {
          model: Ticket,
          as: "ticket",
          attributes: ["id", "qty", "price"]
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
    const { trainId, quantity } = data;
    const check = await Ticket.findOne({
      where: {
        id: trainId,
        qty: {
          [Op.gt]: Sequelize.literal("remainingQty - 1 + " + quantity)
        }
      }
    });
    return check;
  } catch (err) {
    console.log(err);
  }
};

exports.createOrder = async (userId, data, check) => {
  const { trainId, quantity } = data;
  const totalPrice = check.price * quantity;
  const updateQty = check.remainingQty + quantity;

  await Ticket.update(
    { remainingQty: updateQty },
    {
      where: { id: check.id }
    }
  );

  const order = await Order.create({
    trainId,
    userId,
    qty: quantity,
    status: "Pending",
    totalPrice,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return order;
};

exports.findTodayOrder = async (dateStart, userId) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

exports.updateOrder = async (id, data) => {
  try {
    const { status } = data;
    const returnData = await Order.update(
      { status },
      {
        where: { id }
      }
    );
    return returnData;
  } catch (err) {
    console.log(err);
  }
};
