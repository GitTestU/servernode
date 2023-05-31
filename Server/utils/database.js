const mongoose = require('mongoose');
require('dotenv').config()
const connectionURL = process.env.DBCONNECT

const connectToDBAndStartServer = async () => {
    try {
        await mongoose.connect(connectionURL,{useNewUrlParser : true , useUnifiedTopology : true});
        console.log('connected to the DB succesfully');
    } catch (error) {
        console.log('Error connection to the DB' , error);
        throw error;
    }
}



module.exports = connectToDBAndStartServer;