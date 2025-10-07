import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("add");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("author", form.author);
      if (form.image) formData.append("image", form.image);

      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Blog added successfully!");
      setForm({
        title: "",
        description: "",
        content: "",
        author: "",
        image: null,
      });
      fetchBlogs();
      setActiveTab("blogs");
    } catch (error) {
      console.error("Error adding blog", error);
      alert("❌ Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Blog deleted!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog", error);
      alert("❌ Failed to delete blog");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #10002b, #240046, #3c096c)",
        color: "white",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          padding: "30px 20px",
          borderRight: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h3
          className="fw-bold mb-4 text-center"
          style={{
            background: "linear-gradient(90deg, #00eaff, #b366ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ⚙️ ZAMYT Admin
        </h3>

        <ul className="list-unstyled">
          <li
            className={`mb-3 p-2 rounded ${
              activeTab === "add"
                ? "bg-info text-dark fw-bold"
                : "text-light opacity-75"
            }`}
            onClick={() => setActiveTab("add")}
            style={{
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            ➕ Add Blog
          </li>
          <li
            className={`mb-3 p-2 rounded ${
              activeTab === "blogs"
                ? "bg-info text-dark fw-bold"
                : "text-light opacity-75"
            }`}
            onClick={() => setActiveTab("blogs")}
            style={{
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            📰 All Blogs
          </li>
          <li
            className="mt-5 p-2 rounded text-danger"
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              background: "rgba(255,0,0,0.1)",
            }}
          >
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5">
        {activeTab === "add" && (
          <div
            className="p-4 rounded shadow-lg"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h4
              className="mb-4 fw-bold"
              style={{
                background: "linear-gradient(90deg, #00eaff, #b366ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              📝 Create New Blog
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "1px solid #00eaff",
                      color: "white",
                    }}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={form.author}
                    onChange={handleChange}
                    className="form-control text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "1px solid #00eaff",
                      color: "white",
                    }}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="description"
                    placeholder="Short Description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "1px solid #00eaff",
                      color: "white",
                    }}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="content"
                    placeholder="Write your blog content..."
                    value={form.content}
                    onChange={handleChange}
                    className="form-control text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "1px solid #00eaff",
                      color: "white",
                    }}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="form-control text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "1px solid #00eaff",
                      color: "white",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn mt-4 px-4 fw-bold"
                style={{
                  background: "linear-gradient(90deg, #00eaff, #b366ff)",
                  border: "none",
                  color: "#000",
                }}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </form>
          </div>
        )}

        {/* Blog List */}
        {activeTab === "blogs" && (
          <div>
            <h3
              className="fw-bold mb-4 text-center"
              style={{
                background: "linear-gradient(90deg, #00eaff, #b366ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              📚 All Blogs
            </h3>
            <div className="row">
              {blogs.length === 0 ? (
                <p className="text-center text-light">No blogs found!</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog._id} className="col-md-4 mb-4">
                    <div
                      className="card border-0 shadow-lg h-100"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        borderRadius: "12px",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="card-img-top"
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                          }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title text-info fw-bold">
                          {blog.title}
                        </h5>
                        <p className="card-text text-light small">
                          {blog.description}
                        </p>
                        <small className="text-muted">
                          ✍️ {blog.author} •{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </small>
                        <div className="d-flex justify-content-between mt-3">
                          <button
                            className="btn btn-sm fw-bold"
                            style={{
                              background: "#ffc107",
                              border: "none",
                              color: "#000",
                            }}
                            onClick={() => handleEdit(blog._id)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-sm fw-bold"
                            style={{
                              background: "#ff4d4d",
                              border: "none",
                              color: "#fff",
                            }}
                            onClick={() => handleDelete(blog._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
