const models = require("../../../models");
const Ticket = models.train;
const Type = models.type;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.findAllTicket = async (startTime, dateStart) => {
  try {
    const data = await Ticket.findAll({
      where: {
        remainingQty: {
          [Op.lt]: Sequelize.literal("remainingQty + 1")
        },
        [Op.or]: [{ startTime }, { dateStart }]
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
    console.log(startStation, destinationStation);
    if (startStation == "" && destinationStation != "") {
      console.log("startStation: ", startStation);
      const returnData = await Ticket.findAll({
        where: {
          destinationStation,
          dateStart,
          qty: {
            [Op.gt]: Sequelize.literal("remainingQty - 1 + " + quantity)
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
      return returnData;
    } else if (startStation != "" && destinationStation == "") {
      console.log("destinationStation: ", destinationStation);
      const returnData = await Ticket.findAll({
        where: {
          startStation,
          dateStart,
          qty: {
            [Op.gt]: Sequelize.literal("remainingQty - 1 + " + quantity)
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
      return returnData;
    } else if (startStation != "" && destinationStation != "") {
      console.log("sddfdf");

      const returnData = await Ticket.findAll({
        where: {
          startStation,
          destinationStation,
          dateStart,
          qty: {
            [Op.gt]: Sequelize.literal("remainingQty - 1 + " + quantity)
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
      return returnData;
    } else {
      console.log("sddfdf");

      const returnData = await Ticket.findAll({
        where: {
          qty: {
            [Op.gt]: Sequelize.literal("remainingQty - 1 + " + quantity)
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
    }
  } catch (err) {
    console.log(err);
  }
};
