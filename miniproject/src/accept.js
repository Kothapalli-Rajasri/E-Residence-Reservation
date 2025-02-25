import React, { useState, useEffect } from "react";

function Accept() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings/accepted-requests")
      .then((response) => response.json())
      .then((data) => {
        console.log("Accepted Requests API Response:", data); // 📝 Log response
        setAcceptedRequests(data);
      })
      .catch((error) => console.error("Error fetching accepted requests:", error));
  }, []);
  
  // 🔹 Delete Booking
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Deleted successfully!");
        setAcceptedRequests((prev) => prev.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      background: '#e9d6fe',
      color: '#000'
    }}>
      <h2 style={{ color: "#4a148c", marginBottom: "20px" }}>Accepted Requests</h2>
      <table border="1" style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#77dd77", color: "#4a148c" }}>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Bed Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {acceptedRequests.length > 0 ? (
            acceptedRequests.map((request) => (
              <tr key={request._id}>
                 <td>{request.studentId?.studentId || "N/A"}</td> {/* Student ID */}
        <td>{request.studentId?.name || "N/A"}</td> {/* Student Name */}
        <td>{request.hostelName}</td>
        <td>{request.roomNumber}</td>
        <td>{request.bedNumber}</td>
        <td>
                  <button 
                    onClick={() => handleDelete(request._id)} 
                    style={{ backgroundColor: "#ff9800", color: "white", padding: "6px 10px", borderRadius: "5px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No accepted requests</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Accept;
