// Import necessary modules
require("dotenv").config(); // Load environment variables from .env file
const Stripe = require("stripe"); // Import the Stripe SDK
const Subscription = require("../models/subscription.model"); // Import the Subscription model
const Payment = require("../models/payment.model"); // Import the Payment model
const User = require("../models/user.model"); // Import the User model
const Agency = require("../models/agency.model"); // Import the User model
const Portfolio = require("../../api/models/portfolio.model");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

// console.log(endpointSecret);
const handleStripeEvents = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const rawBody = req.body;

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    switch (event.type) {
      // for checkout completion
      case "checkout.session.completed": {
        const {
          subscription: subscriptionId,
          customer_details,
          amount_total,
        } = event.data.object;

        try {
          if (subscriptionId) {
            const subscriptionDetails = await stripe.subscriptions.retrieve(
              subscriptionId
            );
            const { status, start_date, current_period_end } =
              subscriptionDetails;

            const user = await User.findOne({ email: customer_details.email });
            if (!user) {
              throw new Error("User not found");
            }

            const agency = await Agency.findOne({ userId: user._id });

            // create porfolio for agency
            const newPortfolio = new Portfolio({
              portfolioServices: []
            })
            const savedPortfolio = await newPortfolio.save()

            agency.hasAccess = true;
            agency.portfolioId = savedPortfolio._id;
            await agency.save();

            console.log("agency", agency);

            const newSubscription = new Subscription({
              agencyId: agency._id,
              activationDate: new Date(start_date * 1000),
              expirationDate: new Date(current_period_end * 1000),
              activated: status === "active",
            });
            const savedSubscription = await newSubscription.save();

            const newPayment = new Payment({
              subscriptionId: savedSubscription._id,
              date: new Date(start_date * 1000),
              amount: amount_total / 100,
            });
            await newPayment.save();


            

            agency.hasAccess = true;
            await agency.save();

          }
        } catch (error) {
          console.error("Error processing subscription event:", error);
        }
        break;
      }
      // for renewl
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;
        const subscriptionDetails = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        const user = await User.findOne({ email: invoice.customer_email });
        if (!user) {
          throw new Error("User not found");
        }

        const existingSubscription = await Subscription.findOne({
          userId: user._id,
        });
        if (existingSubscription) {
          existingSubscription.expirationDate = new Date(
            subscriptionDetails.current_period_end * 1000
          );
          await existingSubscription.save();

          const newPayment = new Payment({
            subscriptionId: existingSubscription._id,
            date: new Date(invoice.created * 1000),
            amount: invoice.amount_paid / 100,
          });
          await newPayment.save();
        }
        break;
      }

      case "payment_intent.payment_failed":
        console.log("Payment failed");
        break;

      //  for subscription deletion
      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        try {
          const updatedSubscription = await Subscription.findOneAndUpdate(
            { stripeSubscriptionId: subscription.id },
            { activated: false },
            { new: true }
          );
          console.log("Subscription cancelled:", updatedSubscription);
        } catch (error) {
          console.error("Error updating subscription status:", error);
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).end();
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

