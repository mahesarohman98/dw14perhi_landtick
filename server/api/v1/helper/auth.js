const bcrypt = require("bcrypt");
const models = require("../../../models");
const saltRounds = 10;
const User = models.user;

exports.createUser = async data => {
  try {
    const { name, gender, email, password, phone, address } = data;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      roles: "User",
      email,
      password: hash,
      gender,
      phone,
      address,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return user.id;
  } catch (err) {
    console.log(err);
  }
};
