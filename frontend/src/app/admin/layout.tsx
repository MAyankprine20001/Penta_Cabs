import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

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
  title: "Admin Dashboard - Penta Cab",
  description: "Admin dashboard for managing cab service data",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-penta-black text-penta-cream min-h-screen`}
    >
      {children}
    </div>
  );
} 