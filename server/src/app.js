require("dotenv").config();
const express = require("express");
// const connect = require("./config/db_config");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const connect = require("./config/db_config");
const bodyParser = require("body-parser");

// routes
const servicesRouter = require("./api/routes/services.routes");
const portfolioservice = require("./api/routes/portfolioservices.routes");
const portfolioRouter = require("./api/routes/portfolio.routes");
const clientRouter = require("./api/routes/client.routes");
const agencyRouter = require("./api/routes/agency.routes");
const adminRouter = require("./api/routes/admin.routes");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Configure session management
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY_SESSION, // Secret key used to sign the session ID cookie
    resave: false, // Whether to save the session for every request, even if it hasn't changed
    saveUninitialized: true, // Whether to save uninitialized sessions (new but not modified)
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
      secure: false, // Set to true if your app is served over HTTPS
      httpOnly: true, // Ensures that the cookie is only accessible via HTTP(S) and not JavaScript
      // Other cookie options...
    },
  })
);

require("./config/auth/user.passport-config");

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
// Define tha Main function
const main = async () => {
  //connect to the database
  await connect();

  //put the routes here
  app.use("/api/clients", clientRouter);
  app.use("/api/agencies", agencyRouter);
  app.use("/api/admins", adminRouter);
  app.use("/api/portfolioService", portfolioservice);
  app.use("/api/services",servicesRouter);
  app.use("/api/portfolio",portfolioRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

try {
  //run the main function
  main();
} catch (error) {
  console.log(error);
}
