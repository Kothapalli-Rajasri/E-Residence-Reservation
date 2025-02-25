import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDetails() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Inside handleSubmit");  
        console.log("Submitting Form Data:", formValues);
        const errors = validate();
        console.log("Validation Errors:", errors);
        if (Object.keys(errors).length === 0) {
            console.log("Before fetch call");
            fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            })
            .then(response => response.json())
.then(data => {
    console.log("Server Response:", data); 
    if (data.message === "Registration successful") {
        alert("Registration successful!");
        navigate("/hostel");
    } else {
        alert(data.message || "Error registering. Try again.");
    }
})

            .catch(error => {
                console.error("Error:", error);
                alert("Server error. Try again.");
            });
            
            
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

    return (
        <div style={{
            background: '#e9d6fe',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="card" style={{
                width: '60%',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(240, 0, 238, 0.5), 0 8px 16px rgba(0, 238, 255, 0.5)',
                padding: '20px',
                margin: '20px auto',
                background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))'
            }}>
                <div className="card-body">
                    <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>Student Details Form</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Student ID</label>
                            <input type="text" name="studentId" value={formValues.studentId} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.studentId && <span style={{ color: 'red' }}>{formErrors.studentId}</span>}
                        </div>
                        <div className="mb-3">
    <label style={{ fontWeight: 'bold', color: '#555' }}>Password</label>
    <input type="password" name="password" value={formValues.password} onChange={handleChange} className="form-control"
        style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
    {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
</div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Name</label>
                            <input type="text" name="name" value={formValues.name} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Branch</label>
                            <select name="branch" value={formValues.branch} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }}>
                                <option value="" disabled>Select Branch</option>
                                <option value="IT">IT</option>
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="ECE">ECE</option>
                            </select>
                            {formErrors.branch && <span style={{ color: 'red' }}>{formErrors.branch}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Phone Number</label>
                            <input type="text" name="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.phoneNumber && <span style={{ color: 'red' }}>{formErrors.phoneNumber}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Mother's Name</label>
                            <input type="text" name="motherName" value={formValues.motherName} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.motherName && <span style={{ color: 'red' }}>{formErrors.motherName}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Father's Name</label>
                            <input type="text" name="fatherName" value={formValues.fatherName} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.fatherName && <span style={{ color: 'red' }}>{formErrors.fatherName}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Mother's Phone Number</label>
                            <input type="text" name="motherPhoneNumber" value={formValues.motherPhoneNumber} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.motherPhoneNumber && <span style={{ color: 'red' }}>{formErrors.motherPhoneNumber}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Father's Phone Number</label>
                            <input type="text" name="fatherPhoneNumber" value={formValues.fatherPhoneNumber} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }} />
                            {formErrors.fatherPhoneNumber && <span style={{ color: 'red' }}>{formErrors.fatherPhoneNumber}</span>}
                        </div>
                        <div className="mb-3">
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Year of Study</label>
                            <select name="yearOfStudy" value={formValues.yearOfStudy} onChange={handleChange} className="form-control"
                                style={{ borderRadius: '8px', padding: '10px', width: '100%', marginBottom: '10px' }}>
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
                            <div style={{ display: 'flex',gap:'0px', justifyContent: 'space-around', marginBottom: '10px' }}>
                                <label style={{ color: '#555', fontWeight: 'bold' }}>
                                    <input type="radio" name="gender" value="Male" checked={formValues.gender === "Male"} onChange={handleChange} style={{ marginRight: '5px' }} />
                                    Male
                                </label>
                                <label style={{ color: '#555', fontWeight: 'bold' }}>
                                    <input type="radio" name="gender" value="Female" checked={formValues.gender === "Female"} onChange={handleChange} style={{ marginRight: '5px' }} />
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

export default StudentDetails;
