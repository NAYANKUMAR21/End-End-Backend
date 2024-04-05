const { validationResult } = require("express-validator");
const authModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.salt_rounds) || 10;
const jwt = require("jsonwebtoken");
const tokenPass = process.env.JWT_KEY || "nayan@1998";

async function getController(req, res) {
  try {
    let data = await authModel.find({});
    return res.status(200).send({ message: "Get auth route", data });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
}

const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  try {
    let { email, name, password, role } = req.body;
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPass = await bcrypt.hash(password, salt);
    console.log(salt, hashedPass);

    if (!role) {
      role = "admin";
    }
    await authModel.create({ email, name, password: hashedPass, role });
    return res.status(200).send({ message: "User created successfully" });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
};

const loggedIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password 1" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password 2" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, tokenPass);
    res.status(200).json({ message: "Login successful", token });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
};
module.exports = { getController, registerController, loggedIn };
