const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../../../models");
const saltRounds = 10;
const User = models.user;

const { createUser } = require("../helper/auth");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const result = await bcrypt.compare(password, user.password);
    if (user && result) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
      const data = { email, token };
      res.status(200).send({ data });
    } else {
      res.status(401).send({ message: "Invalid login" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    console.log(user, "===================)");
    if (user != null) {
      const token = jwt.sign({ userId: user }, process.env.SECRET_KEY);
      const email = req.body.email;
      const data = { email, token };
      res.status(200).send({ data });
    } else {
      res.send("message: cannot register");
    }
  } catch (err) {
    console.log(err);
  }
};
