require("dotenv").config();
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const connect = require("./config/db_config");

// routes
const clientRouter = require("./api/routes/client.routes")
const agencyRouter = require("./api/routes/agency.routes")
const adminRouter = require("./api/routes/admin.routes")
const subscriptionRouter = require("./api/routes/subscription.routes")
const stripeRouter = require("./api/routes/stripe.routes")

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
          httpOnly: true // Ensures that the cookie is only accessible via HTTP(S) and not JavaScript
          // Other cookie options...
        }
      })
);

require('./config/auth/user.passport-config');

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
// Define tha Main function
async function main() {
  //connect to the database
  await connect();
  
  //put the routes here
  app.use('/api/clients', clientRouter);
  app.use('/api/agencies', agencyRouter);
  app.use('/api/admins', adminRouter);
  app.use('/api/subscriptions', subscriptionRouter);
  app.use('/api/stripe', stripeRouter);
  

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
