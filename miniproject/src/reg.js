import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentRegistration() {
    const [formValues, setFormValues] = useState({
        studentId: "",
        name: "",
        branch: "",
        phoneNumber: "",
        motherName: "",
        fatherName: "",
        motherPhoneNumber: "",
        fatherPhoneNumber: "",
        yearOfStudy: "",
        gender: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        if (value) {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    const validate = () => {
        let errors = {};
        Object.keys(formValues).forEach(key => {
            if (!formValues[key]) {
                errors[key] = "This field is required";
            }
        });
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formValues),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.message === "Registration successful") {
                    alert("Registration successful!");
                    setIsSubmitted(true);
                } else {
                    alert(data.message || "Error registering. Try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server error. Try again.");
            }

            setFormValues({
                studentId: "",
                name: "",
                branch: "",
                phoneNumber: "",
                motherName: "",
                fatherName: "",
                motherPhoneNumber: "",
                fatherPhoneNumber: "",
                yearOfStudy: "",
                gender: "",
                password: ""
            });
        } else {
            setFormErrors(errors);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            navigate("/");
        }
    }, [isSubmitted, navigate]);

    return (
        <div style={{
            background: '#e9d6fe',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="card" style={{
                width: '50%',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(240, 0, 238, 0.5), 0 8px 16px rgba(0, 238, 255, 0.5)',
                padding: '20px',
                margin: '20px auto',
                background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))'
            }}>
                <div className="card-body">
                    <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>Student Registration</h3>
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "Student ID", key: "studentId" },
                            { label: "Full Name", key: "name" },
                            { label: "Phone Number", key: "phoneNumber" },
                            { label: "Mother's Name", key: "motherName" },
                            { label: "Father's Name", key: "fatherName" },
                            { label: "Mother's Phone Number", key: "motherPhoneNumber" },
                            { label: "Father's Phone Number", key: "fatherPhoneNumber" },
                            { label: "Password", key: "password" }
                        ].map(({ label, key }) => (
                            <div className="mb-3" key={key}>
                                <label style={{ fontWeight: 'bold', color: '#555' }}>{label}</label>
                                <input type={key === "password" ? "password" : "text"} name={key} value={formValues[key]} onChange={handleChange}
                                    className="form-control" style={{ borderRadius: '8px', padding: '8px', width: '100%', marginBottom: '8px' }} />
                                {formErrors[key] && <span style={{ color: 'red' }}>{formErrors[key]}</span>}
                            </div>
                        ))}

                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Branch</label>
                            <select name="branch" value={formValues.branch} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '8px', width: '100%', marginBottom: '8px' }}>
                                <option value="" disabled>Select Branch</option>
                                <option value="IT">IT</option>
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="ECE">ECE</option>
                            </select>
                            {formErrors.branch && <span style={{ color: 'red' }}>{formErrors.branch}</span>}
                        </div>

                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Year of Study</label>
                            <select name="yearOfStudy" value={formValues.yearOfStudy} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '8px', width: '100%', marginBottom: '8px' }}>
                                <option value="" disabled>Select Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                            {formErrors.yearOfStudy && <span style={{ color: 'red' }}>{formErrors.yearOfStudy}</span>}
                        </div>

                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Gender</label>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '8px' }}>
                                <label style={{ color: '#555', fontWeight: 'bold' }}>
                                    <input type="radio" name="gender" value="Male" checked={formValues.gender === "Male"} onChange={handleChange} />
                                    Male
                                </label>
                                <label style={{ color: '#555', fontWeight: 'bold' }}>
                                    <input type="radio" name="gender" value="Female" checked={formValues.gender === "Female"} onChange={handleChange} />
                                    Female
                                </label>
                            </div>
                            {formErrors.gender && <span style={{ color: 'red' }}>{formErrors.gender}</span>}
                        </div>

                        <button type="submit" style={{
                            background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.8), rgba(0, 238, 255, 0.8))',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '20px auto'
                        }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentRegistration;
