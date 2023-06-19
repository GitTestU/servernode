const mongoose = require('mongoose');


const ImageSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },

    modelYear: {
        type: String,
        required: true,
    },
    rentPrice: {
        type: String,
        required: true,
    },
})

const ImageModel = mongoose.model("imageModel", ImageSchema);

module.exports = ImageModel;
