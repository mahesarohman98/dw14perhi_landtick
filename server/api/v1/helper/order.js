const models = require("../../../models");
const Order = models.order;
const Ticket = models.train;
const Type = models.type;
const User = models.user;
const Identity = models.identity;
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
      where: { orderId: 1 },
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

exports.findAllOrder = async orderId => {
  try {
    const data = await Identity.findAll({
      where: { orderId },
      attributes: [
        [
          models.sequelize.literal(
            "GROUP_CONCAT(identity.id ORDER BY `identity`.`id` ASC)"
          ),
          "listId"
        ],
        [
          models.sequelize.literal(
            "GROUP_CONCAT(tandaPengenal ORDER BY `identity`.`id` ASC)"
          ),
          "listTandaPengenal"
        ],
        [
          models.sequelize.literal(
            "GROUP_CONCAT(nama ORDER BY `identity`.`id` ASC)"
          ),
          "listNama"
        ],
        [
          models.sequelize.literal(
            "GROUP_CONCAT(noHp ORDER BY `identity`.`id` ASC)"
          ),
          "listNoHp"
        ],
        [
          models.sequelize.literal(
            "GROUP_CONCAT(email ORDER BY `identity`.`id` ASC)"
          ),
          "listEmail"
        ],
        "orderId"
      ],
      include: [
        {
          model: Order,
          as: "transaksi",
          include: [
            {
              model: Ticket,
              as: "ticket",
              attributes: [
                "id",
                "name",
                "dateStart",
                "startStation",
                "startTime",
                "arrivalTime",
                "destinationStation",
                "price"
              ],
              include: [
                {
                  model: Type,
                  as: "type",
                  attributes: ["id", "name"]
                }
              ]
            }
          ]
        }
      ],
      group: ["orderId"]
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

exports.getAllOrderId = async userId => {
  const data = Identity.findAll({
    where: { userId },
    attributes: [
      [
        models.sequelize.literal(
          "GROUP_CONCAT(identity.id ORDER BY `identity`.`id` ASC)"
        ),
        "listId"
      ],
      [
        models.sequelize.literal(
          "GROUP_CONCAT(tandaPengenal ORDER BY `identity`.`id` ASC)"
        ),
        "listTandaPengenal"
      ],
      [
        models.sequelize.literal(
          "GROUP_CONCAT(nama ORDER BY `identity`.`id` ASC)"
        ),
        "listNama"
      ],
      [
        models.sequelize.literal(
          "GROUP_CONCAT(noHp ORDER BY `identity`.`id` ASC)"
        ),
        "listNoHp"
      ],
      [
        models.sequelize.literal(
          "GROUP_CONCAT(email ORDER BY `identity`.`id` ASC)"
        ),
        "listEmail"
      ],
      "orderId"
    ],
    include: [
      {
        model: Order,
        as: "transaksi",
        include: [
          {
            model: Ticket,
            as: "ticket",
            attributes: [
              "id",
              "name",
              "dateStart",
              "startStation",
              "startTime",
              "arrivalTime",
              "destinationStation",
              "price"
            ],
            include: [
              {
                model: Type,
                as: "type",
                attributes: ["id", "name"]
              }
            ]
          }
        ]
      }
    ],
    group: ["orderId"]
  });
  // order: Sequelize.literal("`identity`.`userId`")
  return data;
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

  const myorder = await Order.findOne({
    where: {
      trainId,
      userId
    },
    attributes: [
      "id",
      "trainId",
      "userId",
      "qty",
      "status",
      "totalPrice",
      "createdAt",
      "updatedAt"
    ]
  });
  console.log(myorder.id, "000000000000000000000000");

  for (let i = 0; i < quantity; i++) {
    await Identity.create({
      tandaPengenal: null,
      orderId: myorder.id,
      userId: myorder.userId,
      trainId: myorder.trainId,
      nama: null,
      noHp: null,
      email: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

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

exports.updateIdentity = async (data, id) => {
  try {
    const { tandaPengenal, nama, noHp, email } = data;
    await Identity.update(
      { tandaPengenal, nama, noHp, email },
      { where: { id } }
    );
    return;
  } catch (err) {
    console.log(err);
  }
};
