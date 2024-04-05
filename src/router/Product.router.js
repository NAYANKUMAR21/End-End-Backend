const express = require("express");
const app = express.Router();

const {
  GetProducts,
  addSingleProductData,
} = require("../controller/Product.controller");

app.get("/", GetProducts);

app.post("/", addSingleProductData);

app.patch("/", async () => {});
app.delete("/", async () => {});

module.exports = app;
