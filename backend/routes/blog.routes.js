const express = require('express');
const router = express.Router();

// Blog data storage (in a real app, this would come from a database)
let blogs = [];

// Get all blogs with pagination
router.get('/blogs', (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    
    let filteredBlogs = [...blogs];
    
    // Filter by status
    if (status && status !== 'all') {
      filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
    }
    
    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Sort by creation date (newest first)
    filteredBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const total = filteredBlogs.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    // Get paginated data
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedBlogs,
      total,
      totalPages,
      currentPage: pageNum,
      limit: limitNum
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message
    });
  }
});

// Get single blog by ID
router.get('/blogs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const blog = blogs.find(b => b.id === id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message
    });
  }
});

// Create new blog
router.post('/blogs', (req, res) => {
  try {
    const { title, content, excerpt, author, status, tags } = req.body;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      author: author || 'Admin',
      status: status || 'draft',
      tags: tags || [],
      publishedAt: status === 'published' ? new Date().toISOString().split('T')[0] : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    blogs.push(newBlog);
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newBlog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message
    });
  }
});

// Update blog
router.put('/blogs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, author, status, tags } = req.body;
    
    const blogIndex = blogs.findIndex(b => b.id === id);
    
    if (blogIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Update blog
    const updatedBlog = {
      ...blogs[blogIndex],
      title: title || blogs[blogIndex].title,
      content: content || blogs[blogIndex].content,
      excerpt: excerpt || blogs[blogIndex].excerpt,
      author: author || blogs[blogIndex].author,
      status: status || blogs[blogIndex].status,
      tags: tags || blogs[blogIndex].tags,
      publishedAt: status === 'published' && blogs[blogIndex].status !== 'published' 
        ? new Date().toISOString().split('T')[0] 
        : blogs[blogIndex].publishedAt,
      updatedAt: new Date().toISOString()
    };
    
    blogs[blogIndex] = updatedBlog;
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message
    });
  }
});

// Delete blog
router.delete('/blogs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const blogIndex = blogs.findIndex(b => b.id === id);
    
    if (blogIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    blogs.splice(blogIndex, 1);
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message
    });
  }
});

// Toggle blog status (publish/unpublish)
router.patch('/blogs/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const blogIndex = blogs.findIndex(b => b.id === id);
    
    if (blogIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    const updatedBlog = {
      ...blogs[blogIndex],
      status: status,
      publishedAt: status === 'published' ? new Date().toISOString().split('T')[0] : blogs[blogIndex].publishedAt,
      updatedAt: new Date().toISOString()
    };
    
    blogs[blogIndex] = updatedBlog;
    
    res.json({
      success: true,
      message: `Blog post ${status === 'published' ? 'published' : 'unpublished'} successfully`,
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error toggling blog status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog status',
      error: error.message
    });
  }
});

module.exports = router;
