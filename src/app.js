require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth.router");
const connect = require("./Config/db");

const PORT = process.env.PORT || 3000;

app.use(express.json(), express.urlencoded({ extended: true }));
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

app.listen(PORT, async () => {
  await connect();
  console.log(`backend running on http://localhost:${PORT}`);
});
