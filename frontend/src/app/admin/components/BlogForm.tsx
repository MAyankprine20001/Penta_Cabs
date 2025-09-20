"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: "draft" | "published";
  tags: string[];
}

interface BlogFormProps {
  onBlogSaved: () => void;
}

const BlogForm = forwardRef<
  { openModal: (blog?: BlogPost) => void },
  BlogFormProps
>(({ onBlogSaved }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState<BlogPost>({
    title: "",
    content: "",
    excerpt: "",
    author: "Admin",
    status: "draft",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [contentHtml, setContentHtml] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    openModal: (blog?: BlogPost) => {
      if (blog) {
        setBlogData(blog);
        setContentHtml(blog.content);
      } else {
        setBlogData({
          title: "",
          content: "",
          excerpt: "",
          author: "Admin",
          status: "draft",
          tags: [],
        });
        setContentHtml("");
      }
      setIsOpen(true);
    },
  }));

  // Effect to set editor content when contentHtml changes
  useEffect(() => {
    if (editorRef.current && contentHtml !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = contentHtml;
    }
  }, [contentHtml]);

  const applyFormat = (format: string) => {
    if (!editorRef.current) return;

    // Focus the editor first
    editorRef.current.focus();

    // Save cursor position before formatting
    const savedPosition = saveCursorPosition();

    switch (format) {
      case "bold":
        document.execCommand("bold", false);
        break;
      case "italic":
        document.execCommand("italic", false);
        break;
      case "underline":
        document.execCommand("underline", false);
        break;
      case "h1":
        document.execCommand("formatBlock", false, "h1");
        break;
      case "h2":
        document.execCommand("formatBlock", false, "h2");
        break;
      case "h3":
        document.execCommand("formatBlock", false, "h3");
        break;
      case "normal":
        document.execCommand("formatBlock", false, "p");
        break;
      case "ul":
        document.execCommand("insertUnorderedList", false);
        break;
      case "ol":
        document.execCommand("insertOrderedList", false);
        break;
      case "link":
        const url = prompt("Enter URL:");
        if (url) {
          document.execCommand("createLink", false, url);
        }
        break;
      case "image":
        handleImageUpload();
        break;
      case "clear":
        document.execCommand("removeFormat", false);
        break;
      default:
        break;
    }

    // Update the content state
    updateContent();

    // Restore cursor position after formatting
    setTimeout(() => {
      if (format !== "image") {
        // Don't restore for image as it handles its own cursor
        restoreCursorPosition(savedPosition);
      }
    }, 10);
  };

  const updateContent = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      setContentHtml(htmlContent);
      setBlogData((prev) => ({ ...prev, content: htmlContent }));
    }
  };

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset,
      };
    }
    return null;
  };

  const restoreCursorPosition = (
    savedPosition: {
      startContainer: Node;
      startOffset: number;
      endContainer: Node;
      endOffset: number;
    } | null
  ) => {
    if (!savedPosition) return;

    try {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.setStart(savedPosition.startContainer, savedPosition.startOffset);
        range.setEnd(savedPosition.endContainer, savedPosition.endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } catch {
      // If restoration fails, just place cursor at end
      if (editorRef.current) {
        editorRef.current.focus();
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          if (editorRef.current) {
            // Get alt text for the image
            const altText =
              prompt("Enter alt text for the image (optional):") || "Image";

            // Create image element
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = altText;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.margin = "10px 0";
            img.style.borderRadius = "4px";

            // Insert image at cursor position
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              range.deleteContents();
              range.insertNode(img);

              // Add a line break after image for better editing
              const br = document.createElement("br");
              range.setStartAfter(img);
              range.insertNode(br);

              // Move cursor after the line break
              range.setStartAfter(br);
              range.setEndAfter(br);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            } else {
              editorRef.current.appendChild(img);
              // Add line break after image
              const br = document.createElement("br");
              editorRef.current.appendChild(br);

              // Focus and position cursor after the break
              editorRef.current.focus();
              const range = document.createRange();
              const sel = window.getSelection();
              range.setStartAfter(br);
              range.collapse(true);
              sel?.removeAllRanges();
              sel?.addRange(range);
            }

            // Update content
            updateContent();
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const file = imageFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (editorRef.current) {
          // Get alt text for the image
          const altText =
            prompt("Enter alt text for the image (optional):") || "Image";

          // Create image element
          const img = document.createElement("img");
          img.src = imageUrl;
          img.alt = altText;
          img.style.maxWidth = "100%";
          img.style.height = "auto";
          img.style.margin = "10px 0";
          img.style.borderRadius = "4px";

          // Insert image at drop position or at cursor
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(img);

            // Add a line break after image for better editing
            const br = document.createElement("br");
            range.setStartAfter(img);
            range.insertNode(br);

            // Move cursor after the line break
            range.setStartAfter(br);
            range.setEndAfter(br);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          } else {
            editorRef.current.appendChild(img);
            // Add line break after image
            const br = document.createElement("br");
            editorRef.current.appendChild(br);

            // Focus and position cursor after the break
            editorRef.current.focus();
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStartAfter(br);
            range.collapse(true);
            sel?.removeAllRanges();
            sel?.addRange(range);
          }

          // Update content
          updateContent();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof BlogPost, value: string) => {
    setBlogData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !blogData.tags.includes(tagInput.trim())) {
      setBlogData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!blogData.title.trim() || !blogData.content.trim()) {
      alert("Please fill in the title and content");
      return;
    }

    setLoading(true);

    try {
      const url = blogData.id
        ? `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
          }/blogs/${blogData.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/blogs`;

      const method = blogData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (result.success) {
        setIsOpen(false);
        onBlogSaved();
      } else {
        alert("Failed to save blog post: " + result.message);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setBlogData({
      title: "",
      content: "",
      excerpt: "",
      author: "Admin",
      status: "draft",
      tags: [],
    });
    setContentHtml("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <div className="bg-gray-800 shadow-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yellow-400">
            {blogData.id ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          {/* Form */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={blogData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                placeholder="Enter blog title"
              />
            </div>

            {/* Author and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={blogData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={blogData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={blogData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                placeholder="Brief description of the blog post"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Add a tag and press Enter"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
                {/* Modern Rich Text Editor Toolbar */}
                <div className="flex items-center gap-1 p-2 bg-gray-700 border-b border-gray-600 shadow-sm">
                  {/* Text Style Dropdown */}
                  <select
                    className="px-2 py-1 text-sm border border-gray-500 rounded bg-gray-800 text-white"
                    onChange={(e) => applyFormat(e.target.value)}
                  >
                    <option value="normal">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                  </select>

                  <div className="w-px h-6 bg-gray-500 mx-1"></div>

                  {/* Text Formatting Buttons */}
                  <button
                    type="button"
                    onClick={() => applyFormat("bold")}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Bold (Ctrl+B)"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormat("italic")}
                    className="w-8 h-8 flex items-center justify-center text-sm italic bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Italic (Ctrl+I)"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormat("underline")}
                    className="w-8 h-8 flex items-center justify-center text-sm underline bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Underline (Ctrl+U)"
                  >
                    U
                  </button>

                  <div className="w-px h-6 bg-gray-500 mx-1"></div>

                  {/* Link Button */}
                  <button
                    type="button"
                    onClick={() => applyFormat("link")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Insert Link"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-500 mx-1"></div>

                  {/* List Buttons */}
                  <button
                    type="button"
                    onClick={() => applyFormat("ul")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Bullet List"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormat("ol")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Numbered List"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-500 mx-1"></div>

                  {/* Image Upload Button */}
                  <button
                    type="button"
                    onClick={() => applyFormat("image")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Upload Image"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-500 mx-1"></div>

                  {/* Clear Formatting */}
                  <button
                    type="button"
                    onClick={() => applyFormat("clear")}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-gray-500 text-white rounded hover:bg-gray-600"
                    title="Clear Formatting"
                  >
                    <span className="text-xs font-mono">Tx</span>
                  </button>
                </div>

                {/* Text Editor */}
                <div
                  className={`relative ${
                    isDragOver ? "bg-blue-900 border-blue-500" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isDragOver && (
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
                      <div className="text-blue-300 text-lg font-medium">
                        Drop image here to upload
                      </div>
                    </div>
                  )}
                  <div
                    ref={editorRef}
                    id="content-editor"
                    contentEditable
                    onInput={updateContent}
                    onBlur={updateContent}
                    className="w-full h-[500px] p-8 resize-none focus:outline-none focus:ring-0 text-white leading-relaxed overflow-y-auto bg-gray-900"
                    style={{
                      minHeight: "500px",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "16px",
                      lineHeight: "1.7",
                      color: "#ffffff",
                    }}
                    data-placeholder="Start writing your blog post here... Use the toolbar above to format your text, add links, and upload images. You can also drag and drop images directly into this area."
                  />
                  <style jsx>{`
                    #content-editor:empty:before {
                      content: attr(data-placeholder);
                      color: #ffffff;
                      pointer-events: none;
                      opacity: 0.7;
                    }
                  `}</style>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-700 border-t border-gray-600 text-xs text-gray-300">
                  <div className="flex items-center gap-4">
                    <span>
                      Content Length:{" "}
                      {contentHtml.replace(/<[^>]*>/g, "").length} characters
                    </span>
                    <span>
                      Words:{" "}
                      {
                        contentHtml
                          .replace(/<[^>]*>/g, "")
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Last Saved: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 bg-gray-700 border-t border-gray-600">
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Live Preview:
                  </label>
                  <div
                    className="prose prose-sm max-w-none bg-gray-800 p-4 rounded border border-gray-600 text-white"
                    dangerouslySetInnerHTML={{
                      __html:
                        contentHtml ||
                        '<p class="text-white italic opacity-70">Start typing to see preview...</p>',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Saving..." : "Save Blog Post"}
          </button>
        </div>
      </div>
    </div>
  );
});

BlogForm.displayName = "BlogForm";

export default BlogForm;
