import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Booking() {
  const { hostelName, roomNumber } = useParams();
  const studentId = localStorage.getItem("studentId");

  const [beds, setBeds] = useState([
    { id: 1, color: "green" },
    { id: 2, color: "green" },
    { id: 3, color: "green" },
    { id: 4, color: "green" },
  ]);

  const [message, setMessage] = useState("");
  const [selectedBed, setSelectedBed] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/bookings/pending/${hostelName}/${roomNumber}`)
      .then((response) => response.json())
      .then((pendingBookings) => {
        fetch(`http://localhost:5000/api/bookings/approved/${hostelName}/${roomNumber}`)
          .then((res) => res.json())
          .then((approvedBookings) => {
            setBeds((prevBeds) =>
              prevBeds.map((bed) => {
                if (pendingBookings.some((p) => String(p.bedNumber) === String(bed.id))) {
                  return { ...bed, color: "yellow" }; // Pending Approval
                }
                if (approvedBookings.some((a) => String(a.bedNumber) === String(bed.id))) {
                  return { ...bed, color: "red" }; // Booked
                }
                return bed;
              })
            );
          });
      })
      .catch((error) => console.error("Error fetching bed status:", error));
  }, [hostelName, roomNumber]);

  const handleBedClick = (bed) => {
    if (bed.color === "red") {
      alert("This bed is already booked");
    } else if (bed.color === "yellow") {
      alert("This bed is waiting for approval");
    } else {
      setSelectedBed(bed);
      setMessage(`Selected Bed ${bed.id}`);
    }
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Error: Student ID not found. Please log in again.");
      return;
    }
    if (!selectedBed) {
      alert("Please select a bed before submitting");
      return;
    }

    const bookingData = {
      studentId,
      studentName: "Student Name",
      hostelName,
      roomNumber,
      bedNumber: selectedBed.id,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setBeds((prevBeds) =>
          prevBeds.map((bed) =>
            bed.id === selectedBed.id ? { ...bed, color: "yellow" } : bed
          )
        );
        setSelectedBed(null);
        setMessage("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting booking request:", error);
      alert("Failed to submit booking request");
    }
  };

  return (
    <div style={{ backgroundColor: "#e9d6fe", minHeight: "100vh", padding: "20px" }}>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          Beds in Room {roomNumber}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          {beds.map((bed) => (
            <div key={bed.id} style={{ 
                width: "100px", 
                height: "100px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "18px", 
                color: bed.color === "yellow" ? "black" : "white", 
                backgroundColor: bed.color, 
                cursor: "pointer", 
                borderRadius: "5px"
              }} 
              onClick={() => handleBedClick(bed)}
            >
              Bed {bed.id}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit Request
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Booking;
