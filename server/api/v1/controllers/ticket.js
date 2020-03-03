const { findAllTicket, findTodayTicket } = require("../helper/ticket");

exports.findAll = async (req, res) => {
  try {
    const { startTime, dateStart } = req.query;
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
