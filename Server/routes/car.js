const express = require("express");
const router = express.Router();
const Car = require("../models/Car");



router.post("/postcar", async (req, res) => {
  try {
    
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      modelYear: req.body.modelYear,
      rentPrice: req.body.rentPrice,
    });
    // Save the user to the database
    await car.save();
    res.status(201).json({ message: "carRentals registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register carRentals" });
    console.log(error);
  }
});

router.get("/getcar", async (req, res) => {
  try {
    const car = await Car.find();
    return res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching Car : ", error);
    return res.status(500).send("Error fetching Car");
  }
});

/*  router.get("/getcar/:id", async (req ,res) => {
    try {

    } catch (error) {
      console.error("Error fetching Car : ", error);
      return res.status(500).send("Error get car by İd")
    }
  }) */

router.delete("/deletecar/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndRemove(carId);

    if (!deletedCar) {
      return res.status(404).json({ massage: " Car rental not found" });
    } else {
      return res.status(200).json({ massage: "Car deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting Car : ", error);
    return res.status(500).send("Error deleting Car");
  }
});

router.put("/updatecar/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedData = req.body;

    const updatedCar = await Car.findByIdAndUpdate(carId, updatedData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ massage: "Car not found" });
    } else {
      return res.status(200).json(updatedCar);
    }
  } catch (error) {
    console.error("Error updating Car : ", error);
    return res.status(500).send("Error updating Car");
  }
});
module.exports = router;
