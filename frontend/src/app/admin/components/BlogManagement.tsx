"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  tags: string[];
  featuredImage?: string;
}

interface BlogManagementProps {
  onAddBlog: () => void;
  onEditBlog?: (blog: BlogPost) => void;
}

const BlogManagement = forwardRef<
  { fetchBlogs: () => void },
  BlogManagementProps
>(({ onAddBlog, onEditBlog }, ref) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 10;

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/blogs?status=${statusFilter}&search=${searchTerm}&page=${currentPage}&limit=${blogsPerPage}`
      );
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data || []);
        setTotalPages(data.totalPages || 1);
        setTotalBlogs(data.total || 0);
      } else {
        console.error("Failed to fetch blogs:", data.message);
        setBlogs([]);
        setTotalPages(1);
        setTotalBlogs(0);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
      setTotalPages(1);
      setTotalBlogs(0);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm, currentPage, blogsPerPage]);

  useImperativeHandle(ref, () => ({
    fetchBlogs: () => {
      fetchBlogs();
    },
  }));

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-gray-900 rounded-full">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  const handleEditBlog = (blogId: string) => {
    const blog = blogs.find((b) => b.id === blogId);
    if (blog && onEditBlog) {
      onEditBlog(blog);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
          }/blogs/${blogId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.success) {
          fetchBlogs(); // Refresh the list
        } else {
          alert("Failed to delete blog post");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Error deleting blog post");
      }
    }
  };

  const handleToggleStatus = async (blogId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "published" ? "draft" : "published";
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/blogs/${blogId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchBlogs(); // Refresh the list
      } else {
        alert("Failed to update blog status");
      }
    } catch (error) {
      console.error("Error updating blog status:", error);
      alert("Error updating blog status");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPublishedCount = () => {
    // Since we're using pagination, we'll get this from the API response
    // For now, we'll calculate from current blogs
    return blogs.filter((b) => b.status === "published").length;
  };

  const getDraftCount = () => {
    // Since we're using pagination, we'll get this from the API response
    // For now, we'll calculate from current blogs
    return blogs.filter((b) => b.status === "draft").length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-300">Blog Management</h2>
          <p className="text-gray-400">
            Create and manage blog posts and articles
          </p>
        </div>
        <button
          onClick={onAddBlog}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <span>+</span>
          Add New Blog Post
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search blogs by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "draft" | "published")
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            {totalBlogs} Total Blog Posts
          </span>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <span>Published: {getPublishedCount()}</span>
            <span>Draft: {getDraftCount()}</span>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p className="mt-2 text-gray-400">Loading blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No blog posts found.</p>
            <button
              onClick={onAddBlog}
              className="mt-2 text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Create your first blog post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Published Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {blog.excerpt}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBlog(blog.id)}
                          className="text-blue-400 hover:text-blue-300 bg-blue-900 hover:bg-blue-800 px-3 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleToggleStatus(blog.id, blog.status)
                          }
                          className={`px-3 py-1 rounded text-xs ${
                            blog.status === "published"
                              ? "text-orange-400 hover:text-orange-300 bg-orange-900 hover:bg-orange-800"
                              : "text-green-400 hover:text-green-300 bg-green-900 hover:bg-green-800"
                          }`}
                        >
                          {blog.status === "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-400 hover:text-red-300 bg-red-900 hover:bg-red-800 px-3 py-1 rounded text-xs"
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
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border border-gray-600 rounded-lg">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Showing{" "}
                <span className="font-medium">
                  {Math.min((currentPage - 1) * blogsPerPage + 1, totalBlogs)}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * blogsPerPage, totalBlogs)}
                </span>{" "}
                of <span className="font-medium">{totalBlogs}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pageNum === currentPage
                          ? "z-10 bg-yellow-500 border-yellow-500 text-gray-900"
                          : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

BlogManagement.displayName = "BlogManagement";

export default BlogManagement;
