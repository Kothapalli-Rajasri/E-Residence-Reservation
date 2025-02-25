const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    branch: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherPhoneNumber: { type: String, required: true },
    fatherPhoneNumber: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
