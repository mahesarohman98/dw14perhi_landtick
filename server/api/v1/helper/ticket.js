const models = require("../../../models");
const Ticket = models.train;
const Type = models.type;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.findAllTicket = async (startTime, dateStart) => {
  try {
    if (dateStart == null && startTime != null) {
      const data = await Ticket.findAll({
        where: {
          startTime,
          remainingQty: {
            [Op.lt]: Sequelize.literal("remainingQty + 1")
          }
        },
        include: [
          {
            model: Type,
            as: "type",
            attributes: ["id", "name"]
          }
        ]
      });
      return data;
    } else if (startTime == "" && dateStart != null) {
      console.log("sddddd");
      const data = await Ticket.findAll({
        where: {
          dateStart,
          remainingQty: {
            [Op.lt]: Sequelize.literal("remainingQty + 1")
          }
        },
        include: [
          {
            model: Type,
            as: "type",
            attributes: ["id", "name"]
          }
        ]
      });
      return data;
    } else {
      console.log(dateStart);
      const data = await Ticket.findAll({
        where: {
          startTime,
          dateStart,
          remainingQty: {
            [Op.lt]: Sequelize.literal("remainingQty + 1")
          }
        },
        include: [
          {
            model: Type,
            as: "type",
            attributes: ["id", "name"]
          }
        ]
      });
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findTodayTicket = async dateStart => {
  const data = await Ticket.findAll({
    where: { dateStart },
    include: [
      {
        model: Type,
        as: "type",
        attributes: ["id", "name"]
      }
    ]
  });
  return data;
};

exports.CreateTicket = async data => {
  const {
    name,
    typeId,
    dateStart,
    startStation,
    startTime,
    destinationStation,
    arrivalTime,
    price,
    qty,
    remainingQty
  } = data;
  const returnData = await Ticket.create({
    name,
    typeId,
    dateStart,
    startStation,
    startTime,
    destinationStation,
    arrivalTime,
    price,
    qty,
    remainingQty
  });
  return returnData;
};

exports.findTicketsHelper = async data => {
  try {
    const { startStation, destinationStation, dateStart, quantity } = data;
    const returnData = await Ticket.findAll({
      where: {
        qty: {
          [Op.gt]: Sequelize.literal("`train`.`remainingQty` + " + quantity)
        },
        [Op.or]: [{ startStation }, { destinationStation }, { dateStart }]
      },
      include: [
        {
          model: Type,
          as: "type",
          attributes: ["id", "name"]
        }
      ]
    });
    return returnData;
  } catch (err) {
    console.log(err);
  }
};
