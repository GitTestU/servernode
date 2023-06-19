const Car = require("../models/Car");

const store = (req, res, next) => {
  let car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    modelYear: req.body.modelYear,
    rentPrice: req.body.rentPrice,
  });
  if(req.file){
    car.avatar = req.file.path
  }
  car
    .save()
    .then((response) => {
      res.json({ message: "succes" });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
};


module.exports = {
    store
}