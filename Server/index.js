//import third party packages
const express = require("express");
const server = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectToDBAndStartServer = require("./utils/database");

server.use(cors({
  origin:"http:localhost:3001",
  methods:['GET' , 'POST' , 'PUT' , 'DELETE']
}));
server.use(express.json())
//routes files
const carRentalsRoute = require("./routes/carRentals");
const carRoute = require("./routes/car");
const authRoute = require("./routes/auth");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));

//middlewares
server.use("/carrentals", carRentalsRoute);
server.use("/auth", authRoute);
server.use("/car",carRoute);
connectToDBAndStartServer()
  .then(() => {
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
