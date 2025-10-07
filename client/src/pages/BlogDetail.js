import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("❌ Error fetching blog:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 text-light"
        style={{
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        }}
      >
        <h4>⏳ Loading blog...</h4>
      </div>
    );

  if (!blog)
    return (
      <div
        className="text-center text-light vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        }}
      >
        <h4>⚠️ Blog not found!</h4>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        padding: "40px 20px",
      }}
    >
      <div
        className="container p-4 shadow-lg"
        style={{
          maxWidth: "800px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "15px",
        }}
      >
        <h1 className="fw-bold text-info mb-3 text-center">{blog.title}</h1>

        <p className="text-muted text-center mb-4">
          ✍️ {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog.image && (
          <div className="text-center mb-4">
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid rounded shadow"
              style={{
                maxHeight: "400px",
                width: "100%",
                objectFit: "cover",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            />
          </div>
        )}

        <h5 className="text-light fw-semibold mb-3">{blog.description}</h5>

        <div
          className="blog-content text-light"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            textAlign: "justify",
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "inset 0 0 10px rgba(255,255,255,0.1)",
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
}

export default BlogDetail;
