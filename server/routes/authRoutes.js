import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// ✅ Seed Admin
router.post("/seed-admin", async (req, res) => {
  try {
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    });

    await admin.save();
    res.json({ message: "✅ Admin created" });
  } catch (err) {
    res.status(500).json({ error: "Error creating admin" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: { name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
