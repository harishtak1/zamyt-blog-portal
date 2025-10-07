import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error("❌ Error fetching blog", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/blogs/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Blog updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error updating blog", err);
      alert("Failed to update blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #10002b, #240046, #3c096c)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 10px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "15px",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{
            background: "linear-gradient(90deg, #00eaff, #b366ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✏️ Edit Blog
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3 text-white"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Blog Title"
            required
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid #00eaff",
              color: "white",
            }}
          />
          <input
            className="form-control mb-3 text-white"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short Description"
            required
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid #00eaff",
              color: "white",
            }}
          />
          <textarea
            className="form-control mb-3 text-white"
            name="content"
            rows="5"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content..."
            required
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid #00eaff",
              color: "white",
            }}
          ></textarea>
          <input
            className="form-control mb-4 text-white"
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author Name"
            required
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid #00eaff",
              color: "white",
            }}
          />
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn fw-bold px-4"
              onClick={() => navigate("/admin")}
              style={{
                background: "#ff4d4d",
                border: "none",
                color: "white",
              }}
            >
              ← Cancel
            </button>
            <button
              type="submit"
              className="btn fw-bold px-4"
              style={{
                background: "linear-gradient(90deg, #00eaff, #b366ff)",
                border: "none",
                color: "#000",
              }}
              disabled={loading}
            >
              {loading ? "Updating..." : "💾 Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
