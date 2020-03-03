const {
  isQuantityPossible,
  createOrder,
  findOrder,
  findTodayOrder
} = require("../helper/order");

exports.create = async (req, res) => {
  try {
    const id = req.userId;
    const isDouble = await findOrder(req.body.trainId, id);
    if (isDouble == null) {
      const check = await isQuantityPossible(id, req.body);
      if (check != false) {
        const order = await createOrder(id, req.body, check);
        console.log(order.dataValues, "=============D");

        const data = await findOrder(
          order.dataValues.trainId,
          order.dataValues.userId
        );
        res.send({ data });
      } else {
        res.send({ message: "quantity is full" });
      }
    } else {
      res.send({ message: "you already booked" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.todayTicket = async (req, res) => {
  try {
    const { userId } = req;
    console.log(userId, "====================)");

    const data = await findTodayOrder(new Date(), userId);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
