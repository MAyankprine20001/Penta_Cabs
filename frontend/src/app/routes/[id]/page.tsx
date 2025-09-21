"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsCarFront, BsClock } from "react-icons/bs";
import {
  FaArrowLeft,
  FaShare,
  FaTag,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

interface Route {
  id: string;
  routeName: string;
  from: string;
  to: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  status: "active" | "inactive";
  tags: string[];
  lastBooking: string;
  createdAt: string;
}

interface RoutePageProps {
  params: {
    id: string;
  };
}

export default function RouteDetailPage({ params }: RoutePageProps) {
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRoute();
  }, [params.id]);

  const fetchRoute = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/routes/${
          params.id
        }`
      );
      const data = await response.json();
      if (data.success) {
        setRoute(data.data);
      } else {
        setError("Route not found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      setError("Failed to load route");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && route) {
      try {
        await navigator.share({
          title: route.routeName,
          text: `Check out this route: ${route.from} to ${route.to}`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Function to scroll to booking widget
  const scrollToBookingWidget = () => {
    setTimeout(() => {
      const bookingSection = document.getElementById("booking-widget");
      if (bookingSection) {
        bookingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Handle call button click
  const handleCallClick = () => {
    window.location.href = "tel:+917600839900";
  };

  // Handle WhatsApp button click
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi, I need information about cab booking for the route: ${route?.from} to ${route?.to}.`
    );
    window.open(`https://wa.me/917600839900?text=${message}`, "_blank");
  };

  // Handle booking button click
  const handleBookNowClick = () => {
    // If not on homepage, navigate first
    if (window.location.pathname !== "/") {
      window.location.href = "/";
      setTimeout(() => {
        scrollToBookingWidget();
      }, 500);
    } else {
      // If already on homepage, just scroll
      scrollToBookingWidget();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-300">Loading route details...</p>
        </div>
      </div>
    );
  }

  if (error || !route) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Route Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            {error || "The route you're looking for doesn't exist."}
          </p>
          <Link
            href="/popular_route_info"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Routes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/popular_route_info"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Routes
          </Link>
        </div>
      </div>

      {/* Route Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {route.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-full"
              >
                <FaTag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {route.routeName}
          </h1>

          {/* Route Info */}
          <div className="flex items-center gap-4 mb-8 text-gray-300">
            <div className="flex items-center gap-2">
              <BsCarFront className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-medium">
                {route.from} → {route.to}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {(() => {
            const imgMatch = route.description.match(
              /<img[^>]+src="([^"]+)"[^>]*>/i
            );
            const imageUrl = imgMatch ? imgMatch[1] : null;

            return (
              imageUrl && (
                <div className="mb-8">
                  <img
                    src={imageUrl}
                    alt={route.routeName}
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )
            );
          })()}

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <BsClock className="w-4 h-4" />
                <span>Last booking: {formatDate(route.lastBooking)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                  {route.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaShare className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Route Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-xl p-8 md:p-12 overflow-hidden">
            <div
              className="prose prose-lg prose-invert max-w-none text-white overflow-hidden
                 prose-headings:text-white
                 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
                 prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:text-yellow-400
                 prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:text-yellow-400
                 prose-p:text-white prose-p:mb-6 prose-p:leading-relaxed prose-p:break-words
                 prose-strong:text-white prose-strong:font-semibold
                 prose-em:text-white
                 prose-a:text-yellow-500 prose-a:no-underline hover:prose-a:text-yellow-400 prose-a:break-words
                 prose-ul:text-white prose-ol:text-white
                 prose-li:text-white prose-li:mb-2 prose-li:break-words
                 prose-blockquote:border-l-yellow-500 prose-blockquote:bg-gray-800 prose-blockquote:text-white prose-blockquote:p-6 prose-blockquote:rounded-lg prose-blockquote:break-words
                 prose-code:text-yellow-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:break-all
                 prose-pre:bg-gray-800 prose-pre:text-white prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto
                 prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto prose-img:max-w-full prose-img:h-auto
                 prose-hr:border-gray-700
                 [&>*]:break-words [&>*]:overflow-wrap-anywhere"
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto",
                maxWidth: "100%",
              }}
              dangerouslySetInnerHTML={{
                __html: route.description
                  // Remove the first image from content since we're showing it as featured image
                  .replace(/<img[^>]+src="([^"]+)"[^>]*>/i, "")
                  // Enhance remaining images with better styling
                  .replace(
                    /<img([^>]*)>/gi,
                    '<img$1 class="rounded-lg shadow-lg my-6 mx-auto max-w-full h-auto">'
                  ),
              }}
            />
          </div>
        </div>
      </article>

      {/* Booking Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Book This Route?
            </h2>
            <p className="text-gray-400 mb-8">
              Get the best rates and reliable service for your journey from{" "}
              {route.from} to {route.to}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookNowClick}
                className="px-8 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={handleCallClick}
                className="px-8 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500 hover:text-black transition-colors"
              >
                <FaPhone className="w-4 h-4 inline mr-2" />
                Call: +91 760 083 9900
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="px-8 py-3 border border-green-500 text-green-500 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 inline mr-2" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Routes Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            Explore More Routes
          </h2>
          <div className="text-center">
            <Link
              href="/popular_route_info"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              View All Routes
              <FaArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready for Your Journey?
          </h2>
          <p className="text-black/80 text-lg mb-8">
            Book your ride with Penta CAB and experience comfortable, reliable
            transportation.
          </p>
          <button
            onClick={handleBookNowClick}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Book Now
            <FaArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
