import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (authorFilter !== "All") {
      filtered = filtered.filter(
        (blog) => blog.author.toLowerCase() === authorFilter.toLowerCase()
      );
    }
    setFilteredBlogs(filtered);
  }, [searchTerm, authorFilter, blogs]);

  const uniqueAuthors = ["All", ...new Set(blogs.map((b) => b.author))];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1a1a40 0%, #2e1460 50%, #ff006e 100%)",
        color: "white",
        padding: "50px 20px",
      }}
    >
      <div className="container">
        {/* 🔹 Header */}
        <div className="text-center mb-5">
          <h1
            className="fw-bold mb-2"
            style={{
              background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚀 Explore Inspiring Blogs
          </h1>
          <p className="text-light" style={{ fontSize: "1.1rem" }}>
            Read, Learn, and Stay Ahead of the Curve ✨
          </p>
        </div>

        {/* 🔍 Search + Filter */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="col-md-3 mb-3">
            <select
              className="form-control"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "10px",
              }}
            >
              {uniqueAuthors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🧠 Blog Cards */}
        {loading ? (
          <div className="text-center text-light py-5">
            <h5>⏳ Loading blogs...</h5>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-light-50">No blogs found!</p>
        ) : (
          <div className="row">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="col-md-4 mb-4">
                <div
                  className="card h-100 shadow-lg border-0"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                    backdropFilter: "blur(12px)",
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                    />
                  )}
                  <div className="card-body text-light">
                    <h5
                      className="fw-bold"
                      style={{
                        color: "#00ffff",
                      }}
                    >
                      {blog.title}
                    </h5>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.5",
                        color: "#d0d0d0",
                      }}
                    >
                      {blog.description.length > 100
                        ? blog.description.slice(0, 100) + "..."
                        : blog.description}
                    </p>
                  </div>
                  <div className="card-footer border-0 bg-transparent text-center">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="btn"
                      style={{
                        border: "1px solid #00ffff",
                        color: "#00ffff",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#00ffff";
                        e.target.style.color = "#0f2027";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#00ffff";
                      }}
                    >
                      Read More →
                    </Link>
                    <p
                      className="mt-2"
                      style={{
                        fontSize: "0.85rem",
                        color: "#cccccc",
                      }}
                    >
                      ✍️ {blog.author} •{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
