"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  tags: string[];
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/blogs?status=published&limit=20`
      );
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data || []);
        // Extract unique tags
        const tags = [
          ...new Set(data.data?.flatMap((blog: BlogPost) => blog.tags) || []),
        ];
        setAllTags(tags);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-300">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Penta CAB
              <span className="block text-yellow-500">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover travel tips, destination guides, and the latest updates
              from Penta CAB. Your journey starts with knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === ""
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-xl mb-4">
                No blog posts found
              </div>
              <p className="text-gray-500">
                {searchTerm || selectedTag
                  ? "Try adjusting your search or filter criteria"
                  : "Check back soon for new content!"}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Latest Articles
                </h2>
                <p className="text-gray-400">
                  {filteredBlogs.length} article
                  {filteredBlogs.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                  >
                    {/* Blog Featured Image */}
                    {(() => {
                      // Extract first image from blog content
                      const imgMatch = blog.content.match(
                        /<img[^>]+src="([^"]+)"[^>]*>/i
                      );
                      const imageUrl = imgMatch ? imgMatch[1] : null;

                      return imageUrl ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling.style.display =
                                "flex";
                              e.currentTarget.nextElementSibling.classList.add(
                                "flex"
                              );
                              e.currentTarget.nextElementSibling.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                          <div className="h-48 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 items-center justify-center hidden">
                            <div className="text-center text-gray-400">
                              <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                              </div>
                              <p className="text-sm">Blog Post</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">📝</span>
                            </div>
                            <p className="text-sm">Blog Post</p>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-700 text-gray-400 text-xs font-medium rounded-full">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FaUser className="w-3 h-3" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="w-3 h-3" />
                            <span>{formatDate(blog.publishedAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Link
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-medium transition-colors group"
                      >
                        Read More
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-black/80 text-lg mb-8">
            Book your ride with Penta CAB and experience comfortable, reliable
            transportation.
          </p>
          <Link
            href="/#booking-widget"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Book Now
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
