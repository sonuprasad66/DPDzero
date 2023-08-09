const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config;
const { userModel } = require("../Models/UserModel");

const userRegister = async (req, res) => {
  const { username, email, password, full_name, age, gender } = req.body;
  try {
    if (username && email && password && full_name) {
      const username_exists = await userModel.findOne({ username: username });
      const email_exists = await userModel.findOne({ email: email });

      if (username_exists) {
        return res.send({
          status: "error",
          code: "USERNAME_EXISTS",
          message:
            "The provided username is already taken. Please choose a different username.",
        });
      }

      if (email_exists) {
        return res.send({
          status: "error",
          code: "EMAIL_EXISTS",
          message:
            "The provided email is already registered. Please use a different email address.",
        });
      }

      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!regex.test(password)) {
        return res.send({
          status: "error",
          code: "INVALID_PASSWORD",
          message:
            "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
        });
      }

      if (Number(age) <= 0) {
        return res.send({
          status: "error",
          code: "INVALID_AGE",
          message: "Invalid age value. Age must be a positive integer.",
        });
      }

      if (gender !== "male" && gender !== "female" && gender !== "non-binary") {
        return res.send({
          status: "error",
          code: "GENDER_REQUIRED",
          message:
            "Gender field is required. Please specify a valid gender (e.g., male, female, non-binary).",
        });
      }

      bcrypt.hash(password, 5, async function (err, hash_password) {
        if (err) {
          res.send({
            status: "error",
            code: "BCRYPTING_ERROR",
            message: "Error while encrypting password",
          });
        } else {
          const new_user = new userModel({
            username: username,
            email: email,
            password: hash_password,
            full_name: full_name,
            age: age,
            gender: gender,
          });

          await new_user.save();
          res.send({
            status: "success",
            message: "User successfully registered!",
            data: {
              user_id: new_user._id,
              username: new_user.username,
              email: new_user.email,
              full_name: new_user.full_name,
              age: new_user.age,
              gender: new_user.gender,
            },
          });
        }
      });
    } else {
      res.send({
        status: "error",
        code: "INVALID_REQUEST",
        message:
          "Invalid request. Please provide all required fields: username, email, password, full_name.",
      });
    }
  } catch (err) {
    res.send({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

const userToken = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username && password) {
      const user = await userModel.findOne({ username: username });

      if (!user) {
        return res.send({
          status: "error",
          code: "INVALID_CREDENTIALS",
          message:
            "Invalid credentials. The provided username or password is incorrect.",
        });
      }

      const hash_password = user.password;
      const userId = user._id;

      bcrypt.compare(password, hash_password, async (err, result) => {
        if (err) {
          res.send({
            status: "error",
            code: "HASHEDPASSWORD_COMPARING_ERROR",
            message: "Error while comparing the hash password",
          });
        }
        // {
        //   expiresIn: 3600,
        // }
        if (result) {
          let token = jwt.sign({ userId }, process.env.SECRET_KEY);

          if (token) {
            res.send({
              status: "success",
              message: "Access token generated successfully.",
              data: {
                access_token: token,
                expires_in: 3600,
              },
            });
          }
        }
      });
    } else {
      res.send({
        status: "error",
        code: "MISSING_FIELDS",
        message: "Missing fields. Please provide both username and password.",
      });
    }
  } catch (err) {
    res.send({
      status: "error",
      code: "INTERNAL_ERROR",
      message: "Internal server error occurred. Please try again later.",
    });
  }
};

module.exports = {
  userRegister,
  userToken,
};
