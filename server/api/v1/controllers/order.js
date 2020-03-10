const {
  isQuantityPossible,
  createOrder,
  findOrder,
  findTodayOrder,
  findAllOrder,
  findOrderId,
  updateOrder,
  getAllOrderId,
  updateIdentity
} = require("../helper/order");

const models = require("../../../models");
const Order = models.order;
const Ticket = models.train;
const Type = models.type;
const User = models.user;

exports.create = async (req, res) => {
  try {
    const { userId } = req;
    const isDouble = await findOrder(req.body.trainId, userId);
    if (isDouble == null) {
      const check = await isQuantityPossible(userId, req.body);
      if (check != null) {
        const order = await createOrder(userId, req.body, check);
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

exports.delete = async (req, res) => {
  res.send("sdsf");
};

exports.all = async (req, res) => {
  try {
    const { roles } = req;
    if (roles == "Admin") {
      const data = await Order.findAll({
        include: [
          {
            model: User,
            as: "customer",
            attributes: ["id", "name", "gender", "phone", "address"]
          },
          {
            model: Ticket,
            as: "ticket",
            attributes: ["id", "qty", "price", "name"]
          }
        ]
      });
      res.send({ data });
    } else {
      res.status(404).send({ message: "Not authorize " });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findMyOrder = async (req, res) => {
  try {
    const { userId } = req;
    const data = await getAllOrderId(userId);
    res.send({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await findAllOrder(orderId);
    let data = "";
    if (order != null) data = order[0];
    else data = "";
    res.send({ data });
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

exports.updateMyOrder = async (req, res) => {
  const data = req.body;
  let updateData = { tandaPengenal: "", nama: "", noHp: "", email: "" };
  data.id.map((id, index) => {
    updateData.tandaPengenal = data.tandaPengenal[index];
    updateData.nama = data.nama[index];
    updateData.noHp = data.noHp[index];
    updateData.email = data.email[index];
    updateIdentity(updateData, id);
  });
  res.send({ data });
};

exports.paymentProof = async (req, res) => {
  try {
    const { filename } = req.file;
    const { id } = req.body;
    console.log(id, "gilaaaa");
    if (!filename) {
      res.status(400).json({
        status: "failed",
        code: "400",
        message: "Please upload file"
      });
    } else {
      await Order.update(
        {
          attachment: filename
        },
        { where: { id } }
      );

      res.status(200).json({
        status: "success",
        code: "200",
        message: "file uploaded successfully",
        data: filename
      });
    }
  } catch (err) {
    console.log(err);
  }
};
