const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
