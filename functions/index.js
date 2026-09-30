const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");

setGlobalOptions({ maxInstances: 10 });

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

exports.createCheckoutSession = onRequest(
  {
    secrets: [stripeSecretKey],
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    try {
      const { uid, plan } = req.body;

      if (!uid) {
        return res.status(400).json({
          error: "User is not logged in.",
        });
      }

      if (!plan) {
        return res.status(400).json({
          error: "No plan selected.",
        });
      }

      const priceIds = {
        monthly: "price_1ULAk8Fl3llMp3zsZuV5mvh9",
        yearly: "price_1ULAjVFl3llMp3zsZdUlTejT",
      };

      const priceId = priceIds[plan];

      if (!priceId) {
        return res.status(400).json({
          error: "Invalid plan selected.",
        });
      }

      const stripe = Stripe(stripeSecretKey.value());

      const session = await stripe.checkout.sessions.create({
            mode: "subscription",

            managed_payments: {
            enabled: false,
        },

        line_items: [
            {
            price: priceId,
            quantity: 1,
            },
        ],

        subscription_data: {
            trial_period_days: plan === "yearly" ? 7 : undefined,
        },

        success_url:
            "http://localhost:3000/for-you?payment=success",

        cancel_url:
            "http://localhost:3000/choose-plan?payment=cancelled",

        client_reference_id: uid,
        });

      return res.status(200).json({
        url: session.url,
      });
    } catch (error) {
      console.error("Stripe checkout error:", error);

       return res.status(500).json({
    error: error.message,
    type: error.type || "unknown",
    code: error.code || "unknown",
  });
}
  }
);