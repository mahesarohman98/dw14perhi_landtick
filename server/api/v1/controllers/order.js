const {
  isQuantityPossible,
  createOrder,
  findOrder,
  findTodayOrder,
  findAllOrder,
  findOrderId,
  updateOrder
} = require("../helper/order");

exports.create = async (req, res) => {
  try {
    const id = req.userId;
    const isDouble = await findOrder(req.body.trainId, id);
    if (isDouble == null) {
      const check = await isQuantityPossible(id, req.body);
      if (check != false) {
        const order = await createOrder(id, req.body, check);
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

exports.todayOrder = async (req, res) => {
  try {
    const { userId } = req;
    const data = await findTodayOrder(new Date(), userId);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    if (req.roles == "Admin") {
      const data = await findAllOrder();
      res.send({ data });
    } else {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.find = async (req, res) => {
  const { id } = req.params;
  const data = await findOrderId(id);
  console.log(req.userId);
  console.log(data.userId);
  if (req.roles == "Admin" || req.userId === data.userId) {
    res.send({ data });
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const check = await findOrderId(id);
  if (req.roles == "Admin") {
    const data = await updateOrder(id, req.body);
    res.send({ data });
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
