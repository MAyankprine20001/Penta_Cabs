"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallIcons from "@/components/FloatingCallIcons";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingCallIcons />}
    </>
  );
}
