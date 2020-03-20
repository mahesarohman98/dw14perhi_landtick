const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../../../models");
const User = models.user;
const saltRounds = 10;

const { createUser } = require("../helper/auth");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const result = await bcrypt.compare(password, user.password);
    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
      const data = { email, token };
      res.status(200).send({ data });
    } else {
      res.status(404).send({ message: "Invalid login" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Invalid login" });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    if (user != null) {
      const token = jwt.sign({ userId: user }, process.env.SECRET_KEY);
      const email = req.body.email;
      const data = { email, token };
      res.status(200).send({ data });
    } else {
      res.status(404).send({ message: "cannot register" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.check = async (req, res) => {
  try {
    const id = req.userId;
    console.log(id);

    const data = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      }
    });
    if (data) {
      res.status(200).send({ status: true, message: "succes", data });
    } else {
      res
        .status(404)
        .send({ status: false, message: "user not found", data: {} });
    }
  } catch (err) {
    res
      .status(404)
      .send({ status: false, message: "Authorization not Allowed" });
  }
};
