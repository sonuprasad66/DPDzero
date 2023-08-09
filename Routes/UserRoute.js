const express = require("express");
const { userToken, userRegister } = require("../Controllers/UserController");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/token", userToken);

module.exports = {
  userRouter,
};
