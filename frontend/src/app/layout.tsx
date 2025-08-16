// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Penta Cab",
  description:
    "Experience premium taxi service with Penta Cab. Professional drivers, luxury vehicles, 24/7 availability. Book now for airport transfers, city rides, and outstation trips.",
  keywords: [
    "taxi service",
    "cab booking",
    "airport transfer",
    "luxury transportation",
    "reliable taxi",
    "24/7 cab service",
    "outstation taxi",
    "corporate transportation",
    "premium cab service",
  ],
  authors: [{ name: "Penta Cab" }],
  creator: "Penta Cab",
  publisher: "Penta Cab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pentacab.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Penta Cab",
    description:
      "Experience premium taxi service with Penta Cab. Professional drivers, luxury vehicles, 24/7 availability.",
    url: "https://pentacab.com",
    siteName: "Penta Cab",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Penta Cab - Premium Taxi Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Penta Cab",
    description:
      "Experience premium taxi service with Penta Cab. Professional drivers, luxury vehicles, 24/7 availability.",
    images: ["/og-image.jpg"],
    creator: "@pentacab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload Fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/poppins-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/c.jpg" type="image/jpeg" />

        {/* Theme colors */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />

        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              name: "Penta Cab",
              description:
                "Premium taxi service with professional drivers and luxury vehicles",
              url: "https://pentacab.com",
              telephone: "+91-7600839900",
              priceRange: "$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              serviceType: "Taxi Service",
              areaServed: {
                "@type": "Country",
                name: "India",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-penta-black text-penta-cream min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
