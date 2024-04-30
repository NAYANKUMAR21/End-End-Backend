const express = require("express");
const app = express.Router();

const {
  GetProducts,
  AddSingleProductData,
} = require("../controller/Product.controller");

app.get("/:id", GetProducts);

app.post("/", AddSingleProductData);

app.patch("/", async () => {});
app.delete("/", async () => {});

module.exports = app;
