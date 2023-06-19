const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const CarRentals = require("../models/CarRentals");

router.post("/postcarrentals", async (req, res) => {
  try {
    // Create a new CarRentals
    const {
      companyName,
      email,
      phoneNumber,
      serviceArea,
      userName,
      password,
      Address,
    } = req.body;

    const saltRounds = 10;
    // Hash passpord
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCarRentals = new CarRentals({
      companyName,
      email,
      phoneNumber,
      serviceArea,
      userName,
      password: hashedPassword,
      Address,
    });
    // Save the user to the database
    await newCarRentals.save();
    res.status(201).json({ message: "carRentals registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register carRentals" });
    console.log(error);
  }
});

router.get("/getcarrentals", async (req, res) => {
  try {
    const carRentals = await CarRentals.find();
    return res.status(200).json(carRentals);
  } catch (error) {
    console.error("Error fetching CarRentals : ", error);
    return res.status(500).send("Error fetching CarRentals");
  }
});

router.delete("/deletecarrentals/:id", async (req, res) => {
  try {
    const rentalId = req.params.id;
    const deletedRental = await CarRentals.findByIdAndRemove(rentalId);

    if (!deletedRental) {
      return res.status(404).json({ massage: " Car rental not found" });
    } else {
      return res
        .status(200)
        .json({ massage: "Car rental deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting CarRentals : ", error);
    return res.status(500).send("Error deleting CarRentals");
  }
});

router.put("/updatecarrentals/:id", async (req, res) => {
  try {
    const rentalId = req.params.id;
    const updatedData = req.body;

    const updatedRental = await CarRentals.findByIdAndUpdate(
      rentalId,
      updatedData,
      { new: true }
    );

    if (!updatedRental) {
      return res.status(404).json({ massage: "Car rental not found" });
    } else {
      return res.status(200).json(updatedRental);
    }
  } catch (error) {
    console.error("Error updating CarRentals : ", error);
    return res.status(500).send("Error updating CarRentals");
  }
});
module.exports = router;
