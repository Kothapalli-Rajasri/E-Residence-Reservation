const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, 
    studentName: { type: String }, 
    hostelName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    bedNumber: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
