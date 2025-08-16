"use client";

import React from "react";
import UserIntercityRide from "@/components/UserIntercityRide";
import UserOutstationRide from "@/components/UserOutstationRide";
import UserLocalRide from "@/components/UserLocalRide";

const TestBookingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Test Booking Components
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Intercity Booking */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Intercity Booking
            </h2>
            <UserIntercityRide />
          </div>

          {/* Outstation Booking */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Outstation Booking
            </h2>
            <UserOutstationRide />
          </div>

          {/* Local Booking */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Local Booking
            </h2>
            <UserLocalRide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBookingPage;
