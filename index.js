const express = require("express");
const app = express();
app.use(express.Router());
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const connection = require("./Config/db");
const { userRouter } = require("./Routes/UserRoute");
const { dataRouter } = require("./Routes/DataRoute");

app.get("/", (req, res) => {
  res.send("Welcome To HomePage");
});
app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", dataRouter);

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("DB Connected Successful");
    console.log(`App Listening on port ${PORT}`);
  } catch (err) {
    console.log("DB Connected Failed");
    console.log(err);
  }
});
