const { findAllTicket } = require("../helper/ticket");

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
