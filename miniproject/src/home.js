import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: '#77dd77',
    color: '#4a148c',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    marginBottom: '10px',
  };

  return (
    <div style={{ background: '#e9d6fe', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ marginBottom: '30px', color: '#4a148c', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', fontWeight: '700', fontFamily: 'Lobster, cursive' }}>
          Admin Dashboard
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <button style={buttonStyle} onClick={() => navigate('/pending')}>Pending Requests</button>
          <button style={buttonStyle} onClick={() => navigate('/accept')}>Accepted Requests</button>
          <button style={buttonStyle} onClick={() => navigate('/reject')}>Rejected Requests</button>
          <button style={buttonStyle} onClick={() => navigate('/student')}>Student Details</button>
        </div>
      </div>
    </div>
  );
}

export default Home;