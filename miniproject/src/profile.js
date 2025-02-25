import { useState, useEffect } from "react";

function ProfilePage() {
    const [student, setStudent] = useState(null);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        if (studentId) {
            fetch(`http://localhost:5000/api/auth/profile/${studentId}`)
                .then(response => response.json())
                .then(data => setStudent(data))
                .catch(error => console.error("Error fetching profile:", error));
        }
    }, [studentId]);

    if (!student) {
        return <h2 style={{ textAlign: "center", marginTop: "20px", color: "#4a148c" }}>Loading...</h2>;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#e9d6fe',
            color: '#000'
        }}>
            <h1 style={{
                marginBottom: '40px',
                color: '#4a148c',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                fontWeight: '700',
                fontFamily: 'Lobster, cursive'
            }}>Profile</h1>
            
            <div style={{
                width: '45%',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(240, 0, 238, 0.5), 0 8px 16px rgba(0, 238, 255, 0.5)',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))',
                textAlign: 'center'
            }}>
                <h2 style={{ color: '#4a148c', marginBottom: '20px', fontFamily: "'Lobster', cursive" }}>Student Profile</h2>

                <div style={{ textAlign: "left", padding: "15px" }}>
                    <p><strong style={{ color: "#4a148c" }}>Student ID:</strong> {student.studentId}</p>
                    <p><strong style={{ color: "#4a148c" }}>Name:</strong> {student.name}</p>
                    <p><strong style={{ color: "#4a148c" }}>Branch:</strong> {student.branch}</p>
                    <p><strong style={{ color: "#4a148c" }}>Phone Number:</strong> {student.phoneNumber}</p>
                    <p><strong style={{ color: "#4a148c" }}>Mother's Name:</strong> {student.motherName}</p>
                    <p><strong style={{ color: "#4a148c" }}>Father's Name:</strong> {student.fatherName}</p>
                    <p><strong style={{ color: "#4a148c" }}>Mother's Phone:</strong> {student.motherPhoneNumber}</p>
                    <p><strong style={{ color: "#4a148c" }}>Father's Phone:</strong> {student.fatherPhoneNumber}</p>
                    <p><strong style={{ color: "#4a148c" }}>Year of Study:</strong> {student.yearOfStudy}</p>
                    <p><strong style={{ color: "#4a148c" }}>Gender:</strong> {student.gender}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
