"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { theme } from "@/styles/theme";

interface SEOData {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string;
  metaTags: string;
 
}

interface SEOManagementProps {
  onAddSEO?: () => void;
  onEditSEO?: (seo: SEOData) => void;
}

const SEOManagement = forwardRef<any, SEOManagementProps>(
  ({ onAddSEO, onEditSEO }, ref) => {
    const [seoData, setSeoData] = useState<SEOData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

    useImperativeHandle(ref, () => ({
      fetchSEO: () => {
        fetchSEOData();
      },
    }));

    const fetchSEOData = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockData: SEOData[] = [
          {
            id: "1",
            page: "Home",
            title: "Penta Cab - Premium Taxi Services in India | Book Online",
            description: "Book reliable taxi services with Penta Cab. Airport transfers, local rides, and outstation trips across India. 24/7 customer support and competitive pricing.",
            keywords: "taxi booking, cab service, airport transfer, local rides, outstation trips, India taxi, online booking",
            metaTags: "taxi booking, cab service, reliable transport, online booking, 24/7 support",
            
          },
          {
            id: "2",
            page: "Routes",
            title: "Popular Taxi Routes | Penta Cab Intercity & Outstation Services",
            description: "Explore popular taxi routes with Penta Cab. Mumbai to Pune, Delhi to Agra, Bangalore to Mysore and more. Book your intercity journey with us.",
            keywords: "taxi routes, intercity travel, outstation routes, Mumbai Pune, Delhi Agra, Bangalore Mysore, popular routes",
            metaTags: "intercity travel, popular routes, outstation booking, city to city taxi",
             
          },
          {
            id: "3",
            page: "Blog",
            title: "Penta Cab Blog | Travel Tips, News & Updates",
            description: "Read our latest blog posts about travel tips, taxi booking guides, city information, and Penta Cab news. Stay updated with travel insights.",
            keywords: "travel blog, taxi tips, booking guide, travel news, city information, Penta Cab blog",
            metaTags: "travel blog, taxi tips, booking guide, travel insights, city guides",
            
          },
          {
            id: "4",
            page: "About Us",
            title: "About Penta Cab - Your Trusted Travel Partner Since 2010",
            description: "Learn about Penta Cab's journey, mission, and commitment to providing safe and comfortable taxi services. Meet our team and discover our values.",
            keywords: "about penta cab, taxi company, travel partner, company history, our team, mission vision",
            metaTags: "about us, company history, taxi service provider, our team, mission vision",
            
          },
          {
            id: "5",
            page: "Privacy Policy",
            title: "Privacy Policy | Penta Cab Data Protection & Security",
            description: "Read Penta Cab's privacy policy to understand how we collect, use, and protect your personal information. Your privacy is our priority.",
            keywords: "privacy policy, data protection, personal information, security, GDPR compliance, user privacy",
            metaTags: "privacy policy, data protection, user privacy, security, GDPR",
            
          },
          {
            id: "6",
            page: "Contact Us",
            title: "Contact Penta Cab - Customer Support & Booking Help",
            description: "Contact Penta Cab for bookings, support, or inquiries. We're here to help with your travel needs. Call, email, or visit our office.",
            keywords: "contact penta cab, customer support, booking help, customer service, phone number, email support",
            metaTags: "contact us, customer service, booking support, help center, customer care",
             
          },
        ];
        setSeoData(mockData);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchSEOData();
    }, []);

    const filteredData = seoData.filter((item) => {
      const matchesSearch = 
        item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "all";
      
      return matchesSearch && matchesStatus;
    });

    const handleStatusToggle = (id: string) => {
      setSeoData(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item }
            : item
        )
      );
    };

    const handleEdit = (seo: SEOData) => {
      onEditSEO?.(seo);
    };

    const handleDelete = (id: string) => {
      if (window.confirm("Are you sure you want to delete this SEO entry?")) {
        setSeoData(prev => prev.filter(item => item.id !== id));
      }
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Black Table */}
        <div className="bg-black rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                    Keywords
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-gray-700">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-900 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{item.page}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-xs truncate" title={item.title}>
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400 max-w-md truncate" title={item.description}>
                        {item.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400 max-w-xs truncate" title={item.keywords}>
                        {item.keywords}
                      </div>
                    </td>
 
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer">
                      <div className="flex space-x-2 cursor-pointer">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 cursor-pointer"
                          title="Edit SEO"
                        >
                          Edit
                        </button>                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No SEO entries found</div>
              <div className="text-gray-500 text-sm">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Click 'Add SEO Entry' to create your first SEO entry"
                }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

SEOManagement.displayName = "SEOManagement";

export default SEOManagement;
