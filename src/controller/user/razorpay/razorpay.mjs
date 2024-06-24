import { razorpayInstance } from "../../../utils/razorpay.mjs";

export const user_razorpay = async (req, res) => {
  try {
    const amount = Number(req.body.amount)

    console.log(amount,'wht is happening');
    const currency = "INR";
    const receipt = "ORD_1234567890"; // Example receipt ID
    const notes = { description: "New order", customer: "John Doe" };
    const order = await razorpayInstance.orders.create({ amount, currency,receipt,notes });
    
    console.log(order, "order is showing");
    res.json(order)
  } catch (error) {
    console.log(error, "USER RAZORPAY GET");
  }
};
