const express = require("express");
const router = express.Router();

const Car = require('../models/Car')

router.post("/postcar", async (req, res) => {
    try {
      // Create a new Car Rental
      const newCar = new Car(req.body);
  
      // Save the data to the database
      await newCar.save();
  
      return res.status(200).send("Car saved successfully");
    } catch (error) {
      console.error("Error saving Car:", error);
      return res.status(500).send("Error saving Car");
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
  
  router.delete("/deletecar/:id", async (req, res) => {
    try {
      const carId = req.params.id;
      const deletedCar = await Car.findByIdAndRemove(carId);
  
      if (!deletedCar) {
        return res.status(404).json({ massage: " Car rental not found" });
      } else {
        return res
          .status(200)
          .json({ massage: "Car deleted successfully" });
      }
    } catch (error) {
      console.error("Error deleting Car : ", error);
      return res.status(500).send("Error deleting Car");
    }
  });
  
  router.put('/updatecar/:id' , async(req , res) => {
    try {
      const carId = req.params.id;
      const updatedData = req.body
  
      const updatedCar = await Car.findByIdAndUpdate(carId, updatedData,{new: true});
  
      if(!updatedCar) {
        return res.status(404).json({massage : "Car not found"})
      }else{
        return res.status(200).json(updatedCar)
      }
    } catch (error) {
      console.error("Error updating Car : ", error);
      return res.status(500).send("Error updating Car");
    }
  })
  module.exports = router;
  