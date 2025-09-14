const CreateRazorPayInstance = require("../config/razorPay.config");
const crypto = require("crypto");
require("dotenv").config();

const razorPayInstance = CreateRazorPayInstance();

exports.createOrder = async (req, res) => {
  const { amount, carId, packageID } = req.body; // Expecting amount in smallest currency unit (e.g., paise for INR)

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    razorPayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error creating order",
        });
      }
      return res.status(200).json({
        order,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  //creating hmac object
  const hmac = crypto.createHmac("sha256", secret);
  //passing the data to be hashed
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  //creating the hmac in the required format
 const generated_signature = hmac.digest("hex");
    //comparing our signature with the actual signature
    if (generated_signature === razorpay_signature) {
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature sent!" });
    }          
    
};
