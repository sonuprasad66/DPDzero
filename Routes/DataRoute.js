const express = require("express");
const dataRouter = express.Router();
const { authentication } = require("../Middleware/Middleware");
const {
  storeData,
  retrieveData,
  updateData,
  deleteData,
} = require("../Controllers/DataController");

dataRouter.post("/data", authentication, storeData);
dataRouter.get("/data/:key", authentication, retrieveData);
dataRouter.put("/data/:key", authentication, updateData);
dataRouter.delete("/data/:key", authentication, deleteData);

module.exports = {
  dataRouter,
};
