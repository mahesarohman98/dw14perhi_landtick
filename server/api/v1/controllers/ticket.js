const {
  findAllTicket,
  findTodayTicket,
  CreateTicket
} = require("../helper/ticket");

exports.findAll = async (req, res) => {
  try {
    const { startTime, dateStart } = req.query;
    console.log(startTime, "hhhhhhhhhh");
    console.log(startTime);
    const data = await findAllTicket(startTime, dateStart);
    res.send({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.todayTicket = async (req, res) => {
  try {
    const data = await findTodayTicket(new Date(), null);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

exports.findTickets = async (req, res) => {
  try {
    res.send();
  } catch (err) {
    console.log(err);
  }
};

exports.create = async (req, res) => {
  try {
    console.log(req.roles);

    if (req.roles == "Admin") {
      const data = CreateTicket(req.body);
      res.send(data);
    } else {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  } catch (err) {
    console.log(err);
  }
};
