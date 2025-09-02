// functions/create-order.js
const Razorpay = require("razorpay");

exports.handler = async function(event) {
  try {
    console.log("Event body:", event.body);  // <-- for debugging
    const { amount, currency } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret
    });

    const options = {
      amount,
      currency,
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    };
  } catch (err) {
    console.error("Error in create-order:", err);
    return { statusCode: 500, body: err.toString() };
  }
};
