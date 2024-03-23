require("dotenv").config();
const express = require("express");
const agencyRouter = require('./api/routes/agency.routes');
// const connect = require("./config/db_config");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;
 
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define tha Main function
const main  = async () => {
  //connect to the database
  // await connect();
  
  //put the routes here
  app.use('/api/agency',agencyRouter );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

try {
  //run the main function
  main();

} catch (error) {
  console.log(error);
}
