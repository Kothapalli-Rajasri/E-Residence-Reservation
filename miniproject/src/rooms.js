import React, { useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';

const Rooms = () => {
  const { hostelName } = useParams();
  const navigate = useNavigate();
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const handleRoomClick = (roomNumber) => {
    navigate(`/booking/${hostelName}/${roomNumber}`, { state: { hostelName } });
};


  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#4a148c', fontFamily: 'Lobster, cursive', textAlign: 'center' }}>
         Hostel: {hostelName}
      </h1>
      <div style={{ backgroundColor: '#e9d6fe', padding: '20px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', maxWidth: '1000px', width: '100%' }}>
          
          {/* Non-AC Container */}
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))', padding: '15px', borderRadius: '5px', flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '700px' }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Non-AC</h3>
            
            {/* Ground Floor Container */}
            <div style={{ marginBottom: '15px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', flex: 1 }}>
              <h4 style={{ margin: 0, textAlign: 'center' }}>Ground Floor</h4>
              <img src="https://via.placeholder.com/100" alt="Ground Floor Room" style={{ display: 'block', margin: '8px auto', borderRadius: '5px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {[101, 102, 103, 104, 105, 106].map(num => (
                  <button
                    key={num}
                    style={{
                      backgroundColor: hoveredRoom === num ? '#d3b2fe' : '#d3d3d3',
                      color: '#000',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      flexBasis: '45%',
                      marginBottom: '10px',
                      maxWidth: '120px',
                    }}
                    onMouseEnter={() => setHoveredRoom(num)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onClick={() => handleRoomClick(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            
            {/* First Floor Container */}
            <div style={{ marginBottom: '15px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', flex: 1 }}>
              <h4 style={{ margin: 0, textAlign: 'center' }}>First Floor</h4>
              <img src="https://via.placeholder.com/100" alt="First Floor Room" style={{ display: 'block', margin: '8px auto', borderRadius: '5px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {[201, 202, 203, 204, 205, 206].map(num => (
                  <button
                    key={num}
                    style={{
                      backgroundColor: hoveredRoom === num ? '#d3b2fe' : '#d3d3d3',
                      color: '#000',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      flexBasis: '45%',
                      marginBottom: '10px',
                      maxWidth: '120px',
                    }}
                    onMouseEnter={() => setHoveredRoom(num)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onClick={() => handleRoomClick(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AC Container */}
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 0, 238, 0.3), rgba(0, 238, 255, 0.3))', padding: '20px', borderRadius: '5px', flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '500px' }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>AC</h3>
            
            {/* Second Floor Container */}
            <div style={{ marginBottom: '15px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', flex: 1 }}>
              <h4 style={{ margin: 0, textAlign: 'center' }}>Second Floor</h4>
              <img src="https://via.placeholder.com/100" alt="Second Floor Room" style={{ display: 'block', margin: '8px auto', borderRadius: '5px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {[301, 302, 303, 304, 305, 306, 307, 308].map(num => (
                  <button
                    key={num}
                    style={{
                      backgroundColor: hoveredRoom === num ? '#d3b2fe' : '#d3d3d3',
                      color: '#000',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      flexBasis: '45%',
                      marginBottom: '10px',
                      maxWidth: '120px',
                    }}
                    onMouseEnter={() => setHoveredRoom(num)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onClick={() => handleRoomClick(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
