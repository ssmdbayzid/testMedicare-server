// controllers/webhookController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your actual Stripe secret key

const handleWebhook = async (req, res) => {
  const payload = req.body;

  try {
    const event = stripe.webhooks.constructEvent(payload, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET); // Replace with your actual webhook secret key

    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment intent
        // Your logic here
        break;
      case 'invoice.payment_failed':
        // Handle failed payment
        // Your logic here
        break;
      // Add more cases for different event types you want to handle
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = {
  handleWebhook,
};
