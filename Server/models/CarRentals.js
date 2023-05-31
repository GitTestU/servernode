const mongoose = require('mongoose')

const carRentalsSchema = new mongoose.Schema({
    companyName : {
        type : String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber : {
        type: Number,
        required: true,
        unique: true
    },
    serviceArea : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const CarRentals = mongoose.model('CarRentals',carRentalsSchema)

module.exports = CarRentals;