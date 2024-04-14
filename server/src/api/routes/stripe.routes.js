require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const router = express.Router();

// const { createCustomer } = require("../../config/stripe");
// router.post("/create-customerv1", async (req, res) => {
//   if (!req.body) {
//     return res
//       .status(400)
//       .json("Customer creation failed: missing customer fields");
//   }
//   try {
//     const { email, description, paymentMethodId } = req.body;
//     const customer = await createCustomer({
//       email,
//       description,
//       paymentMethodId,
//     });
//     console.log("Customer created successfully:");
//     console.log(customer);
//     res.status(200).send(customer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("An error occurred while creating the customer.");
//   }
// });

// Define route to create a checkout session




router.post("/create-checkout-session", async (req, res) => {
  try {
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1P2yct06sb7pwrABc9MaEEFB", // Use the ID of the subscription price
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    // Send the session ID back to the client
    res.json({ sessionId: session.id, success_url: session.url });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
});

// Define route to handle webhook events

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    const rawBody = request.body; // Get the raw request body

    try {
      // Verify the signature using the raw request body
      const event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        endpointSecret
      );

      // Handle the event based on its type
      switch (event.type) {
        case "checkout.session.completed":
          // Handle checkout session completed event
          console.log("Checkout session completed:");
          console.log(event.data.object);
          break;
        // Add more cases for handling other event types as needed
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Respond with a 200 status code to acknowledge receipt of the event
      response.status(200).end();
    } catch (error) {
      // Log any errors during webhook processing
      console.error("Webhook Error:", error.message);

      // Respond with a 400 status code and the error message
      response.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);


module.exports = router;
