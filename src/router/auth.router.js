const express = require("express");
const { body } = require("express-validator");
const {
  getController,
  registerController,
  loggedIn,
} = require("../controller/auth.controller");
const app = express.Router();

app.get("/", getController);

app.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  registerController,
);

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  loggedIn,
);

module.exports = app;
