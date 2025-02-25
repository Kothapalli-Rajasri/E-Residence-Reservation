// Backend: bookingRoutes.js (Fixed Version)
const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Student = require("../models/Student");

const router = express.Router();

// Student requests a bed booking
router.post("/book", async (req, res) => {
    const { studentId, hostelName, roomNumber, bedNumber } = req.body;

    if (!studentId || !hostelName || !roomNumber || !bedNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const existingBooking = await Booking.findOne({
            studentId: student._id,
            status: { $in: ["pending", "approved"] },
        });
        
        if (existingBooking) {
            return res.status(400).json({ message: "You have already booked a bed!" });
        }

        const newBooking = new Booking({
            studentId: student._id,
            studentName: student.name,
            hostelName,
            roomNumber,
            bedNumber,
            status: "pending",
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking request submitted successfully", booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch all pending bookings for a specific hostel and room
router.get("/pending/:hostelName/:roomNumber", async (req, res) => {
    try {
        const { hostelName, roomNumber } = req.params;
        const pendingBookings = await Booking.find({ hostelName, roomNumber, status: "pending" });
        res.json(pendingBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch all approved bookings for a specific hostel and room
router.get("/approved/:hostelName/:roomNumber", async (req, res) => {
    try {
        const { hostelName, roomNumber } = req.params;
        const approvedBookings = await Booking.find({ hostelName, roomNumber, status: "approved" });
        res.json(approvedBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;