// functions/create-order.js
const Razorpay = require("razorpay");

exports.handler = async function(event) {
  try {
    const { amount, currency } = JSON.parse(event.body || "{}");
    if (!amount || !currency) throw new Error("Amount or currency missing");

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: amount,
      currency: currency,
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    };
  } catch (err) {
    console.error("Error in create-order:", err); // log for Netlify
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
