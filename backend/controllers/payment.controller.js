const CreateRazorPayInstance = require("../config/razorPay.config");
const crypto = require("crypto");
require("dotenv").config();

const razorPayInstance = CreateRazorPayInstance();

// controller

exports.createOrder = async (req, res) => {
  try {
    let { price, booking, selectedPayment } = req.body;

    if (price == null || isNaN(Number(price))) {
      return res.status(400).json({ success: false, message: "Invalid price" });
    }

    const amountInPaise = Math.round(Number(price) * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      // Razorpay will persist these; great for ops/reconciliation
      notes: {
        selectedPayment: selectedPayment ?? "",
        // keep it short; avoid dumping huge strings
        serviceType: booking?.serviceType ?? "",
        tripType: booking?.tripType ?? "",
        city: booking?.city ?? "",
        date: booking?.date ?? "",
        time: booking?.time ?? booking?.pickupTime ?? "",
        car: booking?.selectedCabName ?? booking?.car ?? "",
        name: booking?.name ?? "",
        mobile: booking?.mobile ?? "",
      },
    };

    razorPayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Razorpay order error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error creating order" });
      }

      return res.status(200).json({
        success: true,
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      });
    });
  } catch (error) {
    console.error("createOrder exception:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: razorpay_order_id, razorpay_payment_id, razorpay_signature",
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "Server misconfigured: RAZORPAY_KEY_SECRET not set",
      });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    // (optional) timing-safe compare when lengths match
    const ok =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(razorpay_signature, "hex")
      );

    if (ok) {
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid signature sent!" });
  } catch (err) {
    console.error("verifyPayment error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Verification error" });
  }
};
