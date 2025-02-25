const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Get all pending booking requests
router.get("/pending-bookings", async (req, res) => {
    try {
        const pendingBookings = await Booking.find({ status: "pending" })
            .populate("studentId", "name studentId"); // Populate student name and ID

        res.json(pendingBookings);
    } catch (error) {
        console.error("Error fetching pending bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// Approve booking
router.put("/approve/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking approved successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reject booking
router.put("/reject/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking rejected successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// Get all approved booking requests
// Get all approved booking requests
router.get("/accepted-requests", async (req, res) => {
    try {
        const acceptedBookings = await Booking.find({ status: "approved" })
            .populate("studentId", "name studentId"); // Ensure both name and studentId are populated

        res.json(acceptedBookings);
    } catch (error) {
        console.error("Error fetching accepted bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all rejected booking requests
router.get("/rejected-requests", async (req, res) => {
    try {
        const rejectedBookings = await Booking.find({ status: "rejected" })
            .populate("studentId", "name studentId"); // Ensure both name and studentId are populated

        res.json(rejectedBookings);
    } catch (error) {
        console.error("Error fetching rejected bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
