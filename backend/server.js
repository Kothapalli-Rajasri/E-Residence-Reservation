const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminBookingRoutes = require("./routes/adminBookingRoutes"); // Added this line
const Student = require("./models/Student"); 
const Booking = require("./models/Booking");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);

app.use("/api/bookings", bookingRoutes); // Added admin booking routes

// Fetch Student Profile
app.get("/api/auth/profile/:studentId", async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/admin/bookings/pending-bookings", async (req, res) => {
    try {
        const pendingBookings = await Booking.find({ status: "pending" });
        res.json(pendingBookings);
    } catch (error) {
        console.error("Error fetching pending bookings:", error);
        res.status(500).json({ message: "Error fetching pending bookings" });
    }
});



app.get("/api/bookings/pending/:hostelName/:roomNumber", async (req, res) => {
    const { hostelName, roomNumber } = req.params;
    try {
        const pendingBookings = await Booking.find({ hostelName, roomNumber, status: "pending" });
        res.json(pendingBookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending bookings" });
    }
});

app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Booking.findByIdAndDelete(id);
      res.json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting booking" });
    }
  });
  
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
