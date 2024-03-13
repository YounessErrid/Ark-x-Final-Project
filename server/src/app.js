require("dotenv").config();
const express = require("express");
// const connect = require("./config/db_config");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define tha Main function
async function main() {
  //connect to the database
  // await connect();
  
  //put the routes here
  

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
