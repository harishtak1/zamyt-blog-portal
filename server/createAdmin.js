// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ MongoDB connected");

  const username = "admin";      // apna username
  const password = "admin123";   // apna password (change kar sakte ho)

  // Password hash
  const hashed = await bcrypt.hash(password, 10);

  // Check if already exists
  let user = await Admin.findOne({ username });
  if (user) {
    console.log("⚠️ Admin already exists");
  } else {
    user = new Admin({ username, password: hashed });
    await user.save();
    console.log("✅ Admin created successfully");
  }

  mongoose.disconnect();
})
.catch(err => console.error("❌ MongoDB error:", err));
