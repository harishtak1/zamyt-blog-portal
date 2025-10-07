import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Blog from "../models/Blog.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const router = express.Router();

// 🔹 Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "blogs",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// ✅ Create blog (Admin only)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description, content, author } = req.body;

    const newBlog = new Blog({
      title,
      description,
      content,
      author,
      image: req.file ? req.file.path : null,
    });

    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update blog
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description, content, author } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content,
        author,
        image: req.file ? req.file.path : undefined,
      },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete blog
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