const getSubscription = async (req, res) => {
  try {
    // Get subscription ID from request parameters
    const subscriptionId = req.params.id;

    // Retrieve subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // If subscription is found, return it as JSON response
    if (subscription) {
      return res.status(200).json(subscription);
    } else {
      return res
        .status(404)
        .json({ error: "Subscription not found on stripe!" });
    }
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error retrieving subscription from Stripe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkout = async (req, res) => {
  try {
    console.log(req.body);
    const { priceId, email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Ensure this is the correct price ID from Stripe
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: "subscription",
      success_url: "http://localhost:5173/successful-payment", // Update with your success URL
      cancel_url: "http://localhost:5173/subscription", // Update with your cancel URL
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleStripeEvents,
  getSubscription,
  checkout,
};

// const handleStripeEvents = async (req, res) => {
//   // Extract signature and raw body from request headers and body
//   const sig = req.headers["stripe-signature"];
//   const rawBody = req.body;

//   try {
//     // Verify the signature using the raw request body
//     const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

//     // Handle the event based on its type
//     switch (event.type) {
//       case "checkout.session.completed":
//         // Handle checkout session completed event
//         console.log("Checkout session completed:");

//         console.log("$---------event.data.object: -----------$",event.data.object);
//         // Extract necessary data from the event
//         const { subscription, customer_details, amount_total } =
//           event.data.object;

//         try {
//           if (subscription) {
//             // Retrieve subscription details from Stripe
//             const { status, start_date, current_period_end } =
//               await stripe.subscriptions.retrieve(subscription);

//             // Find user ID based on email
//             const { _id: userId } = await User.findOne({
//               email: customer_details.email,
//             });

//             // Determine if subscription is activated
//             const activated = status === "active" ? true : false;

//             // Convert timestamp to date objects
//             const activationDate = new Date(start_date * 1000);
//             const expirationDate = new Date(current_period_end * 1000);

//             // Create new subscription document
//             const newSubscription = new Subscription({
//               activationDate,
//               expirationDate,
//               activated,
//               userId,
//             });
//             const data = await newSubscription.save();
//             console.log('price subs:', amount_total);

//             // Create new payment document
//             const newPayment = new Payment({
//               date: activationDate,
//               amount: amount_total/100,
//               subscriptionId: data._id,
//             });
//             const payData = await newPayment.save();
//           }
//         } catch (error) {
//           console.error("Error processing subscription event:", error);
//         }
//         break;
//       case "payment_intent.succeeded":
//         // Handle Payment success event
//         console.log("Payment succeeded");
//         break;
//       case "payment_intent.payment_failed":
//         // Handle payment failed event
//         console.log("Payment failed");
//         break;
//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     // Respond with a 200 status code to acknowledge receipt of the event
//     res.status(200).end();
//   } catch (error) {
//     // Log any errors during webhook processing
//     console.error("Webhook Error:", error.message);

//     // Respond with a 400 status code and the error message
//     res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };

// const checkout = async (req, res) => {
//   try {
//     // Create a checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1P2yct06sb7pwrABc9MaEEFB", // Use the ID of the subscription price
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: "https://example.com/success",
//       cancel_url: "https://example.com/cancel",
//     });

//     // Send the session ID and success URL as JSON response
//     res.json({ sessionId: session.id, success_url: session.url });
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ error: err.message });
//   }
// };

// require("dotenv").config();
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const Subscription = require('../models/subscription.model');
// const Payment = require('../models/payment.model');
// const User = require('../models/user.model');

// const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

// const handleStripeEvents = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const rawBody = req.body;

//   try {
//     // Verify the signature using the raw request body
//     const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
//     // Handle the event based on its type
//     switch (event.type) {
//       case "checkout.session.completed":
//         // Handle checkout session completed event
//         console.log("Checkout session completed:");
//         // console.log(event.data.object);

//          // Extract necessary data from the event
//          const { subscription, customer_details, amount_total } = event.data.object;

//          try {
//            if(subscription){
//             const {status, start_date, current_period_end } = await stripe.subscriptions.retrieve(subscription);
//             const {_id : userId} = await User.findOne({email:customer_details.email});

//             const activated = status === "active" ? true : false;
//             const activationDate = new Date(start_date * 1000);
//             const expirationDate = new Date(current_period_end * 1000);
//             const newSubscription = new Subscription({ activationDate , expirationDate, activated,  userId });
//             const data = await newSubscription.save();

//             const newPayment = new Payment({date : activationDate, amount : amount_total, subscriptionId : data._id});
//             const payData = await newPayment.save()

//           }
//         } catch (error) {

//         }

//         break;
//       case "payment_intent.succeeded":
//         // Handle Payment success event
//         console.log("payment succeeded");
//         break;
//       case "payment_intent.payment_failed":
//         // Handle checkout session completed event
//         console.log("payment payment failed:");
//         break;
//       // Add more cases for handling other event types as needed
//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     // Respond with a 200 status code to acknowledge receipt of the event
//     res.status(200).end();
//   } catch (error) {
//     // Log any errors during webhook processing
//     console.error("Webhook Error:", error.message);

//     // Respond with a 400 status code and the error message
//     res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };

// const getSubscription = async (req, res) => {
//   try {
//     const subscriptionId = req.params.id;
//     // Retrieve the subscription from Stripe using the subscription ID
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);
//     if (subscription) {
//       // Return the subscription data as a JSON response
//             return res.status(200).json(subscription);
//           } else {
//             return res.status(404).json({ error: "Subscription not found on stripe!" });
//           }
//   } catch (error) {
//     // If an error occurs, return an error response
//     console.error('Error retrieving subscription from Stripe:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const checkout = async (req, res) => {
//   try {
//     // Create a checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1P2yct06sb7pwrABc9MaEEFB", // Use the ID of the subscription price
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: "https://example.com/success",
//       cancel_url: "https://example.com/cancel",
//     });

//     // Send the session ID back to the subscription
//     res.json({ sessionId: session.id, success_url: session.url });
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {
//   handleStripeEvents,
//   getSubscription,
//   checkout,
// };
