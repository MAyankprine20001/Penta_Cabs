"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaShare,
  FaBookmark,
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

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogPost();
  }, [params.id]);

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/blogs/${
          params.id
        }`
      );
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
      } else {
        setError("Blog post not found");
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setError("Failed to load blog post");
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
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-300">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
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
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Featured Image */}
          {(() => {
            const imgMatch = blog.content.match(
              /<img[^>]+src="([^"]+)"[^>]*>/i
            );
            const imageUrl = imgMatch ? imgMatch[1] : null;

            return (
              imageUrl && (
                <div className="mb-8">
                  <img
                    src={imageUrl}
                    alt={blog.title}
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
                <FaUser className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{formatDate(blog.publishedAt)}</span>
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
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                <FaBookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
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
                __html: blog.content
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

      {/* Author Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">
                  {blog.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  About {blog.author}
                </h3>
                <p className="text-gray-400">
                  Travel enthusiast and Penta CAB team member sharing insights
                  about transportation and travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            More from Penta CAB Blog
          </h2>
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              View All Posts
              <FaArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-black/80 text-lg mb-8">
            Experience the same reliability and comfort we write about in our
            blog.
          </p>
          <Link
            href="/#booking-widget"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Book Now
            <FaArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
