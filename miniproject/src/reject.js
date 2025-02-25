import React, { useState, useEffect } from "react";

function Reject() {
  const [rejectedRequests, setRejectedRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings/rejected-requests")
      .then((response) => response.json())
      .then((data) => setRejectedRequests(data))
      .catch((error) => console.error("Error fetching rejected requests:", error));
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
        setRejectedRequests((prev) => prev.filter((booking) => booking._id !== id));
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
      <h2 style={{ color: "#4a148c", marginBottom: "20px" }}>Rejected Requests</h2>
      <table border="1" style={{ width: "90%", textAlign: "center", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f44336", color: "white" }}>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Bed Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rejectedRequests.length > 0 ? (
            rejectedRequests.map((request) => (
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
              <td colSpan="5">No rejected requests</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reject;
