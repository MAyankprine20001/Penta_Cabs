"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { theme } from "@/styles/theme";
import { seoService, SEOData } from "@/services/seoService";
import { getAvailableSEOPages, getPageNameFromRoute } from "@/utils/pageMapping";

// Remove the duplicate interface as we're importing it from seoService

interface SEOFormProps {
  onSEOSaved?: () => void;
}

const SEOForm = forwardRef<any, SEOFormProps>(({ onSEOSaved }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSEO, setEditingSEO] = useState<SEOData | null>(null);
  const [formData, setFormData] = useState({
    page: "",
    title: "",
    description: "",
    keywords: "",
    metaTags: "",
    status: "active" as "active" | "inactive",
  });
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (seo?: SEOData) => {
      if (seo) {
        setEditingSEO(seo);
        setFormData({
          page: seo.page,
          title: seo.title,
          description: seo.description,
          keywords: seo.keywords,
          metaTags: seo.metaTags,
          status: seo.status,
        });
      } else {
        setEditingSEO(null);
        setFormData({
          page: "",
          title: "",
          description: "",
          keywords: "",
          metaTags: "",
          status: "active",
        });
      }
      setIsOpen(true);
    },
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      
      if (editingSEO) {
        // Update existing SEO data
        const updateData = {
          page: formData.page,
          title: formData.title,
          description: formData.description,
          keywords: formData.keywords,
          metaTags: formData.metaTags,
          status: formData.status,
        };
        
        response = await seoService.updateSEOData(editingSEO._id || '', updateData);
      } else {
        // Create new SEO data
        const createData = {
          page: formData.page,
          title: formData.title,
          description: formData.description,
          keywords: formData.keywords,
          metaTags: formData.metaTags,
          status: formData.status,
        };
        
        response = await seoService.createSEOData(createData);
      }
      
      if (response.success) {
        console.log("SEO Data saved successfully:", response.data);
        
        // Reset form
        setFormData({
          page: "",
          title: "",
          description: "",
          keywords: "",
          metaTags: "",
          status: "active",
        });
        
        setIsOpen(false);
        onSEOSaved?.();
      } else {
        alert("Error saving SEO data: " + response.message);
      }
    } catch (error) {
      console.error("Error saving SEO data:", error);
      alert("Error saving SEO data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingSEO(null);
    setFormData({
      page: "",
      title: "",
      description: "",
      keywords: "",
      metaTags: "",
      status: "active",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-yellow-400">
              {editingSEO ? "Edit SEO Entry" : "Add New SEO Entry"}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Page Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Page Name *
              </label>
              <input
                type="text"
                name="page"
                value={formData.page}
                onChange={handleInputChange}
                required
                list="page-suggestions"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., home, about us, contact penta, blog, routes"
              />
              <datalist id="page-suggestions">
                {getAvailableSEOPages().map((pageName) => (
                  <option key={pageName} value={pageName} />
                ))}
              </datalist>
              <p className="text-xs text-gray-500 mt-1">
                Available pages: {getAvailableSEOPages().join(', ')}
              </p>
            </div>        
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="e.g., Penta Cab - Premium Taxi Services in India"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 50-60 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Meta Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              placeholder="Brief description of the page content..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 150-160 characters ({formData.description.length}/160)
            </p>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Keywords *
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="e.g., taxi, cab, airport transfer, local rides"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate keywords with commas
            </p>
          </div>

          {/* Meta Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Meta Tags *
            </label>
            <input
              type="text"
              name="metaTags"
              value={formData.metaTags}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="e.g., taxi booking, cab service, reliable transport"
            />
            <p className="text-xs text-gray-500 mt-1">
              Additional meta tags for SEO
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Preview */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Preview</h4>
            <div className="space-y-2">
              <div className="text-blue-400 text-lg font-medium">
                {formData.title || "Page Title"}
              </div>
              <div className="text-green-600 text-sm">
                https://pentacab.com/{formData.page?.toLowerCase().replace(/\s+/g, '-') || 'page'}
              </div>
              <div className="text-gray-300 text-sm">
                {formData.description || "Page description will appear here..."}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Saving..." : editingSEO ? "Update SEO" : "Save SEO"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

SEOForm.displayName = "SEOForm";

export default SEOForm;
