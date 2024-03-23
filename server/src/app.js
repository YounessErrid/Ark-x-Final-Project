require("dotenv").config();
const express = require("express");
const connect = require("./config/db_config");

// routes
const clientRouter = require("./api/routes/client.routes")

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define tha Main function
async function main() {
  //connect to the database
  await connect();
  
  //put the routes here
  app.use('/api/clients', clientRouter);
  

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
