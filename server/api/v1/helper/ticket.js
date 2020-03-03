const models = require("../../../models");
const Ticket = models.train;
const Type = models.type;
const Sequelize = require("sequelize");

exports.findAllTicket = async (startTime, dateStart) => {
  try {
    const Op = Sequelize.Op;
    if (dateStart == null) {
      const data = await Ticket.findAll({
        where: { startTime },
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
        where: { [Op.and]: [{ startTime, dateStart }] },
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
