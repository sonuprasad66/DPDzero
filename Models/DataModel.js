const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const dataModel = new mongoose.model("data", dataSchema);

module.exports = {
  dataModel,
};
