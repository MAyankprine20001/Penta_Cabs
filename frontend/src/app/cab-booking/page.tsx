// src/app/cab-booking/page.jsx
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Theme configuration (matching cab-lists)
const theme = {
  colors: {
    primary: {
      black: "#000000",
      darkGray: "#1a1a1a",
    },
    accent: {
      gold: "#FFD700",
      lightGold: "#FFF700",
      cyan: "#00BCD4",
    },
    secondary: {
      amber: "#FFA500",
      warmYellow: "#FFB84D",
      lightAmber: "#FFCC80",
      teal: "#20B2AA",
      darkTeal: "#008B8B",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E5E5E5",
      muted: "#B0B0B0",
    },
    background: {
      primary: "#000000",
      dark: "#0a0a0a",
      gradient:
        "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
      lightGray: "#F5F5F5",
    },
    border: {
      gold: "#FFD700",
      goldLight: "#FFF700",
      light: "rgba(255, 255, 255, 0.1)",
      cyan: "#00BCD4",
    },
    shadow: {
      gold: "rgba(255, 215, 0, 0.4)",
      primary: "rgba(0, 0, 0, 0.8)",
      elevated: "rgba(0, 0, 0, 0.6)",
      cyan: "rgba(0, 188, 212, 0.3)",
    },
  },
  gradients: {
    heroGradient:
      "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)",
    gold: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    cardGradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    cyan: "linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    fontWeight: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

// Payment Gateway Modal Component
const PaymentGatewayModal = ({ isOpen, onClose, amount, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      if (paymentMethod === "upi") {
        setShowQR(true);
        // Simulate payment processing
        setTimeout(() => {
          setIsProcessing(false);
          setShowQR(false);
          onPaymentSuccess();
          onClose();
        }, 3000);
      } else {
        // Handle other payment methods (card, net banking)
        setTimeout(() => {
          setIsProcessing(false);
          onPaymentSuccess();
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: theme.typography.fontFamily.sans.join(", ") }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-gray-800">makemyride</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Payment Content */}
        <div className="p-4">
          {showQR ? (
            // QR Code Display
            <div className="text-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-medium">Show QR Code</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Scan with any UPI app
              </p>

              {/* QR Code Placeholder */}
              <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div
                    className="w-24 h-24 bg-black mx-auto mb-2"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23000'%3E%3Crect x='0' y='0' width='10' height='10'/%3E%3Crect x='20' y='0' width='10' height='10'/%3E%3Crect x='0' y='20' width='10' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <p className="text-xs text-gray-500">QR Code</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Checking payment status... 14:03
              </p>
              <div className="w-12 h-1 bg-blue-500 rounded-full mx-auto animate-pulse"></div>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
                <span>🏪</span>
                <span>💳</span>
                <span>₹</span>
                <span>and more</span>
              </div>
            </div>
          ) : (
            // Payment Method Selection
            <>
              <div className="space-y-4 mb-6">
                {/* UPI ID Option */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      {paymentMethod === "upi" && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">UPI ID</p>
                      <p className="text-sm text-gray-600">
                        PhonePe, Gpay, PayTM, BHIM & more
                      </p>
                    </div>
                  </div>
                </div>

                {/* Debit/Credit Card Option */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      {paymentMethod === "card" && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Debit/Credit Card</p>
                      <p className="text-sm text-gray-600">
                        Visa, MasterCard, Rupay etc
                      </p>
                    </div>
                  </div>
                </div>

                {/* Net Banking Option */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 ${
                    paymentMethod === "netbanking"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("netbanking")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      {paymentMethod === "netbanking" && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Net Banking</p>
                      <p className="text-sm text-gray-600">
                        Choose your bank to complete payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount and Pay Button */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">
                    ₹{amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">View Booking</span>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isProcessing ? "Processing..." : "PAY"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center p-4 border-t text-sm text-gray-600">
          <span>Powered by</span>
          <span className="ml-1 font-semibold text-purple-600">📱 PhonePe</span>
        </div>
      </div>
    </div>
  );
};

// Move the main logic to a child component
const CabBookingContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("0");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Parse URL parameters for booking and cab data
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const data: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      data[key] = value;
    });
    setBookingData(data);
  }, [searchParams]);

  // Calculate dynamic payment options based on booking data
  const getPaymentOptions = () => {
    const totalFare = parseInt(bookingData.selectedCabPrice || "0");
    const twentyPercent = Math.round(totalFare * 0.2);

    return [
      {
        id: "0",
        title: "₹ 0",
        subtitle: "Payment",
        description: "Pay Cash to driver",
        amount: 0,
      },
      {
        id: "20",
        title: "20%",
        subtitle: "Advance",
        description: `Pay Adv ₹ ${twentyPercent.toLocaleString()}`,
        amount: twentyPercent,
      },
      {
        id: "100",
        title: "100%",
        subtitle: "Advance",
        description: `Pay Adv ₹ ${totalFare.toLocaleString()}`,
        amount: totalFare,
      },
    ];
  };

  const paymentOptions = getPaymentOptions();

  // Recalculate payment options when booking data changes
  useEffect(() => {
    // This will trigger a re-render with updated payment options
  }, [bookingData.selectedCabPrice]);

  const handlePayment = () => {
    if (selectedPayment === "0") {
      // For cash payment, just show success message
      alert("Booking confirmed! You can pay cash to the driver.");
      console.log("Cash payment selected");
    } else {
      // For advance payments, open payment gateway
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    alert(
      `Payment of ₹${
        paymentOptions.find((opt) => opt.id === selectedPayment)?.amount
      } successful! Booking confirmed.`
    );
  };

  const getSelectedAmount = () => {
    const selected = paymentOptions.find((opt) => opt.id === selectedPayment);
    return selected ? selected.amount : 0;
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: theme.gradients.heroGradient,
        fontFamily: theme.typography.fontFamily.sans.join(", "),
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 70%, #000000 100%)`,
          }}
        />

        {/* Animated background particles */}
        <div
          className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full blur-2xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
            opacity: 0.1,
            animationDuration: "3s",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-32 h-32 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.amber,
            opacity: 0.08,
            animationDelay: "1.5s",
            animationDuration: "4s",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div
          className={`text-center mb-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h1
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{
              color: theme.colors.accent.gold,
              textShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            Get Your Booking Confirmation Id
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Payment Selection */}
          <div
            className={`${
              isVisible ? "animate-fade-in-up animate-delay-300" : "opacity-0"
            }`}
          >
            {/* Select Payment Card */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: theme.gradients.cardGradient,
                border: `2px solid ${theme.colors.accent.gold}`,
                boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}, 0 0 0 1px ${theme.colors.accent.gold}30`,
              }}
            >
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{
                  color: theme.colors.accent.gold,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Select Payment
              </h2>

              {/* Total Fare */}
              <div
                className="flex justify-between items-center mb-6 pb-4 border-b"
                style={{ borderColor: theme.colors.border.light }}
              >
                <div>
                  <span
                    className="text-lg font-semibold"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Total Fare:
                  </span>
                  <div
                    className="text-xs"
                    style={{ color: theme.colors.accent.gold }}
                  >
                    (Coupon Code Applied :-)
                  </div>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: theme.colors.accent.gold,
                    textShadow: `0 2px 10px ${theme.colors.shadow.gold}`,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  ₹{" "}
                  {parseInt(
                    bookingData.selectedCabPrice || "0"
                  ).toLocaleString()}
                </span>
              </div>

              {/* Payment Success Indicator */}
              {paymentSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 border border-green-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-green-800 font-medium">
                      Payment Successful!
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Options */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {paymentOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedPayment === option.id ? "ring-2" : ""
                    }`}
                    style={{
                      background:
                        selectedPayment === option.id
                          ? `linear-gradient(135deg, ${theme.colors.primary.darkGray} 0%, ${theme.colors.primary.black} 100%)`
                          : theme.colors.primary.darkGray,
                      border:
                        selectedPayment === option.id
                          ? `2px solid ${theme.colors.accent.gold}`
                          : `1px solid ${theme.colors.border.light}`,
                    }}
                    onClick={() => setSelectedPayment(option.id)}
                  >
                    {/* Radio button indicator */}
                    <div className="flex items-center mb-3">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor:
                            selectedPayment === option.id
                              ? theme.colors.accent.gold
                              : theme.colors.border.light,
                        }}
                      >
                        {selectedPayment === option.id && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: theme.colors.accent.gold }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <div
                        className="text-xl font-bold mb-1"
                        style={{
                          color:
                            selectedPayment === option.id
                              ? theme.colors.accent.gold
                              : theme.colors.text.primary,
                        }}
                      >
                        {option.title}
                      </div>
                      <div
                        className="text-sm font-medium mb-2"
                        style={{
                          color:
                            selectedPayment === option.id
                              ? theme.colors.accent.gold
                              : theme.colors.text.secondary,
                        }}
                      >
                        {option.subtitle}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: theme.colors.text.muted }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded"
                  style={{ accentColor: theme.colors.accent.gold }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.text.secondary }}
                >
                  I Agree all{" "}
                  <span
                    className="underline cursor-pointer"
                    style={{ color: theme.colors.accent.gold }}
                  >
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span
                    className="underline cursor-pointer"
                    style={{ color: theme.colors.accent.gold }}
                  >
                    Refund Policy
                  </span>
                  .
                </label>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={!acceptTerms}
                className={`w-full font-bold py-4 rounded-xl text-lg transition-all duration-500 transform relative overflow-hidden group ${
                  !acceptTerms
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                style={{
                  background: acceptTerms
                    ? theme.gradients.gold
                    : theme.colors.text.muted,
                  color: theme.colors.primary.black,
                  fontWeight: theme.typography.fontWeight.bold,
                  boxShadow: acceptTerms
                    ? `0 20px 60px ${theme.colors.shadow.gold}`
                    : "none",
                  border: acceptTerms
                    ? `2px solid ${theme.colors.accent.lightGold}`
                    : "none",
                }}
              >
                {/* Button glow effect */}
                {acceptTerms && (
                  <div
                    className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: theme.gradients.gold,
                      transform: "scale(1.2)",
                    }}
                  />
                )}
                <span className="relative z-10">
                  {selectedPayment === "0"
                    ? "Confirm Booking"
                    : `Proceed To Payment ₹${getSelectedAmount()}`}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Traveller Information */}
          <div
            className={`${
              isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"
            }`}
          >
            <div
              className="rounded-2xl p-6"
              style={{
                background: theme.gradients.cardGradient,
                border: `2px solid ${theme.colors.accent.gold}`,
                boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}, 0 0 0 1px ${theme.colors.accent.gold}30`,
              }}
            >
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{
                  color: theme.colors.accent.gold,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Traveller Information
              </h2>

              <div className="space-y-4">
                {[
                  { label: "Name :", value: bookingData.name },
                  { label: "Email :", value: bookingData.email },
                  { label: "Mobile :", value: bookingData.mobile },
                  { label: "Service Type :", value: bookingData.serviceType },
                  { label: "Trip Type :", value: bookingData.tripType },
                  {
                    label: "Route :",
                    value:
                      bookingData.from && bookingData.to
                        ? `${bookingData.from} >> ${bookingData.to}`
                        : bookingData.route,
                  },
                  { label: "Km :", value: bookingData.estimatedDistance },
                  { label: "Date :", value: bookingData.date },
                  {
                    label: "Time :",
                    value: bookingData.time || bookingData.pickupTime,
                  },
                  {
                    label: "Car :",
                    value: bookingData.selectedCabName
                      ? `${bookingData.selectedCabName} or Similar`
                      : bookingData.car,
                  },
                  {
                    label: "Pickup Address :",
                    value: bookingData.pickup || bookingData.dropAddress,
                  },
                  {
                    label: "Drop Address :",
                    value: bookingData.drop || bookingData.to,
                  },
                  { label: "Remark :", value: bookingData.remark },
                  {
                    label: "WhatsApp :",
                    value: bookingData.whatsapp === "true" ? "Yes" : "No",
                  },
                  {
                    label: "GST Details :",
                    value: bookingData.gstDetails === "true" ? "Yes" : "No",
                  },
                ]
                  .filter((item) => item.value)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-4"
                    >
                      <span
                        className="font-medium text-sm min-w-fit"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-semibold text-sm text-right"
                        style={{ color: theme.colors.text.primary }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={getSelectedAmount()}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background: theme.gradients.gold,
        }}
      />

      {/* Debug Info (Remove in production) */}
      {process.env.NODE_ENV === "development" && bookingData && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white mb-2">Debug - Received Booking Data:</h3>
          <pre className="text-green-400 text-xs overflow-auto">
            {JSON.stringify(bookingData, null, 2)}
          </pre>
        </div>
      )}

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-delay-300 {
          animation-delay: 300ms;
        }

        .animate-delay-600 {
          animation-delay: 600ms;
        }

        input:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

// Loading fallback for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <div
        className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
        style={{ borderColor: theme.colors.accent.gold }}
      ></div>
      <p style={{ color: theme.colors.text.primary }}>
        Loading booking details...
      </p>
    </div>
  </div>
);

// Main export with Suspense
const CabBookingPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CabBookingContent />
    </Suspense>
  );
};

export default CabBookingPage;
