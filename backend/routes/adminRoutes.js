const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();

const router = express.Router();

// Admin Registration
router.post("/register", async (req, res) => {
    const { adminId, email, password } = req.body;

    if (!adminId || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let admin = await Admin.findOne({ adminId });
        if (admin) return res.status(400).json({ message: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        admin = new Admin({ adminId, email, password: hashedPassword });

        await admin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin Login
router.post("/login", async (req, res) => {
    const { adminId, password } = req.body;

    try {
        const admin = await Admin.findOne({ adminId });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, admin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;