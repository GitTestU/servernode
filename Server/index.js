//import third party packages
const express = require("express");
const server = express();
const path = require("path");
const Car = require("./models/Car");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectToDBAndStartServer = require("./utils/database");
const mongoose = require("mongoose");
const multer = require("multer");
const ImageModel = require("../Server/models/imageModel");
const Post = require("./models/imageDetails");
server.use(cors());
server.use(express.json());
//routes files
const carRentalsRoute = require("./routes/carRentals");
const carRoute = require("./routes/car");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const User = require("./models/User");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));

//middlewares
server.use(cookieParser());
server.use("/carrentals", carRentalsRoute);
server.use("/auth", authRoute);
server.use("/car", carRoute);

server.post("/upload-image", async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Post.create(body);
    newImage.save();
    res.status(201).json({ msg: "New image uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

server.post("/user", async (req, res) => {
  try {
    const user = new User({
      brand: req.body.brand,
      model: req.body.model,
      modelYear: req.body.modelYear,
      rentPrice: req.body.rentPrice,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "carRentals registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register car" });
    console.log(error);
  }
});

server.get('/getUser', async(req,res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching Car : ", error);
    return res.status(500).send("Error fetching Car");
  }
})

server.get("/get-image", async (req, res) => {
  try {
    await Post.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve images" });
  }
});

server.post("/postcar", async (req, res) => {
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

connectToDBAndStartServer()
  .then(() => {
    server.post("/upload", (req, res) => {
      const newImage = new ImageModel({
        brand: req.body.brand,
        model: req.body.model,
        modelYear: req.body.modelYear,
        rentPrice: req.body.rentPrice,
      });
      newImage
        .save()
        .then(() => res.send("succes upload"))
        .catch((err) => {
          console.log(err);
        });
    });
    // listen express server
    const port = process.env.PORT;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error", error);
    process.exit(1);
  });
