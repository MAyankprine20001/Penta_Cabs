/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/cab-booking/page.jsx
"use client";
import React, { useState, useEffect, Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import {
  sendAirportEmail,
  sendLocalEmail,
  sendIntercityEmail,
  prepareEmailData,
  createBookingRequest,
  prepareBookingRequestData,
} from "@/services/emailService";
import axios from "axios";
import { on } from "events";

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

// Move the main logic to a child component
const CabBookingContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("0");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessingEmail, setIsProcessingEmail] = useState(false);

  // Parse URL parameters for booking and cab data
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<Record<string, string>>({});

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const onPayment = async () => {
    try {
      // ---- HARD PRICE ----
      // Option A: use the selected advance amount:
      const amountRupees = getSelectedAmount();

      // Option B: hardcode a price (uncomment next line and comment the line above)
      // const amountRupees = 1;

      if (amountRupees < 0 || Number.isNaN(amountRupees)) {
        alert("Invalid amount selected");
        return;
      }

      // build payload including your booking object
      const createOrderPayload = {
        price: amountRupees, // rupees; backend converts to paise
        selectedPayment, // keep context if needed
        booking: bookingData, // <-- your full booking object
      };

      const { data: order } = await axios.post(
        "http://localhost:5000/api/create-order",
        createOrderPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!order?.success || !order?.id) {
        console.error("Order creation failed:", order);
        alert("Order creation failed");
        return;
      }

      const rzp = new (window as any).Razorpay({
        key: "rzp_test_RHDNpy93TPh9mv",
        order_id: order.id,
        amount: order.amount, // derived from order
        currency: order.currency, // derived from order
        name: "Your App",
        description: "Cab Booking Advance",
        // Optional but nice: show who’s paying
        prefill: {
          name: bookingData.name || "",
          email: bookingData.email || "",
          contact: bookingData.mobile || "",
        },
        // Optional metadata visible in Razorpay dashboard
        notes: {
          serviceType: bookingData.serviceType || "",
          tripType: bookingData.tripType || "",
          route:
            bookingData.from && bookingData.to
              ? `${bookingData.from} -> ${bookingData.to}`
              : bookingData.route || "",
          date: bookingData.date || "",
          time: bookingData.time || bookingData.pickupTime || "",
          selectedCab: bookingData.selectedCabName || bookingData.car || "",
        },
        handler: async (response: any) => {
          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const { data } = await axios.post(
              "http://localhost:5000/api/verify-payment",
              payload,
              { headers: { "Content-Type": "application/json" } }
            );

            if (data?.success) {
              // ✅ Reuse your existing email flow
              await handlePaymentSuccess();
            } else {
              alert("Payment verification failed");
            }
          } catch (e) {
            console.error("Verification request failed:", e);
            alert("Verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Checkout closed");
          },
        },
        // theme: { color: "#F37254" },
      });

      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Could not start payment");
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

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

  console.log("Parsed booking data:", bookingData);

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

  const handlePayment = async () => {
    setIsProcessingEmail(true);
    try {
      // Create booking request first
      if (bookingData.serviceType) {
        const bookingRequestData = prepareBookingRequestData(
          bookingData,
          {
            name: bookingData.name || "",
            mobile: bookingData.mobile || "",
            email: bookingData.email || "",
            pickup: bookingData.pickup || "",
            drop: bookingData.drop || "",
            remark: bookingData.remark || "",
            whatsapp: bookingData.whatsapp === "true",
            gstDetails: bookingData.gstDetails === "true",
            gst: bookingData.gst || "",
          },
          bookingData.serviceType as "AIRPORT" | "LOCAL" | "OUTSTATION",
          selectedPayment
        );

        console.log("Creating booking request:", bookingRequestData);

        // Create the booking request
        const bookingResponse = await createBookingRequest(bookingRequestData);
        console.log("Booking request created:", bookingResponse);

        // Send email based on service type
        const emailData = prepareEmailData(
          bookingData,
          {
            name: bookingData.name || "",
            mobile: bookingData.mobile || "",
            email: bookingData.email || "",
            pickup: bookingData.pickup || "",
            drop: bookingData.drop || "",
            remark: bookingData.remark || "",
            whatsapp: bookingData.whatsapp === "true",
            gstDetails: bookingData.gstDetails === "true",
            gst: bookingData.gst || "",
          },
          bookingData.serviceType as "AIRPORT" | "LOCAL" | "OUTSTATION"
        );

        console.log("Prepared email data:", emailData);

        // Send email based on service type
        let emailResponse;
        switch (bookingData.serviceType) {
          case "AIRPORT":
            emailResponse = await sendAirportEmail(emailData);
            break;
          case "LOCAL":
            emailResponse = await sendLocalEmail(emailData);
            break;
          case "OUTSTATION":
            emailResponse = await sendIntercityEmail(emailData);
            break;
          default:
            console.warn(
              `Unsupported service type: ${bookingData.serviceType}`
            );
        }

        if (emailResponse) {
          console.log("Email sent successfully:", emailResponse);
        }
      }

      // Proceed with payment logic
      if (selectedPayment === "0") {
        // For cash payment, show success message
        alert(
          "Booking request submitted successfully! Our team will review and confirm your booking. You can pay cash to the driver upon confirmation."
        );
        console.log("Cash payment selected - booking request created");
      } else {
        // For advance payments, open payment gateway
        await onPayment();
      }
    } catch (error) {
      console.error("Error creating booking request or sending email:", error);
      // Still proceed with payment even if booking request fails
      if (selectedPayment === "0") {
        alert(
          "There was an issue with the booking request. Please try again or contact support."
        );
        console.log("Error occurred during booking request creation");
      } else {
        await onPayment();
      }
    } finally {
      setIsProcessingEmail(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentSuccess(true);

    try {
      // Send email again after successful payment to ensure confirmation
      if (bookingData.serviceType) {
        const emailData = prepareEmailData(
          bookingData,
          {
            name: bookingData.name || "",
            mobile: bookingData.mobile || "",
            email: bookingData.email || "",
            pickup: bookingData.pickup || "",
            drop: bookingData.drop || "",
            remark: bookingData.remark || "",
            whatsapp: bookingData.whatsapp === "true",
            gstDetails: bookingData.gstDetails === "true",
            gst: bookingData.gst || "",
          },
          bookingData.serviceType as "AIRPORT" | "LOCAL" | "OUTSTATION"
        );

        // Send email based on service type
        let emailResponse;
        switch (bookingData.serviceType) {
          case "AIRPORT":
            emailResponse = await sendAirportEmail(emailData);
            break;
          case "LOCAL":
            emailResponse = await sendLocalEmail(emailData);
            break;
          case "OUTSTATION":
            emailResponse = await sendIntercityEmail(emailData);
            break;
        }

        if (emailResponse) {
          console.log("Confirmation email sent successfully:", emailResponse);
        }
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }

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
                disabled={!acceptTerms || isProcessingEmail}
                className={`w-full font-bold py-4 rounded-xl text-lg transition-all duration-500 transform relative overflow-hidden group ${
                  !acceptTerms || isProcessingEmail
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                style={{
                  background:
                    acceptTerms && !isProcessingEmail
                      ? theme.gradients.gold
                      : theme.colors.text.muted,
                  color: theme.colors.primary.black,
                  fontWeight: theme.typography.fontWeight.bold,
                  boxShadow:
                    acceptTerms && !isProcessingEmail
                      ? `0 20px 60px ${theme.colors.shadow.gold}`
                      : "none",
                  border:
                    acceptTerms && !isProcessingEmail
                      ? `2px solid ${theme.colors.accent.lightGold}`
                      : "none",
                }}
              >
                {/* Button glow effect */}
                {acceptTerms && !isProcessingEmail && (
                  <div
                    className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: theme.gradients.gold,
                      transform: "scale(1.2)",
                    }}
                  />
                )}
                <span className="relative z-10">
                  {isProcessingEmail ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      SENDING EMAIL...
                    </div>
                  ) : selectedPayment === "0" ? (
                    "Confirm Booking"
                  ) : (
                    `Proceed To Payment ₹${getSelectedAmount()}`
                  )}
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
