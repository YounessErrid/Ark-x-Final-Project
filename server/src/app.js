require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const connect = require("./config/db_config");
const bodyParser = require("body-parser");
const path = require('path');

// routes
const authRouter = require("./api/routes/auth.routes");
const clientRouter = require("./api/routes/client.routes");
const agencyRouter = require("./api/routes/agency.routes");
const adminRouter = require("./api/routes/admin.routes");
const subscriptionRouter = require("./api/routes/subscription.routes");
const stripeRouter = require("./api/routes/stripe.routes");
const paymentRouter = require("./api/routes/payment.routes");
const serviceRouter = require("./api/routes/services.routes");
const portfolioServiceRouter = require("./api/routes/portfolioservices.routes");
const portfolioRouter = require("./api/routes/portfolio.routes");
const statisticsRouter = require("./api/routes/statistics.routes");
const userRouter = require("./api/routes/user.routes");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;



const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, // This allows cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed request methods
  allowedHeaders: ["Content-Type", "Authorization", 'x-frontend-host'], // Specify allowed headers
};
require("./config/auth/user.passport-config");

// Define tha Main function
const main = async () => {
  //connect to the database
  await connect();

  const app = express();
  const PORT = process.env.SERVER_PORT || 3001;

  app.use(cors(corsOptions));

  // Configure session management
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_KEY_SESSION,
      resave: false, 
      saveUninitialized: true, 
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, 
        secure: false, 
        httpOnly: true, 
      },
    })
  );

  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());

  // stripe webhook
  app.use("/api/webhook/stripe", stripeRouter);

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  // Input the routes here
  app.use("/api", stripeRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/clients", clientRouter);
  app.use("/api/agencies", agencyRouter);
  app.use("/api/admins", adminRouter);
  app.use("/api/subscriptions", subscriptionRouter);
  app.use("/api/payments", paymentRouter);
  app.use("/api/portfolioServices", portfolioServiceRouter);
  app.use("/api/services", serviceRouter);
  app.use("/api/portfolio", portfolioRouter);
  app.use("/api/statistics", statisticsRouter);
  app.use("/api/user", userRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

try {
  // Run the main function
  main();
} catch (error) {
  console.log(error);
}
