const express = require("express");
const bcryptjs = require("bcryptjs");
const LoginModel = require("../model/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const router = express.Router();

const generateToken = (user = {}) =>{
    return jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        authConfig.secret,
        {
            expiresIn:86400
        }
      );
}

router.post("/register", async (req, res) => {
  const { email } = req.body;

  if (await LoginModel.findOne({ email }))
    return res.status(400).json({
      error: true,
      message: "User already exists",
    });

  const user = await LoginModel.create(req.body);
  user.password = undefined;
  return res.json({
    error: false,
    message: "Registred with sucess",
    data: generateToken(user)
  });
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  const user = await LoginModel.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({
      error: true,
      message: "User not found",
    });

  if (!(await bcryptjs.compare(password, user.password)))
    return res.status(400).json({
      error: true,
      message: "Password invalid",
    });

  return res.json({
    error: false,
    message: "User logged with sucess",
    data: generateToken(user)
  });
});

module.exports = router;
