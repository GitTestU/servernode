const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
require("dotenv").config();

sgMail.setApiKey(process.env.APIKEY);
const secretKey = process.env.SECRET_KEY;
const emailSender = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASS;
console.log(emailSender, emailPassword);
// Generate reset token for forget password token
const generateResetToken = (customerId) => {
  const token = jwt.sign({ customerId }, secretKey, { expiresIn: 30 });
  return token;
};

//Regiter a new Customer
router.post("/register", async (req, res) => {
  try {
    // Create a new Customer
    const { firstName, lastName, userName, password, email, phoneNumber } =
      req.body;

    const saltRounds = 10;
    // Hash passpord
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCustomer = new Customer({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      email,
      phoneNumber,
    });
    // Save the user to the database
    await newCustomer.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
    console.log(error);
  }
});

//Login Customer

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const customer = await Customer.findOne({ userName });

    if (!customer) {
      return res.status(404).json({ message: " Customer not found" });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(401).json({ massage: " Invalid password" });
    }

    //Generate JWT
    const token = jwt.sign({ customerId: customer._id }, secretKey, {
      expiresIn: "30s",
    });
    res.status(200).json({ massage: "Login succesfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Failed to Login" });
    console.log(error);
  }
});

//Forget password

router.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  try {
    // Find user with email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      // if user not found return error
      return res.status(404).json({ error: "Customer Not Found" });
    }
    // generate reset token
    const resetToken = generateResetToken(customer._id);
    //expire token
    const resetTokenExpire = new Date(Date.now() + 1);
    customer.resetToken = resetToken;
    customer.resetTokenExpire = resetTokenExpire;
    await customer.save();
    //generate reset link with token
    const resetLink = `https://www.example.com/reset-password?token=${resetToken}`;
    //send password reset email
    const msg = {
      to: email,
      from: process.env.EMAIL,
      subject: "Reset Password",
      text: "click here to reset",
      html: `<p>Merhaba,</p>
      <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
      <a href="${resetLink}">Şifre Sıfırlama</a>`,
    };
    
    await sgMail.send(msg);
    //return seccess response
    res.status(200).json({ message: "Password reset link sent successfully" });
    //expire token
    console.log(customer);
    setTimeout(async () => {
      customer.resetToken = null;
      customer.resetTokenExpire = null;
      await customer.save();
    }, 10000);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
