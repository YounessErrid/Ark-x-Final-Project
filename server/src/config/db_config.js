const mongoose = require('mongoose');
require('dotenv').config()

//import DB url from .env file
const DB_URL = process.env.URL_MONGODB_SERVER_ATLAS
// const DB_URL = process.env.URL_MONGODB_SERVER_LOCAL

// Connect to the MongoDB instance
const connect = async () => {
    try {
      await mongoose.connect(DB_URL);
      console.log("Connected to the database Successfully");
    } catch (error) {
      console.log('Error connecting to the database:',error);
    }
  };

module.exports = connect