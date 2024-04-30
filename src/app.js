require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const productROuter = require("./router/Product.router");
const authRouter = require("./router/auth.router");
const connect = require("./Config/db");
const redisClient = require("./utils/redis");
const PORT = process.env?.port || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    const message = "Backend ZigZig";
    return res.status(200).send({ message });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});

app.use("/auth", authRouter);
app.use("/product", productROuter);
app.listen(PORT, async () => {
  await connect();
  await redisClient.connect();
  console.log(`backend running on http://localhost:${PORT}`);
});
