import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";

import Hostel from "./hostels";
import Rooms from "./rooms";
import Booking from "./booking";
import Home from "./home";
import Pending2 from "./pending";
import Accept2 from "./accept";
import Reject2 from "./reject";
import ProfilePage from "./profile"
import StudentRegistration from "./reg";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reg" element={<StudentRegistration />} />
                
                <Route path="/hostel" element={<Hostel />} />
                <Route path="rooms/:hostelName" element={<Rooms/>}/>
                <Route path="/booking/:hostelName/:roomNumber" element={<Booking />} />

                <Route path="/home" element={<Home />} />
                <Route path="/pending" element={<Pending2/>} />
                <Route path="/accept" element={<Accept2 />} />
                <Route path="/reject" element={<Reject2 />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
