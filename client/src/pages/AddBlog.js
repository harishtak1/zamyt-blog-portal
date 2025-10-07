import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });
  const [image, setImage] = useState(null);

  // ✅ Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("author", form.author);
      if (image) formData.append("image", image);

      await api.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Blog added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error adding blog:", err.message);
      alert("Error adding blog");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          className="form-control mb-2"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <textarea
          className="form-control mb-2"
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          rows="5"
          required
        />
        <input
          className="form-control mb-2"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          className="form-control mb-2"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="btn btn-success" type="submit">
          ➕ Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
