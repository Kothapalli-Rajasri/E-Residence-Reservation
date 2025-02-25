const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
require("dotenv").config();

const router = express.Router();

// Student Registration
router.post("/register", async (req, res) => {
    console.log("Received Data:", req.body);
    const { 
        studentId, name, branch, phoneNumber, 
        motherName, fatherName, motherPhoneNumber, 
        fatherPhoneNumber, yearOfStudy, gender, password 
    } = req.body;

    if (!studentId || !name || !branch || !phoneNumber || !motherName || !fatherName || !motherPhoneNumber || !fatherPhoneNumber || !yearOfStudy || !gender || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let student = await Student.findOne({ studentId });
        if (student) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        student = new Student({ 
            studentId, name, branch, phoneNumber, 
            motherName, fatherName, motherPhoneNumber, 
            fatherPhoneNumber, yearOfStudy, gender, 
            password: hashedPassword 
        });

        await student.save();
        console.log("Saved Student:", student);
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Student Login
router.post("/login", async (req, res) => {
    console.log(req.body);
    const { studentId, password } = req.body;

    try {
        const student = await Student.findOne({ studentId });
        if (!student) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, student });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
