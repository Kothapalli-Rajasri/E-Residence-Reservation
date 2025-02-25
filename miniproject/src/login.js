import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Log({ title, showRegister }) {
    const idRef = useRef(null);
    const passRef = useRef(null);
    const [mess, setMess] = useState("");
    const [idError, setIdError] = useState("");
    const [passError, setPassError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        idRef.current.focus();
    }, []);

    const formsubmitted = (event) => {
        event.preventDefault();
        const id = idRef.current.value.trim();
        const password = passRef.current.value.trim();
        let hasError = false;

        if (!id) {
            setIdError("ID is required.");
            hasError = true;
        } else {
            setIdError("");
        }

        if (!password) {
            setPassError("Password is required.");
            hasError = true;
        } else {
            setPassError("");
        }

        if (hasError) return;

        const endpoint = title === "Admin Login" ? "/api/admin/login" : "/api/auth/login";

        fetch(`http://localhost:5000${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                [title === "Admin Login" ? "adminId" : "studentId"]: id, 
                password 
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                setMess("Login successful");
                localStorage.setItem(title === "Admin Login" ? "adminId" : "studentId", id);
                navigate(title === "Admin Login" ? "/home" : "/hostel");
                idRef.current.value = '';
                passRef.current.value = '';
            } else {
                setMess("Incorrect ID or Password");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            setMess("Server error. Try again.");
        });
    };

    const handleRegister = () => {
        navigate('/studentdetails');
    };

    return (
        <div className="card" style={{
            width: '45%',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(240, 0, 238, 0.5), 0 8px 16px rgba(0, 238, 255, 0.5)',
            padding: '20px',
            margin: '20px',
            background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))'
        }}>
            <div className="card-body">
                <h3 style={{ color: '#333', marginBottom: '20px' }}>{title}</h3>
                <p style={{ color: '#777', marginBottom: '20px' }}>Provide your details to login</p>
                <form onSubmit={formsubmitted}>
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>ID</label>
                        <input type="text" placeholder="ID" className="form-control"
                            style={{ borderRadius: '8px', padding: '10px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} ref={idRef} />
                        {idError && <p style={{ color: 'red', fontSize: '0.9em' }}>{idError}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Password</label>
                        <input type="password" placeholder="Password" className="form-control"
                            style={{ borderRadius: '8px', padding: '10px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} ref={passRef} />
                        {passError && <p style={{ color: 'red', fontSize: '0.9em' }}>{passError}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary" style={{
                        background: 'linear-gradient(135deg, #f0e, #0ef)',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'block'
                    }}>Login</button>

                    {showRegister && (
                        <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                            If new user, then{" "}
                            <span 
                                onClick={handleRegister} 
                                style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                                Register
                            </span>
                        </p>
                    )}
                </form>
                <p style={{ color: mess === "Login successful" ? 'green' : 'red', marginTop: '20px' }}>{mess}</p>
            </div>
        </div>
    );
}

function Login() {
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
            }}>E-Residence Reservation</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <Log title="Student Login" showRegister={true} />
                <Log title="Admin Login" showRegister={false} />
            </div>
        </div>
    );
}

export default Login;
