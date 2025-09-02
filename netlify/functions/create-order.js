// functions/create-order.js
const Razorpay = require("razorpay");

exports.handler = async function(event) {
  try {
    const { amount, currency } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: amount, // already in paise
      currency: currency,
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
