import React, { useState, useEffect } from "react";

function Pending() {
  const [requests, setRequests] = useState([]);

  // 🔹 Fetch Pending Requests
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings/pending-bookings")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching pending requests:", error));
  }, []);

  // 🔹 Approve Booking
  const handleAccept = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/bookings/approve/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      alert(data.message);
      setRequests((prev) => prev.filter((req) => req._id !== bookingId));
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request.");
    }
  };

  // 🔹 Reject Booking
  const handleReject = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/bookings/reject/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      const data = await response.json();
      alert(data.message);
      setRequests((prev) => prev.filter((req) => req._id !== bookingId));
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request.");
    }
  };

  // 🔹 Delete Booking
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Deleted successfully!");
        setRequests((prev) => prev.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div style={{ background: '#e9d6fe', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#4a148c', marginBottom: '20px', fontFamily: 'Lobster, cursive' }}>
        Pending Booking Requests
      </h2>
      <table style={{
        width: "100%",
        textAlign: "center",
        borderCollapse: "collapse",
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Bed Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request._id}>
                <td>{request.studentId?.studentId || "N/A"}</td>
                <td>{request.studentId?.name || "Not Found"}</td> {/* Fixed Student Name Display */}
                <td>{request.hostelName}</td>
                <td>{request.roomNumber}</td>
                <td>{request.bedNumber}</td>
                <td>
                  <button onClick={() => handleAccept(request._id)}
                    style={{ marginRight: "10px", backgroundColor: "#4CAF50", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                    Accept
                  </button>
                  <button onClick={() => handleReject(request._id)}
                    style={{ marginRight: "10px", backgroundColor: "#f44336", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                    Reject
                  </button>
                  <button onClick={() => handleDelete(request._id)}
                    style={{ backgroundColor: "#ff9800", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No pending requests</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Pending;
