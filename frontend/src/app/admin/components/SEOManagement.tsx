"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { theme } from "@/styles/theme";
import { seoService, SEOData } from "@/services/seoService";
import { useAllSEOData } from "@/hooks/useSEOOptimized";

// Remove the duplicate interface as we're importing it from seoService

interface SEOManagementProps {
  onAddSEO?: () => void;
  onEditSEO?: (seo: SEOData) => void;
}

const SEOManagement = forwardRef<any, SEOManagementProps>(
  ({ onAddSEO, onEditSEO }, ref) => {
    const { seoData: contextSeoData, loading: contextLoading, refetch } = useAllSEOData();
    const [seoData, setSeoData] = useState<SEOData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

    useImperativeHandle(ref, () => ({
      fetchSEO: () => {
        refetch();
      },
    }));

    // Transform context data to component format
    useEffect(() => {
      if (contextSeoData && Array.isArray(contextSeoData)) {
        const transformedData = contextSeoData.map(item => ({
          id: item._id || item.id || '',
          _id: item._id || item.id || '',
          page: item.page,
          title: item.title,
          description: item.description,
          keywords: item.keywords,
          metaTags: item.metaTags,
          status: item.status || 'active',
          lastUpdated: item.lastUpdated || new Date().toISOString(),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
        setSeoData(transformedData);
      } else {
        setSeoData([]);
      }
    }, [contextSeoData]);

    const filteredData = seoData.filter((item) => {
      const matchesSearch = 
        item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "all";
      
      return matchesSearch && matchesStatus;
    });

    const handleStatusToggle = async (id: string) => {
      try {
        const response = await seoService.toggleSEOStatus(id);
        if (response.success) {
          // Refresh the data after successful toggle
          refetch();
        } else {
          alert("Error toggling SEO status: " + response.message);
        }
      } catch (error) {
        console.error("Error toggling SEO status:", error);
        alert("Error toggling SEO status. Please try again.");
      }
    };

    const handleEdit = (seo: SEOData) => {
      onEditSEO?.(seo);
    };

    const handleDelete = async (id: string) => {
      if (window.confirm("Are you sure you want to delete this SEO entry?")) {
        try {
          const response = await seoService.deleteSEOData(id);
          if (response.success) {
            // Refresh the data after successful deletion
            refetch();
          } else {
            alert("Error deleting SEO entry: " + response.message);
          }
        } catch (error) {
          console.error("Error deleting SEO entry:", error);
          alert("Error deleting SEO entry. Please try again.");
        }
      }
    };

    if (contextLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">SEO Management</h2>
            <p className="text-gray-400 mt-1">Manage SEO settings and meta tags for all pages</p>
          </div>
          <button
            onClick={onAddSEO}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add SEO Entry</span>
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search SEO entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

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
                    Status
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-200 px-2 py-1 rounded border border-yellow-400 text-xs"
                          title="Edit SEO"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleStatusToggle(item.id)}
                          className={`px-2 py-1 rounded text-xs transition-colors duration-200 ${
                            item.status === 'active'
                              ? 'text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white'
                              : 'text-green-400 border border-green-400 hover:bg-green-400 hover:text-white'
                          }`}
                          title={item.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {item.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-200 px-2 py-1 rounded border border-red-400 text-xs"
                          title="Delete SEO"
                        >
                          Delete
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
              <div className="text-gray-500 text-sm mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first SEO entry"
                }
              </div>
              {!searchTerm && filterStatus === "all" && (
                <button
                  onClick={onAddSEO}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add SEO Entry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

SEOManagement.displayName = "SEOManagement";

export default SEOManagement;
